import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  Gear, SignOut, Medal, BookOpen, Trophy, Target,
  Lightning, CaretRight, X,
  Sun, Moon, Shield, Question,
  Compass, GraduationCap, Student, ChalkboardTeacher,

} from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';
import { user as initialUser, recentActivities } from '../data/mockData';
import { BadgeIcon } from '../components/illustrations/GeoIllustrations';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SETTINGS_KEY = 'geo_user_settings';
function loadUserSettings() {
  try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; } catch { return {}; }
}

const PROFILE_GRAD = 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)';

const ROLE_META = {
  school_student: { label: 'Maktab o\'quvchisi', Icon: GraduationCap },
  student:        { label: 'Talaba',              Icon: Student },
  teacher:        { label: 'O\'qituvchi',         Icon: ChalkboardTeacher },
};

const metricConfig = {
  accuracy: { label: 'Natija',    unit: '%', color: '#3B82F6' },
  tests:    { label: 'Testlar',   unit: '',  color: '#8B5CF6' },
  quiz:     { label: 'Viktorina', unit: '',  color: '#F59E0B' },
  time:     { label: 'Vaqt',      unit: 'h', color: '#22C55E' },
};

const RANGES = [
  { key: 'daily',   label: 'Kunlik',   days: 1  },
  { key: 'weekly',  label: 'Haftalik', days: 7  },
  { key: 'monthly', label: 'Oylik',    days: 30 },
  { key: 'yearly',  label: 'Yillik',   days: 365 },
  { key: 'all',     label: 'Umumiy',   days: 730 },
];

const UZ_DAYS   = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];
const UZ_MONTHS = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];

function dateLabel(date, rangeKey) {
  if (rangeKey === 'daily')   return `${String(date.getHours()).padStart(2,'0')}:00`;
  if (rangeKey === 'weekly')  return UZ_DAYS[date.getDay()];
  if (rangeKey === 'monthly') return `${date.getDate()}-${UZ_MONTHS[date.getMonth()]}`;
  if (rangeKey === 'yearly')  return UZ_MONTHS[date.getMonth()];
  return `${UZ_MONTHS[date.getMonth()]} ${String(date.getFullYear()).slice(2)}`;
}

function genData(rangeKey) {
  let points = [];

  if (rangeKey === 'daily') {
    // 0:00 dan 23:00 gacha
    for (let h = 0; h < 24; h++) {
      points.push({ label: `${String(h).padStart(2,'0')}:00` });
    }
  } else if (rangeKey === 'weekly') {
    // Dushanbadan yakshanbacha (joriy hafta)
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0=yak
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7)); // dushanbaga qaytish
    for (let d = 0; d < 7; d++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + d);
      points.push({ label: UZ_DAYS[date.getDay()] });
    }
  } else if (rangeKey === 'monthly') {
    // Joriy oyning 1-kunidan oxirigacha
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const mon = UZ_MONTHS[now.getMonth()];
    for (let d = 1; d <= daysInMonth; d++) {
      points.push({ label: `${d}-${mon}` });
    }
  } else if (rangeKey === 'yearly') {
    // Yanvardan dekabrgacha (joriy yil)
    for (let m = 0; m < 12; m++) {
      points.push({ label: UZ_MONTHS[m] });
    }
  } else {
    // Umumiy: oxirgi 2 yil, oyma-oy
    const now = new Date();
    for (let m = 23; m >= 0; m--) {
      const date = new Date(now.getFullYear(), now.getMonth() - m, 1);
      points.push({ label: `${UZ_MONTHS[date.getMonth()]} ${String(date.getFullYear()).slice(2)}` });
    }
  }

  return points.map((p, i) => {
    const base = 60 + Math.sin(i * 0.35) * 18 + Math.random() * 12;
    return {
      day:      p.label,
      accuracy: Math.round(base),
      tests:    Math.round(2 + Math.sin(i * 0.2) * 2 + Math.random() * 3),
      quiz:     Math.round(1 + Math.cos(i * 0.25) * 1.5 + Math.random() * 2),
      time:     Math.round(45 + Math.sin(i * 0.15) * 25 + Math.random() * 20),
    };
  });
}


const activityColors = { test: '#2563EB', quiz: '#F59E0B', game: '#22C55E' };
const activityIcons  = { test: BookOpen, quiz: Lightning, game: Compass };

const pad = n => String(n).padStart(2, '0');

function ActivityModal({ activity, onClose }) {
  const a = activity;
  const Icon = activityIcons[a.type] || BookOpen;
  const color = activityColors[a.type] || '#2563EB';
  const pct = Math.round((a.score / a.total) * 100);
  const typeLabel = { test: 'Test', quiz: 'Viktorina', game: "O'yin" }[a.type] || a.type;
  const d = new Date(a.date);
  const dateStr = `${pad(d.getDate())}.${pad(d.getMonth()+1)}.${d.getFullYear()} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;

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
        style={{ ['--motion-sm-scale']: 1 }}
        className="w-full max-w-lg bg-[var(--surface)] rounded-t-3xl sm:rounded-3xl p-5 space-y-4 sm:[--y-override:0]"
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
            <p className="text-xs text-[var(--text-secondary)]">{typeLabel} · {dateStr}</p>
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

export default function Profile() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const [chartMetric, setChartMetric] = useState('accuracy');
  const [chartRange, setChartRange] = useState('monthly');
  const [badgesOpen, setBadgesOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [user, setUser] = useState(() => ({ ...initialUser, ...loadUserSettings() }));

  // re-read localStorage every time this page is visited
  useEffect(() => {
    setUser({ ...initialUser, ...loadUserSettings() });
  }, []);

  const cfg = metricConfig[chartMetric] || null;
  const roleMeta = ROLE_META[user.role] || ROLE_META.school_student;
  const chartData = genData(chartRange);
  const RoleIcon = roleMeta.Icon;
  const xpPercent = Math.round((2420 / 5000) * 100);

  const menuItems = [
    { icon: BookOpen, label: 'Sertifikatlar',    color: '#2563EB', count: initialUser.certificates, to: '/certificates' },
    { icon: Trophy,   label: 'Reyting',          color: '#8B5CF6', count: `#${initialUser.rank}`, to: '/rankings' },
    { icon: Shield,   label: "Foydalanuvchi o'ffertasi", color: '#06B6D4', count: null, to: '/oferta' },
    { icon: Question, label: 'Yordam',           color: '#F97316', count: null, to: null },
  ];

  return (
    <div className="space-y-5 pb-6">
      <SEO title="Mening Profilim" description="Profil va statistika" url="/profile" noindex />

      {/* ── Hero card ─────────────────────────────────────────────────────── */}
      <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
        {/* Cover strip */}
        <div className="h-24 relative"
          style={{ background: PROFILE_GRAD }}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-3 right-3 flex gap-2">
            <button onClick={() => navigate('/settings')}
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all">
              <Gear size={15} />
            </button>
            <button
              onClick={() => setShowLogout(true)}
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500/60 transition-all">
              <SignOut size={15} />
            </button>
          </div>
        </div>

        <div className="px-5 pb-5">
          {/* Avatar */}
          <div className="relative -mt-10 mb-3 w-fit">
            <div className="w-20 h-20 rounded-full border-4 border-[var(--surface)] flex items-center justify-center text-white shadow-lg overflow-hidden"
              style={{ background: PROFILE_GRAD }}>
              {user.avatar
                ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                : <RoleIcon size={36} weight="duotone" />}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#22C55E] border-2 border-[var(--surface)] flex items-center justify-center">
              <Lightning size={11} className="text-white" weight="fill" />
            </div>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)] leading-tight">{user.name}</h1>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{user.school}</p>
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                  style={{ background: 'var(--primary)' }}>
                  {roleMeta.label}
                </span>
                {user.role === 'school_student' && user.grade && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400">{user.grade}-sinf</span>
                )}
                {user.role === 'student' && user.course && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400">{user.course}-kurs</span>
                )}
                {user.role === 'teacher' && user.experience && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400">{user.experience} yil</span>
                )}
                {user.region && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--background)] text-[var(--text-secondary)]">{user.region}</span>
                )}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[var(--border)]">
            {/* Level */}
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--background)]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white"
                style={{ background: PROFILE_GRAD }}>
                {user.level}
              </div>
              <p className="text-[10px] font-semibold text-[var(--text-secondary)]">Daraja</p>
              <p className="text-[9px] text-[var(--text-tertiary)]">Jami daraja</p>
            </div>

            {/* XP */}
            <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--background)]">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center">
                <Lightning size={18} weight="fill" className="text-blue-500" />
              </div>
              <p className="text-[10px] font-semibold text-[var(--text-secondary)]">{user.xp.toLocaleString()} XP</p>
              <p className="text-[9px] text-[var(--text-tertiary)]">Jami ball</p>
            </div>

          </div>

          {/* XP progress */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] mb-1.5">
              <span className="text-[var(--text-secondary)]">
                Keyingi daraja — <span className="font-bold text-[var(--text-primary)]">{user.level + 1}</span>
              </span>
              <span className="font-semibold text-[var(--text-secondary)]">2,420 / 5,000 XP</span>
            </div>
            <div className="h-2 rounded-full bg-[var(--background)] overflow-hidden">
              <div className="h-full rounded-full transition-all"
                style={{ width: `${xpPercent}%`, background: 'var(--primary)' }} />
            </div>
            <p className="text-[9px] text-[var(--text-tertiary)] mt-1 text-right">{100 - xpPercent}% qoldi</p>
          </div>
        </div>
      </div>

      {/* ── Quick stats ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Testlar', value: user.totalTests, color: '#2563EB', bg: '#EFF6FF', darkBg: 'rgba(37,99,235,0.12)' },
          { label: 'Reyting', value: `#${initialUser.rank}`, color: '#8B5CF6', bg: '#F5F3FF', darkBg: 'rgba(139,92,246,0.12)' },
          { label: "O'quv vaqti", value: `${user.achievements.hoursSpent}h`, color: '#22C55E', bg: '#F0FDF4', darkBg: 'rgba(34,197,94,0.12)' },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-4 border border-[var(--border)] bg-[var(--surface)]">
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Chart ────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-3">
        <h2 className="text-base font-bold text-[var(--text-primary)]">Faoliyat</h2>

        {/* Metric tabs */}
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          <button onClick={() => setChartMetric('all')}
            className={cn('px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all shrink-0',
              chartMetric === 'all' ? 'bg-[var(--text-primary)] text-[var(--surface)]' : 'text-[var(--text-secondary)] bg-[var(--background)]')}>
            Barchasi
          </button>
          {Object.entries(metricConfig).map(([key, c]) => (
            <button key={key} onClick={() => setChartMetric(key)}
              className={cn('px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all shrink-0',
                chartMetric === key ? 'text-white' : 'text-[var(--text-secondary)] bg-[var(--background)]')}
              style={chartMetric === key ? { background: c.color } : {}}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Range tabs */}
        <div className="flex gap-1">
          {RANGES.map(r => (
            <button key={r.key} onClick={() => setChartRange(r.key)}
              className={cn('flex-1 py-1 rounded-lg text-[10px] font-semibold transition-all',
                chartRange === r.key
                  ? 'bg-[var(--background)] text-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]')}>
              {r.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                {Object.entries(metricConfig).map(([key, c]) => (
                  <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={c.color} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={c.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 9, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 11 }}
                formatter={(v, name) => {
                  const m = metricConfig[name];
                  return m ? [`${v}${m.unit}`, m.label] : [v, name];
                }}
              />
              {chartMetric === 'all'
                ? Object.entries(metricConfig).map(([key, c]) => (
                    <Area key={key} type="monotone" dataKey={key} stroke={c.color} strokeWidth={1.5}
                      fill={`url(#grad-${key})`} dot={false} activeDot={{ r: 3, fill: c.color, strokeWidth: 0 }} />
                  ))
                : <Area type="monotone" dataKey={chartMetric} stroke={cfg.color} strokeWidth={2}
                    fill={`url(#grad-${chartMetric})`} dot={false}
                    activeDot={{ r: 4, fill: cfg.color, strokeWidth: 0 }} />
              }
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend for "all" mode */}
        {chartMetric === 'all' && (
          <div className="flex items-center justify-center gap-4 pt-1">
            {Object.entries(metricConfig).map(([key, c]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 rounded-full" style={{ background: c.color }} />
                <span className="text-[9px] text-[var(--text-secondary)]">{c.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Badges ───────────────────────────────────────────────────────── */}
      {(() => {
        const TIERS = [
          { tier: 'bronze',    label: 'Bronza',    color: '#CD7F32', glow: 'rgba(205,127,50,0.35)',   bg: 'rgba(205,127,50,0.08)'   },
          { tier: 'silver',    label: 'Kumush',    color: '#94A3B8', glow: 'rgba(148,163,184,0.35)',  bg: 'rgba(148,163,184,0.08)'  },
          { tier: 'gold',      label: 'Oltin',     color: '#D4A820', glow: 'rgba(212,168,32,0.4)',    bg: 'rgba(212,168,32,0.08)'   },
          { tier: 'platinum',  label: 'Platina',   color: '#7C3AED', glow: 'rgba(124,58,237,0.4)',    bg: 'rgba(124,58,237,0.08)'   },
          { tier: 'legendary', label: 'Afsonaviy', color: '#EF4444', glow: 'rgba(239,68,68,0.4)',     bg: 'rgba(239,68,68,0.08)'    },
        ];
        const unlockedBadges = initialUser.badges.filter(b => b.unlocked);
        const total = initialUser.badges.length;
        const pct = Math.round((unlockedBadges.length / total) * 100);

        return (
          <div className="rounded-2xl overflow-hidden border border-[var(--border)]" style={{
            background: darkMode
              ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
              : 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #ede9fe 100%)',
            boxShadow: darkMode ? '0 4px 24px rgba(0,0,0,0.3)' : '0 4px 24px rgba(99,102,241,0.1)',
          }}>
            {/* Header */}
            <button onClick={() => setBadgesOpen(o => !o)} className="w-full p-5 text-left">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg font-black leading-tight"
                    style={{ color: darkMode ? 'white' : '#1e1b4b' }}>Nishonlar</h2>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {/* stacked preview icons */}
                  <div className="flex items-center">
                    {unlockedBadges.slice(0, 3).map((badge, i) => {
                      const tc = TIERS.find(t => t.tier === badge.tier)?.color || '#94A3B8';
                      return (
                        <div key={badge.id} style={{
                          marginLeft: i === 0 ? 0 : -10, zIndex: 3 - i, position: 'relative',
                          width: 32, height: 32, borderRadius: '50%',
                          background: darkMode ? '#1a1a2e' : '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: `0 0 0 2px ${tc}60`,
                        }}>
                          <BadgeIcon name={badge.name} size={30} color={tc} unlocked={true} />
                        </div>
                      );
                    })}
                  </div>
                  <div className={cn('w-7 h-7 rounded-full flex items-center justify-center transition-transform', badgesOpen && 'rotate-90')}
                    style={{ background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}>
                    <CaretRight size={14} style={{ color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)' }} />
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px]">
                  <span style={{ color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}>{unlockedBadges.length} ta ochilgan</span>
                  <span className="font-bold" style={{ color: darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}>{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}>
                  <div className="h-full rounded-full transition-all" style={{
                    width: `${pct}%`,
                    background: 'var(--primary)',
                  }} />
                </div>
                {/* tier dots */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  {TIERS.map(t => {
                    const tc = initialUser.badges.filter(b => b.tier === t.tier);
                    const done = tc.filter(b => b.unlocked).length;
                    return (
                      <div key={t.tier} className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: done > 0 ? t.color : darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }} />
                        <span className="text-[8px]" style={{ color: done > 0 ? t.color : darkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)' }}>{done}/{tc.length}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </button>

            {/* Expanded content */}
            {badgesOpen && (
              <div className="px-4 pb-5 space-y-5">
                {TIERS.map(({ tier, label, color, glow, bg }) => {
                  const tierBadges = initialUser.badges.filter(b => b.tier === tier);
                  if (!tierBadges.length) return null;
                  const doneCount = tierBadges.filter(b => b.unlocked).length;
                  return (
                    <div key={tier}>
                      {/* Tier header */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="h-px flex-1 rounded" style={{ background: `linear-gradient(90deg, ${color}60, transparent)` }} />
                        <span className="text-[10px] font-black uppercase tracking-widest px-2" style={{ color }}>{label}</span>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: `${color}20`, color }}>
                          {doneCount}/{tierBadges.length}
                        </span>
                        <div className="h-px flex-1 rounded" style={{ background: `linear-gradient(90deg, transparent, ${color}60)` }} />
                      </div>

                      {/* Badge grid */}
                      <div className="grid grid-cols-3 gap-2">
                        {tierBadges.map(badge => (
                          <div key={badge.id}
                            className="relative flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all"
                            style={{
                              background: badge.unlocked ? bg : darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                              border: `1px solid ${badge.unlocked ? `${color}40` : darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
                              boxShadow: badge.unlocked ? `0 0 16px ${glow}, inset 0 1px 0 ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)'}` : 'none',
                            }}>
                            {/* Lock overlay for locked */}
                            {!badge.unlocked && (
                              <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                                style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                                <svg width="7" height="8" viewBox="0 0 7 8" fill="none">
                                  <rect x="1" y="3.5" width="5" height="4" rx="0.8" fill={darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'}/>
                                  <path d="M2 3.5V2.5A1.5 1.5 0 015 2.5V3.5" stroke={darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'} strokeWidth="0.8"/>
                                </svg>
                              </div>
                            )}
                            <BadgeIcon name={badge.name} size={40} color={badge.unlocked ? color : '#4a5568'} unlocked={badge.unlocked} />
                            <p className="text-[9px] font-bold text-center leading-tight"
                              style={{ color: badge.unlocked ? (darkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.85)') : (darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)') }}>
                              {badge.name}
                            </p>
                            <p className="text-[8px] text-center leading-tight"
                              style={{ color: badge.unlocked ? (darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)') : (darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)') }}>
                              {badge.unlocked && badge.date ? badge.date : badge.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}


      {/* ── Menu ─────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        {menuItems.map((item, i) => (
          <div key={item.label}
            onClick={() => item.to && navigate(item.to)}
            className={cn('flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-[var(--background)] transition-all',
              i < menuItems.length - 1 && 'border-b border-[var(--border)]')}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${item.color}18` }}>
              <item.icon size={18} style={{ color: item.color }} />
            </div>
            <p className="flex-1 text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
            <div className="flex items-center gap-2">
              {item.count !== null && (
                <span className="text-xs font-semibold text-[var(--text-secondary)]">{item.count}</span>
              )}
              <CaretRight size={15} className="text-[var(--text-tertiary)]" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Theme ─────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden divide-y divide-[var(--border)]">
        {/* Theme toggle */}
        <div className="px-4 py-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--background)] flex items-center justify-center shrink-0">
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-blue-500" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--text-primary)]">{darkMode ? "Yorqin rejim" : "Qorong'i rejim"}</p>
            <p className="text-[10px] text-[var(--text-secondary)]">Tashqi ko'rinish</p>
          </div>
          <button onClick={toggleTheme}
            className={cn('w-12 h-6 rounded-full transition-all relative shrink-0', darkMode ? 'bg-blue-500' : 'bg-[var(--border)]')}>
            <div className={cn('w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-sm', darkMode ? 'left-6' : 'left-0.5')} />
          </button>
        </div>
      </div>

      {/* ── Recent activity ──────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Oxirgi Faoliyat</h2>
          <button onClick={() => navigate('/activity')}
            className="text-xs font-semibold text-[var(--primary)] hover:opacity-70 transition-opacity">
            Ko'proq →
          </button>
        </div>
        <div className="space-y-2">
          {recentActivities.slice(0, 5).map(activity => {
            const Icon = activityIcons[activity.type] || BookOpen;
            const color = activityColors[activity.type] || '#2563EB';
            const pct = Math.round((activity.score / activity.total) * 100);
            return (
              <div key={activity.id} onClick={() => setSelectedActivity(activity)}
                className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] cursor-pointer hover:bg-[var(--background)] transition-all">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                  <Icon size={17} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">{activity.title}</p>
                  <p className="text-[10px] text-[var(--text-secondary)]">
                    {activity.score}/{activity.total} ball · {pct}% · +{activity.xpGained} XP
                    {activity.rankChange > 0 && <span className="text-green-500"> · ↑{activity.rankChange}</span>}
                    {activity.rankChange < 0 && <span className="text-red-400"> · ↓{Math.abs(activity.rankChange)}</span>}
                  </p>
                </div>
                <span className="text-[10px] text-[var(--text-tertiary)] shrink-0">
                  {new Date(activity.date).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedActivity && <ActivityModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showLogout && createPortal(
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}
            className="flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLogout(false)}>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="bg-[var(--surface)] rounded-2xl p-6 mx-4 w-full max-w-sm space-y-4"
              onClick={e => e.stopPropagation()}>
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/15 flex items-center justify-center">
                  <SignOut size={22} weight="fill" className="text-red-500" />
                </div>
                <div>
                  <p className="font-bold text-[var(--text-primary)]">Chiqishni tasdiqlang</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">Hisobingizdan chiqishni xohlaysizmi?</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLogout(false)}
                  className="flex-1 h-11 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--background)] transition-all">
                  Bekor qilish
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('geo_user_settings');
                    navigate('/auth');
                  }}
                  className="flex-1 h-11 rounded-xl bg-red-500 text-sm font-semibold text-white hover:bg-red-600 transition-all">
                  Chiqish
                </button>
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>

      <p className="text-center text-[10px] text-[var(--text-tertiary)] pb-2">Geo-Test.uz v1.0.0</p>
    </div>
  );
}
