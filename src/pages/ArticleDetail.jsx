import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CaretLeft, Bookmark, Heart, Share, ArrowUp,
  Globe, Tree, Cloud, Mountains, Images, Play,
  X,
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

// ── Gallery viewer ────────────────────────────────────────────────────────────

function GalleryViewer({ images, startIdx = 0, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/95 flex flex-col"
      onClick={onClose}>
      <button className="absolute top-4 right-4 text-white/70 hover:text-white z-10" onClick={onClose}>
        <X size={24} />
      </button>
      <div className="flex-1 flex items-center justify-center p-4" onClick={e => e.stopPropagation()}>
        <img src={images[idx].url} alt={images[idx].caption}
          className="max-h-full max-w-full object-contain rounded-lg" />
      </div>
      {images[idx].caption && (
        <p className="text-center text-white/60 text-xs pb-3 px-4">{images[idx].caption}</p>
      )}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 pb-6" onClick={e => e.stopPropagation()}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={cn('w-2 h-2 rounded-full transition-all', i === idx ? 'bg-white scale-125' : 'bg-white/40')} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── Content block renderer ────────────────────────────────────────────────────

function ContentBlock({ block, accentColor, onGalleryOpen }) {
  if (block.type === 'heading') return (
    <h2 className="text-base font-bold text-[var(--text-primary)] mt-6 mb-1">{block.text}</h2>
  );
  if (block.type === 'paragraph') return (
    <p className="text-sm text-[var(--text-primary)] leading-relaxed">{block.text}</p>
  );
  if (block.type === 'image') return (
    <figure className="rounded-xl overflow-hidden my-2 cursor-pointer"
      onClick={() => onGalleryOpen([block], 0)}>
      <img src={block.url} alt={block.caption} className="w-full object-cover max-h-72" loading="lazy" />
      {block.caption && (
        <figcaption className="text-center text-xs text-[var(--text-tertiary)] py-1.5 px-3 bg-[var(--background)]">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
  if (block.type === 'gallery') return (
    <div className="my-2">
      <div className="grid grid-cols-2 gap-2">
        {block.images.slice(0, 4).map((img, i) => (
          <div key={i} className="relative cursor-pointer overflow-hidden rounded-lg aspect-video bg-[var(--background)]"
            onClick={() => onGalleryOpen(block.images, i)}>
            <img src={img.url} alt={img.caption}
              className="w-full h-full object-cover transition-transform hover:scale-105" loading="lazy" />
            {i === 3 && block.images.length > 4 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-sm">+{block.images.length - 4}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-[var(--text-tertiary)] mt-1 text-center flex items-center justify-center gap-1">
        <Images size={11} /> {block.images.length} ta rasm
      </p>
    </div>
  );
  if (block.type === 'video') return (
    <div className="my-3 rounded-xl overflow-hidden border border-[var(--border)]">
      <div className="relative" style={{ paddingTop: '56.25%' }}>
        <iframe
          src={`https://www.youtube.com/embed/${block.youtube}?rel=0`}
          title={block.caption || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      </div>
      {block.caption && (
        <p className="text-xs text-[var(--text-tertiary)] px-3 py-2 bg-[var(--background)] flex items-center gap-1.5">
          <Play size={10} weight="fill" style={{ color: accentColor }} /> {block.caption}
        </p>
      )}
    </div>
  );
  return null;
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = initialArticles.find(a => String(a.id) === id);
  const cat = article ? getCat(article.category) : null;
  const { Icon } = cat || {};

  const scrollRef = useRef(null);
  const [readProgress, setReadProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [gallery, setGallery] = useState(null);

  const [articleState, setArticleState] = useState(() => {
    const saved = loadState();
    const defaults = {};
    initialArticles.forEach(a => {
      defaults[a.id] = { bookmarked: a.bookmarked, liked: false, ...saved[a.id] };
    });
    return defaults;
  });
  useEffect(() => { saveState(articleState); }, [articleState]);

  const toggle = (key) => {
    if (!article) return;
    setArticleState(s => ({ ...s, [article.id]: { ...s[article.id], [key]: !s[article.id][key] } }));
  };

  // Track scroll progress on the window
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = Math.min(100, (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
      setReadProgress(pct);
      setShowScrollTop(el.scrollTop > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[var(--text-tertiary)]">
        <p className="text-lg font-semibold mb-3">Maqola topilmadi</p>
        <button onClick={() => navigate('/articles')}
          className="text-sm font-medium text-[var(--primary)] underline">
          Maqolalarga qaytish
        </button>
      </div>
    );
  }

  const state = articleState[article.id] || {};

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        image={article.coverImage}
        url={`/articles/${article.id}`}
        type="article"
      />

      {/* Fixed progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-[var(--border)]">
        <div className="h-full transition-all duration-75" style={{ width: `${readProgress}%`, background: cat.color }} />
      </div>

      {/* Sticky top nav */}
      <div className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3 bg-[var(--background)] border-b border-[var(--border)] -mx-4 mb-0">
        <button onClick={() => navigate('/articles')}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--background)] text-[var(--text-secondary)] shrink-0">
          <CaretLeft size={18} weight="bold" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold truncate" style={{ color: cat.color }}>{article.category}</p>
          <p className="text-[10px] text-[var(--text-tertiary)] truncate">{formatDate(article.date)}</p>
        </div>
        <button onClick={() => toggle('bookmarked')}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--background)]">
          <Bookmark size={17} weight={state.bookmarked ? 'fill' : 'regular'}
            style={{ color: state.bookmarked ? cat.color : undefined }}
            className={state.bookmarked ? '' : 'text-[var(--text-tertiary)]'} />
        </button>
      </div>

      {/* Hero */}
      {article.coverImage ? (
        <div className="relative h-56 sm:h-72 overflow-hidden -mx-4">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
          <span className="absolute bottom-4 left-5 text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: cat.bg, color: cat.color }}>
            {article.category}
          </span>
        </div>
      ) : (
        <div className="relative h-40 flex items-end overflow-hidden -mx-4 px-5 pb-5"
          style={{ background: `linear-gradient(135deg, ${cat.color}20 0%, ${cat.color}40 100%)` }}>
          <Icon size={100} weight="duotone" style={{ color: cat.color, opacity: 0.15 }}
            className="absolute right-4 top-1/2 -translate-y-1/2" />
          <span className="relative z-10 text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: cat.bg, color: cat.color }}>
            {article.category}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="max-w-2xl mx-auto py-6 space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-snug">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)] pb-4 border-b border-[var(--border)]">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: cat.color }}>
            {article.author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-[var(--text-secondary)] text-[11px]">{article.author}</p>
            <p className="text-[10px]">{formatDate(article.date)}</p>
          </div>
        </div>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic border-l-2 pl-4"
          style={{ borderColor: cat.color }}>
          {article.excerpt}
        </p>

        <div className="space-y-3">
          {(article.content || []).map((block, i) => (
            <ContentBlock key={i} block={block} accentColor={cat.color}
              onGalleryOpen={(imgs, idx) => setGallery({ images: imgs, startIdx: idx })} />
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border)]">
          {article.tags.map(tag => (
            <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-[var(--background)] text-[var(--text-secondary)]">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2 pb-8">
          <button onClick={() => toggle('liked')}
            className={cn('flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border',
              state.liked
                ? 'text-red-500 border-red-200 bg-red-50 dark:bg-red-500/10 dark:border-red-500/30'
                : 'border-[var(--border)] text-[var(--text-secondary)]')}>
            <Heart size={15} weight={state.liked ? 'fill' : 'regular'} />
            {article.likes + (state.liked ? 1 : 0)}
          </button>
          <button
            onClick={() => navigator.share?.({ title: article.title, text: article.excerpt, url: window.location.href })}
            className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-[var(--border)] text-[var(--text-secondary)] transition-all hover:bg-[var(--background)]">
            <Share size={15} /> Ulashish
          </button>
        </div>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-4 w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-white z-40"
            style={{ background: cat.color }}>
            <ArrowUp size={16} weight="bold" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Gallery overlay */}
      <AnimatePresence>
        {gallery && (
          <GalleryViewer
            images={gallery.images}
            startIdx={gallery.startIdx}
            onClose={() => setGallery(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
