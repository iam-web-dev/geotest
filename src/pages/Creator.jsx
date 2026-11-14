import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal, Globe, Cpu, ArrowLeft, Copy, Check,
  GithubLogo, TelegramLogo, EnvelopeSimple, Lightning,
  Code, BookOpen, Compass, CaretRight, Sparkle
} from '@phosphor-icons/react';
import SEO from '../components/SEO';

const THEMES = {
  tokyo: {
    id: 'tokyo',
    name: 'Omarchy Tokyo',
    bg: '#0B0F19',
    surface: '#111726',
    surfaceAlt: '#172033',
    border: '#1F2B45',
    borderStrong: '#2E3F66',
    textPrimary: '#E2E8F0',
    textMuted: '#7E90B0',
    accent: '#2DD4BF',
    accentSoft: 'rgba(45, 212, 191, 0.12)',
    accentAlt: '#A78BFA',
    tag: '#38BDF8',
  },
  nord: {
    id: 'nord',
    name: 'Nord Frost',
    bg: '#242933',
    surface: '#2E3440',
    surfaceAlt: '#3B4252',
    border: '#434C5E',
    borderStrong: '#4C566A',
    textPrimary: '#ECEFF4',
    textMuted: '#96A5BD',
    accent: '#88C0D0',
    accentSoft: 'rgba(136, 192, 208, 0.12)',
    accentAlt: '#81A1C1',
    tag: '#8FBCBB',
  },
  gruvbox: {
    id: 'gruvbox',
    name: 'Gruvbox Retro',
    bg: '#1D2021',
    surface: '#282828',
    surfaceAlt: '#32302F',
    border: '#3C3836',
    borderStrong: '#504945',
    textPrimary: '#EBDBB2',
    textMuted: '#A89984',
    accent: '#FABD2F',
    accentSoft: 'rgba(250, 189, 47, 0.12)',
    accentAlt: '#8EC07C',
    tag: '#FE8019',
  },
  dhh_paper: {
    id: 'dhh_paper',
    name: 'DHH Paper',
    bg: '#FAF8F5',
    surface: '#FFFFFF',
    surfaceAlt: '#F2EFEB',
    border: '#E5E0D8',
    borderStrong: '#D1CAC0',
    textPrimary: '#1C1917',
    textMuted: '#66615C',
    accent: '#DC2626',
    accentSoft: 'rgba(220, 38, 38, 0.08)',
    accentAlt: '#2563EB',
    tag: '#059669',
  },
};

const ESSAYS = [
  {
    id: 'origin',
    num: '01',
    date: '2024 / QAYD',
    title: 'Nega GeoBek yaratildi? Qoniqarsizlikdan tugʻilgan loyiha',
    summary: "O'zbekistonda geografiya darsliklari va testlarini qidirganda har qadamda duch kelinadigan tartibsizlik, 15 soniyada ochiladigan PDF saytlar va unga berilgan muhandislik javobi.",
    readingTime: '4 daqiqa',
    content: `
Oʻzbekistonda maktab geografiyasi yoki DTM testlarini internetdan qidirib koʻrganmisiz?

Bir necha yil oldin men ham shu savol bilan toʻqnashdim. Duch kelgan manzara esa tushkun edi:
2012-yillarda yasalgan, har bir burchagidan behayo reklamalar, kazino bannerlari miltillab turgan, ochilishi uchun 10-15 soniya ketadigan va mobil telefonda umuman oʻqib boʻlmaydigan eskirgan sahifalar. Oʻquvchi yoki oʻqituvchi bitta xaritani yoki test savolini koʻrish uchun 4 marta reklama yopishi, PDF faylni telefoniga yuklab olib, ming xil qiyinchilik bilan kattalashtirishi kerak edi.

Bu oddiy muammo emas edi — bu foydalanuvchiga, ayniqsa taʼlim olayotgan yoshlarga boʻlgan bepisandlik edi.

Men buni qabul qila olmadim. Agar biz oʻzbek yoshlaridan dunyoqarashi keng, geografiya va global jarayonlarni chuqur tushunadigan mutaxassis boʻlishini kutayotgan boʻlsak, ularga berayotgan vositamiz ham jahon darajasida, chaqmoqdek tez va hurmat bilan qilingan boʻlishi shart.

GeoBek ana shu gʻazab va orzudan tugʻildi. Men uni qandaydir tijoriy startap yoki grant olish uchun emas, balki "Oʻzbekistonda ham xalqaro sifatdagi, hech qanday ortiqcha yuksiz, toza taʼlim vositasi boʻlishi mumkinligini isbotlash" uchun noldan kodlab chiqdim.
    `
  },
  {
    id: 'no-ads',
    num: '02',
    date: '2025 / FALSAFA',
    title: 'Reklamasiz taʼlim axloqi: Eʼtibor sotiladigan tovar emas',
    summary: 'Nima uchun GeoBek platformasida hech qachon Google AdSense, chalgʻituvchi bannerlar yoki yashirin kuzatuvchi skriptlar boʻlmaydi.',
    readingTime: '3 daqiqa',
    content: `
DHH (David Heinemeier Hansson) va 37signals falsafasining eng katta saboqlaridan biri shundaki: dasturiy taʼminot sizning qadriyatlaringizni aks ettiradi.

Zamonaviy internetning eng katta illati — foydalanuvchining diqqatini oʻgʻirlash va uni reklama beruvchilarga pullashdir. Ayniqsa taʼlim saytlarida bu mutlaqo qabul qilib boʻlmas hodisa. Tasavvur qiling: 7-sinf oʻquvchisi Oʻzbekistonning daryolari va tabiiy boyliklarini oʻrganayotgan paytda, ekranning yarmida qimor yoki elektron sigaret reklamasi chiqib turadi. Bu shunchaki yomon dizayn emas, bu axloqiy buzilishdir.

GeoBekʼda biz qatʼiy qoidani oʻrnatdik:
1. Hech qanday uchinchi tomon reklamalari boʻlmaydi.
2. Hech qanday tajovuzkor tracking (kuzatuv) skriptlari va foydalanuvchi maʼlumotlarini sotish yoʻq.
3. Saytdagi har bir piksel faqat bitta maqsadga — xaritani, testni yoki kitobni qulay oʻrganishga xizmat qiladi.

Biz taʼlimni tijorat bozoriga emas, balki shaxsiy tafakkur maydoniga aylantirishni maqsad qilganmiz.
    `
  },
  {
    id: 'craftsmanship',
    num: '03',
    date: '2025 / TEXNOLOGIYA',
    title: 'Veb-hunarmandchilik: React 19, Three.js va Linux madaniyati',
    summary: 'Gigabaytlab frameworklar va shishirilgan dependencies davrida soddalik va mahorat nima uchun eng kuchli ustunlik hisoblanadi.',
    readingTime: '5 daqiqa',
    content: `
Bugungi kunda oddiy bitta sahifani ochish uchun 10 megabayt JavaScript yuklaydigan loyihalar koʻpayib ketdi. Dasturchilar muammoni tushunmasdan oʻnlab tayyor kutubxonalarni tiqib tashlashadi.

Men GeoBekʼni qurishda Unix falsafasiga va sof hunarmandchilikka (software craftsmanship) tayandim:

• 3D Globus: Ogʻir tashqi 3D platformalarni ulash oʻrniga, Three.js orqali maxsus shaderlar va atmosfera nurlanishiga ega xususiy Yer modelini yozdik. U har qanday oʻrtacha noutbuk va mobil telefonda 60 FPS bilan silliq aylanadi.
• Chaqmoqdek tez yuklanish: Vite va modulli chunking evaziga sahifalar bir necha millisoniyada ekranga chiziladi.
• D3 va TopoJSON: Oʻzbekistonning 14 ta hududi, viloyatlar chegaralari va daryolar vektor aniqlikda, har bir koordinatasi hisob-kitob qilingan holda render qilinadi.
• Linux va Arch madaniyati: Barcha arxitektura va ish oqimlari erkin operatsion tizimlar va ochiq kodli vositalar orqali sayqallandi.

Dastur yozish — bu konveyer emas, bu zargarlikdir. Har bir qator kod nima uchun mavjudligini bilishingiz kerak.
    `
  },
  {
    id: 'curriculum',
    num: '04',
    date: '2026 / TAʼLIM',
    title: 'Maktab geografiyasini raqamlashtirish: 5-sinfdan 11-sinfgacha',
    summary: 'Darsliklar javondan ekranga qanday koʻchdi va nima uchun milliy geografiya taʼlimi yangi standartga muhtoj edi.',
    readingTime: '4 daqiqa',
    content: `
Geografiya — bu shunchaki poytaxtlar va togʻ nomlarini yodlash emas. Geografiya — bu insoniyatning Yer bilan, iqtisodiyotning tabiat bilan va davlatlarning bir-biri bilan oʻzaro munosabatlarini anglash ilmidir.

Oʻzbekiston maktablaridagi darsliklar — P. Gʻulomov, A. Qayumov, Sh. Mirakmalov kabi ustozlarimizning mashaqqatli mehnati mahsuli. Ammo bu darsliklar uzoq yillar davomida interaktiv vositalardan mahrum boʻlib keldi.

GeoBekʼning Maktab Taʼlimi boʻlimida biz 5-sinf "Tabiatshunoslik"dan boshlab, 11-sinf "Jahonning iqtisodiy va ijtimoiy geografiyasi"gacha boʻlgan butun oʻquv rejasini raqamlashtirdik:
- Har bir mavzu uchun taqdimotlar va konspektlar;
- Oʻzbekiston Respublikasi DTM va Milliy Sertifikat standartidagi testlar bazasi;
- Respublika olimpiada bosqichlari uchun murakkab darajadagi amaliy masalalar.

Bu oʻquvchi uchun mustaqil tayyorlanish imkoniyati, oʻqituvchi uchun esa darsda foydalanish mumkin boʻlgan tayyor interaktiv taʼlim bazasidir.
    `
  }
];

const ARCHITECTURE_SPECS = [
  { label: 'LOYIHA NOMI', value: 'GeoBek (geobek.uz)' },
  { label: 'MUALLIF & ARCHITECT', value: 'Ibrohimjon Mamirov (@iam_web_dev)' },
  { label: 'STACK & RUNTIME', value: 'React 19.2 • Vite 8.1 • TailwindCSS 3.4' },
  { label: '3D WEBGL ENGINE', value: 'Three.js Atmospheric Earth Shader Model' },
  { label: 'KARTOGRAFIYA', value: 'D3-Geo • TopoJSON • SVG Vector Polygons' },
  { label: 'DATABASE & AUTH', value: 'Supabase PostgREST + Offline Storage Fallback' },
  { label: 'DEVELOPMENT OS', value: 'Linux (Arch / Fedora environment)' },
  { label: 'REKLAMA VA TRACKERLAR', value: '0 ta (Zero Ads, Zero invasive telemetry)' },
  { label: 'LITSENZIYA', value: 'Ochiq maʼrifat va milliy taʼlim uchun' },
];

export default function Creator() {
  const [currentThemeKey, setCurrentThemeKey] = useState('tokyo');
  const [activeEssayId, setActiveEssayId] = useState('origin');
  const [copiedContact, setCopiedContact] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  const theme = THEMES[currentThemeKey];
  const activeEssay = ESSAYS.find(e => e.id === activeEssayId) || ESSAYS[0];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('uz-UZ', {
          timeZone: 'Asia/Tashkent',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ibrohimjonmamirov120909@gmail.com');
    setCopiedContact(true);
    setTimeout(() => setCopiedContact(false), 2000);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-200 selection:bg-teal-500/20 selection:text-teal-300 font-sans"
      style={{
        backgroundColor: theme.bg,
        color: theme.textPrimary,
      }}
    >
      <SEO
        title="Muallif & Manifest – Ibrohimjon Mamirov | GeoBek"
        description="GeoBek loyihasi muallifi Ibrohimjon Mamirovning shaxsiy sahifasi, dasturiy manifesti va ta'lim falsafasi."
      />

      {/* Top Terminal Status Bar (Omarchy / Arch / DHH inspired) */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors"
        style={{
          backgroundColor: `${theme.bg}EA`,
          borderColor: theme.border,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4 font-mono text-xs">
          {/* Left Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors group shrink-0"
              style={{
                backgroundColor: theme.surfaceAlt,
                color: theme.textPrimary,
                border: `1px solid ${theme.border}`
              }}
              title="GeoBek platformasiga qaytish"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="font-semibold">geobek.uz</span>
            </Link>
            <span style={{ color: theme.borderStrong }}>/</span>
            <span className="truncate hidden sm:inline" style={{ color: theme.textMuted }}>
              ~/creator/manifesto.md
            </span>
          </div>

          {/* Right Live Status & Theme Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded"
              style={{
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
                color: theme.textMuted
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accent }} />
              <span>TOSHKENT {timeStr || '12:00:00'}</span>
            </div>

            {/* Theme Selector Palette */}
            <div
              className="flex items-center gap-1 p-1 rounded"
              style={{
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`
              }}
              title="Dizayn temasini tanlang"
            >
              {Object.values(THEMES).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentThemeKey(t.id)}
                  className="px-2 py-0.5 rounded text-[11px] transition-all font-mono"
                  style={{
                    backgroundColor: currentThemeKey === t.id ? theme.surfaceAlt : 'transparent',
                    color: currentThemeKey === t.id ? theme.accent : theme.textMuted,
                    fontWeight: currentThemeKey === t.id ? '600' : '400',
                    border: currentThemeKey === t.id ? `1px solid ${theme.borderStrong}` : '1px solid transparent'
                  }}
                >
                  {t.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
        
        {/* Creator Hero Header */}
        <section className="space-y-6">
          <div className="font-mono text-xs flex items-center gap-2" style={{ color: theme.accent }}>
            <Terminal size={15} weight="bold" />
            <span>AUTHOR & SOFTWARE CRAFTSMAN</span>
          </div>

          <div className="space-y-4">
            <h1
              className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif"
              style={{ color: theme.textPrimary }}
            >
              Ibrohimjon Mamirov
            </h1>
            <p
              className="text-base sm:text-xl leading-relaxed max-w-3xl"
              style={{ color: theme.textMuted }}
            >
              GeoBek yaratuvchisi va dasturiy taʼminot muhandisi. Toshkent, Oʻzbekiston.
              Dasturlashni quruq kod yozish emas, balki odamlarning hayotini yaxshilaydigan va
              inson qadr-qimmatini hurmat qiladigan shaxsiy hunarmandchilik deb bilaman.
            </p>
          </div>

          {/* Quick Terminal Bio Line */}
          <div
            className="p-4 rounded-lg font-mono text-xs sm:text-sm border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}
          >
            <div className="flex items-center gap-2 overflow-x-auto">
              <span style={{ color: theme.accent }}>$</span>
              <span style={{ color: theme.textPrimary }}>whoami</span>
              <span style={{ color: theme.textMuted }}>→</span>
              <span style={{ color: theme.textPrimary }}>full-stack engineer, linux ricer, geography enthusiast</span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://github.com/iam-web-dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors hover:opacity-80"
                style={{
                  backgroundColor: theme.surfaceAlt,
                  border: `1px solid ${theme.border}`,
                  color: theme.textPrimary
                }}
              >
                <GithubLogo size={14} />
                <span>github/iam-web-dev</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors hover:opacity-80"
                style={{
                  backgroundColor: theme.surfaceAlt,
                  border: `1px solid ${theme.border}`,
                  color: theme.textPrimary
                }}
              >
                {copiedContact ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                <span>{copiedContact ? "Nusxalandi" : "Email nusxa"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Core Principles / Statement (DHH / 37signals style) */}
        <section
          className="p-6 sm:p-8 rounded-xl border relative overflow-hidden"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.borderStrong,
          }}
        >
          <div className="max-w-3xl space-y-4">
            <div className="font-mono text-xs uppercase tracking-wider" style={{ color: theme.accent }}>
              LOYIHA MAQSADI VA HUJJATI
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-snug" style={{ color: theme.textPrimary }}>
              «Agar Oʻzbekiston yoshlariga geografiyani oʻrgatmoqchi boʻlsak, ularga eng sifatli vositani berishimiz shart.»
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: theme.textMuted }}>
              GeoBek qandaydir tijorat maqsadida yoki reklama orqali daromad qilish uchun qurilmadi. 
              U yurtimizdagi har bir oʻquvchi, talaba va oʻqituvchi dunyo xaritasini, Oʻzbekistonning boy tabiiy geografiyasini 
              zamonaviy, chaqmoqdek tez va chiroyli interfeysda erkin oʻrganishi uchun yaratilgan ochiq maʼrifat platformasidir.
            </p>
          </div>
        </section>

        {/* Section 1: The Essays / Manifestos (DHH Content-first style) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b pb-4" style={{ borderColor: theme.border }}>
            <div>
              <div className="font-mono text-xs" style={{ color: theme.accent }}>
                ESSAYS & FIELD NOTES
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-1" style={{ color: theme.textPrimary }}>
                Muallif qaydlari va manifestolar
              </h2>
            </div>
            <p className="text-xs font-mono" style={{ color: theme.textMuted }}>
              {ESSAYS.length} ta maqola • toʻgʻridan-toʻgʻri muallifdan
            </p>
          </div>

          {/* Essay Tabs Selection */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 font-mono text-xs">
            {ESSAYS.map((essay) => {
              const isActive = essay.id === activeEssayId;
              return (
                <button
                  key={essay.id}
                  onClick={() => setActiveEssayId(essay.id)}
                  className="p-3 text-left rounded border transition-all flex flex-col justify-between gap-2"
                  style={{
                    backgroundColor: isActive ? theme.surfaceAlt : theme.surface,
                    borderColor: isActive ? theme.accent : theme.border,
                    color: isActive ? theme.textPrimary : theme.textMuted,
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold" style={{ color: isActive ? theme.accent : theme.textMuted }}>
                      [{essay.num}]
                    </span>
                    <span className="text-[10px]">{essay.readingTime}</span>
                  </div>
                  <span className="font-semibold line-clamp-2 leading-tight">
                    {essay.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Essay Reader Container (Dedicated DHH reading mode) */}
          <article
            className="p-6 sm:p-10 rounded-xl border space-y-6 transition-colors"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}
          >
            <div className="space-y-2 border-b pb-6" style={{ borderColor: theme.border }}>
              <div className="flex items-center gap-3 font-mono text-xs" style={{ color: theme.textMuted }}>
                <span>{activeEssay.date}</span>
                <span>•</span>
                <span>Oʻqish vaqti: {activeEssay.readingTime}</span>
                <span>•</span>
                <span style={{ color: theme.accent }}>Ibrohimjon Mamirov</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight" style={{ color: theme.textPrimary }}>
                {activeEssay.title}
              </h3>
              <p className="text-sm sm:text-base italic pt-1" style={{ color: theme.textMuted }}>
                {activeEssay.summary}
              </p>
            </div>

            {/* Essay Body Text (High readability typography) */}
            <div
              className="prose max-w-none text-base sm:text-lg leading-relaxed font-serif space-y-5"
              style={{ color: theme.textPrimary }}
            >
              {activeEssay.content
                .trim()
                .split('\n\n')
                .map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
            </div>

            {/* Essay Footer */}
            <div
              className="pt-6 border-t flex flex-wrap items-center justify-between gap-4 font-mono text-xs"
              style={{ borderColor: theme.border, color: theme.textMuted }}
            >
              <div>
                <span>Qayd etilgan manzil: Toshkent, Oʻzbekiston</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Fikringiz bormi?</span>
                <a
                  href="https://t.me/iam_web_dev"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:opacity-80"
                  style={{ color: theme.accent }}
                >
                  Telegram orqali yozing
                </a>
              </div>
            </div>
          </article>
        </section>

        {/* Section 2: Technical Architecture & Specs (Omarchy inspired) */}
        <section className="space-y-6">
          <div className="border-b pb-4" style={{ borderColor: theme.border }}>
            <div className="font-mono text-xs" style={{ color: theme.accent }}>
              SYSTEM ARCHITECTURE & BENCHMARKS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-1" style={{ color: theme.textPrimary }}>
              Tizim arxitekturasi va texnik spetsifikatsiya
            </h2>
            <p className="text-xs sm:text-sm mt-1" style={{ color: theme.textMuted }}>
              GeoBek qanday texnologik poydevor ustiga qurilgan va nima uchun u chaqmoqdek tez ishlaydi.
            </p>
          </div>

          <div
            className="rounded-xl border overflow-hidden font-mono text-xs sm:text-sm"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}
          >
            {/* Terminal Window Header */}
            <div
              className="px-4 py-2.5 border-b flex items-center justify-between"
              style={{
                backgroundColor: theme.surfaceAlt,
                borderColor: theme.border
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 text-xs" style={{ color: theme.textMuted }}>
                  specs.manifest --json
                </span>
              </div>
              <span className="text-[11px]" style={{ color: theme.accent }}>
                STATUS: PRODUCTION READY
              </span>
            </div>

            {/* Specs Table */}
            <div className="divide-y" style={{ borderColor: theme.border }}>
              {ARCHITECTURE_SPECS.map((spec, index) => (
                <div
                  key={index}
                  className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 hover:bg-white/[0.02] transition-colors"
                  style={{ borderColor: theme.border }}
                >
                  <span className="text-[11px] font-semibold tracking-wider shrink-0" style={{ color: theme.textMuted }}>
                    {spec.label}
                  </span>
                  <span className="text-left sm:text-right font-medium" style={{ color: theme.textPrimary }}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Terminal Footer Command */}
            <div
              className="p-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              style={{
                backgroundColor: theme.surfaceAlt,
                borderColor: theme.border,
                color: theme.textMuted
              }}
            >
              <div className="flex items-center gap-2">
                <span style={{ color: theme.accent }}>$</span>
                <span>git clone https://github.com/iam-web-dev/geotest.git</span>
              </div>
              <a
                href="https://github.com/iam-web-dev/geotest"
                target="_blank"
                rel="noreferrer"
                className="underline hover:opacity-80"
                style={{ color: theme.accent }}
              >
                Repozitoriyni koʻrish →
              </a>
            </div>
          </div>
        </section>

        {/* Section 3: Timeline & Milestones */}
        <section className="space-y-6">
          <div className="border-b pb-4" style={{ borderColor: theme.border }}>
            <div className="font-mono text-xs" style={{ color: theme.accent }}>
              CHRONOLOGY & MILESTONES
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-1" style={{ color: theme.textPrimary }}>
              GeoBekʼning rivojlanish bosqichlari
            </h2>
          </div>

          <div className="space-y-4 font-mono text-xs sm:text-sm">
            {[
              {
                period: '2024 YIL — BOSHLANISH',
                title: 'Gʻoya va birinchi arxitektura prototipi',
                desc: 'Oʻzbekistondagi geografiya taʼlimi tahlil qilindi. 14 ta viloyatning vektorli SVG kartalari va DTM testlari bazasi shakllantirildi.'
              },
              {
                period: '2025 YIL — WEBGL & 3D GLOBUS',
                title: 'Interaktiv Yer globusi va oʻyinlar dvigateli',
                desc: 'Three.js orqali brauzerda silliq aylanuvchi 3D globus yaratildi. Poytaxtlar, bayroqlar, daryolar va relyef oʻyinlari ishlab chiqildi.'
              },
              {
                period: '2026 YIL — MAKTAB TAʼLIMI & SUPABASE',
                title: 'Umumtaʼlim maktablari (5-11 sinf) dasturi integratsiyasi',
                desc: 'Milliy oʻquv dasturi toʻliq raqamlashtirildi. Darslik taqdimotlari, konspektlar, Supabase autentifikatsiyasi va avtonom oflayn rejim qoʻshildi.'
              }
            ].map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg border flex flex-col sm:flex-row gap-4 sm:items-start"
                style={{
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                }}
              >
                <div className="sm:w-48 shrink-0 text-xs font-bold" style={{ color: theme.accent }}>
                  {m.period}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm sm:text-base font-serif" style={{ color: theme.textPrimary }}>
                    {m.title}
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Personal Philosophy & Contact (DHH Colophon style) */}
        <section
          className="p-6 sm:p-10 rounded-xl border space-y-6"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.borderStrong,
          }}
        >
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase" style={{ color: theme.accent }}>
              ALOQA VA HAMKORLIK
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif" style={{ color: theme.textPrimary }}>
              Muallif bilan bogʻlanish
            </h2>
            <p className="text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: theme.textMuted }}>
              Agar siz geografiya oʻqituvchisi boʻlsangiz, taʼlim sohasida takliflaringiz boʻlsa, 
              yoki GeoBekʼning kod bazasini takomillashtirishda ishtirok etmoqchi boʻlsangiz — 
              toʻgʻridan-toʻgʻri menga yozing. Har bir fikr va taklif men uchun qadrli.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 font-mono text-xs pt-2">
            <a
              href="https://t.me/iam_web_dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded transition-all hover:opacity-90 font-semibold"
              style={{
                backgroundColor: theme.accent,
                color: theme.bg,
              }}
            >
              <TelegramLogo size={16} weight="bold" />
              <span>Telegram: @iam_web_dev</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded border transition-all hover:opacity-90"
              style={{
                backgroundColor: theme.surfaceAlt,
                borderColor: theme.border,
                color: theme.textPrimary,
              }}
            >
              <EnvelopeSimple size={16} />
              <span>ibrohimjonmamirov120909@gmail.com</span>
              {copiedContact && <span style={{ color: theme.accent }}>(nusxalandi!)</span>}
            </button>

            <a
              href="https://github.com/iam-web-dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded border transition-all hover:opacity-90"
              style={{
                backgroundColor: theme.surfaceAlt,
                borderColor: theme.border,
                color: theme.textPrimary,
              }}
            >
              <GithubLogo size={16} />
              <span>GitHub Profili</span>
            </a>
          </div>
        </section>

        {/* Footer / Colophon */}
        <footer
          className="pt-10 border-t flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs"
          style={{ borderColor: theme.border, color: theme.textMuted }}
        >
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Ibrohimjon Mamirov.</span>
            <span>Oʻzbekistonda mehr bilan yaratildi.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="hover:underline" style={{ color: theme.textPrimary }}>
              ← GeoBek Bosh Sahifasi
            </Link>
            <Link to="/school" className="hover:underline">
              Maktab Taʼlimi
            </Link>
            <Link to="/tests" className="hover:underline">
              Testlar
            </Link>
          </div>
        </footer>

      </main>
    </div>
  );
}
