import { useMemo } from 'react';
import { climateBank } from '../../data/mockData';
import { shuffle, sampleN } from '../../lib/utils';
import QuizEngine from '../../components/games/QuizEngine';

const TOTAL = 7;

function ClimateGraph({ climate }) {
  const max = Math.max(...climate.rain);
  return (
    <div className="w-full max-w-xs rounded-[20px] bg-[var(--background)] p-4">
      <div className="flex items-end justify-between gap-1 h-24">
        {climate.rain.map((v, i) => (
          <div key={i} className="flex-1 bg-[var(--primary)] rounded-t-sm opacity-70" style={{ height: `${(v / max) * 100}%` }} />
        ))}
      </div>
      <p className="text-center text-xs text-[var(--text-secondary)] mt-2">
        Harorat: {climate.temp[0]}°C — {climate.temp[1]}°C
      </p>
    </div>
  );
}

function buildQuestions() {
  return sampleN(climateBank, TOTAL).map((target) => {
    const distractors = sampleN(climateBank, 3, target).map(c => c.type);
    return {
      correct: target.type,
      options: shuffle([target.type, ...distractors]),
      prompt: (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-[var(--text-secondary)] font-medium">Bu qanday iqlim turi?</p>
          <ClimateGraph climate={target} />
        </div>
      ),
    };
  });
}

export default function ClimateGame() {
  const questions = useMemo(buildQuestions, []);
  return <QuizEngine title="Iqlim Match" color="#EA580C" questions={questions} xpPerCorrect={8} timePerQuestion={15} />;
}
