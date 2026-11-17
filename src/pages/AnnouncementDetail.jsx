import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, Eye, ShareNetwork, Check,
  ArrowRight, Megaphone, CaretRight, CaretLeft,
  Image as ImageIcon, VideoCamera
} from '@phosphor-icons/react';
import SEO from '../components/SEO';
import { getAnnouncementById, getRecentAnnouncements } from '../data/announcementsData';
import { cn } from '../lib/utils';

export default function AnnouncementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const announcement = getAnnouncementById(id);
  const otherAnnouncements = getRecentAnnouncements(3, announcement?.id);

  const mediaList = announcement?.media && announcement.media.length > 0
    ? announcement.media
    : (announcement?.coverImage ? [{ type: 'image', url: announcement.coverImage, caption: announcement.title }] : []);

  const totalSlides = mediaList.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: announcement?.title || 'Eʼlon',
          text: announcement?.summary || '',
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignored
    }
  };

  if (!announcement) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <SEO
          title="Eʼlon topilmadi — GEOBEK"
          description="Soʻralgan eʼlon mavjud emas yoki oʻchirilgan boʻlishi mumkin."
          url={`/announcements/${id}`}
        />
        <div className="w-14 h-14 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mx-auto text-[var(--text-tertiary)] shadow-xs">
          <Megaphone size={28} />
        </div>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">Eʼlon topilmadi</h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
          Siz qidirayotgan eʼlon mavjud emas yoki boshqa manzilga koʻchirilgan boʻlishi mumkin.
        </p>
        <Link
          to="/announcements"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold hover:bg-[var(--primary-hover)] transition-all shadow-xs"
        >
          <ArrowLeft size={14} weight="bold" />
          <span>Barcha eʼlonlarga qaytish</span>
        </Link>
      </div>
    );
  }

  // Format content paragraphs
  const paragraphs = announcement.content
    ? announcement.content.split('\n\n').filter((p) => p.trim().length > 0)
    : [announcement.summary];

  const activeMedia = mediaList[currentSlide] || null;

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      <SEO
        title={`${announcement.title} — GEOBEK Eʼlonlar`}
        description={announcement.summary}
        url={`/announcements/${announcement.id}`}
      />

      {/* ── Top Navigation Bar: Breadcrumbs & Back ── */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <nav aria-label="Non ushoqlari (breadcrumbs)" className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] overflow-x-auto scrollbar-none py-1">
          <Link to="/" className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap">
            Bosh sahifa
          </Link>
          <CaretRight size={10} weight="bold" />
          <Link to="/announcements" className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap">
            Eʼlonlar
          </Link>
          <CaretRight size={10} weight="bold" />
          <span className="text-[var(--text-secondary)] font-medium truncate max-w-[140px] sm:max-w-[220px]">
            {announcement.categoryLabel}
          </span>
        </nav>

        <button
          type="button"
          onClick={() => navigate('/announcements')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0 cursor-pointer"
        >
          <ArrowLeft size={13} weight="bold" />
          <span className="hidden sm:inline">Barcha eʼlonlar</span>
          <span className="sm:hidden">Orqaga</span>
        </button>
      </div>

      {/* ── Main Announcement Article Container ── */}
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-8 shadow-xs space-y-6"
      >
        {/* Header Metadata */}
        <header className="space-y-3.5 border-b border-[var(--border)] pb-5">
          <div className="flex items-center justify-between gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--primary)]/20">
              <span className="size-1.5 rounded-full bg-[var(--primary)] shrink-0" />
              <span>{announcement.categoryLabel}</span>
            </span>

            <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)] font-medium">
              <span className="inline-flex items-center gap-1">
                <Clock size={13} weight="regular" />
                <span>{announcement.date}</span>
                {announcement.time && <span className="opacity-70">• {announcement.time}</span>}
              </span>
              <span className="inline-flex items-center gap-1">
                <Eye size={13} weight="regular" />
                <span>{announcement.views.toLocaleString()}</span>
              </span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)] leading-tight tracking-tight">
            {announcement.title}
          </h1>

          {/* Author info & Share button */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] truncate">
                {announcement.author}
              </p>
              {announcement.authorRole && (
                <p className="text-[11px] text-[var(--text-tertiary)] truncate">
                  {announcement.authorRole}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleShare}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border transition-all cursor-pointer shadow-2xs',
                copied
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : 'bg-[var(--background)] hover:bg-[var(--surface-raised)] text-[var(--text-secondary)] border-[var(--border)]'
              )}
              title="Eʼlon havolasini ulashish"
            >
              {copied ? (
                <>
                  <Check size={14} weight="bold" />
                  <span>Nusxalandi</span>
                </>
              ) : (
                <>
                  <ShareNetwork size={14} weight="bold" />
                  <span>Ulashish</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* ── Media Slider (Rasm va videolar slayderi) ── */}
        {totalSlides > 0 && (
          <div className="space-y-2.5">
            <div className="relative overflow-hidden rounded-2xl bg-black/90 aspect-video sm:max-h-[460px] flex items-center justify-center group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {activeMedia.type === 'video' ? (
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      src={activeMedia.url}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={activeMedia.url}
                      alt={activeMedia.caption || announcement.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls (agar 1 tadan ko'p media bo'lsa) */}
              {totalSlides > 1 && (
                <>
                  {/* Prev button */}
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-md"
                    aria-label="Oldingi media"
                  >
                    <CaretLeft size={20} weight="bold" />
                  </button>

                  {/* Next button */}
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-md"
                    aria-label="Keyingi media"
                  >
                    <CaretRight size={20} weight="bold" />
                  </button>

                  {/* Slide Counter Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-semibold backdrop-blur-sm flex items-center gap-1.5 shadow-sm">
                    {activeMedia.type === 'video' ? (
                      <VideoCamera size={13} weight="fill" />
                    ) : (
                      <ImageIcon size={13} weight="fill" />
                    )}
                    <span>
                      {currentSlide + 1} / {totalSlides}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Media Caption & Thumbnail Strip (agar 1 tadan ko'p bo'lsa) */}
            <div className="space-y-2">
              {activeMedia.caption && (
                <p className="text-xs text-[var(--text-tertiary)] italic px-1 text-center sm:text-left">
                  {activeMedia.caption}
                </p>
              )}

              {totalSlides > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
                  {mediaList.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={cn(
                        'relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-[var(--background)]',
                        currentSlide === idx
                          ? 'border-[var(--primary)] scale-105 shadow-xs'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      )}
                    >
                      {item.type === 'video' ? (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white">
                          <VideoCamera size={18} weight="fill" />
                        </div>
                      ) : (
                        <img
                          src={item.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="space-y-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          {paragraphs.map((paragraph, idx) => {
            const lines = paragraph.split('\n');
            const isList = lines.length > 1 && lines.some((l) => l.trim().startsWith('•') || l.trim().startsWith('-') || /^\d+\./.test(l.trim()));

            if (isList) {
              return (
                <div key={idx} className="space-y-2 py-1">
                  {lines.map((line, lineIdx) => {
                    const cleanLine = line.trim();
                    if (!cleanLine) return null;
                    const isBullet = cleanLine.startsWith('•') || cleanLine.startsWith('-');
                    const isNumbered = /^\d+\./.test(cleanLine);

                    if (isBullet || isNumbered) {
                      return (
                        <div key={lineIdx} className="flex items-start gap-2.5 pl-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                          <span className="text-[var(--text-primary)]">
                            {cleanLine.replace(/^[•-]\s*/, '').replace(/^\d+\.\s*/, '')}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <p key={lineIdx} className="font-semibold text-[var(--text-primary)] mt-2">
                        {cleanLine}
                      </p>
                    );
                  })}
                </div>
              );
            }

            return (
              <p key={idx} className="text-[var(--text-primary)]/90 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Action Call to Action Card (if actionLink exists) */}
        {announcement.actionLink && (
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[var(--primary-soft)] to-transparent border border-[var(--primary-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
                Tegishli boʻlimga oʻtish
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Ushbu eʼlon boʻyicha materiallar va resurslardan toʻliq foydalaning.
              </p>
            </div>

            <Link
              to={announcement.actionLink}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-all shadow-xs shrink-0"
            >
              <span>{announcement.actionText || 'Boʻlimga oʻtish'}</span>
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3">
          <Link
            to="/announcements"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft size={13} weight="bold" />
            <span>Barcha eʼlonlar roʻyxati</span>
          </Link>
        </div>
      </motion.article>

      {/* ── Other Announcements Section ── */}
      {otherAnnouncements.length > 0 && (
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
              Boshqa eʼlonlar
            </h2>
            <Link
              to="/announcements"
              className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
            >
              <span>Barchasini koʻrish</span>
              <ArrowRight size={12} weight="bold" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {otherAnnouncements.map((item) => (
              <Link
                key={item.id}
                to={`/announcements/${item.id}`}
                className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/40 hover:shadow-xs transition-all flex flex-col justify-between gap-3 group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--primary)]/20">
                      <span className="size-1 rounded-full bg-[var(--primary)] shrink-0" />
                      <span>{item.categoryLabel}</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-tertiary)]">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-tertiary)] truncate max-w-[120px]">
                    {item.author}
                  </span>
                  <span className="text-[var(--primary)] font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Batafsil</span>
                    <ArrowRight size={10} weight="bold" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
