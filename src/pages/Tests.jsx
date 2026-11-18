import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Clock, CaretLeft, CaretRight, FileText, ChartBar,
  Users, Check, X, ArrowsClockwise, ArrowLeft,
} from '@phosphor-icons/react';
import { cn, formatTime, canHover } from '../lib/utils';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/Progress';
import {
  testCategories, popularTests, milliySertifikatQuestions,
  dtmQuestions, olympiadQuestions, attestationQuestions
} from '../data/mockData';
import { OLYMPIAD_TESTS } from '../data/olympiadTestsData.js';
import {
  StickerCertificate,
  StickerMilliyBadge, StickerDTMRocket, StickerOlympiadTrophy, StickerAttestationShield
} from '../components/illustrations/GeoIllustrations';

const categoryStickerMap = {
  milliy: StickerMilliyBadge,
  dtm: StickerDTMRocket,
  olympiad: StickerOlympiadTrophy,
  attestation: StickerAttestationShield,
};

const categoryPalette = {
  milliy:      { color: '#1E5BF8', bg: 'var(--primary-soft)' },
  dtm:         { color: '#1E5BF8', bg: 'var(--primary-soft)' },
  olympiad:    { color: '#1E5BF8', bg: 'var(--primary-soft)' },
  attestation: { color: '#1E5BF8', bg: 'var(--primary-soft)' },
};

const testStickers = {
  milliy:      { Sticker: StickerMilliyBadge,      color: '#1E5BF8', bg: 'var(--primary-soft)', label: 'Milliy Sertifikat' },
  dtm:         { Sticker: StickerDTMRocket,         color: '#1E5BF8', bg: 'var(--primary-soft)', label: 'DTM' },
  olympiad:    { Sticker: StickerOlympiadTrophy,    color: '#1E5BF8', bg: 'var(--primary-soft)', label: 'Olimpiada' },
  attestation: { Sticker: StickerAttestationShield, color: '#1E5BF8', bg: 'var(--primary-soft)', label: 'Attestatsiya' },
};

function TestCategoryCard({ category }) {
  const Sticker = categoryStickerMap[category.id] || StickerCertificate;
  const p = categoryPalette[category.id] || categoryPalette.milliy;

  return (
    <motion.div
      whileTap={canHover ? { scale: 0.96 } : undefined}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
    >
      <Link to={`/tests/${category.id}`}>
        <div
          className="relative rounded-[var(--radius)] overflow-hidden cursor-pointer aspect-square sm:aspect-auto flex flex-col"
          style={{ background: p.bg }}
        >
          <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
               style={{ background: p.color, opacity: 0.14 }} />
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full pointer-events-none"
               style={{ background: p.color, opacity: 0.1 }} />

          <div className="relative z-10 flex-1 sm:flex-none sm:h-[88px] flex items-center justify-center">
            <Sticker size={68} color={p.color} />
          </div>
          <div className="mx-4 h-px shrink-0" style={{ background: p.color, opacity: 0.18 }} />
          <div className="relative z-10 shrink-0 flex items-center justify-between px-4 py-3">
            <div className="min-w-0 flex-1 mr-2">
              <p className="font-bold text-[var(--text-primary)] text-sm leading-tight truncate">{category.title}</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: p.color }}>{category.count} ta test</p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                 style={{ background: p.color }}>
              <CaretRight size={14} color="white" weight="bold" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CategoryTestsPage({ type }) {
  const navigate = useNavigate();
  const [examStarted, setExamStarted] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [olympiadFilter, setOlympiadFilter] = useState('all');

  if (examStarted) {
    const handleExit = () => {
      setExamStarted(false);
      setSelectedTest(null);
    };
    if (type === 'milliy')      return <MilliyTestView test={selectedTest} onExit={handleExit} />;
    if (type === 'dtm')         return <DTMTestView test={selectedTest} onExit={handleExit} />;
    if (type === 'olympiad')    return <OlympiadTestView test={selectedTest || OLYMPIAD_TESTS[0]} onExit={handleExit} />;
    if (type === 'attestation') return <AttestationTestView test={selectedTest} onExit={handleExit} />;
  }

  const meta = testStickers[type] || testStickers.milliy;
  const { Sticker } = meta;
  const category = testCategories.find(c => c.id === type);
  let tests = popularTests.filter(t => t.type === type);

  if (type === 'olympiad') {
    if (olympiadFilter === 'tuman') {
      tests = tests.filter(t => t.stage === 'tuman');
    } else if (olympiadFilter === 'viloyat') {
      tests = tests.filter(t => t.stage === 'viloyat');
    } else if (olympiadFilter === 'grade-9') {
      tests = tests.filter(t => t.grade === 9);
    } else if (olympiadFilter === 'grade-10') {
      tests = tests.filter(t => t.grade === 10);
    } else if (olympiadFilter === 'grade-11') {
      tests = tests.filter(t => t.grade === 11);
    }
  }

  const pageSeoMap = {
    milliy:      { title: "Milliy Sertifikat Geografiya Mock Testlari", desc: "Milliy Sertifikat geografiya imtihoniga real mock testlar, ochiq savollar va rasmiy format bilan tayyorlaning." },
    dtm:         { title: "DTM Geografiya Testlari", desc: "Oʻzbekiston DTM kirish imtihoniga 90 savollik toʻliq geografiya amaliy testlari bilan tayyorlaning." },
    olympiad:    { title: "Geografiya Olimpiada Testlari (Tuman va Viloyat)", desc: "9, 10 va 11-sinflar uchun 2024-yilgi rasmiy geografiya fan olimpiadasi tuman va viloyat bosqich testlari — toʻliq yechimlari bilan." },
    attestation: { title: "Attestatsiya Geografiya Testlari", desc: "Maktab attestatsiyasi uchun geografiya testlari — tezkor baholash va batafsil natijalar bilan." },
  };
  const seo = pageSeoMap[type] || { title: "Geografiya Testlari", desc: "Geografiya testlarini ishlang." };

  return (
    <div className="space-y-6">
      <SEO title={seo.title} description={seo.desc} url={`/tests/${type}`} />
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/tests')}
          className="flex items-center gap-1 text-[var(--primary)] text-sm font-semibold mb-3"
        >
          <CaretLeft size={14} weight="bold" /> Testlar
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              {category?.title || meta.label}
            </h1>
            <p className="text-sm font-semibold mt-1" style={{ color: meta.color }}>
              {tests.length} ta rasmiy olimpiada testi mavjud
            </p>
          </div>
        </div>
      </div>

      {/* Olimpiada bosqich / sinf filtri */}
      {type === 'olympiad' && (
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Barchasi (6)' },
            { id: 'tuman', label: 'Tuman bosqichi (3)' },
            { id: 'viloyat', label: 'Viloyat bosqichi (3)' },
            { id: 'grade-9', label: '9-sinf (2)' },
            { id: 'grade-10', label: '10-sinf (2)' },
            { id: 'grade-11', label: '11-sinf (2)' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setOlympiadFilter(f.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer",
                olympiadFilter === f.id
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--primary)]/40"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Test cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {tests.map((test) => {
          const isOlympiad = test.type === 'olympiad';
          return (
            <div key={test.id}>
              <Card className="overflow-hidden h-full flex flex-col justify-between">
                <div>
                  {/* Sticker header */}
                  <div className="flex items-center gap-3 px-4 py-4" style={{ background: meta.bg }}>
                    <Sticker size={48} color={meta.color} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[var(--text-primary)] leading-tight">{test.title}</p>
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span
                          className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: meta.color + '20', color: meta.color }}
                        >
                          {test.stageLabel || meta.label}
                        </span>
                        {test.grade && (
                          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]">
                            {test.grade}-sinf
                          </span>
                        )}
                        {test.totalPoints && (
                          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)]">
                            {test.totalPoints} ball
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <CardContent className="px-4 py-4">
                    {/* Stats */}
                    <div className="grid grid-cols-3 text-center rounded-[var(--radius-xs)] overflow-hidden border border-[var(--border)] mb-4 bg-[var(--surface-sunken)]">
                      <div className="py-2.5 border-r border-[var(--border)]">
                        <p className="text-sm font-bold text-[var(--text-primary)]">{test.questions}</p>
                        <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Savol</p>
                      </div>
                      <div className="py-2.5 border-r border-[var(--border)]">
                        <p className="text-sm font-bold text-[var(--text-primary)]">{test.time}</p>
                        <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Daqiqa</p>
                      </div>
                      <div className="py-2.5">
                        <p className="text-sm font-bold" style={{ color: meta.color }}>
                          {test.participants.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Ishtirok</p>
                      </div>
                    </div>
                  </CardContent>
                </div>

                <div className="px-4 pb-4">
                  {/* Start button */}
                  <button
                    onClick={() => {
                      if (isOlympiad) {
                        const fullTest = OLYMPIAD_TESTS.find(t => t.id === test.id || t.id === test.testId) || test;
                        setSelectedTest(fullTest);
                      } else {
                        setSelectedTest(test);
                      }
                      setExamStarted(true);
                    }}
                    className="w-full py-2.5 rounded-[var(--radius-xs)] text-sm font-bold text-white transition-opacity active:opacity-80 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
                    style={{ background: meta.color }}
                  >
                    Boshlash <CaretRight size={15} weight="bold" />
                  </button>
                </div>
              </Card>
            </div>
        );
      })}
      </div>
    </div>
  );
}

export function TestExamCard({ test }) {
  const colors = {
    milliy: { bg: 'var(--primary-soft)', color: '#1E5BF8', label: 'Milliy Sertifikat' },
    dtm: { bg: 'var(--primary-soft)', color: '#1E5BF8', label: 'DTM' },
    olympiad: { bg: 'var(--primary-soft)', color: '#1E5BF8', label: 'Olimpiada' },
    attestation: { bg: 'var(--primary-soft)', color: '#1E5BF8', label: 'Attestatsiya' },
  };
  const c = colors[test.type] || colors.milliy;

  const typeStickerMap = {
    milliy: StickerMilliyBadge,
    dtm: StickerDTMRocket,
    olympiad: StickerOlympiadTrophy,
    attestation: StickerAttestationShield,
  };
  const TypeSticker = typeStickerMap[test.type] || StickerMilliyBadge;

  return (
    <div>
      <Card className="overflow-hidden hover:shadow-md transition-all h-full">
        {/* Colored header */}
        <div className="flex items-center gap-3 px-4 py-3" style={{ background: c.bg }}>
          <div className="shrink-0">
            <TypeSticker size={44} color={c.color} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{test.title}</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: c.color }}>{c.label}</p>
          </div>
        </div>

        <CardContent className="p-4 pt-3">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
              <FileText size={13} />
              {test.questions} ta savol
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
              <Clock size={13} />
              {test.time} daqiqa
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
              <Users size={13} />
              {test.participants.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 text-xs" style={{
              color: test.difficulty === 'easy' ? '#22C55E' : test.difficulty === 'medium' ? '#F59E0B' : test.difficulty === 'hard' ? '#EF4444' : '#1E5BF8'
            }}>
              <ChartBar size={13} />
              {test.difficulty === 'easy' ? 'Oson' : test.difficulty === 'medium' ? "Oʻrtacha" : test.difficulty === 'hard' ? 'Qiyin' : 'Ekspert'}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Oʻrtacha natija</p>
              <p className="text-lg font-bold" style={{ color: c.color }}>{test.averageScore}%</p>
            </div>
            <Button>
              Boshlash <CaretRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Universal Test Runner & Results View (Minimalist & Intuitive)
// ─────────────────────────────────────────────────────────────────────────────

function cleanQuestionText(text) {
  if (!text) return '';
  return text.replace(/^\d+[.)]\s*/, '').trim();
}

function parseOption(option) {
  if (typeof option !== 'string') return { letter: '', text: '' };
  const match = option.match(/^([A-D])[.)]\s*(.*)$/i);
  if (match) {
    return { letter: match[1].toUpperCase(), text: match[2].trim() };
  }
  return { letter: option.charAt(0).toUpperCase(), text: option.slice(3).trim() || option };
}

function fireTestConfetti() {
  const colors = ['#2563EB', '#F59E0B', '#22C55E', '#8B5CF6'];
  const end = Date.now() + 1300;
  (function frame() {
    try {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    } catch {
      // ignore in headless
    }
  })();
  try {
    confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 }, colors, startVelocity: 45, scalar: 1.05 });
  } catch {
    // ignore
  }
}

function TestRunnerView({ test = null, questionsData = [], onExit }) {
  const currentTest = test || {};
  const [questions, setQuestions] = useState(() =>
    questionsData.map(q => ({ ...q, userAnswer: null }))
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => (currentTest.time || 90) * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'wrong' | 'correct' | 'unanswered'
  const confettiFired = useRef(false);

  const answeredCount = questions.filter(q => q.userAnswer !== null).length;

  const handleFinish = useCallback(() => {
    setIsFinished(true);
  }, []);

  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished, handleFinish]);

  const handleAnswer = (letter) => {
    setQuestions(prev => prev.map((q, i) => i === currentQuestion ? { ...q, userAnswer: letter } : q));
  };

  const handleRestart = () => {
    confettiFired.current = false;
    setQuestions(questionsData.map(q => ({ ...q, userAnswer: null })));
    setCurrentQuestion(0);
    setTimeLeft((currentTest.time || 90) * 60);
    setIsFinished(false);
    setReviewFilter('all');
  };

  // Natijalar hisob-kitobi
  const earnedScore = Number(questions.reduce((sum, q) => q.userAnswer === q.correctAnswer ? sum + (Number(q.points) || 1) : sum, 0).toFixed(1));
  const totalPoints = currentTest.totalPoints || Number(questions.reduce((sum, q) => sum + (Number(q.points) || 1), 0).toFixed(1));
  const correctCount = questions.filter(q => q.userAnswer === q.correctAnswer).length;
  const wrongCount = questions.filter(q => q.userAnswer !== null && q.userAnswer !== q.correctAnswer).length;
  const unansweredCount = questions.filter(q => q.userAnswer === null).length;
  const percentScore = totalPoints > 0 ? Math.round((earnedScore / totalPoints) * 100) : 0;
  const isPassed = earnedScore >= (currentTest.passingScore || (totalPoints * 0.6));

  // Agar test yaxshi topshirilsa (isPassed), o'yinlardagidek confetti otiladi
  useEffect(() => {
    if (isFinished && isPassed && !confettiFired.current) {
      confettiFired.current = true;
      fireTestConfetti();
    }
  }, [isFinished, isPassed]);

  const filteredReviewQuestions = questions.filter(q => {
    if (reviewFilter === 'wrong') return q.userAnswer !== null && q.userAnswer !== q.correctAnswer;
    if (reviewFilter === 'correct') return q.userAnswer === q.correctAnswer;
    if (reviewFilter === 'unanswered') return q.userAnswer === null;
    return true;
  });

  // ───────────────────────────────────────────────────────────────────────────
  // 1. NATIJALAR VA JAVOBLAR TAHLILI SAHIFASI (MINIMALIST RESULTS VIEW)
  // ───────────────────────────────────────────────────────────────────────────
  if (isFinished) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
        {/* Top Back bar */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onExit}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--primary)] hover:underline cursor-pointer"
          >
            <ArrowLeft size={16} weight="bold" /> Testlar roʻyxatiga qaytish
          </button>
          <div className="flex items-center gap-2">
            {currentTest.stageLabel && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--primary-soft)] text-[var(--primary)]">
                {currentTest.stageLabel}
              </span>
            )}
            {currentTest.grade && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--text-secondary)]">
                {currentTest.grade}-sinf
              </span>
            )}
          </div>
        </div>

        {/* Minimalist Score Hero Card */}
        <Card className="overflow-hidden border border-[var(--border)] shadow-sm">
          <CardContent className="p-5 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
                  {currentTest.title}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  {isPassed
                    ? "Tabriklaymiz! Test sinovini yuqori koʻrsatkich bilan yakunladingiz."
                    : "Test sinovi yakunlandi. Natijalaringiz bilan quyida tanishishingiz mumkin."}
                </p>
              </div>

              {/* Big Score Badge */}
              <div className="sm:text-right shrink-0 bg-[var(--surface-sunken)] sm:bg-transparent p-4 sm:p-0 rounded-xl sm:rounded-none">
                <p className="text-xs uppercase font-semibold text-[var(--text-tertiary)] tracking-wider">Toʻplangan ball</p>
                <div className="flex items-baseline gap-1 sm:justify-end mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tabular-nums">{earnedScore}</span>
                  <span className="text-sm font-medium text-[var(--text-tertiary)]">/ {totalPoints}</span>
                </div>
                <span className="inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-md bg-[var(--primary-soft)] text-[var(--primary)]">
                  {percentScore}% natija
                </span>
              </div>
            </div>

            {/* 3 Metric counters */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 text-center">
              <div className="p-3 sm:p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1 mb-1">
                  <Check size={14} weight="bold" /> Toʻgʻri
                </p>
                <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">{correctCount}</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-rose-500/5 border border-rose-500/15">
                <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center justify-center gap-1 mb-1">
                  <X size={14} weight="bold" /> Notoʻgʻri
                </p>
                <p className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 tabular-nums">{wrongCount}</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border)]">
                <p className="text-[11px] font-semibold text-[var(--text-tertiary)] flex items-center justify-center gap-1 mb-1">
                  <Clock size={14} /> Javobsiz
                </p>
                <p className="text-xl sm:text-2xl font-black text-[var(--text-secondary)] tabular-nums">{unansweredCount}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <Button
                variant="outline"
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 cursor-pointer font-semibold"
                onClick={handleRestart}
              >
                <ArrowsClockwise size={16} /> Qayta topshirish
              </Button>
              <Button
                className="w-full sm:w-1/2 flex items-center justify-center gap-1.5 cursor-pointer font-bold bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
                onClick={onExit}
              >
                Boshqa testlar <CaretRight size={16} weight="bold" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* SAVOLLAR TAHLILI SECTION */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">Savollar tahlili va toʻgʻri javoblar</h3>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-1 bg-[var(--surface-sunken)] p-1 rounded-xl border border-[var(--border)] text-xs">
              {[
                { id: 'all', label: `Barchasi (${questions.length})` },
                { id: 'wrong', label: `Xatolar (${wrongCount})` },
                { id: 'correct', label: `Toʻgʻri (${correctCount})` },
                { id: 'unanswered', label: `Javobsiz (${unansweredCount})` },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setReviewFilter(tab.id)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer",
                    reviewFilter === tab.id
                      ? "bg-[var(--surface)] text-[var(--primary)] shadow-xs"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Questions review list */}
          <div className="space-y-3.5">
            {filteredReviewQuestions.map((q) => {
              const isCorrect = q.userAnswer === q.correctAnswer;
              const isAnswered = q.userAnswer !== null;

              return (
                <Card
                  key={q.id}
                  className={cn(
                    "overflow-hidden border transition-all",
                    !isAnswered
                      ? "border-[var(--border)]"
                      : isCorrect
                      ? "border-emerald-500/30"
                      : "border-rose-500/30"
                  )}
                >
                  <CardContent className="p-4 sm:p-5 space-y-3.5">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--text-primary)]">
                          {q.number}-savol
                        </span>
                        {q.section && (
                          <span className="text-xs text-[var(--text-tertiary)] font-medium">
                            {q.section}-qism
                          </span>
                        )}
                        {q.points && (
                          <span className="text-xs text-[var(--text-secondary)] font-medium">
                            {q.points} ball
                          </span>
                        )}
                      </div>

                      <span className={cn(
                        "text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1",
                        !isAnswered
                          ? "bg-[var(--surface-sunken)] text-[var(--text-tertiary)] border border-[var(--border)]"
                          : isCorrect
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                      )}>
                        {!isAnswered ? "Belgilanmagan" : isCorrect ? <>Toʻgʻri <Check size={12} weight="bold" /></> : <>Notoʻgʻri <X size={12} weight="bold" /></>}
                      </span>
                    </div>

                    {/* Question text */}
                    <p className="text-sm sm:text-base font-semibold text-[var(--text-primary)] leading-relaxed whitespace-pre-line">
                      {cleanQuestionText(q.question)}
                    </p>

                    {/* Question image (if exists) */}
                    {q.image && (
                      <div className="p-2.5 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border)] flex justify-center">
                        <img
                          src={q.image}
                          alt={`${q.number}-savol ilovasi`}
                          className="max-h-64 w-auto object-contain rounded"
                        />
                      </div>
                    )}

                    {/* Options list */}
                    <div className="space-y-1.5 pt-1">
                      {q.options.map((opt, idx) => {
                        const { letter, text } = parseOption(opt);
                        const isUserChoice = q.userAnswer === letter;
                        const isRightAnswer = q.correctAnswer === letter;

                        return (
                          <div
                            key={idx}
                            className={cn(
                              "p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 transition-colors",
                              isRightAnswer
                                ? "bg-emerald-500/10 border-emerald-500/35 text-emerald-800 dark:text-emerald-200 font-semibold"
                                : isUserChoice && !isRightAnswer
                                ? "bg-rose-500/10 border-rose-500/35 text-rose-800 dark:text-rose-200"
                                : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] opacity-80"
                            )}
                          >
                            <span className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5",
                              isRightAnswer
                                ? "bg-emerald-600 text-white"
                                : isUserChoice
                                ? "bg-rose-600 text-white"
                                : "bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--text-secondary)]"
                            )}>
                              {letter}
                            </span>
                            <span className="flex-1">{text}</span>
                            {isRightAnswer && (
                              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                                Toʻgʻri javob
                              </span>
                            )}
                            {isUserChoice && !isRightAnswer && (
                              <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 shrink-0">
                                Sizning javobingiz
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // 2. TEST ISHLASH SAHIFASI (MINIMALIST & INTUITIVE TEST TAKING VIEW)
  // ───────────────────────────────────────────────────────────────────────────
  const currentQ = questions[currentQuestion] || questions[0];
  const pointsLabel = currentQ.points ? `${currentQ.points} ball` : '1 ball';

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-10">
      {/* Sticky Yuqori Bar — TEPADAGI YAKUNLASH TUGMASI OLIB TASHLANDI */}
      <div className="sticky top-0 z-30 bg-[var(--background)]/90 backdrop-blur-md pt-2 pb-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-[var(--border)]/60">
        <div className="flex items-center justify-between mb-2">
          {/* Chap: Chiqish & Test nomi */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={onExit}
              className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] shrink-0 cursor-pointer transition-colors"
              title="Testdan chiqish"
              aria-label="Testdan chiqish"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">
                {currentTest.title || currentTest.shortTitle}
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] font-medium">
                <span className="font-bold text-[var(--primary)]">{answeredCount}</span> / {questions.length} ta yechildi
              </p>
            </div>
          </div>

          {/* O'ng: Minimalist Vaqt o'lchagich (HECH QANDAY YAKUNLASH TUGMASISIZ) */}
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tabular-nums border shadow-xs transition-colors",
            timeLeft < 300
              ? "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400 animate-pulse"
              : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-primary)]"
          )}>
            <Clock size={15} weight="bold" className={timeLeft < 300 ? "text-rose-600" : "text-[var(--primary)]"} />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Minimalist Progress Line */}
        <ProgressBar value={(answeredCount / questions.length) * 100} size="sm" color="#1E5BF8" />
      </div>

      {/* Asosiy Ish Maydoni */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
        {/* Chap / Asosiy Ustun: Savol Kartochkasi (lg:col-span-8) */}
        <div className="lg:col-span-8">
          {/* Mobil uchun Savollar To'ri (Gorizontal tezkor o'tish tasmasi) */}
          <div className="lg:hidden p-2.5 bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-bold text-[var(--text-primary)]">Savollar toʻri</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {answeredCount}/{questions.length} yechildi
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin px-0.5">
              {questions.map((q, i) => {
                const isCurr = i === currentQuestion;
                const isAnswered = q.userAnswer !== null;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(i)}
                    className={cn(
                      'w-8.5 h-8.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center justify-center',
                      isCurr && isAnswered && 'bg-emerald-600 text-white ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--surface)] shadow-xs scale-105',
                      isCurr && !isAnswered && 'bg-[var(--primary)] text-white ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--surface)] shadow-xs scale-105',
                      !isCurr && isAnswered && 'bg-emerald-500 dark:bg-emerald-600 text-white shadow-2xs',
                      !isCurr && !isAnswered && 'bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--text-secondary)]'
                    )}
                  >
                    {q.number}
                  </button>
                );
              })}
            </div>
          </div>

          <Card className="border border-[var(--border)] shadow-xs">
            <CardContent className="p-4 sm:p-6 space-y-5">
              {/* Savol Metadata */}
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[var(--primary-soft)] text-[var(--primary)]">
                    {currentQ.number}-savol
                  </span>
                  {currentQ.section && (
                    <span className="text-xs text-[var(--text-secondary)] font-medium">
                      {currentQ.section}-qism
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  {currentQ.difficulty && (
                    <span className={cn(
                      'text-[11px] px-2 py-0.5 rounded-full font-medium',
                      currentQ.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                      currentQ.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                      'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    )}>
                      {currentQ.difficulty === 'easy' ? 'Oson' : currentQ.difficulty === 'medium' ? "Oʻrtacha" : 'Qiyin'}
                    </span>
                  )}
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--surface-sunken)] border border-[var(--border)] font-semibold text-[var(--text-secondary)]">
                    {pointsLabel}
                  </span>
                </div>
              </div>

              {/* Savol matni */}
              <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] leading-relaxed whitespace-pre-line">
                {cleanQuestionText(currentQ.question)}
              </h3>

              {/* Savol rasmi / xaritasi (mavjud bo'lsa) */}
              {currentQ.image && (
                <div className="p-3 bg-[var(--surface-sunken)] rounded-xl border border-[var(--border)] flex flex-col items-center justify-center">
                  <img
                    src={currentQ.image}
                    alt={`${currentQ.number}-savol ilovasi`}
                    className="max-h-72 w-auto object-contain rounded"
                  />
                  <span className="text-[11px] text-[var(--text-tertiary)] mt-1.5">
                    {currentQ.number}-topshiriq ilovasi
                  </span>
                </div>
              )}

              {/* Variantlar */}
              <div className="space-y-2.5 pt-1">
                {currentQ.options.map((option, i) => {
                  const { letter, text } = parseOption(option);
                  const isSelected = currentQ.userAnswer === letter;

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(letter)}
                      className={cn(
                        'w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all text-sm flex items-start gap-3 cursor-pointer group',
                        isSelected
                          ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)] font-semibold shadow-xs'
                          : 'border-[var(--border)] hover:border-[var(--primary)]/40 hover:bg-[var(--surface-sunken)] text-[var(--text-primary)]'
                      )}
                    >
                      <span className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all",
                        isSelected
                          ? "bg-[var(--primary)] text-white"
                          : "bg-[var(--surface-sunken)] text-[var(--text-secondary)] border border-[var(--border)] group-hover:border-[var(--primary)]/40 group-hover:text-[var(--primary)]"
                      )}>
                        {letter}
                      </span>
                      <span className="leading-relaxed pt-0.5 flex-1">{text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Pastki Navigatsiya — OHIRGI SAVOLDA DISABLED O'RNIGA TESTNI TUGATISH */}
              <div className="flex items-center justify-between pt-4 mt-6 border-[var(--border)]">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="cursor-pointer text-xs sm:text-sm"
                >
                  <CaretLeft size={16} /> Oldingi
                </Button>

                <span className="text-xs text-[var(--text-tertiary)] font-medium tabular-nums">
                  {currentQuestion + 1} / {questions.length}
                </span>

                {currentQuestion === questions.length - 1 ? (
                  <Button
                    onClick={handleFinish}
                    className="bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] font-bold cursor-pointer shadow-sm flex items-center gap-1.5 px-4 sm:px-5 text-xs sm:text-sm"
                  >
                    Testni tugatish <Check size={16} weight="bold" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                    className="cursor-pointer flex items-center gap-1 px-4 text-xs sm:text-sm"
                  >
                    Keyingi <CaretRight size={16} />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* O'ng / Yon Ustun: Savollar To'ri (lg:col-span-4) */}
        <div className="lg:col-span-4">
          <Card className="sticky top-20 border border-[var(--border)] shadow-xs">
            <CardContent className="p-4 space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-[var(--border)]">
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Savollar</p>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 tabular-nums">
                  {answeredCount}/{questions.length}
                </span>
              </div>

              {/* 5-talik Grid */}
              <div className="grid grid-cols-5 gap-1.5 max-h-[350px] overflow-y-auto pr-1">
                {questions.map((q, i) => {
                  const isCurr = i === currentQuestion;
                  const isAnswered = q.userAnswer !== null;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestion(i)}
                      className={cn(
                        'w-full aspect-square rounded-xl text-xs font-bold relative cursor-pointer transition-all flex items-center justify-center',
                        isCurr && isAnswered && 'bg-emerald-600 text-white ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--surface)] shadow-xs scale-105',
                        isCurr && !isAnswered && 'bg-[var(--primary)] text-white ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--surface)] shadow-xs scale-105',
                        !isCurr && isAnswered && 'bg-emerald-500 dark:bg-emerald-600 text-white shadow-2xs',
                        !isCurr && !isAnswered && 'bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--primary)]/40 hover:text-[var(--text-primary)]'
                      )}
                    >
                      {q.number}
                    </button>
                  );
                })}
              </div>

              {/* Holat izohi */}
              <div className="pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Yechilgan
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] ring-2 ring-[var(--primary)]/30"></span> Hozirgi
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--surface-sunken)] border border-[var(--border)]"></span> Boʻsh
                </span>
              </div>

              {/* Tezkor yakunlash havolasi */}
              <button
                onClick={handleFinish}
                className="w-full mt-2 py-2 px-3 rounded-xl border border-[var(--border)] hover:border-[var(--primary)]/40 hover:bg-[var(--surface-sunken)] text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                Testni muddatidan oldin yakunlash <CaretRight size={13} weight="bold" />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Test View Adapters (Olympiad, Milliy, DTM, Attestation)
// ─────────────────────────────────────────────────────────────────────────────

export function OlympiadTestView({ test = null, onExit }) {
  const currentTest = test || OLYMPIAD_TESTS[0];
  return (
    <TestRunnerView
      test={currentTest}
      questionsData={currentTest.questions || olympiadQuestions}
      onExit={onExit}
    />
  );
}

export function MilliyTestView({ test = null, onExit }) {
  const current = test || popularTests.find(t => t.type === 'milliy') || {
    id: 'milliy-mock',
    title: 'Milliy Sertifikat Geografiya Mock Testi',
    shortTitle: 'Milliy Sertifikat',
    time: 150,
    totalPoints: 100,
    passingScore: 60,
  };
  return (
    <TestRunnerView
      test={current}
      questionsData={milliySertifikatQuestions}
      onExit={onExit}
    />
  );
}

export function DTMTestView({ test = null, onExit }) {
  const current = test || popularTests.find(t => t.type === 'dtm') || {
    id: 'dtm-mock',
    title: 'DTM Geografiya Amaliy Testi',
    shortTitle: 'DTM Testi',
    time: 180,
    totalPoints: 93,
    passingScore: 56,
  };
  return (
    <TestRunnerView
      test={current}
      questionsData={dtmQuestions}
      onExit={onExit}
    />
  );
}

export function AttestationTestView({ test = null, onExit }) {
  const current = test || popularTests.find(t => t.type === 'attestation') || {
    id: 'attestation-mock',
    title: 'Attestatsiya Sinov Testi',
    shortTitle: 'Attestatsiya',
    time: 90,
    totalPoints: 100,
    passingScore: 70,
  };
  return (
    <TestRunnerView
      test={current}
      questionsData={attestationQuestions}
      onExit={onExit}
    />
  );
}


// Main Tests Page
export default function Tests() {
  const { type } = useParams();

  if (type) return <CategoryTestsPage type={type} />;

  return (
    <div className="space-y-6">
      <SEO
        title="Geografiya Testlari"
        description="DTM, Milliy Sertifikat, Olimpiada va maktab imtihonlari uchun geografiya testlarini ishlang — natijalar va batafsil tahlil bilan."
        url="/tests"
      />
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Testlar</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Imtihon turini tanlang va tayyorgarlikni boshlang</p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {testCategories.map((cat) => (
          <TestCategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
}