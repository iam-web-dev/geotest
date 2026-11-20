import { NavLink } from 'react-router-dom';
import { House, BookOpen, Books, GraduationCap, Student, ChalkboardTeacher, SignIn, Target, MapTrifold } from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

const ROLE_META = {
  school_student: { Icon: GraduationCap, color: '#1E5BF8' },
  applicant:      { Icon: Target,        color: '#D97706' },
  student:        { Icon: Student,        color: '#7C3AED' },
  teacher:        { Icon: ChalkboardTeacher, color: '#059669' },
};

function loadSettings() {
  try { return JSON.parse(localStorage.getItem('geo_user_settings')) || {}; } catch { return {}; }
}

// Main Core Sections
const navItems = [
  { to: '/', icon: House, label: 'Bosh' },
  { to: '/map', icon: MapTrifold, label: 'Xarita' },
  { to: '/tests', icon: BookOpen, label: 'Testlar' },
  { to: '/school', icon: GraduationCap, label: 'Maktab' },
  { to: '/library', icon: Books, label: 'Universitet' },
];

export default function BottomNav() {
  const { user } = useAuth();
  const settings = loadSettings();
  const role = user?.role || settings.role || 'school_student';
  const roleMeta = ROLE_META[role] || ROLE_META.school_student;
  const RoleIcon = roleMeta.Icon;
  const avatar = user?.avatar || settings.avatar;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-[var(--surface)] border-t border-[var(--border)] safe-area-bottom shadow-lg">
      <div className="flex items-center justify-around px-1 py-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 py-1.5 px-2.5 rounded-[var(--radius-sm)] transition-all duration-200 min-w-[52px]',
                isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={cn('p-1 rounded-lg transition-all duration-200', isActive && 'bg-[var(--primary-soft)]')}>
                  <item.icon size={19} weight={isActive ? 'bold' : 'regular'} />
                </div>
                <span className={cn('text-[10px] font-medium transition-all duration-200', isActive ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-secondary)]')}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}

        {/* Profile / Login */}
        <NavLink
          to={user ? '/profile' : '/auth'}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center gap-0.5 py-1.5 px-2.5 rounded-[var(--radius-sm)] transition-all duration-200 min-w-[52px]',
              isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className={cn('p-1 rounded-lg transition-all duration-200', isActive && 'bg-[var(--primary-soft)]')}>
                {user ? (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center overflow-hidden"
                    style={{ background: isActive ? 'transparent' : 'var(--primary-soft)' }}
                  >
                    {avatar ? (
                      <img src={avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <RoleIcon size={16} style={{ color: 'var(--primary)' }} weight="duotone" />
                    )}
                  </div>
                ) : (
                  <SignIn size={19} />
                )}
              </div>
              <span className={cn('text-[10px] font-medium transition-all duration-200', isActive ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-secondary)]')}>
                {user ? 'Profil' : 'Kirish'}
              </span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
