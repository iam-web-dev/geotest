import { useRef, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

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
        background: 'linear-gradient(90deg, #2F80ED 0%, #60A5FA 60%, #8FD3FF 100%)',
        transformOrigin: 'left center',
        zIndex: 200,
        boxShadow: '0 0 8px rgba(47,128,237,0.55)',
      }}
    />
  );
}

export default function Layout() {
  const location = useLocation();
  const isFirst = useRef(true);
  const [show, setShow] = useState(false);
  const timerRef = useRef(null);

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
