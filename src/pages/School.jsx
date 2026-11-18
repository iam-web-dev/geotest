import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap, DownloadSimple, Eye, BookOpen, MagnifyingGlass,
  ArrowRight, ArrowLeft, X, Check, UploadSimple, CaretDown,
  FilePpt, User, Globe
} from '@phosphor-icons/react';
import SEO from '../components/SEO';
import { SCHOOL_GRADES, SUBJECTS, SCHOOL_TEXTBOOKS } from '../data/schoolEducationData';
import { cn } from '../lib/utils';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

export default function School() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [selectedGrade, setSelectedGrade] = useState(7);
  const [selectedLanguage, setSelectedLanguage] = useState(language || 'uz');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');
  const [activeMaterialType, setActiveMaterialType] = useState('all'); // 'all', 'textbooks', 'presentations'

  // Sync default language when app language changes
  useEffect(() => {
    if (language) {
      setSelectedLanguage(language);
    }
  }, [language]);

  // Interactive slide preview modal state
  const [previewTopic, setPreviewTopic] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Upload presentation modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    grade: 7,
    title: '',
    chapter: '',
    slidesCount: 20,
    author: '',
    file: null,
  });

  // Local uploads stored in localStorage
  const [customUploads, setCustomUploads] = useState(() => {
    try {
      const saved = localStorage.getItem('geo_custom_presentations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active grade data
  const currentGradeData = useMemo(() => {
    return SCHOOL_GRADES.find(g => g.grade === selectedGrade) || SCHOOL_GRADES[0];
  }, [selectedGrade]);

  // Filtered textbooks for this grade, language and subject
  const filteredTextbooks = useMemo(() => {
    return (SCHOOL_TEXTBOOKS || []).filter(tb => {
      const matchGrade = tb.grade === selectedGrade;
      const matchLanguage = tb.language === selectedLanguage;
      const matchSubject = selectedSubject === 'all' || tb.subject === selectedSubject || (selectedSubject === 'geography' && (tb.subject === 'physical' || tb.subject === 'economic'));
      const matchSearch = !searchQuery.trim() || 
        tb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tb.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGrade && matchLanguage && matchSubject && matchSearch;
    });
  }, [selectedGrade, selectedLanguage, selectedSubject, searchQuery]);

  // Combined topics (standard + custom uploaded for this grade)
  const allGradeTopics = useMemo(() => {
    const list = [];
    currentGradeData.chapters.forEach(ch => {
      // Check chapter language filter
      if (!ch.language || ch.language === selectedLanguage) {
        ch.topics.forEach(t => {
          if (!t.language || t.language === selectedLanguage) {
            list.push({ ...t, chapterId: ch.id, chapterTitle: ch.title });
          }
        });
      }
    });

    const userGradeUploads = customUploads
      .filter(u => Number(u.grade) === Number(selectedGrade) && (!u.language || u.language === selectedLanguage))
      .map(u => ({
        ...u,
        chapterId: 'custom',
        chapterTitle: u.chapter || 'Qoʻshimcha darslar',
      }));

    return [...list, ...userGradeUploads];
  }, [currentGradeData, customUploads, selectedGrade, selectedLanguage]);

  // Filtered topics
  const filteredTopics = useMemo(() => {
    return allGradeTopics.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchChapter = selectedChapter === 'all' || t.chapterId === selectedChapter;
      const matchSubject = selectedSubject === 'all' || !t.subject || t.subject === selectedSubject || (selectedSubject === 'geography' && (t.subject === 'physical' || t.subject === 'economic'));
      return matchSearch && matchChapter && matchSubject;
    });
  }, [allGradeTopics, searchQuery, selectedChapter, selectedSubject]);

  // Download simulation
  const [downloadToast, setDownloadToast] = useState(null);

  const handleDownloadTextbook = (tb) => {
    setDownloadToast(`"${tb.title}" darsligi yuklab olinmoqda...`);

    const content = `GEOBEK PLATFORMASI - MAKTAB ELEKTRON DARSLIGI
Kitob: ${tb.title}
Sinf: ${tb.grade}-sinf
Fan: ${tb.subject}
Muallif: ${tb.author}
Nashr yili: ${tb.year}
Sahifalar: ${tb.pages} bet
Hajmi: ${tb.fileSize}
Format: PDF
Sayt: https://geobek.uz`;

    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tb.title.replace(/[^a-zA-Z0-9_\u0400-\u04FF]/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadToast(`"${tb.title}" muvaffaqiyatli yuklab olindi!`);
      setTimeout(() => setDownloadToast(null), 3500);
    }, 600);
  };

  const handleDownload = (topic) => {
    setDownloadToast(`"${topic.title}" taqdimoti yuklab olinmoqda...`);

    // Create a real downloadable text/presentation placeholder blob
    const content = `GEOBEK PLATFORMASI - MAKTAB TA'LIMI
Mavzu: ${topic.title}
Sinf: ${selectedGrade}-sinf Geografiya
Muallif: ${topic.author}
Slaydlar soni: ${topic.slidesCount} ta
Format: PPTX taqdimot fayli
Sayt: https://geobek.uz`;

    const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.title.replace(/[^a-zA-Z0-9_\u0400-\u04FF]/g, '_')}.pptx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadToast(`"${topic.title}" muvaffaqiyatli yuklab olindi!`);
      setTimeout(() => setDownloadToast(null), 3500);
    }, 600);
  };

  // Handle Upload Submission
  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadForm.title.trim()) return;

    const newTopic = {
      id: 'custom-' + Date.now(),
      grade: uploadForm.grade,
      number: allGradeTopics.length + 1,
      title: uploadForm.title.trim(),
      slidesCount: Number(uploadForm.slidesCount) || 20,
      fileSize: "15.0 MB",
      format: "PPTX",
      author: uploadForm.author.trim() || "Oʻqituvchi",
      downloads: 1,
      date: new Date().toISOString().split('T')[0],
      chapter: uploadForm.chapter || "Qoʻshimcha mavzular",
      description: "Oʻqituvchi tomonidan platformaga yuklangan taqdimot fayli.",
      slides: [
        {
          title: uploadForm.title.trim(),
          subtitle: `${uploadForm.grade}-sinf Geografiya`,
          content: "Oʻqituvchi tomonidan tayyorlangan dars taqdimoti.",
          points: ["1. Mavzuning asosiy rejalari", "2. Yangi tushunchalar", "3. Mustahkamlash savollari"]
        }
      ]
    };

    const updated = [newTopic, ...customUploads];
    setCustomUploads(updated);
    try {
      localStorage.setItem('geo_custom_presentations', JSON.stringify(updated));
    } catch {
      // storage full
    }

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadModalOpen(false);
      setUploadForm({
        grade: selectedGrade,
        title: '',
        chapter: '',
        slidesCount: 20,
        author: '',
        file: null,
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      <SEO
        title="Maktab Ta'limi — 7, 8, 9, 10, 11-sinf Geografiya Taqdimotlari"
        description="Oʻzbekiston maktab darsliklarining barcha taqdimotlari (prezentatsiyalari) sinfma-sinf joylashtirilgan boʻlim."
        url="/school"
      />

      {/* Download toast notification */}
      <AnimatePresence>
        {downloadToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-[10000] bg-[var(--surface)] border border-emerald-500/30 text-[var(--text-primary)] px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Check size={18} weight="bold" />
            </div>
            <p className="text-xs font-semibold">{downloadToast}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header (Matching Library style) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Maktab taʼlimi
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Barcha sinflar va fanlar boʻyicha darsliklar hamda taqdimotlar
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setUploadForm(prev => ({ ...prev, grade: selectedGrade }));
              setUploadModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-[var(--primary)] text-white font-bold text-xs hover:bg-[var(--primary-hover)] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <UploadSimple size={15} weight="bold" />
            <span>Taqdimot joylash</span>
          </button>
        </div>
      </div>

      {/* ── Filter Toolbar: Sinf -> Til -> Fan ── */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
        {/* Sinf */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-secondary)]">
              Sinf:
            </span>
            <span className="text-xs font-bold text-[var(--primary)] font-mono">
              {selectedGrade}-sinf
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SCHOOL_GRADES.map((g) => {
              const isSelected = selectedGrade === g.grade;
              return (
                <button
                  key={g.grade}
                  onClick={() => {
                    setSelectedGrade(g.grade);
                    setSelectedChapter('all');
                  }}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border cursor-pointer',
                    isSelected
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
                      : 'bg-[var(--background)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/40 hover:text-[var(--text-primary)]'
                  )}
                >
                  <span className={cn(
                    'w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-extrabold',
                    isSelected ? 'bg-white/20 text-white' : 'bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]'
                  )}>
                    {g.grade}
                  </span>
                  <span>{g.grade}-sinf</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Til */}
        <div className="space-y-2 pt-3 border-t border-[var(--border)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-secondary)]">
              Til:
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'uz', label: 'Oʻzbekcha', flag: '🇺🇿' },
              { id: 'ru', label: 'Русский', flag: '🇷🇺' },
              { id: 'kaa', label: 'Qaraqalpaqsha', flag: '🇺🇿' },
            ].map((langItem) => {
              const isSelected = selectedLanguage === langItem.id;
              return (
                <button
                  key={langItem.id}
                  onClick={() => {
                    setSelectedLanguage(langItem.id);
                    setSelectedChapter('all');
                  }}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border cursor-pointer',
                    isSelected
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
                      : 'bg-[var(--background)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/40 hover:text-[var(--text-primary)]'
                  )}
                >
                  <span>{langItem.flag}</span>
                  <span>{langItem.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fan */}
        <div className="space-y-2 pt-3 border-t border-[var(--border)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-secondary)]">
              Fan:
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SUBJECTS.map((sub) => {
              const isSelected = selectedSubject === sub.id;
              const title = selectedLanguage === 'ru' ? sub.titleRu : selectedLanguage === 'kaa' ? sub.titleKaa : sub.title;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubject(sub.id);
                    setSelectedChapter('all');
                  }}
                  className={cn(
                    'px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 border cursor-pointer',
                    isSelected
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
                      : 'bg-[var(--background)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/40 hover:text-[var(--text-primary)]'
                  )}
                >
                  {title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Grade Overview Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-[var(--primary-soft)] text-[var(--primary)]">
              {currentGradeData.grade}-sinf
            </span>
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              {selectedSubject === 'all' ? `${selectedGrade}-sinf darsliklari va taqdimotlari` : currentGradeData.subtitle}
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Darslik mualliflari: <span className="font-medium text-[var(--text-primary)]">{currentGradeData.author}</span> • {currentGradeData.year}-yil nashri
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0 text-xs font-semibold text-[var(--text-secondary)]">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--background)] border border-[var(--border)]">
            <BookOpen size={16} className="text-blue-500" weight="fill" />
            <span>{filteredTextbooks.length} ta darslik</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--background)] border border-[var(--border)]">
            <FilePpt size={16} className="text-amber-500" weight="fill" />
            <span>{filteredTopics.length} ta taqdimot</span>
          </div>
        </div>
      </div>

      {/* Material Type Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'Barcha materiallar', count: filteredTextbooks.length + filteredTopics.length },
          { id: 'textbooks', label: 'Darsliklar', count: filteredTextbooks.length, icon: BookOpen },
          { id: 'presentations', label: 'Taqdimotlar', count: filteredTopics.length, icon: FilePpt },
        ].map((tab) => {
          const isSelected = activeMaterialType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMaterialType(tab.id)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border cursor-pointer',
                isSelected
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/40 hover:text-[var(--text-primary)]'
              )}
            >
              {tab.icon && <tab.icon size={15} weight="bold" />}
              <span>{tab.label}</span>
              <span className={cn(
                'text-[10px] px-1.5 py-0.2 rounded font-mono',
                isSelected ? 'bg-white/20 text-white' : 'bg-[var(--background)] text-[var(--text-tertiary)]'
              )}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <MagnifyingGlass size={16} weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Darslik, mavzu yoki muallif boʻyicha qidirish..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X size={14} weight="bold" />
            </button>
          )}
        </div>

        {/* Chapter Filter Dropdown (Active for presentations) */}
        {(activeMaterialType === 'all' || activeMaterialType === 'presentations') && (
          <div className="relative sm:w-64 shrink-0">
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full h-11 px-3.5 pr-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-all appearance-none cursor-pointer"
            >
              <option value="all">Barcha boblar</option>
              {currentGradeData.chapters.map(ch => (
                <option key={ch.id} value={ch.id}>{ch.title}</option>
              ))}
            </select>
            <CaretDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
          </div>
        )}
      </div>

      {/* ── Textbooks Section ── */}
      {(activeMaterialType === 'all' || activeMaterialType === 'textbooks') && filteredTextbooks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <BookOpen size={17} weight="duotone" className="text-[var(--primary)]" />
              <span>Darsliklar ({filteredTextbooks.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredTextbooks.map((tb) => (
              <div
                key={tb.id}
                className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/40 transition-all flex flex-col justify-between gap-3 shadow-xs group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-16 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0 border border-[var(--border)] shadow-xs relative">
                    <img
                      src={tb.cover}
                      alt={tb.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <span className="absolute bottom-1 right-1 text-[8px] font-bold px-1 rounded bg-black/70 text-white font-mono uppercase">
                      PDF
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[var(--primary-soft)] text-[var(--primary)]">
                        {tb.grade}-sinf
                      </span>
                      <span className="text-[10px] font-semibold text-[var(--text-tertiary)]">
                        {tb.year}-yil
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-snug">
                      {tb.title}
                    </h3>
                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                      {tb.author}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                    {tb.pages} bet • {tb.fileSize}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDownloadTextbook(tb)}
                      className="px-2.5 py-1.5 rounded-lg bg-[var(--primary-soft)] hover:bg-[var(--primary)] text-[var(--primary)] hover:text-white transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="Yuklab olish"
                    >
                      <DownloadSimple size={13} weight="bold" />
                      <span>Yuklab olish</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Presentations Section ── */}
      {(activeMaterialType === 'all' || activeMaterialType === 'presentations') && (
        <div className="space-y-3">
          {activeMaterialType === 'all' && filteredTopics.length > 0 && (
            <div className="flex items-center justify-between pt-3">
              <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <FilePpt size={17} weight="duotone" className="text-amber-500" />
                <span>Mavzular taqdimotlari ({filteredTopics.length})</span>
              </h2>
            </div>
          )}

          {filteredTopics.length === 0 && (activeMaterialType === 'presentations' || (activeMaterialType === 'all' && filteredTextbooks.length === 0)) ? (
            <div className="text-center py-12 bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center mx-auto">
                <FilePpt size={24} weight="duotone" />
              </div>
              <p className="text-sm font-bold text-[var(--text-primary)]">Hech qanday material topilmadi</p>
              <p className="text-xs text-[var(--text-secondary)]">Qidiruv soʻzini yoki filtrlarni oʻzgartirib koʻring.</p>
            </div>
          ) : (
            filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <FilePpt size={22} weight="fill" />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--background)] text-[var(--text-secondary)] border border-[var(--border)]">
                        {topic.format || 'PPTX'}
                      </span>
                      <span className="text-[10px] text-[var(--text-tertiary)] font-medium">
                        {topic.slidesCount} slayd • {topic.fileSize}
                      </span>
                      <span className="text-[10px] text-[var(--text-tertiary)]">
                        {topic.chapterTitle}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                      {topic.title}
                    </h3>

                    {topic.description && (
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                        {topic.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-[11px] text-[var(--text-tertiary)] pt-1">
                      <span className="flex items-center gap-1 font-medium">
                        <User size={12} weight="bold" />
                        <span>{topic.author}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <DownloadSimple size={12} weight="bold" />
                        <span>{topic.downloads} yuklab olish</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--border)]">
                  {topic.slides && topic.slides.length > 0 && (
                    <button
                      onClick={() => {
                        setPreviewTopic(topic);
                        setActiveSlideIndex(0);
                      }}
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye size={15} weight="bold" />
                      <span>Koʻrish</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDownload(topic)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <DownloadSimple size={15} weight="bold" />
                    <span>Yuklab olish</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Interactive Presentation Slide Viewer Modal */}
      <AnimatePresence>
        {previewTopic && createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setPreviewTopic(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--border)]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--primary)]">
                    {selectedGrade}-sinf • Taqdimotni koʻrish
                  </span>
                  <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug">
                    {previewTopic.title}
                  </h3>
                </div>
                <button
                  onClick={() => setPreviewTopic(null)}
                  className="w-8 h-8 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              {/* Current Slide Canvas */}
              {previewTopic.slides && previewTopic.slides[activeSlideIndex] && (
                <div
                  className="flex-1 min-h-[220px] rounded-2xl p-6 text-white flex flex-col justify-between shadow-inner"
                  style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)' }}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-400">
                      Slayd {activeSlideIndex + 1} / {previewTopic.slides.length}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      {previewTopic.slides[activeSlideIndex].title}
                    </h4>
                    {previewTopic.slides[activeSlideIndex].subtitle && (
                      <p className="text-xs text-slate-300">
                        {previewTopic.slides[activeSlideIndex].subtitle}
                      </p>
                    )}
                  </div>

                  <div className="my-4 space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {previewTopic.slides[activeSlideIndex].content && (
                      <p>{previewTopic.slides[activeSlideIndex].content}</p>
                    )}
                    {previewTopic.slides[activeSlideIndex].points && (
                      <ul className="space-y-1.5 list-disc list-inside">
                        {previewTopic.slides[activeSlideIndex].points.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-slate-700">
                    <span>GEOBEK.uz • Maktab taʼlimi</span>
                    <span>{previewTopic.author}</span>
                  </div>
                </div>
              )}

              {/* Slide Navigation Controls */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  disabled={activeSlideIndex === 0}
                  onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                  className="px-3 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)] disabled:opacity-40 flex items-center gap-1.5 hover:bg-[var(--background)] transition-all cursor-pointer"
                >
                  <ArrowLeft size={14} weight="bold" />
                  <span>Oldingi slayd</span>
                </button>

                <div className="flex gap-1.5">
                  {previewTopic.slides && previewTopic.slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={cn(
                        'w-2.5 h-2.5 rounded-full transition-all cursor-pointer',
                        idx === activeSlideIndex ? 'bg-[var(--primary)] scale-125' : 'bg-[var(--border)]'
                      )}
                    />
                  ))}
                </div>

                {previewTopic.slides && activeSlideIndex < previewTopic.slides.length - 1 ? (
                  <button
                    onClick={() => setActiveSlideIndex(prev => prev + 1)}
                    className="px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5 hover:bg-[var(--surface)] transition-all cursor-pointer"
                  >
                    <span>Keyingi slayd</span>
                    <ArrowRight size={14} weight="bold" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleDownload(previewTopic)}
                    className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <DownloadSimple size={14} weight="bold" />
                    <span>Yuklab olish</span>
                  </button>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
      </AnimatePresence>

      {/* Upload Presentation Modal (For Teachers and Educators) */}
      <AnimatePresence>
        {uploadModalOpen && createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setUploadModalOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center">
                    <UploadSimple size={18} weight="bold" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">Taqdimot joylash</h3>
                    <p className="text-[11px] text-[var(--text-secondary)]">Geografiya darslari uchun yangi taqdimot</p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  <X size={14} weight="bold" />
                </button>
              </div>

              {uploadSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <Check size={24} weight="bold" />
                  </div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">Taqdimot muvaffaqiyatli yuklandi!</p>
                  <p className="text-xs text-[var(--text-secondary)]">Fayl roʻyxatga qoʻshildi va foydalanishga tayyor.</p>
                </div>
              ) : (
                <form onSubmit={handleUploadSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--text-primary)]">Sinfni tanlang</label>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[7, 8, 9, 10, 11].map(gr => (
                        <button
                          key={gr}
                          type="button"
                          onClick={() => setUploadForm(prev => ({ ...prev, grade: gr }))}
                          className={cn(
                            'py-1.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer',
                            uploadForm.grade === gr
                              ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                              : 'bg-[var(--background)] border-[var(--border)] text-[var(--text-secondary)]'
                          )}
                        >
                          {gr}-sinf
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--text-primary)]">Mavzu nomi</label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Oʻzbekiston foydali qazilmalari"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[var(--text-primary)]">Muallif / F.I.O.</label>
                      <input
                        type="text"
                        placeholder="Qambarov O.X."
                        value={uploadForm.author}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[var(--text-primary)]">Slaydlar soni</label>
                      <input
                        type="number"
                        min="5"
                        max="100"
                        value={uploadForm.slidesCount}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, slidesCount: e.target.value }))}
                        className="w-full h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[var(--text-primary)]">Taqdimot fayli (.pptx / .pdf)</label>
                    <div className="p-4 border-2 border-dashed border-[var(--border)] rounded-2xl text-center bg-[var(--background)] hover:border-[var(--primary)]/50 transition-colors cursor-pointer">
                      <FilePpt size={24} className="text-[var(--primary)] mx-auto mb-1" weight="duotone" />
                      <p className="text-xs font-semibold text-[var(--text-primary)]">Faylni tanlang yoki shu yerga tashlang</p>
                      <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Maksimal hajm: 50 MB</p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 rounded-xl text-xs font-bold mt-2 cursor-pointer">
                    Taqdimotni yuklash
                  </Button>
                </form>
              )}
            </div>
          </div>,
          document.body
        )}
      </AnimatePresence>
    </div>
  );
}
