import { motion } from 'framer-motion';
import { Check, X } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

export default function AnswerCard({ label, state, onClick, disabled, className }) {
  // state: 'idle' | 'correct' | 'wrong' | 'reveal' (shown as correct but not selected)
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.96 } : undefined}
      animate={state === 'wrong' ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        'w-full text-left px-4 py-3.5 rounded-[var(--radius-sm)] border-2 text-sm font-semibold transition-colors duration-150 flex items-center justify-between gap-2',
        state === 'idle' && 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--primary)]/50',
        state === 'correct' && 'border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]',
        state === 'reveal' && 'border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]',
        state === 'wrong' && 'border-[var(--danger)] bg-[var(--danger)]/10 text-[var(--danger)]',
        className
      )}
      style={{ minHeight: 52 }}
    >
      <span className="truncate">{label}</span>
      {(state === 'correct' || state === 'reveal') && <Check size={18} weight="bold" className="shrink-0" />}
      {state === 'wrong' && <X size={18} weight="bold" className="shrink-0" />}
    </motion.button>
  );
}
