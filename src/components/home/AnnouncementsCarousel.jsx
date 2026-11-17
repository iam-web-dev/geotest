import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CaretLeft, CaretRight, Clock, ArrowRight
} from '@phosphor-icons/react';
import { announcements } from '../../data/announcementsData';
import { cn } from '../../lib/utils';

// Sliderda faqat eng yangi 3 ta e'lon ko'rsatiladi
const latestAnnouncements = announcements.slice(0, 3);

export default function AnnouncementsCarousel() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = latestAnnouncements.length;
  const timerRef = useRef(null);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      handleNext();
    }, 5500);

    return () => clearInterval(timerRef.current);
  }, [isPaused, handleNext]);

  const currentItem = latestAnnouncements[currentIndex] || latestAnnouncements[0];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] },
    }),
  };

  const handleOpenDetail = () => {
    navigate(`/announcements/${currentItem.id}`);
  };

  return (
    <section
      className="space-y-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Eʼlonlar va yangiliklar karuseli"
    >
      {/* ── Header: Title, All Link & Navigation ── */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)] tracking-tight">
          Eʼlonlar va yangiliklar
        </h2>

        <div className="flex items-center gap-2">
          {/* Carousel controls: Prev / Next */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              className="size-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              aria-label="Oldingi e'lon"
            >
              <CaretLeft size={15} weight="bold" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="size-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              aria-label="Keyingi e'lon"
            >
              <CaretRight size={15} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Active Carousel Card ── */}
      <div className="relative overflow-hidden rounded-xl bg-[var(--surface)] border border-[var(--border)] transition-colors">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentItem.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="p-5 sm:p-6 cursor-pointer flex flex-col justify-between gap-4 group"
            onClick={handleOpenDetail}
          >
            <div className="space-y-3">
              {/* Category, Date & Counter */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[var(--primary)]">
                    {currentItem.categoryLabel}
                  </span>
                  <span className="text-[var(--text-tertiary)]">•</span>
                  <span className="text-[var(--text-tertiary)] font-medium flex items-center gap-1">
                    <Clock size={13} weight="regular" />
                    <span>{currentItem.date}</span>
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                {currentItem.title}
              </h3>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 sm:line-clamp-3">
                {currentItem.summary}
              </p>
            </div>

            {/* Footer with author and CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-xs">
              <span className="text-[11px] sm:text-xs text-[var(--text-tertiary)] font-medium truncate max-w-[200px] sm:max-w-none">
                {currentItem.author}
              </span>

              <span className="font-semibold text-xs text-[var(--primary)] inline-flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform">
                <span>Batafsil oʻqish</span>
                <ArrowRight size={13} weight="bold" />
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots Bar (3 dots for 3 slides) */}
        <div className="flex items-center justify-center gap-1.5 pb-3">
          {latestAnnouncements.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSlide(idx)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                idx === currentIndex
                  ? 'w-6 bg-[var(--primary)]'
                  : 'w-1.5 bg-[var(--border)] hover:bg-[var(--text-tertiary)]'
              )}
              aria-label={`Slayd ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
