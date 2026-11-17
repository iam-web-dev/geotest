import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Clock, ArrowRight
} from '@phosphor-icons/react';
import { announcements, ANNOUNCEMENT_CATEGORIES } from '../../data/announcementsData';
import { cn } from '../../lib/utils';

export default function AnnouncementsCards() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredAnnouncements = useMemo(() => {
    if (activeCategory === 'all') return announcements;
    return announcements.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-3">
      {/* ── Header: Title & Category Filters ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
          <h2 className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
            Eʼlonlar va yangiliklar
          </h2>
          <span className="text-[11px] font-medium text-[var(--text-tertiary)] px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)]">
            {filteredAnnouncements.length} ta
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {ANNOUNCEMENT_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer',
                  isSelected
                    ? 'bg-[var(--primary)] text-white shadow-xs'
                    : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--primary-border)]'
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Separate Announcement Cards Grid (Text-only on home) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredAnnouncements.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/announcements/${item.id}`)}
            className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/40 hover:shadow-xs transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 group shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] border border-[var(--primary)]/20">
                  <span className="size-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                  <span>{item.categoryLabel}</span>
                </span>

                <span className="text-[11px] text-[var(--text-tertiary)] flex items-center gap-1 font-medium">
                  <Clock size={12} weight="regular" />
                  <span>{item.date}</span>
                </span>
              </div>

              <h3 className="text-sm sm:text-[15px] font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors leading-snug line-clamp-2">
                {item.title}
              </h3>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                {item.summary}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border)] text-xs">
              <span className="text-[11px] text-[var(--text-tertiary)] font-medium truncate max-w-[180px]">
                {item.author}
              </span>

              <Link
                to={`/announcements/${item.id}`}
                onClick={(e) => e.stopPropagation()}
                className="font-semibold text-xs text-[var(--primary)] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Batafsil</span>
                <ArrowRight size={13} weight="bold" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
