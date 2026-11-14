import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Eye, EyeSlash, User, Phone, Lock, CheckCircle, WarningCircle,
  ArrowRight, GraduationCap, Student, MapPin, PaperPlaneTilt, CaretDown,
  ChalkboardTeacher, Lightning, At, Check, X, Question
} from '@phosphor-icons/react';
import { cn, formatUzPhone, getUzPhoneOperator } from '../lib/utils';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const ROLES = [
  { id: 'school_student', title: "Maktab o'quvchisi", icon: GraduationCap },
  { id: 'student', title: 'Abituriyent / Talaba', icon: Student },
  { id: 'teacher', title: "O'qituvchi", icon: ChalkboardTeacher },
];

const GRADES = [7, 8, 9, 10, 11];

const REGIONS = [
  'Toshkent shahri',
  'Toshkent viloyati',
  'Samarqand viloyati',
  'Fargʻona viloyati',
  'Andijon viloyati',
  'Namangan viloyati',
  'Buxoro viloyati',
  'Qashqadaryo viloyati',
  'Surxondaryo viloyati',
  'Xorazm viloyati',
  'Navoiy viloyati',
  'Jizzax viloyati',
  'Sirdaryo viloyati',
  'Qoraqalpogʻiston Respublikasi',
];

export default function Auth({ initialMode }) {
  const { signIn, signUp, loginAsDemo, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';

  const queryParams = new URLSearchParams(location.search);
  const routeMode = initialMode || queryParams.get('mode') || (location.pathname === '/register' ? 'signup' : 'signin');

  const [userSelectedMode, setUserSelectedMode] = useState(null);
  const mode = userSelectedMode || routeMode;
  const setMode = (newMode) => {
    setUserSelectedMode(newMode);
    setError('');
    setSuccess('');
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Forms
  const [signupForm, setSignupForm] = useState({
    name: '',
    phone: '+998 ',
    username: '',
    role: 'school_student',
    grade: 9,
    region: 'Toshkent shahri',
    password: '',
    confirmPassword: '',
  });

  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: '',
  });

  // If already authenticated and not intending to switch, redirect
  if (user && !location.state?.forceAuth) {
    navigate(from, { replace: true });
  }

  // Operator
  const phoneOperator = useMemo(() => {
    return getUzPhoneOperator(signupForm.phone);
  }, [signupForm.phone]);

  // Password strength
  const passwordStrength = useMemo(() => {
    const p = signupForm.password;
    if (!p) return { score: 0, label: '', color: 'transparent', width: '0%' };
    let score = 0;
    if (p.length >= 6) score += 1;
    if (p.length >= 8) score += 1;
    if (/[0-9]/.test(p)) score += 1;
    if (/[A-Z]/.test(p) || /[^A-Za-z0-9]/.test(p)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Kuchsiz', color: '#EF4444', width: '25%' };
      case 2:
        return { score: 2, label: "O'rtacha", color: '#F59E0B', width: '50%' };
      case 3:
        return { score: 3, label: 'Yaxshi', color: '#3B82F6', width: '75%' };
      case 4:
        return { score: 4, label: 'Mustahkam', color: '#10B981', width: '100%' };
      default:
        return { score: 0, label: '', color: 'transparent', width: '0%' };
    }
  }, [signupForm.password]);

  // Phone input handler (+998 prefix lock)
  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const formatted = formatUzPhone(raw);
    setSignupForm(prev => ({ ...prev, phone: formatted }));
  };

  // Sign up
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!signupForm.name.trim()) {
      return setError('Ismingizni kiriting');
    }
    if (signupForm.name.trim().length < 3) {
      return setError('Ism kamida 3 ta harfdan iborat boʻlishi kerak');
    }

    const digits = signupForm.phone.replace(/\D/g, '');
    if (digits.length < 12) {
      return setError('9 xonali telefon raqamingizni toʻliq kiriting');
    }

    const cleanUsername = signupForm.username.trim().replace(/^@/, '');
    if (!cleanUsername) {
      return setError('Username kiriting');
    }
    if (cleanUsername.length < 3) {
      return setError('Username kamida 3 ta belgidan iborat boʻlishi kerak');
    }
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      return setError('Username faqat lotin harflari, raqamlar va pastki chiziqdan iborat boʻlishi mumkin');
    }

    if (!signupForm.password) {
      return setError('Parol kiriting');
    }
    if (signupForm.password.length < 6) {
      return setError('Parol kamida 6 ta belgidan iborat boʻlishi kerak');
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      return setError('Kiritilgan parollar mos kelmadi');
    }
    if (!agreedToTerms) {
      return setError('Foydalanish shartlariga rozilik bildiring');
    }

    try {
      setIsSubmitting(true);
      await signUp({
        name: signupForm.name.trim(),
        phone: signupForm.phone,
        username: cleanUsername,
        role: signupForm.role,
        grade: signupForm.grade,
        region: signupForm.region,
        password: signupForm.password,
      });

      setSuccess('Muvaffaqiyatli roʻyxatdan oʻtdingiz');
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    } catch (err) {
      setError(err.message || 'Roʻyxatdan oʻtishda xatolik yuz berdi');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sign in
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const identifier = loginForm.identifier.trim();
    if (!identifier) {
      return setError('Username yoki telefon raqamingizni kiriting');
    }
    if (!loginForm.password) {
      return setError('Parolingizni kiriting');
    }

    try {
      setIsSubmitting(true);
      await signIn({
        identifier,
        password: loginForm.password,
        rememberMe,
      });

      setSuccess('Tizimga muvaffaqiyatli kirdingiz');
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 400);
    } catch (err) {
      setError(err.message || 'Tizimga kirishda xatolik yuz berdi');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick demo
  const handleQuickDemo = () => {
    setError('');
    setIsSubmitting(true);
    loginAsDemo();
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-dvh flex flex-col justify-between bg-[var(--background)] px-4 py-6">
      <SEO
        title={mode === 'signin' ? 'Kirish' : "Ro'yxatdan o'tish"}
        description="GeoBek platformasiga kirish"
        url="/auth"
      />

      {/* Top bar with logo only (Bosh sahifa buttoni olib tashlandi) */}
      <div className="w-full max-w-md mx-auto flex items-center justify-center pt-2 pb-1">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 p-[1.5px] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
            <div className="w-full h-full rounded-[14px] bg-[var(--surface)] flex items-center justify-center overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}main_logo.png`}
                alt="GeoBek"
                className="w-6 h-6 object-contain"
              />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-black text-lg text-[var(--text-primary)] tracking-tight">
              Geo<span className="text-[var(--primary)]">Bek</span>
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[var(--primary-soft)] text-[var(--primary)] uppercase tracking-wider">
              UZ
            </span>
          </div>
        </Link>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md mx-auto my-auto py-6">
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-7 shadow-sm">

          {/* Segmented Switcher */}
          <div className="relative p-1 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center mb-6">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={cn(
                'relative flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 z-10 text-center',
                mode === 'signin'
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              )}
            >
              {mode === 'signin' && (
                <motion.div
                  layoutId="authTab"
                  className="absolute inset-0 bg-[var(--surface)] rounded-lg border border-[var(--border)] -z-10 shadow-sm"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                />
              )}
              <span>Kirish</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('signup')}
              className={cn(
                'relative flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 z-10 text-center',
                mode === 'signup'
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              )}
            >
              {mode === 'signup' && (
                <motion.div
                  layoutId="authTab"
                  className="absolute inset-0 bg-[var(--surface)] rounded-lg border border-[var(--border)] -z-10 shadow-sm"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                />
              )}
              <span>Roʻyxatdan oʻtish</span>
            </button>
          </div>

          {/* Title */}
          <div className="mb-5">
            <h1 className="text-xl font-bold text-[var(--text-primary)]">
              {mode === 'signin' ? 'Hisobga kirish' : 'Roʻyxatdan oʻtish'}
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {mode === 'signin'
                ? 'Username yoki telefon raqamingizni kiriting'
                : 'Yangi profil yaratish uchun maʼlumotlarni toʻldiring'}
            </p>
          </div>

          {/* Error and Success alerts */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <WarningCircle size={16} weight="fill" className="shrink-0 text-red-500" />
                  <span className="font-medium">{error}</span>
                </div>
                <button type="button" onClick={() => setError('')} className="text-red-400 hover:text-red-600">
                  <X size={14} weight="bold" />
                </button>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 font-medium"
              >
                <CheckCircle size={16} weight="fill" className="shrink-0 text-emerald-500" />
                <span>{success}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ───────────── SIGN IN ───────────── */}
          {mode === 'signin' ? (
            <form onSubmit={handleSignInSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text-primary)]">
                  Username yoki Telefon
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none">
                    <User size={16} weight="bold" />
                  </div>
                  <input
                    type="text"
                    autoComplete="username"
                    placeholder="yodgorov yoki +998901234567"
                    value={loginForm.identifier}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, identifier: e.target.value }))}
                    className="w-full h-11 pl-9 pr-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">Parol</label>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-[11px] text-[var(--primary)] hover:underline font-medium"
                  >
                    Unutdingizmi?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none">
                    <Lock size={16} weight="bold" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full h-11 pl-9 pr-10 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-0.5"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeSlash size={16} weight="bold" /> : <Eye size={16} weight="bold" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] accent-[var(--primary)]"
                  />
                  <span className="text-xs text-[var(--text-secondary)]">Eslab qolish</span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 mt-2"
              >
                {isSubmitting ? (
                  <span>Kutilmoqda...</span>
                ) : (
                  <>
                    <span>Kirish</span>
                    <ArrowRight size={15} weight="bold" />
                  </>
                )}
              </Button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleQuickDemo}
                  disabled={isSubmitting}
                  className="w-full h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--primary-soft)] hover:border-[var(--primary)]/30 text-[var(--text-secondary)] hover:text-[var(--primary)] text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <Lightning size={14} weight="bold" className="text-amber-500" />
                  <span>Demo hisob bilan kirish</span>
                </button>
              </div>
            </form>
          ) : (
            /* ───────────── SIGN UP ───────────── */
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              {/* Full name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text-primary)]">
                  Toʻliq ism
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none">
                    <User size={16} weight="bold" />
                  </div>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Alisher Navoiy"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full h-11 pl-9 pr-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
                  />
                </div>
              </div>

              {/* Phone starting with +998 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">
                    Telefon raqam
                  </label>
                  {phoneOperator && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        background: `${phoneOperator.color}15`,
                        color: phoneOperator.color,
                      }}
                    >
                      {phoneOperator.name}
                    </span>
                  )}
                </div>

                <div className="relative flex items-center">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none select-none">
                    <Phone size={15} weight="bold" className="text-[var(--text-tertiary)]" />
                    <span className="text-[11px] font-bold text-[var(--text-secondary)]">UZ</span>
                  </div>
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={signupForm.phone}
                    onChange={handlePhoneChange}
                    onKeyDown={(e) => {
                      if ((e.key === 'Backspace' || e.key === 'Delete') && signupForm.phone.length <= 5) {
                        e.preventDefault();
                      }
                    }}
                    placeholder="+998 (90) 123-45-67"
                    className="w-full h-11 pl-16 pr-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm font-medium text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text-primary)]">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none">
                    <At size={16} weight="bold" />
                  </div>
                  <input
                    type="text"
                    autoComplete="username"
                    placeholder="yodgorov"
                    value={signupForm.username}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
                      setSignupForm(prev => ({ ...prev, username: val }));
                    }}
                    className="w-full h-11 pl-9 pr-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Role selection pills */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text-primary)]">
                  Maqomingiz
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {ROLES.map((r) => {
                    const Icon = r.icon;
                    const isSelected = signupForm.role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSignupForm(prev => ({ ...prev, role: r.id }))}
                        className={cn(
                          'py-2 px-1.5 rounded-xl border text-center transition-all flex items-center justify-center gap-1.5 text-xs',
                          isSelected
                            ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)] font-bold'
                            : 'border-[var(--border)] bg-[var(--background)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        )}
                      >
                        <Icon size={14} weight={isSelected ? 'bold' : 'regular'} />
                        <span className="text-[11px]">{r.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grade selector for school students */}
              {signupForm.role === 'school_student' && (
                <div className="space-y-1.5 p-3 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--text-primary)]">Sinfingiz</span>
                    <span className="text-[10px] text-[var(--primary)] font-bold">{signupForm.grade}-sinf Geografiya</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5 pt-0.5">
                    {GRADES.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setSignupForm(prev => ({ ...prev, grade: g }))}
                        className={cn(
                          'py-1.5 rounded-lg text-xs font-bold transition-all border text-center',
                          signupForm.grade === g
                            ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
                            : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/40'
                        )}
                      >
                        {g}-sinf
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Region selection */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <MapPin size={13} weight="bold" className="text-[var(--primary)]" />
                  <span>Hudud (Viloyat)</span>
                </label>
                <div className="relative">
                  <select
                    value={signupForm.region}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, region: e.target.value }))}
                    className="w-full h-11 pl-3.5 pr-9 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all appearance-none cursor-pointer"
                  >
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-tertiary)]">
                    <CaretDown size={14} weight="bold" />
                  </div>
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">Parol</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Kamida 6 belgi"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full h-10 px-3 pr-8 rounded-xl border border-[var(--border)] bg-[var(--background)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeSlash size={14} weight="bold" /> : <Eye size={14} weight="bold" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[var(--text-primary)]">Tasdiqlash</label>
                    {signupForm.confirmPassword && signupForm.password === signupForm.confirmPassword && (
                      <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5">
                        <Check size={11} weight="bold" /> Mos
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Parolni qaytaring"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className={cn(
                        'w-full h-10 px-3 pr-8 rounded-xl border bg-[var(--background)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 transition-all',
                        signupForm.confirmPassword && signupForm.password !== signupForm.confirmPassword
                          ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
                          : 'border-[var(--border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/10'
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeSlash size={14} weight="bold" /> : <Eye size={14} weight="bold" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Strength bar */}
              {signupForm.password && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[var(--text-secondary)]">Mustahkamlik:</span>
                    <span className="font-bold" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-[var(--border)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: passwordStrength.width,
                        backgroundColor: passwordStrength.color,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Telegram Bot verification badge */}
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-2.5">
                <PaperPlaneTilt size={16} weight="fill" className="shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-xs text-[var(--text-primary)]">Telegram bot orqali tasdiqlash</p>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
                    Xavfsizlik va natijalarni kuzatish uchun profilingiz <b>@geobek_bot</b> bilan integratsiya qilinadi.
                  </p>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 cursor-pointer pt-0.5 select-none">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-[var(--border)] text-[var(--primary)] accent-[var(--primary)]"
                />
                <span className="text-[11px] text-[var(--text-secondary)] leading-tight">
                  <Link to="/oferta" target="_blank" className="text-[var(--primary)] hover:underline font-semibold">
                    Foydalanish shartlariga
                  </Link>{' '}
                  roziman
                </span>
              </label>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 mt-2"
              >
                {isSubmitting ? (
                  <span>Kutilmoqda...</span>
                ) : (
                  <>
                    <span>Roʻyxatdan oʻtish</span>
                    <ArrowRight size={15} weight="bold" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Bottom switch */}
          <div className="mt-5 text-center text-xs text-[var(--text-secondary)]">
            {mode === 'signin' ? (
              <>
                Hisobingiz yoʻqmi?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-[var(--primary)] hover:underline"
                >
                  Roʻyxatdan oʻtish
                </button>
              </>
            ) : (
              <>
                Hisobingiz bormi?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="font-bold text-[var(--primary)] hover:underline"
                >
                  Kirish
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="w-full max-w-md mx-auto text-center text-[11px] text-[var(--text-tertiary)] py-2">
        <p>© 2026 GeoBek.uz</p>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {forgotModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setForgotModalOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-5 shadow-2xl space-y-3.5"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                  <Question size={18} weight="bold" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Parolni tiklash</h3>
                  <p className="text-[11px] text-[var(--text-secondary)]">Qoʻllab-quvvatlash xizmati</p>
                </div>
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Parolni tiklash uchun maʼmuriyat bilan bogʻlaning va profilingiz username yoki telefon raqamini koʻrsating.
              </p>

              <a
                href="https://t.me/geobek_admin"
                target="_blank"
                rel="noreferrer"
                className="block text-center py-2 px-3 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors"
              >
                Telegram orqali bogʻlanish (@geobek_admin)
              </a>

              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="w-full h-9 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--background)] transition-all"
              >
                Yopish
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
