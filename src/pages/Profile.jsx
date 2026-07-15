import { useState, useMemo } from 'react';
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
import { UserLocationCompass, ChartGlobe, BadgeSticker, StickerIcons } from '../components/illustrations/GeoIllustrations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';

const badgeStickerMap = {
  'Birinchi Test': 'Target',
  '7 kunlik Streak': 'Flame',
  'Geografiya Fanatigi': 'Globe',
  '100 ta Test': 'CheckCircle',
  'Olimpiada Sovrindori': 'Medal',
  'Milliy Sertifikat': 'Certificate',
  'DTM 90/90': 'Target',
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

// Generate mock performance chart data (like Monkeytype style)
const chartData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  const base = 65 + Math.sin(i * 0.3) * 15 + Math.random() * 10;
  return {
    day: date.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' }),
    tests: Math.round(3 + Math.sin(i * 0.2) * 2 + Math.random() * 2),
    quiz: Math.round(2 + Math.cos(i * 0.25) * 1.5 + Math.random() * 2),
    time: Math.round(60 + Math.sin(i * 0.15) * 20 + Math.random() * 15),
    accuracy: Math.round(base),
  };
});

export default function Profile() {
  const { darkMode, toggleTheme } = useTheme();
  const [chartMetric, setChartMetric] = useState('accuracy');

  const chartColors = {
    accuracy: { stroke: '#3B82F6', fill: 'rgba(59, 130, 246, 0.1)' },
    tests: { stroke: '#8B5CF6', fill: 'rgba(139, 92, 246, 0.1)' },
    quiz: { stroke: '#F59E0B', fill: 'rgba(245, 158, 11, 0.1)' },
    time: { stroke: '#22C55E', fill: 'rgba(34, 197, 94, 0.1)' },
  };

  const metricConfig = {
    accuracy: { label: "O'rtacha natija", unit: '%', key: 'accuracy' },
    tests: { label: 'Testlar', unit: '', key: 'tests' },
    quiz: { label: 'Viktorinalar', unit: '', key: 'quiz' },
    time: { label: "O'quv vaqti", unit: 'h', key: 'time' },
  };

  return (
    <div className="space-y-6">
      <div>
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
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card><CardContent className="p-4 text-center">
          <CircularProgress value={78} size={60} strokeWidth={4} color="#2F80ED" className="mb-2" />
          <p className="text-[10px] text-[var(--text-secondary)]">O'rtacha natija</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-[var(--text-primary)]">{user.totalTests}</p>
          <p className="text-[10px] text-[var(--text-secondary)]">Testlar</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-[var(--primary)]">{user.totalQuizzes}</p>
          <p className="text-[10px] text-[var(--text-secondary)]">Viktorinalar</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-2xl font-bold text-[var(--warning)]">{user.achievements.hoursSpent}h</p>
          <p className="text-[10px] text-[var(--text-secondary)]">O'quv vaqti</p>
        </CardContent></Card>
      </div>

      {/* Performance Chart - Monkeytype style */}
      <div>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Faoliyat Grafigi</h2>
              <div className="flex items-center gap-1.5">
                {Object.entries(metricConfig).map(([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => setChartMetric(key)}
                    className={cn(
                      'px-2.5 py-1 rounded-full text-xs font-medium transition-all',
                      chartMetric === key
                        ? 'bg-[var(--primary)] text-white'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--border)]/50'
                    )}
                  >
                    {cfg.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-52 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors[chartMetric].stroke} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={chartColors[chartMetric].stroke} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 10, fill: 'var(--text-tertiary)' }}
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: 'var(--text-tertiary)' }}
                    axisLine={false}
                    tickLine={false}
                    domain={chartMetric === 'accuracy' ? [40, 100] : chartMetric === 'time' ? [20, 100] : [0, 'auto']}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(value) => [`${value}${metricConfig[chartMetric].unit}`, metricConfig[chartMetric].label]}
                  />
                  <Area
                    type="monotone"
                    dataKey={metricConfig[chartMetric].key}
                    stroke={chartColors[chartMetric].stroke}
                    strokeWidth={2}
                    fill="url(#chartGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: chartColors[chartMetric].stroke, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges with Stickers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Nishonlar</h2>
          <span className="text-xs text-[var(--text-secondary)]">{user.badges.filter(b => b.unlocked).length}/{user.badges.length}</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {user.badges.map((badge) => (
            <div key={badge.id} className="flex flex-col items-center gap-1.5">
              <BadgeSticker
                name={badge.name}
                unlocked={badge.unlocked}
                size={52}
                className={badge.unlocked ? '' : 'opacity-50 grayscale'}
              />
              <p className="text-[8px] text-center font-medium text-[var(--text-primary)] leading-tight">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <div>
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
      </div>

      <div className="text-center pb-4">
        <p className="text-xs text-[var(--text-secondary)]">Geo-Test.uz v1.0.0</p>
        <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">O'zbekiston geografiya ta'lim platformasi</p>
      </div>
    </div>
  );
}