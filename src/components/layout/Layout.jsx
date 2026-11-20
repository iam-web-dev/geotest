import { useRef, useEffect, useState, Suspense } from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon } from '@phosphor-icons/react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Logo from '../Logo';
import RouteFallback from '../RouteFallback';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

function RouteProgressBar() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2.5px',
        background: 'linear-gradient(90deg, #2563EB 0%, #38BDF8 60%, #60A5FA 100%)',
        transformOrigin: 'left center',
        zIndex: 10000,
        boxShadow: '0 0 8px rgba(37,99,235,0.55)',
      }}
    />
  );
}

export default function Layout() {
  const location = useLocation();
  const isFirst = useRef(true);
  const [show, setShow] = useState(false);
  const timerRef = useRef(null);
  const { darkMode, toggleTheme } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    clearTimeout(timerRef.current);
    setShow(true);
    timerRef.current = setTimeout(() => setShow(false), 380);
    return () => clearTimeout(timerRef.current);
  }, [location.pathname]);

  return (
    <div className="flex min-h-dvh">
      <AnimatePresence>{show && <RouteProgressBar />}</AnimatePresence>
      <Sidebar />
      <main className="flex-1 min-w-0 pb-20 lg:pb-0">
        {/* Mobile Top Header */}
        <header className="lg:hidden sticky top-0 z-[9990] bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--border)] px-4 py-2.5 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <Logo className="w-7 h-7 shrink-0 transition-transform group-hover:scale-105" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-[var(--text-primary)]">
                  GEO<span className="text-[var(--primary)]">BEK</span>
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[var(--primary-soft)] text-[var(--primary)] uppercase tracking-wider">
                  UZ
                </span>
              </div>
            </div>
          </NavLink>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-xl bg-[var(--background)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-90 transition-transform duration-150"
              aria-label="Mavzuni oʻzgartirish"
              title={darkMode ? 'Yorqin rejimga oʻtish' : 'Qorongʻi rejimga oʻtish'}
            >
              <span className="inline-flex transition-transform duration-300">
                {darkMode ? <Sun size={17} weight="bold" className="text-amber-400" /> : <Moon size={17} weight="bold" />}
              </span>
            </button>
            {user ? (
              <NavLink to="/profile" className="flex items-center">
                <div className="w-8 h-8 rounded-xl bg-[var(--primary-soft)] text-[var(--primary)] font-bold text-xs flex items-center justify-center overflow-hidden border border-[var(--border)]">
                  {user.avatar ? (
                    <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    user.name?.[0]?.toUpperCase() || 'U'
                  )}
                </div>
              </NavLink>
            ) : (
              <NavLink
                to="/auth"
                className="px-3 py-1.5 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-all"
              >
                Kirish
              </NavLink>
            )}
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
