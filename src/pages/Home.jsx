import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame, Lightning, TrendUp, Clock, BookOpen, Trophy, ArrowRight,
  MapPin, Star, Calendar, Globe, Target, GraduationCap,
  Sparkle, Compass, MapTrifold, Users, CheckCircle, FileText, Clipboard
} from '@phosphor-icons/react';
import { StickerIcons } from '../components/illustrations/GeoIllustrations';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/Progress';
import {
  dailyStats, continueLearning, quickAccessCards, popularTests,
  upcomingExams, recentActivities, leaderboardPreview, geographyFact,
  todayRecommendation, user
} from '../data/mockData';
import { EarthCompassPin } from '../components/illustrations/GeoIllustrations';

const iconMap = {
  Compass: Compass,
  Lightning: Lightning,
  Flag: MapPin,
  Map: MapTrifold,
};

const stickerStatMap = {
  Flame: 'Flame',
  Target: 'Target',
  Clock: 'Clock',
  TrendUp: 'TrendUp',
};

function StatCard({ icon: Icon, label, value, trend }) {
  const StickerIcon = StickerIcons[stickerStatMap[Icon.name]] || null;
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] p-4 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="shrink-0">
          {StickerIcon ? (
            <StickerIcon size={36} className="text-[var(--primary)]" />
          ) : (
            <div className="w-9 h-9 rounded-[var(--radius-xs)] bg-[var(--primary-soft)] flex items-center justify-center">
              <Icon size={18} className="text-[var(--primary)]" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-[var(--text-secondary)] font-medium">{label}</p>
          <div className="flex items-center gap-1.5">
            <p className="text-xl font-bold text-[var(--text-primary)]">{value}</p>
            {trend && (
              <span className="text-[10px] font-medium text-[var(--success)]">{trend}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ActivityIcon({ type }) {
  const icons = { test: BookOpen, quiz: Lightning, game: Compass };
  const Icon = icons[type] || BookOpen;
  return <Icon size={16} className="text-[var(--primary)]" />;
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[var(--primary)] rounded-[var(--radius-lg)] p-6 sm:p-8 text-white relative overflow-hidden"
      >
        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-20 hidden sm:block">
          <EarthCompassPin size={140} />
        </div>
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div className="min-w-0">
            <p className="text-white/70 text-sm font-medium mb-1">Xush kelibsiz!</p>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-white/70 text-sm max-w-md">
              Bugun geografiya bilimingizni sinash uchun ajoyib kun!
            </p>
            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                <Flame size={14} className="text-orange-300" weight="fill" />
                <span className="text-sm font-medium">{user.streak} kunlik streak</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1">
                <Star size={14} className="text-yellow-300" weight="fill" />
                <span className="text-sm font-medium">{user.level}-daraja</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Daily Stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Kunlik Statistika</h2>
          <span className="text-xs text-[var(--text-secondary)]">Bugun</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={Flame} label="XP" value={`+${dailyStats.xpGained}`} trend="+12%" />
          <StatCard icon={Target} label="Aniqlik" value={`${dailyStats.accuracy}%`} />
          <StatCard icon={Clock} label="Vaqt" value={dailyStats.studyTime} />
          <StatCard icon={TrendUp} label="Testlar" value={dailyStats.testsDone} />
        </div>
      </motion.div>

      {/* Today Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
      >
        <Link
          to="/tests/milliy"
          className="flex items-center justify-between gap-3 bg-[var(--primary-soft)] rounded-[var(--radius)] p-4 border border-[var(--primary)]/10 hover:border-[var(--primary)]/30 transition-all group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-[var(--radius-xs)] bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
              <Sparkle size={18} className="text-[var(--primary)]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{todayRecommendation.title}</p>
              <p className="text-xs text-[var(--text-secondary)]">{todayRecommendation.description}</p>
            </div>
          </div>
          <Button size="sm" className="shrink-0">
            {todayRecommendation.action} <ArrowRight size={14} />
          </Button>
        </Link>
      </motion.div>

      {/* Continue Learning */}
      {continueLearning.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Davom Etirish</h2>
            <Link to="/tests" className="text-sm text-[var(--primary)] font-medium hover:underline">
              Hammasi
            </Link>
          </div>
          <div className="space-y-2">
            {continueLearning.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.16 + i * 0.05 }}
              >
                <Card className="cursor-pointer" onClick={() => navigate(`/tests/${item.type}`)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{item.title}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{item.subject}</p>
                      </div>
                      <ArrowRight size={16} className="text-[var(--text-secondary)] shrink-0" />
                    </div>
                    <div className="flex items-center gap-2">
                      <ProgressBar value={item.progress} size="sm" className="flex-1" />
                      <span className="text-xs font-medium text-[var(--text-secondary)] shrink-0">{item.progress}%</span>
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1.5">
                      {item.lastQuestion} / {item.totalQuestions} ta savol
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Access */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Tezkor Kirish</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickAccessCards.map((card) => {
            const Icon = iconMap[card.icon] || Compass;
            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate(card.id === 1 ? '/tests' : card.id === 2 ? '/quiz' : '/games')}
              >
                <Card className="cursor-pointer h-full">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-[var(--radius-xs)] flex items-center justify-center mb-3" style={{ background: card.bg, color: card.color }}>
                      <Icon size={20} />
                    </div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{card.title}</p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{card.count} ta</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Popular Tests */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.24 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Ommabop Testlar</h2>
          <Link to="/tests" className="text-sm text-[var(--primary)] font-medium hover:underline">
            Barchasi
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {popularTests.slice(0, 4).map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 + i * 0.06, duration: 0.3 }}
              whileHover={{ y: -2 }}
            >
              <Card className="cursor-pointer h-full" onClick={() => navigate(`/tests/${test.type}`)}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-[var(--radius-xs)] flex items-center justify-center text-sm font-bold" style={{
                      background: test.type === 'milliy' ? '#EFF6FF' : test.type === 'dtm' ? '#F5F3FF' : test.type === 'olympiad' ? '#FFFBEB' : '#F0FDF4',
                      color: test.type === 'milliy' ? '#2563EB' : test.type === 'dtm' ? '#7C3AED' : test.type === 'olympiad' ? '#D97706' : '#16A34A'
                    }}>
                      {test.type === 'milliy' ? <FileText size={16} /> : test.type === 'dtm' ? <Target size={16} /> : test.type === 'olympiad' ? <Trophy size={16} /> : <Clipboard size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{test.title}</p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {test.questions} ta savol · {test.time} daqiqa
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-[var(--text-tertiary)]">
                      <Users size={12} />
                      <span>{test.participants.toLocaleString()}</span>
                    </div>
                    <span className="font-medium" style={{
                      color: test.difficulty === 'easy' ? '#16A34A' : test.difficulty === 'medium' ? '#D97706' : test.difficulty === 'hard' ? '#DC2626' : '#7C3AED'
                    }}>
                      {test.difficulty === 'easy' ? 'Oson' : test.difficulty === 'medium' ? "O'rtacha" : test.difficulty === 'hard' ? 'Qiyin' : 'Ekspert'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Exams */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.28 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Yaqinlashayotgan Imtihonlar</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {upcomingExams.map((exam) => (
            <Card key={exam.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-[var(--radius-xs)] flex items-center justify-center" style={{
                    background: exam.type === 'milliy' ? '#EFF6FF' : exam.type === 'dtm' ? '#F5F3FF' : '#FFFBEB'
                  }}>
                    {exam.type === 'milliy' ? <FileText size={16} className="text-[#2563EB]" /> : exam.type === 'dtm' ? <Target size={16} className="text-[#7C3AED]" /> : <Trophy size={16} className="text-[#D97706]" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{exam.title}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{exam.date}</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-medium text-[var(--danger)] bg-[var(--danger-soft)] rounded-full px-2.5 py-0.5">
                  <Clock size={12} />
                  {exam.daysLeft} kun qoldi
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Geography Fact */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.32 }}
      >
        <Card>
          <CardContent className="p-5 flex items-start gap-3">
            <div className="w-9 h-9 rounded-[var(--radius-xs)] bg-[var(--primary-soft)] flex items-center justify-center shrink-0">
              <Globe size={18} className="text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--primary)] mb-0.5">Kun Geografiya Fakti</p>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">{geographyFact.text}</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1.5">— {geographyFact.source}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.36 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Oxirgi Faoliyat</h2>
          <Link to="/profile" className="text-sm text-[var(--primary)] font-medium hover:underline">
            Barchasi
          </Link>
        </div>
        <div className="space-y-2">
          {recentActivities.slice(0, 3).map((activity) => (
            <Card key={activity.id}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-[var(--radius-xs)] flex items-center justify-center ${
                  activity.type === 'test' ? 'bg-[#EFF6FF]' : activity.type === 'quiz' ? 'bg-[#FFFBEB]' : 'bg-[#F0FDF4]'
                }`}>
                  <ActivityIcon type={activity.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{activity.title}</p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {activity.score}/{activity.total} · +{activity.xpGained} XP
                  </p>
                </div>
                <span className="text-xs text-[var(--text-tertiary)] shrink-0">
                  {new Date(activity.date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' })}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Leaderboard Preview */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Reyting</h2>
          <Link to="/rankings" className="text-sm text-[var(--primary)] font-medium hover:underline">
            To'liq reyting
          </Link>
        </div>
        <Card>
          <div className="divide-y divide-[var(--border)]">
            {leaderboardPreview.map((person, i) => (
              <div
                key={person.id}
                className={`flex items-center gap-3 px-4 py-3 ${person.isCurrentUser ? 'bg-[var(--primary-soft)]' : ''}`}
              >
                <span className={`w-5 text-center text-sm font-bold ${
                  i === 0 ? 'text-[#D97706]' : i === 1 ? 'text-[var(--text-tertiary)]' : i === 2 ? 'text-[#EA580C]' : 'text-[var(--text-tertiary)]'
                }`}>
                  {person.rank}
                </span>
                <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xs font-bold">
                  {person.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {person.name}
                    {person.isCurrentUser && <span className="text-xs text-[var(--primary)] ml-1 font-medium">(Siz)</span>}
                  </p>
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)] tabular-nums">{person.xp.toLocaleString()} XP</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}