import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <main className="flex-1 min-w-0 pb-20 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
}