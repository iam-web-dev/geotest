import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame, Clock, BookOpen, ArrowRight,
  Star, Calendar, Globe,
} from '@phosphor-icons/react';
import {
  StickerIcons, StickerMilliyBadge, StickerDTMRocket, StickerOlympiadTrophy, StickerAttestationShield,
  StatIconXP, StatIconAccuracy, StatIconTime, StatIconTests,
} from '../components/illustrations/GeoIllustrations';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/Progress';
import {
  dailyStats, continueLearning,
  upcomingExams, geographyFact,
  todayRecommendation, user
} from '../data/mockData';
import { EarthCompassPin } from '../components/illustrations/GeoIllustrations';
import { canHover, getDifficultyColor, getDifficultyLabel } from '../lib/utils';


const statMeta = {
  StatIconXP:       { color: '#F97316', bg: 'var(--pal-orange)' },
  StatIconAccuracy: { color: '#2F80ED', bg: 'var(--pal-milliy)' },
  StatIconTime:     { color: '#8B5CF6', bg: 'var(--pal-dtm)' },
  StatIconTests:    { color: '#22C55E', bg: 'var(--pal-attestation)' },
};

function StatCard({ icon: Icon, label, value, detail, trend }) {
  const meta = statMeta[Icon.displayName] || statMeta[Icon.name] || { color: 'var(--primary)', bg: 'var(--primary-soft)' };
  return (
    <div className="relative bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] p-4 overflow-hidden">
      <div
        className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full pointer-events-none flex items-center justify-center"
        style={{ background: meta.color, opacity: 0.13 }}
      >
        <Icon size={44} color={meta.color} style={{ opacity: 0.55 }} />
      </div>

      <div className="flex items-start justify-between mb-3">
        <div
          className="w-11 h-11 rounded-[var(--radius-sm)] flex items-center justify-center shadow-sm"
          style={{ background: meta.bg }}
        >
          <Icon size={22} color={meta.color} />
        </div>
        {trend && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: meta.bg, color: meta.color }}
          >
            ↑ {trend}
          </span>
        )}
      </div>

      <p className="text-2xl font-bold text-[var(--text-primary)] leading-none">{value}</p>
      <p className="text-xs font-semibold mt-1.5" style={{ color: meta.color }}>{label}</p>
      {detail && <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5 leading-tight">{detail}</p>}
    </div>
  );
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
    <div className="space-y-10">

      {/* ── Hero ── */}
      <div
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
      </div>

      {/* ── Daily Stats ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[17px] font-bold text-[var(--text-primary)]">Kunlik Statistika</h2>
          <span className="text-xs text-[var(--text-secondary)]">Bugun</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={StatIconXP}       label="Bugungi Ball"      value={`+${dailyStats.xpGained}`} detail={`${dailyStats.streak} kunlik streak`} trend="+12%" />
          <StatCard icon={StatIconAccuracy} label="To'g'rilik"       value={`${dailyStats.accuracy}%`} detail={`${dailyStats.correctAnswers}/${dailyStats.questionsAnswered} savol`} />
          <StatCard icon={StatIconTime}     label="O'qish Vaqti"     value={dailyStats.studyTime} detail="Bugun sarflandi" trend="+18%" />
          <StatCard icon={StatIconTests}    label="Bajarilgan Test"  value={`${dailyStats.testsDone} ta`} detail={`${dailyStats.quizzesDone} ta viktorina`} />
        </div>
      </div>

      {/* ── Geography Fact ── */}
      <div
          className="rounded-[var(--radius)] overflow-hidden border"
          style={{ background: 'var(--fact-bg)', borderColor: 'var(--fact-border)' }}
        >
          {/* Header strip */}
          <div
            className="flex items-center gap-2.5 px-4 py-3 border-b"
            style={{ borderColor: 'var(--fact-border)' }}
          >
            <div
              className="w-7 h-7 rounded-[var(--radius-xs)] flex items-center justify-center shrink-0"
              style={{ background: 'var(--pal-milliy)' }}
            >
              <Globe size={14} style={{ color: '#2F80ED' }} />
            </div>
            <span className="text-xs font-bold flex-1" style={{ color: '#2F80ED' }}>
              Bugungi Geografiya Fakti
            </span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'var(--pal-milliy)', color: '#2F80ED' }}
            >
              #bugun
            </span>
          </div>

          {/* Body */}
          <div className="relative px-5 pt-4 pb-4">
            {/* Decorative large quote */}
            <span
              className="absolute top-1 left-3 text-7xl font-black leading-none select-none pointer-events-none"
              style={{ color: '#2F80ED', opacity: 0.08 }}
            >"</span>

            <p className="text-sm text-[var(--text-primary)] leading-relaxed relative z-10">
              {geographyFact.text}
            </p>

            {/* Source */}
            <div
              className="flex items-center gap-2 mt-3 pt-3 border-t"
              style={{ borderColor: 'var(--fact-border)' }}
            >
              <BookOpen size={12} style={{ color: '#2F80ED', opacity: 0.6 }} />
              <span className="text-xs text-[var(--text-tertiary)]">{geographyFact.source}</span>
            </div>
          </div>
        </div>

      {/* ── Continue Learning ── */}
      {continueLearning.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[17px] font-bold text-[var(--text-primary)]">Davom Etirish</h2>
            <Link to="/tests" className="text-xs text-[var(--primary)] font-semibold hover:underline">
              Hammasi
            </Link>
          </div>
          <div className="space-y-2">
            {continueLearning.map((item, i) => (
              <div key={item.id}>
                {(() => {
                  const meta = testStickers[item.type] || testStickers.milliy;
                  const { Sticker } = meta;
                  return (
                    <Card className="cursor-pointer overflow-hidden" onClick={() => navigate(`/tests/${item.type}`)}>
                      <div className="flex">
                        {/* Colored sticker panel */}
                        <div
                          className="w-[72px] shrink-0 flex items-center justify-center"
                          style={{ background: meta.bg }}
                        >
                          <Sticker size={46} color={meta.color} />
                        </div>

                        {/* Content */}
                        <CardContent className="p-3.5 flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-[var(--text-primary)] truncate leading-tight">
                                {item.title}
                              </p>
                              <span
                                className="inline-block text-[11px] font-semibold mt-0.5 px-2 py-0.5 rounded-full"
                                style={{ background: meta.bg, color: meta.color }}
                              >
                                {meta.label}
                              </span>
                            </div>
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: meta.bg }}
                            >
                              <ArrowRight size={13} style={{ color: meta.color }} weight="bold" />
                            </div>
                          </div>

                          <ProgressBar value={item.progress} size="sm" color={meta.color} />

                          <div className="flex items-center justify-between mt-1.5">
                            <p className="text-xs text-[var(--text-tertiary)]">
                              {item.lastQuestion}/{item.totalQuestions} ta savol
                            </p>
                            <p className="text-xs font-bold" style={{ color: meta.color }}>
                              {item.progress}%
                            </p>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Upcoming Exams ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[17px] font-bold text-[var(--text-primary)]">Yaqinlashayotgan Imtihonlar</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {upcomingExams.map((exam) => {
            const meta = testStickers[exam.type] || testStickers.milliy;
            const { Sticker } = meta;
            const urgent = exam.daysLeft <= 7;
            const soon   = exam.daysLeft <= 14;
            const countColor = urgent ? '#DC2626' : soon ? '#D97706' : meta.color;
            const countBg    = urgent ? 'var(--danger-soft)' : soon ? 'var(--warning-soft)' : meta.bg;
            const diffColor  = getDifficultyColor(exam.difficulty);
            const diffLabel  = getDifficultyLabel(exam.difficulty);
            const dateObj = new Date(exam.date);
            const dd = String(dateObj.getDate()).padStart(2, '0');
            const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
            const yyyy = dateObj.getFullYear();
            const formattedDate = `${dd}.${mm}.${yyyy}`;
            return (
              <Card key={exam.id} className="overflow-hidden cursor-pointer flex flex-col">
                {/* Sticker panel */}
                <div className="flex items-center justify-between px-4 py-4" style={{ background: meta.bg }}>
                  <div className="flex flex-col gap-1.5">
                    <span
                      className="self-start text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: meta.color + '25', color: meta.color }}
                    >
                      {meta.label}
                    </span>
                    <p className="text-sm font-bold text-[var(--text-primary)] leading-snug">{exam.title}</p>
                  </div>
                  <Sticker size={52} color={meta.color} />
                </div>

                <CardContent className="p-4 flex flex-col gap-3 flex-1">
                  {/* Date */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-[var(--radius-xs)] flex items-center justify-center shrink-0"
                      style={{ background: meta.bg }}
                    >
                      {/* Custom calendar icon — no number inside */}
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                        <rect x="1" y="3" width="14" height="11" rx="2" stroke={meta.color} strokeWidth="1.5"/>
                        <line x1="1" y1="7" x2="15" y2="7" stroke={meta.color} strokeWidth="1.5"/>
                        <line x1="5" y1="1" x2="5" y2="5" stroke={meta.color} strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="11" y1="1" x2="11" y2="5" stroke={meta.color} strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <p className="text-xs font-semibold text-[var(--text-primary)]">{formattedDate}</p>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 rounded-[var(--radius-xs)] overflow-hidden border border-[var(--border)]">
                    <div className="flex flex-col items-center py-2 border-r border-[var(--border)]">
                      <span className="text-[13px] font-bold text-[var(--text-primary)] leading-none">{exam.questions} ta</span>
                      <span className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Savol</span>
                    </div>
                    <div className="flex flex-col items-center py-2 border-r border-[var(--border)]">
                      <span className="text-[13px] font-bold text-[var(--text-primary)] leading-none">{exam.time} daq</span>
                      <span className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Vaqt</span>
                    </div>
                    <div className="flex flex-col items-center py-2">
                      <span className="text-[13px] font-bold leading-none" style={{ color: diffColor }}>{diffLabel}</span>
                      <span className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Daraja</span>
                    </div>
                  </div>

                  {/* Countdown */}
                  <div
                    className="flex items-center gap-3 rounded-[var(--radius-xs)] px-3 py-2.5 mt-auto"
                    style={{ background: countBg }}
                  >
                    <div className="flex items-baseline gap-1 leading-none">
                      <span className="text-3xl font-black" style={{ color: countColor }}>{exam.daysLeft}</span>
                      <span className="text-sm font-bold" style={{ color: countColor }}> kun qoldi</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

    </div>
  );
}
