import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatTime, sampleN } from '../../lib/utils';
import { countryBank, continentButtons } from '../../data/mockData';
import GameShell from '../../components/games/GameShell';
import { playCorrect, playWrong, playFinish, vibrate } from '../../lib/gameSound';

const TOTAL = 15;
const ROUND_MS = 2500;

export default function ContinentRushGame() {
  const navigate = useNavigate();
  const rounds = useMemo(() => sampleN(countryBank, TOTAL), []);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('idle');
  const [progressPct, setProgressPct] = useState(100);
  const [paused, setPaused] = useState(false);
  const [result, setResult] = useState(null);
  const startRef = useRef(Date.now());
  const roundStart = useRef(Date.now());
  const advanceTimer = useRef(null);
  const rafRef = useRef(null);

  const current = rounds[index];

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
      setIndex(i => i + 1);
      setSelected(null);
      setStatus('idle');
      roundStart.current = Date.now();
    }
  }, [index, finish]);

  const handleAnswer = useCallback((continent) => {
    if (status !== 'idle' || result) return;
    setStatus('answered');
    setSelected(continent);
    const isCorrect = continent === current.continent;
    let newScore = score, newMistakes = mistakes;
    if (isCorrect) {
      const nextCombo = combo + 1;
      const multiplier = Math.min(3, 1 + Math.floor(nextCombo / 3));
      newScore = score + 6 * multiplier;
      setScore(newScore);
      setCombo(nextCombo);
      playCorrect();
      vibrate(15);
    } else {
      newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setCombo(0);
      playWrong();
      vibrate([30, 30, 30]);
    }
    advanceTimer.current = setTimeout(() => advance(newScore, newMistakes), 450);
  }, [status, result, current, score, mistakes, combo, advance]);

  // round countdown bar + auto-timeout as wrong
  useEffect(() => {
    if (paused || status !== 'idle' || result) return;
    roundStart.current = Date.now();
    const tick = () => {
      const pct = Math.max(0, 100 - ((Date.now() - roundStart.current) / ROUND_MS) * 100);
      setProgressPct(pct);
      if (pct <= 0) { handleAnswer(null); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index, paused, status, result, handleAnswer]);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const restart = () => {
    setIndex(0); setScore(0); setMistakes(0); setCombo(0);
    setSelected(null); setStatus('idle'); setResult(null);
    startRef.current = Date.now();
  };

  return (
    <GameShell
      title="Qit'alar Poygasi"
      color="#7C3AED"
      score={score}
      progress={{ current: index + 1, total: TOTAL }}
      paused={paused}
      onPauseToggle={() => setPaused(p => !p)}
      onExit={() => navigate('/games')}
      result={result}
      onPlayAgain={restart}
    >
      {current && (
        <div className="flex flex-col items-center gap-5 w-full">
          <div className="w-full max-w-xs h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
            <div className="h-full bg-[#7C3AED] transition-[width] duration-75 ease-linear" style={{ width: `${progressPct}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-7xl">{current.flag}</span>
              <p className="text-lg font-bold text-[var(--text-primary)]">{current.name}</p>
              {combo >= 3 && status === 'idle' && (
                <p className="text-xs font-bold text-[#7C3AED]">⚡ Combo x{Math.min(3, 1 + Math.floor(combo / 3))}</p>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm">
            {continentButtons.map((c) => {
              const st = status === 'idle' ? 'idle' : c === current.continent ? 'correct' : c === selected ? 'wrong' : 'idle';
              return (
                <button
                  key={c}
                  disabled={status === 'answered'}
                  onClick={() => handleAnswer(c)}
                  className={cn(
                    'py-3 rounded-[var(--radius-sm)] border-2 text-xs font-bold transition-colors',
                    st === 'idle' && 'border-[var(--border)] text-[var(--text-primary)] hover:border-[#7C3AED]/50',
                    st === 'correct' && 'border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]',
                    st === 'wrong' && 'border-[var(--danger)] bg-[var(--danger)]/10 text-[var(--danger)]'
                  )}
                  style={{ minHeight: 48 }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </GameShell>
  );
}
