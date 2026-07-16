import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CaretLeft, BookOpen, Lightning, Compass, X } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { recentActivities } from '../data/mockData';

const activityColors = { test: '#2563EB', quiz: '#F59E0B', game: '#22C55E' };
const activityIcons  = { test: BookOpen,  quiz: Lightning,  game: Compass  };
const typeLabels     = { test: 'Test',    quiz: 'Viktorina', game: "O'yin" };

const pad = n => String(n).padStart(2, '0');
function formatDateTime(iso) {
  const d = new Date(iso);
  return `${pad(d.getDate())}.${pad(d.getMonth()+1)}.${d.getFullYear()} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function ActivityModal({ activity, onClose }) {
  const a = activity;
  const Icon = activityIcons[a.type] || BookOpen;
  const color = activityColors[a.type] || '#2563EB';
  const pct = Math.round((a.score / a.total) * 100);

  return createPortal(
    <motion.div
      key="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      className="sm:items-center"
      onClick={onClose}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-lg bg-[var(--surface)] rounded-t-3xl sm:rounded-3xl p-5 space-y-4"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div className="w-10 h-1 rounded-full bg-[var(--border)] sm:hidden" />
          <div className="hidden sm:block" />
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--background)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-all ml-auto">
            <X size={16} weight="bold" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
            <Icon size={22} style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[var(--text-primary)]">{a.title}</p>
            <p className="text-xs text-[var(--text-secondary)]">{typeLabels[a.type]} · {formatDateTime(a.date)}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">Natija</span>
            <span className="text-sm font-bold" style={{ color }}>{a.score} / {a.total} ball</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--border)] overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
          </div>
          <p className="text-xs text-[var(--text-secondary)] text-right">{pct}% to'g'ri</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-[var(--background)] p-3 text-center">
            <p className="text-base font-black text-[var(--text-primary)]">+{a.xpGained}</p>
            <p className="text-[10px] text-[var(--text-secondary)]">XP qo'shildi</p>
          </div>
          <div className="rounded-xl bg-[var(--background)] p-3 text-center">
            <p className="text-base font-black" style={{ color: a.rankChange > 0 ? '#16A34A' : a.rankChange < 0 ? '#EF4444' : 'var(--text-primary)' }}>
              {a.rankChange > 0 ? `↑${a.rankChange}` : a.rankChange < 0 ? `↓${Math.abs(a.rankChange)}` : '—'}
            </p>
            <p className="text-[10px] text-[var(--text-secondary)]">Reyting</p>
          </div>
          <div className="rounded-xl bg-[var(--background)] p-3 text-center">
            <p className="text-base font-black text-[var(--text-primary)]">{a.total}</p>
            <p className="text-[10px] text-[var(--text-secondary)]">Savollar</p>
          </div>
        </div>
        <button onClick={onClose}
          className="w-full h-11 rounded-2xl bg-[var(--background)] text-sm font-semibold text-[var(--text-secondary)]">
          Yopish
        </button>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Activity() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? recentActivities : recentActivities.filter(a => a.type === filter);

  return (
    <div className="max-w-lg mx-auto space-y-5 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => navigate('/profile')}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
          <CaretLeft size={18} weight="bold" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Barcha Faoliyat</h1>
          <p className="text-xs text-[var(--text-secondary)]">{filtered.length} ta yozuv</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {[['all', 'Barchasi'], ['test', 'Testlar'], ['quiz', 'Viktorina'], ['game', "O'yinlar"]].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)}
            className={cn('px-3 py-1.5 rounded-xl text-xs font-semibold transition-all',
              filter === key
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]')}>
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.map(activity => {
          const Icon = activityIcons[activity.type] || BookOpen;
          const color = activityColors[activity.type] || '#2563EB';
          const pct = Math.round((activity.score / activity.total) * 100);
          return (
            <div key={activity.id} onClick={() => setSelected(activity)}
              className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] cursor-pointer hover:bg-[var(--background)] transition-all">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{activity.title}</p>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  {activity.score}/{activity.total} ball · {pct}%
                  {activity.rankChange > 0 && <span className="text-green-500"> · ↑{activity.rankChange}</span>}
                  {activity.rankChange < 0 && <span className="text-red-400"> · ↓{Math.abs(activity.rankChange)}</span>}
                  {activity.rankChange === 0 && <span className="text-[var(--text-tertiary)]"> · —</span>}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-bold" style={{ color }}>+{activity.xpGained} XP</p>
                <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                  {new Date(activity.date).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && <ActivityModal activity={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
