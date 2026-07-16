import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaretLeft, Check, GraduationCap, Student, ChalkboardTeacher, Buildings } from '@phosphor-icons/react';
import { cn } from '../lib/utils';
import { user as initialUser } from '../data/mockData';

const STORAGE_KEY = 'geo_user_settings';

function loadSettings() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveSettings(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

const REGIONS = [
  'Toshkent shahri', 'Toshkent viloyati', 'Andijon', 'Farg\'ona', 'Namangan',
  'Samarqand', 'Buxoro', 'Navoiy', 'Qashqadaryo', 'Surxondaryo',
  'Jizzax', 'Sirdaryo', 'Xorazm', 'Qoraqalpog\'iston',
];

const ROLES = [
  {
    key: 'school_student',
    label: 'Maktab o\'quvchisi',
    desc: '1–11 sinf',
    Icon: GraduationCap,
    color: '#2563EB',
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
    label: 'O\'qituvchi',
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
  const saved = loadSettings();
  const merged = { ...initialUser, ...saved };

  const [form, setForm] = useState({
    name:       merged.name       || '',
    school:     merged.school     || '',
    region:     merged.region     || '',
    role:       merged.role       || 'school_student',
    grade:      merged.grade      || '',
    course:     merged.course     || '',
    experience: merged.experience || '',
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = () => {
    saveSettings(form);
    navigate('/profile');
  };

  const roleColor = ROLES.find(r => r.key === form.role)?.color || '#2563EB';

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
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg"
          style={{ background: `linear-gradient(135deg, ${roleColor} 0%, ${roleColor}99 100%)` }}>
          {form.name.charAt(0) || '?'}
        </div>
        <div className="text-center">
          <p className="font-semibold text-[var(--text-primary)]">{form.name || 'Ism kiritilmagan'}</p>
          <p className="text-xs text-[var(--text-secondary)]">{form.school || 'Maktab kiritilmagan'}</p>
        </div>
      </div>

      {/* Role selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">Kim siz?</label>
        <div className="grid grid-cols-3 gap-2">
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
                <p className={cn('text-[10px] font-bold leading-tight', form.role === key ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]')}>
                  {label}
                </p>
                <p className="text-[9px] text-[var(--text-tertiary)]">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Basic fields */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-4">
        <Field label="Ism Familiya">
          <Input value={form.name} onChange={v => set('name', v)} placeholder="To'liq ismingiz" />
        </Field>

        <Field label="Ta'lim muassasasi">
          <Input value={form.school} onChange={v => set('school', v)}
            placeholder={form.role === 'teacher' ? 'Maktab yoki muassasa nomi' : 'Maktab / Universitet nomi'} />
        </Field>

        <Field label="Viloyat / Shahar">
          <Select value={form.region} onChange={v => set('region', v)}
            options={REGIONS} placeholder="Tanlang..." />
        </Field>
      </div>

      {/* Role-specific fields */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-4">
        {form.role === 'school_student' && (
          <Field label="Sinf">
            <Select
              value={form.grade}
              onChange={v => set('grade', v)}
              placeholder="Sinfni tanlang"
              options={Array.from({ length: 11 }, (_, i) => ({ value: i + 1, label: `${i + 1}-sinf` }))}
            />
          </Field>
        )}

        {form.role === 'student' && (
          <Field label="Kurs">
            <Select
              value={form.course}
              onChange={v => set('course', v)}
              placeholder="Kursni tanlang"
              options={[1, 2, 3, 4].map(n => ({ value: n, label: `${n}-kurs` }))}
            />
          </Field>
        )}

        {form.role === 'teacher' && (
          <Field label="Pedagogik tajriba">
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
        )}
      </div>

      {/* Save button */}
      <button onClick={handleSave}
        className="w-full h-12 rounded-2xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2"
        style={{ background: `linear-gradient(135deg, ${roleColor} 0%, ${roleColor}bb 100%)` }}>
        <Check size={16} weight="bold" /> Saqlash
      </button>
    </div>
  );
}
