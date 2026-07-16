import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { Trophy, Buildings, MapPin, Globe, Crown, Star } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { Card, CardContent } from '../components/ui/Card';
import { rankings } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const tabs = [
  { id: 'national', label: 'Milliy',    icon: Globe     },
  { id: 'regional', label: 'Viloyat',   icon: MapPin    },
  { id: 'school',   label: 'Maktab',    icon: Buildings },
];

const AV_COLORS = ['#2F80ED','#8B5CF6','#22C55E','#F59E0B','#EF4444','#06B6D4','#EC4899','#F97316'];

const MEDAL = {
  1: { ring: '#F59E0B', soft: 'rgba(245,158,11,0.16)', podiumH: 100, gradTop: '#FBBF24', gradBot: '#B45309', size: 64, fs: 22 },
  2: { ring: '#94A3B8', soft: 'rgba(148,163,184,0.16)', podiumH: 78,  gradTop: '#CBD5E1', gradBot: '#475569', size: 52, fs: 18 },
  3: { ring: '#EA580C', soft: 'rgba(234,88,12,0.16)',  podiumH: 60,  gradTop: '#FDBA74', gradBot: '#9A3412', size: 52, fs: 18 },
};

function PodiumColumn({ person, rank, delay }) {
  const m = MEDAL[rank];
  const avColor = AV_COLORS[(person.id - 1) % AV_COLORS.length];

  return (
    <motion.div
      className="flex flex-col items-center flex-1 min-w-0"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 160, damping: 16 }}
    >
      {/* Crown / spacer */}
      {rank === 1 ? (
        <motion.div
          className="mb-1.5"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        >
          <Crown
            size={28} weight="fill"
            style={{ color: '#F59E0B', filter: 'drop-shadow(0 3px 8px rgba(245,158,11,0.65))' }}
          />
        </motion.div>
      ) : (
        <div className="mb-1.5 h-[34px]" />
      )}

      {/* Avatar */}
      <div className="relative mb-2">
        <div
          className="rounded-full flex items-center justify-center text-white font-bold"
          style={{
            width: m.size, height: m.size, fontSize: m.fs,
            background: avColor,
            boxShadow: `0 0 0 3px ${m.ring}, 0 0 0 6px ${m.soft}`,
          }}
        >
          {person.name.charAt(0)}
        </div>
        {/* Pulse ring on #1 */}
        {rank === 1 && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{ opacity: [0, 0.5, 0], scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeOut' }}
            style={{ background: `radial-gradient(circle, ${m.ring}55 0%, transparent 70%)` }}
          />
        )}
      </div>

      {/* Name + XP */}
      <p className={cn(
        'font-bold text-[var(--text-primary)] text-center leading-tight w-full px-1 truncate',
        rank === 1 ? 'text-sm' : 'text-xs'
      )}>
        {person.name.split(' ')[0]}
      </p>
      <p className={cn('text-[var(--text-secondary)] text-center mb-3', rank === 1 ? 'text-xs' : 'text-[10px]')}>
        {person.xp.toLocaleString()} XP
      </p>

      {/* Podium block */}
      <div
        className="w-full rounded-t-xl relative overflow-hidden flex flex-col items-center pt-2.5"
        style={{
          height: m.podiumH,
          background: `linear-gradient(to top, ${m.gradBot}, ${m.gradTop})`,
        }}
      >
        {/* Shine overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 55%)' }}
        />
        {rank === 1 ? (
          <Trophy size={22} weight="fill" className="relative z-10 text-white drop-shadow" />
        ) : (
          <span className="relative z-10 text-white font-black text-xl drop-shadow">{rank}</span>
        )}
      </div>
    </motion.div>
  );
}

export default function Rankings() {
  const [activeTab, setActiveTab] = useState('national');
  const { darkMode } = useTheme();
  const list = rankings[activeTab] || [];
  const top3 = list.slice(0, 3);
  const maxXp = list[0]?.xp || 1;

  return (
    <div className="space-y-5">
      <SEO
        title="Reyting Jadvali"
        description="O'z natijalaringizni kuzating va boshqa o'quvchilar bilan geografiya bilimlarini solishtiring."
        url="/rankings"
      />

      {/* ── Hero banner ── */}
      <div
        className="relative overflow-hidden rounded-[var(--radius-lg)] p-5"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #1e3a8a 100%)'
            : 'linear-gradient(135deg, #1A6ED4 0%, #2563EB 50%, #1D4ED8 100%)',
        }}
      >
        {/* Decorative orbs */}
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/[0.08] pointer-events-none" />
        <div className="absolute bottom-0 right-24 w-20 h-20 rounded-full bg-yellow-400/[0.12] pointer-events-none" />

        {/* Floating stars */}
        {[0,1,2,3,4].map(i => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ right: `${8 + i * 14}%`, top: `${12 + (i % 3) * 28}%` }}
            animate={{ opacity: [0.3, 0.85, 0.3], scale: [0.8, 1.15, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.6, delay: i * 0.35, ease: 'easeInOut' }}
          >
            <Star
              size={i % 2 === 0 ? 8 : 5} weight="fill"
              style={{ color: i % 2 === 0 ? '#FCD34D' : darkMode ? '#A5B4FC' : '#BFDBFE' }}
            />
          </motion.div>
        ))}

        <div className="relative z-10 flex items-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-[var(--radius)] flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <Trophy size={24} weight="fill" style={{ color: '#FBBF24' }} />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-white">Reyting</h1>
            <p className="text-white/65 text-xs mt-0.5">Eng yaxshi geografiya bilimdonlari</p>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border',
              activeTab === tab.id
                ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
                : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)]'
            )}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="space-y-4"
        >
          {/* ── Podium ── */}
          <Card className="overflow-hidden">
            <div
              className="px-6 pt-6 pb-0"
              style={{ background: 'linear-gradient(180deg, var(--pal-milliy) 0%, var(--surface) 85%)' }}
            >
              <div className="flex items-end justify-center gap-4">
                {top3[1] && <PodiumColumn person={top3[1]} rank={2} delay={0.18} />}
                {top3[0] && <PodiumColumn person={top3[0]} rank={1} delay={0.08} />}
                {top3[2] && <PodiumColumn person={top3[2]} rank={3} delay={0.28} />}
              </div>
            </div>
          </Card>

          {/* ── Full list ── */}
          <Card className="overflow-hidden">
            {list.map((person, i) => {
              const avColor = AV_COLORS[(person.id - 1) % AV_COLORS.length];
              const pct = Math.round((person.xp / maxXp) * 100);
              const isTop3 = i < 3;
              const m = isTop3 ? MEDAL[i + 1] : null;
              const isLast = i === list.length - 1;

              return (
                <div
                  key={person.id}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3',
                    !isLast && 'border-b border-[var(--border)]',
                    person.isCurrentUser && 'bg-[var(--primary-soft)]'
                  )}
                >
                  {/* Medal / rank */}
                  <div className="w-8 shrink-0 flex items-center justify-center">
                    {isTop3 ? (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: m.soft }}
                      >
                        <Trophy size={13} weight="fill" style={{ color: m.ring }} />
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-[var(--text-tertiary)] tabular-nums">#{i + 1}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{
                      background: avColor,
                      boxShadow: person.isCurrentUser
                        ? '0 0 0 2px var(--primary), 0 0 0 4px var(--primary-soft)'
                        : isTop3
                        ? `0 0 0 2px ${m.ring}`
                        : 'none',
                    }}
                  >
                    {person.name.charAt(0)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <p className="text-sm font-semibold text-[var(--text-primary)] truncate leading-tight">
                        {person.name}
                      </p>
                      {person.isCurrentUser && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0" style={{ background: 'var(--primary)', color: 'white' }}>
                          Siz
                        </span>
                      )}
                    </div>

                    {/* XP bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full overflow-hidden bg-[var(--border)]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background: person.isCurrentUser ? 'var(--primary)' : isTop3 ? m.ring : avColor,
                            opacity: 0.72,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-[var(--text-tertiary)] shrink-0 tabular-nums">{pct}%</span>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-[var(--text-tertiary)]">{person.level}-daraja</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-[var(--text-tertiary)] opacity-40" />
                      <span className="text-[10px] text-[var(--text-tertiary)]">{person.tests} ta test</span>
                    </div>
                  </div>

                  {/* XP */}
                  <div className="text-right shrink-0 pl-1">
                    <p
                      className="text-sm font-bold tabular-nums"
                      style={{ color: person.isCurrentUser ? 'var(--primary)' : isTop3 ? m.ring : 'var(--text-primary)' }}
                    >
                      {person.xp.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-[var(--text-tertiary)]">XP</p>
                  </div>
                </div>
              );
            })}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
