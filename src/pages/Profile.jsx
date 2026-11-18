import { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Logo, { LOGO_PATH_DATA } from '../components/Logo';
import {
  Gear, SignOut, BookOpen, Trophy,
  Lightning, CaretRight, X, ArrowRight,
  Shield, Question, Compass, GraduationCap,
  Student, ChalkboardTeacher, ShareNetwork,
  Copy, Check, Fire, Target, Timer,
  IdentificationCard, Sparkle, ArrowUp, ArrowDown,
  CaretDown, DownloadSimple,
  SealCheck, QrCode, CircleNotch, Globe
} from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { user as initialUser, recentActivities } from '../data/mockData';
import { User } from 'lucide-react';

const SETTINGS_KEY = 'geo_user_settings';
function loadUserSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
  } catch {
    return {};
  }
}

const ROLE_META = {
  school_student: { label: "Maktab o'quvchisi", Icon: GraduationCap, color: '#1E5BF8' },
  applicant:      { label: "Abituriyent",        Icon: Target,        color: '#D97706' },
  student:        { label: 'Talaba',             Icon: Student,       color: '#7C3AED' },
  teacher:        { label: "O'qituvchi",        Icon: ChalkboardTeacher, color: '#059669' },
};

function getProfileStatus(u) {
  if (!u) return { isComplete: false, missingFields: [], percent: 50 };
  const missing = [];
  let score = 2; // name and phone/username
  const total = 4;

  if (u.role === 'school_student') {
    if (!u.grade) missing.push('Sinfingiz');
    else score++;
    if (!u.school) missing.push('Maktabingiz');
    else score++;
  } else if (u.role === 'applicant') {
    if (!u.applicantType) missing.push('Abituriyentlik maqsadi');
    else score++;
    if (!u.targetUniversity && !u.school) missing.push('Maqsad qilingan OTM/soha');
    else score++;
  } else if (u.role === 'student') {
    if (!u.course) missing.push('Kurs');
    else score++;
    if (!u.school && !u.faculty) missing.push('OTM nomi');
    else score++;
  } else if (u.role === 'teacher') {
    if (!u.teachingCategory && !u.experience) missing.push('Pedagogik toifa');
    else score++;
    if (!u.school) missing.push("Ta'lim muassasasi");
    else score++;
  }

  return {
    isComplete: missing.length === 0,
    missingFields: missing,
    percent: Math.min(100, Math.round((score / total) * 100)),
  };
}

function getLevelTitle(level) {
  if (level >= 30) return 'Geo Professor';
  if (level >= 25) return 'Bosh Ekspert';
  if (level >= 20) return 'Geo Tadqiqotchi';
  if (level >= 15) return 'Topograf Mutaxassis';
  if (level >= 10) return 'Tajribali Sayohatkor';
  if (level >= 5)  return "Izlanuvchan O'quvchi";
  return "Boshlang'ich Sayyoh";
}

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
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
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

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawQrCode(ctx, x, y, size, text) {
  drawRoundedRect(ctx, x, y, size, size, 10);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  const pad = 9;
  const qrSize = size - pad * 2;
  const modules = 21;
  const cellSize = qrSize / modules;

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  ctx.fillStyle = '#0F172A';
  const isFinder = (r, c) => {
    if (r < 7 && c < 7) return true;
    if (r < 7 && c >= modules - 7) return true;
    if (r >= modules - 7 && c < 7) return true;
    return false;
  };

  const drawFinder = (startR, startC) => {
    ctx.fillRect(x + pad + startC * cellSize, y + pad + startR * cellSize, 7 * cellSize, 7 * cellSize);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x + pad + (startC + 1) * cellSize, y + pad + (startR + 1) * cellSize, 5 * cellSize, 5 * cellSize);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + pad + (startC + 2) * cellSize, y + pad + (startR + 2) * cellSize, 3 * cellSize, 3 * cellSize);
  };

  drawFinder(0, 0);
  drawFinder(0, modules - 7);
  drawFinder(modules - 7, 0);

  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      if (isFinder(r, c)) continue;
      if (r === 6 || c === 6) {
        if ((r + c) % 2 === 0) {
          ctx.fillRect(x + pad + c * cellSize, y + pad + r * cellSize, cellSize, cellSize);
        }
        continue;
      }
      const val = Math.sin(hash * (r * modules + c + 1) * 9999);
      if (val > 0.12) {
        ctx.fillRect(x + pad + c * cellSize, y + pad + r * cellSize, cellSize, cellSize);
      }
    }
  }
}

async function renderCardCanvas(user, roleMeta, levelTitle) {
  const W = 1200;
  const H = 750;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const cleanUsername = (user.username || 'yodgorov').replace(/^@/, '');

  // 1. Clip outer rounded rectangle
  drawRoundedRect(ctx, 0, 0, W, H, 36);
  ctx.clip();

  // 2. Background gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#070C18');
  bg.addColorStop(0.5, '#0E172B');
  bg.addColorStop(1, '#060A14');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // 3. Topographic elevation contours
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 70 + i * 85);
    ctx.bezierCurveTo(W * 0.3, 40 + i * 90, W * 0.65, 120 + i * 80, W, 70 + i * 85);
    ctx.stroke();
  }
  ctx.restore();

  // 4. Ambient radial glows
  const glowRole = ctx.createRadialGradient(W - 140, 140, 20, W - 140, 140, 480);
  glowRole.addColorStop(0, `${roleMeta.color}3A`);
  glowRole.addColorStop(1, 'transparent');
  ctx.fillStyle = glowRole;
  ctx.fillRect(0, 0, W, H);

  const glowBlue = ctx.createRadialGradient(160, H - 140, 20, 160, H - 140, 420);
  glowBlue.addColorStop(0, 'rgba(30, 91, 248, 0.22)');
  glowBlue.addColorStop(1, 'transparent');
  ctx.fillStyle = glowBlue;
  ctx.fillRect(0, 0, W, H);

  // 5. Outer border
  drawRoundedRect(ctx, 16, 16, W - 32, H - 32, 28);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 6. Header
  // Logo badge
  drawRoundedRect(ctx, 60, 52, 60, 60, 16);
  const logoGrad = ctx.createLinearGradient(60, 52, 120, 112);
  logoGrad.addColorStop(0, '#1E5BF8');
  logoGrad.addColorStop(1, '#2563EB');
  ctx.fillStyle = logoGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Draw Logo icon inside badge
  try {
    const logoPath = new Path2D(LOGO_PATH_DATA);
    ctx.save();
    const logoSize = 38;
    const scale = logoSize / 1095;
    ctx.translate(60 + (60 - logoSize) / 2, 52 + (60 - logoSize) / 2);
    ctx.scale(scale, scale);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill(logoPath, 'evenodd');
    ctx.restore();
  } catch {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 26px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GB', 90, 82);
  }

  // Platform title
  ctx.textAlign = 'left';
  ctx.font = '900 28px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('GEOBEK', 134, 72);

  ctx.font = '700 11px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.fillText("RESPUBLIKA RAQAMLI TA'LIM PLATFORMASI", 135, 96);

  // Smart chip / Digital ID badge
  const chipW = 165;
  const chipH = 46;
  const chipX = W - 60 - chipW;
  const chipY = 58;
  drawRoundedRect(ctx, chipX, chipY, chipW, chipH, 12);
  ctx.fillStyle = 'rgba(251, 191, 36, 0.1)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#FBBF24';
  ctx.font = '800 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('ELEKTRON GUVAHNOMA', chipX + chipW / 2, chipY + chipH / 2);

  // 7. Avatar
  const avX = 130;
  const avY = 245;
  const avR = 64;

  let loadedAvatar = null;
  if (user.avatar) {
    try {
      loadedAvatar = await new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = user.avatar;
        setTimeout(() => resolve(null), 1200);
      });
    } catch {
      loadedAvatar = null;
    }
  }

  // Avatar border ring
  ctx.beginPath();
  ctx.arc(avX, avY, avR + 4, 0, Math.PI * 2);
  ctx.strokeStyle = roleMeta.color;
  ctx.lineWidth = 3;
  ctx.stroke();

  if (loadedAvatar) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(avX, avY, avR, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(loadedAvatar, avX - avR, avY - avR, avR * 2, avR * 2);
    ctx.restore();
  } else {
    // Monogram fallback
    ctx.save();
    ctx.beginPath();
    ctx.arc(avX, avY, avR, 0, Math.PI * 2);
    const avGrad = ctx.createLinearGradient(avX - avR, avY - avR, avX + avR, avY + avR);
    avGrad.addColorStop(0, '#1E293B');
    avGrad.addColorStop(1, '#0F172A');
    ctx.fillStyle = avGrad;
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 46px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((user.name?.charAt(0) || 'U').toUpperCase(), avX, avY);
    ctx.restore();
  }

  // Active verified status dot
  ctx.beginPath();
  ctx.arc(avX + 44, avY + 44, 11, 0, Math.PI * 2);
  ctx.fillStyle = '#10B981';
  ctx.fill();
  ctx.strokeStyle = '#070C18';
  ctx.lineWidth = 3;
  ctx.stroke();

  // 8. User Identity
  const textX = 224;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  // Full Name
  ctx.font = '900 36px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(user.name || 'Foydalanuvchi', textX, 226);

  // Username
  ctx.font = '700 22px monospace';
  ctx.fillStyle = roleMeta.color;
  ctx.fillText(`@${cleanUsername}`, textX, 260);

  // Role Pill
  const pillW = ctx.measureText(roleMeta.label).width + 36;
  const pillH = 34;
  const pillY = 278;
  drawRoundedRect(ctx, textX, pillY, pillW, pillH, 10);
  ctx.fillStyle = roleMeta.color;
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 13px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(roleMeta.label, textX + pillW / 2, pillY + pillH / 2);

  // 9. Details Grid (4 boxes)
  const drawCell = (x, y, w, h, label, val, valColor = '#FFFFFF') => {
    drawRoundedRect(ctx, x, y, w, h, 14);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.font = '700 11px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fillText(label.toUpperCase(), x + 18, y + 26);

    ctx.font = '700 18px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = valColor;
    // truncate if text is too wide
    let displayVal = val || "Ko'rsatilmagan";
    while (ctx.measureText(displayVal).width > w - 36 && displayVal.length > 5) {
      displayVal = displayVal.slice(0, -4) + '...';
    }
    ctx.fillText(displayVal, x + 18, y + 54);
  };

  const cellW = 525;
  const cellH = 72;
  const row1Y = 340;
  const row2Y = 430;

  // Institution / Target
  const instLabel = user.role === 'teacher' ? 'Muassasa' : user.role === 'student' ? 'Universitet' : user.role === 'applicant' ? 'Maqsad OTM' : 'Maktab';
  const instVal = user.targetUniversity || user.school || user.region || 'GEOBEK Platformasi';
  drawCell(60, row1Y, cellW, cellH, instLabel, instVal);

  // Grade / Level details
  const gradeLabel = user.role === 'school_student' ? 'Sinf' : user.role === 'student' ? 'Kurs' : user.role === 'applicant' ? 'Abituriyent' : 'Pedagogik toifa';
  const gradeVal = user.role === 'school_student'
    ? (user.grade ? `${user.grade}-sinf oʻquvchisi` : 'Belgilanmagan')
    : user.role === 'student'
    ? (user.course ? (user.course === 'magistr' ? 'Magistratura' : `${user.course}-kurs`) : 'Belgilanmagan') + (user.faculty ? ` • ${user.faculty}` : '')
    : user.role === 'applicant'
    ? (user.applicantType || 'OTM Abituriyenti')
    : (user.teachingCategory || user.experience || "O'qituvchi");
  drawCell(615, row1Y, cellW, cellH, gradeLabel, gradeVal);

  // Game Level
  drawCell(60, row2Y, cellW, cellH, "O'yin darajasi", `${levelTitle} (${user.level || 1}-daraja)`, '#38BDF8');

  // National rank & XP
  drawCell(615, row2Y, cellW, cellH, 'Reyting va ball', `#${user.rank || 42}-o'rin • ${(user.xp || 12580).toLocaleString()} XP`, '#34D399');

  // 10. Footer separator
  ctx.beginPath();
  ctx.moveTo(60, 535);
  ctx.lineTo(W - 60, 535);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // 11. Footer: QR Code & Verification
  const qrSize = 92;
  const qrX = 60;
  const qrY = 560;
  drawQrCode(ctx, qrX, qrY, qrSize, `geobek.uz/@${cleanUsername}`);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.font = '700 11px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.fillText('PROFILNI TEKSHIRISH:', qrX + qrSize + 18, qrY + 38);

  ctx.font = '800 20px monospace';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`geobek.uz/@${cleanUsername}`, qrX + qrSize + 18, qrY + 68);

  // Verified Seal
  const sealX = W - 380;
  const sealY = qrY + 12;
  drawRoundedRect(ctx, sealX, sealY, 320, 72, 14);
  ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(sealX + 36, sealY + 36, 16, 0, Math.PI * 2);
  ctx.fillStyle = '#10B981';
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 16px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✓', sealX + 36, sealY + 37);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.font = '800 14px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#10B981';
  ctx.fillText('TASDIQLANGAN PROFIL', sealX + 64, sealY + 32);

  ctx.font = '600 11px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('GEOBEK Raqamli Taʼlim Tizimi', sealX + 64, sealY + 52);

  return canvas;
}

function StudentIdModal({ user, onClose, showToast = () => {} }) {
  const roleMeta = ROLE_META[user.role] || ROLE_META.school_student;
  const RoleIcon = roleMeta.Icon;
  const levelTitle = getLevelTitle(user.level || 1);
  const cleanUsername = (user.username || 'yodgorov').replace(/^@/, '');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const canvas = await renderCardCanvas(user, roleMeta, levelTitle);
      if (!canvas) throw new Error('Canvas render failed');

      canvas.toBlob((blob) => {
        if (!blob) {
          showToast("Rasmni saqlashda xatolik yuz berdi");
          setIsDownloading(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `geobek-id-${cleanUsername}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast("ID karta rasm sifatida muvaffaqiyatli yuklab olindi!");
        setIsDownloading(false);
      }, 'image/png');
    } catch (err) {
      console.error(err);
      showToast("Rasmni yuklab olishda xatolik yuz berdi");
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}/profile?u=${cleanUsername}`;
    const shareText = `GEOBEK platformasidagi rasmiy taʼlim ID kartam: @${cleanUsername} • ${user.name}`;

    if (navigator.share) {
      try {
        const canvas = await renderCardCanvas(user, roleMeta, levelTitle);
        if (canvas) {
          const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
          if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], `geobek-id-${cleanUsername}.png`, { type: 'image/png' })] })) {
            const file = new File([blob], `geobek-id-${cleanUsername}.png`, { type: 'image/png' });
            await navigator.share({
              title: `GEOBEK ID: ${user.name}`,
              text: shareText,
              files: [file],
            });
            showToast("ID karta ulashildi!");
            return;
          }
        }
        await navigator.share({
          title: `GEOBEK ID: ${user.name}`,
          text: shareText,
          url: profileUrl,
        });
        showToast("Profil ulashildi!");
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Share error:', err);
        }
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${profileUrl}`);
      showToast(`Profil havolasi va @${cleanUsername} nusxalandi!`);
    } catch {
      showToast("Nusxalash imkoni boʻlmadi");
    }
  };

  const handleCopyUsername = () => {
    navigator.clipboard?.writeText(`@${cleanUsername}`);
    showToast(`Foydalanuvchi nomi nusxalandi: @${cleanUsername}`);
  };

  return createPortal(
    <motion.div
      key="student-id-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 10 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-lg bg-[var(--surface)] rounded-3xl p-5 sm:p-6 border border-[var(--border)] shadow-2xl space-y-4 my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-blue-600 flex items-center justify-center shadow-xs">
              <Logo className="w-full h-full" pathClassName="fill-white" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[var(--text-primary)] tracking-tight">GEOBEK Rasmiy ID Kartasi</h3>
              <p className="text-[11px] text-[var(--text-tertiary)]">Raqamli taʼlim guvohnomasi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--background)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border)]"
          >
            <X size={15} weight="bold" />
          </button>
        </div>

        {/* Visual ID Card Preview */}
        <div className="relative rounded-2xl sm:rounded-3xl p-5 overflow-hidden border border-white/10 bg-gradient-to-br from-[#070C18] via-[#0E172B] to-[#060A14] text-white shadow-xl space-y-4">
          {/* Ambient Glows */}
          <div
            className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: roleMeta.color }}
          />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

          {/* Topographic Lines Background Simulation */}
          <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="card-topo" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M0 20 Q 30 10, 60 20 T 120 20 M0 60 Q 30 40, 60 60 T 120 60 M0 100 Q 30 80, 60 100 T 120 100" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#card-topo)" />
          </svg>

          {/* Card Header */}
          <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-blue-600 flex items-center justify-center shadow-xs">
              <Logo className="w-full h-full" pathClassName="fill-white" />
              </div>
              <div>
                <p className="text-xs font-black tracking-widest text-white leading-none">GEOBEK</p>
                <p className="text-[9px] font-semibold text-white/50 tracking-wider mt-0.5">RESPUBLIKA RAQAMLI TA'LIM</p>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-lg border border-amber-400/40 bg-amber-400/10 text-amber-300 text-[10px] font-mono font-bold tracking-wider">
              ELEKTRON ID
            </div>
          </div>

          {/* Card Profile Section */}
          <div className="relative z-10 flex items-center gap-3.5">
            <div className="relative shrink-0">
              <div
                className="w-16 h-16 rounded-2xl border-2 p-0.5 overflow-hidden flex items-center justify-center bg-slate-900 shadow-md"
                style={{ borderColor: roleMeta.color }}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <span className="text-xl font-black text-white">
                    {(user.name?.charAt(0) || 'U').toUpperCase()}
                  </span>
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#070C18]" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="font-black text-base sm:text-lg leading-tight tracking-tight text-white truncate">
                {user.name}
              </h4>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-xs font-mono font-bold" style={{ color: roleMeta.color }}>
                  @{cleanUsername}
                </span>
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-[10px] font-bold shadow-xs"
                  style={{ background: roleMeta.color }}
                >
                  <RoleIcon size={11} weight="bold" />
                  <span>{roleMeta.label}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Details 4-Grid */}
          <div className="relative z-10 grid grid-cols-2 gap-2 pt-1 text-xs">
            <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04]">
              <p className="text-[10px] text-white/50 uppercase font-bold tracking-wide">
                {user.role === 'teacher' ? 'Muassasa' : user.role === 'student' ? 'Universitet' : user.role === 'applicant' ? 'Maqsad OTM' : 'Maktab'}
              </p>
              <p className="font-bold text-white truncate mt-0.5 text-[12px]">
                {user.targetUniversity || user.school || user.region || 'GEOBEK Platformasi'}
              </p>
            </div>

            <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04]">
              <p className="text-[10px] text-white/50 uppercase font-bold tracking-wide">
                {user.role === 'school_student' ? 'Sinf' : user.role === 'student' ? 'Kurs' : user.role === 'applicant' ? 'Abituriyent' : 'Toifa'}
              </p>
              <p className="font-bold text-white truncate mt-0.5 text-[12px]">
                {user.role === 'school_student'
                  ? (user.grade ? `${user.grade}-sinf oʻquvchisi` : 'Belgilanmagan')
                  : user.role === 'student'
                  ? (user.course ? (user.course === 'magistr' ? 'Magistratura' : `${user.course}-kurs`) : 'Belgilanmagan') + (user.faculty ? ` • ${user.faculty}` : '')
                  : user.role === 'applicant'
                  ? (user.applicantType || 'OTM Abituriyenti')
                  : (user.teachingCategory || user.experience || "O'qituvchi")}
              </p>
            </div>

            <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04]">
              <p className="text-[10px] text-white/50 uppercase font-bold tracking-wide">O'yin Darajasi</p>
              <p className="font-bold text-sky-400 mt-0.5 text-[12px] truncate">{levelTitle} ({user.level || 1})</p>
            </div>

            <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04]">
              <p className="text-[10px] text-white/50 uppercase font-bold tracking-wide">Reyting va Ball</p>
              <p className="font-bold text-emerald-400 mt-0.5 text-[12px] truncate">#{user.rank || 42}-o'rin • {(user.xp || 12580).toLocaleString()} XP</p>
            </div>
          </div>

          {/* Card Footer */}
          <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center text-slate-900 shrink-0">
                <QrCode size={22} weight="bold" />
              </div>
              <div className="leading-tight">
                <p className="text-[9px] text-white/50 uppercase font-bold">Profil manzili</p>
                <p className="font-mono text-white/90 text-[11px]">geobek.uz/@{cleanUsername}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
              <SealCheck size={14} weight="fill" />
              <span>Tasdiqlangan</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="h-11 rounded-xl bg-gradient-to-r from-[var(--primary)] to-blue-600 hover:from-[var(--primary-hover)] hover:to-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer"
            >
              {isDownloading ? (
                <>
                  <CircleNotch size={16} className="animate-spin" />
                  <span>Rasm tayyorlanmoqda...</span>
                </>
              ) : (
                <>
                  <DownloadSimple size={16} weight="bold" />
                  <span>Rasm yuklab olish (PNG)</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="h-11 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--border)] text-[var(--text-primary)] font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <ShareNetwork size={16} weight="bold" className="text-[var(--primary)]" />
              <span>Ulashish</span>
            </button>
          </div>

          <button
            onClick={handleCopyUsername}
            className="w-full h-9 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--background)] text-[var(--text-secondary)] font-mono text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Copy size={13} className="text-[var(--primary)]" />
            <span>Foydalanuvchi nomini nusxalash: <strong>@{cleanUsername}</strong></span>
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function CompleteProfileModal({ user, onClose, onSave }) {
  const [role, setRole] = useState(user.role || 'school_student');
  const [grade, setGrade] = useState(user.grade || 9);
  const [school, setSchool] = useState(user.school || '');
  const [applicantType, setApplicantType] = useState(user.applicantType || 'OTMga kirish');
  const [targetUniversity, setTargetUniversity] = useState(user.targetUniversity || '');
  const [course, setCourse] = useState(user.course || 1);
  const [faculty, setFaculty] = useState(user.faculty || '');
  const [teachingCategory, setTeachingCategory] = useState(user.teachingCategory || 'Oliy toifa');
  const [experience, setExperience] = useState(user.experience || '1-3');
  const [region, setRegion] = useState(user.region || 'Toshkent shahri');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      role,
      grade: role === 'school_student' ? (Number(grade) || grade) : null,
      school: school.trim(),
      applicantType: role === 'applicant' ? applicantType : null,
      targetUniversity: role === 'applicant' ? targetUniversity.trim() : null,
      course: role === 'student' ? (course === 'magistr' ? 'magistr' : (Number(course) || course)) : null,
      faculty: role === 'student' ? faculty.trim() : null,
      teachingCategory: role === 'teacher' ? teachingCategory : null,
      experience: role === 'teacher' ? experience : null,
      region,
    });
  };

  const roleMeta = ROLE_META[role] || ROLE_META.school_student;
  const RoleIcon = roleMeta.Icon;

  return createPortal(
    <motion.div
      key="complete-profile-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-lg bg-[var(--surface)] rounded-3xl p-5 sm:p-6 border border-[var(--border)] shadow-2xl space-y-5 my-6 max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
              <Sparkle size={20} weight="fill" />
            </div>
            <div>
              <h3 className="text-base font-black text-[var(--text-primary)] tracking-tight">
                Profilingizni to'ldiring
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Taʼlim darajangizga mos maʼlumotlarni kiriting
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--background)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X size={15} weight="bold" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Daraja Tanlash (4 Cards) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-primary)]">
              Ta'lim darajangiz:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(ROLE_META).map(([key, meta]) => {
                const IconComp = meta.Icon;
                const isSelected = role === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRole(key)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all text-center',
                      isSelected
                        ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--text-primary)] shadow-xs'
                        : 'border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)] hover:border-[var(--primary)]/40'
                    )}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: isSelected ? meta.color : 'var(--surface)' }}
                    >
                      <IconComp
                        size={18}
                        weight="bold"
                        className={isSelected ? 'text-white' : 'text-[var(--text-tertiary)]'}
                      />
                    </div>
                    <span className="text-[11px] font-bold leading-tight">
                      {meta.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dinamik bo'limlar */}
          <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--border)] space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary)]">
              <RoleIcon size={16} weight="bold" />
              <span>{roleMeta.label} ma'lumotlari</span>
            </div>

            {/* 1. Maktab o'quvchisi */}
            {role === 'school_student' && (
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">
                    Qaysi sinfda o'qiysiz?
                  </label>
                  <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                    {[5, 6, 7, 8, 9, 10, 11].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGrade(g)}
                        className={cn(
                          'py-2 rounded-xl text-xs font-bold border transition-all text-center',
                          Number(grade) === g
                            ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-xs'
                            : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/50'
                        )}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-tertiary)] px-1">
                    <span>5-sinf</span>
                    <span className="text-[var(--primary)] font-semibold">{grade ? `${grade}-sinf tanlandi` : 'Sinfni tanlang'}</span>
                    <span>11-sinf</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">
                    Maktabingiz nomi yoki raqami:
                  </label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="Masalan: 37-IDUM yoki 14-umumiy o'rta ta'lim maktabi"
                    className="w-full h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
              </div>
            )}

            {/* 2. Abituriyent */}
            {role === 'applicant' && (
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">
                    Qanday abituriyentsiz? (Asosiy maqsadingiz):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      'OTMga kirish',
                      'Milliy sertifikat',
                      'Akademik litsey / Prezident maktabi',
                      'Xalqaro imtihonlar / Boshqa',
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setApplicantType(type)}
                        className={cn(
                          'p-2.5 rounded-xl text-xs font-semibold border text-left transition-all flex items-center justify-between',
                          applicantType === type
                            ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-xs'
                            : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/40'
                        )}
                      >
                        <span>{type}</span>
                        {applicantType === type && <Check size={14} weight="bold" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">
                    Maqsad qilingan OTM yoki yoʻnalish:
                  </label>
                  <input
                    type="text"
                    value={targetUniversity}
                    onChange={(e) => setTargetUniversity(e.target.value)}
                    placeholder="Masalan: O'zMU (Geografiya fakulteti) yoki Nizomiy TDPU"
                    className="w-full h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">
                    Tayyorgarlik joyi / Oʻquv markazi:
                  </label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="Masalan: Mustaqil yoki Registon o'quv markazi"
                    className="w-full h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
              </div>
            )}

            {/* 3. Talaba */}
            {role === 'student' && (
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">
                    Nechanchi kursda o'qiysiz?
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[
                      { val: 1, label: '1-kurs' },
                      { val: 2, label: '2-kurs' },
                      { val: 3, label: '3-kurs' },
                      { val: 4, label: '4-kurs' },
                      { val: 'magistr', label: 'Magistr' },
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setCourse(item.val)}
                        className={cn(
                          'py-2 rounded-xl text-xs font-bold border transition-all text-center',
                          course === item.val
                            ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-xs'
                            : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/50'
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">
                    OTM (Universitet / Institut) nomi:
                  </label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="Masalan: O'zbekiston Milliy Universiteti"
                    className="w-full h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">
                    Fakultet / Yoʻnalish:
                  </label>
                  <input
                    type="text"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    placeholder="Masalan: Geografiya va geoaxborot tizimlari"
                    className="w-full h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
              </div>
            )}

            {/* 4. O'qituvchi */}
            {role === 'teacher' && (
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">
                    Pedagogik toifangiz:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {['Oliy toifa', '1-toifa', '2-toifa', 'Mutaxassis', 'Boshlangʻich'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setTeachingCategory(cat)}
                        className={cn(
                          'py-1.5 px-2 rounded-xl text-xs font-semibold border transition-all text-center truncate',
                          teachingCategory === cat
                            ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-xs'
                            : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/50'
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">
                    Ta'lim muassasasi nomi:
                  </label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="Masalan: 37-IDUM yoki Toshkent litseyi"
                    className="w-full h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">
                    Pedagogik ish staji:
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                  >
                    <option value="0-1">1 yildan kam</option>
                    <option value="1-3">1–3 yil</option>
                    <option value="3-5">3–5 yil</option>
                    <option value="5-10">5–10 yil</option>
                    <option value="10+">10 yildan ortiq</option>
                  </select>
                </div>
              </div>
            )}

            {/* Viloyat */}
            <div className="space-y-1 pt-1 border-t border-[var(--border)]">
              <label className="text-xs font-semibold text-[var(--text-primary)]">
                Hudud (Viloyat / Shahar):
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
              >
                {[
                  'Toshkent shahri', 'Toshkent viloyati', 'Andijon viloyati', 'Fargʻona viloyati',
                  'Namangan viloyati', 'Samarqand viloyati', 'Buxoro viloyati', 'Navoiy viloyati',
                  'Qashqadaryo viloyati', 'Surxondaryo viloyati', 'Jizzax viloyati', 'Sirdaryo viloyati',
                  'Xorazm viloyati', 'Qoraqalpogʻiston Respublikasi'
                ].map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--border)] text-xs font-bold text-[var(--text-secondary)] transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Check size={16} weight="bold" />
              <span>Saqlash</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser, updateProfile, signOut, loginAsDemo } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(() => {
    try {
      return typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('complete') === '1';
    } catch {
      return false;
    }
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState('2026');
  const [userSettings, setUserSettings] = useState(loadUserSettings);

  // Check query params if ?complete=1
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('complete') === '1') {
      const timer = setTimeout(() => setShowCompleteModal(true), 0);
      return () => clearTimeout(timer);
    }
  }, [location.search]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSaveCompleteProfile = (updates) => {
    if (updateProfile) {
      updateProfile(updates);
    }
    try {
      const current = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
      const nextSettings = { ...current, ...updates };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(nextSettings));
      setUserSettings(nextSettings);
    } catch (e) {
      console.warn('Error saving settings:', e);
    }
    setShowCompleteModal(false);
    showToast("Profilingiz muvaffaqiyatli to'ldirildi!");
    if (location.search.includes('complete=1')) {
      navigate('/profile', { replace: true });
    }
  };

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
        <SEO title="Kirish — GEOBEK" description="Shaxsiy profilingizga kiring" url="/profile" />

        <div className="w-20 h-20 mx-auto rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-xl flex items-center justify-center p-3">
          <Logo className="w-full h-full" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">GEOBEK Profiliga xush kelibsiz</h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
            Test natijalaringiz, yutuqlaringiz, sertifikatlar va respublika reytingingizni kuzatib borish uchun hisobingizga kiring.
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
  const profileStatus = getProfileStatus(user);

  // Yangi hisob yoki hali test topshirmagan foydalanuvchi tekshiruvi
  const isNewAccount = authUser?.isNewUser || (!authUser?.totalTests && (authUser?.xp === 0 || !authUser?.xp));
  const userRank = user.rank && user.rank > 0 && !isNewAccount ? user.rank : null;
  const userTotalTests = typeof user.totalTests === 'number' && !isNewAccount ? user.totalTests : 0;
  const userAverageScore = typeof user.averageScore === 'number' && userTotalTests > 0 ? user.averageScore : null;
  const userHours = user.achievements?.hoursSpent && userTotalTests > 0 ? user.achievements.hoursSpent : null;
  const userXp = isNewAccount ? (authUser?.xp || 0) : (user.xp || 12580);
  const userStreak = isNewAccount ? (authUser?.streak || 0) : (user.streak || 7);

  // XP calculation
  const currentLevelXp = userXp % 2500;
  const xpNeeded = 2500;
  const xpPercent = Math.min(100, Math.round((currentLevelXp / xpNeeded) * 100));

  // Certificates list
  const certList = (user.nationalCertificates && user.nationalCertificates.length > 0)
    ? user.nationalCertificates
    : isNewAccount ? [] : initialUser.nationalCertificates;

  // Navigation menu items
  const menuItems = [
    {
      icon: SealCheck,
      label: 'Sertifikatlar',
      sub: certList.length > 0 ? `${certList.length} ta sertifikat mavjud` : 'Hali sertifikat yoʻq',
      color: '#2563EB',
      to: '/certificates'
    },
    {
      icon: Trophy,
      label: 'Respublika reytingi',
      sub: userRank ? `#${userRank}-o'rinda turibsiz` : 'Hali reyting belgilanmagan',
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
      icon: Globe,
      label: 'Tilni oʻzgartirish',
      sub: `Tanlangan til: ${LANGUAGES.find(l => l.code === language)?.name || "O'zbekcha"}`,
      color: '#3B82F6',
      isLanguage: true,
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
      <SEO title="Mening Profilim — GEOBEK" description="O'quvchi profili va natijalari" url="/profile" noindex />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[10000] px-4 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xl flex items-center gap-2 border border-slate-700/50"
          >
            <Check size={14} className="text-emerald-400" weight="bold" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profilingizni to'ldiring Banner (Agar profil to'liq bo'lmasa) */}
      {!profileStatus.isComplete && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full rounded-2xl border border-amber-300/80 dark:border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 sm:p-5 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <User size={20} weight="fill" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] tracking-tight">
                    Profilingizni to'ldiring
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/25">
                    {profileStatus.percent}% to'ldirildi
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {
                    user.role === 'school_student'
                      ? "Qaysi sinfda o'qishingiz va maktabingizni belgilang."
                      : user.role === 'applicant'
                      ? "Qanday abituriyent ekanligingiz va maqsad OTMni belgilang."
                      : user.role === 'student'
                      ? "Nechanchi kursda o'qishingiz va universitetingizni belgilang."
                      : "Pedagogik toifa va dars beradigan muassasangizni belgilang."
                  }
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCompleteModal(true)}
              className="shrink-0 h-9 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Profilingizni to'ldiring</span>
            </button>
          </div>
        </motion.div>
      )}

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
                title={`${userStreak} kunlik faollik`}
                className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black border-2 border-[var(--surface)] flex items-center gap-0.5 shadow-sm"
              >
                <Fire size={11} weight="fill" />
                <span>{userStreak}d</span>
              </div>
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
                  {user.name}
                </h1>
                <button
                  onClick={() => {
                    const clean = (user.username || 'yodgorov').replace(/^@/, '');
                    navigator.clipboard?.writeText(`@${clean}`);
                    showToast(`Foydalanuvchi nomi nusxalandi: @${clean}`);
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--border)] text-xs font-mono font-bold text-[var(--primary)] hover:opacity-90 transition-all shadow-xs cursor-pointer"
                  title="Foydalanuvchi nomini nusxalash"
                >
                  <span>@{ (user.username || 'yodgorov').replace(/^@/, '') }</span>
                  <Copy size={12} className="text-[var(--text-tertiary)]" />
                </button>
              </div>

              <p className="text-xs text-[var(--text-secondary)] font-medium">
                {user.school || (user.targetUniversity ? `${user.targetUniversity} abituriyenti` : "Taʼlim muassasasi kiritilmagan")} | {user.region || "Toshkent shahri"}
              </p>

              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-md text-white flex items-center gap-1 shadow-xs"
                  style={{ background: roleMeta.color }}
                >
                  <RoleIcon size={12} weight="bold" />
                  <span>{roleMeta.label}</span>
                </span>

                {user.role === 'school_student' && (
                  user.grade ? (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300">
                      {user.grade}-sinf
                    </span>
                  ) : null
                )}

                {user.role === 'applicant' && (
                  user.applicantType ? (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300">
                      {user.applicantType}
                    </span>
                  ) : null
                )}

                {user.role === 'student' && (
                  user.course ? (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300">
                      {user.course === 'magistr' ? 'Magistratura' : `${user.course}-kurs`}
                    </span>
                  ) : null
                )}

                {user.role === 'teacher' && (
                  user.teachingCategory ? (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                      {user.teachingCategory}
                    </span>
                  ) : null
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
                      {user.level || 1}-daraja
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                    Keyingi darajagacha <span className="font-semibold text-[var(--text-primary)] tabular-nums">{xpNeeded - currentLevelXp} XP</span> qoldi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="text-sm font-black text-[var(--primary)] tabular-nums">
                  {userXp.toLocaleString()} XP
                </span>
                <span className="text-[11px] text-[var(--text-tertiary)] font-medium">
                  / {((Math.floor(userXp / 2500) + 1) * 2500).toLocaleString()} XP
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
                className="flex-1 min-w-[130px] h-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--border)] text-xs font-bold text-[var(--text-primary)] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <IdentificationCard size={16} weight="bold" className="text-[var(--primary)]" />
                <span>ID Kartasi</span>
              </button>
              
              <button
                onClick={() => navigate('/settings')}
                className={cn(
                  "h-10 px-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs",
                  profileStatus.isComplete && "flex-1 min-w-[130px]"
                )}
              >
                <Gear size={15} weight="bold" />
                <span>Sozlamalar</span>
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
            <p className={cn(
              "text-2xl font-black tracking-tight",
              userRank ? "text-[var(--text-primary)] tabular-nums" : "text-[var(--text-tertiary)] text-xl"
            )}>
              {userRank ? `#${userRank}` : "Hali yoʻq"}
            </p>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {userRank ? "Top o'quvchilar safida" : "Reytingga kirish uchun"}
            </p>
          </div>
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
            {userRank ? <span>↑3 pog'ona</span> : <span>Test topshiring</span>}
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
            <p className={cn(
              "text-2xl font-black tracking-tight",
              userAverageScore !== null ? "text-[var(--text-primary)] tabular-nums" : "text-[var(--text-tertiary)] text-xl"
            )}>
              {userAverageScore !== null ? `${userAverageScore}%` : "Hali yoʻq"}
            </p>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {userAverageScore !== null ? "Testlar natijasi" : "Aniqlik darajasi"}
            </p>
          </div>
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center gap-1 text-[10px] font-bold text-emerald-500">
            {userAverageScore !== null ? <span>A'lo daraja</span> : <span>0% xato</span>}
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
            {userTotalTests > 0 ? (
              <p className="text-2xl font-black text-[var(--text-primary)] tabular-nums tracking-tight">
                {userTotalTests} ta
              </p>
            ) : (
              <Link to="/tests" className="text-xl font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1">
                Boshlash <CaretRight size={16} weight="bold" />
              </Link>
            )}
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {userTotalTests > 0 ? `${user.totalQuizzes || 0} ta viktorina` : "Hali test topshirilmagan"}
            </p>
          </div>
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center gap-1 text-[10px] font-bold text-blue-500">
            {userTotalTests > 0 ? <span>+12 bu hafta</span> : <Link to="/tests" className="hover:underline">Testlar roʻyxati</Link>}
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
            <p className={cn(
              "text-2xl font-black tracking-tight",
              userHours !== null ? "text-[var(--text-primary)] tabular-nums" : "text-[var(--text-tertiary)] text-xl"
            )}>
              {userHours !== null ? `${userHours}h` : "Hali yoʻq"}
            </p>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
              {userHours !== null ? "Umumiy sarflangan" : "Darslarni boshlang"}
            </p>
          </div>
          <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center gap-1 text-[10px] font-bold text-purple-500">
            {userHours !== null ? <span>Faol o'rganuvchi</span> : <span>Platformada o'qish</span>}
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
          <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-max">
            {/* Chap tomondagi Hafta kunlari ustuni (Du, Se, Ch, Pa, Ju, Sh, Ya) */}
            <div className="flex flex-col gap-2 shrink-0 sticky left-0 z-10 bg-white dark:bg-[#0b111e] pr-1.5">
              <span className="text-[11px] font-medium text-transparent select-none">
                Kun
              </span>
              <div
                className="grid gap-[3px] select-none"
                style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}
              >
                {WEEKDAYS.map((day) => (
                  <div
                    key={day}
                    className="h-3.5 sm:h-4 flex items-center text-[10px] sm:text-[11px] font-semibold text-slate-400 dark:text-slate-500 pr-1 select-none leading-none"
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

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
          4. OXIRGI MASHG'ULOTLAR (W-FULL)
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
          5. SOZLAMALAR VA TIZIM MENYUSI (W-FULL MINIMALIST)
      ───────────────────────────────────────────────────────────────── */}
      <div className="w-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm divide-y divide-[var(--border)]">
        {menuItems.map((item, idx) => {
          if (item.isLanguage) {
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-[var(--background)]"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}15` }}
                  >
                    <item.icon size={19} style={{ color: item.color }} weight="duotone" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.label}
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)]">{item.sub}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--background)] border border-[var(--border)] self-start sm:self-auto">
                  {LANGUAGES.map((l) => {
                    const isSelected = language === l.code;
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLanguage(l.code);
                          setToastMessage(`Til oʻzgartirildi: ${l.name}`);
                          setTimeout(() => setToastMessage(''), 2000);
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                          isSelected
                            ? "bg-[var(--surface)] text-[var(--primary)] shadow-xs border border-[var(--border)] font-extrabold"
                            : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                        )}
                      >
                        <span className="text-sm">{l.flag}</span>
                        <span>{l.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          }

          return (
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
          );
        })}
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
          <StudentIdModal user={user} onClose={() => setShowIdCard(false)} showToast={showToast} />
        )}
      </AnimatePresence>

      {/* Complete Profile Modal */}
      <AnimatePresence>
        {showCompleteModal && (
          <CompleteProfileModal
            user={user}
            onClose={() => setShowCompleteModal(false)}
            onSave={handleSaveCompleteProfile}
          />
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
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
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
        GEOBEK.uz — Milliy Geografiya Ta'lim Platformasi • v1.2
      </footer>
    </div>
  );
}
