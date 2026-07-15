import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MagnifyingGlass, BookOpen, Download, Bookmark, Star,
  Book, FileText, Notebook, SortAscending, X,
} from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { ProgressBar } from '../components/ui/Progress';
import { libraryCategories, books as initialBooks } from '../data/mockData';

// ── category meta ──────────────────────────────────────────
const catMeta = {
  Darslik:     { color: '#2563EB', bg: '#EFF6FF', icon: BookOpen },
  Abituriyent: { color: '#7C3AED', bg: '#F5F3FF', icon: Notebook },
  Maktab:      { color: '#16A34A', bg: '#F0FDF4', icon: Book },
  Olimpiada:   { color: '#D97706', bg: '#FFFBEB', icon: Star },
  Atlas:       { color: '#DC2626', bg: '#FEF2F2', icon: FileText },
  Maqola:      { color: '#0891B2', bg: '#ECFEFF', icon: FileText },
};

const TABS = [
  { id: 'all',      label: 'Barchasi' },
  { id: 'reading',  label: "O'qilayotgan" },
  { id: 'saved',    label: 'Saqlangan' },
];

const SORTS = [
  { id: 'rating',    label: 'Reyting' },
  { id: 'downloads', label: 'Yuklab olish' },
  { id: 'year',      label: 'Yil' },
];

// ── BookCover ──────────────────────────────────────────────
function BookCover({ book, size = 'md' }) {
  const meta = catMeta[book.category] || { color: '#2563EB', bg: '#EFF6FF', icon: BookOpen };
  const Icon = meta.icon;
  const dim = size === 'sm' ? 'w-12 h-16' : 'w-16 h-[88px]';
  const iconSize = size === 'sm' ? 20 : 26;

  if (book.coverUrl) {
    return (
      <img
        src={book.coverUrl}
        alt={book.title}
        className={cn('rounded-[10px] shrink-0 object-cover', dim)}
        style={{ border: `1.5px solid ${meta.color}30` }}
      />
    );
  }
  return (
    <div
      className={cn('rounded-[10px] flex items-center justify-center shrink-0 relative overflow-hidden', dim)}
      style={{ background: `linear-gradient(145deg, ${meta.color}22 0%, ${meta.color}44 100%)`, border: `1.5px solid ${meta.color}30` }}
    >
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, white 0%, transparent 40%)`, opacity: 0.12 }} />
      <Icon size={iconSize} style={{ color: meta.color }} weight="duotone" />
      <div className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-[10px]" style={{ background: meta.color, opacity: 0.4 }} />
    </div>
  );
}

// ── BookCard ───────────────────────────────────────────────
function BookCard({ book, onBookmark, onRead }) {
  const meta = catMeta[book.category] || { color: '#2563EB', bg: '#EFF6FF' };
  const progress = book.pages > 0 ? Math.round((book.readPages / book.pages) * 100) : 0;
  const isReading = book.readPages > 0 && book.readPages < book.pages;
  const isDone    = book.readPages >= book.pages;

  return (
    <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] p-4 flex gap-4 hover:border-[var(--primary)] transition-colors group">
      <BookCover book={book} />

      <div className="flex-1 min-w-0">
        {/* top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug line-clamp-2">{book.title}</p>
            <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">{book.author}</p>
          </div>
          <button
            onClick={() => onBookmark(book.id)}
            className="shrink-0 p-1 -mr-1 -mt-1 rounded-lg hover:bg-[var(--primary-soft)] transition-colors"
          >
            <Bookmark
              size={16}
              weight={book.isBookmarked ? 'fill' : 'regular'}
              style={{ color: book.isBookmarked ? meta.color : 'var(--text-tertiary)' }}
            />
          </button>
        </div>

        {/* meta chips */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: meta.bg, color: meta.color }}
          >
            {book.category}
          </span>
          <span className="flex items-center gap-0.5 text-[10px] text-[var(--text-tertiary)]">
            <Star size={10} weight="fill" style={{ color: '#D97706' }} />
            {book.rating}
          </span>
          <span className="text-[10px] text-[var(--text-tertiary)]">{book.pages} bet</span>
          <span className="text-[10px] text-[var(--text-tertiary)]">
            <Download size={9} className="inline mr-0.5" />
            {(book.downloads / 1000).toFixed(1)}k
          </span>
        </div>

        {/* progress */}
        {(isReading || isDone) && (
          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[10px] mb-1" style={{ color: meta.color }}>
              <span>{isDone ? "✓ Tugatildi" : `${progress}% o'qildi`}</span>
              {!isDone && <span className="text-[var(--text-tertiary)]">{book.readPages}/{book.pages} bet</span>}
            </div>
            <ProgressBar value={progress} size="sm" color={isDone ? '#16A34A' : meta.color} />
          </div>
        )}

        {/* actions */}
        <div className="flex items-center gap-2 mt-3">
          {isReading ? (
            <button
              onClick={() => onRead(book.id)}
              className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style={{ background: meta.bg, color: meta.color }}
            >
              <BookOpen size={12} /> Davom etish
            </button>
          ) : isDone ? (
            <button
              onClick={() => onRead(book.id)}
              className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style={{ background: '#F0FDF4', color: '#16A34A' }}
            >
              <BookOpen size={12} /> Qayta o'qish
            </button>
          ) : (
            <button
              onClick={() => onRead(book.id)}
              className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style={{ background: meta.bg, color: meta.color }}
            >
              <BookOpen size={12} /> O'qishni boshlash
            </button>
          )}
          <button className="flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors">
            <Download size={12} /> Yuklab olish
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────
export default function Library() {
  const navigate = useNavigate();
  const [bookList, setBookList]       = useState(initialBooks);
  const [search, setSearch]           = useState('');
  const [activeTab, setActiveTab]     = useState('all');
  const [activeCat, setActiveCat]     = useState('all');
  const [sortBy, setSortBy]           = useState('rating');
  const [showSort, setShowSort]       = useState(false);

  const handleBookmark = (id) => {
    setBookList(prev => prev.map(b => b.id === id ? { ...b, isBookmarked: !b.isBookmarked } : b));
  };

  const handleRead = (id) => {
    navigate(`/read/${id}`);
  };

  const filtered = useMemo(() => {
    let list = bookList;
    if (activeTab === 'reading') list = list.filter(b => b.readPages > 0 && b.readPages < b.pages);
    if (activeTab === 'saved')   list = list.filter(b => b.isBookmarked);
    if (activeCat !== 'all')     list = list.filter(b => b.category === activeCat);
    if (search.trim())           list = list.filter(b =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
    );
    return [...list].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [bookList, activeTab, activeCat, search, sortBy]);

  // stats
  const totalBooks    = bookList.length;
  const savedCount    = bookList.filter(b => b.isBookmarked).length;
  const readingCount  = bookList.filter(b => b.readPages > 0 && b.readPages < b.pages).length;
  const doneCount     = bookList.filter(b => b.readPages >= b.pages && b.pages > 0).length;

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Kutubxona</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Geografiya bo'yicha barcha materiallar</p>
      </div>

      {/* ── Stats banner ── */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Jami kitob',   value: totalBooks,   color: '#2563EB', bg: '#EFF6FF' },
          { label: 'Saqlangan',    value: savedCount,   color: '#7C3AED', bg: '#F5F3FF' },
          { label: "O'qilayotgan", value: readingCount, color: '#D97706', bg: '#FFFBEB' },
          { label: 'Tugatilgan',   value: doneCount,    color: '#16A34A', bg: '#F0FDF4' },
        ].map(s => (
          <div key={s.label} className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-3 text-center">
            <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5 leading-tight">{s.label}</p>
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
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSort(v => !v)}
            className={cn(
              'h-11 px-3.5 rounded-[var(--radius)] border text-sm flex items-center gap-1.5 font-medium transition-colors',
              showSort ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
            )}
          >
            <SortAscending size={16} />
            <span className="hidden sm:inline">{SORTS.find(s => s.id === sortBy)?.label}</span>
          </button>
          {showSort && (
            <div className="absolute right-0 top-12 z-20 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] shadow-lg overflow-hidden min-w-[140px]">
              {SORTS.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSortBy(s.id); setShowSort(false); }}
                  className={cn(
                    'w-full text-left px-4 py-2.5 text-sm transition-colors',
                    sortBy === s.id ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-semibold' : 'text-[var(--text-secondary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]'
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
              activeTab === t.id ? 'bg-[var(--primary)] text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Category chips ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCat('all')}
          className={cn(
            'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all',
            activeCat === 'all' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
          )}
        >
          Barchasi
        </button>
        {libraryCategories.map(cat => {
          const meta = catMeta[cat.name] || { color: '#2563EB', bg: '#EFF6FF' };
          const active = activeCat === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCat(active ? 'all' : cat.name)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all"
              style={active
                ? { background: meta.color, color: '#fff', borderColor: meta.color }
                : { background: 'var(--surface)', color: 'var(--text-secondary)', borderColor: 'var(--border)' }
              }
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
            {activeTab === 'reading' ? "O'qilayotgan kitoblar"
              : activeTab === 'saved' ? 'Saqlangan kitoblar'
              : activeCat !== 'all' ? activeCat
              : 'Barcha materiallar'}
          </h2>
          <span className="text-xs text-[var(--text-tertiary)]">{filtered.length} ta</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--primary-soft)] flex items-center justify-center">
              <BookOpen size={28} style={{ color: 'var(--primary)' }} />
            </div>
            <p className="text-sm font-semibold text-[var(--text-secondary)]">
              {search ? 'Qidiruv bo\'yicha hech narsa topilmadi' : 'Bu bo\'limda materiallar yo\'q'}
            </p>
            {search && (
              <button onClick={() => setSearch('')} className="text-xs text-[var(--primary)] font-semibold underline underline-offset-2">
                Qidiruvni tozalash
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {filtered.map(book => (
              <BookCard key={book.id} book={book} onBookmark={handleBookmark} onRead={handleRead} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
