import { useMemo } from 'react';
import { landmarkBank, countryBank } from '../../data/mockData';
import { shuffle, sampleN } from '../../lib/utils';
import QuizEngine from '../../components/games/QuizEngine';

const TOTAL = 8;

function buildQuestions() {
  return sampleN(landmarkBank, TOTAL).map((target) => {
    const otherNames = countryBank.map(c => c.name).filter(n => n !== target.country);
    const distractors = shuffle(otherNames).slice(0, 3);
    return {
      correct: target.country,
      options: shuffle([target.country, ...distractors]),
      prompt: (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-[var(--text-secondary)] font-medium">Bu qaysi davlatga tegishli?</p>
          <div className="w-40 h-40 rounded-[28px] bg-[var(--background)] flex flex-col items-center justify-center gap-1">
            <span className="text-[70px] leading-none">{target.emoji}</span>
            <span className="text-xs font-semibold text-[var(--text-secondary)]">{target.name}</span>
          </div>
        </div>
      ),
    };
  });
}

export default function LandmarkGame() {
  const questions = useMemo(buildQuestions, []);
  return <QuizEngine title="Mashhur Joylar" color="#8B5CF6" questions={questions} xpPerCorrect={8} timePerQuestion={14} />;
}
