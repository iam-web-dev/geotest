import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Bookmark, List,
  ArrowLeft as PrevIcon, ArrowRight as NextIcon,
  TextAa, X, Star, CheckCircle,
} from '@phosphor-icons/react';
import { books } from '../data/mockData';
import GlobeLoader from '../components/GlobeLoader';

const THEMES = {
  light: { bg: '#FFFFFF', text: '#1a1a1a', surface: '#F8F9FA', border: '#E5E7EB', label: 'Oq' },
  sepia: { bg: '#F9F3E8', text: '#3B2D1F', surface: '#EFE6D0', border: '#D6C9A8', label: 'Sepia' },
  dark:  { bg: '#1A1A2E', text: '#E2E8F0', surface: '#16213E', border: '#2D3748', label: "Qo'ng'ir" },
  black: { bg: '#0D0D0D', text: '#CCCCCC', surface: '#1A1A1A', border: '#2A2A2A', label: 'Qora' },
};
const FONT_SIZES   = [14, 16, 18, 20, 22, 24];
const FONTS        = [
  { id: 'inter',   label: 'Inter',   family: "'Inter', sans-serif" },
  { id: 'georgia', label: 'Georgia', family: 'Georgia, serif' },
  { id: 'mono',    label: 'Mono',    family: "'Courier New', monospace" },
];
const LINE_HEIGHTS = [
  { id: 'compact', label: 'Yaqin',  value: 1.6 },
  { id: 'normal',  label: 'Normal', value: 1.9 },
  { id: 'wide',    label: 'Keng',   value: 2.3 },
];

function flattenPages(chapters = []) {
  const out = [];
  for (const ch of chapters)
    ch.pages.forEach((page, i) => {
      const isObj = page && typeof page === 'object';
      out.push({
        chapterTitle: ch.title,
        chapterIdx: chapters.indexOf(ch),
        pageIdx: i,
        text:     isObj ? page.text     : page,
        imageUrl: isObj ? page.imageUrl : null,
        caption:  isObj ? page.caption  : null,
      });
    });
  return out;
}

function PageContent({ page, book, total, pageNum: pn, t, contentStyle,
  userRating, hoverRating, setHoverRating, setUserRating, setRatingDone, ratingDone, goBack }) {
  if (!page) return null;
  return (
    <div style={contentStyle}>
      {page.pageIdx === 0 && (
        <div className="mb-8 pb-6" style={{ borderBottom: `2px solid ${t.border}` }}>
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-2"
            style={{ color: '#2563EB', opacity: 0.8 }}>{page.chapterIdx + 1}-bob</p>
          <h2 className="text-2xl font-bold leading-tight" style={{ color: t.text }}>{page.chapterTitle}</h2>
        </div>
      )}
      {page.imageUrl && (
        <div className="my-6 rounded-xl overflow-hidden" style={{ border: `1px solid ${t.border}` }}>
          <img
            src={page.imageUrl}
            alt={page.caption || ''}
            style={{ width: '100%', display: 'block', maxHeight: 220, objectFit: 'cover' }}
          />
          {page.caption && (
            <p style={{
              fontSize: 11, textAlign: 'center', padding: '8px 12px',
              color: t.text, opacity: 0.55, background: t.surface,
              fontStyle: 'italic',
            }}>
              {page.caption}
            </p>
          )}
        </div>
      )}
      {page.text.split('\n\n').map((para, i) => (
        <p key={i} className="mb-5" style={{ textAlign: 'justify', textIndent: '1.5em', color: t.text }}>
          {para.split('\n').map((line, j, arr) => (
            <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
          ))}
        </p>
      ))}
      {pn === total - 1 && (
        <div className="mt-12 mb-4 rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${t.border}` }}>
          <div style={{ background: 'linear-gradient(135deg,#2563EB 0%,#7C3AED 100%)', padding: '28px 24px 24px' }}>
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle size={32} color="#fff" weight="fill" />
              </div>
            </div>
            <p className="text-center text-white font-bold text-xl">Tabriklaymiz! 🎉</p>
            <p className="text-center text-white/80 text-sm mt-1">Siz «{book.title}» kitobini tugatdingiz</p>
          </div>
          <div className="grid grid-cols-3 text-center py-4"
            style={{ background: t.surface, borderBottom: `1px solid ${t.border}` }}>
            {[{ label: 'Sahifalar', value: total }, { label: 'Boblar', value: book.chapters.length }, { label: 'Ball', value: '+50 XP' }]
              .map((s, idx) => (
                <div key={s.label} style={{ borderRight: idx < 2 ? `1px solid ${t.border}` : 'none' }}>
                  <p className="text-base font-bold" style={{ color: '#2563EB' }}>{s.value}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: t.text, opacity: 0.5 }}>{s.label}</p>
                </div>
              ))}
          </div>
          <div className="px-6 py-5" style={{ background: t.bg }}>
            {ratingDone ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={26} weight="fill" style={{ color: s <= userRating ? '#F59E0B' : t.border }} />)}
                </div>
                <p className="text-sm font-semibold mt-1" style={{ color: t.text }}>Bahoyingiz saqlandi — {userRating}/5 ⭐</p>
              </div>
            ) : (
              <>
                <p className="text-center text-sm font-semibold mb-3" style={{ color: t.text }}>Kitobni baholang</p>
                <div className="flex justify-center gap-2">
                  {[1,2,3,4,5].map(s => (
                    <button key={s}
                      onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)}
                      onClick={() => { setUserRating(s); setRatingDone(true); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
                      className="transition-transform hover:scale-125 active:scale-110">
                      <Star size={32} weight={(hoverRating || userRating) >= s ? 'fill' : 'regular'}
                        style={{ color: (hoverRating || userRating) >= s ? '#F59E0B' : t.border, transition: 'color 0.15s' }} />
                    </button>
                  ))}
                </div>
                <p className="text-center text-[11px] mt-2" style={{ color: t.text, opacity: 0.4 }}>
                  {hoverRating === 1 ? 'Yomon' : hoverRating === 2 ? 'Qoniqarsiz'
                    : hoverRating === 3 ? "O'rtacha" : hoverRating === 4 ? 'Yaxshi'
                    : hoverRating === 5 ? "A'lo!" : 'Yulduzcha bosing'}
                </p>
              </>
            )}
          </div>
          <div className="px-6 pb-6 pt-2" style={{ background: t.bg }}>
            <button onClick={goBack}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg,#2563EB 0%,#7C3AED 100%)' }}>
              Kutubxonaga qaytish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookReader() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const book     = books.find(b => b.id === Number(id));

  const saved = JSON.parse(localStorage.getItem('reader-settings') || '{}');
  const persist = (key, val) => {
    const s = JSON.parse(localStorage.getItem('reader-settings') || '{}');
    localStorage.setItem('reader-settings', JSON.stringify({ ...s, [key]: val }));
  };
  const [theme,    setThemeRaw]    = useState(saved.theme    ?? 'light');
  const [fontSize, setFontSizeRaw] = useState(saved.fontSize ?? 2);
  const [fontIdx,  setFontIdxRaw]  = useState(saved.fontIdx  ?? 0);
  const [lineIdx,  setLineIdxRaw]  = useState(saved.lineIdx  ?? 1);
  const setTheme    = v => { setThemeRaw(v);    persist('theme', v); };
  const setFontSize = v => { setFontSizeRaw(v); persist('fontSize', v); };
  const setFontIdx  = v => { setFontIdxRaw(v);  persist('fontIdx', v); };
  const setLineIdx  = v => { setLineIdxRaw(v);  persist('lineIdx', v); };

  const [pageNum,      setPageNum]      = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showToc,      setShowToc]      = useState(false);
  const [showHeader,   setShowHeader]   = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(book?.isBookmarked ?? false);
  const [userRating,   setUserRating]   = useState(0);
  const [hoverRating,  setHoverRating]  = useState(0);
  const [ratingDone,   setRatingDone]   = useState(false);
  const [animDir,      setAnimDir]      = useState(null); // 'next' | 'prev' | null
  const [loading,      setLoading]      = useState(true);
  const [exiting,      setExiting]      = useState(false);

  const contentRef = useRef(null);
  const hideTimer  = useRef(null);
  const touchStart = useRef(null);

  const pages = book ? flattenPages(book.chapters) : [];
  const total = pages.length || 1;
  const t     = THEMES[theme];
  const progress = total > 1 ? Math.round((pageNum / (total - 1)) * 100) : 100;
  const isDark   = theme === 'dark' || theme === 'black';

  const contentStyle = {
    maxWidth: 680, margin: '0 auto', padding: '0 24px',
    fontSize:   FONT_SIZES[fontSize],
    fontFamily: FONTS[fontIdx].family,
    lineHeight: LINE_HEIGHTS[lineIdx].value,
  };

  const resetHide = useCallback(() => {
    setShowHeader(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowHeader(false), 3000);
  }, []);
  useEffect(() => { resetHide(); return () => clearTimeout(hideTimer.current); }, [resetHide]);
  useEffect(() => { if (contentRef.current) contentRef.current.scrollTop = 0; }, [pageNum]);

  const goTo = useCallback((dir) => {
    const next = dir === 'next' ? pageNum + 1 : pageNum - 1;
    if (next < 0 || next >= total) return;
    setAnimDir(dir);
    setTimeout(() => {
      setPageNum(next);
      setAnimDir(null);
    }, 220);
  }, [pageNum, total]);

  const goPrev = useCallback(() => goTo('prev'), [goTo]);
  const goNext = useCallback(() => goTo('next'), [goTo]);

  // Touch swipe
  const onTouchStart = useCallback((e) => {
    touchStart.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback((e) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) goNext(); else goPrev();
  }, [goNext, goPrev]);

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      else if (e.key === 'Escape') { setShowSettings(false); setShowToc(false); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [goNext, goPrev]);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-4 flex-col" style={{ background: '#F8FAFC' }}>
        <p className="text-lg font-semibold text-gray-600">Kitob topilmadi</p>
        <button onClick={() => navigate('/library')} className="flex items-center gap-2 text-blue-600 font-medium">
          <ArrowLeft size={16} /> Kutubxonaga qaytish
        </button>
      </div>
    );
  }

  const goBack = () => {
    setExiting(true);
  };

  const sharedProps = { book, total, t, contentStyle, userRating, hoverRating,
    setHoverRating, setUserRating, setRatingDone, ratingDone, goBack };

  const slideStyle = animDir ? {
    transform: animDir === 'next' ? 'translateX(-6%)' : 'translateX(6%)',
    opacity: 0,
    transition: 'transform 220ms ease-in, opacity 220ms ease-in',
  } : {
    transform: 'translateX(0)',
    opacity: 1,
    transition: 'transform 220ms ease-out, opacity 220ms ease-out',
  };

  if (loading || exiting) return <GlobeLoader fadeIn onDone={() => { if (exiting) navigate('/library'); else setLoading(false); }} />;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: t.bg, transition: 'background 0.3s, opacity 0.5s ease', overflow: 'hidden',
        animation: 'fadeIn 0.5s ease forwards' }}
      onMouseMove={resetHide}
      onClick={() => { setShowSettings(false); setShowToc(false); }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center gap-3 px-4 py-3 transition-all duration-300"
        style={{
          background: isDark ? 'rgba(13,13,13,0.92)' : 'rgba(255,255,255,0.92)',
          borderBottom: `1px solid ${t.border}`, backdropFilter: 'blur(12px)',
          opacity: showHeader ? 1 : 0, pointerEvents: showHeader ? 'auto' : 'none',
          transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
        }}>
        <button onClick={goBack}
          className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg"
          style={{ color: t.text, background: t.surface }}>
          <ArrowLeft size={16} /> Orqaga
        </button>
        <div className="flex-1 min-w-0 text-center">
          <p className="text-sm font-bold truncate" style={{ color: t.text }}>{book.title}</p>
          {pages[pageNum] && (
            <p className="text-[10px] mt-0.5 truncate" style={{ color: isDark ? '#64748B' : '#9CA3AF' }}>
              {pages[pageNum].chapterTitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={e => { e.stopPropagation(); setShowToc(v => !v); setShowSettings(false); }}
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: showToc ? '#2563EB22' : t.surface, color: showToc ? '#2563EB' : t.text }}>
            <List size={17} />
          </button>
          <button onClick={e => { e.stopPropagation(); setIsBookmarked(v => !v); }}
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: t.surface, color: isBookmarked ? '#2563EB' : t.text }}>
            <Bookmark size={17} weight={isBookmarked ? 'fill' : 'regular'} />
          </button>
          <button onClick={e => { e.stopPropagation(); setShowSettings(v => !v); setShowToc(false); }}
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: showSettings ? '#2563EB22' : t.surface, color: showSettings ? '#2563EB' : t.text }}>
            <TextAa size={17} />
          </button>
        </div>
      </div>

      {/* TOC */}
      {showToc && (
        <div className="fixed top-[57px] right-4 z-40 rounded-[16px] shadow-xl overflow-hidden w-72"
          style={{ background: t.bg, border: `1px solid ${t.border}` }} onClick={e => e.stopPropagation()}>
          <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: t.border }}>
            <p className="text-sm font-bold" style={{ color: t.text }}>Mundarija</p>
            <button onClick={() => setShowToc(false)} style={{ color: t.text }}><X size={15} /></button>
          </div>
          <div className="overflow-y-auto max-h-80">
            {book.chapters.map((ch, ci) => {
              const firstIdx = pages.findIndex(p => p.chapterIdx === ci);
              const isCur = pages[pageNum]?.chapterIdx === ci;
              return (
                <button key={ci} onClick={() => { setPageNum(firstIdx); setShowToc(false); }}
                  className="w-full text-left px-4 py-3 text-sm border-b last:border-0"
                  style={{ borderColor: t.border, background: isCur ? '#2563EB18' : 'transparent',
                    color: isCur ? '#2563EB' : t.text, fontWeight: isCur ? 600 : 400 }}>
                  <span className="text-[10px] opacity-50 block mb-0.5">Bob {ci + 1}</span>
                  {ch.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Settings */}
      {showSettings && (
        <div className="fixed top-[57px] right-4 z-40 rounded-[16px] shadow-xl overflow-hidden w-80"
          style={{ background: t.bg, border: `1px solid ${t.border}` }} onClick={e => e.stopPropagation()}>
          <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: t.border }}>
            <p className="text-sm font-bold" style={{ color: t.text }}>O'qish sozlamalari</p>
            <button onClick={() => setShowSettings(false)} style={{ color: t.text }}><X size={15} /></button>
          </div>
          <div className="p-4 space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-3"
                style={{ color: isDark ? '#64748B' : '#9CA3AF' }}>Shrift o'lchami</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setFontSize(f => Math.max(0, f - 1))} disabled={fontSize === 0}
                  className="w-8 h-8 rounded-lg font-bold flex items-center justify-center text-sm"
                  style={{ background: t.surface, color: t.text }}>A</button>
                <div className="flex-1 flex gap-1">
                  {FONT_SIZES.map((_, i) => (
                    <button key={i} onClick={() => setFontSize(i)}
                      className="flex-1 h-1.5 rounded-full transition-colors"
                      style={{ background: i <= fontSize ? '#2563EB' : t.border }} />
                  ))}
                </div>
                <button onClick={() => setFontSize(f => Math.min(FONT_SIZES.length - 1, f + 1))}
                  disabled={fontSize === FONT_SIZES.length - 1}
                  className="w-8 h-8 rounded-lg font-bold flex items-center justify-center"
                  style={{ background: t.surface, color: t.text, fontSize: '1.1rem' }}>A</button>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-2"
                style={{ color: isDark ? '#64748B' : '#9CA3AF' }}>Shrift turi</p>
              <div className="flex gap-2">
                {FONTS.map((f, i) => (
                  <button key={f.id} onClick={() => setFontIdx(i)}
                    className="flex-1 py-2 rounded-lg text-sm text-center border transition-all"
                    style={{ fontFamily: f.family, background: fontIdx === i ? '#2563EB' : t.surface,
                      color: fontIdx === i ? '#fff' : t.text, borderColor: fontIdx === i ? '#2563EB' : t.border }}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-2"
                style={{ color: isDark ? '#64748B' : '#9CA3AF' }}>Qator oralig'i</p>
              <div className="flex gap-2">
                {LINE_HEIGHTS.map((l, i) => (
                  <button key={l.id} onClick={() => setLineIdx(i)}
                    className="flex-1 py-2 rounded-lg text-xs text-center border transition-all"
                    style={{ background: lineIdx === i ? '#2563EB' : t.surface,
                      color: lineIdx === i ? '#fff' : t.text, borderColor: lineIdx === i ? '#2563EB' : t.border }}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-2"
                style={{ color: isDark ? '#64748B' : '#9CA3AF' }}>Fon rangi</p>
              <div className="flex gap-2">
                {Object.entries(THEMES).map(([key, val]) => (
                  <button key={key} onClick={() => setTheme(key)}
                    className="flex-1 h-9 rounded-lg border-2 text-xs font-semibold transition-all"
                    style={{ background: val.bg, color: val.text, borderColor: theme === key ? '#2563EB' : val.border }}>
                    {val.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, marginTop: 57, marginBottom: 64, overflow: 'hidden', position: 'relative' }}>
        <div
          ref={contentRef}
          style={{
            position: 'absolute', inset: 0,
            overflowY: 'auto',
            background: t.bg,
            ...slideStyle,
          }}
          onClick={resetHide}
        >
          <div style={{ padding: '24px 0 48px' }}>
            <PageContent page={pages[pageNum]} pageNum={pageNum} {...sharedProps} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 transition-all duration-300"
        style={{
          background: isDark ? 'rgba(13,13,13,0.95)' : 'rgba(255,255,255,0.95)',
          borderTop: `1px solid ${t.border}`, backdropFilter: 'blur(12px)',
          opacity: showHeader ? 1 : 0, pointerEvents: showHeader ? 'auto' : 'none',
          transform: showHeader ? 'translateY(0)' : 'translateY(100%)',
        }}>
        <div className="h-0.5" style={{ background: t.border }}>
          <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, background: '#2563EB' }} />
        </div>
        <div className="flex items-center justify-between px-4 py-3 gap-4">
          <button onClick={goPrev} disabled={pageNum === 0 || !!animDir}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
            style={{ background: t.surface, color: t.text }}>
            <PrevIcon size={18} />
          </button>
          <div className="flex-1 text-center">
            <p className="text-xs font-semibold" style={{ color: t.text }}>{pageNum + 1} / {total}</p>
            <p className="text-[10px] mt-0.5" style={{ color: isDark ? '#64748B' : '#9CA3AF' }}>
              {progress}% o'qildi
            </p>
          </div>
          <button onClick={goNext} disabled={pageNum === total - 1 || !!animDir}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
            style={{ background: '#2563EB', color: '#fff' }}>
            <NextIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
