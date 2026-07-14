import { NavLink } from 'react-router-dom';
import {
  House, BookOpen, Books, GameController, User, Trophy, Newspaper, Compass, Sun, Moon
} from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { user } from '../../data/mockData';

const navItems = [
  { to: '/', icon: House, label: 'Bosh Sahifa' },
  { to: '/tests', icon: BookOpen, label: 'Testlar' },
  { to: '/library', icon: Books, label: 'Kutubxona' },
  { to: '/quiz', icon: GameController, label: 'Viktorina' },
  { to: '/games', icon: Compass, label: "O'yinlar" },
  { to: '/articles', icon: Newspaper, label: 'Maqolalar' },
  { to: '/rankings', icon: Trophy, label: 'Reyting' },
  { to: '/profile', icon: User, label: 'Profil' },
];

export default function Sidebar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-[var(--surface)] border-r border-[var(--border)] p-4">
      <div className="flex items-center gap-3 px-3 py-4 mb-6">
        <div className="w-10 h-10 rounded-[var(--radius-sm)] geo-gradient flex items-center justify-center text-white font-bold text-lg">G</div>
        <div>
          <h1 className="text-lg font-bold text-[var(--text-primary)]">Geo-Test</h1>
          <p className="text-xs text-[var(--text-secondary)]">.uz</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-[var(--primary-soft)] text-[var(--primary)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)]'
              )
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[var(--border)] pt-4 mt-4">
        <NavLink to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] hover:bg-[var(--background)] transition-all duration-200">
          <div className="w-9 h-9 rounded-full geo-gradient flex items-center justify-center text-white text-sm font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user.name}</p>
            <p className="text-xs text-[var(--text-secondary)]">{user.xp.toLocaleString()} XP</p>
          </div>
        </NavLink>

        <button onClick={toggleTheme} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-[var(--radius-sm)] text-sm text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)] transition-all duration-200 mt-1">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{darkMode ? 'Yorqin rejim' : 'Qorong\'i rejim'}</span>
        </button>
      </div>
    </aside>
  );
}