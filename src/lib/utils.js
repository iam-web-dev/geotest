import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
    case 'medium': return "O'rtacha";
    case 'hard': return 'Qiyin';
    case 'expert': return 'Ekspert';
    default: return difficulty;
  }
}

export function getExamTypeColor(type) {
  switch (type) {
    case 'milliy': return '#2F80ED';
    case 'dtm': return '#8B5CF6';
    case 'olympiad': return '#F59E0B';
    case 'attestation': return '#22C55E';
    default: return '#6B7280';
  }
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