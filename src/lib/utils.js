import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const canHover = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(hover: hover) and (any-pointer: fine)').matches
  : false;

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('uz-UZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
}

export function formatNumber(num) {
  return new Intl.NumberFormat('uz-UZ').format(num);
}

export function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function truncate(str, length = 100) {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getProgressColor(percentage) {
  if (percentage >= 80) return 'var(--success)';
  if (percentage >= 50) return 'var(--warning)';
  return 'var(--danger)';
}

export function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case 'easy': return '#22C55E';
    case 'medium': return '#F59E0B';
    case 'hard': return '#EF4444';
    case 'expert': return '#8B5CF6';
    default: return '#6B7280';
  }
}

export function getDifficultyLabel(difficulty) {
  switch (difficulty) {
    case 'easy': return 'Oson';
    case 'medium': return "Oʻrtacha";
    case 'hard': return 'Qiyin';
    case 'expert': return 'Ekspert';
    default: return difficulty;
  }
}

export function getExamTypeColor(type) {
  switch (type) {
    case 'milliy': return '#2F80ED';
    case 'dtm': return '#171796';
    case 'olympiad': return '#F59E0B';
    case 'attestation': return '#22C55E';
    default: return '#6B7280';
  }
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sampleN(arr, n, exclude) {
  const pool = exclude ? arr.filter(x => x !== exclude) : arr;
  return shuffle(pool).slice(0, n);
}

export function getExamTypeLabel(type) {
  switch (type) {
    case 'milliy': return 'Milliy Sertifikat';
    case 'dtm': return 'DTM';
    case 'olympiad': return 'Olimpiada';
    case 'attestation': return 'Attestatsiya';
    default: return type;
  }
}

/**
 * Normalizes phone number to format +998901234567
 */
export function normalizeUzPhone(raw) {
  if (!raw) return '';
  const digits = String(raw).replace(/\D/g, '');
  if (digits.startsWith('998')) return '+' + digits.slice(0, 12);
  if (digits.startsWith('8') && digits.length === 10) return '+998' + digits.slice(1);
  if (digits.length <= 9) return '+998' + digits;
  return '+' + digits.slice(0, 12);
}

/**
 * Formats Uzbek phone number into clean display: +998 (90) 123-45-67
 * Always starts with +998.
 */
export function formatUzPhone(raw) {
  if (!raw) return '+998 ';
  const str = String(raw);
  let digits = str.replace(/\D/g, '');
  
  if (digits.startsWith('998')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('8') && digits.length >= 10) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 9); // max 9 digits after 998

  if (digits.length === 0) return '+998 ';
  if (digits.length <= 2) return `+998 (${digits}`;
  if (digits.length <= 5) return `+998 (${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 7) return `+998 (${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5)}`;
  return `+998 (${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5, 7)}-${digits.slice(7, 9)}`;
}

/**
 * Returns operator info for a given Uzbek phone number
 */
export function getUzPhoneOperator(raw) {
  if (!raw) return null;
  const digits = String(raw).replace(/\D/g, '');
  let code = '';
  if (digits.startsWith('998') && digits.length >= 5) {
    code = digits.slice(3, 5);
  } else if (digits.length >= 2) {
    code = digits.slice(0, 2);
  }

  const operators = {
    '90': { name: 'Beeline', color: '#F59E0B' },
    '91': { name: 'Beeline', color: '#F59E0B' },
    '93': { name: 'Ucell', color: '#8B5CF6' },
    '94': { name: 'Ucell', color: '#8B5CF6' },
    '50': { name: 'Ucell', color: '#8B5CF6' },
    '97': { name: 'Mobiuz', color: '#EF4444' },
    '88': { name: 'Mobiuz', color: '#EF4444' },
    '95': { name: 'Mobiuz', color: '#EF4444' },
    '99': { name: 'Uztelecom', color: '#0EA5E9' },
    '77': { name: 'Uztelecom', color: '#0EA5E9' },
    '33': { name: 'Humans', color: '#EC4899' },
    '98': { name: 'Perfectum', color: '#6366F1' },
  };

  return operators[code] || null;
}
