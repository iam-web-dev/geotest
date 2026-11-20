import { useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  House, BookOpen, Books, Trophy, Newspaper, Sun, Moon,
  GraduationCap, Student, ChalkboardTeacher, SignOut, SignIn, Megaphone, Target, MapTrifold
} from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { user as defaultMockUser } from '../../data/mockData';
import Logo from '../Logo';

const ROLE_META = {
  school_student: { Icon: GraduationCap, color: '#1E5BF8' },
  applicant:      { Icon: Target,        color: '#D97706' },
  student:        { Icon: Student,        color: '#7C3AED' },
  teacher:        { Icon: ChalkboardTeacher, color: '#059669' },
};

function loadSettings() {
  try { return JSON.parse(localStorage.getItem('geo_user_settings')) || {}; } catch { return {}; }
}

// Asosiy boʻlimlar
const mainNavItems = [
  { to: '/', icon: House, label: 'Bosh Sahifa' },
  { to: '/tests', icon: BookOpen, label: 'Online Testlar' },
  { to: '/school', icon: GraduationCap, label: "Maktab Ta'limi" },
  { to: '/library', icon: Books, label: "Universitet Ta'limi" },
];

// Qoʻshimcha interaktiv boʻlimlar (Viktorina va Oʻyinlar hozircha navbardan olib tashlandi, Geografik xarita ularning oʻrnida)
const secondaryNavItems = [
  { to: '/announcements', icon: Megaphone, label: 'Eʼlonlar' },
  { to: '/map', icon: MapTrifold, label: 'Geografik xarita' },
  { to: '/rankings', icon: Trophy, label: 'Reyting' },
  { to: '/articles', icon: Newspaper, label: 'Maqolalar' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const settings = loadSettings();
  const merged = user ? { ...defaultMockUser, ...user, ...settings } : null;
  const roleMeta = merged ? (ROLE_META[merged.role] || ROLE_META.school_student) : null;
  const RoleIcon = roleMeta ? roleMeta.Icon : null;

  const handleLogout = async () => {
    await signOut();
    setShowLogoutModal(false);
    navigate('/auth');
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 z-30 bg-[var(--surface)] border-r border-[var(--border)] p-4 overflow-y-auto">
      <NavLink to="/" className="flex items-center gap-3 px-3 py-3 mb-4 rounded-2xl hover:bg-[var(--surface-raised)] transition-colors group">
        <Logo className="w-8 h-8 transition-transform shrink-0 group-hover:scale-105" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-black text-[var(--text-primary)] leading-none tracking-tight">
              GEO<span className="text-[var(--primary)]">BEK</span>
            </h1>
          </div>
          <p className="text-[11px] text-[var(--text-secondary)] font-medium mt-0.5 truncate">Taʼlim Platformasi</p>
        </div>
      </NavLink>

      <nav className="flex-1 space-y-4">
        {/* Main 5 Sections */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
            Asosiy Boʻlimlar
          </p>
          {mainNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-bold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)]'
                )
              }
            >
              <item.icon size={19} weight="bold" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Secondary Modules */}
        <div className="space-y-1 pt-2 border-t border-[var(--border)]">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
            Interaktiv
          </p>
          {secondaryNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-[var(--radius-sm)] text-xs font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)]'
                )
              }
            >
              <item.icon size={17} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-600">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Profile & Footer */}
      <div className="border-t border-[var(--border)] pt-4 mt-4 space-y-2">
        {merged ? (
          <div className="flex items-center gap-2 p-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--background)] transition-all group">
            <NavLink to="/profile" className="flex items-center flex-1 min-w-0 gap-3">
              <div
                className="flex items-center justify-center overflow-hidden text-white rounded-full w-9 h-9 shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)' }}
              >
                {merged.avatar ? (
                  <img src={merged.avatar} alt={merged.name} className="object-cover w-full h-full" />
                ) : (
                  <RoleIcon size={18} weight="duotone" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{merged.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">{(merged.xp || 0).toLocaleString()} XP</p>
              </div>
            </NavLink>

            <button
              onClick={() => setShowLogoutModal(true)}
              title="Tizimdan chiqish"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
            >
              <SignOut size={16} weight="bold" />
            </button>
          </div>
        ) : (
          <NavLink
            to="/auth"
            className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] bg-[var(--primary-soft)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-200 shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--primary)]/15 flex items-center justify-center shrink-0">
              <SignIn size={18} weight="bold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">Tizimga kirish</p>
              <p className="text-[11px] opacity-80 truncate">Roʻyxatdan oʻtish</p>
            </div>
          </NavLink>
        )}

        <NavLink
          to="/creator"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 w-full px-3 py-2 rounded-[var(--radius-sm)] text-xs font-medium transition-all duration-200 border",
              isActive
                ? "bg-[var(--primary-soft)] text-[var(--primary)] border-[var(--primary)]/30 font-bold"
                : "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)] border-transparent hover:border-[var(--border)]"
            )
          }
        >
          <ChalkboardTeacher size={16} weight="bold" />
          <span>{t('nav.creator', 'Ustoz Qambarov O.X.')}</span>
        </NavLink>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-[var(--radius-sm)] text-sm text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)] active:scale-[0.98] transition-all duration-150"
        >
          {darkMode ? <Sun size={18} weight="bold" className="text-amber-400" /> : <Moon size={18} />}
          <span>{darkMode ? 'Yorqin rejim' : "Qorongʻi rejim"}</span>
        </button>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)}>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 w-full max-w-sm space-y-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex items-center justify-center w-12 h-12 text-red-500 rounded-full bg-red-500/10">
                <SignOut size={22} weight="fill" />
              </div>
              <div>
                <p className="font-bold text-[var(--text-primary)]">Chiqishni tasdiqlang</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">GEOBEK hisobingizdan chiqishni xohlaysizmi?</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 h-10 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--background)] transition-all cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 h-10 rounded-xl bg-red-500 text-xs font-semibold text-white hover:bg-red-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <SignOut size={15} weight="bold" />
                <span>Chiqish</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </aside>
  );
}
