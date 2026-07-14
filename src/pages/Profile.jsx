import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Gear, SignOut, Medal, BookOpen, Trophy, Target,
  Calendar, Clock, Star, Flame, Lightning, CaretRight,
  Sun, Moon, Bell, Shield, Question, ShareNetwork,
  Compass, TrendUp, Globe, CheckCircle, Certificate
} from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressBar, CircularProgress } from '../components/ui/Progress';
import { useTheme } from '../context/ThemeContext';
import { user, recentActivities } from '../data/mockData';
import { UserLocationCompass, ChartGlobe } from '../components/illustrations/GeoIllustrations';

const badgeIconMap = {
  compass: Compass,
  trendUp: TrendUp,
  globe: Globe,
  checkCircle: CheckCircle,
  trophy: Trophy,
  certificate: Certificate,
  target: Target,
};

const menuItems = [
  { icon: Medal, label: 'Yutuqlar', color: '#F59E0B', count: user.badges.filter(b => b.unlocked).length },
  { icon: BookOpen, label: 'Sertifikatlar', color: '#2F80ED', count: user.certificates },
  { icon: Trophy, label: 'Reyting', color: '#8B5CF6', count: `#${user.rank}` },
  { icon: Target, label: 'Maqsadlar', color: '#22C55E', count: 3 },
  { icon: Bell, label: 'Bildirishnomalar', color: '#EF4444', count: 2 },
  { icon: Shield, label: 'Maxfiylik', color: '#06B6D4', count: null },
  { icon: Question, label: 'Yordam', color: '#F97316', count: null },
  { icon: ShareNetwork, label: "Do'stlarga tavsiya etish", color: '#EC4899', count: null },
];

function ActivityIcon({ type }) {
  const icons = { test: BookOpen, quiz: Lightning, game: Compass };
  const Icon = icons[type] || BookOpen;
  return <Icon size={18} className="text-[var(--primary)]" />;
}

export default function Profile() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card><CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full geo-gradient flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--success)] border-2 border-[var(--surface)] flex items-center justify-center">
                <Lightning size={12} className="text-white" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">{user.name}</h1>
              <p className="text-sm text-[var(--text-secondary)]">{user.school}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] text-xs font-semibold">{user.grade}-sinf</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#F59E0B] text-xs font-semibold">{user.favoriteSubject}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-[var(--radius-sm)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--background)] transition-all"><Gear size={18} /></button>
              <button className="w-10 h-10 rounded-[var(--radius-sm)] border border-[var(--border)] flex items-center justify-center text-[var(--danger)] hover:bg-[var(--danger)]/5 transition-all"><SignOut size={18} /></button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-6 pt-6 border-t border-[var(--border)]">
            <div className="text-center"><p className="text-2xl font-bold text-[var(--text-primary)]">{user.level}</p><p className="text-[10px] text-[var(--text-secondary)]">Daraja</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-[var(--primary)]">{user.xp.toLocaleString()}</p><p className="text-[10px] text-[var(--text-secondary)]">XP</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-[var(--success)]">{user.streak}</p><p className="text-[10px] text-[var(--text-secondary)]">Streak</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-[#8B5CF6]">#{user.rank}</p><p className="text-[10px] text-[var(--text-secondary)]">Reyting</p></div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[var(--text-secondary)]">Keyingi daraja</span>
              <span className="font-semibold text-[var(--text-primary)]">2,420 / 5,000 XP</span>
            </div>
            <ProgressBar value={48.4} size="md" />
          </div>
        </CardContent></Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card><CardContent className="p-4 text-center"><CircularProgress value={78} size={60} strokeWidth={4} color="#2F80ED" className="mb-2" /><p className="text-[10px] text-[var(--text-secondary)]">O'rtacha natija</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-[var(--text-primary)]">{user.totalTests}</p><p className="text-[10px] text-[var(--text-secondary)]">Testlar</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-[var(--primary)]">{user.totalQuizzes}</p><p className="text-[10px] text-[var(--text-secondary)]">Viktorinalar</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-[var(--warning)]">{user.achievements.hoursSpent}h</p><p className="text-[10px] text-[var(--text-secondary)]">O'quv vaqti</p></CardContent></Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Nishonlar</h2>
          <span className="text-xs text-[var(--text-secondary)]">{user.badges.filter(b => b.unlocked).length}/{user.badges.length}</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {user.badges.map((badge) => {
            const BadgeIcon = badgeIconMap[badge.icon] || Star;
            return (
              <div key={badge.id} className={cn('flex flex-col items-center gap-1 p-2 rounded-[var(--radius-sm)] transition-all', badge.unlocked ? 'bg-[var(--surface)]' : 'bg-[var(--border)]/50 opacity-50')}>
                <div className={cn('w-8 h-8 rounded-[var(--radius-xs)] flex items-center justify-center', badge.unlocked ? 'bg-[var(--primary-soft)]' : 'bg-[var(--border)]')}>
                  <BadgeIcon size={16} className={badge.unlocked ? 'text-[var(--primary)]' : 'text-[var(--text-tertiary)]'} weight={badge.unlocked ? 'fill' : 'regular'} />
                </div>
                <p className="text-[8px] text-center font-medium text-[var(--text-primary)] leading-tight">{badge.name}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card><CardContent className="p-0">
          {menuItems.map((item, i) => (
            <div key={item.label} className={cn('flex items-center gap-3 p-4 cursor-pointer hover:bg-[var(--background)] transition-all', i < menuItems.length - 1 && 'border-b border-[var(--border)]')}>
              <div className="w-9 h-9 rounded-[var(--radius-sm)] flex items-center justify-center" style={{ background: `${item.color}15` }}>
                <item.icon size={18} style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p></div>
              <div className="flex items-center gap-2">
                {item.count !== null && <span className="text-xs font-semibold text-[var(--text-secondary)]">{item.count}</span>}
                <CaretRight size={16} className="text-[var(--text-secondary)]" />
              </div>
            </div>
          ))}
        </CardContent></Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card><CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[var(--primary-soft)] flex items-center justify-center">
              {darkMode ? <Sun size={18} className="text-[var(--primary)]" /> : <Moon size={18} className="text-[var(--primary)]" />}
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">{darkMode ? 'Yorqin rejim' : 'Qorong\'i rejim'}</p>
              <p className="text-xs text-[var(--text-secondary)]">Tashqi ko'rinishni o'zgartirish</p>
            </div>
          </div>
          <button onClick={toggleTheme} className={cn('w-12 h-6 rounded-full transition-all relative', darkMode ? 'bg-[var(--primary)]' : 'bg-[var(--border)]')}>
            <div className={cn('w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-sm', darkMode ? 'left-6' : 'left-0.5')} />
          </button>
        </CardContent></Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Oxirgi Faoliyat</h2>
        <div className="space-y-2">
          {recentActivities.map((activity) => (
            <Card key={activity.id}><CardContent className="p-3 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-[var(--radius-sm)] flex items-center justify-center ${activity.type === 'test' ? 'bg-[#DCEBFF]' : activity.type === 'quiz' ? 'bg-[#FEF3C7]' : 'bg-[#DCFCE7]'}`}>
                <ActivityIcon type={activity.type} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)]">{activity.title}</p>
                <p className="text-xs text-[var(--text-secondary)]">{activity.score}/{activity.total} · +{activity.xpGained} XP</p>
              </div>
              <span className="text-xs text-[var(--text-secondary)]">{new Date(activity.date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' })}</span>
            </CardContent></Card>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="text-center pb-4">
        <p className="text-xs text-[var(--text-secondary)]">Geo-Test.uz v1.0.0</p>
        <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">O'zbekiston geografiya ta'lim platformasi</p>
      </motion.div>
    </div>
  );
}