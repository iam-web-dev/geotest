import { useEffect, useRef } from 'react';
import { geoOrthographic, geoPath, geoGraticule, geoDistance } from 'd3-geo';
import { feature } from 'topojson-client';
import landTopo from 'world-atlas/land-110m.json';
import countriesTopo from 'world-atlas/countries-110m.json';

const landData = feature(landTopo, landTopo.objects.land);
const countriesData = feature(countriesTopo, countriesTopo.objects.countries);

// Uzbekistan coordinates (Tashkent center area)
const UZB_COORDS = [64.5853, 41.3775];

export default function EarthDetailedGlobe({ size = 200, interactive = true, className = '' }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    yaw: 60,
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
        state.yaw = (state.yaw + 0.4) % 360;
      }
      state.pulse = (state.pulse + 0.05) % (Math.PI * 2);

      projection.rotate([state.yaw, state.pitch, 0]);

      ctx.clearRect(0, 0, size, size);

      // ── Outer Atmosphere Glow ──
      const atmoGrad = ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.16);
      atmoGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      atmoGrad.addColorStop(0.4, 'rgba(37, 99, 235, 0.22)');
      atmoGrad.addColorStop(0.8, 'rgba(29, 78, 216, 0.08)');
      atmoGrad.addColorStop(1, 'rgba(30, 64, 175, 0)');
      ctx.fillStyle = atmoGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.16, 0, Math.PI * 2);
      ctx.fill();

      // ── Spherical Clip ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      // ── Ocean Fill with 3D Radial Lighting ──
      const oceanGrad = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      oceanGrad.addColorStop(0, '#38BDF8');   // Sunlit ocean cyan
      oceanGrad.addColorStop(0.3, '#1D4ED8'); // Azure blue
      oceanGrad.addColorStop(0.7, '#1E3A8A'); // Deep navy
      oceanGrad.addColorStop(1, '#0F172A');   // Dark oceanic rim
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, size, size);

      // ── Graticule Grid Lines (Lat/Lon) ──
      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.lineWidth = 0.65;
      ctx.stroke();

      // ── Equator Highlight ──
      ctx.beginPath();
      path(equator);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── Continents & Islands (Natural Earth 110m exact geometry) ──
      ctx.beginPath();
      path(landData);
      ctx.fillStyle = '#22C55E'; // Lush emerald cartographic land
      ctx.fill();

      // Continent coastlines
      ctx.strokeStyle = '#15803D';
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // ── Country Boundaries ──
      ctx.beginPath();
      path(countriesData);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // ── Uzbekistan Location Beacon ──
      const centerLon = -state.yaw;
      const centerLat = -state.pitch;
      const distToCenter = geoDistance(UZB_COORDS, [centerLon, centerLat]);

      if (distToCenter < Math.PI / 2) {
        const uzbPt = projection(UZB_COORDS);
        if (uzbPt) {
          const [ux, uy] = uzbPt;
          const pulseScale = 1 + Math.sin(state.pulse) * 0.3;

          // Pulse wave
          ctx.beginPath();
          ctx.arc(ux, uy, 6 * pulseScale, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(250, 204, 21, ${0.7 - pulseScale * 0.2})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Core beacon point
          ctx.beginPath();
          ctx.arc(ux, uy, 3.2, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Small cartographic label
          ctx.font = 'bold 9px sans-serif';
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = 'rgba(0,0,0,0.8)';
          ctx.shadowBlur = 3;
          ctx.fillText('UZB', ux + 5, uy - 3);
          ctx.shadowBlur = 0;
        }
      }

      // ── 3D Spherical Shading & Shadow Rim ──
      const shadowGrad = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.25,
        radius * 0.5,
        cx,
        cy,
        radius
      );
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadowGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.15)');
      shadowGrad.addColorStop(1, 'rgba(5, 10, 25, 0.65)');
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(0, 0, size, size);

      // ── Specular Glass Sheen (Atmospheric Light Reflection) ──
      const sheenGrad = ctx.createRadialGradient(
        cx - radius * 0.42,
        cy - radius * 0.42,
        2,
        cx - radius * 0.42,
        cy - radius * 0.42,
        radius * 0.65
      );
      sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      sheenGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.08)');
      sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sheenGrad;
      ctx.fillRect(0, 0, size, size);

      ctx.restore(); // Restore clip

      // ── Crisp Rim Light Ring ──
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [size]);

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
