import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Trophy, Clock, Star, GlobeHemisphereWest, MapTrifold, Buildings,
  Mountains, Drop, Sun, Sparkle, Flag, X, Info, Lightning, ChartBar,
  Target, ListChecks, Lightbulb, BookOpen, Medal, ArrowRight,
  HourglassMedium, Heart, Fire,
} from '@phosphor-icons/react';
import { cn, getDifficultyColor, getDifficultyLabel } from '../lib/utils';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { games, gameStats } from '../data/mockData';
import { PuzzleMap } from '../components/illustrations/GeoIllustrations';

const gameIcons = {
  Flag, GlobeHemisphereWest, MapTrifold, Buildings,
  Droplets: Drop, Mountain: Mountains, Sun, Earth: GlobeHemisphereWest, Sparkle,
};

const filters = [
  { key: 'all', label: 'Barchasi' },
  { key: 'popular', label: 'Ommabop' },
  { key: 'favorites', label: 'Sevimlilar' },
];

function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('geotest-fav-games') || '[]'); }
    catch { return []; }
  });
  useEffect(() => {
    localStorage.setItem('geotest-fav-games', JSON.stringify(favorites));
  }, [favorites]);
  const toggle = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  return { favorites, toggle };
}

function GameModal({ game, onClose, onStart, isFavorite, onToggleFavorite }) {
  const [mode, setMode] = useState('practice');
  if (!game) return null;
  const Icon = gameIcons[game.icon] || Sparkle;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="relative w-full sm:max-w-3xl rounded-[24px] sm:rounded-[var(--radius-lg)] bg-[var(--surface)] overflow-hidden grid sm:grid-cols-[220px_1fr]"
          initial={{ y: 30, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--surface)]/80 flex items-center justify-center z-10 text-[var(--text-primary)]">
            <X size={16} />
          </button>

          <div className="px-6 py-6 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3 relative" style={{ background: `${game.color}1F` }}>
            <button
              onClick={() => onToggleFavorite(game.id)}
              className="absolute top-4 left-4 sm:top-auto sm:left-auto sm:relative sm:order-last sm:self-start w-8 h-8 rounded-full bg-[var(--surface)] flex items-center justify-center shadow-sm"
            >
              <Heart size={16} weight={isFavorite ? 'fill' : 'regular'} className={isFavorite ? 'text-[var(--danger)]' : 'text-[var(--text-secondary)]'} />
            </button>
            <div className="w-14 h-14 rounded-[16px] flex items-center justify-center shrink-0 bg-[var(--surface)]">
              <Icon size={28} style={{ color: game.color }} weight="fill" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] leading-tight">{game.title}</h2>
              <p className="text-xs text-[var(--text-secondary)] mt-1 hidden sm:block">{game.description}</p>
            </div>

            <div className="hidden sm:flex flex-col gap-1.5 mt-2 w-full">
              <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--surface)]/80 w-fit" style={{ color: game.color }}>
                <ChartBar size={11} /> {getDifficultyLabel(game.difficulty)}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--surface)]/80 text-[var(--text-secondary)] w-fit">
                <Clock size={11} /> ~{game.time} daqiqa
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--surface)]/80 text-[#F59E0B] w-fit">
                <Lightning size={11} weight="fill" /> +{game.xp} XP
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mt-auto sm:mt-4 w-full">
              <div className="rounded-[var(--radius-xs)] bg-[var(--surface)]/70 py-1.5 text-center">
                <p className="text-sm font-bold text-[var(--text-primary)]">{game.highScore || '-'}</p>
                <p className="text-[9px] text-[var(--text-secondary)]">Rekord</p>
              </div>
              <div className="rounded-[var(--radius-xs)] bg-[var(--surface)]/70 py-1.5 text-center">
                <p className="text-sm font-bold text-[var(--text-primary)]">{game.questions}</p>
                <p className="text-[9px] text-[var(--text-secondary)]">Savol</p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 grid sm:grid-cols-2 gap-x-5 gap-y-4">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)] mb-1.5">
                <ListChecks size={14} /> Qoidalar
              </p>
              <ul className="space-y-1">
                {game.rules.slice(0, 3).map((r, i) => (
                  <li key={i} className="text-[11px] leading-snug text-[var(--text-secondary)] flex gap-1.5">
                    <span className="text-[var(--primary)]">•</span>{r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)] mb-1.5">
                <Lightbulb size={14} /> Maslahatlar
              </p>
              <ul className="space-y-1">
                {game.tips.slice(0, 3).map((t, i) => (
                  <li key={i} className="text-[11px] leading-snug text-[var(--text-secondary)] flex gap-1.5">
                    <span className="text-[#F59E0B]">•</span>{t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[var(--radius-sm)] p-2.5 bg-[var(--primary-soft)] sm:col-span-2">
              <p className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--primary)] mb-0.5">
                <Target size={12} /> Ball tizimi
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] leading-snug">{game.scoring}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs font-bold text-[var(--text-primary)] mb-1.5">Rejimni tanlang</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('practice')}
                  className={cn(
                    'flex items-center justify-center gap-1.5 py-2 rounded-[var(--radius-sm)] border-2 transition-all text-xs font-semibold',
                    mode === 'practice' ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)]' : 'border-[var(--border)] text-[var(--text-secondary)]'
                  )}
                >
                  <BookOpen size={15} /> Mashq
                </button>
                <button
                  onClick={() => setMode('ranked')}
                  className={cn(
                    'flex items-center justify-center gap-1.5 py-2 rounded-[var(--radius-sm)] border-2 transition-all text-xs font-semibold',
                    mode === 'ranked' ? 'border-[#F59E0B] bg-[#FEF3C7] dark:bg-[#F59E0B]/15 text-[#D97706]' : 'border-[var(--border)] text-[var(--text-secondary)]'
                  )}
                >
                  <Medal size={15} /> Reyting
                </button>
              </div>
            </div>

            {game.playable ? (
              <Button className="w-full sm:col-span-2" onClick={() => onStart(game, mode)}>
                <Play size={15} weight="fill" /> O'yinni boshlash <ArrowRight size={15} />
              </Button>
            ) : (
              <div className="w-full sm:col-span-2 flex items-center justify-center gap-2 py-3 rounded-[var(--radius-sm)] bg-[var(--background)] text-xs font-semibold text-[var(--text-secondary)]">
                <HourglassMedium size={15} /> Bu o'yin hozircha tayyorlanmoqda
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Games() {
  const featured = games[0];
  const [filter, setFilter] = useState('all');
  const [activeGame, setActiveGame] = useState(null);
  const navigate = useNavigate();
  const { favorites, toggle: toggleFavorite } = useFavorites();

  const visible = games.filter(g =>
    filter === 'all' ? true : filter === 'popular' ? g.popular : favorites.includes(g.id)
  );

  const handlePlay = (game) => {
    if (game.playable) navigate(`/games/play/${game.slug}`);
    else setActiveGame(game);
  };

  const handleStart = (game, mode) => {
    navigate(`/games/play/${game.slug}${mode === 'ranked' ? '?mode=ranked' : ''}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">O'yinlar</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Geografiyani o'ynab o'rganing</p>
      </div>

      {/* Featured banner */}
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] p-6 sm:p-8"
        style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #1D4ED8 100%)' }}>
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 hidden sm:block">
          <PuzzleMap size={160} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="flex items-center gap-1.5 text-xs font-bold text-white bg-white/15 px-3 py-1 rounded-full">
              <Fire size={13} weight="fill" className="text-orange-300" /> Bugungi tavsiya
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{featured.title}</h2>
          <p className="text-white/70 text-sm max-w-md mb-4">{featured.description}</p>
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="flex items-center gap-1 text-white/80 text-xs font-semibold bg-white/10 px-2.5 py-1 rounded-full">
              <ChartBar size={12} /> {getDifficultyLabel(featured.difficulty)}
            </span>
            <span className="flex items-center gap-1 text-white/80 text-xs font-semibold bg-white/10 px-2.5 py-1 rounded-full">
              <Clock size={12} /> {featured.time} daqiqa
            </span>
            <span className="flex items-center gap-1 text-orange-200 text-xs font-bold bg-white/10 px-2.5 py-1 rounded-full">
              <Lightning size={12} weight="fill" /> +{featured.xp} XP
            </span>
          </div>
          <Button className="bg-white text-[var(--primary)] hover:bg-white/90" onClick={() => handlePlay(featured)}>
            <Play size={14} weight="fill" /> O'ynash
          </Button>
        </div>
      </div>

      {/* Personal stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "O'yinlar", value: gameStats.gamesPlayed, Icon: Sparkle, color: '#2563EB' },
          { label: 'Aniqlik', value: `${gameStats.accuracy}%`, Icon: Target, color: '#16A34A' },
          { label: 'Seriya', value: gameStats.currentStreak, Icon: Lightning, color: '#F59E0B' },
          { label: 'Eng yaxshi', value: gameStats.bestScore, Icon: Trophy, color: '#8B5CF6' },
        ].map(({ label, value, Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-3.5 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                <Icon size={17} style={{ color }} weight="fill" />
              </div>
              <div className="min-w-0">
                <p className="text-base font-bold text-[var(--text-primary)] leading-tight">{value}</p>
                <p className="text-[11px] text-[var(--text-secondary)] truncate">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-semibold transition-colors',
              filter === f.key ? 'bg-[var(--primary)] text-white' : 'bg-[var(--background)] text-[var(--text-secondary)] hover:bg-[var(--border)]'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Game grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.length === 0 && filter === 'favorites' && (
          <p className="col-span-full text-center text-sm text-[var(--text-secondary)] py-10">
            Hali sevimli o'yinlar yo'q. Kartadagi yurak belgisini bosing.
          </p>
        )}
        {visible.map((game, i) => {
          const Icon = gameIcons[game.icon] || Sparkle;
          const isFav = favorites.includes(game.id);
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              whileHover={{ y: -3 }}
            >
              <Card className="h-full overflow-hidden border border-[var(--border)] relative group/g transition-colors duration-[250ms]"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = game.color}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div className="h-20 flex items-center justify-center relative" style={{ background: `${game.color}1F` }}>
                  <Icon size={34} style={{ color: game.color }} weight="fill" />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(game.id); }}
                    className="absolute top-2 left-2 w-8 h-8 rounded-full bg-[var(--surface)] shadow-sm flex items-center justify-center"
                  >
                    <Heart size={16} weight={isFav ? 'fill' : 'regular'} className={isFav ? 'text-[var(--danger)]' : 'text-[var(--text-secondary)]'} />
                  </button>
                  {game.highScore > 0 && (
                    <span className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--surface)] shadow-sm text-[#D97706]">
                      <Trophy size={10} weight="fill" /> {game.highScore}
                    </span>
                  )}
                </div>

                <CardContent className="p-4">
                  <p className="text-sm font-bold text-[var(--text-primary)] leading-tight">{game.title}</p>
                  <p className="text-xs text-[var(--text-tertiary)] leading-snug mt-1 line-clamp-2">{game.description}</p>

                  <div className="flex items-center gap-2.5 mt-3 text-[11px] flex-wrap">
                    <span className="flex items-center gap-1 font-semibold" style={{ color: getDifficultyColor(game.difficulty) }}>
                      <ChartBar size={11} /> {getDifficultyLabel(game.difficulty)}
                    </span>
                    <span className="flex items-center gap-1 text-[var(--text-tertiary)]">
                      <Clock size={11} /> {game.time}m
                    </span>
                    <span className="flex items-center gap-1 text-[#F59E0B] font-semibold">
                      <Lightning size={11} weight="fill" /> {game.xp}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3.5">
                    <Button size="sm" className="flex-1" onClick={() => handlePlay(game)}>
                      {game.playable ? <Play size={12} weight="fill" /> : <HourglassMedium size={12} />} O'ynash
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setActiveGame(game)}>
                      <Info size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <GameModal
        game={activeGame}
        onClose={() => setActiveGame(null)}
        onStart={handleStart}
        isFavorite={activeGame ? favorites.includes(activeGame.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
