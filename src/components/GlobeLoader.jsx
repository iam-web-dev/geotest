import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import EarthDetailedGlobe from './EarthDetailedGlobe';

const PHRASES = [
  "Dunyo xaritasi va materiklar yuklanmoqda...",
  "Geografik koordinatalar va darsliklar...",
  "GeoBek platformasiga xush kelibsiz!",
];

function CyclingText({ dark }) {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % PHRASES.length);
        setFade(true);
      }, 400);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <p
      className="text-xs font-medium tracking-wide transition-opacity duration-300 select-none"
      style={{
        color: dark ? 'rgba(148, 163, 184, 0.85)' : 'rgba(71, 85, 105, 0.85)',
        opacity: fade ? 1 : 0,
      }}
    >
      {PHRASES[idx]}
    </p>
  );
}

export default function GlobeLoader({ onDone, fadeIn = false }) {
  const { darkMode } = useTheme();
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOut(true), 1800);
    const t2 = setTimeout(() => {
      setGone(true);
      onDone?.();
    }, 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 transition-opacity duration-500"
      style={{
        backgroundColor: darkMode ? '#0B1120' : '#F8FAFC',
        opacity: out ? 0 : 1,
        animation: fadeIn ? 'fadeIn 0.35s ease forwards' : 'none',
      }}
    >
      {/* Background Cartographic Radial Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: darkMode
            ? 'radial-gradient(circle 420px at 50% 45%, rgba(30, 58, 138, 0.25) 0%, transparent 80%)'
            : 'radial-gradient(circle 420px at 50% 45%, rgba(219, 234, 254, 0.8) 0%, transparent 80%)',
        }}
      />

      {/* Detailed Rotating Real World Globe */}
      <div className="relative z-10 flex flex-col items-center">
        <EarthDetailedGlobe size={220} interactive={true} />

        {/* Brand and Status */}
        <div className="mt-6 text-center space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
            Geo<span className="text-blue-600">Bek</span>
          </h2>

          <p className="text-xs text-[var(--text-secondary)] font-medium max-w-xs">
            Oʻzbekiston va Jahon Geografiyasi Taʼlim Portali
          </p>

          <div className="pt-2">
            <CyclingText dark={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
