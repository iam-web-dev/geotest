import { useMemo } from 'react';
import { countryBank } from '../../data/mockData';
import { shuffle, sampleN } from '../../lib/utils';
import QuizEngine from '../../components/games/QuizEngine';

const TOTAL = 10;

function buildQuestions() {
  return sampleN(countryBank, TOTAL).map((target) => {
    const distractors = sampleN(countryBank, 3, target).map(c => c.name);
    return {
      correct: target.name,
      options: shuffle([target.name, ...distractors]),
      prompt: (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-[var(--text-secondary)] font-medium">Bu qaysi davlat bayrog'i?</p>
          <div className="w-40 h-40 rounded-[28px] bg-[var(--background)] flex items-center justify-center text-[88px] shadow-inner">
            {target.flag}
          </div>
        </div>
      ),
    };
  });
}

export default function FlagGame() {
  const questions = useMemo(buildQuestions, []);
  return <QuizEngine title="Bayroqni Bil" color="#2563EB" questions={questions} xpPerCorrect={10} timePerQuestion={12} />;
}
