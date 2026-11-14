import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen, Globe, ArrowRight,
  Megaphone, GraduationCap,
  Lightning, Target, Clock, Exam
} from '@phosphor-icons/react';
import {
  StickerMilliyBadge, StickerDTMRocket, StickerOlympiadTrophy, StickerAttestationShield,
} from '../components/illustrations/GeoIllustrations';
import EarthDetailedGlobe from '../components/EarthDetailedGlobe';
import PlusProPromo from '../components/home/PlusProPromo';
import UserGeographyMap from '../components/home/UserGeographyMap';
import { Card, CardContent } from '../components/ui/Card';
import {
  dailyStats,
  upcomingExams, geographyFact,
  user
} from '../data/mockData';
import { getDifficultyColor, getDifficultyLabel, cn } from '../lib/utils';

function StatCard({ icon: Icon, label, value, detail, trend, color, bg, border, glowColor }) {
  return (
    <div className="relative bg-[var(--surface)] rounded-xl border border-[var(--border)] p-3.5 sm:p-4 overflow-hidden transition-all duration-200 hover:border-[var(--primary)]/30 hover:shadow-xs group">
      {/* Subtle corner watermark */}
      <div
        className="absolute -right-3 -bottom-3 w-16 h-16 rounded-full pointer-events-none flex items-center justify-center transition-transform group-hover:scale-105 duration-300"
        style={{ background: glowColor, opacity: 0.08 }}
      >
        <Icon size={34} weight="duotone" className="opacity-40" style={{ color: glowColor }} />
      </div>

      <div className="flex items-start justify-between mb-2.5 relative z-10">
        <div
          className={cn(
            'size-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 duration-200',
            bg,
            border
          )}
        >
          <Icon size={20} weight="duotone" className={color} />
        </div>
        {trend && (
          <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>

      <div className="relative z-10">
        <p className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tabular-nums leading-tight">
          {value}
        </p>
        <p className="text-xs font-medium text-[var(--text-secondary)] mt-1">
          {label}
        </p>
        {detail && (
          <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5 line-clamp-1">
            {detail}
          </p>
        )}
      </div>
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

  return (
    <div className="space-y-8">
      <SEO
        title="Boş Sahifa — GeoBek Rasmiy Geografiya Ta'lim Portali"
        description="GeoBek platformasining maktab darslik taqdimotlari, DTM va Milliy sertifikat sinov testlari hamda hududlar statistikasi."
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
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Salom, {activeUser.name}!
            </h1>
            <p className="text-white/85 text-xs sm:text-sm max-w-lg leading-relaxed">
              Özbekiston va jahon geografiyasi böyiça maktab darslik taqdimotlari (7–11-sinf), DTM va Milliy sertifikat sinov testlari platformasiga xuş kelibsiz.
            </p>

            {/* <div className="flex items-center gap-2.5 pt-1.5 flex-wrap">
              <button
                onClick={() => navigate('/tests')}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold text-xs transition-all flex items-center gap-1.5 active:scale-95 backdrop-blur-sm"
              >
                <BookOpen size={16} weight="bold" />
                <span>Sinov testlari</span>
              </button>
            </div> */}
          </div>

          {/* Interactive Detailed Globe in Hero */}
          <div className="hidden sm:flex flex-col items-center justify-center shrink-0">
            <EarthDetailedGlobe size={150} interactive={true} />
          </div>
        </div>
      </div>

      {/* ── Daily Stats (Kunlik Körsatkiçlar - Directly Below Greeting) ── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
              Kunlik Körsatkiçlar
            </h2>
          </div>
          <span className="text-xs font-normal text-[var(--text-secondary)] px-2.5 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)]">
            Bugungi faollik
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            icon={Lightning}
            label="Bugungi Ball"
            value={`+${dailyStats.xpGained} XP`}
            detail="Bugun töplangan"
            trend="+12%"
            color="text-amber-500"
            bg="bg-amber-500/10"
            border="border border-amber-500/25"
            glowColor="#F59E0B"
          />
          <StatCard
            icon={Target}
            label="Töğrilik"
            value={`${dailyStats.accuracy}%`}
            detail={`${dailyStats.correctAnswers}/${dailyStats.questionsAnswered} savol töğri`}
            trend="Yuqori"
            color="text-emerald-500"
            bg="bg-emerald-500/10"
            border="border border-emerald-500/25"
            glowColor="#10B981"
          />
          <StatCard
            icon={Clock}
            label="Öqiş Vaqti"
            value={dailyStats.studyTime}
            detail="Bugun sarflandi"
            trend="+18%"
            color="text-sky-500"
            bg="bg-sky-500/10"
            border="border border-sky-500/25"
            glowColor="#0EA5E9"
          />
          <StatCard
            icon={Exam}
            label="Bajarilgan Test"
            value={`${dailyStats.testsDone} ta`}
            detail={`${dailyStats.quizzesDone} ta viktorina`}
            trend="Faol"
            color="text-purple-500"
            bg="bg-purple-500/10"
            border="border border-purple-500/25"
            glowColor="#8B5CF6"
          />
        </div>
      </div>

      {/* ── Upcoming Exams (Yaqinlashayotgan Imtihonlar & Sinovlar) ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Yaqinlaşayotgan Imtihonlar</h2>
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

      {/* ── Plus va Pro: Maqsadingizga tezroq yeting ── */}
      <PlusProPromo />


      {/* ── Geography Fact (Kunlik Geografik Fakt) ── */}
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

      {/* ── Hududlar böyiça foydalanuvçilar geografiyasi (Robocontest style) ── */}
      <UserGeographyMap />

      {/* ── Creator / Ustoz Qambarov O.X. & GeoBek ── */}
      <div className="pt-2">
        <Link
          to="/creator"
          className="group block p-5 sm:p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] transition-all duration-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-[var(--primary)] font-bold">
                <GraduationCap size={16} weight="bold" />
                <span>GEOBEK // MUALLIF VA ILMIY RAHBAR</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] font-serif">
                «Geograf ustoz Qambarov O.X. — GeoBek platformasi va taʼlim metodikasi»
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-sans max-w-2xl leading-relaxed">
                5–11-sinf maktab taqdimotlari muallifi, geografiya fani ustozi Qambarov O.X.ning hayot yöli, pedagogik tajribasi va taʼlim falsafasi.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] group-hover:translate-x-1 transition-transform">
              <span>Batafsil öqiş</span>
              <ArrowRight size={14} weight="bold" />
            </div>
          </div>
        </Link>
      </div>

    </div>
  );
}
