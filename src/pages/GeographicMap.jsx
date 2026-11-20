import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapTrifold, Globe, Waves, Mountains, Buildings, MagnifyingGlass,
  X, Plus, Minus, ArrowsCounterClockwise, ArrowsOut, ArrowsIn,
  Drop, Sun, Anchor, NavigationArrow, Sparkle, Stack,
  CaretUp, CaretDown
} from '@phosphor-icons/react';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';
import { worldCountries } from '../data/worldCountries';
import {
  oceansAndSeas, lakes, deserts, mountainPeaks,
  straitsAndCanals, majorCities, rivers, mountains,
  riverPaths, countryDataUz
} from '../data/geographicMapData';

// ── Rossiya va 180° meridianni kesib oʻtuvchi davlatlardagi uzun gorizontal chiziqni yoʻqotuvchi funksiya ──
function cleanAntimeridianFeatures(fc) {
  const cleanFeatures = fc.features.map((f) => {
    const name = f.properties?.name;
    if (name !== 'Russia' && name !== 'Fiji' && name !== 'Antarctica') {
      return f;
    }
    const geom = f.geometry;
    const newPolys = [];
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;

    polys.forEach((poly) => {
      const ring = poly[0];
      let hasJump = false;
      for (let i = 0; i < ring.length - 1; i++) {
        if (Math.abs(ring[i][0] - ring[i + 1][0]) > 180) {
          hasJump = true;
          break;
        }
      }
      if (!hasJump) {
        newPolys.push(poly);
        return;
      }

      // 180° meridian boʻylab Sharqiy va Gʻarbiy qismlarga ajratish (chiziq tortilishini toʻxtatadi)
      const eastRing = [];
      const westRing = [];
      ring.forEach(([lng, lat]) => {
        if (lng >= 0) {
          eastRing.push([Math.min(180, lng), lat]);
        } else {
          westRing.push([Math.max(-180, lng), lat]);
        }
      });
      if (eastRing.length > 3) {
        if (eastRing[0][0] !== eastRing[eastRing.length - 1][0] || eastRing[0][1] !== eastRing[eastRing.length - 1][1]) {
          eastRing.push([eastRing[0][0], eastRing[0][1]]);
        }
        newPolys.push([eastRing]);
      }
      if (westRing.length > 3) {
        if (westRing[0][0] !== westRing[westRing.length - 1][0] || westRing[0][1] !== westRing[westRing.length - 1][1]) {
          westRing.push([westRing[0][0], westRing[0][1]]);
        }
        newPolys.push([westRing]);
      }
    });

    return {
      ...f,
      geometry: {
        type: 'MultiPolygon',
        coordinates: newPolys,
      },
    };
  });

  return { ...fc, features: cleanFeatures };
}

// ── Sifatli, tekin va API key talab qilmaydigan turli xarita qatlamlari ──
const MAP_STYLES = [
  {
    id: 'osm',
    name: 'Umumiy xarita (OpenStreetMap)',
    badge: 'Umumiy',
    desc: 'Ochiq xalqaro global geografik xarita — daryolar, chegaralar va relyef',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    subdomains: 'abc',
    maxNativeZoom: 19,
    maxZoom: 19,
  },
  {
    id: 'borders',
    name: 'Oddiy Chegarali (Minimalist)',
    badge: 'Chegaralar',
    desc: 'Faqat davlatlar chegaralari va nomlari, toza va ortiqcha bezaklarsiz',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    overlayUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    maxNativeZoom: 16,
    maxZoom: 18,
  },
  {
    id: 'natgeo',
    name: 'Fizik & Siyosiy (NatGeo)',
    badge: 'Klassik',
    desc: 'National Geographic klassik xaritasi — togʻlar, daryolar, davlatlar',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    maxNativeZoom: 16,
    maxZoom: 18,
  },
  {
    id: 'satellite_hybrid',
    name: 'Gibrid Sputnik (Surat + Chegara)',
    badge: 'Sputnik',
    desc: 'Koinotdan olingan fotosurat ustida davlat chegaralari va shahar nomlari',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    overlayUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    maxNativeZoom: 18,
    maxZoom: 19,
  },
  {
    id: 'satellite_pure',
    name: 'Toza Sputnik (Faqat fototasvir)',
    badge: 'Foto',
    desc: 'Yer yuzining hech qanday yozuvlarsiz toza kosmik fotosurati',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maxNativeZoom: 18,
    maxZoom: 19,
  },
  {
    id: 'dark_borders',
    name: 'Qorongʻi Chegarali (Tungi)',
    badge: 'Tungi',
    desc: 'Qora fondagi minimalist oq davlat chegaralari va poytaxtlar',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    overlayUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    maxNativeZoom: 16,
    maxZoom: 18,
  },
  {
    id: 'physical',
    name: 'Tabiiy Relyef (Balandliklar)',
    badge: 'Relyef',
    desc: 'Togʻ tizmalari, balandlik pogʻonalari, choʻllar va okean tubi relyefi',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
    maxNativeZoom: 8,
    maxZoom: 18,
  },
  {
    id: 'shaded',
    name: '3D Soyali Relyef',
    badge: '3D Soyali',
    desc: 'Yer sharining togʻ va qirlari 3D yorugʻlik-soya shaklida',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
    maxNativeZoom: 13,
    maxZoom: 18,
  },
  {
    id: 'ocean',
    name: 'Okeanologiya & Dengizlar',
    badge: 'Okean',
    desc: 'Dengiz chuqurliklari, suv osti botiqlari va sohilboʻyi shelflari',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
    overlayUrl: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
    maxNativeZoom: 13,
    maxZoom: 18,
  },
  {
    id: 'topo',
    name: 'Topografik Landshaft',
    badge: 'Topo',
    desc: 'Batafsil relyef gorizontallari, yoʻnalishlar va tabiiy qatlam',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    maxNativeZoom: 18,
    maxZoom: 19,
  },
];

// ── Tezkor hududlar ──
const REGION_PRESETS = [
  { id: 'uzbekistan', label: 'Oʻzbekiston', center: [41.3775, 64.5853], zoom: 6 },
  { id: 'central_asia', label: 'Markaziy Osiyo', center: [42.0, 68.0], zoom: 5 },
  { id: 'world', label: 'Dunyo', center: [20.0, 10.0], zoom: 2.5 },
  { id: 'europe', label: 'Yevropa', center: [50.0, 15.0], zoom: 4 },
  { id: 'asia', label: 'Osiyo', center: [35.0, 90.0], zoom: 3.5 },
  { id: 'africa', label: 'Afrika', center: [2.0, 20.0], zoom: 3.5 },
  { id: 'americas', label: 'Amerika', center: [15.0, -80.0], zoom: 3 },
];

// ── Kategoriya filtrlari (Davlatlar birinchi va birlamchi tanlangan) ──
const CATEGORIES = [
  { id: 'countries', label: 'Davlatlar', icon: Globe },
  { id: 'rivers', label: 'Daryolar', icon: Waves },
  { id: 'mountains', label: 'Togʻlar & Choʻqqilar', icon: Mountains },
  { id: 'lakes', label: 'Koʻllar', icon: Drop },
  { id: 'deserts', label: 'Choʻllar', icon: Sun },
  { id: 'cities', label: 'Poytaxtlar', icon: Buildings },
  { id: 'straits', label: 'Boʻgʻozlar', icon: Anchor },
];

export default function GeographicMap() {
  const { darkMode } = useTheme();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const referenceLayerRef = useRef(null);
  const overlaysGroupRef = useRef(null);
  const styleMenuRef = useRef(null);
  const searchContainerRef = useRef(null);

  // States
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userStyle, setUserStyle] = useState(null);
  const activeStyleId = userStyle || 'osm';
  const [selectedCategory, setSelectedCategory] = useState('countries');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStyleMenu, setShowStyleMenu] = useState(false);

  // Rossiya va Fijidagi 180° meridian artefaktini yoʻqotuvchi toza GeoJSON
  const sanitizedWorldCountries = useMemo(() => cleanAntimeridianFeatures(worldCountries), []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (styleMenuRef.current && !styleMenuRef.current.contains(e.target)) {
        setShowStyleMenu(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // 1. Ensure Leaflet library is loaded in browser
  useEffect(() => {
    let isCancelled = false;

    function init() {
      if (window.L) {
        if (!isCancelled) setMapLoaded(true);
        return;
      }

      // Dynamic load fallback
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.onerror = () => {
          link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
        };
        document.head.appendChild(link);
      }

      if (!document.getElementById('leaflet-js')) {
        const script = document.createElement('script');
        script.id = 'leaflet-js';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        script.onload = () => {
          if (!isCancelled) setMapLoaded(true);
        };
        script.onerror = () => {
          const fallback = document.createElement('script');
          fallback.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
          fallback.onload = () => { if (!isCancelled) setMapLoaded(true); };
          document.head.appendChild(fallback);
        };
        document.head.appendChild(script);
      } else {
        const interval = setInterval(() => {
          if (window.L) {
            clearInterval(interval);
            if (!isCancelled) setMapLoaded(true);
          }
        }, 80);
        return () => clearInterval(interval);
      }
    }

    init();
    return () => { isCancelled = true; };
  }, []);

  // 2. Initialize Leaflet Map
  useEffect(() => {
    if (!mapLoaded || !mapContainerRef.current || mapInstanceRef.current) return;
    const L = window.L;
    if (!L) return;

    const initialStyle = MAP_STYLES.find((s) => s.id === activeStyleId) || MAP_STYLES[0];

    const map = L.map(mapContainerRef.current, {
      center: [41.3775, 64.5853], // Uzbekistan center
      zoom: 6,
      minZoom: 2,
      maxZoom: 19,
      zoomControl: false,
      attributionControl: false,
      worldCopyJump: true,
      keyboard: false,
    });

    const tileLayer = L.tileLayer(initialStyle.url, {
      subdomains: initialStyle.subdomains || 'abc',
      maxZoom: initialStyle.maxZoom || 19,
      maxNativeZoom: initialStyle.maxNativeZoom || 19,
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    if (initialStyle.overlayUrl) {
      const refLayer = L.tileLayer(initialStyle.overlayUrl, {
        subdomains: initialStyle.subdomains || 'abc',
        maxZoom: 19,
        maxNativeZoom: initialStyle.maxNativeZoom || 18,
      }).addTo(map);
      referenceLayerRef.current = refLayer;
    }

    const overlaysGroup = L.layerGroup().addTo(map);
    overlaysGroupRef.current = overlaysGroup;
    mapInstanceRef.current = map;

    // Invalidate size immediately and on delays so tiles render perfectly
    map.invalidateSize();
    const t1 = setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
    }, 120);
    const t2 = setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
    }, 400);

    let ro = null;
    if (typeof ResizeObserver !== 'undefined' && mapContainerRef.current) {
      ro = new ResizeObserver(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      });
      ro.observe(mapContainerRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (ro) ro.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [mapLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // 3. Update Tile Layers on style switch (supports base + reference overlay)
  useEffect(() => {
    if (!mapLoaded) return;
    const map = mapInstanceRef.current;
    const L = window.L;
    if (!map || !L) return;

    const style = MAP_STYLES.find((s) => s.id === activeStyleId) || MAP_STYLES[0];

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }
    if (referenceLayerRef.current) {
      map.removeLayer(referenceLayerRef.current);
      referenceLayerRef.current = null;
    }

    const newLayer = L.tileLayer(style.url, {
      subdomains: style.subdomains || 'abc',
      maxZoom: style.maxZoom || 19,
      maxNativeZoom: style.maxNativeZoom || 19,
    }).addTo(map);

    tileLayerRef.current = newLayer;

    if (style.overlayUrl) {
      const refLayer = L.tileLayer(style.overlayUrl, {
        subdomains: style.subdomains || 'abc',
        maxZoom: 19,
        maxNativeZoom: style.maxNativeZoom || 18,
      }).addTo(map);
      referenceLayerRef.current = refLayer;
    }
  }, [mapLoaded, activeStyleId]);

  // Smooth fly to coordinate WITH offset so modal never covers the marker
  const flyToCoord = useCallback((lat, lng, zoomLevel = 7, withOffset = false) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (withOffset) {
      // Offset by 130px downwards in camera pixel space, which lifts the target upwards into clear view!
      const targetPt = map.project([lat, lng], zoomLevel).add([0, 130]);
      const offsetLatLng = map.unproject(targetPt, zoomLevel);
      map.flyTo(offsetLatLng, zoomLevel, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    } else {
      map.flyTo([lat, lng], zoomLevel, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, []);

  // 4. Update Overlays / Geographic Features when category, map loaded or selected item changes
  useEffect(() => {
    if (!mapLoaded) return;
    const map = mapInstanceRef.current;
    const L = window.L;
    const group = overlaysGroupRef.current;
    if (!map || !L || !group) return;

    group.clearLayers();

    // Helper: Tanlangan obyektni nurli halqa bilan (toʻrtburchak chizmasdan) yorqin koʻrsatuvchi marker
    const createFeatureIcon = ({ icon, label, sublabel, color, size = 28, isSelected = false }) => {
      return L.divIcon({
        className: 'geo-feature-marker outline-none',
        html: `
          <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            pointer-events: auto;
            cursor: pointer;
            outline: none;
            -webkit-tap-highlight-color: transparent;
            transform: translate(-50%, -50%) ${isSelected ? 'scale(1.25)' : 'scale(1)'};
            transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: ${isSelected ? 9999 : 10};
          ">
            ${isSelected ? `
              <div class="geo-pulse-active" style="
                position: absolute;
                width: ${size + 14}px;
                height: ${size + 14}px;
                border-radius: 50%;
                background: rgba(30, 91, 248, 0.28);
                pointer-events: none;
                top: -${(size + 14 - size) / 2}px;
                outline: none;
              "></div>
            ` : ''}
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: ${size}px;
              height: ${size}px;
              background: ${isSelected ? '#1E5BF8' : color};
              color: #FFFFFF;
              border-radius: 50%;
              border: ${isSelected ? '3px solid #FFFFFF' : '2.5px solid #FFFFFF'};
              box-shadow: ${isSelected ? '0 0 0 4px #1E5BF8, 0 8px 24px rgba(30, 91, 248, 0.6)' : '0 4px 12px rgba(0,0,0,0.35)'};
              font-size: ${size * 0.48}px;
              font-weight: 800;
              transition: all 0.2s ease;
              outline: none;
            ">
              ${icon}
            </div>
            ${label ? `
              <div style="
                margin-top: 3.5px;
                padding: 2px 7px;
                background: ${isSelected ? '#1E5BF8' : 'rgba(15, 23, 42, 0.90)'};
                color: #FFFFFF;
                font-size: ${isSelected ? '11px' : '10.5px'};
                font-weight: 800;
                border-radius: 6px;
                white-space: nowrap;
                box-shadow: ${isSelected ? '0 4px 14px rgba(30, 91, 248, 0.5)' : '0 2px 8px rgba(0,0,0,0.35)'};
                border: 1px solid ${isSelected ? '#93C5FD' : 'rgba(255,255,255,0.22)'};
                pointer-events: none;
                letter-spacing: -0.01em;
                outline: none;
              ">
                ${label}
                ${sublabel ? `<span style="font-size: 9px; opacity: 0.85; margin-left: 3px; font-weight: 600;">${sublabel}</span>` : ''}
              </div>
            ` : ''}
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
    };

    // A. Davlatlar (Countries) — Faqat chegaralar koʻrinadi (barcha pinlar olib tashlangan). Bosilganda oʻsha davlat highlight boʻladi
    if (selectedCategory === 'countries') {
      const geoLayer = L.geoJSON(sanitizedWorldCountries, {
        style: (feature) => {
          const nameEn = feature.properties?.name;
          const uzData = countryDataUz[nameEn];
          const displayName = uzData?.name || nameEn;
          const isSelected = selectedItem?.type === 'country' && (
            selectedItem?.nameEn === nameEn ||
            selectedItem?.name === displayName ||
            selectedItem?.name === nameEn
          );

          return {
            color: isSelected ? '#1E5BF8' : (darkMode ? '#64748B' : '#94A3B8'),
            weight: isSelected ? 3 : 1.2,
            opacity: isSelected ? 1 : (darkMode ? 0.8 : 0.7),
            fill: true,
            fillColor: isSelected ? '#3B82F6' : (darkMode ? '#3B82F6' : '#2563EB'),
            fillOpacity: isSelected ? 0.30 : 0.05, // 0.05 har qanday nuqtada (hatto markazida ham) hover va bosish sezgirligini taʼminlaydi
            className: 'cursor-pointer outline-none focus:outline-none',
          };
        },
        onEachFeature: (feature, layer) => {
          const nameEn = feature.properties?.name;
          const uzData = countryDataUz[nameEn];
          const displayName = uzData?.name || nameEn;
          const flag = uzData?.flag || '🏳️';
          const capital = uzData?.capital;

          layer.bindTooltip(`
            <div style="font-family: inherit; font-size: 12px; padding: 2px 4px;">
              <span style="font-size: 14px; margin-right: 4px;">${flag}</span>
              <b>${displayName}</b>
              ${capital ? `<br/><span style="font-size: 10px; opacity: 0.85;">Poytaxti: <b>${capital}</b></span>` : ''}
            </div>
          `, { sticky: true, direction: 'top' });

          layer.on({
            mouseover: (e) => {
              const l = e.target;
              const isSelected = selectedItem?.type === 'country' && (
                selectedItem?.nameEn === nameEn || selectedItem?.name === displayName || selectedItem?.name === nameEn
              );
              if (!isSelected) {
                l.setStyle({
                  weight: 2.5,
                  color: '#2563EB',
                  fillColor: '#3B82F6',
                  fillOpacity: 0.22,
                });
                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                  l.bringToFront();
                }
              }
            },
            mouseout: (e) => {
              const isSelected = selectedItem?.type === 'country' && (
                selectedItem?.nameEn === nameEn || selectedItem?.name === displayName || selectedItem?.name === nameEn
              );
              if (!isSelected) {
                geoLayer.resetStyle(e.target);
              }
            },
            click: (e) => {
              if (document.activeElement && typeof document.activeElement.blur === 'function') {
                document.activeElement.blur();
              }
              const bounds = e.target.getBounds();
              const center = bounds.getCenter();
              setSelectedItem({
                type: 'country',
                name: displayName,
                nameEn,
                flag,
                capital: uzData?.capital,
                continent: uzData?.continent,
                area: uzData?.area,
                population: uzData?.population,
                fact: uzData?.fact,
                coords: [center.lng, center.lat],
              });
              setIsModalMinimized(false);
              map.fitBounds(bounds, {
                padding: [50, 50],
                maxZoom: 6,
                animate: true,
              });
            },
          });
        },
      }).addTo(group);
    }

    // B. Daryolar (Rivers) — tanlangan daryo luminous neon koʻrinishida highlight boʻladi
    if (selectedCategory === 'rivers') {
      rivers.forEach((river) => {
        const coords = riverPaths[river.id];
        if (!coords) return;

        const latLngs = coords.map((segment) => segment.map(([lng, lat]) => [lat, lng]));
        const isSelected = selectedItem?.type === 'river' && selectedItem?.id === river.id;

        // Casing polyline
        L.polyline(latLngs, {
          color: isSelected ? '#38BDF8' : '#FFFFFF',
          weight: isSelected ? 8 : 5,
          opacity: isSelected ? 0.95 : 0.8,
          lineCap: 'round',
          lineJoin: 'round',
          interactive: false,
        }).addTo(group);

        // Core river polyline
        const polyline = L.polyline(latLngs, {
          color: isSelected ? '#00E5FF' : '#0284C7',
          weight: isSelected ? 5.5 : 3.8,
          opacity: 1,
          smoothFactor: 1.2,
          lineCap: 'round',
          lineJoin: 'round',
          className: 'cursor-pointer outline-none focus:outline-none',
        }).addTo(group);

        // River midpoint label pin
        const firstSegment = coords[0];
        if (firstSegment && firstSegment.length > 0) {
          const midPt = firstSegment[Math.floor(firstSegment.length / 2)];
          const marker = L.marker([midPt[1], midPt[0]], {
            keyboard: false,
            icon: createFeatureIcon({
              icon: '🌊',
              label: `${river.name} daryosi`,
              sublabel: river.length,
              color: '#0284C7',
              size: isSelected ? 30 : 26,
              isSelected,
            }),
          }).addTo(group);

          marker.on('click', () => {
            if (document.activeElement?.blur) document.activeElement.blur();
            setSelectedItem({ type: 'river', ...river, coords: [midPt[0], midPt[1]] });
            setIsModalMinimized(false);
            flyToCoord(midPt[1], midPt[0], Math.max(map.getZoom(), 6.5), true);
          });
        }

        polyline.bindTooltip(`<b>${river.name} daryosi</b><br/><span style="font-size: 11px;">Uzunligi: ${river.length}</span>`, {
          sticky: true,
          direction: 'top',
        });

        polyline.on('click', () => {
          if (document.activeElement?.blur) document.activeElement.blur();
          setSelectedItem({ type: 'river', ...river });
          setIsModalMinimized(false);
          const firstPt = latLngs[0]?.[0];
          if (firstPt) flyToCoord(firstPt[0], firstPt[1], Math.max(map.getZoom(), 6), true);
        });

        polyline.on('mouseover', () => {
          if (!isSelected) polyline.setStyle({ color: '#00E5FF', weight: 5 });
        });
        polyline.on('mouseout', () => {
          if (!isSelected) polyline.setStyle({ color: '#0284C7', weight: 3.8 });
        });
      });
    }

    // C. Togʻlar & Choʻqqilar — Toʻrtburchaklar olib tashlangan! Faqat tabiiy nishonlar va tanlanganda nurli halqa
    if (selectedCategory === 'mountains') {
      // 1. Togʻ tizmalari (Ranges)
      mountains.forEach((m) => {
        if (!m.coords) return;
        const isSelected = selectedItem?.type === 'mountain' && selectedItem?.id === m.id;

        const marker = L.marker([m.coords[1], m.coords[0]], {
          keyboard: false,
          icon: createFeatureIcon({
            icon: '⛰️',
            label: m.name,
            sublabel: `${m.highestPeak} (${m.peakHeight})`,
            color: '#D97706',
            size: isSelected ? 32 : 28,
            isSelected,
          }),
        }).addTo(group);

        marker.bindTooltip(`<b>${m.name}</b><br/><span style="font-size: 11px;">${m.highestPeak} (${m.peakHeight})</span>`, { direction: 'top' });
        marker.on('click', () => {
          if (document.activeElement?.blur) document.activeElement.blur();
          setSelectedItem({ type: 'mountain', ...m });
          setIsModalMinimized(false);
          flyToCoord(m.coords[1], m.coords[0], Math.max(map.getZoom(), 6), true);
        });
      });

      // 2. Choʻqqilar (Peaks)
      mountainPeaks.forEach((p) => {
        const isSelected = selectedItem?.type === 'peak' && selectedItem?.name === p.name;

        const marker = L.marker([p.coords[1], p.coords[0]], {
          keyboard: false,
          icon: createFeatureIcon({
            icon: '▲',
            label: p.name,
            sublabel: p.height,
            color: '#B45309',
            size: isSelected ? 30 : 26,
            isSelected,
          }),
        }).addTo(group);

        marker.bindTooltip(`<b>${p.name}</b><br/>Balandligi: ${p.height}<br/>Tizmasi: ${p.range}`, { direction: 'top' });
        marker.on('click', () => {
          if (document.activeElement?.blur) document.activeElement.blur();
          setSelectedItem({ type: 'peak', ...p });
          setIsModalMinimized(false);
          flyToCoord(p.coords[1], p.coords[0], Math.max(map.getZoom(), 7.5), true);
        });
      });
    }

    // D. Koʻllar (Lakes) — tanlanganda halo nuri bilan highlight boʻladi
    if (selectedCategory === 'lakes') {
      lakes.forEach((l) => {
        const isSelected = selectedItem?.type === 'lake' && selectedItem?.name === l.name;

        const marker = L.marker([l.coords[1], l.coords[0]], {
          keyboard: false,
          icon: createFeatureIcon({
            icon: '💧',
            label: l.name,
            sublabel: l.area,
            color: '#0284C7',
            size: isSelected ? 32 : 28,
            isSelected,
          }),
        }).addTo(group);

        marker.bindTooltip(`<b>${l.name}</b><br/>Maydoni: ${l.area}<br/>Chuqurligi: ${l.depth}<br/>Davlat: ${l.country}`, { direction: 'top' });
        marker.on('click', () => {
          if (document.activeElement?.blur) document.activeElement.blur();
          setSelectedItem({ type: 'lake', ...l });
          setIsModalMinimized(false);
          flyToCoord(l.coords[1], l.coords[0], Math.max(map.getZoom(), 7), true);
        });
      });
    }

    // E. Choʻllar (Deserts) — tanlanganda halo nuri bilan highlight boʻladi
    if (selectedCategory === 'deserts') {
      deserts.forEach((d) => {
        const isSelected = selectedItem?.type === 'desert' && selectedItem?.name === d.name;

        const marker = L.marker([d.coords[1], d.coords[0]], {
          keyboard: false,
          icon: createFeatureIcon({
            icon: '☀️',
            label: d.name,
            sublabel: d.area,
            color: '#CA8A04',
            size: isSelected ? 32 : 28,
            isSelected,
          }),
        }).addTo(group);

        marker.bindTooltip(`<b>${d.name}</b><br/>Maydoni: ${d.area}<br/>Joylashuvi: ${d.location}`, { direction: 'top' });
        marker.on('click', () => {
          if (document.activeElement?.blur) document.activeElement.blur();
          setSelectedItem({ type: 'desert', ...d });
          setIsModalMinimized(false);
          flyToCoord(d.coords[1], d.coords[0], Math.max(map.getZoom(), 6.5), true);
        });
      });
    }

    // F. Poytaxtlar (Cities) — tanlanganda halo nuri bilan highlight boʻladi
    if (selectedCategory === 'cities') {
      majorCities.forEach((c) => {
        const isSelected = selectedItem?.type === 'city' && selectedItem?.name === c.name;

        const marker = L.marker([c.coords[1], c.coords[0]], {
          keyboard: false,
          icon: createFeatureIcon({
            icon: c.isCapital ? '★' : '•',
            label: c.name,
            sublabel: c.country,
            color: c.isCapital ? '#2563EB' : '#475569',
            size: isSelected ? 32 : (c.isCapital ? 28 : 22),
            isSelected,
          }),
        }).addTo(group);

        marker.bindTooltip(`<b>${c.name}</b><br/>${c.isCapital ? 'Poytaxt, ' : ''}${c.country}`, { direction: 'top' });
        marker.on('click', () => {
          if (document.activeElement?.blur) document.activeElement.blur();
          setSelectedItem({ type: 'city', ...c });
          setIsModalMinimized(false);
          flyToCoord(c.coords[1], c.coords[0], Math.max(map.getZoom(), 8), true);
        });
      });
    }

    // G. Boʻgʻozlar (Straits & Canals) — tanlanganda halo nuri bilan highlight boʻladi
    if (selectedCategory === 'straits') {
      straitsAndCanals.forEach((s) => {
        const isSelected = selectedItem?.type === 'strait' && selectedItem?.name === s.name;

        const marker = L.marker([s.coords[1], s.coords[0]], {
          keyboard: false,
          icon: createFeatureIcon({
            icon: '⚓',
            label: s.name,
            color: '#0D9488',
            size: isSelected ? 32 : 28,
            isSelected,
          }),
        }).addTo(group);

        marker.bindTooltip(`<b>${s.name}</b>`, { direction: 'top' });
        marker.on('click', () => {
          if (document.activeElement?.blur) document.activeElement.blur();
          setSelectedItem({ type: 'strait', ...s });
          setIsModalMinimized(false);
          flyToCoord(s.coords[1], s.coords[0], Math.max(map.getZoom(), 7.5), true);
        });
      });
    }

  }, [mapLoaded, selectedCategory, flyToCoord, darkMode, selectedItem, sanitizedWorldCountries]);

  // Zoom controls
  const zoomIn = () => mapInstanceRef.current?.zoomIn();
  const zoomOut = () => mapInstanceRef.current?.zoomOut();
  const resetMap = () => flyToCoord(41.3775, 64.5853, 6, false);

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Live search filtering across all geographic datasets
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const list = [];

    // 1. Countries
    Object.entries(countryDataUz).forEach(([countryKey, data]) => {
      if (data.name.toLowerCase().includes(q) || countryKey.toLowerCase().includes(q) || data.capital.toLowerCase().includes(q)) {
        const city = majorCities.find((c) => c.name.toLowerCase() === data.capital.toLowerCase() || c.country.toLowerCase() === data.name.toLowerCase());
        const lat = city ? city.coords[1] : undefined;
        const lng = city ? city.coords[0] : undefined;
        list.push({
          type: 'country',
          icon: Globe,
          badgeColor: '#059669',
          categoryLabel: 'Davlat',
          title: `${data.flag || '🏳️'} ${data.name}`,
          subtitle: `Poytaxti: ${data.capital} • Qitʼa: ${data.continent}`,
          raw: {
            type: 'country',
            name: data.name,
            nameEn: countryKey,
            capital: data.capital,
            continent: data.continent,
            area: data.area,
            population: data.population,
            fact: data.fact,
            coords: lat !== undefined ? [lng, lat] : undefined,
          },
          lat,
          lng,
          zoom: 5.5,
        });
      }
    });

    // 2. Rivers
    rivers.forEach((r) => {
      if (r.name.toLowerCase().includes(q)) {
        const path = riverPaths[r.id];
        let lat, lng;
        if (path && path[0] && path[0].length > 0) {
          const mid = Math.floor(path[0].length / 2);
          lng = path[0][mid][0];
          lat = path[0][mid][1];
        }
        list.push({
          type: 'river',
          icon: Waves,
          badgeColor: '#1E5BF8',
          categoryLabel: 'Daryo',
          title: `${r.name} daryosi`,
          subtitle: `Uzunligi: ${r.length}${r.mouth ? ` • Quyilishi: ${r.mouth}` : ''}`,
          raw: { type: 'river', ...r, coords: lat !== undefined ? [lng, lat] : undefined },
          lat,
          lng,
          zoom: 6.5,
        });
      }
    });

    // 3. Mountains
    mountains.forEach((m) => {
      if (m.name.toLowerCase().includes(q)) {
        list.push({
          type: 'mountain',
          icon: Mountains,
          badgeColor: '#D97706',
          categoryLabel: 'Togʻ',
          title: m.name,
          subtitle: `${m.highestPeak} (${m.peakHeight}) • Togʻ tizmasi`,
          raw: { type: 'mountain', ...m },
          lat: m.coords?.[1],
          lng: m.coords?.[0],
          zoom: 6,
        });
      }
    });

    // 4. Mountain Peaks
    mountainPeaks.forEach((p) => {
      if (p.name.toLowerCase().includes(q) || p.range.toLowerCase().includes(q)) {
        list.push({
          type: 'peak',
          icon: Mountains,
          badgeColor: '#B45309',
          categoryLabel: 'Choʻqqi',
          title: p.name,
          subtitle: `Balandligi: ${p.height} • ${p.range}`,
          raw: { type: 'peak', ...p },
          lat: p.coords[1],
          lng: p.coords[0],
          zoom: 8.5,
        });
      }
    });

    // 5. Lakes
    lakes.forEach((l) => {
      if (l.name.toLowerCase().includes(q) || l.country.toLowerCase().includes(q)) {
        list.push({
          type: 'lake',
          icon: Drop,
          badgeColor: '#0284C7',
          categoryLabel: 'Koʻl',
          title: l.name,
          subtitle: `Maydoni: ${l.area} • ${l.country}`,
          raw: { type: 'lake', ...l },
          lat: l.coords[1],
          lng: l.coords[0],
          zoom: 7.5,
        });
      }
    });

    // 6. Deserts
    deserts.forEach((d) => {
      if (d.name.toLowerCase().includes(q) || d.location.toLowerCase().includes(q)) {
        list.push({
          type: 'desert',
          icon: Sun,
          badgeColor: '#CA8A04',
          categoryLabel: 'Choʻl',
          title: d.name,
          subtitle: `Maydoni: ${d.area} • ${d.location}`,
          raw: { type: 'desert', ...d },
          lat: d.coords[1],
          lng: d.coords[0],
          zoom: 6.5,
        });
      }
    });

    // 7. Major Cities & Capitals
    majorCities.forEach((c) => {
      if (c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)) {
        list.push({
          type: 'city',
          icon: Buildings,
          badgeColor: c.isCapital ? '#2563EB' : '#475569',
          categoryLabel: c.isCapital ? 'Poytaxt' : 'Shahar',
          title: c.name,
          subtitle: `${c.isCapital ? 'Poytaxt' : 'Yirik shahar'}, ${c.country}`,
          raw: { type: 'city', ...c },
          lat: c.coords[1],
          lng: c.coords[0],
          zoom: 8.5,
        });
      }
    });

    // 8. Straits & Canals
    straitsAndCanals.forEach((s) => {
      if (s.name.toLowerCase().includes(q)) {
        list.push({
          type: 'strait',
          icon: Anchor,
          badgeColor: '#0D9488',
          categoryLabel: 'Boʻgʻoz',
          title: s.name,
          subtitle: 'Xalqaro suv yoʻli va boʻgʻoz',
          raw: { type: 'strait', ...s },
          lat: s.coords[1],
          lng: s.coords[0],
          zoom: 8,
        });
      }
    });

    // 9. Oceans & Seas
    oceansAndSeas.forEach((o) => {
      if (o.name.toLowerCase().includes(q)) {
        list.push({
          type: 'ocean',
          icon: Globe,
          badgeColor: '#1D4ED8',
          categoryLabel: o.type === 'ocean' ? 'Okean' : 'Dengiz',
          title: o.name,
          subtitle: `Maydoni: ${o.area} • Chuqurligi: ${o.depth}`,
          raw: { type: 'ocean', ...o },
          lat: o.coords[1],
          lng: o.coords[0],
          zoom: 4.5,
        });
      }
    });

    return list.slice(0, 8);
  }, [searchQuery]);

  const selectSearchResult = (item) => {
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
    setSearchQuery('');
    setIsSearchFocused(false);
    setSelectedItem(item.raw);
    setIsModalMinimized(false);
    if (item.lat !== undefined && item.lng !== undefined) {
      flyToCoord(item.lat, item.lng, item.zoom || 7.5, true);
    } else if (item.raw.coords) {
      flyToCoord(item.raw.coords[1], item.raw.coords[0], item.zoom || 7.5, true);
    }
  };

  const activeStyle = MAP_STYLES.find((s) => s.id === activeStyleId) || MAP_STYLES[0];

  return (
    <div className="space-y-3 max-w-7xl mx-auto pb-6">
      <SEO
        title="Geografik Xarita"
        description="GEOBEK interaktiv toza geografik xaritasi — daryolar, togʻlar, koʻllar, choʻllar, poytaxtlar va tabiiy relyef. Sifatli va bizneslarsiz minimalist xarita."
      />

      {/* ── Top Header & Perfectly Styled Search Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-[1200]">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs border border-blue-100 dark:border-blue-900/40">
            <MapTrifold size={20} weight="bold" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Geografik Xarita
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Bizneslarsiz, toza tabiiy va siyosiy geografiya
            </p>
          </div>
        </div>

        {/* Enhanced Clean Search Bar */}
        <div ref={searchContainerRef} className="relative w-full sm:w-80 md:w-96 z-[1250]">
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              <MagnifyingGlass size={16} weight="bold" />
            </div>
            <input
              type="text"
              placeholder="Daryo, togʻ, koʻl, choʻl, shahar, davlat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full h-10 pl-10 pr-9 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#0E1726] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 size-6 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Tozalash"
                title="Tozalash"
              >
                <X size={14} weight="bold" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown - Highest Z-Index (Z-[1350]) so it is never covered */}
          {searchQuery.trim().length > 0 && isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#0E1726] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-[1350]">
              {searchResults.length > 0 ? (
                <>
                  <div className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-800/60 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                    <span>Geografik obyektlar</span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{searchResults.length} ta natija</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {searchResults.map((item, idx) => {
                      const Icon = item.icon || Globe;
                      return (
                        <button
                          key={`${item.type}-${idx}`}
                          onClick={() => {
                            selectSearchResult(item);
                            setIsSearchFocused(false);
                          }}
                          className="w-full text-left px-3.5 py-2.5 hover:bg-blue-50 dark:hover:bg-slate-800/80 transition-colors flex items-center gap-3 group cursor-pointer"
                        >
                          <div
                            className="size-7 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-2xs"
                            style={{ backgroundColor: item.badgeColor }}
                          >
                            <Icon size={14} weight="bold" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {item.title}
                              </p>
                              <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                                {item.categoryLabel}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>
                          <NavigationArrow size={13} className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                  &ldquo;<span className="font-semibold text-slate-900 dark:text-white">{searchQuery}</span>&rdquo; boʻyicha geografik maʼlumot topilmadi
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Category Filter Chips (Davlatlar birinchi va tanlangan) ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none relative z-10">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer border',
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-[#0E1726] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              )}
            >
              <Icon size={14} weight={isActive ? 'bold' : 'regular'} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Main Map Canvas Container (Minimalist & Edge-to-Edge) ── */}
      <div
        className={cn(
          'relative rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm bg-white dark:bg-[#0E1726]',
          isFullscreen ? 'fixed inset-0 z-[999] rounded-none border-none' : 'w-full h-[540px] sm:h-[620px] lg:h-[680px]'
        )}
      >
        {/* 1. Leaflet DOM Map Container (FIRST IN DOM, z-0 so all controls float ABOVE it) */}
        <div ref={mapContainerRef} className="w-full h-full relative z-0 outline-none focus:outline-none" />

        {/* 2. Loading Spinner */}
        {!mapLoaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white dark:bg-[#0E1726]">
            <div className="flex flex-col items-center gap-2">
              <div className="size-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sifatli xarita yuklanmoqda...</p>
            </div>
          </div>
        )}

        {/* 3. Top-Left: Floating Map Styles Picker & Region Presets (Solid Dark/Light Theme Background) */}
        <div
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
          className="absolute top-3 left-3 z-[1000] flex items-center gap-1.5 max-w-[calc(100%-70px)] sm:max-w-none flex-wrap pointer-events-auto"
        >
          {/* Style Selector */}
          <div ref={styleMenuRef} className="relative">
            <button
              onClick={() => setShowStyleMenu(!showStyleMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0E1726] border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-md hover:border-blue-500 transition-all cursor-pointer"
            >
              <Stack size={15} weight="bold" className="text-blue-600 dark:text-blue-400" />
              <span>{activeStyle.name}</span>
              <CaretDown size={12} weight="bold" className="text-slate-400 ml-0.5" />
            </button>

            {/* Styles dropdown popover (Solid dark/light theme) */}
            {showStyleMenu && (
              <div className="absolute top-full left-0 mt-1.5 w-64 max-h-80 overflow-y-auto bg-white dark:bg-[#0E1726] border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-1.5 z-[1100] divide-y divide-slate-100 dark:divide-slate-800">
                {MAP_STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      setUserStyle(style.id);
                      setShowStyleMenu(false);
                    }}
                    className={cn(
                      'w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer',
                      activeStyleId === style.id
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    )}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold truncate">{style.name}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0 font-medium border border-slate-200 dark:border-slate-700">
                        {style.badge}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-tight">{style.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Region Presets (Solid dark/light theme, scrollable on mobile) */}
          <div className="flex items-center gap-1 bg-white dark:bg-[#0E1726] p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md text-xs overflow-x-auto max-w-[calc(100vw-180px)] sm:max-w-none scrollbar-none">
            {REGION_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => flyToCoord(p.center[0], p.center[1], p.zoom, false)}
                className="px-2 py-0.5 rounded-md font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Top-Right: Zoom & Control Toolbar (Solid Dark/Light Theme Background) */}
        <div
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 z-[1000] flex flex-col gap-1.5 bg-white dark:bg-[#0E1726] p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md pointer-events-auto"
        >
          <button
            onClick={zoomIn}
            className="size-7 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            title="Kattalashtirish (+)"
            aria-label="Kattalashtirish"
          >
            <Plus size={15} weight="bold" />
          </button>
          <button
            onClick={zoomOut}
            className="size-7 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            title="Kichiklashtirish (-)"
            aria-label="Kichiklashtirish"
          >
            <Minus size={15} weight="bold" />
          </button>
          <div className="w-full h-px bg-slate-200 dark:bg-slate-800 my-0.5" />
          <button
            onClick={resetMap}
            className="size-7 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            title="Oʻzbekistonga qaytish"
            aria-label="Oʻzbekiston markazi"
          >
            <ArrowsCounterClockwise size={15} weight="bold" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="size-7 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            title={isFullscreen ? 'Chiqish' : 'Toʻliq ekran'}
            aria-label="Toʻliq ekran"
          >
            {isFullscreen ? <ArrowsIn size={15} weight="bold" /> : <ArrowsOut size={15} weight="bold" />}
          </button>
        </div>

        {/* 5. Floating Minimalist Detail Card (Solid Dark/Light Theme Background) */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute bottom-3 right-3 left-3 sm:left-auto sm:max-w-sm bg-white dark:bg-[#0E1726] border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-2xl z-[1050] pointer-events-auto"
            >
              {isModalMinimized ? (
                /* Compact 1-line minimized strip */
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {selectedItem.flag ? `${selectedItem.flag} ` : ''}{selectedItem.name || selectedItem.title}
                    </span>
                    <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 shrink-0">
                      ({selectedItem.type === 'country' && 'Davlat'}
                      {selectedItem.type === 'river' && 'Daryo'}
                      {selectedItem.type === 'mountain' && 'Togʻ'}
                      {selectedItem.type === 'peak' && 'Choʻqqi'}
                      {selectedItem.type === 'lake' && 'Koʻl'}
                      {selectedItem.type === 'desert' && 'Choʻl'}
                      {selectedItem.type === 'city' && (selectedItem.isCapital ? 'Poytaxt' : 'Shahar')}
                      {selectedItem.type === 'strait' && 'Boʻgʻoz'}
                      {selectedItem.type === 'ocean' && 'Dengiz'})
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setIsModalMinimized(false)}
                      className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Kengaytirish"
                      aria-label="Kengaytirish"
                    >
                      <CaretUp size={14} weight="bold" />
                    </button>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Yopish"
                      aria-label="Yopish"
                    >
                      <X size={14} weight="bold" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Full detail card with minimize button */
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                        {selectedItem.flag && <span className="text-base">{selectedItem.flag}</span>}
                        <span>{selectedItem.name || selectedItem.title}</span>
                      </h3>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {selectedItem.type === 'country' && 'Davlat'}
                        {selectedItem.type === 'river' && 'Daryo'}
                        {selectedItem.type === 'mountain' && 'Togʻ tizmasi'}
                        {selectedItem.type === 'peak' && 'Choʻqqi'}
                        {selectedItem.type === 'lake' && 'Koʻl'}
                        {selectedItem.type === 'desert' && 'Choʻl'}
                        {selectedItem.type === 'city' && (selectedItem.isCapital ? 'Poytaxt shahar' : 'Yirik shahar')}
                        {selectedItem.type === 'strait' && 'Boʻgʻoz / Kanal'}
                        {selectedItem.type === 'ocean' && 'Okean / Dengiz'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setIsModalMinimized(true)}
                        className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Xaritani toʻsmay turishi uchun kichraytirish"
                        aria-label="Kichraytirish"
                      >
                        <CaretDown size={14} weight="bold" />
                      </button>
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Yopish"
                        aria-label="Yopish"
                      >
                        <X size={14} weight="bold" />
                      </button>
                    </div>
                  </div>

                  {/* Data attributes grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {selectedItem.capital && (
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Poytaxti:</span>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedItem.capital}</p>
                      </div>
                    )}
                    {selectedItem.continent && (
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Qitʼasi:</span>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedItem.continent}</p>
                      </div>
                    )}
                    {selectedItem.population && (
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Aholisi:</span>
                        <p className="font-bold text-slate-900 dark:text-white tabular-nums">{selectedItem.population}</p>
                      </div>
                    )}
                    {selectedItem.length && (
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Uzunligi:</span>
                        <p className="font-bold text-slate-900 dark:text-white tabular-nums">{selectedItem.length}</p>
                      </div>
                    )}
                    {selectedItem.height && (
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Balandligi:</span>
                        <p className="font-bold text-slate-900 dark:text-white tabular-nums">{selectedItem.height}</p>
                      </div>
                    )}
                    {selectedItem.highestPeak && (
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Eng baland choʻqqi:</span>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedItem.highestPeak}</p>
                      </div>
                    )}
                    {selectedItem.area && (
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Maydoni:</span>
                        <p className="font-bold text-slate-900 dark:text-white tabular-nums">{selectedItem.area}</p>
                      </div>
                    )}
                    {selectedItem.depth && (
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Chuqurligi:</span>
                        <p className="font-bold text-slate-900 dark:text-white tabular-nums">{selectedItem.depth}</p>
                      </div>
                    )}
                    {selectedItem.country && (
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 col-span-2">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Davlat(lar):</span>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedItem.country}</p>
                      </div>
                    )}
                    {selectedItem.source && (
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 col-span-2">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Boshlanishi:</span>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedItem.source}</p>
                      </div>
                    )}
                    {selectedItem.mouth && (
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 col-span-2">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Quyilishi:</span>
                        <p className="font-bold text-slate-900 dark:text-white">{selectedItem.mouth}</p>
                      </div>
                    )}
                  </div>

                  {/* Geographic fact */}
                  {selectedItem.fact && (
                    <div className="p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-xs text-slate-800 dark:text-slate-200 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 text-[10px]">
                        <Sparkle size={12} weight="fill" />
                        <span>Geografik ahamiyati</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">
                        {selectedItem.fact}
                      </p>
                    </div>
                  )}

                  {/* Re-center button */}
                  {selectedItem.coords && (
                    <button
                      onClick={() => flyToCoord(selectedItem.coords[1], selectedItem.coords[0], 8, true)}
                      className="w-full h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <NavigationArrow size={13} weight="bold" />
                      <span>Xaritada markazlash</span>
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
