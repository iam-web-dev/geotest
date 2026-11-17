import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import {
  Globe, ArrowRight,
  Lightning, Target, Clock, Exam,
  CaretRight
} from '@phosphor-icons/react';
import {
  StickerMilliyBadge, StickerDTMRocket, StickerOlympiadTrophy, StickerAttestationShield,
} from '../components/illustrations/GeoIllustrations';
import EarthDetailedGlobe from '../components/EarthDetailedGlobe';
import UserGeographyMap from '../components/home/UserGeographyMap';
import AnnouncementsCarousel from '../components/home/AnnouncementsCarousel';
import PoweredByNSD from '../components/PoweredByNSD';
import {
  dailyStats,
  upcomingExams, geographyFact,
  user
} from '../data/mockData';
import { getDifficultyLabel, cn } from '../lib/utils';

function StatCard({ icon: Icon, label, value, iconColor, iconBg }) {
  return (
    <div className="group bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-3.5 sm:p-4.5 transition-all duration-200 hover:border-[var(--primary)]/40 hover:shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
        <span className="text-xs sm:text-[13px] font-semibold text-[var(--text-secondary)] tracking-tight leading-tight">
          {label}
        </span>
        <div
          className={cn(
            "size-8 sm:size-8.5 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105",
            iconBg || "bg-[var(--primary-soft)]",
            iconColor || "text-[var(--primary)]"
          )}
        >
          <Icon size={18} weight="bold" />
        </div>
      </div>
      <div>
        <p className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tabular-nums tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

const testStickers = {
  milliy:      { Sticker: StickerMilliyBadge,      label: 'Milliy Sertifikat' },
  dtm:         { Sticker: StickerDTMRocket,         label: 'DTM' },
  olympiad:    { Sticker: StickerOlympiadTrophy,    label: 'Olimpiada' },
  attestation: { Sticker: StickerAttestationShield, label: 'Attestatsiya' },
};

export default function Home() {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const activeUser = authUser || user;

  const [globeSize, setGlobeSize] = useState(() => {
    if (typeof window === 'undefined') return 600;
    if (window.innerWidth >= 1024) return 680;
    if (window.innerWidth >= 640) return 520;
    return 380;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setGlobeSize(680);
      else if (window.innerWidth >= 640) setGlobeSize(520);
      else setGlobeSize(380);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 relative">
      <SEO
        title="Bosh Sahifa — GEOBEK Rasmiy Geografiya Ta'lim Portali"
        description="GEOBEK platformasining maktab darslik taqdimotlari, DTM va Milliy sertifikat sinov testlari hamda hududlar statistikasi."
        url="/"
      />

      {/* ── Fixed Ambient Background Globe ── */}
      <div
        className="fixed -right-20 -bottom-20 sm:-right-28 sm:-bottom-28 lg:-right-36 lg:-bottom-36 pointer-events-none select-none opacity-30 dark:opacity-25 z-0 transition-opacity duration-500"
        aria-hidden="true"
      >
        <EarthDetailedGlobe size={globeSize} interactive={false} />
      </div>

      {/* 1. Welcome Greeting */}
      <section className="relative z-10 pt-2 pb-1 space-y-1 sm:space-y-1.5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
          Salom,
          <span className="text-[var(--primary)]">
          {activeUser?.name ? ` ${activeUser.name} 👋` : ''}
          </span>
          <br />
          <span className="text-[var(--primary)] font-bold text-xl sm:text-2xl lg:text-3xl">
            GEOBEK <span className='text-[var(--text-primary)]'>ga xush kelibsiz!</span>
          </span>
        </h1>
      </section>

      {/* 2. Kunlik Koʻrsatkichlar (Daily Stats) */}
      <section className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)] tracking-tight">
            Kunlik koʻrsatkichlar
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <StatCard
            icon={Lightning}
            label="Bugungi ball"
            value={`+${dailyStats.xpGained} XP`}
            iconColor="text-amber-500 dark:text-amber-400"
            iconBg="bg-amber-500/10 dark:bg-amber-400/15"
          />
          <StatCard
            icon={Target}
            label="Aniqlik darajasi"
            value={`${dailyStats.accuracy}%`}
            iconColor="text-emerald-500 dark:text-emerald-400"
            iconBg="bg-emerald-500/10 dark:bg-emerald-400/15"
          />
          <StatCard
            icon={Clock}
            label="Oʻqish vaqti"
            value={dailyStats.studyTime}
            iconColor="text-sky-500 dark:text-sky-400"
            iconBg="bg-sky-500/10 dark:bg-sky-400/15"
          />
          <StatCard
            icon={Exam}
            label="Bajarilgan testlar"
            value={`${dailyStats.testsDone} ta`}
            iconColor="text-violet-500 dark:text-violet-400"
            iconBg="bg-violet-500/10 dark:bg-violet-400/15"
          />
        </div>
      </section>

      {/* 3. E'lonlar va yangiliklar (Karusel) */}
      <div className="relative z-10">
        <AnnouncementsCarousel />
      </div>

      {/* 4. Geografik kun fakti (Daily Geography Fact) */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 relative z-10 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)]">
          <Globe size={15} weight="bold" />
          <span>Bugungi geografiya fakti</span>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed text-pretty">
          «{geographyFact.text}»
        </p>
        <div className="text-[11px] text-[var(--text-tertiary)] pt-0.5">
          Manba: {geographyFact.source}
        </div>
      </section>

      {/* 5. Imtihonlar (Yaqinlashayotgan Imtihonlar & Sinovlar) */}
      <section className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)] tracking-tight">
              Yaqinlashayotgan imtihonlar
            </h2>
          </div>
          <Link
            to="/tests"
            className="text-xs font-semibold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
          >
            <span>Barcha testlar</span>
            <ArrowRight size={12} weight="bold" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {upcomingExams.map((exam) => {
            const meta = testStickers[exam.type] || testStickers.milliy;
            const { Sticker } = meta;
            const isUrgent = exam.daysLeft <= 7;
            const diffLabel = getDifficultyLabel(exam.difficulty);

            return (
              <div
                key={exam.id}
                onClick={() => navigate('/tests')}
                className="group cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 flex flex-col justify-between gap-3 transition-colors hover:border-[var(--primary)]/60"
              >
                <div>
                  {/* Top: Original Test Sticker & Countdown Badge */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="shrink-0">
                      <Sticker size={44} color="#1E5BF8" />
                    </div>
                    <span
                      className={cn(
                        'text-xs font-bold px-2.5 py-1 rounded-full tabular-nums',
                        isUrgent
                          ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                          : 'bg-[var(--primary-soft)] text-[var(--primary)]'
                      )}
                    >
                      {exam.daysLeft} kun qoldi
                    </span>
                  </div>

                  {/* Title & Metadata */}
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                    {exam.title}
                  </h3>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1 font-medium">
                    {exam.questions} savol · {exam.time} daqiqa · {diffLabel}
                  </p>
                </div>

                {/* Footer: Date & Direct Action */}
                <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] pt-3 border-t border-[var(--border)]">
                  <span>{exam.date}</span>
                  <span className="font-semibold text-[var(--primary)] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Sinovdan oʻtish</span>
                    <CaretRight size={12} weight="bold" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Foydalanuvchilar geografiyasi */}
      <div className="relative z-10">
        <UserGeographyMap />
      </div>

      {/* 7. Footer / Powered by NSD Corporation & Partner Logos */}
      <footer className="relative z-10 pt-8 pb-6 mt-12 border-t border-[var(--border)]">
        <PoweredByNSD />
      </footer>
    </div>
  );
}
