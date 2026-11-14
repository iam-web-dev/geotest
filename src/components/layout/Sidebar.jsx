import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  House, BookOpen, Books, GameController, User, Trophy, Newspaper, Compass, Sun, Moon,
  GraduationCap, Student, ChalkboardTeacher, SignOut, SignIn
} from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { user as defaultMockUser } from '../../data/mockData';

const ROLE_META = {
  school_student: { Icon: GraduationCap, color: '#2563EB' },
  student:        { Icon: Student,        color: '#7C3AED' },
  teacher:        { Icon: ChalkboardTeacher, color: '#16A34A' },
};

function loadSettings() {
  try { return JSON.parse(localStorage.getItem('geo_user_settings')) || {}; } catch { return {}; }
}

// 5 Main Core Sections requested by client
const mainNavItems = [
  { to: '/', icon: House, label: 'Bosh Sahifa' },
  { to: '/tests', icon: BookOpen, label: 'Testlar' },
  { to: '/school', icon: GraduationCap, label: "Maktab Ta'limi" },
  { to: '/library', icon: Books, label: 'Kutubxona' },
  { to: '/profile', icon: User, label: 'Shaxsiy Profil' },
];

// Secondary interactive modules
const secondaryNavItems = [
  { to: '/quiz', icon: GameController, label: 'Viktorina' },
  { to: '/games', icon: Compass, label: "O'yinlar" },
  { to: '/rankings', icon: Trophy, label: 'Reyting' },
  { to: '/articles', icon: Newspaper, label: 'Maqolalar' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
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
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-[var(--surface)] border-r border-[var(--border)] p-4 overflow-y-auto">
      <div className="flex items-center gap-3 px-3 py-4 mb-4">
        <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 p-[1.5px] shadow-sm flex items-center justify-center shrink-0">
          <div className="w-full h-full rounded-[14px] bg-[var(--surface)] flex items-center justify-center overflow-hidden">
            <img src={`${import.meta.env.BASE_URL}main_logo.png`} alt="GeoBek" className="w-7 h-7 object-contain" />
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-black text-[var(--text-primary)] leading-none tracking-tight">
              Geo<span className="text-[var(--primary)]">Bek</span>
            </h1>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[var(--primary-soft)] text-[var(--primary)] uppercase tracking-wider">
              UZ
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-secondary)] font-medium mt-0.5 truncate">Taʼlim Portali</p>
        </div>
      </div>

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
            <NavLink to="/profile" className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)' }}
              >
                {merged.avatar ? (
                  <img src={merged.avatar} alt={merged.name} className="w-full h-full object-cover" />
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
              <p className="text-sm font-semibold truncate leading-tight">Tizimga kirish</p>
              <p className="text-[11px] opacity-80 truncate">Roʻyxatdan oʻtish</p>
            </div>
          </NavLink>
        )}

        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-[var(--radius-sm)] text-sm text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)] transition-all duration-200"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{darkMode ? 'Yorqin rejim' : "Qorong'i rejim"}</span>
        </button>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 w-full max-w-sm space-y-4 shadow-2xl">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <SignOut size={22} weight="fill" />
              </div>
              <div>
                <p className="font-bold text-[var(--text-primary)]">Chiqishni tasdiqlang</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">GeoBek hisobingizdan chiqishni xohlaysizmi?</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 h-10 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--background)] transition-all"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 h-10 rounded-xl bg-red-500 text-xs font-semibold text-white hover:bg-red-600 transition-all flex items-center justify-center gap-1.5"
              >
                <SignOut size={15} weight="bold" />
                <span>Chiqish</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
