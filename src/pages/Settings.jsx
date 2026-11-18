import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { CaretLeft, Check, Camera, GraduationCap, Student, ChalkboardTeacher, SignOut, Target, Globe } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { user as initialUser } from '../data/mockData';

const STORAGE_KEY = 'geo_user_settings';

function loadSettings() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveSettings(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (e) { void e; }
}

const REGIONS = [
  'Toshkent shahri', 'Toshkent viloyati', 'Andijon', 'Fargʻona', 'Namangan',
  'Samarqand', 'Buxoro', 'Navoiy', 'Qashqadaryo', 'Surxondaryo',
  'Jizzax', 'Sirdaryo', 'Xorazm', 'Qoraqalpogʻiston',
];

const ROLES = [
  {
    key: 'school_student',
    label: 'Maktab oʻquvchisi',
    desc: '1–11 sinf',
    Icon: GraduationCap,
    color: '#2563EB',
  },
  {
    key: 'applicant',
    label: 'Abituriyent',
    desc: 'OTMga tayyorgarlik',
    Icon: Target,
    color: '#D97706',
  },
  {
    key: 'student',
    label: 'Talaba',
    desc: 'Oliy ta\'lim',
    Icon: Student,
    color: '#7C3AED',
  },
  {
    key: 'teacher',
    label: 'Oʻqituvchi',
    desc: 'Pedagoglar uchun',
    Icon: ChalkboardTeacher,
    color: '#16A34A',
  },
];

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-11 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
    />
  );
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full h-11 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-colors appearance-none"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const { user: authUser, updateProfile, signOut } = useAuth();
  const { language: currentLang, setLanguage } = useLanguage();
  const saved = loadSettings();
  const merged = { ...initialUser, ...(authUser || {}), ...saved };

  const [form, setForm] = useState({
    name:             merged.name             || '',
    school:           merged.school           || '',
    region:           merged.region           || '',
    language:         merged.language         || currentLang || 'uz',
    role:             merged.role             || 'school_student',
    grade:            merged.grade            || '',
    course:           merged.course           || '',
    applicantType:    merged.applicantType    || '',
    targetUniversity: merged.targetUniversity || '',
    faculty:          merged.faculty          || '',
    teachingCategory: merged.teachingCategory || '',
    experience:       merged.experience       || '',
    avatar:           merged.avatar           || '',
  });
  const fileInputRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleAvatarPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set('avatar', reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    saveSettings(form);
    if (form.language) setLanguage(form.language);
    if (updateProfile) updateProfile(form);
    navigate('/profile');
  };

  const handleLogout = async () => {
    await signOut();
    setShowLogoutModal(false);
    navigate('/auth');
  };

  return (
    <div className="max-w-lg mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => navigate('/profile')}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
          <CaretLeft size={18} weight="bold" />
        </button>
        <h1 className="text-xl font-bold text-[var(--text-primary)] flex-1">Sozlamalar</h1>
      </div>

      {/* Avatar preview */}
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="relative w-fit">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden"
            style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)' }}>
            {form.avatar
              ? <img src={form.avatar} alt="Avatar" className="w-full h-full object-cover" />
              : (form.name.charAt(0) || '?')}
          </div>
          <button type="button" onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[var(--primary)] border-2 border-[var(--surface)] flex items-center justify-center text-white shadow-sm hover:bg-[var(--primary-hover)] transition-colors">
            <Camera size={13} weight="bold" />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarPick} className="hidden" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-[var(--text-primary)]">{form.name || 'Ism kiritilmagan'}</p>
          <p className="text-xs text-[var(--text-secondary)]">{form.school || 'Maktab kiritilmagan'}</p>
        </div>
      </div>

      {/* Role / Daraja selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">Ta'lim darajangiz</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ROLES.map(({ key, label, desc, Icon, color }) => (
            <button key={key} onClick={() => set('role', key)}
              className={cn('flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all',
                form.role === key
                  ? 'border-current bg-[var(--surface)]'
                  : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/40')}
              style={form.role === key ? { borderColor: color } : {}}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: form.role === key ? `${color}18` : 'var(--background)' }}>
                <Icon size={22} style={{ color: form.role === key ? color : 'var(--text-tertiary)' }} />
              </div>
              <div className="text-center">
                <p className={cn('text-[11px] font-bold leading-tight', form.role === key ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]')}>
                  {label}
                </p>
                <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Basic fields */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-4">
        {/* Language Selection */}
        <Field label="Asosiy til (Oʻzbekcha / Русский / Qaraqalpaqsha)">
          <div className="grid grid-cols-3 gap-2 pt-1">
            {LANGUAGES.map((l) => {
              const isSelected = form.language === l.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => set('language', l.code)}
                  className={cn(
                    'h-10 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer',
                    isSelected
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
                      : 'bg-[var(--background)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]/40 hover:text-[var(--text-primary)]'
                  )}
                >
                  <span>{l.flag}</span>
                  <span className="truncate">{l.name}</span>
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Ism Familiya">
          <Input value={form.name} onChange={v => set('name', v)} placeholder="Toʻliq ismingiz" />
        </Field>

        <Field label="Viloyat / Shahar">
          <Select value={form.region} onChange={v => set('region', v)}
            options={REGIONS} placeholder="Tanlang..." />
        </Field>
      </div>

      {/* Role-specific fields */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-4">
        <div className="border-b border-[var(--border)] pb-2">
          <p className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
            {ROLES.find(r => r.key === form.role)?.label} ma'lumotlari
          </p>
        </div>

        {form.role === 'school_student' && (
          <>
            <Field label="Sinf">
              <Select
                value={form.grade}
                onChange={v => set('grade', Number(v) || v)}
                placeholder="Sinfni tanlang"
                options={Array.from({ length: 11 }, (_, i) => ({ value: i + 1, label: `${i + 1}-sinf` }))}
              />
            </Field>
            <Field label="Maktabingiz nomi / raqami">
              <Input
                value={form.school}
                onChange={v => set('school', v)}
                placeholder="Masalan: 37-IDUM yoki 14-umumta'lim maktabi"
              />
            </Field>
          </>
        )}

        {form.role === 'applicant' && (
          <>
            <Field label="Qanday abituriyentsiz? (Asosiy maqsad)">
              <Select
                value={form.applicantType}
                onChange={v => set('applicantType', v)}
                placeholder="Tayyorgarlik maqsadini tanlang"
                options={[
                  { value: 'OTMga kirish', label: 'OTMga kirish (DTM / Davlat imtihonlari)' },
                  { value: 'Milliy sertifikat', label: 'Milliy sertifikat (Geografiya fani)' },
                  { value: 'Akademik litsey / Prezident maktabi', label: 'Akademik litsey / Prezident maktabi' },
                  { value: 'Olimpiada / Xalqaro', label: 'Olimpiada va xalqaro tanlovlar' },
                  { value: 'Boshqa', label: 'Boshqa' },
                ]}
              />
            </Field>
            <Field label="Maqsad qilingan OTM yoki yo'nalish">
              <Input
                value={form.targetUniversity}
                onChange={v => set('targetUniversity', v)}
                placeholder="Masalan: O'zMU, Nizomiy nomidagi TDPU, SamDU"
              />
            </Field>
            <Field label="Tayyorlanayotgan joy / Muassasa">
              <Input
                value={form.school}
                onChange={v => set('school', v)}
                placeholder="Masalan: Mustaqil, 'Registon' o'quv markazi"
              />
            </Field>
          </>
        )}

        {form.role === 'student' && (
          <>
            <Field label="Kurs">
              <Select
                value={form.course}
                onChange={v => set('course', Number(v) || v)}
                placeholder="Kursni tanlang"
                options={[
                  { value: 1, label: '1-kurs (Bakalavr)' },
                  { value: 2, label: '2-kurs (Bakalavr)' },
                  { value: 3, label: '3-kurs (Bakalavr)' },
                  { value: 4, label: '4-kurs (Bakalavr)' },
                  { value: 'magistr', label: 'Magistratura' },
                ]}
              />
            </Field>
            <Field label="OTM (Universitet / Institut) nomi">
              <Input
                value={form.school}
                onChange={v => set('school', v)}
                placeholder="Masalan: O'zbekiston Milliy Universiteti"
              />
            </Field>
            <Field label="Fakultet / Yo'nalish">
              <Input
                value={form.faculty}
                onChange={v => set('faculty', v)}
                placeholder="Masalan: Geografiya va tabiiy resurslar"
              />
            </Field>
          </>
        )}

        {form.role === 'teacher' && (
          <>
            <Field label="Pedagogik toifa">
              <Select
                value={form.teachingCategory}
                onChange={v => set('teachingCategory', v)}
                placeholder="Toifangizni tanlang"
                options={[
                  { value: 'Oliy toifa', label: 'Oliy toifali oʻqituvchi' },
                  { value: '1-toifa', label: '1-toifali oʻqituvchi' },
                  { value: '2-toifa', label: '2-toifali oʻqituvchi' },
                  { value: 'Mutaxassis', label: 'Mutaxassis oʻqituvchi' },
                  { value: 'Pedagog', label: 'Boshlangʻich pedagog' },
                ]}
              />
            </Field>
            <Field label="Pedagogik ish staji">
              <Select
                value={form.experience}
                onChange={v => set('experience', v)}
                placeholder="Tajribani tanlang"
                options={[
                  { value: '0-1',   label: '1 yildan kam' },
                  { value: '1-3',   label: '1–3 yil' },
                  { value: '3-5',   label: '3–5 yil' },
                  { value: '5-10',  label: '5–10 yil' },
                  { value: '10-20', label: '10–20 yil' },
                  { value: '20+',   label: '20 yildan ortiq' },
                ]}
              />
            </Field>
            <Field label="Ta'lim muassasasi nomi">
              <Input
                value={form.school}
                onChange={v => set('school', v)}
                placeholder="Masalan: 37-IDUM yoki Toshkent shahar litseyi"
              />
            </Field>
          </>
        )}
      </div>

      {/* Save button */}
      <button onClick={handleSave}
        className="w-full h-12 rounded-2xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
        style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)' }}>
        <Check size={16} weight="bold" /> Saqlash
      </button>

      {/* Logout button */}
      <button
        type="button"
        onClick={() => setShowLogoutModal(true)}
        className="w-full h-12 rounded-2xl border border-red-500/30 text-red-500 hover:bg-red-500/10 text-sm font-semibold transition-all flex items-center justify-center gap-2"
      >
        <SignOut size={16} weight="bold" />
        <span>Hisobdan chiqish</span>
      </button>

      {/* Logout confirmation modal */}
      {showLogoutModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)}>
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 w-full max-w-sm space-y-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <SignOut size={22} weight="fill" />
              </div>
              <div>
                <p className="font-bold text-[var(--text-primary)]">Chiqishni tasdiqlang</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">GEOBEK hisobingizdan chiqishni xohlaysizmi?</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 h-10 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--background)] transition-all cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 h-10 rounded-xl bg-red-500 text-xs font-semibold text-white hover:bg-red-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <SignOut size={15} weight="bold" />
                <span>Chiqish</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
