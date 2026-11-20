import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MagnifyingGlass, X, Clock, Eye, ArrowRight,
  Funnel, Image as ImageIcon
} from '@phosphor-icons/react';
import SEO from '../components/SEO';
import { announcements, ANNOUNCEMENT_CATEGORIES } from '../data/announcementsData';
import { cn } from '../lib/utils';

export default function Announcements() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      // Category filter (faqat real mavjud bo'lgan kategoriyalar bo'yicha)
      const matchCat = activeCategory === 'all' || item.category === activeCategory;

      // Search query match
      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchSearch =
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.author.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q);
      }

      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <SEO
        title="Eʼlonlar va Yangiliklar — GEOBEK Rasmiy Geografiya Platformasi"
        description="GEOBEK platformasining rasmiy eʼlonlari, yangilangan maktab darsliklari, taqdimotlar va test sinovlari."
        url="/announcements"
      />

      {/* ── Page Header ── */}
      <div className="space-y-1.5 pt-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Eʼlonlar va yangiliklar
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Geografiya fani boʻyicha yangilangan darsliklar, test sinovlari va muhim xabarlar.
        </p>
      </div>

      {/* ── Search & Category Filter Controls ── */}
      <div className="space-y-3">
        {/* Search Input */}
        <div className="relative">
          <MagnifyingGlass
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Eʼlonlar ichidan qidirish (mavzu, sana, muallif)..."
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:outline-none transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md text-[var(--text-tertiary)] hover:text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Qidiruvni tozalash"
            >
              <X size={14} weight="bold" />
            </button>
          )}
        </div>

        {/* Category Filter Pills (faqat kategoriya) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {ANNOUNCEMENT_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer',
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

      {/* ── Announcements Grid / List with Asosiy Rasm (Cover Image) ── */}
      {filteredAnnouncements.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[var(--background)] flex items-center justify-center mx-auto text-[var(--text-tertiary)]">
            <Funnel size={24} />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
            Mos keluvchi eʼlonlar topilmadi
          </h2>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
            Qidiruv soʻzini oʻzgartiring yoki filtrlarni tozalab koʻring.
          </p>
          {(searchQuery || activeCategory !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-all cursor-pointer"
            >
              Filtrlarni tozalash
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAnnouncements.map((item, index) => {
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                onClick={() => navigate(`/announcements/${item.id}`)}
                className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/40 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between group shadow-xs"
              >
                {/* ── Asosiy Rasm (Cover Image) ── */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[var(--background)] shrink-0">
                  {item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center bg-[var(--primary-soft)]"
                    >
                      <ImageIcon size={44} weight="duotone" className="text-[var(--primary)] opacity-40" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Category Pill on top of cover image */}
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs bg-[var(--primary)] text-white">
                    {item.categoryLabel}
                  </span>

                  <span className="absolute bottom-2.5 right-3 text-[11px] font-medium text-white/90 drop-shadow flex items-center gap-1">
                    <Clock size={12} weight="bold" />
                    <span>{item.date}</span>
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                  <div className="space-y-1.5">
                    <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h2>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border)] text-xs">
                    <div className="flex items-center gap-2 text-[11px] text-[var(--text-tertiary)] font-medium">
                      <span className="truncate max-w-[130px] sm:max-w-[170px]">{item.author}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1">
                        <Eye size={12} />
                        <span>{item.views.toLocaleString()}</span>
                      </span>
                    </div>

                    <Link
                      to={`/announcements/${item.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-bold text-xs text-[var(--primary)] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Batafsil</span>
                      <ArrowRight size={13} weight="bold" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}
