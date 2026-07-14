import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlass, BookOpen, Download, Bookmark, Star, Clock, Book, FileText, Notebook } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/Progress';
import { libraryCategories, books } from '../data/mockData';

const catIcons = {
  BookOpen: BookOpen,
  GraduationCap: Notebook,
  Buildings: Book,
  Trophy: Star,
  Map: FileText,
  Newspaper: FileText,
};

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || book.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Kutubxona</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Geografiya bo'yicha barcha materiallar</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <div className="relative">
          <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input type="text" placeholder="Kitob yoki muallif qidirish..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-tertiary)] focus:border-[var(--primary)] focus:outline-none transition-all shadow-sm" />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button onClick={() => setActiveCategory('all')}
          className={cn('px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium whitespace-nowrap transition-all border', activeCategory === 'all' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] border-[var(--border)]')}>
          Barchasi
        </button>
        {libraryCategories.map((cat) => {
          const Icon = catIcons[cat.icon] || BookOpen;
          return (
            <button key={cat.id} onClick={() => setActiveCategory(cat.name)}
              className={cn('flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-sm)] text-sm font-medium whitespace-nowrap transition-all border', activeCategory === cat.name ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] border-[var(--border)]')}>
              <Icon size={14} /> {cat.name}
            </button>
          );
        })}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {libraryCategories.map((cat) => {
          const Icon = catIcons[cat.icon] || BookOpen;
          return (
            <motion.div key={cat.id} whileHover={{ y: -2 }} transition={{ duration: 0.2 }} onClick={() => setActiveCategory(cat.name)} className="cursor-pointer">
              <Card><CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-[var(--radius-xs)] flex items-center justify-center" style={{ background: `${cat.color}15`, color: cat.color }}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">{cat.name}</p>
                  <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{cat.count} ta</p>
                </div>
              </CardContent></Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">{activeCategory === 'all' ? 'Barcha Kitoblar' : activeCategory}</h2>
          <span className="text-xs text-[var(--text-tertiary)]">{filteredBooks.length} ta</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {filteredBooks.map((book, i) => (
            <motion.div key={book.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -2 }}>
              <Card><CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-14 h-18 rounded-[var(--radius-sm)] bg-[var(--primary-soft)] flex items-center justify-center shrink-0">
                    <BookOpen size={24} className="text-[var(--primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{book.title}</p>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{book.author}</p>
                      </div>
                      <button className="shrink-0">
                        <Bookmark size={16} className={book.isBookmarked ? 'text-[var(--primary)]' : 'text-[var(--text-tertiary)]'} weight={book.isBookmarked ? 'fill' : 'regular'} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-[var(--text-tertiary)]">
                      <span>{book.pages} bet</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-[var(--border)]" />
                      <span className="flex items-center gap-0.5"><Star size={10} className="text-[#D97706]" weight="fill" />{book.rating}</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-[var(--border)]" />
                      <span>{book.year}</span>
                    </div>
                    {book.readPages > 0 && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-[10px] text-[var(--text-tertiary)] mb-1">
                          <span>O'qilgan</span>
                          <span>{Math.round((book.readPages / book.pages) * 100)}%</span>
                        </div>
                        <ProgressBar value={(book.readPages / book.pages) * 100} size="sm" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-3">
                      <Button size="sm" variant="secondary"><Download size={12} /> Yuklab olish</Button>
                      <Button size="sm" variant="ghost"><BookOpen size={12} /> O'qish</Button>
                    </div>
                  </div>
                </div>
              </CardContent></Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}