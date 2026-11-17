import { useEffect, useRef } from 'react';
import { geoOrthographic, geoPath, geoGraticule, geoDistance } from 'd3-geo';
import { feature } from 'topojson-client';
import landTopo from 'world-atlas/land-110m.json';
import countriesTopo from 'world-atlas/countries-110m.json';
import { useTheme } from '../context/ThemeContext';

const landData = feature(landTopo, landTopo.objects.land);
const countriesData = feature(countriesTopo, countriesTopo.objects.countries);

// Uzbekistan coordinates (Tashkent center area)
const UZB_COORDS = [69.2401, 41.2995];

// ── Major World City Lights Coordinates: [lon, lat, intensity, radius, isCapital] ──
const BASE_CITIES = [
  // ── Uzbekistan (High density core for GEOBEK) ──
  [69.24, 41.30, 1.0, 3.8, true],   // Tashkent
  [66.97, 39.65, 0.9, 2.6, false],  // Samarkand
  [64.42, 39.77, 0.85, 2.4, false], // Bukhara
  [71.78, 40.38, 0.9, 2.5, false],  // Fergana
  [72.34, 40.78, 0.9, 2.5, false],  // Andijan
  [71.67, 40.99, 0.9, 2.5, false],  // Namangan
  [59.61, 42.46, 0.75, 2.0, false], // Nukus
  [60.63, 41.55, 0.75, 2.0, false], // Urgench
  [60.36, 41.38, 0.7, 1.8, false],  // Khiva
  [65.37, 40.08, 0.8, 2.2, false],  // Navoi
  [65.80, 38.86, 0.8, 2.2, false],  // Qarshi
  [67.27, 37.22, 0.75, 2.0, false], // Termez
  [67.84, 40.12, 0.75, 2.0, false], // Jizzakh
  [68.78, 40.49, 0.7, 1.8, false],  // Gulistan
  [66.0, 40.2, 0.6, 1.5, false],
  [71.2, 40.6, 0.65, 1.6, false],

  // ── Central Asia & Neighbors ──
  [76.92, 43.23, 0.95, 3.0, false], // Almaty
  [71.43, 51.16, 0.9, 2.8, true],   // Astana
  [69.60, 42.32, 0.8, 2.2, false],  // Shymkent
  [74.58, 42.87, 0.85, 2.5, true],  // Bishkek
  [68.78, 38.56, 0.85, 2.5, true],  // Dushanbe
  [58.38, 37.95, 0.85, 2.5, true],  // Ashgabat
  [50.00, 40.40, 0.9, 2.8, true],   // Baku
  [44.78, 41.72, 0.85, 2.4, true],  // Tbilisi
  [44.51, 40.18, 0.85, 2.4, true],  // Yerevan

  // ── Middle East ──
  [55.27, 25.20, 1.0, 3.6, false],  // Dubai
  [54.37, 24.47, 0.9, 2.8, true],   // Abu Dhabi
  [51.53, 25.28, 0.9, 2.6, true],   // Doha
  [47.98, 29.37, 0.85, 2.4, true],  // Kuwait City
  [46.67, 24.71, 1.0, 3.4, true],   // Riyadh
  [39.19, 21.48, 0.9, 2.8, false],  // Jeddah
  [39.82, 21.42, 0.9, 2.6, false],  // Mecca
  [51.39, 35.69, 1.0, 3.6, true],   // Tehran
  [51.67, 32.65, 0.8, 2.4, false],  // Isfahan
  [59.60, 36.30, 0.8, 2.4, false],  // Mashhad
  [44.36, 33.31, 0.9, 2.8, true],   // Baghdad
  [34.78, 32.08, 0.95, 2.8, false], // Tel Aviv
  [35.92, 31.95, 0.85, 2.4, true],  // Amman
  [35.50, 33.89, 0.85, 2.4, true],  // Beirut
  [31.23, 30.04, 1.0, 4.0, true],   // Cairo
  [29.92, 31.20, 0.9, 2.8, false],  // Alexandria
  [31.0, 30.7, 0.8, 2.2, false],    // Nile Delta
  [32.3, 31.2, 0.75, 2.0, false],   // Port Said

  // ── Europe ──
  [28.98, 41.01, 1.0, 4.0, false],  // Istanbul
  [32.85, 39.93, 0.9, 2.8, true],   // Ankara
  [27.14, 38.42, 0.85, 2.4, false], // Izmir
  [23.73, 37.98, 0.9, 2.8, true],   // Athens
  [37.62, 55.75, 1.0, 4.2, true],   // Moscow
  [30.33, 59.93, 0.95, 3.2, false], // St. Petersburg
  [44.00, 56.32, 0.8, 2.2, false],  // Nizhny Novgorod
  [49.12, 55.79, 0.8, 2.2, false],  // Kazan
  [50.15, 53.20, 0.8, 2.2, false],  // Samara
  [60.60, 56.84, 0.85, 2.4, false], // Yekaterinburg
  [30.52, 50.45, 0.9, 2.8, true],   // Kyiv
  [21.01, 52.23, 0.9, 2.8, true],   // Warsaw
  [14.42, 50.08, 0.9, 2.6, true],   // Prague
  [19.04, 47.50, 0.9, 2.6, true],   // Budapest
  [16.37, 48.21, 0.9, 2.8, true],   // Vienna
  [13.40, 52.52, 1.0, 3.6, true],   // Berlin
  [9.99, 53.55, 0.9, 2.8, false],   // Hamburg
  [11.58, 48.14, 0.9, 2.8, false],  // Munich
  [8.68, 50.11, 0.95, 3.0, false],  // Frankfurt
  [6.96, 50.94, 1.0, 3.5, false],   // Cologne/Ruhr
  [4.35, 50.85, 1.0, 3.4, true],    // Brussels
  [4.90, 52.37, 1.0, 3.4, true],    // Amsterdam
  [2.35, 48.85, 1.0, 4.0, true],    // Paris
  [4.83, 45.76, 0.85, 2.4, false],  // Lyon
  [5.37, 43.30, 0.85, 2.4, false],  // Marseille
  [-0.12, 51.50, 1.0, 4.2, true],   // London
  [-1.90, 52.48, 0.9, 2.8, false],  // Birmingham
  [-2.24, 53.48, 0.9, 2.8, false],  // Manchester
  [-3.19, 55.95, 0.8, 2.2, false],  // Edinburgh
  [-6.26, 53.35, 0.85, 2.4, true],  // Dublin
  [9.19, 45.46, 1.0, 3.6, false],   // Milan
  [12.50, 41.90, 0.95, 3.2, true],  // Rome
  [14.26, 40.85, 0.9, 2.6, false],  // Naples
  [-3.70, 40.42, 1.0, 3.6, true],   // Madrid
  [2.17, 41.39, 0.95, 3.2, false],  // Barcelona
  [-0.37, 39.47, 0.85, 2.4, false], // Valencia
  [-9.14, 38.72, 0.9, 2.6, true],   // Lisbon
  [18.06, 59.33, 0.85, 2.4, true],  // Stockholm
  [10.75, 59.91, 0.8, 2.2, true],   // Oslo
  [12.57, 55.68, 0.85, 2.4, true],  // Copenhagen
  [24.94, 60.17, 0.8, 2.2, true],   // Helsinki

  // ── East & Southeast Asia ──
  [139.69, 35.69, 1.0, 4.4, true],  // Tokyo
  [135.50, 34.69, 1.0, 3.8, false], // Osaka
  [136.90, 35.18, 0.95, 3.0, false],// Nagoya
  [130.40, 33.60, 0.85, 2.4, false],// Fukuoka
  [126.98, 37.57, 1.0, 4.2, true],  // Seoul
  [129.07, 35.18, 0.95, 3.0, false],// Busan
  [116.40, 39.90, 1.0, 4.2, true],  // Beijing
  [117.20, 39.13, 0.95, 3.2, false],// Tianjin
  [121.47, 31.23, 1.0, 4.4, false], // Shanghai
  [120.15, 30.27, 0.95, 3.0, false],// Hangzhou
  [118.80, 32.06, 0.95, 3.0, false],// Nanjing
  [113.26, 23.13, 1.0, 4.0, false], // Guangzhou
  [114.06, 22.54, 1.0, 3.8, false], // Shenzhen
  [114.17, 22.32, 1.0, 3.8, false], // Hong Kong
  [121.56, 25.03, 1.0, 3.4, true],  // Taipei
  [114.30, 30.59, 0.95, 3.0, false],// Wuhan
  [104.07, 30.66, 0.95, 3.2, false],// Chengdu
  [106.55, 29.56, 0.95, 3.2, false],// Chongqing
  [108.94, 34.34, 0.9, 2.8, false], // Xi'an
  [120.98, 14.60, 1.0, 3.8, true],  // Manila
  [100.50, 13.75, 1.0, 3.8, true],  // Bangkok
  [103.82, 1.35, 1.0, 3.6, true],   // Singapore
  [101.69, 3.14, 0.95, 3.2, true],  // Kuala Lumpur
  [106.84, -6.20, 1.0, 4.0, true],  // Jakarta
  [112.75, -7.25, 0.9, 2.8, false], // Surabaya
  [106.63, 10.82, 0.95, 3.2, false],// Ho Chi Minh City
  [105.85, 21.03, 0.9, 2.8, true],  // Hanoi

  // ── South Asia ──
  [77.10, 28.70, 1.0, 4.2, true],   // Delhi
  [72.88, 19.07, 1.0, 4.0, false],  // Mumbai
  [77.59, 12.97, 0.95, 3.2, false], // Bangalore
  [80.27, 13.08, 0.9, 2.8, false],  // Chennai
  [88.36, 22.57, 0.95, 3.2, false], // Kolkata
  [78.48, 17.38, 0.9, 2.8, false],  // Hyderabad
  [72.57, 23.02, 0.9, 2.8, false],  // Ahmedabad
  [67.00, 24.86, 1.0, 3.6, false],  // Karachi
  [74.35, 31.52, 0.95, 3.2, false], // Lahore
  [73.05, 33.68, 0.85, 2.4, true],  // Islamabad
  [90.41, 23.81, 1.0, 3.4, true],   // Dhaka

  // ── North America ──
  [-74.00, 40.71, 1.0, 4.4, false], // New York City
  [-71.06, 42.36, 0.95, 3.2, false],// Boston
  [-75.16, 39.95, 0.95, 3.2, false],// Philadelphia
  [-77.03, 38.90, 1.0, 3.4, true],  // Washington DC
  [-84.39, 33.75, 0.95, 3.2, false],// Atlanta
  [-80.19, 25.76, 1.0, 3.6, false], // Miami
  [-87.63, 41.88, 1.0, 4.0, false], // Chicago
  [-83.04, 42.33, 0.9, 2.8, false], // Detroit
  [-95.37, 29.76, 1.0, 3.6, false], // Houston
  [-96.80, 32.78, 1.0, 3.6, false], // Dallas
  [-104.99, 39.74, 0.9, 2.8, false],// Denver
  [-112.07, 33.45, 0.95, 3.0, false],// Phoenix
  [-115.14, 36.17, 0.95, 3.2, false],// Las Vegas
  [-118.24, 34.05, 1.0, 4.4, false],// Los Angeles
  [-117.16, 32.72, 0.9, 2.8, false],// San Diego
  [-122.42, 37.77, 1.0, 3.8, false],// San Francisco
  [-122.33, 47.61, 0.95, 3.2, false],// Seattle
  [-79.38, 43.65, 1.0, 3.6, false], // Toronto
  [-73.56, 45.50, 0.95, 3.0, false],// Montreal
  [-123.12, 49.28, 0.9, 2.8, false],// Vancouver
  [-99.13, 19.43, 1.0, 4.2, true],  // Mexico City
  [-103.35, 20.67, 0.85, 2.6, false],// Guadalajara
  [-100.31, 25.68, 0.85, 2.6, false],// Monterrey

  // ── South America ──
  [-46.63, -23.55, 1.0, 4.2, false],// Sao Paulo
  [-43.17, -22.90, 1.0, 3.6, false],// Rio de Janeiro
  [-58.38, -34.60, 1.0, 3.8, true], // Buenos Aires
  [-70.67, -33.45, 0.95, 3.0, true],// Santiago
  [-77.04, -12.04, 0.95, 3.0, true],// Lima
  [-74.07, 4.71, 0.95, 3.0, true],  // Bogota
  [-47.93, -15.78, 0.85, 2.5, true],// Brasilia

  // ── Africa & Oceania ──
  [28.04, -26.20, 0.95, 3.2, false],// Johannesburg
  [18.42, -33.92, 0.85, 2.6, true], // Cape Town
  [3.39, 6.52, 0.95, 3.2, false],   // Lagos
  [36.82, -1.29, 0.85, 2.6, true],  // Nairobi
  [-7.60, 33.57, 0.85, 2.6, false], // Casablanca
  [151.21, -33.87, 1.0, 3.4, false],// Sydney
  [144.96, -37.81, 0.95, 3.2, false],// Melbourne
  [153.02, -27.47, 0.85, 2.6, false],// Brisbane
  [115.86, -31.95, 0.85, 2.4, false],// Perth
  [174.76, -36.85, 0.85, 2.4, false],// Auckland
];

// Generate secondary suburban light clusters around major cities for realistic constellation density
const ALL_CITY_LIGHTS = [];
BASE_CITIES.forEach(([lon, lat, intensity, radius, isCapital]) => {
  ALL_CITY_LIGHTS.push([lon, lat, intensity, radius, isCapital]);
  // 2-3 suburban satellites per metropolitan hub
  const subCount = isCapital ? 4 : 2;
  for (let i = 0; i < subCount; i++) {
    const angle = (i * Math.PI * 2) / subCount + 0.35;
    const dist = 0.45 + (i % 2) * 0.35;
    ALL_CITY_LIGHTS.push([
      lon + Math.cos(angle) * dist,
      lat + Math.sin(angle) * (dist * 0.75),
      intensity * 0.55,
      radius * 0.55,
      false,
    ]);
  }
});

export default function EarthDetailedGlobe({
  size = 200,
  interactive = true,
  className = '',
  isDark,
}) {
  const canvasRef = useRef(null);
  const themeContext = useTheme();

  // Determine current active theme
  const isDarkMode = isDark !== undefined
    ? isDark
    : (themeContext?.darkMode ?? (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')));

  const stateRef = useRef({
    yaw: 65,
    pitch: -18,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    pulse: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.42;

    const projection = geoOrthographic()
      .scale(radius)
      .translate([cx, cy])
      .clipAngle(90);

    const path = geoPath(projection, ctx);
    const graticule = geoGraticule().step([20, 20])();
    const equator = {
      type: 'LineString',
      coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]],
    };

    let animationFrameId;

    const render = () => {
      const state = stateRef.current;

      if (!state.isDragging) {
        state.yaw = (state.yaw + 0.35) % 360;
      }
      state.pulse = (state.pulse + 0.045) % (Math.PI * 2);

      projection.rotate([state.yaw, state.pitch, 0]);

      ctx.clearRect(0, 0, size, size);

      if (isDarkMode) {
        // ════════════════════════════════════════════════════════════
        // ── DARK MODE: PHOTOREALISTIC NIGHT EARTH WITH CITY LIGHTS ──
        // ════════════════════════════════════════════════════════════

        // 1. Outer Deep Cosmic & Cyan Aurora Atmosphere Rim Glow
        const atmoGrad = ctx.createRadialGradient(cx, cy, radius * 0.94, cx, cy, radius * 1.18);
        atmoGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
        atmoGrad.addColorStop(0.3, 'rgba(37, 99, 235, 0.25)');
        atmoGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.12)');
        atmoGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');
        ctx.fillStyle = atmoGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 1.18, 0, Math.PI * 2);
        ctx.fill();

        // Spherical Clip
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.clip();

        // 2. Midnight Deep Space Ocean
        const nightOcean = ctx.createRadialGradient(
          cx - radius * 0.3,
          cy - radius * 0.3,
          radius * 0.1,
          cx,
          cy,
          radius
        );
        nightOcean.addColorStop(0, '#0a1532');   // Deep midnight blue glow
        nightOcean.addColorStop(0.4, '#060d22'); // Inky deep sea
        nightOcean.addColorStop(0.8, '#020617'); // Space black abyss
        nightOcean.addColorStop(1, '#000208');   // Stygian rim
        ctx.fillStyle = nightOcean;
        ctx.fillRect(0, 0, size, size);

        // 3. Faint Night Graticule Grid
        ctx.beginPath();
        path(graticule);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.06)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // 4. Continents & Islands (Shadowy Nocturnal Terrain Silhouette)
        ctx.beginPath();
        path(landData);
        ctx.fillStyle = '#0f1c3a'; // Dark indigo-slate landmass
        ctx.fill();

        // Coastlines: glowing oceanic edge
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.32)';
        ctx.lineWidth = 0.75;
        ctx.stroke();

        // Country Boundaries
        ctx.beginPath();
        path(countriesData);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.09)';
        ctx.lineWidth = 0.4;
        ctx.stroke();

        // 5. ── GLOWING NIGHT CITY LIGHTS (Shahar chiroqlari) ──
        const centerLon = -state.yaw;
        const centerLat = -state.pitch;

        ALL_CITY_LIGHTS.forEach(([lon, lat, intensity, lightRad, isCap], idx) => {
          const distToCenter = geoDistance([lon, lat], [centerLon, centerLat]);
          if (distToCenter >= Math.PI / 2) return; // Hidden on back of globe

          const pt = projection([lon, lat]);
          if (!pt) return;

          const [x, y] = pt;
          const facing = Math.cos(distToCenter); // Fades toward the sphere edge
          const flicker = 0.88 + Math.sin(state.pulse * 2 + idx * 0.7) * 0.12;
          const alpha = intensity * facing * flicker;

          // Outer Warm Amber Halo
          ctx.beginPath();
          ctx.arc(x, y, lightRad * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${0.28 * alpha})`;
          ctx.fill();

          // Intense Golden/White Hot Core
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.7, lightRad * 0.7), 0, Math.PI * 2);
          ctx.fillStyle = isCap
            ? `rgba(255, 255, 255, ${0.98 * alpha})`
            : `rgba(254, 240, 138, ${0.92 * alpha})`;
          ctx.fill();
        });

        // 6. Uzbekistan Radiant Night Beacon (Heart of GEOBEK)
        const distUzb = geoDistance(UZB_COORDS, [centerLon, centerLat]);
        if (distUzb < Math.PI / 2) {
          const uzbPt = projection(UZB_COORDS);
          if (uzbPt) {
            const [ux, uy] = uzbPt;
            const pulseScale = 1 + Math.sin(state.pulse * 1.5) * 0.35;

            // Concentric Radar Waves
            ctx.beginPath();
            ctx.arc(ux, uy, 7 * pulseScale, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.85 - pulseScale * 0.25})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(ux, uy, 12 * pulseScale, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(250, 204, 21, ${0.5 - pulseScale * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Diamond Golden Core
            ctx.beginPath();
            ctx.arc(ux, uy, 3.8, 0, Math.PI * 2);
            ctx.fillStyle = '#F59E0B';
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Luminous Glow Label
            ctx.font = 'bold 9px sans-serif';
            ctx.fillStyle = '#67E8F9';
            ctx.shadowColor = 'rgba(6, 182, 212, 0.9)';
            ctx.shadowBlur = 6;
            ctx.fillText('UZB', ux + 6, uy - 4);
            ctx.shadowBlur = 0;
          }
        }

        // 7. Night Spherical Occlusion Shadow
        const nightShadow = ctx.createRadialGradient(
          cx - radius * 0.2,
          cy - radius * 0.2,
          radius * 0.3,
          cx,
          cy,
          radius
        );
        nightShadow.addColorStop(0, 'rgba(0, 0, 0, 0)');
        nightShadow.addColorStop(0.7, 'rgba(0, 2, 10, 0.25)');
        nightShadow.addColorStop(1, 'rgba(0, 2, 8, 0.85)');
        ctx.fillStyle = nightShadow;
        ctx.fillRect(0, 0, size, size);

        // 8. Thin Electric Rim Light Arc
        ctx.restore(); // Restore clip
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
        ctx.lineWidth = 1.4;
        ctx.stroke();

      } else {
        // ════════════════════════════════════════════════════════════
        // ── LIGHT MODE: VIBRANT SUNLIT DAYTIME CARTOGRAPHIC GLOBE ──
        // ════════════════════════════════════════════════════════════

        // 1. Atmosphere Sunlight Scatter Glow
        const atmoGrad = ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.18);
        atmoGrad.addColorStop(0, 'rgba(56, 189, 248, 0.5)');
        atmoGrad.addColorStop(0.4, 'rgba(37, 99, 235, 0.25)');
        atmoGrad.addColorStop(0.8, 'rgba(29, 78, 216, 0.08)');
        atmoGrad.addColorStop(1, 'rgba(30, 64, 175, 0)');
        ctx.fillStyle = atmoGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 1.18, 0, Math.PI * 2);
        ctx.fill();

        // Spherical Clip
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.clip();

        // 2. Sunlit Azure Ocean with Radial Lighting
        const oceanGrad = ctx.createRadialGradient(
          cx - radius * 0.35,
          cy - radius * 0.35,
          radius * 0.08,
          cx,
          cy,
          radius
        );
        oceanGrad.addColorStop(0, '#38BDF8');   // Sunlit brilliant cyan
        oceanGrad.addColorStop(0.25, '#2563EB');// Azure blue
        oceanGrad.addColorStop(0.65, '#1D4ED8');// Deep ocean
        oceanGrad.addColorStop(0.9, '#1E3A8A'); // Abyss blue
        oceanGrad.addColorStop(1, '#0F172A');   // Oceanic rim shadow
        ctx.fillStyle = oceanGrad;
        ctx.fillRect(0, 0, size, size);

        // 3. Crisp Lat/Lon Graticules
        ctx.beginPath();
        path(graticule);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.65;
        ctx.stroke();

        // Equator Accent
        ctx.beginPath();
        path(equator);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // 4. Natural Earth Continents (Vibrant Cartographic Emerald)
        ctx.beginPath();
        path(landData);
        ctx.fillStyle = '#22C55E'; // Lush vibrant terrain green
        ctx.fill();

        // Coastlines
        ctx.strokeStyle = '#15803D';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Country Boundaries
        ctx.beginPath();
        path(countriesData);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // 5. Uzbekistan Location Beacon
        const centerLon = -state.yaw;
        const centerLat = -state.pitch;
        const distToCenter = geoDistance(UZB_COORDS, [centerLon, centerLat]);

        if (distToCenter < Math.PI / 2) {
          const uzbPt = projection(UZB_COORDS);
          if (uzbPt) {
            const [ux, uy] = uzbPt;
            const pulseScale = 1 + Math.sin(state.pulse) * 0.32;

            // Pulse wave
            ctx.beginPath();
            ctx.arc(ux, uy, 6.5 * pulseScale, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.75 - pulseScale * 0.22})`;
            ctx.lineWidth = 1.3;
            ctx.stroke();

            // Beacon core
            ctx.beginPath();
            ctx.arc(ux, uy, 3.4, 0, Math.PI * 2);
            ctx.fillStyle = '#F59E0B';
            ctx.fill();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Cartographic text label
            ctx.font = 'bold 9px sans-serif';
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = 'rgba(0,0,0,0.85)';
            ctx.shadowBlur = 3;
            ctx.fillText('UZB', ux + 5, uy - 3);
            ctx.shadowBlur = 0;
          }
        }

        // 6. 3D Spherical Normal Shadow (Daytime depth)
        const shadowGrad = ctx.createRadialGradient(
          cx - radius * 0.25,
          cy - radius * 0.25,
          radius * 0.45,
          cx,
          cy,
          radius
        );
        shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        shadowGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.16)');
        shadowGrad.addColorStop(1, 'rgba(5, 10, 25, 0.68)');
        ctx.fillStyle = shadowGrad;
        ctx.fillRect(0, 0, size, size);

        // 7. Specular Sunlight Glint
        const sheenGrad = ctx.createRadialGradient(
          cx - radius * 0.42,
          cy - radius * 0.42,
          2,
          cx - radius * 0.42,
          cy - radius * 0.42,
          radius * 0.65
        );
        sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.42)');
        sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.09)');
        sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = sheenGrad;
        ctx.fillRect(0, 0, size, size);

        ctx.restore(); // Restore clip

        // 8. Crisp Rim Lighting Ring
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.55)';
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [size, isDarkMode]);

  // Pointer drag to inspect/spin globe
  const handlePointerDown = (e) => {
    if (!interactive) return;
    const state = stateRef.current;
    state.isDragging = true;
    state.lastX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    state.lastY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
  };

  const handlePointerMove = (e) => {
    if (!interactive) return;
    const state = stateRef.current;
    if (!state.isDragging) return;

    const currentX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const currentY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    const dx = currentX - state.lastX;
    const dy = currentY - state.lastY;

    state.yaw = (state.yaw + dx * 0.6) % 360;
    state.pitch = Math.max(-60, Math.min(60, state.pitch - dy * 0.4));

    state.lastX = currentX;
    state.lastY = currentY;
  };

  const handlePointerUp = () => {
    stateRef.current.isDragging = false;
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size, display: 'block', cursor: interactive ? 'grab' : 'default' }}
      />
    </div>
  );
}
