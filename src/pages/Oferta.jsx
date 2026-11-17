import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Shield, ShieldCheck, Printer,
  Sun, Moon, Check, LockKey, BookOpen,
  WarningCircle, FileText, ShareNetwork, EnvelopeSimple,
  PaperPlaneTilt, Buildings, IdentificationBadge
} from '@phosphor-icons/react';
import SEO from '../components/SEO';
import Logo from '../components/Logo';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const SECTIONS = [
  { id: 'section-1', num: '1', title: 'Umumiy qoidalar va shartnoma predmeti' },
  { id: 'section-2', num: '2', title: 'Atamalar va taʼriflar' },
  { id: 'section-3', num: '3', title: 'Roʻyxatdan oʻtish, akkaunt va xavfsizlik' },
  { id: 'section-4', num: '4', title: 'Taʼlim xizmatlari va platforma imkoniyatlari' },
  { id: 'section-5', num: '5', title: 'Shaxsiy maʼlumotlar himoyasi va maxfiylik' },
  { id: 'section-6', num: '6', title: 'Intellektual mulk va mualliflik huquqlari' },
  { id: 'section-7', num: '7', title: 'Foydalanuvchining huquq va majburiyatlari' },
  { id: 'section-8', num: '8', title: 'Platforma maʼmuriyatining huquq va majburiyatlari' },
  { id: 'section-9', num: '9', title: 'Javobgarlikning cheklanishi va fors-major' },
  { id: 'section-10', num: '10', title: 'Ofertani oʻzgartirish, bekor qilish va bogʻlanish' },
];

export default function Oferta() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[var(--primary-soft)] selection:text-[var(--primary)]">
      <SEO
        title="Foydalanuvchi Ommaviy Ofertasi — GEOBEK"
        description="GEOBEK taʼlim platformasining rasmiy foydalanuvchi ommaviy ofertasi, foydalanish shartlari va maxfiylik qoidalari."
        url="/oferta"
      />

      {/* ──────────────── Top Navigation Bar (Full Width) ──────────────── */}
      <header className="sticky top-0 z-40 bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)] print:hidden transition-colors">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          
          {/* Left: Back button & Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--border)] text-xs sm:text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all group"
              title="Oldingi sahifaga qaytish"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Orqaga</span>
            </button>

            <div className="h-5 w-px bg-[var(--border)] hidden sm:block" />

            <Link to="/" className="flex items-center gap-2 group">
              <Logo className="w-7 h-7 shrink-0 transition-transform group-hover:scale-105" />
              <span className="text-base font-black tracking-tight text-[var(--text-primary)] hidden sm:inline">
                GEO<span className="text-[var(--primary)]">BEK</span>
              </span>
            </Link>
          </div>

          {/* Center badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] text-xs font-bold border border-[var(--primary)]/20">
            <ShieldCheck size={15} weight="fill" />
            <span>Rasmiy Ommaviy Oferta</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--background)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              title="Hujjatni chop etish"
            >
              <Printer size={15} weight="bold" />
              <span>Chop etish</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--background)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              title="Havolani nusxalash"
            >
              {copied ? <Check size={15} className="text-emerald-500" weight="bold" /> : <ShareNetwork size={15} weight="bold" />}
              <span className="hidden sm:inline">{copied ? 'Nusxalandi' : 'Ulashish'}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Mavzuni almashtirish"
            >
              {darkMode ? <Sun size={17} weight="bold" className="text-amber-400" /> : <Moon size={17} weight="bold" />}
            </button>

            <Link
              to={user ? "/profile" : "/auth"}
              className="px-3.5 py-1.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-xs"
            >
              {user ? "Profilga oʻtish" : "Kirish"}
            </Link>
          </div>

        </div>
      </header>

      {/* ──────────────── Main Document Container (Full Screen Responsive) ──────────────── */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Document Header Hero */}
        <section className="space-y-4 border-b border-[var(--border)] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck size={15} weight="fill" />
            <span>YURIDIK HUJJAT • OMMAVIY SHARTNOMA</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Foydalanuvchi Ommaviy Ofertasi
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              GEOBEK taʼlim platformasidan foydalanish, test sinovlari, darslik taqdimotlari va interaktiv xizmatlardan foydalanish tartibi toʻgʻrisida rasmiy ommaviy kelishuv.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-xs text-[var(--text-secondary)] pt-2">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[var(--text-primary)]">Oxirgi yangilanish:</span>
              <span className="font-mono">01.01.2025</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[var(--text-primary)]">Versiya:</span>
              <span className="font-mono font-bold text-[var(--primary)]">1.2 (Amalda)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[var(--text-primary)]">Yurisdiksiya:</span>
              <span>Oʻzbekiston Respublikasi</span>
            </div>
          </div>
        </section>

        {/* Quick Interactive Table of Contents (Mundarija) */}
        <nav aria-label="Mundarija" className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
            <FileText size={16} className="text-[var(--primary)]" weight="bold" />
            <span>Mundarija (Tezkor oʻtish)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className="flex items-center gap-2 text-left py-1 px-2 rounded-lg hover:bg-[var(--background)] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                <span className="w-5 h-5 rounded-md bg-[var(--primary-soft)] text-[var(--primary)] font-bold flex items-center justify-center shrink-0 text-[10px]">
                  {sec.num}
                </span>
                <span className="truncate">{sec.title}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* ──────────────── Document Clauses / Sections ──────────────── */}
        <article className="space-y-6 text-sm text-[var(--text-secondary)] leading-relaxed">
          
          {/* 1. Umumiy qoidalar */}
          <section id="section-1" className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">1</span>
              <span>Umumiy qoidalar va shartnoma predmeti</span>
            </h2>
            <p>
              1.1. Ushbu Foydalanuvchi Ommaviy Ofertasi (keyingi oʻrinlarda «Oferta») Oʻzbekiston Respublikasi Fuqarolik Kodeksining 367 va 369-moddalariga muvofiq, «GEOBEK» raqamli taʼlim platformasi (keyingi oʻrinlarda «Platforma») maʼmuriyati tomonidan foydalanuvchilarga yoʻllangan rasmiy ommaviy taklif hisoblanadi.
            </p>
            <p>
              1.2. Mazkur Oferta shartlarini toʻliq va soʻzsiz qabul qilish (aksept) foydalanuvchining Platformada roʻyxatdan oʻtishi, hisob yaratishi yoki Platforma xizmatlaridan amalda foydalanishni boshlashi bilan tasdiqlanadi.
            </p>
            <p>
              1.3. Agar foydalanuvchi ushbu Ofertaning biron-bir bandiga rozi boʻlmasa, u Platformadan foydalanishni darhol toʻxtatishi va oʻz akkauntini tark etishi lozim.
            </p>
          </section>

          {/* 2. Atamalar va ta'riflar */}
          <section id="section-2" className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">2</span>
              <span>Atamalar va taʼriflar</span>
            </h2>
            <ul className="space-y-2 list-none">
              <li>
                <strong className="text-[var(--text-primary)]">«GEOBEK Platformasi»</strong> — Oʻzbekiston va jahon geografiyasini oʻrganishga moʻljallangan veb-sayt (geobek.uz), interaktiv taʼlim dasturlari, 3D xaritalar, test bazalari va raqamli kutubxonadan iborat axborot tizimi.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">«Foydalanuvchi»</strong> — Platformada roʻyxatdan oʻtgan va oʻz taʼlim darajasini (maktab oʻquvchisi, abituriyent, talaba yoki oʻqituvchi) tanlagan jismoniy shaxs.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">«Taʼlim darajasi»</strong> — Foydalanuvchining maktab (sinfi), abituriyentlik yoʻnalishi, oliy taʼlim (kursi) yoki pedagogik faoliyatiga mos ravishda Platformadagi shaxsiylashtirilgan maqomi.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">«Akkaunt (Profil)»</strong> — Foydalanuvchining login va paroli bilan himoyalangan, uning shaxsiy oʻquv yutuqlari, ballari, sertifikatlari va reytingini aks ettiruvchi shaxsiy kabineti.
              </li>
            </ul>
          </section>

          {/* 3. Ro'yxatdan o'tish */}
          <section id="section-3" className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">3</span>
              <span>Roʻyxatdan oʻtish, akkaunt va xavfsizlik</span>
            </h2>
            <p>
              3.1. Roʻyxatdan oʻtish chogʻida foydalanuvchi oʻzining toʻgʻri va haqqoniy maʼlumotlarini (ism-sharifi, telefon raqami, foydalanuvchi nomi va taʼlim darajasi) kiritishi shart.
            </p>
            <p>
              3.2. Foydalanuvchi oʻz parolini uchinchi shaxslarga bermaslik majburiyatini oladi. Akkaunt orqali amalga oshirilgan har qanday harakatlar bevosita ushbu foydalanuvchi tomonidan amalga oshirilgan deb eʼtirof etiladi.
            </p>
            <p>
              3.3. Foydalanuvchi akkauntiga ruxsatsiz kirish aniqlangan taqdirda, darhol Platforma maʼmuriyatiga xabar berishi shart.
            </p>
          </section>

          {/* 4. Xizmatlar */}
          <section id="section-4" className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">4</span>
              <span>Taʼlim xizmatlari va platforma imkoniyatlari</span>
            </h2>
            <p>
              4.1. Platforma foydalanuvchilarga quyidagi imkoniyatlarni taqdim etadi:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--background)]">
                <p className="font-bold text-[var(--text-primary)] text-xs">🎓 Maktab taʼlimi taqdimotlari</p>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">7–11-sinf darsliklarining barcha rasmiy mavzulari boʻyicha tayyor koʻrgazmali PPTX taqdimotlar.</p>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--background)]">
                <p className="font-bold text-[var(--text-primary)] text-xs">📝 Rasmiy testlar va baholash</p>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">DTM, Milliy sertifikat, Attestatsiya va olimpiada darajasidagi standartlashtirilgan testlar.</p>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--background)]">
                <p className="font-bold text-[var(--text-primary)] text-xs">🌍 Interaktiv xaritalar va oʻyinlar</p>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">3D Yer globusi, daryolar, togʻ tizmalari, poytaxtlar va Oʻzbekiston viloyatlari xaritasi.</p>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--background)]">
                <p className="font-bold text-[var(--text-primary)] text-xs">📚 Raqamli kutubxona</p>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Darsliklar, ilmiy maqolalar, geografik lugʻatlar va metodik qoʻllanmalar.</p>
              </div>
            </div>
          </section>

          {/* 5. Shaxsiy ma'lumotlar va maxfiylik */}
          <section id="section-5" className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">5</span>
              <span>Shaxsiy maʼlumotlar himoyasi va maxfiylik siyosati</span>
            </h2>
            <p>
              5.1. Platforma foydalanuvchilarning shaxsiy maʼlumotlarini Oʻzbekiston Respublikasining 2019-yil 2-iyuldagi «Shaxsiy maʼlumotlar toʻgʻrisida»gi OʻRQ-547-son Qonuniga muvofiq toʻplaydi, qayta ishlaydi va saqlaydi.
            </p>
            <p>
              5.2. Toʻplangan shaxsiy maʼlumotlar (ism, telefon raqami, hudud, taʼlim darajasi) faqatgina taʼlim jarayonini tashkil etish, test natijalari tahlili, sertifikatlarni shakllantirish va xizmat sifatini oshirish maqsadlarida foydalaniladi.
            </p>
            <p>
              5.3. Platforma foydalanuvchining shaxsiy maʼlumotlarini uning roziligisiz yoki qonunchilikda koʻzda tutilgan holatlardan tashqari uchinchi shaxslarga oshkor etmaydi.
            </p>
          </section>

          {/* 6. Intellektual mulk */}
          <section id="section-6" className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">6</span>
              <span>Intellektual mulk va mualliflik huquqlari</span>
            </h2>
            <p>
              6.1. Platformada eʼlon qilingan barcha metodik materiallar, darslik taqdimotlari (PPTX), test topshiriqlari, dasturiy kodlar, dizayn elementlari va 3D modellar GEOBEK loyihasi mualliflik huquqi bilan himoyalangan.
            </p>
            <p>
              6.2. Foydalanuvchiga taqdim etilgan materiallardan faqatgina shaxsiy taʼlim va oʻquv mashgʻulotlarida foydalanishga ruxsat etiladi.
            </p>
            <p>
              6.3. Materiallarni platforma maʼmuriyatining yozma ruxsatisiz tijorat maqsadida tarqatish, qayta sotish, boshqa resurslarda mualliflik belgilarini olib tashlagan holda joylashtirish qatʼiyan man etiladi.
            </p>
          </section>

          {/* 7. Foydalanuvchining huquq va majburiyatlari */}
          <section id="section-7" className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">7</span>
              <span>Foydalanuvchining huquq va majburiyatlari</span>
            </h2>
            <div className="space-y-2">
              <p><strong className="text-[var(--text-primary)]">Foydalanuvchi quyidagi huquqlarga ega:</strong></p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Platformaning oʻz taʼlim darajasiga mos barcha bepul va ochiq xizmatlaridan foydalanish;</li>
                <li>Oʻzining test natijalari, reytingi va sertifikatlari haqidagi maʼlumotlarni koʻrish;</li>
                <li>Profil maʼlumotlarini yangilash, tuzatish yoki akkauntni oʻchirishni soʻrash;</li>
                <li>Texnik nosozliklar yuzasidan qoʻllab-quvvatlash xizmatiga murojaat qilish.</li>
              </ul>

              <p className="pt-2"><strong className="text-[var(--text-primary)]">Foydalanuvchi quyidagi majburiyatlarni oladi:</strong></p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Platforma xavfsizligiga tahdid soluvchi (DDOS, skriptlar orqali avtomatlashtirish, test savollarini noqonuniy koʻchirib olish) harakatlarni amalga oshirmaslik;</li>
                <li>Oʻzgalar nomidan yolgʻon akkaunt ochmaslik;</li>
                <li>Odob-axloq va muomala madaniyati talablariga rioya qilish.</li>
              </ul>
            </div>
          </section>

          {/* 8. Platforma huquqlari */}
          <section id="section-8" className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">8</span>
              <span>Platforma maʼmuriyatining huquq va majburiyatlari</span>
            </h2>
            <p>
              8.1. Platforma xizmatlarning uzluksiz va sifatli ishlashini taʼminlash choralarini koʻradi.
            </p>
            <p>
              8.2. Platforma ushbu Oferta talablarini buzgan, qalloblik qilgan yoki tizimga ziyon yetkazgan foydalanuvchilarning hisoblarini oldindan ogohlantirmasdan cheklash yoki bloklash huquqiga ega.
            </p>
            <p>
              8.3. Profilaktika va texnik yangilanish ishlarini olib borish vaqtida platforma ishlashida qisqa muddatli uzilishlar yuzaga kelishi mumkin.
            </p>
          </section>

          {/* 9. Javobgarlik va fors-major */}
          <section id="section-9" className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">9</span>
              <span>Javobgarlikning cheklanishi va fors-major</span>
            </h2>
            <p>
              9.1. Platforma taqdim etilayotgan taʼlim materiallarining ilmiy va amaliy jihatdan toʻgʻriligi uchun masʼuldir. Biroq platformadagi test natijalari rasmiy davlat imtihonlari (masalan, DTM yakuniy ballari) uchun toʻgʻridan-toʻgʻri qonuniy kafolat hisoblanmaydi.
            </p>
            <p>
              9.2. Foydalanuvchi tomonidagi internet aloqasining sifatsizligi, texnik qurilmaning nosozligi yoki uchinchi shaxslarning harakatlari tufayli yetkazilgan zararlar uchun Platforma javobgar boʻlmaydi.
            </p>
            <p>
              9.3. Fors-major (favqulodda vaziyatlar, tabiiy ofatlar, davlat organlarining cheklovchi hujjatlari) sharoitida tomonlar majburiyatlarni bajarmaganlik uchun javobgarlikdan ozod etiladi.
            </p>
          </section>

          {/* 10. Ofertani o'zgartirish va bog'lanish */}
          <section id="section-10" className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">10</span>
              <span>Ofertani oʻzgartirish, bekor qilish va bogʻlanish</span>
            </h2>
            <p>
              10.1. Platforma maʼmuriyati ushbu Ofertaga istalgan vaqtda bir tomonlama tartibda oʻzgartirish va qoʻshimchalar kiritish huquqini saqlab qoladi. Yangilangan matn platformada eʼlon qilingan paytdan boshlab kuchga kiradi.
            </p>
            <p>
              10.2. Savollar, takliflar yoki eʼtirozlar yuzasidan quyidagi rasmiy aloqa kanallari orqali bogʻlanishingiz mumkin:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href="mailto:support@geobek.uz"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <EnvelopeSimple size={20} weight="bold" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-tertiary)]">Elektron pochta</p>
                  <p className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)]">support@geobek.uz</p>
                </div>
              </a>

              <a
                href="https://t.me/geobek_admin"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[#229ED9] transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#229ED9]/10 text-[#229ED9] flex items-center justify-center shrink-0">
                  <PaperPlaneTilt size={20} weight="bold" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-tertiary)]">Telegram aloqa</p>
                  <p className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[#229ED9]">@geobek_admin</p>
                </div>
              </a>
            </div>
          </section>

        </article>

        {/* ──────────────── Bottom Action & Confirmation Bar ──────────────── */}
        <section className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm space-y-4 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Ofertani qabul qilish toʻgʻrisida
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xl">
                GEOBEK platformasida roʻyxatdan oʻtish yoki test sinovlaridan foydalanish orqali siz yuqorida keltirilgan barcha shartlarga toʻliq rozilik bildirasiz.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => navigate(-1)}
                className="h-11 px-5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Check size={16} weight="bold" />
                <span>Tushunarli, qabul qilaman</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* ──────────────── Footer ──────────────── */}
      <footer className="w-full border-t border-[var(--border)] bg-[var(--surface)] py-6 text-center text-xs text-[var(--text-tertiary)] print:hidden mt-auto">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} GEOBEK.uz — Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4 text-xs font-medium text-[var(--text-secondary)]">
            <Link to="/" className="hover:text-[var(--primary)] transition-colors">Bosh sahifa</Link>
            <Link to="/creator" className="hover:text-[var(--primary)] transition-colors">Muallif haqida</Link>
            <Link to="/tests" className="hover:text-[var(--primary)] transition-colors">Testlar</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
