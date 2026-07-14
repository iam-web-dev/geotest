import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, Clock, Star, MapPin, GlobeHemisphereWest, MapTrifold, Buildings, Mountains, Drop, Sun, Compass, Sparkle, Flag } from '@phosphor-icons/react';
import { cn, getDifficultyColor, getDifficultyLabel } from '../lib/utils';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { games } from '../data/mockData';
import { PuzzleMap } from '../components/illustrations/GeoIllustrations';

const gameIcons = {
  Flag: Flag,
  GlobeHemisphereWest: GlobeHemisphereWest,
  MapTrifold: MapTrifold,
  Buildings: Buildings,
  Droplets: Drop,
  Mountain: Mountains,
  Sun: Sun,
  Earth: GlobeHemisphereWest,
};

export default function Games() {
  const featured = games[0];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">O'yinlar</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Geografiyani o'ynab o'rganing</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }}
        className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--primary)] p-6 sm:p-8">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 hidden sm:block">
          <PuzzleMap size={160} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkle size={14} className="text-orange-300" weight="fill" />
            <span className="text-orange-300 text-xs font-medium">Ommabop O'yin</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{featured.title}</h2>
          <p className="text-white/70 text-sm max-w-md mb-3">{featured.description}</p>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white/60 text-xs">{featured.questions} ta savol</span>
            <span className="w-0.5 h-0.5 rounded-full bg-white/40" />
            <span className="text-white/60 text-xs">{getDifficultyLabel(featured.difficulty)}</span>
          </div>
          <Button className="bg-white text-[var(--primary)] hover:bg-white/90"><Play size={14} weight="fill" /> O'ynash</Button>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {games.map((game, i) => {
          const Icon = gameIcons[game.icon] || Compass;
          const DiffIcon = game.difficulty === 'easy' ? Star : game.difficulty === 'medium' ? Clock : Trophy;
          return (
            <motion.div key={game.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.04 }} >
              <Card className="h-full">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-[var(--radius-xs)] flex items-center justify-center" style={{ background: game.bg, color: game.color }}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{game.title}</p>
                      <p className="text-xs text-[var(--text-tertiary)] leading-tight mt-0.5 line-clamp-2">{game.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[var(--text-tertiary)]">{game.questions} ta</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-[var(--border)]" />
                    <span className="flex items-center gap-1 font-medium" style={{ color: getDifficultyColor(game.difficulty) }}>
                      <DiffIcon size={12} /> {getDifficultyLabel(game.difficulty)}
                    </span>
                    {game.highScore > 0 && (
                      <>
                        <span className="w-0.5 h-0.5 rounded-full bg-[var(--border)]" />
                        <span className="flex items-center gap-1 text-[#D97706] font-medium"><Trophy size={12} weight="fill" /> {game.highScore}</span>
                      </>
                    )}
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="secondary" className="w-full"><Play size={12} weight="fill" /> O'ynash</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}