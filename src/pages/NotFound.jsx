import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Compass, Search } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[80dvh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="w-24 h-24 rounded-full geo-gradient flex items-center justify-center text-5xl mx-auto mb-6"
        >
          🗺️
        </motion.div>
        <h1 className="text-6xl font-bold text-[var(--text-primary)] mb-2">404</h1>
        <p className="text-lg text-[var(--text-secondary)] mb-2">Sahifa topilmadi</p>
        <p className="text-sm text-[var(--text-secondary)] mb-8">
          Qidirgan sahifangiz mavjud emas yoki ko'chirilgan bo'lishi mumkin.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/">
            <Button>
              <Home size={16} /> Bosh sahifa
            </Button>
          </Link>
          <Link to="/tests">
            <Button variant="secondary">
              <Compass size={16} /> Testlar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}