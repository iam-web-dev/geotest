import { useState, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft, Mountains } from '@phosphor-icons/react';
import { mountains } from '../../data/mountains';
import { shuffle, sampleN } from '../../lib/utils';
import GameShell from '../../components/games/GameShell';
import { playCorrect, playWrong, playFinish, vibrate } from '../../lib/gameSound';

const COLOR = '#D97706';

const ALL_COUNTRIES = [...new Set(mountains.flatMap(m => m.countries))];

function makeQuestion(mountain) {
  const correct = mountain.countries[0];
  const distractors = shuffle(ALL_COUNTRIES.filter(c => !mountain.countries.includes(c))).slice(0, 3);
  return {
    mountain,
    options: shuffle([correct, ...distractors]),
    correct,
  };
}

function buildQuestions(region) {
  const pool = region === 'all'
    ? mountains
    : mountains.filter(m => m.region === region);
  const selected = sampleN(pool.length >= 10 ? pool : mountains, 10);
  return selected.map(m => makeQuestion(m));
}

// ── Setup ────────────────────────────────────────────────────────────────────
function SetupPicker({ onStart }) {
  const [region, setRegion] = useState('all');
  const regions = [
    { id: 'all', label: 'Barchasi' },
    { id: 'world', label: 'Dunyo' },
    { id: 'centralAsia', label: 'Markaziy Osiyo' },
    { id: 'uzbekistan', label: "O'zbekiston" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col items-center justify-center p-6 gap-8">
      <div className="text-center">
        <div className="mb-3 flex justify-center">
          <Mountains size={56} weight="duotone" color={COLOR} />
        </div>
        <h1 className="text-2xl font-bold">Tog' va Davlat</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Tog' rasmini ko'rib, qaysi davlatda ekanini toping</p>
      </div>

      <div className="w-full max-w-xs space-y-3">
        <p className="text-xs text-[var(--muted)] uppercase tracking-wide">Hudud</p>
        <div className="grid grid-cols-2 gap-2">
          {regions.map(r => (
            <button
              key={r.id}
              onClick={() => setRegion(r.id)}
              className="py-2.5 rounded-xl text-sm font-medium border transition-all"
              style={{
                background: region === r.id ? COLOR : 'var(--surface)',
                color: region === r.id ? '#fff' : 'var(--text)',
                borderColor: region === r.id ? COLOR : 'var(--border)',
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onStart(region)}
        className="px-10 py-3 rounded-2xl font-bold text-white text-lg shadow-lg active:scale-95 transition-transform"
        style={{ background: COLOR }}
      >
        Boshlash
      </button>
    </div>
  );
}

// ── Image card with fallback ─────────────────────────────────────────────────
function MountainImage({ src, alt }) {
  const [errored, setErrored] = useState(false);
  if (errored || !src) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--surface)] rounded-2xl gap-2">
        <span className="text-6xl">⛰️</span>
        <span className="text-xs text-[var(--muted)]">{alt}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="w-full h-full object-cover rounded-2xl"
      loading="eager"
    />
  );
}

// ── Round ────────────────────────────────────────────────────────────────────
function GameRound({ region, onFinish }) {
  const questions = useMemo(() => buildQuestions(region), [region]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [chosen, setChosen] = useState(null);   // selected option text
  const [status, setStatus] = useState('idle'); // idle | answered
  const navigate = useNavigate();
  const timer = useRef(null);

  const current = questions[idx];

  const advance = useCallback((s, m) => {
    clearTimeout(timer.current);
    setChosen(null);
    setStatus('idle');
    const next = idx + 1;
    if (next >= questions.length) {
      playFinish();
      onFinish({ correct: s, total: questions.length, mistakes: m });
    } else {
      setIdx(next);
    }
  }, [idx, questions.length, onFinish]);

  const handlePick = useCallback((opt) => {
    if (status !== 'idle') return;
    setChosen(opt);

    const isCorrect = opt === current.correct;
    if (isCorrect) {
      playCorrect(); vibrate([50]);
      setScore(s => {
        const ns = s + 1;
        setStatus('answered');
        timer.current = setTimeout(() => advance(ns, mistakes), 1200);
        return ns;
      });
    } else {
      playWrong(); vibrate([80, 40, 80]);
      const nm = mistakes + 1;
      setMistakes(nm);
      setStatus('answered');
      timer.current = setTimeout(() => advance(score, nm), 1200);
    }
  }, [status, current, score, mistakes, advance]);

  const getOptionStyle = (opt) => {
    if (chosen === null) return { bg: 'var(--surface)', border: 'var(--border)', color: 'var(--text)' };
    if (opt === current.correct) return { bg: '#16A34A22', border: '#16A34A', color: '#16A34A' };
    if (opt === chosen && opt !== current.correct) return { bg: '#DC262622', border: '#DC2626', color: '#DC2626' };
    return { bg: 'var(--surface)', border: 'var(--border)', color: 'var(--muted, #6b7280)' };
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2 border-b border-[var(--border)] shrink-0">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-[var(--surface)]">
          <CaretLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="text-sm font-semibold">Tog' — Davlat</div>
          <div className="text-xs text-[var(--muted)]">{idx + 1}/{questions.length} · Ball: {score}</div>
        </div>
        {/* progress bar */}
        <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${((idx) / questions.length) * 100}%`, background: COLOR }}
          />
        </div>
      </div>

      {/* Image + name */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.22 }}
          className="flex-1 flex flex-col min-h-0 px-4 pt-3 pb-2 gap-3"
        >
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-md"
            style={{ height: '42vh', flexShrink: 0, background: 'var(--surface)' }}>
            <MountainImage src={current.mountain.image} alt={current.mountain.name} />
            {/* name badge */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-white shadow-lg"
                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
                <span className="text-lg">⛰️</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold leading-tight">{current.mountain.name}</span>
                  <span className="text-xs font-normal opacity-75 leading-tight">{current.mountain.highestPeak}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question */}
          <p className="text-center text-sm font-semibold text-[var(--muted)]">
            Bu tog' tizmasi qaysi davlatda joylashgan?
          </p>

          {/* Options */}
          <div className="grid grid-cols-2 gap-2 shrink-0 pb-4">
            {current.options.map(opt => {
              const s = getOptionStyle(opt);
              return (
                <button
                  key={opt}
                  onClick={() => handlePick(opt)}
                  disabled={status === 'answered'}
                  className="py-3 px-3 rounded-xl text-sm font-semibold border transition-all active:scale-95 text-left leading-tight"
                  style={{ background: s.bg, borderColor: s.border, color: s.color }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Export ───────────────────────────────────────────────────────────────────
export default function MountainCountryGame() {
  const [region, setRegion] = useState(null);
  const [result, setResult] = useState(null);

  if (!region) return <SetupPicker onStart={setRegion} />;
  if (result) {
    return (
      <GameShell
        title="Tog' va Davlat"
        result={result}
        onRestart={() => { setRegion(null); setResult(null); }}
        color={COLOR}
      />
    );
  }
  return (
    <GameRound
      key={region}
      region={region}
      onFinish={setResult}
    />
  );
}
