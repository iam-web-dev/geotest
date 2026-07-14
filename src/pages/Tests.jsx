import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Clock, CaretLeft, CaretRight, Flag, CheckCircle,
  CaretDown, CaretUp, Warning, FileText, Image, MapTrifold,
  TextAlignLeft, GridFour, Timer, ChartBar, Star, Users, Shield,
  GraduationCap, Medal, Target, Lightning, Check, X, Scroll,
  Trophy, Certificate, ClipboardText
} from '@phosphor-icons/react';
import { cn, formatTime, getExamTypeColor, getExamTypeLabel } from '../lib/utils';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressBar, CircularProgress } from '../components/ui/Progress';
import {
  testCategories, popularTests, milliySertifikatQuestions,
  dtmSections, dtmQuestions, olympiadQuestions, attestationQuestions
} from '../data/mockData';
import {
  GlobeCertificate, UZMapTarget, MountainFlagMedal, ShieldCheckDocument
} from '../components/illustrations/GeoIllustrations';

function TestCategoryCard({ category }) {
  const iconMap = {
    FileText: FileText,
    Target: Target,
    Trophy: Trophy,
    Clipboard: ClipboardText,
  };
  const Icon = iconMap[category.icon] || FileText;

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      <Link to={`/tests/${category.id}`}>
        <Card className="h-full cursor-pointer hover:shadow-md transition-all">
          <CardContent className="p-5">
            <div className="flex items-center gap-4 mb-3">
              <div
                className="w-12 h-12 rounded-[var(--radius-sm)] flex items-center justify-center"
                style={{ background: `${category.color}15` }}
              >
                <Icon size={22} style={{ color: category.color }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[var(--text-primary)]">{category.title}</p>
                <p className="text-xs text-[var(--text-secondary)]">{category.count} ta test</p>
              </div>
              <CaretRight size={18} className="text-[var(--text-secondary)]" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function TestExamCard({ test, index }) {
  const colors = {
    milliy: { bg: '#DCEBFF', color: '#2F80ED', label: 'Milliy Sertifikat' },
    dtm: { bg: '#EDE9FE', color: '#8B5CF6', label: 'DTM' },
    olympiad: { bg: '#FEF3C7', color: '#F59E0B', label: 'Olimpiada' },
    attestation: { bg: '#DCFCE7', color: '#22C55E', label: 'Attestatsiya' },
  };
  const c = colors[test.type] || colors.milliy;

  const typeIconMap = {
    milliy: Certificate,
    dtm: Target,
    olympiad: Trophy,
    attestation: ClipboardText,
  };
  const TypeIcon = typeIconMap[test.type] || FileText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -3 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-all h-full">
        <div className="h-1.5" style={{ background: c.color }} />
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center" style={{ background: c.bg }}>
              <TypeIcon size={18} style={{ color: c.color }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">{test.title}</p>
              <p className="text-xs text-[var(--text-secondary)]">{c.label}</p>
            </div>
          </div>

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
              color: test.difficulty === 'easy' ? '#22C55E' : test.difficulty === 'medium' ? '#F59E0B' : test.difficulty === 'hard' ? '#EF4444' : '#8B5CF6'
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
    </motion.div>
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
                    questions[currentQuestion].type === 'closed' ? 'bg-[#DCEBFF] text-[#2F80ED]' :
                    questions[currentQuestion].type === 'open' ? 'bg-[#EDE9FE] text-[#8B5CF6]' :
                    questions[currentQuestion].type === 'image' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
                    questions[currentQuestion].type === 'map' ? 'bg-[#DCFCE7] text-[#22C55E]' :
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
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[#EDE9FE] flex items-center justify-center">
              <Target size={18} className="text-[#8B5CF6]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">DTM Blok Test</p>
              <p className="text-xs text-[var(--text-secondary)]">{answeredCount}/{questions.length} ta javob</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDE9FE] text-[#8B5CF6] font-bold text-sm">
            <Clock size={16} />
            {formatTime(timeLeft)}
          </div>
        </div>
        <ProgressBar value={progress} size="sm" color="#8B5CF6" />
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
                                  currentQuestion === qNum - 1 && 'ring-2 ring-[#8B5CF6] ring-offset-1 ring-offset-[var(--surface)]',
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
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#EDE9FE] text-[#8B5CF6] font-medium"
                    style={{ background: `${currentSection?.color}15`, color: currentSection?.color }}>
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
                        ? 'border-[#8B5CF6] bg-[#EDE9FE] text-[#8B5CF6]'
                        : 'border-[var(--border)] hover:border-[#8B5CF6]/50 hover:bg-[var(--background)] text-[var(--text-primary)]'
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
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[#FEF3C7] flex items-center justify-center">
              <Medal size={18} className="text-[#F59E0B]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">Olimpiada</p>
              <p className="text-xs text-[var(--text-secondary)]">{answeredCount}/{questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEF3C7] text-[#F59E0B] font-bold text-sm">
            <Clock size={16} /> {formatTime(timeLeft)}
          </div>
        </div>
        <ProgressBar value={(answeredCount / questions.length) * 100} size="sm" color="#F59E0B" />
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
                      i === currentQuestion && 'ring-2 ring-[#F59E0B] ring-offset-2 ring-offset-[var(--surface)]',
                      q.userAnswer !== null && i !== currentQuestion && 'bg-[var(--success)]/20 text-[var(--success)]',
                      i !== currentQuestion && !q.userAnswer && 'bg-[var(--border)] text-[var(--text-secondary)]'
                    )}
                  >
                    {q.number}
                    {q.points > 1 && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#F59E0B] text-white text-[7px] flex items-center justify-center font-bold">
                        {q.points}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-[var(--text-secondary)]">
                <span className="px-1.5 py-0.5 rounded bg-[var(--border)]">1 bal</span>
                <span className="px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#F59E0B]">2 bal</span>
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
                    currentQ.difficulty === 'easy' ? 'bg-[#DCFCE7] text-[#22C55E]' :
                    currentQ.difficulty === 'medium' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
                    currentQ.difficulty === 'hard' ? 'bg-[#FEE2E2] text-[#EF4444]' :
                    'bg-[#EDE9FE] text-[#8B5CF6]'
                  )}>{currentQ.difficulty === 'easy' ? 'Oson' : currentQ.difficulty === 'medium' ? "O'rtacha" : currentQ.difficulty === 'hard' ? 'Qiyin' : 'Ekspert'}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#F59E0B] font-medium">{currentQ.points} bal</span>
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
                          ? 'border-[#F59E0B] bg-[#FEF3C7] text-[#F59E0B]'
                          : 'border-[var(--border)] hover:border-[#F59E0B]/50 hover:bg-[var(--background)] text-[var(--text-primary)]'
                      )}
                    >
                      <span className="font-semibold">{option.charAt(0)})</span> {option.slice(3)}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    className="w-full min-h-[200px] p-4 rounded-[var(--radius-sm)] border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] text-sm resize-none focus:border-[#F59E0B] focus:outline-none transition-all"
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
            <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[#DCFCE7] flex items-center justify-center">
              <Shield size={18} className="text-[#22C55E]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">Attestatsiya</p>
              <p className="text-xs text-[var(--text-secondary)]">{answeredCount}/{questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DCFCE7] text-[#22C55E] font-bold text-sm">
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
                        ? 'border-[#22C55E] bg-[#DCFCE7] text-[#22C55E]'
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
  const [activeCategory, setActiveCategory] = useState('all');

  if (type === 'milliy') return <MilliyTestView />;
  if (type === 'dtm') return <DTMTestView />;
  if (type === 'olympiad') return <OlympiadTestView />;
  if (type === 'attestation') return <AttestationTestView />;

  const filteredTests = activeCategory === 'all'
    ? popularTests
    : popularTests.filter(t => t.type === activeCategory);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Testlar</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Imtihon turlarini tanlang va tayyorgarlikni boshlang</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {testCategories.map((cat) => (
          <TestCategoryCard key={cat.id} category={cat} />
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'Barchasi' },
          { id: 'milliy', label: 'Milliy Sertifikat' },
          { id: 'dtm', label: 'DTM' },
          { id: 'olympiad', label: 'Olimpiada' },
          { id: 'attestation', label: 'Attestatsiya' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              activeCategory === cat.id
                ? 'bg-[var(--primary)] text-white shadow-sm'
                : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] border border-[var(--border)]'
            )}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filteredTests.map((test, i) => (
          <TestExamCard key={test.id} test={test} index={i} />
        ))}
      </div>
    </div>
  );
}