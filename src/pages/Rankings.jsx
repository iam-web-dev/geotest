import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Users, Buildings, MapPin, Globe, CaretRight, Crown, Star } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { Card, CardContent } from '../components/ui/Card';
import { rankings } from '../data/mockData';
import { PodiumEarthFlag, PodiumGlobe } from '../components/illustrations/GeoIllustrations';

const tabs = [
  { id: 'national', label: 'Milliy', icon: Globe },
  { id: 'regional', label: 'Viloyat', icon: MapPin },
  { id: 'school', label: 'Maktab', icon: Buildings },
  { id: 'friends', label: "Do'stlar", icon: Users },
];

function Podium({ top3 }) {
  return (
    <div className="flex items-end justify-center gap-3 mb-6">
      {top3[1] && (
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold text-sm mb-2">
            {top3[1].name.charAt(0)}
          </div>
          <p className="text-xs font-semibold text-[var(--text-primary)] text-center">{top3[1].name.split(' ')[0]}</p>
          <p className="text-[10px] text-[var(--text-secondary)]">{top3[1].xp.toLocaleString()} XP</p>
          <div className="w-16 h-20 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-lg mt-2 flex items-center justify-center">
            <Medal size={20} className="text-gray-500" weight="fill" />
          </div>
        </div>
      )}
      {top3[0] && (
        <div className="flex flex-col items-center -mt-4">
          <Crown size={24} className="text-yellow-500 mb-1" weight="fill" />
          <div className="w-14 h-14 rounded-full geo-gradient flex items-center justify-center text-white font-bold text-lg mb-2 ring-4 ring-yellow-300">
            {top3[0].name.charAt(0)}
          </div>
          <p className="text-sm font-bold text-[var(--text-primary)] text-center">{top3[0].name.split(' ')[0]}</p>
          <p className="text-xs text-[var(--text-secondary)]">{top3[0].xp.toLocaleString()} XP</p>
          <div className="w-20 h-24 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg mt-2 flex items-center justify-center">
            <Trophy size={24} className="text-white" weight="fill" />
          </div>
        </div>
      )}
      {top3[2] && (
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center text-white font-bold text-sm mb-2">
            {top3[2].name.charAt(0)}
          </div>
          <p className="text-xs font-semibold text-[var(--text-primary)] text-center">{top3[2].name.split(' ')[0]}</p>
          <p className="text-[10px] text-[var(--text-secondary)]">{top3[2].xp.toLocaleString()} XP</p>
          <div className="w-16 h-16 bg-gradient-to-t from-orange-300 to-orange-200 rounded-t-lg mt-2 flex items-center justify-center">
            <Medal size={20} className="text-orange-600" weight="fill" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Rankings() {
  const [activeTab, setActiveTab] = useState('national');
  const currentRankings = rankings[activeTab] || [];
  const top3 = currentRankings.slice(0, 3);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Reyting</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Eng yaxshi geografiya bilimdonlari</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={cn('flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all', activeTab === tab.id ? 'bg-[var(--primary)] text-white shadow-sm' : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] border border-[var(--border)]')}>
            <tab.icon size={16} />{tab.label}
          </button>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card><CardContent className="p-6"><Podium top3={top3} /></CardContent></Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card><CardContent className="p-0">
          {currentRankings.map((person, i) => (
            <div key={person.id} className={cn('flex items-center gap-3 p-4', i < currentRankings.length - 1 && 'border-b border-[var(--border)]', person.isCurrentUser && 'bg-[var(--primary-soft)]/50')}>
              <span className={cn('w-7 text-center text-sm font-bold', i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-400' : 'text-[var(--text-secondary)]')}>{i + 1}</span>
              <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold', i === 0 ? 'geo-gradient' : i === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' : i === 2 ? 'bg-gradient-to-br from-orange-300 to-orange-400' : 'bg-[var(--border)] text-[var(--text-secondary)]')}>
                {person.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{person.name}{person.isCurrentUser && <span className="text-xs text-[var(--primary)] ml-1">(Siz)</span>}</p>
                <p className="text-xs text-[var(--text-secondary)]">{person.level}-daraja · {person.tests} ta test</p>
              </div>
              <span className="text-sm font-bold text-[var(--text-primary)]">{person.xp.toLocaleString()} XP</span>
            </div>
          ))}
        </CardContent></Card>
      </motion.div>
    </div>
  );
}