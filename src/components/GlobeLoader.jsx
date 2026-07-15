import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { EarthSVG } from './EarthSVG';

const PHRASES = [
  "Bilimlar safari boshlanmoqda...",
  "Xaritalar tayyorlanmoqda...",
  "Dunyo sizni kutmoqda...",
];

function CyclingText({ dark }) {
  const [idx, setIdx]   = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i + 1) % PHRASES.length); setFade(true); }, 450);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <p style={{
      fontSize: '0.75rem',
      letterSpacing: '0.06em',
      color: dark ? 'rgba(148,163,184,0.75)' : 'rgba(71,100,143,0.65)',
      opacity: fade ? 1 : 0,
      transition: 'opacity 0.45s ease',
      userSelect: 'none',
    }}>
      {PHRASES[idx]}
    </p>
  );
}

export default function GlobeLoader({ onDone, fadeIn = false }) {
  const { darkMode } = useTheme();
  const [out,  setOut]  = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOut(true),  1400);
    const t2 = setTimeout(() => { setGone(true); onDone?.(); }, 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  if (gone) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
      background: darkMode ? '#0F172A' : '#F7FAFF',
      opacity: out ? 0 : 1,
      transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)',
      animation: fadeIn ? 'fadeIn 0.35s ease forwards' : 'none',
    }}>
      {/* Radial backdrop */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: darkMode
          ? 'radial-gradient(ellipse 55% 50% at 50% 46%, #1e3a8a22 0%, transparent 70%)'
          : 'radial-gradient(ellipse 55% 50% at 50% 46%, #dbeafe70 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <EarthSVG size={180} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <p style={{
          fontSize: '1.35rem', fontWeight: 700,
          letterSpacing: '-0.02em',
          color: darkMode ? '#F1F5F9' : '#1E3A5F',
          userSelect: 'none',
        }}>
          Geo<span style={{ color: '#2F80ED' }}>Test</span>
        </p>
        <CyclingText dark={darkMode} />
      </div>
    </div>
  );
}
