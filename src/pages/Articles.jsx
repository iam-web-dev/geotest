import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlass, Bookmark, Heart,
  BookOpen, ArrowRight, Globe, Tree, Cloud, Mountains, X,
} from '@phosphor-icons/react';
import SEO from '../components/SEO';
import { cn } from '../lib/utils';
import { articles as initialArticles } from '../data/mockData';

const STORAGE_KEY = 'geo_articles_state';
function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveState(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

const categoryMeta = {
  'Geografiya': { color: '#2563EB', bg: 'var(--pal-milliy)',      Icon: Globe },
  'Ekologiya':  { color: '#16A34A', bg: 'var(--pal-attestation)', Icon: Tree },
  'Iqlim':      { color: '#0891B2', bg: '#E0F2FE',                Icon: Cloud },
  'Turizm':     { color: '#D4A820', bg: 'var(--pal-olympiad)',     Icon: Mountains },
};
function getCat(cat) {
  return categoryMeta[cat] || { color: '#2563EB', bg: 'var(--pal-milliy)', Icon: Globe };
}
function formatDate(d) {
  const dt = new Date(d);
  const dd = String(dt.getDate()).padStart(2, '0');
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const yyyy = dt.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

// ── Cards ─────────────────────────────────────────────────────────────────────

function FeaturedCard({ article, onOpen, liked, bookmarked, onLike, onBookmark }) {
  const cat = getCat(article.category);
  const { Icon } = cat;
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] bg-[var(--surface)] cursor-pointer"
      onClick={onOpen}>
      <div className="relative h-48 sm:h-56 overflow-hidden">
        {article.coverImage ? (
          <>
            <img src={article.coverImage} alt={article.title}
              className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${cat.color}18 0%, ${cat.color}40 100%)` }}>
            <Icon size={100} weight="duotone" style={{ color: cat.color, opacity: 0.2 }} />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: cat.bg, color: cat.color }}>
            <Icon size={10} weight="fill" /> {article.category}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white leading-tight max-w-xs drop-shadow">
            {article.title}
          </h2>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] text-[var(--text-tertiary)]">
            <span className="font-medium text-[var(--text-secondary)]">{article.author}</span>
            <span>{formatDate(article.date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={e => { e.stopPropagation(); onLike(); }}
              className={cn('flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all border',
                liked ? 'text-red-500 border-red-200 bg-red-50 dark:bg-red-500/10' : 'border-[var(--border)] text-[var(--text-tertiary)]')}>
              <Heart size={11} weight={liked ? 'fill' : 'regular'} /> {article.likes + (liked ? 1 : 0)}
            </button>
            <button onClick={e => { e.stopPropagation(); onBookmark(); }}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--background)]">
              <Bookmark size={13} weight={bookmarked ? 'fill' : 'regular'}
                style={{ color: bookmarked ? cat.color : undefined }}
                className={bookmarked ? '' : 'text-[var(--text-tertiary)]'} />
            </button>
            <button onClick={onOpen}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full text-white"
              style={{ background: cat.color }}>
              O'qish <ArrowRight size={11} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ArticleCard({ article, index, onOpen, liked, bookmarked, onLike, onBookmark }) {
  const cat = getCat(article.category);
  const { Icon } = cat;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
      onClick={onOpen}
      className="cursor-pointer bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] overflow-hidden hover:border-[var(--primary)]/30 hover:shadow-md transition-all flex flex-col">
      <div className="relative h-24 overflow-hidden shrink-0">
        {article.coverImage ? (
          <>
            <img src={article.coverImage} alt={article.title}
              className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${cat.color}18 0%, ${cat.color}30 100%)` }}>
            <Icon size={38} weight="duotone" style={{ color: cat.color, opacity: 0.3 }} />
          </div>
        )}
        <button onClick={e => { e.stopPropagation(); onBookmark(); }}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <Bookmark size={11} weight={bookmarked ? 'fill' : 'regular'}
            style={{ color: bookmarked ? cat.color : 'white' }} />
        </button>
        <span className="absolute bottom-1.5 left-2.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
          style={{ background: cat.bg, color: cat.color }}>{article.category}</span>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-xs font-bold text-[var(--text-primary)] leading-snug line-clamp-2 mb-1.5">
          {article.title}
        </h3>
        <p className="text-[10px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-2 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
          <span className="text-[9px] text-[var(--text-tertiary)]">{formatDate(article.date)}</span>
          <button onClick={e => { e.stopPropagation(); onLike(); }}
            className={cn('flex items-center gap-0.5 text-[9px] font-semibold transition-colors',
              liked ? 'text-red-500' : 'text-[var(--text-tertiary)]')}>
            <Heart size={10} weight={liked ? 'fill' : 'regular'} /> {article.likes + (liked ? 1 : 0)}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Articles() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('all');

  const [articleState, setArticleState] = useState(() => {
    const saved = loadState();
    const defaults = {};
    initialArticles.forEach(a => {
      defaults[a.id] = { bookmarked: a.bookmarked, liked: false, ...saved[a.id] };
    });
    return defaults;
  });
  useEffect(() => { saveState(articleState); }, [articleState]);

  const toggle = (id, key) => setArticleState(s => ({ ...s, [id]: { ...s[id], [key]: !s[id][key] } }));

  const allTags = ['all', ...new Set(initialArticles.flatMap(a => a.tags))];
  const filtered = initialArticles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase())
      || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTag = activeTag === 'all' || a.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  const bookmarkedCount = Object.values(articleState).filter(s => s.bookmarked).length;

  return (
    <div className="space-y-6">
      <SEO
        title="Geografiya Maqolalari"
        description="Jismoniy geografiya, iqlim, davlatlar, daryolar, tog'lar va inson geografiyasiga oid ta'limiy maqolalarni o'qing."
        url="/articles"
      />

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Maqolalar</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">{initialArticles.length} ta maqola</p>
      </div>

      <div className="relative">
        <MagnifyingGlass size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
        <input type="text" placeholder="Maqola qidirish..."
          value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-10 pr-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:outline-none transition-all" />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button onClick={() => setActiveTag('all')}
          className={cn('px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shrink-0',
            activeTag === 'all'
              ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
              : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/40')}>
          Barchasi
        </button>
        <button onClick={() => setActiveTag(activeTag === '__bookmarked' ? 'all' : '__bookmarked')}
          className={cn('px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shrink-0 flex items-center gap-1.5',
            activeTag === '__bookmarked'
              ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
              : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/40')}>
          <Bookmark size={11} weight={activeTag === '__bookmarked' ? 'fill' : 'regular'} />
          Saqlangan
        </button>
        {allTags.filter(t => t !== 'all').map(tag => (
          <button key={tag} onClick={() => setActiveTag(tag)}
            className={cn('px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shrink-0',
              activeTag === tag
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/40')}>
            #{tag}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {(() => {
          const displayList = activeTag === '__bookmarked'
            ? initialArticles.filter(a => articleState[a.id]?.bookmarked)
            : filtered;
          const feat = displayList[0];
          const rest2 = displayList.slice(1);

          if (displayList.length === 0) return (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-16 text-[var(--text-tertiary)]">
              <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">
                {activeTag === '__bookmarked' ? "Saqlanganlar yo'q" : 'Maqola topilmadi'}
              </p>
            </motion.div>
          );

          return (
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {feat && (
                <FeaturedCard
                  article={feat}
                  onOpen={() => navigate(`/articles/${feat.id}`)}
                  liked={articleState[feat.id]?.liked}
                  bookmarked={articleState[feat.id]?.bookmarked}
                  onLike={() => toggle(feat.id, 'liked')}
                  onBookmark={() => toggle(feat.id, 'bookmarked')}
                />
              )}
              {rest2.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {rest2.map((a, i) => (
                    <ArticleCard key={a.id} article={a} index={i}
                      onOpen={() => navigate(`/articles/${a.id}`)}
                      liked={articleState[a.id]?.liked}
                      bookmarked={articleState[a.id]?.bookmarked}
                      onLike={() => toggle(a.id, 'liked')}
                      onBookmark={() => toggle(a.id, 'bookmarked')} />
                  ))}
                </div>
              )}
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
