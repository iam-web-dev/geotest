import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import confetti from 'canvas-confetti';
import { Lightning, Clock, Trophy, Star, ArrowRight, Check, X, ArrowsClockwise, Medal, SmileySad, ChartLineUp } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/Progress';
import { quizData, quizQuestions } from '../data/mockData';

function fireConfetti() {
  const colors = ['#2563EB', '#F59E0B', '#22C55E', '#8B5CF6'];
  const duration = 1400;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
    confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  confetti({ particleCount: 90, spread: 100, origin: { y: 0.5 }, colors, startVelocity: 45, scalar: 1.05 });
}

export default function Quiz() {
  const [gameState, setGameState] = useState('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const confettiFired = useRef(false);

  const startQuiz = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(60);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    confettiFired.current = false;
  };

  useEffect(() => {
    if (gameState !== 'playing' || showResult) return;
    if (timeLeft <= 0) { handleNext(); return; }
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [gameState, timeLeft, showResult]);

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    const isCorrect = answer === quizQuestions[currentQuestion].correct;
    if (isCorrect) setScore(prev => prev + 1);
    setAnswers(prev => [...prev, { question: currentQuestion, answer, correct: isCorrect }]);
    setTimeout(() => handleNext(), 1000);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(quizQuestions[currentQuestion + 1]?.time || 15);
    } else {
      setGameState('finished');
    }
  };

  useEffect(() => {
    if (gameState !== 'finished' || confettiFired.current) return;
    const percentage = Math.round((score / quizQuestions.length) * 100);
    if (percentage >= 70) {
      confettiFired.current = true;
      fireConfetti();
    }
  }, [gameState, score]);

  if (gameState === 'menu') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Viktorina</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Geografiya bilimingizni sinang</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              key: 'daily', data: quizData.daily, Icon: Lightning,
              color: '#2563EB', soft: '#EFF6FF', variant: undefined,
            },
            {
              key: 'weekly', data: quizData.weekly, Icon: Trophy,
              color: '#8B5CF6', soft: '#F5F3FF', variant: 'secondary',
            },
          ].map(({ key, data, Icon, color, soft, variant }, idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.35, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="h-full"
            >
              <Card className="overflow-hidden border h-full relative group/card transition-colors duration-[250ms]"
                style={{ borderColor: 'var(--border)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = color}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none transition-transform duration-500 group-hover/card:scale-110"
                  style={{ background: color, opacity: 0.07 }} />
                <CardContent className="p-5 sm:p-6 relative">
                  <div className="flex items-start justify-between mb-5">
                    <motion.div
                      className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
                      style={{ background: soft }}
                      whileHover={{ rotate: [0, -8, 8, -4, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon size={22} weight="fill" style={{ color }} />
                    </motion.div>
                    <div className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ color, background: soft }}>
                      <Lightning size={12} weight="fill" />+{data.xpReward} XP
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{data.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] mb-5">
                    <span className="flex items-center gap-1"><Star size={12} />{data.questions} ta savol</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
                    <span className="flex items-center gap-1"><Clock size={12} />{data.time}s</span>
                  </div>

                  <Button className="w-full group" variant={variant} onClick={startQuiz}>
                    Boshlash <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const tier = percentage >= 80
      ? { label: 'Ajoyib!', sub: 'Siz haqiqiy geografiya ustasisiz', color: '#F59E0B', bg: 'linear-gradient(135deg,#FEF3C7 0%,#FDE68A 100%)', Icon: Trophy }
      : percentage >= 50
      ? { label: 'Yaxshi natija!', sub: 'Yana bir oz mashq qilsangiz mukammal bo\'ladi', color: '#2563EB', bg: 'linear-gradient(135deg,#DBEAFE 0%,#BFDBFE 100%)', Icon: Medal }
      : { label: 'Davom eting!', sub: 'Har bir urinish sizni yaxshilaydi', color: '#64748B', bg: 'linear-gradient(135deg,#F1F5F9 0%,#E2E8F0 100%)', Icon: SmileySad };
    const { Icon } = tier;

    return (
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        >
          <Card className="overflow-hidden">
            <div className="pt-8 pb-6 px-6 flex flex-col items-center" style={{ background: tier.bg }}>
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }}
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg mb-4"
                style={{ background: 'white' }}
              >
                <Icon size={44} weight="fill" style={{ color: tier.color }} />
              </motion.div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{tier.label}</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{tier.sub}</p>
            </div>

            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-center">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
                    <circle cx="56" cy="56" r="48" stroke="var(--border)" strokeWidth="9" fill="none" />
                    <motion.circle
                      cx="56" cy="56" r="48" stroke={tier.color} strokeWidth="9" fill="none"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 48}
                      initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - percentage / 100) }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-bold text-[var(--text-primary)]">{percentage}%</span>
                    <span className="text-[10px] text-[var(--text-secondary)]">Aniqlik</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[var(--radius-sm)] bg-[var(--background)] py-3 flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 text-[var(--success)]"><Check size={16} weight="bold" /><span className="text-lg font-bold">{score}</span></div>
                  <p className="text-[11px] text-[var(--text-secondary)]">To'g'ri javob</p>
                </div>
                <div className="rounded-[var(--radius-sm)] bg-[var(--background)] py-3 flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 text-[var(--danger)]"><X size={16} weight="bold" /><span className="text-lg font-bold">{quizQuestions.length - score}</span></div>
                  <p className="text-[11px] text-[var(--text-secondary)]">Noto'g'ri javob</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm font-semibold rounded-full py-2 px-4 mx-auto w-fit"
                style={{ color: '#F59E0B', background: '#FEF3C7' }}>
                <Lightning size={16} weight="fill" />+{Math.round(score * 10)} XP
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={startQuiz}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-[var(--radius-sm)] text-sm font-semibold text-white transition-all active:scale-[0.98]"
                  style={{ background: tier.color }}
                >
                  <ArrowsClockwise size={16} /> Qayta boshlash
                </button>
                <button
                  onClick={() => setGameState('menu')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-[var(--radius-sm)] text-sm font-semibold border border-[var(--border)] bg-transparent text-[var(--text-primary)] transition-all active:scale-[0.98]"
                >
                  <ChartLineUp size={16} /> Menyu
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const q = quizQuestions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <SEO
        title="Geografiya Viktorinasi"
        description="Davlatlar, poytaxtlar, bayroqlar, daryolar, tog'lar va qit'alar bo'yicha interaktiv geografiya viktorinalarini ishlang."
        url="/quiz"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[#FEF3C7] flex items-center justify-center"><Lightning size={18} className="text-[#F59E0B]" /></div>
          <div>
            <p className="text-sm font-bold text-[var(--text-primary)]">Tezkor Viktorina</p>
            <p className="text-xs text-[var(--text-secondary)]">{currentQuestion + 1}/{quizQuestions.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm font-bold text-[var(--primary)]"><Star size={14} className="text-[var(--warning)]" weight="fill" />{score}</div>
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${timeLeft < 5 ? 'bg-[var(--danger)]/10 text-[var(--danger)] animate-pulse' : 'bg-[var(--primary-soft)] text-[var(--primary)]'}`}>
            <Clock size={14} />{timeLeft}
          </div>
        </div>
      </div>

      <ProgressBar value={((currentQuestion + 1) / quizQuestions.length) * 100} size="sm" color="#F59E0B" />

      <AnimatePresence mode="wait">
        <motion.div key={currentQuestion} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-6 leading-relaxed">{q.question}</h3>
              <div className="space-y-2.5">
                {q.options.map((option, i) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectAnswer = option === q.correct;
                  return (
                    <button key={i} onClick={() => handleAnswer(option)} disabled={showResult}
                      className={cn(
                        'w-full text-left p-4 rounded-[var(--radius-sm)] border-2 transition-all text-sm font-medium',
                        showResult && isCorrectAnswer && 'border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]',
                        showResult && isSelected && !isCorrectAnswer && 'border-[var(--danger)] bg-[var(--danger)]/10 text-[var(--danger)]',
                        !showResult && 'border-[var(--border)] hover:border-[#F59E0B]/50 hover:bg-[var(--background)] text-[var(--text-primary)]',
                        showResult && !isSelected && !isCorrectAnswer && 'border-[var(--border)] text-[var(--text-secondary)] opacity-60'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showResult && isCorrectAnswer && <Check size={18} />}
                        {showResult && isSelected && !isCorrectAnswer && <X size={18} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}