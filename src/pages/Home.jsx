import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame, Lightning, TrendUp, Clock, BookOpen, Trophy, ArrowRight,
  MapPin, Star, Calendar, Globe, Target, GraduationCap,
  Sparkle, Compass, MapTrifold, Users, CheckCircle, FileText, Clipboard
} from '@phosphor-icons/react';
import { StickerIcons, StickerMilliyBadge, StickerDTMRocket, StickerOlympiadTrophy, StickerAttestationShield } from '../components/illustrations/GeoIllustrations';
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

const statMeta = {
  Flame:   { color: '#F97316', bg: 'var(--pal-orange)' },
  Target:  { color: '#2F80ED', bg: 'var(--pal-milliy)' },
  Clock:   { color: '#8B5CF6', bg: 'var(--pal-dtm)' },
  TrendUp: { color: '#22C55E', bg: 'var(--pal-attestation)' },
};

function StatCard({ icon: Icon, label, value, trend }) {
  const meta = statMeta[Icon.displayName] || statMeta[Icon.name] || { color: 'var(--primary)', bg: 'var(--primary-soft)' };
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] p-4 shadow-sm"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-[var(--radius-xs)] flex items-center justify-center" style={{ background: meta.bg }}>
          <Icon size={18} style={{ color: meta.color }} />
        </div>
        {trend && (
          <span className="text-[10px] font-semibold bg-[var(--pal-attestation)] text-[#16A34A] px-1.5 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-[var(--text-primary)] leading-none">{value}</p>
      <p className="text-xs text-[var(--text-secondary)] font-medium mt-1">{label}</p>
    </motion.div>
  );
}

function ActivityIcon({ type }) {
  const icons = { test: BookOpen, quiz: Lightning, game: Compass };
  const Icon = icons[type] || BookOpen;
  return <Icon size={16} className="text-[var(--primary)]" />;
}

const testStickers = {
  milliy:      { Sticker: StickerMilliyBadge,      color: '#2F80ED', bg: 'var(--pal-milliy)', label: 'Milliy Sertifikat' },
  dtm:         { Sticker: StickerDTMRocket,         color: '#8B5CF6', bg: 'var(--pal-dtm)', label: 'DTM' },
  olympiad:    { Sticker: StickerOlympiadTrophy,    color: '#F59E0B', bg: 'var(--pal-olympiad)', label: 'Olimpiada' },
  attestation: { Sticker: StickerAttestationShield, color: '#22C55E', bg: 'var(--pal-attestation)', label: 'Attestatsiya' },
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-7">

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-[var(--radius-lg)] p-6 sm:p-8 text-white"
        style={{ background: 'linear-gradient(135deg, #1A6ED4 0%, var(--primary) 55%, #3B9EF5 100%)' }}
      >
        {/* Decorative orbs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute top-8 -right-4 w-24 h-24 rounded-full bg-white/8 pointer-events-none" />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 hidden sm:block pointer-events-none">
          <EarthCompassPin size={150} />
        </div>

        <div className="relative z-10">
          <p className="text-white/70 text-sm font-medium mb-1">Xush kelibsiz!</p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-white/65 text-sm max-w-xs">
            Bugun geografiya bilimingizni sinash uchun ajoyib kun!
          </p>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5">
              <Flame size={13} weight="fill" style={{ color: '#FFA45B' }} />
              <span className="text-sm font-semibold">{user.streak} kunlik streak</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5">
              <Star size={13} weight="fill" style={{ color: '#FFD700' }} />
              <span className="text-sm font-semibold">{user.level}-daraja</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Daily Stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Kunlik Statistika</h2>
          <span className="text-xs text-[var(--text-secondary)]">Bugun</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={Flame}   label="XP"       value={`+${dailyStats.xpGained}`} trend="+12%" />
          <StatCard icon={Target}  label="Aniqlik"  value={`${dailyStats.accuracy}%`} />
          <StatCard icon={Clock}   label="Vaqt"     value={dailyStats.studyTime} />
          <StatCard icon={TrendUp} label="Testlar"  value={dailyStats.testsDone} />
        </div>
      </motion.div>

      {/* ── Continue Learning ── */}
      {continueLearning.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Davom Etirish</h2>
            <Link to="/tests" className="text-xs text-[var(--primary)] font-semibold hover:underline">
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
                whileHover={{ x: 3 }}
              >
                <Card className="cursor-pointer overflow-hidden" onClick={() => navigate(`/tests/${item.type}`)}>
                  <div className="flex">
                    <div className="w-1 shrink-0" style={{ background: 'var(--primary)' }} />
                    <CardContent className="p-4 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{item.title}</p>
                          <p className="text-xs text-[var(--text-secondary)]">{item.subject}</p>
                        </div>
                        <ArrowRight size={15} className="text-[var(--text-secondary)] shrink-0" />
                      </div>
                      <div className="flex items-center gap-2">
                        <ProgressBar value={item.progress} size="sm" className="flex-1" />
                        <span className="text-xs font-bold text-[var(--primary)] shrink-0">{item.progress}%</span>
                      </div>
                      <p className="text-xs text-[var(--text-tertiary)] mt-1.5">
                        {item.lastQuestion} / {item.totalQuestions} ta savol
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Quick Access ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Tezkor Kirish</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickAccessCards.map((card) => {
            const Icon = iconMap[card.icon] || Compass;
            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => navigate(card.id === 1 ? '/tests' : card.id === 2 ? '/quiz' : '/games')}
                className="cursor-pointer"
              >
                <div
                  className="rounded-[var(--radius)] p-4 flex flex-col items-center text-center border border-transparent"
                  style={{ background: card.bg }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center mb-3 shadow-sm"
                    style={{ background: card.color }}
                  >
                    <Icon size={20} color="white" />
                  </div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{card.title}</p>
                  <p className="text-xs font-medium mt-0.5" style={{ color: card.color }}>{card.count} ta</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Popular Tests ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.24 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Ommabop Testlar</h2>
          <Link to="/tests" className="text-xs text-[var(--primary)] font-semibold hover:underline">
            Barchasi
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {popularTests.slice(0, 4).map((test, i) => {
            const meta = testStickers[test.type] || testStickers.milliy;
            const { Sticker } = meta;
            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 + i * 0.06, duration: 0.3 }}
                whileHover={{ y: -2 }}
              >
                <Card className="cursor-pointer h-full overflow-hidden" onClick={() => navigate(`/tests/${test.type}`)}>
                  <div className="flex items-center gap-3 px-4 py-3" style={{ background: meta.bg }}>
                    <Sticker size={38} color={meta.color} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{test.title}</p>
                      <p className="text-xs font-medium" style={{ color: meta.color }}>{meta.label}</p>
                    </div>
                  </div>
                  <CardContent className="px-4 py-3">
                    <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                      <span>{test.questions} ta savol · {test.time} daqiqa</span>
                      <div className="flex items-center gap-1">
                        <Users size={11} />
                        <span>{test.participants.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Upcoming Exams ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.28 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Yaqinlashayotgan Imtihonlar</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {upcomingExams.map((exam) => {
            const meta = testStickers[exam.type] || testStickers.milliy;
            const { Sticker } = meta;
            return (
              <Card key={exam.id} className="overflow-hidden">
                <div className="h-1" style={{ background: meta.color }} />
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Sticker size={34} color={meta.color} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{exam.title}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{exam.date}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--danger)] bg-[var(--danger-soft)] rounded-full px-2.5 py-1">
                    <Clock size={11} />
                    {exam.daysLeft} kun qoldi
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* ── Geography Fact ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.32 }}
      >
        <div
          className="rounded-[var(--radius)] p-4 flex items-start gap-3 border"
          style={{ background: 'var(--fact-bg)', borderColor: 'var(--fact-border)' }}
        >
          <div className="w-9 h-9 rounded-[var(--radius-xs)] flex items-center justify-center shrink-0" style={{ background: 'var(--pal-milliy)' }}>
            <Globe size={18} style={{ color: '#2F80ED' }} />
          </div>
          <div>
            <p className="text-xs font-bold mb-1" style={{ color: '#2F80ED' }}>Kun Geografiya Fakti</p>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">{geographyFact.text}</p>
            <p className="text-xs text-[var(--text-tertiary)] mt-1.5">— {geographyFact.source}</p>
          </div>
        </div>
      </motion.div>

      {/* ── Recent Activities ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.36 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Oxirgi Faoliyat</h2>
          <Link to="/profile" className="text-xs text-[var(--primary)] font-semibold hover:underline">
            Barchasi
          </Link>
        </div>
        <div className="space-y-2">
          {recentActivities.slice(0, 3).map((activity) => (
            <Card key={activity.id} className="overflow-hidden">
              <div className="flex">
                <div className="w-1 shrink-0" style={{
                  background: activity.type === 'test' ? '#2F80ED' : activity.type === 'quiz' ? '#F59E0B' : '#22C55E'
                }} />
                <CardContent className="p-3 flex items-center gap-3 flex-1">
                  <div
                    className="w-8 h-8 rounded-[var(--radius-xs)] flex items-center justify-center shrink-0"
                    style={{ background: activity.type === 'test' ? 'var(--pal-milliy)' : activity.type === 'quiz' ? 'var(--pal-olympiad)' : 'var(--pal-attestation)' }}
                  >
                    <ActivityIcon type={activity.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">{activity.title}</p>
                    <p className="text-xs text-[var(--text-secondary)]">+{activity.xpGained} XP</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-[var(--text-primary)]">{activity.score}/{activity.total}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">
                      {new Date(activity.date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* ── Leaderboard Preview ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Reyting</h2>
          <Link to="/rankings" className="text-xs text-[var(--primary)] font-semibold hover:underline">
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
                <span className={`w-6 text-center text-sm font-bold tabular-nums ${
                  i === 0 ? 'text-[#F59E0B]' : i === 1 ? 'text-[#94A3B8]' : i === 2 ? 'text-[#EA580C]' : 'text-[var(--text-tertiary)]'
                }`}>
                  {person.rank}
                </span>
                <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {person.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {person.name}
                    {person.isCurrentUser && (
                      <span className="text-xs text-[var(--primary)] ml-1 font-semibold">(Siz)</span>
                    )}
                  </p>
                </div>
                <span className="text-sm font-bold text-[var(--text-primary)] tabular-nums">
                  {person.xp.toLocaleString()} <span className="text-xs font-medium text-[var(--text-secondary)]">XP</span>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

    </div>
  );
}
