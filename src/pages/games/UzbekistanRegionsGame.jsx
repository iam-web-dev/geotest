import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import uzbekistanMap from '@svg-maps/uzbekistan';
import { MagnifyingGlassPlus, MagnifyingGlassMinus, ArrowsCounterClockwise, CaretLeft, MapPin } from '@phosphor-icons/react';
import { buildRegionQuestions } from '../../data/uzbekistanRegions';
import { shuffle, formatTime } from '../../lib/utils';
import GameShell from '../../components/games/GameShell';
import { playCorrect, playWrong, playFinish, vibrate } from '../../lib/gameSound';

const COLOR = '#0891B2';
const TARGET_COUNT = 10;

const difficultyMeta = {
  easy: { label: 'Oson', desc: 'Viloyat nomlari' },
  medium: { label: "O'rtacha", desc: 'Viloyat markazlari (poytaxtlari)' },
  hard: { label: 'Qiyin', desc: 'Geografik savollar (chegaralar, joylashuv)' },
  expert: { label: 'Ekspert', desc: 'Aralash savollar' },
};

const modeMeta = {
  practice: { label: 'Mashq', desc: 'Vaqtsiz, 2 marta urinish huquqi' },
  timeAttack: { label: 'Vaqtga qarshi', desc: '90 soniyada imkon boricha ko\'proq toping' },
  survival: { label: 'Omon qolish', desc: '3 ta jon, xato qilsangiz jon kamayadi' },
  daily: { label: 'Kunlik', desc: '10 ta aralash savol, maxsus mukofot' },
};

function SetupPicker({ onStart, onExit }) {
  const [difficulty, setDifficulty] = useState('easy');
  const [mode, setMode] = useState('practice');
  return (
    <div className="max-w-md mx-auto space-y-5">
      <div className="flex items-center gap-2">
        <button onClick={onExit} className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--background)] text-[var(--text-secondary)]">
          <CaretLeft size={18} weight="bold" />
        </button>
        <div>
          <p className="text-sm font-bold text-[var(--text-primary)]">O'zbekiston Viloyatlari</p>
          <p className="text-xs text-[var(--text-secondary)]">Qiyinlik va rejimni tanlang</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-bold text-[var(--text-primary)] mb-2">Qiyinlik</p>
        <div className="space-y-2">
          {Object.entries(difficultyMeta).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => setDifficulty(key)}
              className={`w-full text-left p-3 rounded-[var(--radius-sm)] border-2 transition-colors ${difficulty === key ? 'border-[var(--primary)] bg-[var(--primary-soft)]' : 'border-[var(--border)]'}`}
            >
              <span className="block text-sm font-bold text-[var(--text-primary)]">{meta.label}</span>
              <span className="block text-xs text-[var(--text-secondary)]">{meta.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold text-[var(--text-primary)] mb-2">Rejim</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(modeMeta).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`text-left p-3 rounded-[var(--radius-sm)] border-2 transition-colors ${mode === key ? 'border-[var(--primary)] bg-[var(--primary-soft)]' : 'border-[var(--border)]'}`}
            >
              <span className="block text-xs font-bold text-[var(--text-primary)]">{meta.label}</span>
              <span className="block text-[10px] text-[var(--text-secondary)] leading-snug mt-0.5">{meta.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onStart(difficulty, mode)}
        className="w-full py-3 rounded-[var(--radius-sm)] text-sm font-bold text-white"
        style={{ background: COLOR }}
      >
        Boshlash
      </button>
    </div>
  );
}

function UzMap({ getFill, getStroke, onPick, zoom, pan, onPanStart, onPanMove, onPanEnd }) {
  return (
    <svg
      viewBox={uzbekistanMap.viewBox}
      className="w-full h-full touch-none select-none"
      onPointerDown={onPanStart}
      onPointerMove={onPanMove}
      onPointerUp={onPanEnd}
      onPointerLeave={onPanEnd}
    >
      <g style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: 'center', transition: 'transform 120ms ease-out' }}>
        {uzbekistanMap.locations.map((loc, i) => (
          <path
            key={`${loc.id}-${i}`}
            d={loc.path}
            onClick={loc.id === 'aral-sea' ? undefined : () => onPick(loc)}
            fill={getFill(loc)}
            stroke={getStroke(loc)}
            strokeWidth={1.2}
            strokeLinejoin="round"
            style={{ cursor: loc.id === 'aral-sea' ? 'default' : 'pointer', transition: 'fill 150ms' }}
          />
        ))}
      </g>
    </svg>
  );
}

function UzbekistanRegionsRound({ difficulty, mode, onExit }) {
  const pool = useMemo(() => shuffle(buildRegionQuestions(difficulty)), [difficulty]);
  const questions = useMemo(() => pool.slice(0, Math.min(pool.length, 24)), [pool]);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState('idle');
  const [flash, setFlash] = useState(null); // { id, kind }
  const [revealId, setRevealId] = useState(null);
  const [paused, setPaused] = useState(false);
  const [result, setResult] = useState(null);
  const [livesCurrent, setLivesCurrent] = useState(3);
  const [globalTime, setGlobalTime] = useState(90);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const panDrag = useRef(null);
  const startRef = useRef(Date.now());
  const answeredRef = useRef(0);
  const advanceTimer = useRef(null);

  const current = questions[index % questions.length];
  const done = index >= TARGET_COUNT;

  const finish = useCallback((finalScore, finalMistakes) => {
    const elapsed = Math.round((Date.now() - startRef.current) / 1000);
    const answered = answeredRef.current || 1;
    const correctCount = answered - finalMistakes > 0 ? answered - finalMistakes : 0;
    playFinish();
    setResult({
      xp: finalScore,
      accuracy: Math.round((correctCount / answered) * 100),
      time: formatTime(elapsed),
      mistakes: finalMistakes,
      correct: correctCount,
      total: answered,
    });
  }, []);

  const goNext = useCallback((finalScore, finalMistakes) => {
    const nextIndex = index + 1;
    if (mode !== 'timeAttack' && mode !== 'survival' && nextIndex >= TARGET_COUNT) {
      finish(finalScore, finalMistakes);
      return;
    }
    if ((mode === 'timeAttack' || mode === 'survival') && nextIndex >= TARGET_COUNT * 2) {
      finish(finalScore, finalMistakes);
      return;
    }
    setIndex(nextIndex);
    setStatus('idle');
    setFlash(null);
    setRevealId(null);
    setAttempts(0);
  }, [index, mode, finish]);

  const handlePick = useCallback((loc) => {
    if (status === 'answered' || result || paused) return;
    const isCorrect = loc.id === current.id;

    if (isCorrect) {
      answeredRef.current += 1;
      setStatus('answered');
      const nextCombo = combo + 1;
      const multiplier = Math.min(3, 1 + Math.floor(nextCombo / 3));
      const gained = 12 * multiplier;
      const newScore = score + gained;
      setScore(newScore);
      setCombo(nextCombo);
      setFlash({ id: loc.id, kind: 'correct' });
      playCorrect();
      vibrate(15);
      const delay = mode === 'timeAttack' ? 900 : 1500;
      advanceTimer.current = setTimeout(() => goNext(newScore, mistakes), delay);
      return;
    }

    // wrong tap
    setFlash({ id: loc.id, kind: 'wrong' });
    playWrong();
    vibrate([30, 30, 30]);
    setCombo(0);
    setTimeout(() => setFlash(null), 420);

    if (mode === 'survival') {
      const nextLives = livesCurrent - 1;
      setLivesCurrent(nextLives);
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (nextLives <= 0) {
        answeredRef.current += 1;
        setStatus('answered');
        setRevealId(current.id);
        advanceTimer.current = setTimeout(() => finish(score, newMistakes), 1200);
      }
      return;
    }

    if (mode === 'practice') {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (nextAttempts >= 2) {
        answeredRef.current += 1;
        setStatus('answered');
        setRevealId(current.id);
        advanceTimer.current = setTimeout(() => goNext(score, newMistakes), 1800);
      }
      return;
    }

    // timeAttack / daily: quick miss, move on
    answeredRef.current += 1;
    setStatus('answered');
    const newMistakes = mistakes + 1;
    setMistakes(newMistakes);
    advanceTimer.current = setTimeout(() => goNext(score, newMistakes), 500);
  }, [status, result, paused, current, combo, score, mistakes, mode, livesCurrent, attempts, goNext, finish]);

  // global timer for timeAttack
  useEffect(() => {
    if (mode !== 'timeAttack' || paused || result) return;
    if (globalTime <= 0) { finish(score, mistakes); return; }
    const t = setInterval(() => setGlobalTime(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [mode, paused, result, globalTime, finish, score, mistakes]);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const restart = () => {
    setIndex(0); setScore(0); setMistakes(0); setCombo(0); setAttempts(0);
    setStatus('idle'); setFlash(null); setRevealId(null);
    setResult(null); setLivesCurrent(3); setGlobalTime(90);
    setZoom(1); setPan({ x: 0, y: 0 });
    answeredRef.current = 0; startRef.current = Date.now();
  };

  const getFill = (loc) => {
    if (loc.id === 'aral-sea') return '#BFE3F5';
    if (flash?.id === loc.id) return flash.kind === 'correct' ? '#22C55E' : '#EF4444';
    if (revealId === loc.id) return '#22C55E';
    return '#E8E2D0';
  };
  const getStroke = (loc) => loc.id === 'aral-sea' ? '#8FC7E0' : '#3F6B57';

  const onPanStart = (e) => { panDrag.current = { x: e.clientX - pan.x, y: e.clientY - pan.y }; };
  const onPanMove = (e) => {
    if (!panDrag.current) return;
    setPan({ x: e.clientX - panDrag.current.x, y: e.clientY - panDrag.current.y });
  };
  const onPanEnd = () => { panDrag.current = null; };

  return (
    <GameShell
      title="O'zbekiston Viloyatlari"
      color={COLOR}
      score={score}
      progress={{ current: Math.min(index + 1, TARGET_COUNT), total: TARGET_COUNT }}
      timeLeft={mode === 'timeAttack' && !result ? globalTime : undefined}
      timeTotal={90}
      lives={mode === 'survival' ? { current: livesCurrent, max: 3 } : undefined}
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
            className="px-4 py-2 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-sm font-bold flex items-center gap-1.5 text-center"
          >
            <MapPin size={15} weight="fill" /> {current.prompt}
          </motion.div>

          <div className="relative w-full rounded-[var(--radius)] overflow-hidden border border-[var(--border)]" style={{ height: 320, background: '#F5EFDD' }}>
            <UzMap getFill={getFill} getStroke={getStroke} onPick={handlePick} zoom={zoom} pan={pan}
              onPanStart={onPanStart} onPanMove={onPanMove} onPanEnd={onPanEnd} />

            <div className="absolute bottom-2 right-2 flex flex-col gap-1.5">
              <button onClick={() => setZoom(z => Math.min(3, z + 0.4))} className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-sm">
                <MagnifyingGlassPlus size={15} />
              </button>
              <button onClick={() => setZoom(z => Math.max(1, z - 0.4))} className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-sm">
                <MagnifyingGlassMinus size={15} />
              </button>
              <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-sm">
                <ArrowsCounterClockwise size={14} />
              </button>
            </div>
          </div>

          {combo >= 3 && status === 'idle' && (
            <p className="text-xs font-bold" style={{ color: COLOR }}>🔥 Combo x{Math.min(3, 1 + Math.floor(combo / 3))}</p>
          )}
          {mode === 'practice' && attempts === 1 && status === 'idle' && (
            <p className="text-xs font-semibold text-[var(--danger)]">Yana bir urinish qoldi!</p>
          )}
        </div>
      )}
    </GameShell>
  );
}

export default function UzbekistanRegionsGame() {
  const navigate = useNavigate();
  const [config, setConfig] = useState(null);

  if (!config) {
    return <SetupPicker onStart={(difficulty, mode) => setConfig({ difficulty, mode })} onExit={() => navigate('/games')} />;
  }
  return <UzbekistanRegionsRound key={`${config.difficulty}-${config.mode}`} {...config} onExit={() => navigate('/games')} />;
}
