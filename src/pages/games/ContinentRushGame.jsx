import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatTime, sampleN } from '../../lib/utils';
import { countryBank, continentButtons } from '../../data/mockData';
import GameShell from '../../components/games/GameShell';
import { playCorrect, playWrong, playFinish, vibrate } from '../../lib/gameSound';

const TOTAL = 15;
const ROUND_MS = 5000;

export default function ContinentRushGame() {
  const navigate = useNavigate();
  const rounds = useMemo(() => sampleN(countryBank, TOTAL), []);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('idle');
  const timerBarRef = useRef(null);
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

  // CSS-animation timer bar — no React state updates during countdown
  useEffect(() => {
    const bar = timerBarRef.current;
    if (!bar || paused || status !== 'idle' || result) return;

    // restart animation
    bar.style.transition = 'none';
    bar.style.width = '100%';
    bar.style.background = '#7C3AED';
    // force reflow
    void bar.offsetWidth;
    bar.style.transition = `width ${ROUND_MS}ms linear`;
    bar.style.width = '0%';

    const timeout = setTimeout(() => handleAnswer(null), ROUND_MS);
    return () => clearTimeout(timeout);
  }, [index, paused, status, result, handleAnswer]);

  // color shift: green → yellow → red via rAF
  useEffect(() => {
    const bar = timerBarRef.current;
    if (!bar || status !== 'idle' || result) return;
    const start = Date.now();
    const tick = () => {
      const pct = 1 - Math.min(1, (Date.now() - start) / ROUND_MS);
      const r = pct > 0.5 ? Math.round((1 - pct) * 2 * 255) : 220;
      const g = pct > 0.5 ? 180 : Math.round(pct * 2 * 180);
      bar.style.background = `rgb(${r},${g},30)`;
      if (pct > 0) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index, status, result]);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const restart = () => {
    setIndex(0); setScore(0); setMistakes(0); setCombo(0);
    setSelected(null); setStatus('idle'); setResult(null);
    startRef.current = Date.now();
  };

  return (
    <GameShell
      title="Qit'ani Toping"
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
          <div className="w-full max-w-xs h-3 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <div ref={timerBarRef} className="h-full rounded-full" style={{ width: '100%', background: '#7C3AED' }} />
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
