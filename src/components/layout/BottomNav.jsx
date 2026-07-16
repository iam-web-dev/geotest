import { NavLink } from 'react-router-dom';
import { House, BookOpen, GameController, Books, GraduationCap, Student, ChalkboardTeacher } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

const ROLE_META = {
  school_student: { Icon: GraduationCap, color: '#2563EB' },
  student:        { Icon: Student,        color: '#7C3AED' },
  teacher:        { Icon: ChalkboardTeacher, color: '#16A34A' },
};

function loadSettings() {
  try { return JSON.parse(localStorage.getItem('geo_user_settings')) || {}; } catch { return {}; }
}

const staticItems = [
  { to: '/', icon: House, label: 'Bosh' },
  { to: '/tests', icon: BookOpen, label: 'Testlar' },
  { to: '/games', icon: GameController, label: "O'yin" },
  { to: '/library', icon: Books, label: 'Kutubxona' },
];

export default function BottomNav() {
  const settings = loadSettings();
  const role = settings.role || 'school_student';
  const roleMeta = ROLE_META[role] || ROLE_META.school_student;
  const RoleIcon = roleMeta.Icon;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface)] border-t border-[var(--border)] safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {staticItems.map((item) => (
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

        {/* Profile with role avatar */}
        <NavLink to="/profile"
          className={({ isActive }) =>
            cn('flex flex-col items-center gap-0.5 py-2 px-3 rounded-[var(--radius-sm)] transition-all duration-200 min-w-[56px]',
              isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]')
          }>
          {({ isActive }) => (
            <>
              <div className={cn('p-1.5 rounded-lg transition-all duration-200', isActive && 'bg-[var(--primary-soft)]')}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: isActive ? 'transparent' : `${roleMeta.color}22` }}>
                  <RoleIcon size={16} style={{ color: isActive ? 'var(--primary)' : roleMeta.color }} weight="duotone" />
                </div>
              </div>
              <span className={cn('text-[10px] font-medium transition-all duration-200', isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]')}>
                Profil
              </span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}