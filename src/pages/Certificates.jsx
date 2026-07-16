import { useNavigate } from 'react-router-dom';
import { CaretLeft, SealCheck, Trophy, BookOpen } from '@phosphor-icons/react';
import { useTheme } from '../context/ThemeContext';
import { user as initialUser } from '../data/mockData';

export default function Certificates() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div className="max-w-lg mx-auto space-y-5 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => navigate('/profile')}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
          <CaretLeft size={18} weight="bold" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Sertifikatlar</h1>
          <p className="text-xs text-[var(--text-secondary)]">{initialUser.certificates} ta milliy sertifikat</p>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#2563EB18' }}>
          <BookOpen size={18} style={{ color: '#2563EB' }} />
        </div>
      </div>

      {/* Certificate cards */}
      <div className="space-y-3">
        {initialUser.nationalCertificates.map(cert => {
          const pct = Math.round((cert.score / cert.maxScore) * 100);
          const gradeColor = pct >= 90 ? '#16A34A' : pct >= 75 ? '#2563EB' : '#F59E0B';

          return (
            <div key={cert.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1" style={{ background: gradeColor }} />

              <div className="p-4 space-y-4">
                {/* Title row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${gradeColor}15` }}>
                      <SealCheck size={22} weight="fill" style={{ color: gradeColor }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{cert.title}</p>
                      <p className="text-[10px] font-mono text-[var(--text-tertiary)] mt-0.5">{cert.series}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[var(--text-tertiary)] shrink-0 mt-0.5">{cert.date}</span>
                </div>

                {/* Score bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">Ball natija</span>
                    <span className="text-xs font-bold" style={{ color: gradeColor }}>
                      {cert.score} / {cert.maxScore}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--background)] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: gradeColor }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px]" style={{ color: gradeColor }}>{pct}%</span>
                    <span className="text-[11px] font-semibold" style={{ color: gradeColor }}>{cert.grade}</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl p-3 flex items-center gap-2"
                    style={{ background: `${gradeColor}10` }}>
                    <Trophy size={16} style={{ color: gradeColor }} />
                    <div>
                      <p className="text-xs font-bold text-[var(--text-primary)]">{cert.rank}-o'rin</p>
                      <p className="text-[10px] text-[var(--text-secondary)]">Reyting</p>
                    </div>
                  </div>
                  <div className="rounded-xl p-3 flex items-center gap-2"
                    style={{ background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}>
                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white shrink-0"
                      style={{ background: gradeColor }}>N</div>
                    <div>
                      <p className="text-xs font-bold text-[var(--text-primary)]">{cert.totalParticipants.toLocaleString()}</p>
                      <p className="text-[10px] text-[var(--text-secondary)]">Ishtirokchi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
