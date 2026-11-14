import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap, DownloadSimple, Eye, BookOpen, MagnifyingGlass,
  ArrowRight, ArrowLeft, X, Check, UploadSimple, CaretDown,
  FilePpt, User
} from '@phosphor-icons/react';
import SEO from '../components/SEO';
import { SCHOOL_GRADES } from '../data/schoolEducationData';
import { cn } from '../lib/utils';
import Button from '../components/ui/Button';

export default function School() {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState(7);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');

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

  // Combined topics (standard + custom uploaded for this grade)
  const allGradeTopics = useMemo(() => {
    const list = [];
    currentGradeData.chapters.forEach(ch => {
      ch.topics.forEach(t => {
        list.push({ ...t, chapterId: ch.id, chapterTitle: ch.title });
      });
    });

    const userGradeUploads = customUploads
      .filter(u => Number(u.grade) === Number(selectedGrade))
      .map(u => ({
        ...u,
        chapterId: 'custom',
        chapterTitle: u.chapter || 'Qöşimça darslar',
      }));

    return [...list, ...userGradeUploads];
  }, [currentGradeData, customUploads, selectedGrade]);

  // Filtered topics
  const filteredTopics = useMemo(() => {
    return allGradeTopics.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchChapter = selectedChapter === 'all' || t.chapterId === selectedChapter;
      return matchSearch && matchChapter;
    });
  }, [allGradeTopics, searchQuery, selectedChapter]);

  // Download simulation
  const [downloadToast, setDownloadToast] = useState(null);

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
      author: uploadForm.author.trim() || "Öqituvçi",
      downloads: 1,
      date: new Date().toISOString().split('T')[0],
      chapter: uploadForm.chapter || "Qöşimça mavzular",
      description: "Öqituvçi tomonidan platformaga yuklangan taqdimot fayli.",
      slides: [
        {
          title: uploadForm.title.trim(),
          subtitle: `${uploadForm.grade}-sinf Geografiya`,
          content: "Öqituvçi tomonidan tayyorlangan dars taqdimoti.",
          points: ["1. Mavzuning asosiy rejalari", "2. Yangi tuşunçalar", "3. Mustahkamlaş savollari"]
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
        description="Özbekiston maktab darsliklarining barça taqdimotlari (prezentatsiyalari) sinfma-sinf joylaştirilgan bölim."
        url="/school"
      />

      {/* Download toast notification */}
      <AnimatePresence>
        {downloadToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-[var(--surface)] border border-emerald-500/30 text-[var(--text-primary)] px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Check size={18} weight="bold" />
            </div>
            <p className="text-xs font-semibold">{downloadToast}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div
        className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #0284C7 100%)' }}
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-bold">
            <GraduationCap size={16} weight="bold" />
            <span>Maktab Geografiya Taʼlimi</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hamma sinf darsliklarining rasmiy taqdimotlari
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            7, 8, 9, 10 va 11-sinf geografiya darsliklarining barça mavzulari böyiça tayyor prezentatsiyalar (PPTX), xaritalar va dars işlanmalari töplami.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => {
                setUploadForm(prev => ({ ...prev, grade: selectedGrade }));
                setUploadModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-white text-[var(--primary)] font-bold text-xs hover:bg-white/90 transition-all shadow-md flex items-center gap-2"
            >
              <UploadSimple size={15} weight="bold" />
              <span>Taqdimot joylaş</span>
            </button>

            <button
              onClick={() => navigate('/library')}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 border border-white/25 text-white font-bold text-xs transition-all flex items-center gap-2"
            >
              <BookOpen size={15} weight="bold" />
              <span>Darsliklar kutubxonasi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grade Selector Tabs: 7, 8, 9, 10, 11-sinf */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
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
                'px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border',
                isSelected
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)] şadow-md şadow-blue-500/20'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/40 hover:text-[var(--text-primary)]'
              )}
            >
              <span className={cn(
                'w-6 h-6 rounded-lg flex items-center justify-center text-xs font-extrabold',
                isSelected ? 'bg-white/20 text-white' : 'bg-[var(--background)] text-[var(--text-primary)]'
              )}>
                {g.grade}
              </span>
              <span>{g.title}</span>
            </button>
          );
        })}
      </div>

      {/* Current Grade Overview Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-[var(--primary-soft)] text-[var(--primary)]">
              {currentGradeData.grade}-sinf
            </span>
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              {currentGradeData.subtitle}
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Darslik mualliflari: <span className="font-medium text-[var(--text-primary)]">{currentGradeData.author}</span> • {currentGradeData.year}-yil naşri ({currentGradeData.hours})
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs font-semibold text-[var(--text-secondary)]">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--background)] border border-[var(--border)]">
            <FilePpt size={16} className="text-amber-500" weight="fill" />
            <span>{filteredTopics.length} ta taqdimot</span>
          </div>
        </div>
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
            placeholder="Mavzu yoki kalit söz böyiça qidiriş..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            >
              <X size={14} weight="bold" />
            </button>
          )}
        </div>

        {/* Chapter Filter Dropdown */}
        <div className="relative sm:w-64 shrink-0">
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="w-full h-11 px-3.5 pr-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-all appearance-none cursor-pointer"
          >
            <option value="all">Barça boblar</option>
            {currentGradeData.chapters.map(ch => (
              <option key={ch.id} value={ch.id}>{ch.title}</option>
            ))}
          </select>
          <CaretDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
        </div>
      </div>

      {/* Presentations List */}
      <div className="space-y-3">
        {filteredTopics.length === 0 ? (
          <div className="text-center py-12 bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center mx-auto">
              <FilePpt size={24} weight="duotone" />
            </div>
            <p className="text-sm font-bold text-[var(--text-primary)]">Heç qanday taqdimot topilmadi</p>
            <p className="text-xs text-[var(--text-secondary)]">Qidiruv sözini özgartirib köring yoki yangi taqdimot yuklang.</p>
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
                      <span>{topic.downloads} yuklab oliş</span>
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
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye size={15} weight="bold" />
                    <span>Köriş</span>
                  </button>
                )}

                <button
                  onClick={() => handleDownload(topic)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <DownloadSimple size={15} weight="bold" />
                  <span>Yuklab oliş</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Interactive Presentation Slide Viewer Modal */}
      <AnimatePresence>
        {previewTopic && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
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
                    {selectedGrade}-sinf • Taqdimotni köriş
                  </span>
                  <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug">
                    {previewTopic.title}
                  </h3>
                </div>
                <button
                  onClick={() => setPreviewTopic(null)}
                  className="w-8 h-8 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
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
                    <span>GeoBek.uz • Maktab taʼlimi</span>
                    <span>{previewTopic.author}</span>
                  </div>
                </div>
              )}

              {/* Slide Navigation Controls */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  disabled={activeSlideIndex === 0}
                  onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                  className="px-3 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)] disabled:opacity-40 flex items-center gap-1.5 hover:bg-[var(--background)] transition-all"
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
                        'w-2.5 h-2.5 rounded-full transition-all',
                        idx === activeSlideIndex ? 'bg-[var(--primary)] scale-125' : 'bg-[var(--border)]'
                      )}
                    />
                  ))}
                </div>

                {previewTopic.slides && activeSlideIndex < previewTopic.slides.length - 1 ? (
                  <button
                    onClick={() => setActiveSlideIndex(prev => prev + 1)}
                    className="px-3 py-2 rounded-xl bg-[var(--background)] border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5 hover:bg-[var(--surface)] transition-all"
                  >
                    <span>Keyingi slayd</span>
                    <ArrowRight size={14} weight="bold" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleDownload(previewTopic)}
                    className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <DownloadSimple size={14} weight="bold" />
                    <span>Yuklab oliş</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Presentation Modal (For Teachers and Educators) */}
      <AnimatePresence>
        {uploadModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">Taqdimot joylaş</h3>
                    <p className="text-[11px] text-[var(--text-secondary)]">Geografiya darslari uçun yangi taqdimot</p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
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
                  <p className="text-xs text-[var(--text-secondary)]">Fayl röyxatga qöşildi va foydalanişga tayyor.</p>
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
                            'py-1.5 rounded-xl border text-xs font-bold transition-all text-center',
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
                      placeholder="Masalan: Özbekiston foydali qazilmalari"
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
                      <p className="text-xs font-semibold text-[var(--text-primary)]">Faylni tanlang yoki şu yerga taşlang</p>
                      <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Maksimal hajm: 50 MB</p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 rounded-xl text-xs font-bold mt-2">
                    Taqdimotni yuklaş
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
