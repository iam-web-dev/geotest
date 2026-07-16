import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { MagnifyingGlassPlus, MagnifyingGlassMinus, ArrowsCounterClockwise, CaretLeft } from '@phosphor-icons/react';
import { worldCountries, countryPools } from '../../data/worldCountries';
import { shuffle, formatTime, canHover } from '../../lib/utils';
import GameShell from '../../components/games/GameShell';
import { playCorrect, playWrong, playFinish, vibrate } from '../../lib/gameSound';

const TOTAL = 8;
const ROUND_TIME = 20;
const COLOR = '#16A34A';

const continentView = {
  europe:       { center: [15, 54],   zoom: 3.2 },
  asia:         { center: [90, 35],   zoom: 2.2 },
  centralAsia:  { center: [63, 42],   zoom: 4.0 },
  africa:       { center: [20, 5],    zoom: 2.2 },
  northAmerica: { center: [-100, 48], zoom: 2.0 },
  southAmerica: { center: [-60, -15], zoom: 2.2 },
  oceania:      { center: [140, -25], zoom: 2.8 },
  middleEast:   { center: [45, 28],   zoom: 3.5 },
  world:        { center: [0, 10],    zoom: 1.0 },
};

const countryContinent = {
  // Easy
  'Russia': 'europe', 'Canada': 'northAmerica', 'United States of America': 'northAmerica',
  'Brazil': 'southAmerica', 'China': 'asia', 'Australia': 'oceania', 'India': 'asia',
  'Argentina': 'southAmerica', 'Kazakhstan': 'centralAsia', 'Algeria': 'africa',
  'Mexico': 'northAmerica', 'Indonesia': 'oceania', 'Sudan': 'africa',
  'Mongolia': 'asia', 'Saudi Arabia': 'middleEast',
  // Medium
  'France': 'europe', 'Germany': 'europe', 'Spain': 'europe', 'Ukraine': 'europe',
  'Turkey': 'middleEast', 'Egypt': 'africa', 'South Africa': 'africa', 'Nigeria': 'africa',
  'Japan': 'asia', 'Uzbekistan': 'centralAsia', 'Iran': 'middleEast', 'Pakistan': 'asia',
  'Thailand': 'asia', 'Kenya': 'africa', 'Poland': 'europe', 'Italy': 'europe',
  'Sweden': 'europe', 'Norway': 'europe', 'Afghanistan': 'centralAsia',
  'Tajikistan': 'centralAsia', 'Kyrgyzstan': 'centralAsia', 'Turkmenistan': 'centralAsia',
  // Hard
  'Fiji': 'oceania', 'Jamaica': 'northAmerica', 'Lebanon': 'middleEast', 'Israel': 'middleEast',
  'Kuwait': 'middleEast', 'Qatar': 'middleEast', 'Cyprus': 'middleEast',
  'Luxembourg': 'europe', 'Montenegro': 'europe', 'Moldova': 'europe',
  'Slovenia': 'europe', 'Estonia': 'europe', 'eSwatini': 'africa',
  'Djibouti': 'africa', 'Timor-Leste': 'oceania', 'Brunei': 'asia', 'Vanuatu': 'oceania',
};

function getView(countryName) {
  const key = countryContinent[countryName] || 'world';
  return continentView[key];
}

const difficultyMeta = {
  easy: { label: 'Oson', desc: 'Yirik va mashhur davlatlar', dotColor: '#22C55E' },
  medium: { label: "O'rtacha", desc: "Yevropa va o'rta hajmdagi davlatlar", dotColor: '#F59E0B' },
  hard: { label: 'Qiyin', desc: 'Kichik davlatlar va orollar', dotColor: '#EF4444' },
};

function DifficultyPicker({ onSelect, onExit }) {
  return (
    <div className="max-w-md mx-auto space-y-5">
      <div className="flex items-center gap-2">
        <button onClick={onExit} className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--background)] text-[var(--text-secondary)]">
          <CaretLeft size={18} weight="bold" />
        </button>
        <div>
          <p className="text-sm font-bold text-[var(--text-primary)]">Xaritada Davlat</p>
          <p className="text-xs text-[var(--text-secondary)]">Qiyinlik darajasini tanlang</p>
        </div>
      </div>
      <div className="space-y-2.5">
        {Object.entries(difficultyMeta).map(([key, meta]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="w-full flex items-center gap-3 p-4 rounded-[var(--radius-sm)] border-2 border-[var(--border)] hover:border-[var(--success)]/50 transition-colors text-left"
          >
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: meta.dotColor }} />
            <span className="flex-1">
              <span className="block text-sm font-bold text-[var(--text-primary)]">{meta.label}</span>
              <span className="block text-xs text-[var(--text-secondary)]">{meta.desc}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FindCountryRound({ difficulty, onExit }) {
  const pool = countryPools[difficulty];
  const targets = useMemo(() => shuffle(pool).slice(0, TOTAL), [pool]);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [status, setStatus] = useState('idle');
  const [flash, setFlash] = useState(null); // { id, kind }
  const [revealId, setRevealId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [paused, setPaused] = useState(false);
  const [result, setResult] = useState(null);
  const initialView = getView(targets[0]);
  const [zoom, setZoom] = useState(initialView.zoom);
  const [center, setCenter] = useState(initialView.center);
  const startRef = useRef(Date.now());
  const advanceTimer = useRef(null);
  const dragStartPos = useRef(null);
  const draggedRef = useRef(false);

  const current = targets[index];

  const finish = useCallback((finalScore, finalMistakes) => {
    const elapsed = Math.round((Date.now() - startRef.current) / 1000);
    const correctCount = TOTAL - finalMistakes;
    playFinish();
    setResult({
      xp: finalScore,
      accuracy: Math.round((correctCount / TOTAL) * 100),
      time: formatTime(elapsed),
      mistakes: finalMistakes,
      correct: correctCount,
      total: TOTAL,
    });
  }, []);

  const advance = useCallback((finalScore, finalMistakes) => {
    if (index + 1 >= TOTAL) finish(finalScore, finalMistakes);
    else {
      const next = targets[index + 1];
      const view = getView(next);
      setIndex(i => i + 1);
      setStatus('idle');
      setFlash(null);
      setRevealId(null);
      setTimeLeft(ROUND_TIME);
      setZoom(view.zoom);
      setCenter(view.center);
    }
  }, [index, targets, finish]);

  const handlePick = useCallback((geo) => {
    if (status !== 'idle' || result) return;
    if (draggedRef.current) return;
    const name = geo.properties.name;
    const isCorrect = name === current;
    setStatus('answered');
    let newScore = score, newMistakes = mistakes;

    if (isCorrect) {
      const nextCombo = combo + 1;
      const bonus = Math.min(3, 1 + Math.floor(nextCombo / 3));
      newScore = score + 8 * bonus;
      setScore(newScore);
      setCombo(nextCombo);
      setFlash({ id: geo.rsmKey, kind: 'correct' });
      playCorrect();
      vibrate(15);
    } else {
      newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setCombo(0);
      setFlash({ id: geo.rsmKey, kind: 'wrong' });
      setRevealId(current);
      playWrong();
      vibrate([30, 30, 30]);
    }
    advanceTimer.current = setTimeout(() => advance(newScore, newMistakes), isCorrect ? 650 : 1100);
  }, [status, result, current, score, mistakes, combo, advance]);

  const handleTimeout = useCallback(() => {
    if (status !== 'idle' || result) return;
    setStatus('answered');
    setMistakes(m => m + 1);
    setCombo(0);
    setRevealId(current);
    playWrong();
    const newMistakes = mistakes + 1;
    advanceTimer.current = setTimeout(() => advance(score, newMistakes), 1100);
  }, [status, result, current, mistakes, score, advance]);

  useEffect(() => {
    if (paused || status !== 'idle' || result) return;
    if (timeLeft <= 0) { handleTimeout(); return; }
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [paused, status, result, timeLeft, handleTimeout]);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const restart = () => {
    setIndex(0); setScore(0); setMistakes(0); setCombo(0);
    setStatus('idle'); setFlash(null); setRevealId(null);
    const v0 = getView(targets[0]);
    setTimeLeft(ROUND_TIME); setResult(null); setZoom(v0.zoom); setCenter(v0.center);
    startRef.current = Date.now();
  };

  const geoFill = (geo) => {
    if (flash?.id === geo.rsmKey) return flash.kind === 'correct' ? '#22C55E' : '#EF4444';
    if (revealId && geo.properties.name === revealId) return '#22C55E';
    return '#EFE6D5';
  };

  return (
    <GameShell
      title="Xaritada Davlat"
      color={COLOR}
      score={score}
      progress={{ current: index + 1, total: TOTAL }}
      timeLeft={result ? undefined : timeLeft}
      timeTotal={ROUND_TIME}
      paused={paused}
      onPauseToggle={() => setPaused(p => !p)}
      onExit={onExit}
      result={result}
      onPlayAgain={restart}
    >
      {current && (
        <div className="w-full flex flex-col items-center gap-3">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="px-4 py-2 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-sm font-bold"
          >
            Toping: {current}
          </motion.div>

          <div
            className="relative w-full rounded-[var(--radius)] overflow-hidden border border-[var(--border)]"
            style={{ height: 320, background: '#BFE3F5' }}
            onPointerDown={(e) => { dragStartPos.current = { x: e.clientX, y: e.clientY }; draggedRef.current = false; }}
            onPointerMove={(e) => {
              if (!dragStartPos.current) return;
              if (Math.hypot(e.clientX - dragStartPos.current.x, e.clientY - dragStartPos.current.y) > 8) draggedRef.current = true;
            }}
          >
            <ComposableMap projection="geoEqualEarth" style={{ width: '100%', height: '100%' }}>
              <ZoomableGroup zoom={zoom} center={center} onMoveEnd={({ zoom: z, coordinates }) => { setZoom(z); setCenter(coordinates); }} minZoom={1} maxZoom={6}>
                <Geographies geography={worldCountries}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handlePick(geo)}
                        style={{
                          default: { fill: geoFill(geo), stroke: '#5B7A63', strokeWidth: 0.6, outline: 'none', transition: 'fill 150ms' },
                          hover: { fill: canHover && status === 'idle' ? '#4ADE80' : geoFill(geo), stroke: canHover ? '#166534' : '#5B7A63', strokeWidth: canHover ? 0.8 : 0.6, outline: 'none', cursor: 'pointer' },
                          pressed: { fill: '#22C55E', outline: 'none' },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            <div className="absolute bottom-2 right-2 flex flex-col gap-1.5">
              <button onClick={() => setZoom(z => Math.min(6, z + 1))} className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-sm">
                <MagnifyingGlassPlus size={15} />
              </button>
              <button onClick={() => setZoom(z => Math.max(1, z - 1))} className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-sm">
                <MagnifyingGlassMinus size={15} />
              </button>
              <button onClick={() => { const v = getView(current); setZoom(v.zoom); setCenter(v.center); }} className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-sm">
                <ArrowsCounterClockwise size={14} />
              </button>
            </div>
          </div>

          {combo >= 3 && status === 'idle' && (
            <p className="text-xs font-bold" style={{ color: COLOR }}>🔥 Combo x{Math.min(3, 1 + Math.floor(combo / 3))}</p>
          )}
        </div>
      )}
    </GameShell>
  );
}

export default function FindCountryGame() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState(null);

  if (!difficulty) {
    return <DifficultyPicker onSelect={setDifficulty} onExit={() => navigate('/games')} />;
  }
  return <FindCountryRound key={difficulty} difficulty={difficulty} onExit={() => navigate('/games')} />;
}
