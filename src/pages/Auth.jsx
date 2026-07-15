import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeSlash, GoogleLogo, GithubLogo } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [mode, setMode] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    if (mode === 'signup') {
      if (!form.name) {
        setError('Iltimos, ismingizni kiriting');
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError('Parollar mos kelmadi');
        return;
      }
      signUp(form.name, form.email, form.password);
    } else {
      signIn(form.email, form.password);
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[var(--background)]">
      <div className="absolute inset-0 geo-pattern pointer-events-none" />
      
      <div className="relative w-full max-w-md mx-auto px-4 py-8">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-12 h-12 rounded-[var(--radius)] geo-gradient flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-[var(--primary)]/20">
              G
            </div>
            <span className="text-2xl font-bold text-[var(--text-primary)]">GeoTest</span>
          </Link>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {mode === 'signin' ? 'Xush kelibsiz!' : "Hisob yarating"}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {mode === 'signin'
              ? 'Davom etish uchun hisobingizga kiring'
              : "Ro'yxatdan o'ting va o'rganishni boshlang"}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center bg-[var(--surface)] rounded-[var(--radius)] p-1 border border-[var(--border)] mb-6">
          {['signin', 'signup'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                'flex-1 py-2.5 rounded-[var(--radius-sm)] text-sm font-semibold transition-all duration-200',
                mode === m
                  ? 'bg-[var(--primary)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              )}
            >
              {m === 'signin' ? 'Kirish' : "Ro'yxatdan o'tish"}
            </button>
          ))}
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: mode === 'signin' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === 'signin' ? 20 : -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 space-y-5 shadow-sm"
          >
            {error && (
              <div className="bg-[var(--danger)]/10 border border-[var(--danger)]/30 text-[var(--danger)] text-sm font-medium px-4 py-3 rounded-[var(--radius-sm)]">
                {error}
              </div>
            )}
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                  To'liq ismingiz
                </label>
                <input
                  type="text"
                  placeholder="Aliyev Alisher"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full h-12 px-4 rounded-[var(--radius-sm)] border-2 border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:outline-none transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full h-12 px-4 rounded-[var(--radius-sm)] border-2 border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Parol
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  className="w-full h-12 pl-4 pr-12 rounded-[var(--radius-sm)] border-2 border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                  Parolni tasdiqlang
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  className="w-full h-12 px-4 rounded-[var(--radius-sm)] border-2 border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)] focus:outline-none transition-all"
                />
              </div>
            )}

            {mode === 'signin' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]" />
                  <span className="text-sm text-[var(--text-secondary)]">Eslab qolish</span>
                </label>
                <button className="text-sm font-medium text-[var(--primary)] hover:underline">
                  Parolni unutdingizmi?
                </button>
              </div>
            )}

            <Button className="w-full h-12" size="lg">
              {mode === 'signin' ? 'Kirish' : "Ro'yxatdan o'tish"}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[var(--border)]" />
              <span className="text-xs text-[var(--text-secondary)]">yoki</span>
              <div className="flex-1 h-px bg-[var(--border)]" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 h-11 rounded-[var(--radius-sm)] border-2 border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--background)] transition-all text-sm font-medium text-[var(--text-primary)]">
                <GoogleLogo size={20} weight="bold" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 h-11 rounded-[var(--radius-sm)] border-2 border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--background)] transition-all text-sm font-medium text-[var(--text-primary)]">
                <GithubLogo size={20} weight="bold" />
                GitHub
              </button>
            </div>
          </motion.form>
        </AnimatePresence>

        {/* Switch mode hint */}
        <p className="text-center mt-6 text-sm text-[var(--text-secondary)]">
          {mode === 'signin' ? (
            <>
              Hisobingiz yo'qmi?{' '}
              <button onClick={() => setMode('signup')} className="font-semibold text-[var(--primary)] hover:underline">
                Ro'yxatdan o'tish
              </button>
            </>
          ) : (
            <>
              Hisobingiz bormi?{' '}
              <button onClick={() => setMode('signin')} className="font-semibold text-[var(--primary)] hover:underline">
                Kirish
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}