import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkle, Robot, Trophy, Users, BookOpen, VideoCamera,
  Compass, ArrowRight, Check, Lightning, Star
} from '@phosphor-icons/react';

export default function PlusProPromo() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('pro'); // 'plus' | 'pro'

  const features = [
    {
      icon: BookOpen,
      title: 'Oʻquv rejalardagi premium materiallar',
      desc: '5–11-sinf barcha darslik taqdimotlari (PPTX), metodik konspektlar va yopiq test savollari',
      color: '#8B5CF6',
    },
    {
      icon: VideoCamera,
      title: 'Video kurslar',
      desc: 'Tajribali ustozlar tomonidan tayyorlangan interaktiv video darslar va xaritalar sharhi',
      color: '#EC4899',
    },
    {
      icon: Compass,
      title: 'Xalqaro musobaqalarga tayyorlanish uchun yoʻl xaritasi',
      desc: 'Bosqichma-bosqich rejalashtirilgan oʻquv yoʻnalishi va shaxsiy rivojlanish grafigi',
      color: '#06B6D4',
    },
  ];

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--surface-raised)] p-6 sm:p-8 shadow-sm relative overflow-hidden">
      {/* Background soft glow decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title and CTA */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm">
              <Sparkle size={13} weight="fill" />
              <span>Plus & Pro</span>
            </span>
            <span className="text-xs font-semibold text-[var(--text-secondary)]">
              GeoBek Obunasi Imkoniyatlari
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Maqsadingizga tezroq yeting
          </h2>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Olimpiada gʻolibligi, DTM maksimal balli yoki geografiyani professional oʻrganish uchun
            zarur boʻlgan barcha imkoniyatlar yagona paketda.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/oferta')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95"
          >
            <span>Tariflarni koʻrish</span>
            <ArrowRight size={15} weight="bold" />
          </button>
        </div>
      </div>

      {/* 6 Key Robocontest-style Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2 relative z-10">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:shadow-sm transition-all duration-200 flex items-start gap-3.5 group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                style={{
                  background: `${item.color}15`,
                  color: item.color,
                }}
              >
                <Icon size={20} weight="bold" />
              </div>

              <div className="space-y-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--primary)] transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
