import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase clientni faqat oʻzgaruvchilar mavjud boʻlgʻanda yaratamiz
// Aks holda app crash boʻlishining oldini olamiz
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!supabase) {
  console.warn(
    'Supabase konfiguratsiyasi topilmadi. .env faylida VITE_SUPABASE_URL va VITE_SUPABASE_ANON_KEY oʻrnating.'
  );
}

export default supabase;
