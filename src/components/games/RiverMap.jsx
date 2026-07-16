import { useMemo, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { worldCountries } from '../../data/worldCountries';

const WIDTH = 800;
const HEIGHT = 440;
const HIT_THRESHOLD = 28;

const projection = geoEqualEarth().scale(135).translate([WIDTH / 2, HEIGHT / 2 + 20]);
const pathGen = geoPath(projection);

function riverLineFeature(river) {
  return { type: 'Feature', geometry: { type: 'MultiLineString', coordinates: river.paths } };
}

function distanceToPath(pathEl, pt) {
  const len = pathEl.getTotalLength();
  if (!len) return Infinity;
  const steps = Math.max(10, Math.ceil(len / 6));
  let min = Infinity;
  for (let i = 0; i <= steps; i++) {
    const p = pathEl.getPointAtLength((i / steps) * len);
    const d = Math.hypot(p.x - pt.x, p.y - pt.y);
    if (d < min) min = d;
    if (min < 2) break;
  }
  return min;
}

export default function RiverMap({
  rivers, highlightId, clickable, flash, revealId, onPick,
  center, zoom = 1, pan: externalPan, onPanChange, onZoomChange,
}) {
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const hitPathRefs = useRef({});

  const panRef = useRef(externalPan || { x: 0, y: 0 });
  const dragRef = useRef(null);
  const draggedRef = useRef(false);
  const pinchRef = useRef(null); // { initialDist, initialZoom, initialPan, svgMid }
  const zoomRef = useRef(zoom);
  useEffect(() => { zoomRef.current = zoom; }, [zoom]);

  const [cx, cy] = useMemo(() => projection(center || [20, 15]) || [WIDTH / 2, HEIGHT / 2], [center]);
  const cxRef = useRef(cx);
  const cyRef = useRef(cy);
  useEffect(() => { cxRef.current = cx; cyRef.current = cy; }, [cx, cy]);

  const applyTransform = useCallback((pan, withTransition = false) => {
    if (!gRef.current) return;
    gRef.current.style.willChange = 'transform';
    gRef.current.style.transition = withTransition ? 'transform 150ms ease-out' : 'none';
    gRef.current.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;
    gRef.current.style.transformOrigin = `${cx}px ${cy}px`;
  }, [zoom, cx, cy]);

  useLayoutEffect(() => {
    panRef.current = externalPan || { x: 0, y: 0 };
    applyTransform(panRef.current, true);
  }, [externalPan, applyTransform]);

  useLayoutEffect(() => {
    applyTransform(panRef.current, true);
  }, [zoom, applyTransform]);

  const setTransform = useCallback((pan, z) => {
    const g = gRef.current;
    if (!g) return;
    const cx = cxRef.current, cy = cyRef.current;
    g.style.transformOrigin = `${cx}px ${cy}px`;
    g.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${z})`;
  }, []);

  // Native touch/pointer listeners — passive:false so we can preventDefault and stop page scroll
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const onDown = (e) => {
      e.preventDefault();
      if (gRef.current) gRef.current.style.transition = 'none';

      if (e.touches && e.touches.length === 2) {
        // ── Pinch start ──
        dragRef.current = null;
        const t0 = e.touches[0], t1 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        const midClient = { x: (t0.clientX + t1.clientX) / 2, y: (t0.clientY + t1.clientY) / 2 };
        const svgEl = svgRef.current;
        const pt = svgEl.createSVGPoint();
        pt.x = midClient.x; pt.y = midClient.y;
        const ctm = svgEl.getScreenCTM();
        const svgMid = ctm ? pt.matrixTransform(ctm.inverse()) : { x: WIDTH / 2, y: HEIGHT / 2 };
        pinchRef.current = {
          initialDist: dist,
          initialZoom: zoomRef.current,
          initialPan: { ...panRef.current },
          svgMid,
        };
        return;
      }

      // ── Pan start ──
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      dragRef.current = { startClient: { x: clientX, y: clientY }, startPan: { ...panRef.current } };
      draggedRef.current = false;
    };

    const onMove = (e) => {
      e.preventDefault();

      if (e.touches && e.touches.length === 2 && pinchRef.current) {
        // ── Pinch move ──
        const t0 = e.touches[0], t1 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        const { initialDist, initialZoom, initialPan, svgMid } = pinchRef.current;
        const zr = dist / initialDist; // ratio from initial
        const newZoom = Math.max(1, Math.min(6, initialZoom * zr));
        const zoomRatio = newZoom / initialZoom;
        const cx = cxRef.current, cy = cyRef.current;
        // Keep svgMid fixed: pan_new = (svgMid - cx)*(1 - zoomRatio) + initialPan * zoomRatio
        const newPan = {
          x: (svgMid.x - cx) * (1 - zoomRatio) + initialPan.x * zoomRatio,
          y: (svgMid.y - cy) * (1 - zoomRatio) + initialPan.y * zoomRatio,
        };
        panRef.current = newPan;
        zoomRef.current = newZoom;
        setTransform(newPan, newZoom);
        draggedRef.current = true; // prevent tap on pinch-end
        return;
      }

      if (!dragRef.current) return;

      // ── Pan move ──
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - dragRef.current.startClient.x;
      const dy = clientY - dragRef.current.startClient.y;
      if (Math.hypot(dx, dy) > 6) draggedRef.current = true;
      const newPan = { x: dragRef.current.startPan.x + dx, y: dragRef.current.startPan.y + dy };
      panRef.current = newPan;
      setTransform(newPan, zoomRef.current);
    };

    const onUp = (e) => {
      if (gRef.current) gRef.current.style.transition = 'transform 150ms ease-out';

      if (pinchRef.current) {
        pinchRef.current = null;
        onZoomChange?.(zoomRef.current);
        onPanChange?.(panRef.current);
        return;
      }

      if (!dragRef.current) return;
      const wasDragged = draggedRef.current;
      dragRef.current = null;
      onPanChange?.(panRef.current);

      if (!wasDragged && clickable) {
        const touch = e.changedTouches?.[0];
        const clientX = touch ? touch.clientX : e.clientX;
        const clientY = touch ? touch.clientY : e.clientY;
        handleTap(clientX, clientY);
      }
    };

    el.addEventListener('touchstart', onDown, { passive: false });
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('touchend', onUp, { passive: false });
    el.addEventListener('touchcancel', onUp, { passive: false });
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    return () => {
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onUp);
      el.removeEventListener('touchcancel', onUp);
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickable, onPanChange, onZoomChange, setTransform]);

  const handleTap = useCallback((clientX, clientY) => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const pt = svgEl.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const svgCTM = svgEl.getScreenCTM();
    if (!svgCTM) return;
    const svgPt = pt.matrixTransform(svgCTM.inverse());

    const pan = panRef.current;
    const z = zoomRef.current;
    const cx = cxRef.current;
    const cy = cyRef.current;
    const gPt = {
      x: (svgPt.x - pan.x - cx) / z + cx,
      y: (svgPt.y - pan.y - cy) / z + cy,
    };

    let minDist = HIT_THRESHOLD;
    let picked = null;
    for (const river of rivers) {
      const pathEl = hitPathRefs.current[river.id];
      if (!pathEl) continue;
      const d = distanceToPath(pathEl, gPt);
      if (d < minDist) {
        minDist = d;
        picked = river;
      }
    }
    if (picked) onPick(picked);
  }, [rivers, onPick]);

  const countryPaths = useMemo(() => worldCountries.features.map(f => ({ id: f.id, d: pathGen(f) })), []);
  const riverPaths = useMemo(() => rivers.map(r => ({ id: r.id, d: pathGen(riverLineFeature(r)) })), [rivers]);

  const getRiverColor = (id) => {
    if (flash?.id === id) return flash.kind === 'correct' ? '#22C55E' : '#EF4444';
    if (revealId === id) return '#22C55E';
    if (highlightId === id) return '#2563EB';
    return '#5FA8D3';
  };
  const getRiverWidth = (id) => (highlightId === id || flash?.id === id || revealId === id) ? 2.8 : 0.9;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full select-none"
      style={{ touchAction: 'none', userSelect: 'none' }}
    >
      <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#DCEEF7" />
      <g ref={gRef}>
        {countryPaths.map(c => (
          <path key={c.id} d={c.d} fill="#EFE9DA" stroke="#B9AF95" strokeWidth={0.5} />
        ))}
        {riverPaths.map(r => (
          <path
            key={r.id}
            d={r.d}
            fill="none"
            stroke={getRiverColor(r.id)}
            strokeWidth={getRiverWidth(r.id)}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'stroke 150ms, stroke-width 150ms', pointerEvents: 'none' }}
          />
        ))}
        {clickable && riverPaths.map(r => (
          <path
            key={`hit-${r.id}`}
            ref={el => { hitPathRefs.current[r.id] = el; }}
            d={r.d}
            fill="none"
            stroke="transparent"
            strokeWidth={1}
            strokeLinecap="round"
            style={{ pointerEvents: 'none' }}
          />
        ))}
      </g>
    </svg>
  );
}
