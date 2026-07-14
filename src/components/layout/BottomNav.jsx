import { NavLink } from 'react-router-dom';
import { House, BookOpen, GameController, Books, User } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

const navItems = [
  { to: '/', icon: House, label: 'Bosh' },
  { to: '/tests', icon: BookOpen, label: 'Testlar' },
  { to: '/quiz', icon: GameController, label: 'O\'yin' },
  { to: '/library', icon: Books, label: 'Kutubxona' },
  { to: '/profile', icon: User, label: 'Profil' },
];

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface)] border-t border-[var(--border)] safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 py-2 px-3 rounded-[var(--radius-sm)] transition-all duration-200 min-w-[56px]',
                isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={cn('p-1.5 rounded-lg transition-all duration-200', isActive && 'bg-[var(--primary-soft)]')}>
                  <item.icon size={20} />
                </div>
                <span className={cn('text-[10px] font-medium transition-all duration-200', isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]')}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}