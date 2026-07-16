import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Clock, CaretLeft, CaretRight, Flag, CheckCircle,
  CaretDown, CaretUp, Warning, FileText, Image, MapTrifold,
  TextAlignLeft, GridFour, Timer, ChartBar, Star, Users, Shield,
  GraduationCap, Medal, Target, Lightning, Check, X, Scroll,
} from '@phosphor-icons/react';
import { cn, formatTime, getExamTypeColor, getExamTypeLabel, canHover } from '../lib/utils';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressBar, CircularProgress } from '../components/ui/Progress';
import {
  testCategories, popularTests, milliySertifikatQuestions,
  dtmSections, dtmQuestions, olympiadQuestions, attestationQuestions
} from '../data/mockData';
import {
  GlobeCertificate, UZMapTarget, MountainFlagMedal, ShieldCheckDocument,
  StickerTarget, StickerTrophy, StickerCertificate, StickerBook,
  StickerDTMImage, StickerShieldCheck,
  StickerMilliyBadge, StickerDTMRocket, StickerOlympiadTrophy, StickerAttestationShield
} from '../components/illustrations/GeoIllustrations';

const categoryStickerMap = {
  milliy: StickerMilliyBadge,
  dtm: StickerDTMRocket,
  olympiad: StickerOlympiadTrophy,
  attestation: StickerAttestationShield,
};

const categoryPalette = {
  milliy:      { color: '#326D62', bg: 'var(--pal-milliy)' },
  dtm:         { color: '#171796', bg: 'var(--pal-dtm)' },
  olympiad:    { color: '#D4A820', bg: 'var(--pal-olympiad)' },
  attestation: { color: '#22C55E', bg: 'var(--pal-attestation)' },
};

const testStickers = {
  milliy:      { Sticker: StickerMilliyBadge,      color: '#326D62', bg: 'var(--pal-milliy)',      label: 'Milliy Sertifikat' },
  dtm:         { Sticker: StickerDTMRocket,         color: '#171796', bg: 'var(--pal-dtm)',         label: 'DTM' },
  olympiad:    { Sticker: StickerOlympiadTrophy,    color: '#D4A820', bg: 'var(--pal-olympiad)',    label: 'Olimpiada' },
  attestation: { Sticker: StickerAttestationShield, color: '#22C55E', bg: 'var(--pal-attestation)', label: 'Attestatsiya' },
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

  if (examStarted) {
    if (type === 'milliy')      return <MilliyTestView />;
    if (type === 'dtm')         return <DTMTestView />;
    if (type === 'olympiad')    return <OlympiadTestView />;
    if (type === 'attestation') return <AttestationTestView />;
  }

  const meta = testStickers[type] || testStickers.milliy;
  const { Sticker } = meta;
  const category = testCategories.find(c => c.id === type);
  const tests = popularTests.filter(t => t.type === type);

  const pageSeoMap = {
    milliy:      { title: "Milliy Sertifikat Geografiya Mock Testlari", desc: "Milliy Sertifikat geografiya imtihoniga real mock testlar, ochiq savollar va rasmiy format bilan tayyorlaning." },
    dtm:         { title: "DTM Geografiya Testlari", desc: "O'zbekiston DTM kirish imtihoniga 90 savollik to'liq geografiya amaliy testlari bilan tayyorlaning." },
    olympiad:    { title: "Geografiya Olimpiada Testlari", desc: "Musobaqa o'quvchilari uchun mo'ljallangan murakkab geografiya olimpiada savollarini ishlang." },
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
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          {category?.title || meta.label}
        </h1>
        <p className="text-sm font-semibold mt-1" style={{ color: meta.color }}>
          {category?.count || tests.length} ta test mavjud
        </p>
      </div>

      {/* Test cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {tests.map((test, i) => (
          <div key={test.id}>
            <Card className="overflow-hidden h-full">
              {/* Sticker header */}
              <div className="flex items-center gap-3 px-4 py-4" style={{ background: meta.bg }}>
                <Sticker size={48} color={meta.color} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[var(--text-primary)] leading-tight">{test.title}</p>
                  <span
                    className="inline-block text-[11px] font-bold mt-1 px-2 py-0.5 rounded-full"
                    style={{ background: meta.color + '20', color: meta.color }}
                  >
                    {meta.label}
                  </span>
                </div>
              </div>

              <CardContent className="px-4 py-4">
                {/* Stats */}
                <div className="grid grid-cols-3 text-center rounded-[var(--radius-xs)] overflow-hidden border border-[var(--border)] mb-4">
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

                {/* Start button */}
                <button
                  onClick={() => setExamStarted(true)}
                  className="w-full py-2.5 rounded-[var(--radius-xs)] text-sm font-bold text-white transition-opacity active:opacity-80"
                  style={{ background: meta.color }}
                >
                  Boshlash
                </button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestExamCard({ test, index }) {
  const colors = {
    milliy: { bg: 'var(--pal-milliy)', color: '#326D62', label: 'Milliy Sertifikat' },
    dtm: { bg: 'var(--pal-dtm)', color: '#171796', label: 'DTM' },
    olympiad: { bg: 'var(--pal-olympiad)', color: '#D4A820', label: 'Olimpiada' },
    attestation: { bg: 'var(--pal-attestation)', color: '#22C55E', label: 'Attestatsiya' },
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
              color: test.difficulty === 'easy' ? '#22C55E' : test.difficulty === 'medium' ? '#F59E0B' : test.difficulty === 'hard' ? '#EF4444' : '#171796'
            }}>
              <ChartBar size={13} />
              {test.difficulty === 'easy' ? 'Oson' : test.difficulty === 'medium' ? "O'rtacha" : test.difficulty === 'hard' ? 'Qiyin' : 'Ekspert'}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--text-secondary)]">O'rtacha natija</p>
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

// Milliy Sertifikat Test View
function MilliyTestView() {
  const [questions, setQuestions] = useState(milliySertifikatQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(150 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const answeredCount = questions.filter(q => q.userAnswer !== null).length;
  const flaggedCount = questions.filter(q => q.isFlagged).length;
  const progress = (answeredCount / questions.length) * 100;

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleAnswer = (answer) => {
    setQuestions(prev => prev.map((q, i) =>
      i === currentQuestion ? { ...q, userAnswer: answer } : q
    ));
  };

  const toggleFlag = () => {
    setQuestions(prev => prev.map((q, i) =>
      i === currentQuestion ? { ...q, isFlagged: !q.isFlagged } : q
    ));
  };

  return (
    <div className="space-y-4">
      {/* Timer & Progress Bar */}
      <div className="sticky top-0 z-30 bg-[var(--background)] pt-2 pb-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[var(--primary-soft)] flex items-center justify-center">
              <Timer size={18} className="text-[var(--primary)]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">Milliy Sertifikat</p>
              <p className="text-xs text-[var(--text-secondary)]">{answeredCount}/{questions.length} ta javob</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-sm ${timeLeft < 300 ? 'bg-[var(--danger)]/10 text-[var(--danger)] animate-pulse' : 'bg-[var(--primary-soft)] text-[var(--primary)]'}`}>
            <Clock size={16} />
            {formatTime(timeLeft)}
          </div>
        </div>
        <ProgressBar value={progress} size="sm" color={progress === 100 ? '#22C55E' : undefined} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Question Navigation */}
        <div className="order-2 lg:order-1 lg:col-span-1">
          <Card className="sticky top-28">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[var(--text-primary)]">Savollar</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--text-secondary)]">{flaggedCount} bayroq</span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {questions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(i)}
                    className={cn(
                      'w-full aspect-square rounded-[var(--radius-xs)] text-xs font-semibold transition-all duration-200',
                      i === currentQuestion && 'ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--surface)]',
                      q.userAnswer !== null && i !== currentQuestion && 'bg-[var(--success)]/20 text-[var(--success)]',
                      q.isFlagged && i !== currentQuestion && q.userAnswer === null && 'bg-[var(--warning)]/20 text-[var(--warning)]',
                      i !== currentQuestion && q.userAnswer === null && !q.isFlagged && 'bg-[var(--border)] text-[var(--text-secondary)]'
                    )}
                  >
                    {q.number}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[var(--border)] text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[var(--success)]/20" /> Javob</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[var(--warning)]/20" /> Bayroq</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-[var(--border)]" /> Bo'sh</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Card */}
        <div className="order-1 lg:order-2 lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[var(--text-secondary)]">
                    Savol {currentQuestion + 1} / {questions.length}
                  </span>
                  <span className={cn(
                    'text-xs font-medium px-2 py-0.5 rounded-full',
                    questions[currentQuestion].type === 'closed' ? 'bg-[var(--pal-milliy)] text-[#326D62]' :
                    questions[currentQuestion].type === 'open' ? 'bg-[var(--pal-dtm)] text-[#171796]' :
                    questions[currentQuestion].type === 'image' ? 'bg-[var(--pal-olympiad)] text-[#D4A820]' :
                    questions[currentQuestion].type === 'map' ? 'bg-[var(--pal-attestation)] text-[#22C55E]' :
                    'bg-[#FCE7F3] text-[#EC4899]'
                  )}>
                    {questions[currentQuestion].type === 'closed' ? 'Yopiq' :
                     questions[currentQuestion].type === 'open' ? 'Ochiq' :
                     questions[currentQuestion].type === 'image' ? 'Rasm' :
                     questions[currentQuestion].type === 'map' ? 'Xarita' : 'Moslashtirish'}
                  </span>
                </div>
                <button
                  onClick={toggleFlag}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                    questions[currentQuestion].isFlagged
                      ? 'bg-[var(--warning)]/20 text-[var(--warning)]'
                      : 'bg-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--warning)]/10'
                  )}
                >
                  <Flag size={13} />
                  {questions[currentQuestion].isFlagged ? 'Bayroqlangan' : 'Bayroqlash'}
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] leading-relaxed">
                  {questions[currentQuestion].question}
                </h3>
              </div>

              <div className="space-y-2.5">
                {questions[currentQuestion].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option.charAt(0))}
                    className={cn(
                      'w-full text-left p-3.5 rounded-[var(--radius-sm)] border-2 transition-all duration-200 text-sm',
                      questions[currentQuestion].userAnswer === option.charAt(0)
                        ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)]'
                        : 'border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--background)] text-[var(--text-primary)]'
                    )}
                  >
                    <span className="font-semibold">{option.charAt(0)})</span> {option.slice(3)}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border)]">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                >
                  <CaretLeft size={16} /> Oldingi
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--text-secondary)]">
                    {currentQuestion + 1} / {questions.length}
                  </span>
                </div>
                <Button
                  onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentQuestion === questions.length - 1}
                >
                  Keyingi <CaretRight size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <p className="text-sm text-[var(--text-secondary)]">
                <CheckCircle size={16} className="inline mr-1 text-[var(--success)]" />
                {answeredCount} / {questions.length} ta javob berildi
              </p>
              <Button variant="gradient" disabled={answeredCount < questions.length}>
                Testni Yakunlash <Lightning size={16} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// DTM Test View
function DTMTestView() {
  const [questions, setQuestions] = useState(dtmQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);
  const [timeLeft, setTimeLeft] = useState(180 * 60);
  const answeredCount = questions.filter(q => q.userAnswer !== null).length;
  const progress = (answeredCount / questions.length) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (answer) => {
    setQuestions(prev => prev.map((q, i) =>
      i === currentQuestion ? { ...q, userAnswer: answer } : q
    ));
  };

  const currentSection = dtmSections.find(
    s => currentQuestion + 1 >= s.questionStart && currentQuestion + 1 <= s.questionEnd
  );

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-30 bg-[var(--background)] pt-2 pb-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[var(--pal-dtm)] flex items-center justify-center">
              <Target size={18} className="text-[#171796]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">DTM Blok Test</p>
              <p className="text-xs text-[var(--text-secondary)]">{answeredCount}/{questions.length} ta javob</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--pal-dtm)] text-[#171796] font-bold text-sm">
            <Clock size={16} />
            {formatTime(timeLeft)}
          </div>
        </div>
        <ProgressBar value={progress} size="sm" color="#171796" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="order-2 lg:order-1 lg:col-span-1">
          <Card className="sticky top-28">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-3">Bo'limlar</p>
              <div className="space-y-2">
                {dtmSections.map((section) => {
                  const answeredInSection = questions.filter(
                    q => q.number >= section.questionStart && q.number <= section.questionEnd && q.userAnswer !== null
                  ).length;
                  return (
                    <div key={section.id}>
                      <button
                        onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-[var(--radius-sm)] hover:bg-[var(--background)] transition-all"
                      >
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: section.color }} />
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-xs font-medium text-[var(--text-primary)] truncate">{section.title}</p>
                          <p className="text-[10px] text-[var(--text-secondary)]">
                            {answeredInSection}/{section.questions} · {section.questionStart}-{section.questionEnd}
                          </p>
                        </div>
                        {expandedSection === section.id ? <CaretUp size={14} /> : <CaretDown size={14} />}
                      </button>
                      {expandedSection === section.id && (
                        <div className="grid grid-cols-5 gap-1 px-2 pb-2">
                          {Array.from({ length: section.questions }, (_, i) => {
                            const qNum = section.questionStart + i;
                            const q = questions.find(q => q.number === qNum);
                            return (
                              <button
                                key={qNum}
                                onClick={() => setCurrentQuestion(qNum - 1)}
                                className={cn(
                                  'aspect-square rounded-[var(--radius-xs)] text-[10px] font-semibold transition-all',
                                  currentQuestion === qNum - 1 && 'ring-2 ring-[#171796] ring-offset-1 ring-offset-[var(--surface)]',
                                  q.userAnswer !== null && currentQuestion !== qNum - 1 && 'bg-[var(--success)]/20 text-[var(--success)]',
                                  currentQuestion !== qNum - 1 && !q.userAnswer && 'bg-[var(--border)] text-[var(--text-secondary)]'
                                )}
                              >
                                {qNum}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border)]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">Jami</span>
                  <span className="font-semibold text-[var(--text-primary)]">{answeredCount}/{questions.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[var(--text-secondary)]">
                    Savol {currentQuestion + 1} / {questions.length}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--pal-dtm)] text-[#171796] font-medium"
                    style={{ background: `${currentSection?.color}22`, color: currentSection?.color }}>
                    {currentSection?.subject}
                  </span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] leading-relaxed mb-6">
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-2.5">
                {questions[currentQuestion].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option.charAt(0))}
                    className={cn(
                      'w-full text-left p-3.5 rounded-[var(--radius-sm)] border-2 transition-all text-sm',
                      questions[currentQuestion].userAnswer === option.charAt(0)
                        ? 'border-[#171796] bg-[var(--pal-dtm)] text-[#171796]'
                        : 'border-[var(--border)] hover:border-[#171796]/50 hover:bg-[var(--background)] text-[var(--text-primary)]'
                    )}
                  >
                    <span className="font-semibold">{option.charAt(0)})</span> {option.slice(3)}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border)]">
                <Button variant="outline" onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))} disabled={currentQuestion === 0}>
                  <CaretLeft size={16} /> Oldingi
                </Button>
                <span className="text-xs text-[var(--text-secondary)]">{currentQuestion + 1} / {questions.length}</span>
                <Button onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))} disabled={currentQuestion === questions.length - 1}>
                  Keyingi <CaretRight size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <p className="text-sm text-[var(--text-secondary)]">
                <CheckCircle size={16} className="inline mr-1 text-[var(--success)]" />
                {answeredCount} / {questions.length} ta javob berildi
              </p>
              <Button variant="gradient" disabled={answeredCount < questions.length}>
                Testni Yakunlash <Lightning size={16} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Olympiad Test View
function OlympiadTestView() {
  const [questions, setQuestions] = useState(olympiadQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120 * 60);
  const answeredCount = questions.filter(q => q.userAnswer !== null).length;

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (answer) => {
    setQuestions(prev => prev.map((q, i) => i === currentQuestion ? { ...q, userAnswer: answer } : q));
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-30 bg-[var(--background)] pt-2 pb-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[var(--pal-olympiad)] flex items-center justify-center">
              <Medal size={18} className="text-[#D4A820]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">Olimpiada</p>
              <p className="text-xs text-[var(--text-secondary)]">{answeredCount}/{questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--pal-olympiad)] text-[#D4A820] font-bold text-sm">
            <Clock size={16} /> {formatTime(timeLeft)}
          </div>
        </div>
        <ProgressBar value={(answeredCount / questions.length) * 100} size="sm" color="#D4A820" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="order-2 lg:order-1 lg:col-span-1">
          <Card className="sticky top-28">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-3">Savollar</p>
              <div className="grid grid-cols-5 gap-1.5">
                {questions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(i)}
                    className={cn(
                      'w-full aspect-square rounded-[var(--radius-xs)] text-xs font-semibold relative',
                      i === currentQuestion && 'ring-2 ring-[#D4A820] ring-offset-2 ring-offset-[var(--surface)]',
                      q.userAnswer !== null && i !== currentQuestion && 'bg-[var(--success)]/20 text-[var(--success)]',
                      i !== currentQuestion && !q.userAnswer && 'bg-[var(--border)] text-[var(--text-secondary)]'
                    )}
                  >
                    {q.number}
                    {q.points > 1 && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#D4A820] text-white text-[7px] flex items-center justify-center font-bold">
                        {q.points}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-[var(--text-secondary)]">
                <span className="px-1.5 py-0.5 rounded bg-[var(--border)]">1 bal</span>
                <span className="px-1.5 py-0.5 rounded bg-[var(--pal-olympiad)] text-[#D4A820]">2 bal</span>
                <span className="px-1.5 py-0.5 rounded bg-[#FEE2E2] text-[#EF4444]">3+ bal</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-[var(--text-secondary)]">Savol {currentQuestion + 1}</span>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-medium',
                    currentQ.difficulty === 'easy' ? 'bg-[var(--pal-attestation)] text-[#22C55E]' :
                    currentQ.difficulty === 'medium' ? 'bg-[var(--pal-olympiad)] text-[#D4A820]' :
                    currentQ.difficulty === 'hard' ? 'bg-[#FEE2E2] text-[#EF4444]' :
                    'bg-[var(--pal-dtm)] text-[#171796]'
                  )}>{currentQ.difficulty === 'easy' ? 'Oson' : currentQ.difficulty === 'medium' ? "O'rtacha" : currentQ.difficulty === 'hard' ? 'Qiyin' : 'Ekspert'}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--pal-olympiad)] text-[#D4A820] font-medium">{currentQ.points} bal</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] leading-relaxed mb-6">
                {currentQ.question}
              </h3>

              {currentQ.type !== 'essay' ? (
                <div className="space-y-2.5">
                  {currentQ.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(option.charAt(0))}
                      className={cn(
                        'w-full text-left p-3.5 rounded-[var(--radius-sm)] border-2 transition-all text-sm',
                        currentQ.userAnswer === option.charAt(0)
                          ? 'border-[#D4A820] bg-[var(--pal-olympiad)] text-[#D4A820]'
                          : 'border-[var(--border)] hover:border-[#D4A820]/50 hover:bg-[var(--background)] text-[var(--text-primary)]'
                      )}
                    >
                      <span className="font-semibold">{option.charAt(0)})</span> {option.slice(3)}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    className="w-full min-h-[200px] p-4 rounded-[var(--radius-sm)] border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] text-sm resize-none focus:border-[#D4A820] focus:outline-none transition-all"
                    placeholder="Javobingizni yozing..."
                    value={currentQ.userAnswer || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                  />
                  <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                    <span>Matnli javob</span>
                    <span>{(currentQ.userAnswer || '').length} belgi</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border)]">
                <Button variant="outline" onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))} disabled={currentQuestion === 0}>
                  <CaretLeft size={16} /> Oldingi
                </Button>
                <Button onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))} disabled={currentQuestion === questions.length - 1}>
                  Keyingi <CaretRight size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Attestation Test View
function AttestationTestView() {
  const [questions, setQuestions] = useState(attestationQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const answeredCount = questions.filter(q => q.userAnswer !== null).length;

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (answer) => {
    setQuestions(prev => prev.map((q, i) => i === currentQuestion ? { ...q, userAnswer: answer } : q));
  };

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-30 bg-[var(--background)] pt-2 pb-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[var(--pal-attestation)] flex items-center justify-center">
              <Shield size={18} className="text-[#22C55E]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">Attestatsiya</p>
              <p className="text-xs text-[var(--text-secondary)]">{answeredCount}/{questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--pal-attestation)] text-[#22C55E] font-bold text-sm">
            <Clock size={16} /> {formatTime(timeLeft)}
          </div>
        </div>
        <ProgressBar value={(answeredCount / questions.length) * 100} size="sm" color="#22C55E" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="order-2 lg:order-1 lg:col-span-1">
          <Card className="sticky top-28">
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-3">Savollar</p>
              <div className="grid grid-cols-5 gap-1.5">
                {questions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(i)}
                    className={cn(
                      'w-full aspect-square rounded-[var(--radius-xs)] text-xs font-semibold',
                      i === currentQuestion && 'ring-2 ring-[#22C55E] ring-offset-2',
                      q.userAnswer !== null && i !== currentQuestion && 'bg-[var(--success)]/20 text-[var(--success)]',
                      i !== currentQuestion && !q.userAnswer && 'bg-[var(--border)] text-[var(--text-secondary)]'
                    )}
                  >
                    {q.number}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-5 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] leading-relaxed mb-6">
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-2.5">
                {questions[currentQuestion].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option.charAt(0))}
                    className={cn(
                      'w-full text-left p-3.5 rounded-[var(--radius-sm)] border-2 transition-all text-sm',
                      questions[currentQuestion].userAnswer === option.charAt(0)
                        ? 'border-[#22C55E] bg-[var(--pal-attestation)] text-[#22C55E]'
                        : 'border-[var(--border)] hover:border-[#22C55E]/50 hover:bg-[var(--background)] text-[var(--text-primary)]'
                    )}
                  >
                    <span className="font-semibold">{option.charAt(0)})</span> {option.slice(3)}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--border)]">
                <Button variant="outline" onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))} disabled={currentQuestion === 0}>
                  <CaretLeft size={16} /> Oldingi
                </Button>
                <Button onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))} disabled={currentQuestion === questions.length - 1}>
                  Keyingi <CaretRight size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Main Tests Page
export default function Tests() {
  const { type } = useParams();
  const navigate = useNavigate();

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

      <div>
        <h2 className="text-[17px] font-bold text-[var(--text-primary)] mb-3">Ommabop Testlar</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {popularTests.map((test, i) => {
            const meta = testStickers[test.type] || testStickers.milliy;
            const { Sticker } = meta;
            return (
              <div key={test.id}>
                <Card className="cursor-pointer h-full overflow-hidden" onClick={() => navigate(`/tests/${test.type}`)}>
                  <div className="flex items-center gap-3 px-4 py-3" style={{ background: meta.bg }}>
                    <Sticker size={42} color={meta.color} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[var(--text-primary)] truncate leading-tight">{test.title}</p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: meta.color }}>{meta.label}</p>
                    </div>
                  </div>
                  <CardContent className="px-4 py-3">
                    <div className="grid grid-cols-3 text-center rounded-[var(--radius-xs)] overflow-hidden border border-[var(--border)]">
                      <div className="py-2 border-r border-[var(--border)]">
                        <p className="text-sm font-bold text-[var(--text-primary)]">{test.questions}</p>
                        <p className="text-[10px] text-[var(--text-tertiary)]">Savol</p>
                      </div>
                      <div className="py-2 border-r border-[var(--border)]">
                        <p className="text-sm font-bold text-[var(--text-primary)]">{test.time}</p>
                        <p className="text-[10px] text-[var(--text-tertiary)]">Daqiqa</p>
                      </div>
                      <div className="py-2">
                        <p className="text-sm font-bold" style={{ color: meta.color }}>{test.participants.toLocaleString()}</p>
                        <p className="text-[10px] text-[var(--text-tertiary)]">Ishtirok</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}