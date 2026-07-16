import { useState, useEffect, useRef, useCallback, useMemo } from 'react'; // eslint-disable-line
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CaretLeft, MapPin, MagnifyingGlassPlus, MagnifyingGlassMinus, ArrowsCounterClockwise, CaretDown, CaretUp } from '@phosphor-icons/react';
import { rivers, riverRegions } from '../../data/rivers';
import { shuffle, sampleN, formatTime } from '../../lib/utils';
import GameShell from '../../components/games/GameShell';
import RiverMap from '../../components/games/RiverMap';
import AnswerCard from '../../components/games/AnswerCard';
import { playCorrect, playWrong, playFinish, vibrate } from '../../lib/gameSound';

const COLOR = '#0EA5E9';
const TARGET_COUNT = 10;

const mapMeta = {
  centralAsia: { label: 'Markaziy Osiyo daryolari' },
  world: { label: 'Dunyo daryolari' },
};

const typeMeta = {
  findRiver: { label: 'Daryoni top', desc: 'Xaritada to\'g\'ri daryoni bosing' },
  nameRiver: { label: 'Nomini top', desc: 'Belgilangan daryo nomini tanlang' },
  source: { label: 'Manba', desc: 'Daryo qayerdan boshlanishini toping' },
  mouth: { label: 'Quyilish', desc: 'Daryo qayerga quyilishini toping' },
  path: { label: 'Yo\'l', desc: 'Manba va quyilishga qarab daryoni toping' },
};

const difficultyMeta = {
  easy: { label: 'Oson', desc: 'Faqat yirik daryolar, vaqt bosimisiz' },
  medium: { label: "O'rtacha", desc: "O'rta daryolar, qisqa taymer" },
  hard: { label: 'Qiyin', desc: 'Kichikroq daryolar, cheklangan vaqt' },
  expert: { label: 'Ekspert', desc: 'Aralash savol turlari, tezkor o\'yin' },
};

const modeMeta = {
  timeAttack: { label: 'Vaqtga qarshi', desc: '90 soniyada imkon boricha ko\'proq toping' },
  survival: { label: 'Omon qolish', desc: '3 ta jon' },
  daily: { label: 'Kunlik', desc: '10 ta aralash savol' },
};

function regionPool(mapRegion) {
  if (mapRegion === 'uzbekistan') return rivers.filter(r => r.region === 'uzbekistan');
  if (mapRegion === 'centralAsia') return rivers.filter(r => r.region === 'uzbekistan' || r.region === 'centralAsia');
  return rivers;
}

function difficultyFilter(pool, difficulty) {
  if (difficulty === 'easy') return pool.filter(r => r.difficulty === 'easy');
  if (difficulty === 'medium') return pool.filter(r => r.difficulty === 'easy' || r.difficulty === 'medium');
  return pool;
}

const ALL_TYPES = ['findRiver', 'nameRiver', 'source', 'mouth', 'path'];

function makeQuestion(river, type) {
  if (type === 'findRiver') {
    return { type, river, prompt: `Toping: ${river.name} daryosi` };
  }
  if (type === 'nameRiver') {
    const distractors = sampleN(rivers, 3, river).map(r => r.name);
    return { type, river, prompt: 'Bu qanday daryo?', options: shuffle([river.name, ...distractors]), correct: river.name };
  }
  if (type === 'source') {
    const distractors = sampleN(rivers, 3, river).map(r => r.source);
    return { type, river, prompt: 'Bu daryo qayerdan boshlanadi?', options: shuffle([river.source, ...distractors]), correct: river.source };
  }
  if (type === 'mouth') {
    const distractors = sampleN(rivers, 3, river).map(r => r.mouth);
    return { type, river, prompt: 'Bu daryo qayerga quyiladi?', options: shuffle([river.mouth, ...distractors]), correct: river.mouth };
  }
  // path
  const distractors = sampleN(rivers, 3, river).map(r => r.name);
  return { type, river, prompt: `Manba: ${river.source}. Quyiladi: ${river.mouth}.`, options: shuffle([river.name, ...distractors]), correct: river.name };
}

function buildQuestions(mapRegion, questionType, difficulty) {
  let pool = difficultyFilter(regionPool(mapRegion), difficulty);
  if (pool.length === 0) pool = regionPool(mapRegion);
  const shuffled = shuffle(pool);
  const list = [];
  for (let i = 0; i < 24; i++) {
    const river = shuffled[i % shuffled.length];
    const type = difficulty === 'expert' ? shuffle(ALL_TYPES)[0] : questionType;
    list.push(makeQuestion(river, type));
  }
  return list;
}

function ChipRow({ entries, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(entries).map(([key, meta]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
          style={{
            background: value === key ? COLOR : 'var(--surface)',
            color: value === key ? '#fff' : 'var(--text-primary)',
            borderColor: value === key ? COLOR : 'var(--border)',
          }}
        >
          {meta.label}
        </button>
      ))}
    </div>
  );
}

function SetupPicker({ onStart, onExit }) {
  const [mapRegion, setMapRegion] = useState('centralAsia');
  const [questionType, setQuestionType] = useState('findRiver');
  const [difficulty, setDifficulty] = useState('easy');
  const [mode, setMode] = useState('timeAttack');
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={onExit} className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--background)] text-[var(--text-secondary)]">
          <CaretLeft size={18} weight="bold" />
        </button>
        <div>
          <p className="text-sm font-bold text-[var(--text-primary)]">Daryolarni Bil</p>
          <p className="text-xs text-[var(--text-secondary)]">Xarita va qiyinlikni tanlang</p>
        </div>
      </div>

      {/* Xarita */}
      <div>
        <p className="text-xs font-bold text-[var(--text-primary)] mb-2">Xarita</p>
        <ChipRow entries={mapMeta} value={mapRegion} onChange={setMapRegion} />
      </div>

      {/* Qiyinlik */}
      <div>
        <p className="text-xs font-bold text-[var(--text-primary)] mb-2">Qiyinlik</p>
        <ChipRow entries={difficultyMeta} value={difficulty} onChange={setDifficulty} />
      </div>

      {/* Qo'shimcha sozlamalar */}
      <div className="rounded-[var(--radius-sm)] border border-[var(--border)] overflow-hidden">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-[var(--text-primary)] bg-[var(--surface)]"
        >
          <span>Qo'shimcha sozlamalar</span>
          {open ? <CaretUp size={14} /> : <CaretDown size={14} />}
        </button>
        {open && (
          <div className="px-4 pb-4 pt-3 space-y-4 bg-[var(--background)]">
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)] mb-2">Savol turi</p>
              <ChipRow entries={{ ...typeMeta, mixed: { label: 'Aralash' } }} value={questionType} onChange={setQuestionType} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)] mb-2">Rejim</p>
              <ChipRow entries={modeMeta} value={mode} onChange={setMode} />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => onStart({ mapRegion, questionType, difficulty, mode })}
        className="w-full py-3 rounded-[var(--radius-sm)] text-sm font-bold text-white"
        style={{ background: COLOR }}
      >
        Boshlash
      </button>
    </div>
  );
}

function RiverChallengeRound({ mapRegion, questionType, difficulty, mode, onExit }) {
  const questions = useMemo(() => buildQuestions(mapRegion, questionType, difficulty), [mapRegion, questionType, difficulty]);
  const mapPool = useMemo(() => regionPool(mapRegion), [mapRegion]);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState('idle');
  const [flash, setFlash] = useState(null);
  const [revealId, setRevealId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [paused, setPaused] = useState(false);
  const [result, setResult] = useState(null);
  const [livesCurrent, setLivesCurrent] = useState(3);
  const [globalTime, setGlobalTime] = useState(90);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const startRef = useRef(Date.now());
  const answeredRef = useRef(0);
  const advanceTimer = useRef(null);

  const current = questions[index % questions.length];
  const timeAttackOrSurvival = mode === 'timeAttack' || mode === 'survival';

  const finish = useCallback((finalScore, finalMistakes) => {
    const elapsed = Math.round((Date.now() - startRef.current) / 1000);
    const answered = answeredRef.current || 1;
    const correctCount = Math.max(0, answered - finalMistakes);
    playFinish();
    setResult({
      xp: finalScore,
      accuracy: Math.round((correctCount / answered) * 100),
      time: formatTime(elapsed),
      mistakes: finalMistakes,
      correct: correctCount,
      total: answered,
    });
  }, []);

  const goNext = useCallback((finalScore, finalMistakes) => {
    const nextIndex = index + 1;
    const cap = timeAttackOrSurvival ? TARGET_COUNT * 2 : TARGET_COUNT;
    if (nextIndex >= cap) { finish(finalScore, finalMistakes); return; }
    setIndex(nextIndex);
    setStatus('idle');
    setFlash(null);
    setRevealId(null);
    setSelected(null);
    setAttempts(0);
  }, [index, timeAttackOrSurvival, finish]);

  const resolveAnswer = useCallback((isCorrect, wrongMapId) => {
    if (status === 'answered' || result || paused) return;

    if (isCorrect) {
      answeredRef.current += 1;
      setStatus('answered');
      const nextCombo = combo + 1;
      const multiplier = Math.min(3, 1 + Math.floor(nextCombo / 3));
      const gained = 10 * multiplier;
      const newScore = score + gained;
      setScore(newScore);
      setCombo(nextCombo);
      if (current.type === 'findRiver') setFlash({ id: current.river.id, kind: 'correct' });
      playCorrect();
      vibrate(15);
      const delay = mode === 'timeAttack' ? 700 : 900;
      advanceTimer.current = setTimeout(() => goNext(newScore, mistakes), delay);
      return;
    }

    if (current.type === 'findRiver' && wrongMapId) setFlash({ id: wrongMapId, kind: 'wrong' });
    playWrong();
    vibrate([30, 30, 30]);
    setCombo(0);
    setTimeout(() => setFlash(f => (f && f.kind === 'wrong' ? null : f)), 420);

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    const newMistakes = mistakes + 1;
    setMistakes(newMistakes);

    if (mode === 'survival') {
      const nextLives = livesCurrent - 1;
      setLivesCurrent(nextLives);
      const gameOver = nextLives <= 0;
      if (nextAttempts >= 2 || gameOver) {
        answeredRef.current += 1;
        setStatus('answered');
        if (current.type === 'findRiver') setRevealId(current.river.id);
        advanceTimer.current = setTimeout(
          () => gameOver ? finish(score, newMistakes) : goNext(score, newMistakes),
          1200
        );
      }
      return;
    }

    if (nextAttempts >= 2) {
      answeredRef.current += 1;
      setStatus('answered');
      if (current.type === 'findRiver') setRevealId(current.river.id);
      advanceTimer.current = setTimeout(() => goNext(score, newMistakes), 1300);
      return;
    }
  }, [status, result, paused, current, combo, score, mistakes, mode, livesCurrent, attempts, goNext, finish]);

  const handleMapPick = useCallback((river) => {
    if (current.type !== 'findRiver') return;
    resolveAnswer(river.id === current.river.id, river.id);
  }, [current, resolveAnswer]);

  const handleOptionPick = useCallback((option) => {
    if (status === 'answered') return;
    setSelected(option);
    resolveAnswer(option === current.correct, null);
  }, [status, current, resolveAnswer]);

  useEffect(() => {
    if (mode !== 'timeAttack' || paused || result) return;
    if (globalTime <= 0) { finish(score, mistakes); return; }
    const t = setInterval(() => setGlobalTime(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [mode, paused, result, globalTime, finish, score, mistakes]);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const restart = () => {
    setIndex(0); setScore(0); setMistakes(0); setCombo(0); setAttempts(0);
    setStatus('idle'); setFlash(null); setRevealId(null); setSelected(null);
    setResult(null); setLivesCurrent(3); setGlobalTime(90);
    setZoom(1); setPan({ x: 0, y: 0 });
    answeredRef.current = 0; startRef.current = Date.now();
  };

  const getOptionState = (opt) => {
    if (status === 'idle') return 'idle';
    if (opt === current.correct) return 'correct';
    if (opt === selected) return 'wrong';
    return 'idle';
  };

  if (!current) return null;

  return (
    <GameShell
      title="Daryolarni Bil"
      color={COLOR}
      score={score}
      progress={{ current: Math.min(index + 1, TARGET_COUNT), total: TARGET_COUNT }}
      timeLeft={mode === 'timeAttack' && !result ? globalTime : undefined}
      timeTotal={90}
      lives={mode === 'survival' ? { current: livesCurrent, max: 3 } : undefined}
      paused={paused}
      onPauseToggle={() => setPaused(p => !p)}
      onExit={onExit}
      result={result}
      onPlayAgain={restart}
    >
      <div className="w-full flex flex-col items-center gap-3">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="px-4 py-2 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-sm font-bold flex items-center gap-1.5 text-center"
        >
          <MapPin size={15} weight="fill" /> {current.prompt}
        </motion.div>

        <div className="relative w-full rounded-[var(--radius)] overflow-hidden border border-[var(--border)]" style={{ height: 320, background: '#DCEEF7' }}>
          <RiverMap
            rivers={mapPool}
            highlightId={current.type !== 'findRiver' && current.type !== 'path' ? current.river.id : null}
            clickable={current.type === 'findRiver'}
            flash={flash}
            revealId={revealId}
            onPick={handleMapPick}
            center={riverRegions[mapRegion].center}
            zoom={zoom * riverRegions[mapRegion].zoom}
            pan={pan}
            onPanChange={setPan}
            onZoomChange={(z) => setZoom(z / riverRegions[mapRegion].zoom)}
          />
          <div className="absolute bottom-2 right-2 flex flex-col gap-1.5">
            <button onClick={() => setZoom(z => Math.min(6, z + 0.5))} className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-sm">
              <MagnifyingGlassPlus size={15} />
            </button>
            <button onClick={() => setZoom(z => Math.max(1, z - 0.5))} className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-sm">
              <MagnifyingGlassMinus size={15} />
            </button>
            <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-sm">
              <ArrowsCounterClockwise size={14} />
            </button>
          </div>
        </div>

        {current.options && (
          <div className="grid grid-cols-1 gap-2.5 w-full max-w-sm">
            {current.options.map(opt => (
              <AnswerCard key={opt} label={opt} state={getOptionState(opt)} disabled={status === 'answered'} onClick={() => handleOptionPick(opt)} />
            ))}
          </div>
        )}

        {combo >= 3 && status === 'idle' && (
          <p className="text-xs font-bold" style={{ color: COLOR }}>🔥 Combo x{Math.min(3, 1 + Math.floor(combo / 3))}</p>
        )}
      </div>
    </GameShell>
  );
}

export default function RiverChallengeGame() {
  const navigate = useNavigate();
  const [config, setConfig] = useState(null);

  if (!config) {
    return <SetupPicker onStart={setConfig} onExit={() => navigate('/games')} />;
  }
  return <RiverChallengeRound key={JSON.stringify(config)} {...config} onExit={() => navigate('/games')} />;
}
