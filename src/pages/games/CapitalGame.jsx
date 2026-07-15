import { useMemo } from 'react';
import { countryBank } from '../../data/mockData';
import { shuffle, sampleN } from '../../lib/utils';
import QuizEngine from '../../components/games/QuizEngine';

const TOTAL = 10;

function buildQuestions() {
  return sampleN(countryBank, TOTAL).map((target) => {
    const distractors = sampleN(countryBank, 3, target).map(c => c.capital);
    return {
      correct: target.capital,
      options: shuffle([target.capital, ...distractors]),
      prompt: (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-[var(--text-secondary)] font-medium">Poytaxtini toping</p>
          <div className="px-8 py-6 rounded-[24px] bg-[var(--background)] flex flex-col items-center gap-2">
            <span className="text-6xl">{target.flag}</span>
            <span className="text-lg font-bold text-[var(--text-primary)]">{target.name}</span>
          </div>
        </div>
      ),
    };
  });
}

export default function CapitalGame() {
  const questions = useMemo(buildQuestions, []);
  return <QuizEngine title="Poytaxtlar Challenge" color="#D97706" questions={questions} xpPerCorrect={8} timePerQuestion={12} />;
}
