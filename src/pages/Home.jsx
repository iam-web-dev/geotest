import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen, Globe, ArrowRight, Play,
  Flag, GlobeHemisphereWest, MapTrifold, Buildings, Mountains, Drop, Sun, Sparkle,
  Megaphone, GraduationCap, Books, User, Calendar, X,
  Terminal
} from '@phosphor-icons/react';
import {
  StickerMilliyBadge, StickerDTMRocket, StickerOlympiadTrophy, StickerAttestationShield,
  StatIconXP, StatIconAccuracy, StatIconTime, StatIconTests,
} from '../components/illustrations/GeoIllustrations';
import EarthDetailedGlobe from '../components/EarthDetailedGlobe';
import PlusProPromo from '../components/home/PlusProPromo';
import UserGeographyMap from '../components/home/UserGeographyMap';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import {
  dailyStats,
  upcomingExams, geographyFact,
  user, games,
} from '../data/mockData';
import { announcements, ANNOUNCEMENT_CATEGORIES } from '../data/announcementsData';
import { getDifficultyColor, getDifficultyLabel, cn } from '../lib/utils';

const gameIcons = {
  Flag, GlobeHemisphereWest, MapTrifold, Buildings,
  Droplets: Drop, Mountain: Mountains, Sun, Earth: GlobeHemisphereWest, Sparkle,
};

const statMeta = {
  StatIconXP:       { color: '#F97316', bg: 'var(--pal-orange)' },
  StatIconAccuracy: { color: 'var(--primary)', bg: 'var(--primary-soft)' },
  StatIconTime:     { color: 'var(--primary)', bg: 'var(--primary-soft)' },
  StatIconTests:    { color: 'var(--primary)', bg: 'var(--primary-soft)' },
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
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>

      <p className="text-2xl font-bold text-[var(--text-primary)] mb-0.5">{value}</p>
      <p className="text-xs font-medium text-[var(--text-secondary)]">{label}</p>
      {detail && <p className="text-[11px] text-[var(--text-tertiary)] mt-1">{detail}</p>}
    </div>
  );
}

const testStickers = {
  milliy:      { Sticker: StickerMilliyBadge,      color: '#326D62', bg: 'var(--pal-milliy)', label: 'Milliy Sertifikat' },
  dtm:         { Sticker: StickerDTMRocket,         color: '#171796', bg: 'var(--pal-dtm)', label: 'DTM' },
  olympiad:    { Sticker: StickerOlympiadTrophy,    color: '#D4A820', bg: 'var(--pal-olympiad)', label: 'Olimpiada' },
  attestation: { Sticker: StickerAttestationShield, color: '#22C55E', bg: 'var(--pal-attestation)', label: 'Attestatsiya' },
};

export default function Home() {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const activeUser = authUser || user;

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const filteredAnnouncements = useMemo(() => {
    if (activeCategory === 'all') return announcements;
    if (activeCategory === 'pinned') return announcements.filter(a => a.isPinned);
    return announcements.filter(a => a.category === activeCategory);
  }, [activeCategory]);

  const popularGames = games.filter(g => g.popular).slice(0, 3);

  return (
    <div className="space-y-8">
      <SEO
        title="Bosh Sahifa — E'lonlar va Geografiya Ta'lim Portali"
        description="GeoBek platformasining rasmiy e'lonlari, yangiliklari, maktab darslik taqdimotlari va testlari."
        url="/"
      />

      {/* ── Hero Banner ── */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-blue-400/20"
        style={{
          background: 'linear-gradient(135deg, #1E40AF 0%, #1D4ED8 45%, #2563EB 80%, #0284C7 100%)',
        }}
      >
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-xl" />
        <div className="absolute -bottom-10 left-1/3 w-48 h-48 rounded-full bg-sky-400/10 pointer-events-none blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold">
              <Megaphone size={14} weight="bold" />
              <span>GeoBek Rasmiy Taʼlim Portali</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Salom, {activeUser.name}!
            </h1>
            <p className="text-white/85 text-xs sm:text-sm max-w-lg leading-relaxed">
              Oʻzbekiston va jahon geografiyasi boʻyicha maktab darslik taqdimotlari (7–11-sinf), DTM va Milliy sertifikat sinov testlari platformasiga xush kelibsiz.
            </p>

            <div className="flex items-center gap-2.5 pt-1.5 flex-wrap">
              <button
                onClick={() => navigate('/school')}
                className="px-4 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-white/95 transition-all shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <GraduationCap size={16} weight="bold" />
                <span>Maktab taʼlimi darsliklari</span>
              </button>

              <button
                onClick={() => navigate('/tests')}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold text-xs transition-all flex items-center gap-1.5 active:scale-95 backdrop-blur-sm"
              >
                <BookOpen size={16} weight="bold" />
                <span>Sinov testlari</span>
              </button>
            </div>
          </div>

          {/* Interactive Detailed Globe in Hero */}
          <div className="hidden sm:flex flex-col items-center justify-center shrink-0">
            <EarthDetailedGlobe size={150} interactive={true} />
            <span className="text-[10px] text-sky-200/80 font-mono mt-1">Interaktiv Yer shari (aylantiring)</span>
          </div>
        </div>
      </div>

      {/* ── Key Sections Navigation Cards (Asosiy 4 bo'limga tezkor yo'naltirish) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          onClick={() => navigate('/tests')}
          className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <BookOpen size={20} weight="bold" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                Testlar
              </h2>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                DTM, Milliy sertifikat va attestatsiya
              </p>
            </div>
          </div>
          <div className="pt-3 flex items-center gap-1 text-[11px] font-bold text-[var(--primary)]">
            <span>Oʻtish</span>
            <ArrowRight size={12} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div
          onClick={() => navigate('/school')}
          className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <GraduationCap size={20} weight="bold" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-emerald-600 transition-colors">
                Maktab taʼlimi
              </h2>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                7, 8, 9, 10, 11-sinf taqdimotlari
              </p>
            </div>
          </div>
          <div className="pt-3 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
            <span>Oʻtish</span>
            <ArrowRight size={12} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div
          onClick={() => navigate('/library')}
          className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-purple-500/50 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Books size={20} weight="bold" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-purple-600 transition-colors">
                Kutubxona
              </h2>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                Elektron darsliklar va atlaslar
              </p>
            </div>
          </div>
          <div className="pt-3 flex items-center gap-1 text-[11px] font-bold text-purple-600">
            <span>Oʻtish</span>
            <ArrowRight size={12} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div
          onClick={() => navigate('/profile')}
          className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-amber-500/50 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <User size={20} weight="bold" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-amber-600 transition-colors">
                Shaxsiy profil
              </h2>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                Natijalar, ballar va sertifikatlar
              </p>
            </div>
          </div>
          <div className="pt-3 flex items-center gap-1 text-[11px] font-bold text-amber-600">
            <span>Oʻtish</span>
            <ArrowRight size={12} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* ── Plus va Pro: Maqsadingizga tezroq yeting ── */}
      <PlusProPromo />

      {/* ── CORE SECTION: E'LONLAR VA RASMIY BIZDIRISHNOMALAR (Client Main Requirement) ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                Bosh Sahifa Eʼlonlari
              </h2>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Platforma yangiliklari, maktab darslik taqdimotlari va rasmiy sinovlar
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {ANNOUNCEMENT_CATEGORIES.map(cat => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0',
                    isSelected
                      ? 'bg-[var(--primary)] text-white shadow-sm'
                      : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)]'
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Announcements List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAnnouncements.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAnnouncement(item)}
              className={cn(
                'p-5 rounded-2xl bg-[var(--surface)] border transition-all cursor-pointer flex flex-col justify-between gap-3 group shadow-sm',
                item.isPinned
                  ? 'border-[var(--primary)]/40 hover:border-[var(--primary)] bg-gradient-to-br from-[var(--surface)] to-[var(--primary-soft)]/20'
                  : 'border-[var(--border)] hover:border-[var(--border)] hover:shadow-md'
              )}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: `${item.categoryColor}15`,
                        color: item.categoryColor,
                      }}
                    >
                      {item.categoryLabel}
                    </span>
                    {item.isPinned && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-[var(--text-tertiary)] flex items-center gap-1 font-medium">
                    <Calendar size={12} weight="bold" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {item.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[var(--border)] text-xs">
                <span className="text-[11px] text-[var(--text-tertiary)] font-medium">
                  {item.author}
                </span>

                <button
                  type="button"
                  className="font-bold text-[var(--primary)] flex items-center gap-1 group-hover:underline"
                >
                  <span>Batafsil</span>
                  <ArrowRight size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Daily Stats ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Kunlik Statistika</h2>
          <span className="text-xs text-[var(--text-secondary)]">Bugun</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={StatIconXP}       label="Bugungi Ball"      value={`+${dailyStats.xpGained}`} detail="Bugun to'plangan" trend="+12%" />
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
        <div
          className="flex items-center gap-2.5 px-4 py-3 border-b"
          style={{ borderColor: 'var(--fact-border)' }}
        >
          <div
            className="w-7 h-7 rounded-[var(--radius-xs)] flex items-center justify-center shrink-0"
            style={{ background: 'var(--pal-milliy)' }}
          >
            <Globe size={14} style={{ color: '#326D62' }} />
          </div>
          <span className="text-xs font-bold flex-1" style={{ color: '#326D62' }}>
            Bugungi Geografiya Fakti
          </span>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'var(--pal-milliy)', color: '#326D62' }}
          >
            #bugun
          </span>
        </div>

        <div className="relative px-5 pt-4 pb-4">
          <p className="text-sm text-[var(--text-primary)] leading-relaxed relative z-10">
            {geographyFact.text}
          </p>
          <div
            className="flex items-center gap-2 mt-3 pt-3 border-t"
            style={{ borderColor: 'var(--fact-border)' }}
          >
            <BookOpen size={12} style={{ color: '#2F80ED', opacity: 0.6 }} />
            <span className="text-xs text-[var(--text-tertiary)]">{geographyFact.source}</span>
          </div>
        </div>
      </div>

      {/* ── Upcoming Exams ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Yaqinlashayotgan Imtihonlar</h2>
          <Link to="/tests" className="text-xs text-[var(--primary)] font-semibold hover:underline">
            Hammasi
          </Link>
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
            return (
              <Card key={exam.id} className="overflow-hidden cursor-pointer flex flex-col" onClick={() => navigate('/tests')}>
                <div className="flex items-center justify-between px-4 py-4" style={{ background: meta.bg }}>
                  <div className="flex flex-col gap-1">
                    <span
                      className="self-start text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: meta.color + '25', color: meta.color }}
                    >
                      {meta.label}
                    </span>
                    <p className="text-sm font-bold text-[var(--text-primary)] leading-snug">{exam.title}</p>
                  </div>
                  <Sticker size={48} color={meta.color} />
                </div>

                <CardContent className="p-4 flex flex-col gap-3 flex-1">
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

                  <div
                    className="flex items-center gap-3 rounded-[var(--radius-xs)] px-3 py-2 mt-auto"
                    style={{ background: countBg }}
                  >
                    <div className="flex items-baseline gap-1 leading-none">
                      <span className="text-2xl font-black" style={{ color: countColor }}>{exam.daysLeft}</span>
                      <span className="text-xs font-bold" style={{ color: countColor }}> kun qoldi</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ── Popular Games ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Ommabop O'yinlar</h2>
          <Link to="/games" className="text-xs text-[var(--primary)] font-semibold hover:underline">
            Hammasi
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {popularGames.map((game) => {
            const Icon = gameIcons[game.icon] || Sparkle;
            return (
              <Card key={game.id} className="overflow-hidden cursor-pointer" onClick={() => navigate(`/games/play/${game.slug}`)}>
                <div className="h-20 flex items-center justify-center" style={{ background: `${game.color}1F` }}>
                  <Icon size={34} style={{ color: game.color }} weight="fill" />
                </div>
                <CardContent className="p-4">
                  <p className="text-sm font-bold text-[var(--text-primary)] leading-tight">{game.title}</p>
                  <p className="text-xs text-[var(--text-tertiary)] leading-snug mt-1 line-clamp-2">{game.description}</p>
                  <Button size="sm" className="w-full mt-3" onClick={(e) => { e.stopPropagation(); navigate(`/games/play/${game.slug}`); }}>
                    <Play size={12} weight="fill" /> O'ynash
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ── Hududlar bo'yicha foydalanuvchilar geografiyasi (Robocontest style) ── */}
      <UserGeographyMap />

      {/* ── Creator Manifesto & Colophon (dhh.dk & omarchy.org inspired) ── */}
      <div className="pt-2">
        <Link
          to="/creator"
          className="group block p-5 sm:p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] transition-all duration-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-[var(--primary)] font-bold">
                <Terminal size={15} weight="bold" />
                <span>GEOBEK.UZ // CREATOR MANIFESTO</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] font-serif">
                «Nega GeoBek yaratildi? Reklamasiz taʼlim va veb-hunarmandchilik»
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-sans max-w-2xl leading-relaxed">
                Loyiha muallifi Ibrohimjon Mamirovning shaxsiy manifesti, texnik arxitektura va Oʻzbekiston geografiya taʼlimi falsafasi.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] group-hover:translate-x-1 transition-transform">
              <span>Manifestni oʻqish</span>
              <ArrowRight size={14} weight="bold" />
            </div>
          </div>
        </Link>
      </div>

      {/* ── Full Announcement Modal ── */}
      <AnimatePresence>
        {selectedAnnouncement && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedAnnouncement(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--border)]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: `${selectedAnnouncement.categoryColor}15`,
                        color: selectedAnnouncement.categoryColor,
                      }}
                    >
                      {selectedAnnouncement.categoryLabel}
                    </span>
                    <span className="text-[11px] text-[var(--text-tertiary)]">
                      {selectedAnnouncement.date} • {selectedAnnouncement.time}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-snug">
                    {selectedAnnouncement.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="w-8 h-8 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] shrink-0"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              <div className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-line py-2">
                {selectedAnnouncement.content}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-xs">
                <span className="text-xs font-semibold text-[var(--text-secondary)]">
                  {selectedAnnouncement.author}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedAnnouncement(null)}
                    className="px-3.5 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--background)] transition-all"
                  >
                    Yopish
                  </button>

                  {selectedAnnouncement.actionLink && (
                    <button
                      onClick={() => {
                        const link = selectedAnnouncement.actionLink;
                        setSelectedAnnouncement(null);
                        navigate(link);
                      }}
                      className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>{selectedAnnouncement.actionText || 'Koʻrish'}</span>
                      <ArrowRight size={13} weight="bold" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
