import { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import {
  MagnifyingGlass, BookOpen, Bookmark, Star,
  SortAscending, X, Users, ArrowSquareOut, DownloadSimple
} from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { libraryCategories, books as initialBooks } from '../data/mockData';

const TABS = [
  { id: 'all',      label: 'Barchasi' },
  { id: 'popular',  label: 'Eng koʻp oʻqilgan' },
  { id: 'saved',    label: 'Saqlanganlar' },
];

const SORTS = [
  { id: 'readers',   label: 'Oʻquvchilar soni' },
  { id: 'rating',    label: 'Reyting' },
  { id: 'downloads', label: 'Yuklab olish' },
  { id: 'year',      label: 'Yil' },
];

// ── BookCover ──────────────────────────────────────────────
function BookCover({ book }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-24 sm:w-28 h-32 sm:h-38 rounded-xl overflow-hidden shrink-0 border border-[var(--border)] bg-[var(--surface-raised)] shadow-sm group-hover:shadow transition-shadow">
      {book.coverUrl && !imgError ? (
        <img
          src={book.coverUrl}
          alt={book.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100 p-2.5 flex flex-col justify-between select-none">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">GEOBEK</span>
            <BookOpen size={14} className="text-[var(--primary)]" />
          </div>
          <p className="text-[10px] font-semibold leading-tight line-clamp-3 text-slate-200">{book.title}</p>
          <span className="text-[8px] text-slate-400 truncate">{book.author}</span>
        </div>
      )}
      {/* Format badge */}
      <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
        {book.type || 'PDF'}
      </span>
    </div>
  );
}

// ── BookCard ───────────────────────────────────────────────
function BookCard({ book, onBookmark, onRead }) {
  return (
    <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-200 overflow-hidden p-4 sm:p-5 flex flex-col justify-between group shadow-sm hover:shadow-md">
      <div>
        <div className="flex gap-3.5 sm:gap-4">
          <BookCover book={book} />

          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              {/* Category tag & bookmark */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--text-secondary)]">
                  {book.category}
                </span>

                <button
                  type="button"
                  onClick={() => onBookmark(book.id)}
                  aria-label={book.isBookmarked ? 'Saqlanganlardan oʻchirish' : 'Kitobni saqlash'}
                  className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--primary)] hover:bg-[var(--primary-soft)] transition-colors shrink-0"
                >
                  <Bookmark
                    size={17}
                    weight={book.isBookmarked ? 'fill' : 'regular'}
                    className={book.isBookmarked ? 'text-[var(--primary)]' : 'currentColor'}
                  />
                </button>
              </div>

              {/* Title & Author */}
              <h3 className="text-base sm:text-[17px] font-bold text-[var(--text-primary)] leading-snug line-clamp-2 mt-2 group-hover:text-[var(--primary)] transition-colors">
                {book.title}
              </h3>
              <p className="text-xs text-[var(--text-tertiary)] mt-1 font-medium truncate">
                {book.author}
              </p>
            </div>

            {/* Meta Row: Readers count (qancha odam o'qigani), Rating, Pages */}
            <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-[var(--border)] flex-wrap">
              {/* Readers count */}
              <div
                className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]"
                title={`${(book.readers || book.downloads || 0).toLocaleString()} kishi oʻqigan`}
              >
                <Users size={15} weight="bold" className="text-[var(--primary)] shrink-0" />
                <span className="font-semibold text-[var(--text-primary)] tabular-nums">
                  {(book.readers || book.downloads || 0).toLocaleString()}
                </span>
                <span className="text-[11px] text-[var(--text-tertiary)]">oʻquvchi</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                <Star size={13} weight="fill" className="text-amber-500 shrink-0" />
                <span className="font-semibold text-[var(--text-primary)] tabular-nums">{book.rating}</span>
              </div>

              {/* Pages */}
              <div className="text-xs text-[var(--text-tertiary)] tabular-nums">
                {book.pages} bet
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {book.description && (
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-3 leading-relaxed">
            {book.description}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3.5 border-t border-[var(--border)] flex items-center gap-2">
        <button
          type="button"
          onClick={() => onRead(book)}
          className="flex-1 h-9 sm:h-10 px-3 sm:px-4 rounded-xl bg-[var(--primary)] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all shadow-sm"
        >
          <ArrowSquareOut size={16} weight="bold" />
          <span>Onlayn oʻqish</span>
        </button>

        <a
          href={book.fileUrl || '/books/ozbekiston-geografiyasi.pdf'}
          download
          className="h-9 sm:h-10 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors shrink-0"
          title="PDF faylini yuklab olish"
          aria-label="PDF faylini yuklab olish"
        >
          <DownloadSimple size={16} weight="bold" />
          <span className="hidden sm:inline">Yuklab olish</span>
        </a>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────
export default function Library() {
  const [bookList, setBookList]       = useState(initialBooks);
  const [search, setSearch]           = useState('');
  const [activeTab, setActiveTab]     = useState('all');
  const [activeCat, setActiveCat]     = useState('all');
  const [sortBy, setSortBy]           = useState('readers');
  const [showSort, setShowSort]       = useState(false);

  const handleBookmark = (id) => {
    setBookList(prev => prev.map(b => b.id === id ? { ...b, isBookmarked: !b.isBookmarked } : b));
  };

  const handleRead = (book) => {
    const targetUrl = book.fileUrl || '/books/ozbekiston-geografiyasi.pdf';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const filtered = useMemo(() => {
    let list = bookList;
    if (activeTab === 'popular') list = [...list].sort((a, b) => (b.readers || 0) - (a.readers || 0));
    if (activeTab === 'saved')   list = list.filter(b => b.isBookmarked);
    if (activeCat !== 'all')     list = list.filter(b => b.category === activeCat);
    if (search.trim())           list = list.filter(b =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
    );

    if (activeTab !== 'popular') {
      return [...list].sort((a, b) => (b[sortBy] || 0) - (a[sortBy] || 0));
    }
    return list;
  }, [bookList, activeTab, activeCat, search, sortBy]);

  // Unified stats
  const totalBooks     = bookList.length;
  const totalReaders   = useMemo(() => bookList.reduce((acc, b) => acc + (b.readers || b.downloads || 0), 0), [bookList]);
  const totalDownloads = useMemo(() => bookList.reduce((acc, b) => acc + (b.downloads || 0), 0), [bookList]);
  const savedCount     = bookList.filter(b => b.isBookmarked).length;

  return (
    <div className="space-y-6">
      <SEO
        title="Geografiya Kutubxonasi"
        description="Geografiya darsliklari, atlaslar, oʻquv materiallari va ta'lim PDFlarini onlayn oʻqing va yuklab oling."
        url="/library"
      />

      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Kutubxona</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Geografiya boʻyicha barcha kitob va darsliklar</p>
      </div>

      {/* ── Stats banner (Static uniform colors) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Jami materiallar', value: totalBooks },
          { label: 'Jami mutolaa',     value: totalReaders.toLocaleString() },
          { label: 'Yuklab olishlar',  value: totalDownloads.toLocaleString() },
          { label: 'Saqlanganlar',     value: savedCount },
        ].map(s => (
          <div key={s.label} className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-3.5 text-center">
            <p className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tabular-nums">{s.value}</p>
            <p className="text-[11px] font-medium text-[var(--text-tertiary)] mt-1 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Search + Sort ── */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MagnifyingGlass size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Kitob yoki muallif qidirish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-9 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:outline-none transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              aria-label="Qidiruvni tozalash"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSort(v => !v)}
            className={cn(
              'h-11 px-3.5 rounded-[var(--radius)] border text-sm flex items-center gap-1.5 font-medium transition-colors',
              showSort
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
            )}
          >
            <SortAscending size={16} />
            <span className="hidden sm:inline">{SORTS.find(s => s.id === sortBy)?.label}</span>
          </button>
          {showSort && (
            <div className="absolute right-0 top-12 z-20 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] shadow-lg overflow-hidden min-w-[170px]">
              {SORTS.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSortBy(s.id); setShowSort(false); }}
                  className={cn(
                    'w-full text-left px-4 py-2.5 text-sm transition-colors',
                    sortBy === s.id
                      ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]'
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] p-1">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={cn(
              'flex-1 py-2 px-3 rounded-[var(--radius-xs)] text-sm font-medium transition-all',
              activeTab === t.id
                ? 'bg-[var(--primary)] text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Category chips (Static uniform colors) ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCat('all')}
          className={cn(
            'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all',
            activeCat === 'all'
              ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
              : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
          )}
        >
          Barchasi
        </button>
        {libraryCategories.map(cat => {
          const active = activeCat === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCat(active ? 'all' : cat.name)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all',
                active
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
              )}
            >
              {cat.name} · {cat.count}
            </button>
          );
        })}
      </div>

      {/* ── Book list ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-[var(--text-primary)]">
            {activeTab === 'popular' ? 'Eng koʻp oʻqilgan kitoblar'
              : activeTab === 'saved' ? 'Saqlangan kitoblar'
              : activeCat !== 'all' ? activeCat
              : 'Barcha materiallar'}
          </h2>
          <span className="text-xs text-[var(--text-tertiary)]">{filtered.length} ta</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--primary-soft)] flex items-center justify-center">
              <BookOpen size={28} className="text-[var(--primary)]" />
            </div>
            <p className="text-sm font-semibold text-[var(--text-secondary)]">
              {search ? 'Qidiruv boʻyicha hech narsa topilmadi' : 'Bu boʻlimda materiallar yoʻq'}
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-xs text-[var(--primary)] font-semibold underline underline-offset-2"
              >
                Qidiruvni tozalash
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onBookmark={handleBookmark}
                onRead={handleRead}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
