import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GameShell from './GameShell';
import AnswerCard from './AnswerCard';
import { playCorrect, playWrong, playFinish, vibrate } from '../../lib/gameSound';
import { formatTime } from '../../lib/utils';

const XP_PER_CORRECT = 10;
const STREAK_BONUS = 20;
const TIME_PER_Q = 15;

export default function QuizEngine({ title, color, questions, xpPerCorrect = XP_PER_CORRECT, timePerQuestion = TIME_PER_Q }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | answered
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [paused, setPaused] = useState(false);
  const [result, setResult] = useState(null);
  const startRef = useRef(Date.now());
  const advanceTimer = useRef(null);

  const total = questions.length;
  const current = questions[index];

  const finish = useCallback((finalScore, finalMistakes) => {
    const elapsed = Math.round((Date.now() - startRef.current) / 1000);
    const correctCount = total - finalMistakes;
    const accuracy = Math.round((correctCount / total) * 100);
    playFinish();
    setResult({
      xp: finalScore,
      accuracy,
      time: formatTime(elapsed),
      mistakes: finalMistakes,
      correct: correctCount,
      total,
    });
  }, [total]);

  const advance = useCallback((finalScore, finalMistakes) => {
    if (index + 1 >= total) {
      finish(finalScore, finalMistakes);
    } else {
      setIndex(i => i + 1);
      setSelected(null);
      setStatus('idle');
      setTimeLeft(timePerQuestion);
    }
  }, [index, total, finish, timePerQuestion]);

  const handleAnswer = useCallback((answer) => {
    if (status !== 'idle' || result) return;
    setStatus('answered');
    setSelected(answer);
    const isCorrect = answer === current.correct;
    let newScore = score;
    let newMistakes = mistakes;
    if (isCorrect) {
      const nextStreak = streak + 1;
      let gained = xpPerCorrect;
      if (nextStreak % 5 === 0) gained += STREAK_BONUS;
      newScore = score + gained;
      setScore(newScore);
      setStreak(nextStreak);
      playCorrect();
      vibrate(15);
    } else {
      newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setStreak(0);
      playWrong();
      vibrate([30, 30, 30]);
    }
    advanceTimer.current = setTimeout(() => advance(newScore, newMistakes), 700);
  }, [status, result, current, score, mistakes, streak, xpPerCorrect, advance]);

  useEffect(() => {
    if (paused || status !== 'idle' || result) return;
    if (timeLeft <= 0) { handleAnswer(null); return; }
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [paused, status, result, timeLeft, handleAnswer]);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const restart = () => {
    setIndex(0); setScore(0); setMistakes(0); setStreak(0);
    setSelected(null); setStatus('idle'); setTimeLeft(timePerQuestion);
    setResult(null); startRef.current = Date.now();
  };

  const getState = (opt) => {
    if (status === 'idle') return 'idle';
    if (opt === current.correct) return 'correct';
    if (opt === selected) return 'wrong';
    return 'idle';
  };

  return (
    <GameShell
      title={title}
      color={color}
      score={score}
      progress={{ current: index + 1, total }}
      timeLeft={result ? undefined : timeLeft}
      timeTotal={timePerQuestion}
      paused={paused}
      onPauseToggle={() => setPaused(p => !p)}
      onExit={() => navigate('/games')}
      result={result}
      onPlayAgain={restart}
    >
      {current && (
        <div className="flex flex-col items-center gap-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col items-center"
            >
              {current.prompt}

              {streak >= 2 && status === 'idle' && (
                <p className="text-xs font-bold text-[#F59E0B] mt-2">🔥 {streak} ketma-ket to'g'ri!</p>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
            {current.options.map((opt) => (
              <AnswerCard
                key={opt}
                label={opt}
                state={getState(opt)}
                disabled={status === 'answered'}
                onClick={() => handleAnswer(opt)}
              />
            ))}
          </div>

          {status === 'answered' && current.extra && (
            <motion.p
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="text-xs text-center text-[var(--text-secondary)] max-w-sm px-2"
            >
              {current.extra}
            </motion.p>
          )}
        </div>
      )}
    </GameShell>
  );
}
