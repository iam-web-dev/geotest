import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CaretLeft, Pause, Play, Lightning, Target, Clock, XCircle, ArrowsClockwise, House, Star, Heart } from '@phosphor-icons/react';
import Button from '../ui/Button';
import { ProgressBar } from '../ui/Progress';

function fireConfetti() {
  const colors = ['#2563EB', '#F59E0B', '#22C55E', '#8B5CF6'];
  const end = Date.now() + 1300;
  (function frame() {
    confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
    confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 }, colors, startVelocity: 45, scalar: 1.05 });
}

export function ResultScreen({ color, result, onPlayAgain, onExit }) {
  const { xp, accuracy, time, mistakes, correct, total } = result;
  const tier = accuracy >= 80 ? 'Ajoyib!' : accuracy >= 50 ? 'Yaxshi natija!' : 'Davom eting!';
  const fired = useRef(false);

  useEffect(() => {
    if (accuracy >= 70 && !fired.current) {
      fired.current = true;
      fireConfetti();
    }
  }, [accuracy]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="max-w-md mx-auto w-full"
    >
      <div className="rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface)] border border-[var(--border)]">
        <div className="pt-8 pb-6 px-6 flex flex-col items-center text-center" style={{ background: `${color}18` }}>
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }}
            className="w-16 h-16 rounded-full bg-[var(--surface)] flex items-center justify-center shadow-md mb-3"
          >
            <Target size={30} weight="fill" style={{ color }} />
          </motion.div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">{tier}</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{correct}/{total} to'g'ri javob</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-[var(--radius-sm)] bg-[var(--background)] py-3">
              <p className="text-lg font-bold" style={{ color }}>{accuracy}%</p>
              <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Aniqlik</p>
            </div>
            <div className="rounded-[var(--radius-sm)] bg-[var(--background)] py-3">
              <p className="text-lg font-bold text-[var(--text-primary)] flex items-center justify-center gap-1"><Clock size={14} />{time}</p>
              <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Vaqt</p>
            </div>
            <div className="rounded-[var(--radius-sm)] bg-[var(--background)] py-3">
              <p className="text-lg font-bold text-[var(--danger)] flex items-center justify-center gap-1"><XCircle size={14} />{mistakes}</p>
              <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Xatolar</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full bg-[#FEF3C7] dark:bg-[#F59E0B]/15 text-[#D97706]">
              <Lightning size={15} weight="fill" />+{xp} XP
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={onPlayAgain}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-[var(--radius-sm)] text-sm font-semibold text-white transition-all active:scale-[0.98]"
              style={{ background: color }}
            >
              <ArrowsClockwise size={16} /> Qayta o'ynash
            </button>
            <button
              onClick={onExit}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-[var(--radius-sm)] text-sm font-semibold border border-[var(--border)] bg-transparent text-[var(--text-primary)] transition-all active:scale-[0.98] hover:bg-[var(--background)]"
            >
              <House size={16} /> O'yinlar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GameShell({
  title, color = '#2563EB', score = 0, progress, timeLeft, timeTotal, lives,
  paused, onPauseToggle, onExit, result, onPlayAgain, hint, children,
}) {
  const pct = progress ? (progress.current / progress.total) * 100 : 0;
  const timeLow = timeLeft !== undefined && timeTotal && timeLeft <= timeTotal * 0.25;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {!result && (
        <>
          <div className="flex items-center justify-between gap-2">
            <button onClick={onExit} className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--background)] text-[var(--text-secondary)] shrink-0">
              <CaretLeft size={18} weight="bold" />
            </button>
            <div className="min-w-0 flex-1 text-center">
              <p className="text-sm font-bold text-[var(--text-primary)] truncate">{title}</p>
              {progress && <p className="text-[11px] text-[var(--text-secondary)]">{progress.current}/{progress.total}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: `${color}18`, color }}>
                <Star size={12} weight="fill" />{score}
              </div>
              {lives !== undefined && (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: lives.max }, (_, i) => (
                    <Heart key={i} size={15} weight={i < lives.current ? 'fill' : 'regular'} className={i < lives.current ? 'text-[var(--danger)]' : 'text-[var(--border)]'} />
                  ))}
                </div>
              )}
              {timeLeft !== undefined && (
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${timeLow ? 'bg-[var(--danger)]/10 text-[var(--danger)] animate-pulse' : 'bg-[var(--background)] text-[var(--text-secondary)]'}`}>
                  <Clock size={12} />{timeLeft}
                </div>
              )}
              {onPauseToggle && (
                <button onClick={onPauseToggle} className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--background)] text-[var(--text-secondary)]">
                  {paused ? <Play size={15} weight="fill" /> : <Pause size={15} weight="fill" />}
                </button>
              )}
            </div>
          </div>

          {progress && <ProgressBar value={pct} size="sm" color={color} />}
        </>
      )}

      <div className="relative min-h-[360px] flex items-center justify-center py-2">
        <AnimatePresence mode="wait">
          {result ? (
            <ResultScreen key="result" color={color} result={result} onPlayAgain={onPlayAgain} onExit={onExit} />
          ) : (
            <motion.div
              key="game"
              className="w-full"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {paused && !result && createPortal(
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                className="bg-[var(--surface)] rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl min-w-[260px]"
              >
                <p className="text-lg font-bold text-[var(--text-primary)]">To'xtatildi</p>
                <div className="flex gap-3">
                  <Button onClick={onPauseToggle}><Play size={16} weight="fill" /> Davom etish</Button>
                  <Button variant="outline" onClick={onExit}><House size={16} /> Chiqish</Button>
                </div>
              </motion.div>
            </motion.div>,
            document.body
          )}
        </AnimatePresence>
      </div>

      {!result && hint && (
        <div className="flex justify-center">{hint}</div>
      )}
    </div>
  );
}
