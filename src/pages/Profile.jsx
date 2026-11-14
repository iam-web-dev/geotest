import { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  Gear, SignOut, BookOpen, Trophy,
  Lightning, CaretRight, X, ArrowRight,
  Shield, Question, Compass, GraduationCap,
  Student, ChalkboardTeacher, ShareNetwork,
  Copy, Check, Fire, Target, Timer,
  IdentificationCard, Sparkle, ArrowUp, ArrowDown,
  CalendarBlank, CaretDown
} from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { user as initialUser, recentActivities } from '../data/mockData';

const SETTINGS_KEY = 'geo_user_settings';
function loadUserSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
  } catch {
    return {};
  }
}

const ROLE_META = {
  school_student: { label: "Maktab o'quvchisi", Icon: GraduationCap, color: '#2563EB' },
  student:        { label: 'Talaba',             Icon: Student,       color: '#7C3AED' },
  teacher:        { label: "O'qituvchi",        Icon: ChalkboardTeacher, color: '#16A34A' },
};

function getLevelTitle(level) {
  if (level >= 30) return 'Geo Professor';
  if (level >= 25) return 'Bosh Ekspert';
  if (level >= 20) return 'Geo Tadqiqotchi';
  if (level >= 15) return 'Topograf Mutaxassis';
  if (level >= 10) return 'Tajribali Sayohatkor';
  if (level >= 5)  return "Izlanuvchan O'quvchi";
  return "Boshlang'ich Sayyoh";
}

const UZ_MONTHS = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
const UZ_MONTHS_FULL = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
];
const WEEKDAYS = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

// Sample submission activity for 2026 exactly reflecting the user's heatmap
const SAMPLE_ACTIVITIES_2026 = {
  // Iyul
  '2026-07-16': 4,
  // Avgust
  '2026-08-11': 2,
  '2026-08-12': 3,
  '2026-08-13': 3,
  '2026-08-26': 1,
  // Sentabr
  '2026-09-08': 2,
  '2026-09-09': 4,
  '2026-09-10': 2,
  '2026-09-11': 3,
  '2026-09-13': 3,
  '2026-09-15': 2,
  '2026-09-16': 5,
  '2026-09-17': 2,
  '2026-09-18': 3,
  '2026-09-19': 2,
  '2026-09-22': 1,
  // Oktabr
  '2026-10-04': 2,
  '2026-10-09': 1,
  '2026-10-11': 3,
  '2026-10-13': 2,
  '2026-10-14': 2,
  '2026-10-16': 3,
  '2026-10-18': 4,
  '2026-10-20': 3,
  '2026-10-21': 5,
  '2026-10-22': 3,
  '2026-10-23': 3,
  '2026-10-25': 5,
  // Noyabr
  '2026-11-03': 2,
  '2026-11-04': 3,
  '2026-11-05': 1,
  '2026-11-06': 2,
  '2026-11-10': 1,
  '2026-11-11': 3,
  '2026-11-13': 1,
  '2026-11-14': 2,
  '2026-11-16': 1,
  '2026-11-17': 2,
  '2026-11-18': 3,
};

function getSubmissionLevel(count) {
  if (!count || count <= 0) return 0;
  if (count <= 1) return 1;
  if (count <= 2) return 2;
  if (count <= 4) return 3;
  return 4;
}

const LEVEL_COLORS = {
  0: 'bg-slate-200 dark:bg-[#1c2333] hover:bg-slate-300 dark:hover:bg-[#283246]',
  1: 'bg-[#0e4429] hover:brightness-125',
  2: 'bg-[#006d32] hover:brightness-125',
  3: 'bg-[#26a641] hover:brightness-125',
  4: 'bg-[#39d353] hover:brightness-125',
};

/**
 * Generates horizontal activity heatmap for a given year.
 * Structured by month with columns of 7 days (Monday to Sunday).
 * First day of each month starts on its exact day of the week.
 */
function genYearHeatmap(yearStr = '2026') {
  const year = parseInt(yearStr, 10) || 2026;
  const monthsCount = year === 2026 ? 11 : 12; // 2026 displays through November (matching screenshot)
  const months = [];
  let totalSubmissions = 0;

  for (let m = 0; m < monthsCount; m++) {
    const monthName = UZ_MONTHS_FULL[m];
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    const firstDayDow = new Date(year, m, 1).getDay();
    // Monday = 0, Sunday = 6
    const startOffset = (firstDayDow + 6) % 7;
    const totalSlots = Math.ceil((startOffset + daysInMonth) / 7) * 7;
    const endOffset = totalSlots - (startOffset + daysInMonth);

    const cells = [];

    // 1. Leading empty cells
    for (let i = 0; i < startOffset; i++) {
      cells.push(null);
    }

    // 2. Days of month
    for (let d = 1; d <= daysInMonth; d++) {
      const mStr = String(m + 1).padStart(2, '0');
      const dStr = String(d).padStart(2, '0');
      const dateKey = `${year}-${mStr}-${dStr}`;

      let count = 0;
      if (year === 2026) {
        count = SAMPLE_ACTIVITIES_2026[dateKey] || 0;
      } else {
        const seed = year * 372 + m * 31 + d;
        if ((seed * 17 + 5) % 10 < 3) {
          count = 1 + ((seed * 7) % 5);
        }
      }

      const level = getSubmissionLevel(count);
      totalSubmissions += count;

      cells.push({
        dateStr: `${d}-${UZ_MONTHS_FULL[m].toLowerCase()}, ${year}`,
        dayNum: d,
        monthIndex: m,
        count,
        level,
      });
    }

    // 3. Trailing empty cells
    for (let i = 0; i < endOffset; i++) {
      cells.push(null);
    }

    months.push({
      name: monthName,
      monthIndex: m,
      cells,
      columnsCount: totalSlots / 7,
    });
  }

  return { months, totalSubmissions };
}

const activityColors = { test: '#2563EB', quiz: '#F59E0B', game: '#10B981' };
const activityIcons  = { test: BookOpen, quiz: Lightning, game: Compass };
const activityLabels = { test: 'Test sinovi', quiz: 'Viktorina', game: "Geografik o'yin" };

const pad = n => String(n).padStart(2, '0');

function ActivityModal({ activity, onClose }) {
  const a = activity;
  const Icon = activityIcons[a.type] || BookOpen;
  const color = activityColors[a.type] || '#2563EB';
  const pct = Math.round((a.score / a.total) * 100);
  const typeLabel = activityLabels[a.type] || a.type;
  const d = new Date(a.date);
  const dateStr = `${pad(d.getDate())}.${pad(d.getMonth()+1)}.${d.getFullYear()} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;

  return createPortal(
    <motion.div
      key="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md bg-[var(--surface)] rounded-t-3xl sm:rounded-3xl p-6 space-y-5 border border-[var(--border)] shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-1 rounded-full bg-[var(--border)] mx-auto sm:hidden" />
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--background)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors ml-auto"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
            <Icon size={24} style={{ color }} weight="duotone" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base text-[var(--text-primary)] truncate">{a.title}</h3>
            <p className="text-xs text-[var(--text-secondary)]">{typeLabel} • {dateStr}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--text-secondary)]">To'plangan natija</span>
            <span className="text-sm font-bold tabular-nums" style={{ color }}>{a.score} / {a.total} ball</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--border)] overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
          </div>
          <div className="flex justify-between items-center text-xs text-[var(--text-tertiary)]">
            <span>Aniqlik ko'rsatkichi</span>
            <span className="font-bold text-[var(--text-primary)] tabular-nums">{pct}%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 text-center">
            <p className="text-base font-black text-[var(--primary)] tabular-nums">+{a.xpGained}</p>
            <p className="text-[10px] font-medium text-[var(--text-secondary)] mt-0.5">XP ball</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 text-center">
            <p className="text-base font-black tabular-nums" style={{ color: a.rankChange > 0 ? '#10B981' : a.rankChange < 0 ? '#EF4444' : 'var(--text-primary)' }}>
              {a.rankChange > 0 ? `↑${a.rankChange}` : a.rankChange < 0 ? `↓${Math.abs(a.rankChange)}` : '—'}
            </p>
            <p className="text-[10px] font-medium text-[var(--text-secondary)] mt-0.5">Reyting</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 text-center">
            <p className="text-base font-black text-[var(--text-primary)] tabular-nums">{a.total}</p>
            <p className="text-[10px] font-medium text-[var(--text-secondary)] mt-0.5">Savollar</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-[var(--background)] hover:bg-[var(--border)] text-sm font-semibold text-[var(--text-primary)] transition-colors"
        >
          Yopish
        </button>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function StudentIdModal({ user, onClose }) {
  const roleMeta = ROLE_META[user.role] || ROLE_META.school_student;
  const RoleIcon = roleMeta.Icon;
  const levelTitle = getLevelTitle(user.level || 1);

  return createPortal(
    <motion.div
      key="student-id-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-sm bg-[var(--surface)] rounded-3xl p-6 border border-[var(--border)] shadow-2xl space-y-5"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center font-bold text-xs">
              GB
            </div>
            <span className="text-sm font-extrabold text-[var(--text-primary)] tracking-tight">GeoBek Talaba ID</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="w-7 h-7 rounded-full flex items-center justify-center bg-[var(--background)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
          >
            <X size={14} weight="bold" />
          </button>
        </div>

        {/* Card visual */}
        <div className="relative rounded-2xl p-5 overflow-hidden border border-[var(--border)] bg-[var(--background)] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-0.5 overflow-hidden flex items-center justify-center shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-[14px]" />
              ) : (
                <RoleIcon size={28} className="text-[var(--primary)]" weight="duotone" />
              )}
            </div>
            <div>
              <h4 className="font-black text-base leading-tight tracking-tight text-[var(--text-primary)]">{user.name}</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{user.username || '@geobek'}</p>
              <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] text-[10px] font-semibold">
                <RoleIcon size={11} />
                <span>{roleMeta.label}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--border)] text-xs">
            <div>
              <p className="text-[10px] text-[var(--text-tertiary)] uppercase font-medium">Muassasa</p>
              <p className="font-semibold text-[var(--text-primary)] truncate mt-0.5">{user.school || 'Belgilanmagan'}</p>
            </div>
            <div>
              <p className="text-[10px] text-[var(--text-tertiary)] uppercase font-medium">Hudud</p>
              <p className="font-semibold text-[var(--text-primary)] truncate mt-0.5">{user.region || "O'zbekiston"}</p>
            </div>
            <div>
              <p className="text-[10px] text-[var(--text-tertiary)] uppercase font-medium">Unvon & Daraja</p>
              <p className="font-bold text-[var(--primary)] mt-0.5">{levelTitle} ({user.level}-daraja)</p>
            </div>
            <div>
              <p className="text-[10px] text-[var(--text-tertiary)] uppercase font-medium">Reyting</p>
              <p className="font-bold text-[var(--text-primary)] mt-0.5">#{user.rank || 42}-o'rin</p>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
            <span className="font-mono">GEO-ID: GB-{(user.id || 1024).toString().padStart(6, '0')}</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Check size={10} weight="bold" /> Tasdiqlangan profil
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-hover)] transition-colors"
        >
          Tushunarli
        </button>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const { user: authUser, signOut, loginAsDemo } = useAuth();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState('2026');
  const [userSettings] = useState(loadUserSettings);

  // Yearly Activity Heatmap
  const { months: heatmapMonths, totalSubmissions: totalYearSubmissions } = useMemo(() => {
    return genYearHeatmap(selectedYear);
  }, [selectedYear]);

  const heatmapScrollRef = useRef(null);

  // Scroll heatmap to the end (current date / latest month) by default
  useEffect(() => {
    const el = heatmapScrollRef.current;
    if (el) {
      el.scrollLeft = el.scrollWidth;
      const timer = setTimeout(() => {
        if (el) el.scrollLeft = el.scrollWidth;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedYear, heatmapMonths]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleLogout = async () => {
    await signOut();
    setShowLogout(false);
    navigate('/auth');
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        showToast("Profil havolasi nusxalandi!");
        return;
      } catch {
        // fallback
      }
    }
    showToast("Profil havolasi: " + url);
  };

  // Not logged in view
  if (!authUser) {
    return (
      <div className="max-w-lg mx-auto py-12 px-4 text-center space-y-6">
        <SEO title="Kirish — GeoBek" description="Shaxsiy profilingizga kiring" url="/profile" />

        <div className="w-20 h-20 mx-auto rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xl flex items-center justify-center p-3">
          <img src={`${import.meta.env.BASE_URL}main_logo.png`} alt="GeoBek" className="w-full h-full object-contain" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">GeoBek Profiliga xush kelibsiz</h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
            Test natijalaringiz, yutuqlaringiz, milliy sertifikatlar va respublika reytingingizni kuzatib borish uchun hisobingizga kiring.
          </p>
        </div>

        <div className="space-y-3 pt-3">
          <button
            onClick={() => navigate('/auth?mode=signin')}
            className="w-full h-12 rounded-2xl bg-[var(--primary)] text-white font-bold text-sm hover:bg-[var(--primary-hover)] transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <span>Tizimga kirish</span>
            <ArrowRight size={16} weight="bold" />
          </button>

          <button
            onClick={() => navigate('/auth?mode=signup')}
            className="w-full h-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] font-bold text-sm hover:bg-[var(--background)] transition-all"
          >
            <span>Yangi hisob yaratish</span>
          </button>
        </div>

        <div className="pt-4 border-t border-[var(--border)]">
          <button
            onClick={() => loginAsDemo()}
            className="text-xs text-[var(--primary)] hover:underline font-semibold flex items-center justify-center gap-1.5 mx-auto py-1 px-3 rounded-lg hover:bg-[var(--primary-soft)] transition-colors"
          >
            <Lightning size={15} weight="fill" className="text-amber-500" />
            <span>Demo hisob orqali davom etish</span>
          </button>
        </div>
      </div>
    );
  }

  const user = { ...initialUser, ...authUser, ...userSettings };
  const roleMeta = ROLE_META[user.role] || ROLE_META.school_student;
  const RoleIcon = roleMeta.Icon;
  const levelTitle = getLevelTitle(user.level || 1);

  // XP calculation
  const currentLevelXp = (user.xp || 12580) % 2500;
  const xpNeeded = 2500;
  const xpPercent = Math.min(100, Math.round((currentLevelXp / xpNeeded) * 100));

  // Certificates list
  const certList = (user.nationalCertificates && user.nationalCertificates.length > 0)
    ? user.nationalCertificates
    : initialUser.nationalCertificates;

  // Navigation menu items
  const menuItems = [
    {
      icon: BookOpen,
      label: 'Milliy sertifikatlar',
      sub: `${certList.length} ta sertifikat mavjud`,
      color: '#2563EB',
      to: '/certificates'
    },
    {
      icon: Trophy,
      label: 'Respublika reytingi',
      sub: `#${user.rank || 42}-o'rinda turibsiz`,
      color: '#F59E0B',
      to: '/rankings'
    },
    {
      icon: Shield,
      label: 'Foydalanuvchi ofertasi',
      sub: 'Platformadan foydalanish shartlari',
      color: '#06B6D4',
      to: '/oferta'
    },
    {
      icon: Question,
      label: "Qo'llab-quvvatlash xizmati",
      sub: 'Telegram orqali admin bilan bog\'lanish',
      color: '#10B981',
      href: 'https://t.me/geobek_admin'
    },
    {
      icon: SignOut,
      label: 'Tizimdan chiqish',
      sub: 'Hisobdan xavfsiz chiqish',
      color: '#EF4444',
      isDanger: true,
      action: () => setShowLogout(true)
    },
  ];

  return (
    <div className="space-y-6 pb-12 w-full max-w-5xl mx-auto px-1 sm:px-2">
      <SEO title="Mening Profilim — GeoBek" description="O'quvchi profili va natijalari" url="/profile" noindex />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xl flex items-center gap-2 border border-slate-700/50"
          >
            <Check size={14} className="text-emerald-400" weight="bold" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────────
          1. ASOSIY QISM: W-FULL TOP PROFILE CARD (DESKTOP VA TABLETDA HAM FLEX-COL)
      ───────────────────────────────────────────────────────────────── */}
      <div className="w-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col gap-5 w-full">
          
          {/* Top: Avatar & Identity details */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <div className="relative w-fit shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-[var(--border)] bg-[var(--background)] flex items-center justify-center text-[var(--primary)] overflow-hidden shadow-xs">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <RoleIcon size={42} weight="duotone" />
                )}
              </div>
              <div
                title={`${user.streak || 7} kunlik faollik`}
                className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black border-2 border-[var(--surface)] flex items-center gap-0.5 shadow-sm"
              >
                <Fire size={11} weight="fill" />
                <span>{user.streak || 7}d</span>
              </div>
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
                  {user.name}
                </h1>
                <span className="text-xs text-[var(--text-tertiary)] font-mono">{user.username || '@yodgorov'}</span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(`GB-${(user.id || 1024).toString().padStart(6, '0')}`);
                    showToast("GeoBek ID nusxalandi!");
                  }}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--border)] text-[10px] font-mono text-[var(--text-secondary)] transition-colors ml-1"
                  title="ID nusxalash"
                >
                  <span>GB-{(user.id || 1024).toString().padStart(6, '0')}</span>
                  <Copy size={11} className="text-[var(--text-tertiary)]" />
                </button>
              </div>

              <p className="text-xs text-[var(--text-secondary)] font-medium">
                {user.school || "37-IDUM, Toshkent"} • {user.region || "Toshkent shahri"}
              </p>

              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-md text-white flex items-center gap-1 shadow-xs"
                  style={{ background: roleMeta.color }}
                >
                  <RoleIcon size={12} weight="bold" />
                  <span>{roleMeta.label}</span>
                </span>

                {user.role === 'school_student' && user.grade && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300">
                    {user.grade}-sinf
                  </span>
                )}
                {user.role === 'student' && user.course && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300">
                    {user.course}-kurs
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom (in flex-col under profile): Gamified Level, XP Progress & Actions */}
          <div className="w-full p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--background)] space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-black shrink-0">
                  <Sparkle size={18} weight="fill" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black text-[var(--text-primary)]">{levelTitle}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      {user.level || 24}-daraja
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                    Keyingi darajagacha <span className="font-semibold text-[var(--text-primary)] tabular-nums">{xpNeeded - currentLevelXp} XP</span> qoldi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="text-sm font-black text-[var(--primary)] tabular-nums">
                  {(user.xp || 12580).toLocaleString()} XP
                </span>
                <span className="text-[11px] text-[var(--text-tertiary)] font-medium">
                  / {((Math.floor((user.xp || 12580) / 2500) + 1) * 2500).toLocaleString()} XP
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 rounded-full bg-[var(--border)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>

            {/* Actions row */}
            <div className="flex items-center gap-2.5 pt-1 flex-wrap sm:flex-nowrap">
              <button
                onClick={() => setShowIdCard(true)}
                className="flex-1 min-w-[140px] h-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--border)] text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <IdentificationCard size={16} weight="bold" className="text-[var(--primary)]" />
                <span>O'quvchi kartasi</span>
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="h-10 px-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Gear size={15} weight="bold" />
                <span>Tahrirlash</span>
              </button>
              <button
                onClick={handleShare}
                aria-label="Ulashish"
                title="Profilni ulashish"
                className="h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center justify-center"
              >
                <ShareNetwork size={16} weight="bold" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          2. ASOSIY STATISTIKA (RESPUBLIKA REYTINGI, ANIQLIK, TESTLAR, VAQT)
      ───────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
        {/* Respublika Reytingi */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-2 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Respublika Reytingi</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Trophy size={16} weight="duotone" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[var(--text-primary)] tabular-nums tracking-tight">
              #{user.rank || 42}
            </p>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Top 1% o'quvchi</p>
          </div>
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center gap-1 text-[10px] font-bold text-emerald-500">
            <span>↑3 pog'ona</span>
          </div>
        </div>

        {/* O'rtacha Aniqlik */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-2 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">O'rtacha Aniqlik</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Target size={16} weight="duotone" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[var(--text-primary)] tabular-nums tracking-tight">
              {user.averageScore || 78}%
            </p>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Testlar natijasi</p>
          </div>
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center gap-1 text-[10px] font-bold text-emerald-500">
            <span>A'lo daraja</span>
          </div>
        </div>

        {/* Ishlangan Testlar */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-2 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">Ishlangan Testlar</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
              <BookOpen size={16} weight="duotone" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[var(--text-primary)] tabular-nums tracking-tight">
              {user.totalTests || 186}
            </p>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">93 ta viktorina</p>
          </div>
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center gap-1 text-[10px] font-bold text-blue-500">
            <span>+12 bu hafta</span>
          </div>
        </div>

        {/* O'quv Vaqti */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-2 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-secondary)]">O'quv Vaqti</span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
              <Timer size={16} weight="duotone" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[var(--text-primary)] tabular-nums tracking-tight">
              {user.achievements?.hoursSpent || 128}h
            </p>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Umumiy sarflangan</p>
          </div>
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center gap-1 text-[10px] font-bold text-purple-500">
            <span>45 kun faol</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          3. FAOLLIK: HEATMAP (MONKEYTYPE / LEETCODE USLUBIDA)
      ───────────────────────────────────────────────────────────────── */}
      <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0b111e] p-5 sm:p-6 shadow-sm space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Faollik
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {selectedYear} yilgi jo'natmalar
            </p>
          </div>

          {/* Year selector */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-slate-100 dark:bg-[#111827] text-slate-800 dark:text-slate-200 text-xs font-semibold pl-3.5 pr-8 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700/80 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-xs transition-colors"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            <CaretDown
              size={12}
              weight="bold"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-slate-200 dark:border-slate-800/80" />

        {/* Horizontal Heatmap Grid */}
        <div ref={heatmapScrollRef} className="overflow-x-auto pb-2 scrollbar-thin scroll-smooth">
          <div className="flex items-start gap-3 sm:gap-4 min-w-max">
            {heatmapMonths.map((month) => (
              <div key={month.name} className="flex flex-col gap-2">
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-400 pl-0.5 select-none">
                  {month.name}
                </span>

                <div
                  className="grid grid-flow-col gap-[3px]"
                  style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}
                >
                  {month.cells.map((cell, idx) => {
                    if (!cell) {
                      return (
                        <div
                          key={`empty-${month.name}-${idx}`}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-0 pointer-events-none"
                        />
                      );
                    }

                    const colorClass = LEVEL_COLORS[cell.level] || LEVEL_COLORS[0];

                    return (
                      <div
                        key={cell.dateStr}
                        onMouseEnter={() => setHoveredDay(cell)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={cn(
                          'w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] transition-transform hover:scale-125 cursor-pointer',
                          colorClass
                        )}
                        title={`${cell.dateStr}: ${cell.count > 0 ? `${cell.count} ta jo'natma` : "Jo'natma yo'q"}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer / Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
          <div className="text-xs text-slate-500 dark:text-slate-400 min-h-[1.25rem] flex items-center">
            {hoveredDay ? (
              <span className="font-medium text-slate-900 dark:text-slate-200">
                {hoveredDay.dateStr}:{' '}
                <span className={hoveredDay.count > 0 ? 'text-emerald-500 font-bold' : ''}>
                  {hoveredDay.count > 0 ? `${hoveredDay.count} ta jo'natma` : "Jo'natma yo'q"}
                </span>
              </span>
            ) : (
              <span>
                Jami: <strong className="text-slate-900 dark:text-slate-200">{totalYearSubmissions}</strong> ta jo'natma
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 select-none ml-auto">
            <span>Kamroq</span>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-[#1c2333] border border-slate-300 dark:border-slate-700/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#0e4429]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#006d32]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#26a641]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#39d353]" />
            <span>Ko'proq</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          4. MILLIY SERTIFIKATLAR (W-FULL)
      ───────────────────────────────────────────────────────────────── */}
      <div className="w-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Milliy Sertifikatlarim</h2>
            <p className="text-xs text-[var(--text-secondary)]">Rasmiy topshirilgan imtihonlar va natijalar</p>
          </div>
          <Link
            to="/certificates"
            className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center gap-1"
          >
            <span>Barchasi ({certList.length})</span>
            <CaretRight size={13} weight="bold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {certList.slice(0, 3).map(cert => {
            const pct = Math.round((cert.score / cert.maxScore) * 100);
            const gradeColor = pct >= 90 ? '#10B981' : pct >= 75 ? '#2563EB' : '#F59E0B';

            return (
              <div
                key={cert.id}
                onClick={() => navigate('/certificates')}
                className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:border-blue-500/40 cursor-pointer transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-[var(--text-tertiary)]">{cert.series}</span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: `${gradeColor}18`, color: gradeColor }}
                    >
                      {cert.grade}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)] mt-1.5 line-clamp-1">
                    {cert.title}
                  </h4>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--text-secondary)]">Ball</span>
                    <span className="font-extrabold tabular-nums" style={{ color: gradeColor }}>
                      {cert.score} / {cert.maxScore}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: gradeColor }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-[var(--text-tertiary)] pt-0.5">
                    <span>{cert.date}</span>
                    <span>#{cert.rank}-o'rin</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          5. OXIRGI MASHG'ULOTLAR (W-FULL)
      ───────────────────────────────────────────────────────────────── */}
      <div className="w-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Oxirgi Mashg'ulotlar</h2>
            <p className="text-xs text-[var(--text-secondary)]">So'nggi testlar, viktorinalar va natijalar</p>
          </div>
          <Link
            to="/activity"
            className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center gap-1"
          >
            <span>Barchasi</span>
            <CaretRight size={13} weight="bold" />
          </Link>
        </div>

        <div className="space-y-2">
          {recentActivities.slice(0, 5).map(activity => {
            const Icon = activityIcons[activity.type] || BookOpen;
            const color = activityColors[activity.type] || '#2563EB';
            const pct = Math.round((activity.score / activity.total) * 100);

            return (
              <div
                key={activity.id}
                onClick={() => setSelectedActivity(activity)}
                className="flex items-center gap-3.5 p-3 rounded-2xl border border-[var(--border)] bg-[var(--background)] hover:border-blue-500/30 cursor-pointer transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={19} style={{ color }} weight="duotone" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-[var(--text-primary)] truncate">
                      {activity.title}
                    </h4>
                    <span className="text-[10px] text-[var(--text-tertiary)] font-mono shrink-0">
                      {new Date(activity.date).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-[var(--text-secondary)]">
                    <span className="font-semibold tabular-nums text-[var(--text-primary)]">
                      {activity.score}/{activity.total} ({pct}%)
                    </span>
                    <span>•</span>
                    <span className="text-[var(--primary)] font-bold tabular-nums">+{activity.xpGained} XP</span>
                    {activity.rankChange > 0 && (
                      <span className="text-emerald-500 font-semibold tabular-nums flex items-center">
                        <ArrowUp size={11} weight="bold" /> {activity.rankChange}
                      </span>
                    )}
                    {activity.rankChange < 0 && (
                      <span className="text-rose-500 font-semibold tabular-nums flex items-center">
                        <ArrowDown size={11} weight="bold" /> {Math.abs(activity.rankChange)}
                      </span>
                    )}
                  </div>
                </div>

                <CaretRight size={15} className="text-[var(--text-tertiary)] shrink-0" />
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          6. SOZLAMALAR VA TIZIM MENYUSI (W-FULL MINIMALIST)
      ───────────────────────────────────────────────────────────────── */}
      <div className="w-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm divide-y divide-[var(--border)]">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              if (item.action) item.action();
              else if (item.href) window.open(item.href, '_blank', 'noopener,noreferrer');
              else if (item.to) navigate(item.to);
            }}
            className={cn(
              'flex items-center gap-3.5 px-5 py-3.5 cursor-pointer transition-colors hover:bg-[var(--background)]',
              item.isDanger && 'hover:bg-red-500/10 text-red-500'
            )}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: item.isDanger ? 'rgba(239, 68, 68, 0.12)' : `${item.color}15` }}
            >
              <item.icon size={19} style={{ color: item.color }} weight={item.isDanger ? 'bold' : 'duotone'} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm font-semibold truncate', item.isDanger ? 'text-red-500' : 'text-[var(--text-primary)]')}>
                {item.label}
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] truncate">{item.sub}</p>
            </div>
            <CaretRight size={15} className={item.isDanger ? 'text-red-400' : 'text-[var(--text-tertiary)]'} />
          </div>
        ))}
      </div>

      {/* Activity Details Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <ActivityModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />
        )}
      </AnimatePresence>

      {/* Student ID Card Modal */}
      <AnimatePresence>
        {showIdCard && (
          <StudentIdModal user={user} onClose={() => setShowIdCard(false)} />
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogout && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowLogout(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="bg-[var(--surface)] rounded-3xl p-6 w-full max-w-sm space-y-5 border border-[var(--border)] shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-500/15 flex items-center justify-center text-red-500">
                  <SignOut size={28} weight="duotone" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">Tizimdan chiqish</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                    Haqiqatan ham hisobingizdan chiqishni xohlaysizmi? Keyinroq yana qayta kirishingiz mumkin.
                  </p>
                </div>
              </div>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setShowLogout(false)}
                  className="flex-1 h-11 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--background)] transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-semibold text-white transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20"
                >
                  <SignOut size={16} weight="bold" />
                  <span>Chiqish</span>
                </button>
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>

      <footer className="text-center text-xs text-[var(--text-tertiary)] pt-2 pb-2">
        GeoBek.uz — Milliy Geografiya Ta'lim Platformasi • v1.2
      </footer>
    </div>
  );
}
