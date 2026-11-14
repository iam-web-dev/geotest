import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase clientni faqat o'zgaruvchilar mavjud bo'lganda yaratamiz
// Aks holda app crash bo'lishining oldini olamiz
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!supabase) {
  console.warn(
    'Supabase konfiguratsiyasi topilmadi. .env faylida VITE_SUPABASE_URL va VITE_SUPABASE_ANON_KEY o\'rnating.'
  );
}

export default supabase;
