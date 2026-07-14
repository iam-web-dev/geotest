import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightning, Clock, Trophy, Star, Sparkle, ArrowRight, Check, X, ArrowsClockwise, Flame } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/Progress';
import { quizData, quizQuestions } from '../data/mockData';
import { TargetQuestionGlobe, ChartGlobe } from '../components/illustrations/GeoIllustrations';

export default function Quiz() {
  const [gameState, setGameState] = useState('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const startQuiz = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(60);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
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

  if (gameState === 'menu') {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Viktorina</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Geografiya bilimingizni sinang</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="overflow-hidden">
              <div className="h-2 bg-[var(--primary)]" />
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-[var(--radius-sm)] bg-[#DCEBFF] flex items-center justify-center mb-4">
                  <Lightning size={28} className="text-[var(--primary)]" weight="fill" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{quizData.daily.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{quizData.daily.questions} ta savol · {quizData.daily.time} soniya</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 text-sm font-semibold text-[var(--warning)]"><Flame size={16} />{quizData.daily.streak} kun</div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-[var(--primary)]"><Lightning size={16} />+{quizData.daily.xpReward} XP</div>
                </div>
                <Button className="w-full" onClick={startQuiz}>Boshlash <ArrowRight size={16} /></Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="overflow-hidden">
              <div className="h-2 bg-[#8B5CF6]" />
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-[var(--radius-sm)] bg-[#EDE9FE] flex items-center justify-center mb-4">
                  <Trophy size={28} className="text-[#8B5CF6]" weight="fill" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{quizData.weekly.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{quizData.weekly.questions} ta savol · {quizData.weekly.time} soniya</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-[#8B5CF6] mb-4"><Trophy size={16} />+{quizData.weekly.xpReward} XP</div>
                <Button className="w-full" variant="secondary" onClick={startQuiz}>Boshlash <ArrowRight size={16} /></Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto text-center space-y-6">
        <div className="flex justify-center">
          {percentage >= 80 ? (
            <ChartGlobe size={96} />
          ) : percentage >= 50 ? (
            <TargetQuestionGlobe size={96} />
          ) : (
            <svg width="96" height="96" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="24" stroke="#2563EB" strokeWidth="2" />
              <ellipse cx="40" cy="40" rx="24" ry="8" stroke="#93C5FD" strokeWidth="1.5" />
              <path d="M32 32L48 48M48 32L32 48" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">{percentage >= 80 ? "Ajoyib!" : percentage >= 50 ? "Yaxshi!" : "Davom eting!"}</h2>
          <p className="text-[var(--text-secondary)] mt-1">Viktorina yakunlandi</p>
        </div>
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-[var(--primary)]">{score}/{quizQuestions.length}</p>
            <p className="text-xs text-[var(--text-secondary)]">To'g'ri javob</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[var(--success)]">{percentage}%</p>
            <p className="text-xs text-[var(--text-secondary)]">Aniqlik</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[var(--warning)]"><Lightning size={18} />+{Math.round(score * 10)} XP</div>
        <Button className="w-full" onClick={startQuiz}><ArrowsClockwise size={16} /> Qayta boshlash</Button>
      </motion.div>
    );
  }

  const q = quizQuestions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto space-y-4">
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

      {showResult && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Button className="w-full" onClick={handleNext}>
            {currentQuestion < quizQuestions.length - 1 ? 'Keyingi savol' : "Natijani ko'rish"}
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      )}
    </div>
  );
}