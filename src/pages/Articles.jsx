import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlass, Bookmark, Clock, Heart, ChatCircle, Tag, BookOpen } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { Card, CardContent } from '../components/ui/Card';
import { articles } from '../data/mockData';

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('all');

  const allTags = ['all', ...new Set(articles.flatMap(a => a.tags))];
  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag === 'all' || a.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Maqolalar</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Geografiya bo'yicha foydali maqolalar</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }}>
        <div className="relative">
          <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input type="text" placeholder="Maqola qidirish..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:outline-none transition-all shadow-sm" />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.12 }}
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {allTags.map((tag) => (
          <button key={tag} onClick={() => setActiveTag(tag)}
            className={cn('px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium whitespace-nowrap transition-all border', activeTag === tag ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] border-[var(--border)]')}>
            {tag === 'all' ? 'Barchasi' : `#${tag}`}
          </button>
        ))}
      </motion.div>

      <div className="space-y-3">
        {filteredArticles.map((article, i) => (
          <motion.div key={article.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} >
            <Card><CardContent className="p-5">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-[var(--radius-sm)] bg-[var(--primary-soft)] flex items-center justify-center shrink-0">
                  <BookOpen size={24} className="text-[var(--primary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[var(--primary)] mb-0.5">{article.category}</p>
                      <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] leading-tight">{article.title}</h3>
                    </div>
                    <button className="shrink-0 mt-0.5">
                      <Bookmark size={16} className={article.bookmarked ? 'text-[var(--primary)]' : 'text-[var(--text-tertiary)]'} weight={article.bookmarked ? 'fill' : 'regular'} />
                    </button>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 mt-1.5 mb-3">{article.excerpt}</p>
                  <div className="flex items-center gap-3 text-[10px] text-[var(--text-tertiary)] flex-wrap">
                    <span className="flex items-center gap-1"><Clock size={11} /> {article.readTime} daqiqa</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-[var(--border)]" />
                    <span>{article.author}</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-[var(--border)]" />
                    <span>{new Date(article.date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)]"><Heart size={11} /> {article.likes}</span>
                    <span className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)]"><ChatCircle size={11} /> {article.comments}</span>
                    <div className="flex items-center gap-1.5 ml-auto">
                      {article.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] text-[9px] font-medium">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent></Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}