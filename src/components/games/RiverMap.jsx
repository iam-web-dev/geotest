import { useMemo } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { worldCountries } from '../../data/worldCountries';

const WIDTH = 800;
const HEIGHT = 440;

const projection = geoEqualEarth().scale(135).translate([WIDTH / 2, HEIGHT / 2 + 20]);
const pathGen = geoPath(projection);

function riverLineFeature(river) {
  return { type: 'Feature', geometry: { type: 'MultiLineString', coordinates: river.paths } };
}

export default function RiverMap({ rivers, highlightId, clickable, flash, revealId, onPick, center, zoom = 1, pan, onPanStart, onPanMove, onPanEnd }) {
  const countryPaths = useMemo(() => worldCountries.features.map(f => ({ id: f.id, d: pathGen(f) })), []);
  const riverPaths = useMemo(() => rivers.map(r => ({ id: r.id, d: pathGen(riverLineFeature(r)) })), [rivers]);
  const [cx, cy] = useMemo(() => projection(center || [20, 15]) || [WIDTH / 2, HEIGHT / 2], [center]);

  const getRiverColor = (id) => {
    if (flash?.id === id) return flash.kind === 'correct' ? '#22C55E' : '#EF4444';
    if (revealId === id) return '#22C55E';
    if (highlightId === id) return '#2563EB';
    return '#5FA8D3';
  };
  const getRiverWidth = (id) => (highlightId === id || flash?.id === id || revealId === id) ? 3.2 : 1.8;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full h-full touch-none select-none"
      onPointerDown={onPanStart}
      onPointerMove={onPanMove}
      onPointerUp={onPanEnd}
      onPointerLeave={onPanEnd}
    >
      <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill="#DCEEF7" />
      <g style={{
        transform: `translate(${pan?.x || 0}px, ${pan?.y || 0}px) scale(${zoom})`,
        transformOrigin: `${cx}px ${cy}px`,
        transition: 'transform 150ms ease-out',
      }}>
        {countryPaths.map(c => (
          <path key={c.id} d={c.d} fill="#EFE9DA" stroke="#B9AF95" strokeWidth={0.5} />
        ))}
        {riverPaths.map(r => (
          <g key={r.id}>
            <path d={r.d} fill="none" stroke={getRiverColor(r.id)} strokeWidth={getRiverWidth(r.id)} strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 150ms, stroke-width 150ms' }} />
            {clickable && (
              <path
                d={r.d}
                fill="none"
                stroke="transparent"
                strokeWidth={10}
                strokeLinecap="round"
                onClick={() => onPick(rivers.find(rv => rv.id === r.id))}
                style={{ cursor: 'pointer' }}
              />
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
