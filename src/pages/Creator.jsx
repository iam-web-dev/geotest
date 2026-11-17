import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, TelegramLogo, YoutubeLogo, EnvelopeSimple,
  MapPin, Sparkle, Copy, Check, Camera, BookOpen,
  GraduationCap, Play, PhoneCall, Compass, ChalkboardTeacher
} from '@phosphor-icons/react';
import SEO from '../components/SEO';

const LIFE_CHAPTERS = [
  {
    period: "Ilk qadamlar va tabiatga muhabbat",
    title: "Xaritalar siri va geografiyaga oshnolik",
    content: `Bolaligimdan tabiatning har bir hodisasiga, togʻlar bagʻrida oqadigan jilgʻalardan tortib, bahorda qirlarni qoplagan lolalargacha qiziqish bilan qarardim. Qoʻlimga tushgan birinchi geografik atlas esa dunyomni butunlay oʻzgartirib yuborgan. 

Oʻshanda xarita shunchaki rang-barang chizmalar emas, balki butun boshli insoniyat tarixi, zaminning tirik nafasini ifodalovchi moʻjiza ekanini his qilganman. Geografiya men uchun bir umrlik kasb emas, hayotimning mazmuniga, Vatanimni yanada chuqurroq anglash vositasiga aylandi.`
  },
  {
    period: "Ustozlik va maktabdagi yillar",
    title: "Sinfxona, oʻquvchilar nigohi va metodika izlanishlari",
    content: `Koʻp yillar davomida maktab oʻquvchilariga geografiya fanidan saboq berib kelmoqdaman. Sinfxonaga kirganimda doskaga oddiy maʼruza yozib berish men uchun hech qachon yetarli boʻlmagan. Oʻquvchining koʻzida qiziqish oʻti yonishi uchun u xaritani his qilishi, Amudaryoning qayerdan boshlanib qayerga quyilishini, Qizilqum sarhadlarini oʻz koʻzi bilan koʻrgandek tasavvur qilishi kerak.

Shu yillar davomida yuzlab iqtidorli oʻquvchilarni tuman, viloyat va respublika fan olimpiadalariga tayyorladim. Ularning har bir muvaffaqiyati, geografiya orqali dunyoqarashining kengayishi men uchun eng katta mukofot boʻldi.`
  },
  {
    period: "GEOBEK gʻoyasi va yaratilishi",
    title: "Nega taʼlimni raqamlashtirishga qaror qildim?",
    content: `Afsuski, uzoq yillar davomida maktablarimizda geografiya oʻqituvchilari uchun zamonaviy, sifatli koʻrgazmali qurollar, yaxshi ishlangan taqdimotlar va rasmiy testlar yetishmay keldi. Koʻplab oʻqituvchilar darsga tayyorlanish uchun soatlab vaqt sarflar, ammo internetdan sifatli material topa olmas edi.

Aynan shu boʻshliqni toʻldirish maqsadida men «GEOBEK» metodik loyihasini yoʻlga qoʻydim. 5-sinfdan 11-sinfgacha boʻlgan barcha darslik mavzularini tahlil qilib, sifatli taqdimotlar (PPTX), dars ishlanmalari va DTM standartidagi savollarni tayyorladim. 

GEOBEK platformasi esa ana shu koʻp yillik mehnatimizni respublikadagi barcha ustozlar va oʻquvchilar uchun bir joyga jamlagan zamonaviy, ochiq va qulay xazinaga aylandi.`
  },
  {
    period: "Hayotiy va pedagogik falsafa",
    title: "«Geografiya — Vatanparvarlikning eng goʻzal ifodasi»",
    content: `Mening pedagogik aqidam juda sodda:
Oʻz yurtining har bir togʻini, daryosini, iqlimini va tabiiy boyligini bilmagan inson oʻz vatanini chin dildan seva olmaydi. Geografiya — bu quruq faktlar yigʻindisi emas, bu tabiatga mehr, resurslarni asrash madaniyati va dunyo bilan munosabatni oʻrganish ilmidir.

Biz yaratayotgan har bir darslik, taqdimot va test savoli yurtimiz yoshlarining tafakkurini kengaytirishga xizmat qilishi kerak. Bugungi oʻquvchi ertangi kunning davlat arbobi, geologi, ekologi yoki muhandisidir. Ularga berayotgan bilimimiz halol, aniq va mehr bilan yetkazilishi shart.`
  }
];

const MEDIA_GALLERY = [
  {
    type: 'image',
    title: 'Dars jarayoni va oʻquvchilar bilan mashgʻulot',
    category: 'Pedagogika',
    description: 'Sinfxonada xaritalar tahlili va yosh geograf olimpiadachilar bilan amaliy dars.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1000&q=80',
  },
  {
    type: 'image',
    title: 'Oʻzbekistonning tabiiy landshaftlari va dala amaliyoti',
    category: 'Ekspeditsiya',
    description: 'Togʻ tizmalari, daryo havzalari va relyef shakllarini joyida oʻrganish jarayoni.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    type: 'image',
    title: 'Darsliklar, atlaslar va metodik qoʻllanmalar',
    category: 'GEOBEK',
    description: '5–11-sinf maktab oʻquv dasturlari uchun tayyorlangan koʻrgazmali taqdimotlar toʻplami.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    type: 'video',
    title: 'GEOBEK 3D Xaritalar va Darsliklar Tahlili',
    category: 'Video Dars',
    description: 'Interaktiv 3D Yer globusi va umumtaʼlim maktab dasturlari integratsiyasi.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-earth-rotating-in-space-41618-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
  }
];

const CONTACTS = [
  {
    name: 'Telegram Kanal',
    handle: '@geobek_uz',
    url: 'https://t.me/iam_web_dev',
    desc: 'Geografiya taqdimotlari, testlar va metodik yangiliklar',
    icon: TelegramLogo,
    color: '#0284C7'
  },
  {
    name: 'YouTube',
    handle: 'GEOBEK Taʼlim',
    url: 'https://youtube.com',
    desc: 'Video darslar, xaritalar sharhi va olimpiada masalalari tahlili',
    icon: YoutubeLogo,
    color: '#DC2626'
  },
  {
    name: 'Aloqa & Savollar',
    handle: 'Qambarov O.X. (Shaxsiy)',
    url: 'https://t.me/iam_web_dev',
    desc: 'Oʻqituvchilar va abituriyentlar uchun metodik yordam',
    icon: TelegramLogo,
    color: '#0D9488'
  },
  {
    name: 'Elektron Pochta',
    handle: 'geobek.uz@gmail.com',
    url: 'mailto:geobek.uz@gmail.com',
    desc: 'Rasmiy takliflar va hamkorlik uchun',
    icon: EnvelopeSimple,
    color: '#4F46E5'
  }
];

export default function Creator() {
  const [playingVideo, setPlayingVideo] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('geobek.uz@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1C1917] selection:bg-amber-100 selection:text-amber-900 font-sans">
      <SEO
        title="Qambarov O.X. – Geografiya ustozi, GEOBEK ilmiy rahbari va muallifi"
        description="Geograf ustoz Qambarov O.X.ning hayot yoʻli, pedagogik tajribasi, geografiya metodikasi va GEOBEK ta'lim portali haqida."
      />

      {/* ── Top Bar: Radically Clean - ONLY Back Button ── */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E7E5E4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#57534E] hover:text-[#0C0A09] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-[#0D9488]" />
            <span>GEOBEK platformasiga qaytish</span>
          </Link>

          <span className="text-xs font-serif font-bold text-[#78716C]">
            Qambarov O.X. | GEOBEK
          </span>
        </div>
      </header>

      {/* ── Main Content Container ── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-20">
        
        {/* ── Hero / Teacher Introduction ── */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F5F4] border border-[#E7E5E4] text-[#0D9488]">
            <GraduationCap size={15} weight="bold" />
            <span>GEOGRAFIYA USTOZI & METODIST</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-[#0C0A09] leading-tight">
              Qambarov O.X.
            </h1>
            <p className="text-lg sm:text-2xl text-[#44403C] leading-relaxed max-w-3xl font-serif italic">
              «Geografiya — bu shunchaki togʻ va daryo nomlarini yodlash emas. Bu oʻz zaminini sevish, uning har bir zarrasini eʼzozlash va dunyo bilan munosabatni tushunish kalitidir.»
            </p>
          </div>

          {/* Teacher Credentials Strip */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#57534E]">
            <div className="flex items-center gap-2">
              <ChalkboardTeacher size={18} className="text-[#0D9488]" weight="bold" />
              <span className="font-semibold text-[#1C1917]">Geografiya fani ustozi</span>
              <span>•</span>
              <span>Oliy toifali pedagog</span>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-[#B45309]" weight="bold" />
              <span className="font-semibold text-[#1C1917]">GEOBEK asoschisi</span>
              <span>•</span>
              <span>5–11-sinf taqdimotlar muallifi</span>
            </div>
          </div>
        </section>

        {/* ── Life Story (Ustozning hayot yoʻli va kechinmalari) ── */}
        <section className="space-y-10">
          <div className="border-b border-[#E7E5E4] pb-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0D9488]">
              PEDAGOGIK FAOLIYAT VA HIKOYALAR
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#0C0A09] mt-1">
              Ustozlik yoʻli va hayotiy saboqlar
            </h2>
            <p className="text-sm text-[#78716C] mt-1">
              Maktab sinfxonalaridan tortib zamonaviy raqamli taʼlim platformasigacha boʻlgan yoʻl.
            </p>
          </div>

          <div className="space-y-12">
            {LIFE_CHAPTERS.map((chapter, idx) => (
              <article key={idx} className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                  {chapter.period}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#1C1917]">
                  {chapter.title}
                </h3>
                <div className="text-base sm:text-lg text-[#292524] font-serif leading-relaxed whitespace-pre-line pt-1">
                  {chapter.content}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Photo & Video Gallery (Ustozlik lahzalari va ta'lim) ── */}
        <section className="space-y-8">
          <div className="border-b border-[#E7E5E4] pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0D9488]">
              <Camera size={15} />
              <span>KOʻRGAZMALI QUROLLAR VA LAVHALAR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0C0A09] mt-1">
              Foto va videolavhalar
            </h2>
            <p className="text-sm text-[#78716C] mt-1">
              Dars jarayonlari, GEOBEK taqdimotlari va Oʻzbekistonning betakror tabiati.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MEDIA_GALLERY.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-[#E7E5E4] bg-white overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all"
              >
                {/* Media Container */}
                <div className="relative aspect-[16/10] bg-[#F5F5F4] overflow-hidden">
                  {item.type === 'video' ? (
                    <div className="relative w-full h-full">
                      {playingVideo ? (
                        <video
                          src={item.videoSrc}
                          autoPlay
                          controls
                          loop
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <button
                            onClick={() => setPlayingVideo(true)}
                            className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#0D9488] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                            title="Videoni tomosha qilish"
                          >
                            <Play size={20} weight="fill" className="ml-0.5" />
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#1C1917] border border-[#E7E5E4]">
                    {item.category}
                  </span>
                </div>

                {/* Media Info */}
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <h4 className="font-bold text-base font-serif text-[#1C1917]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contacts & Mentorship (Ustoz bilan bogʻlanish) ── */}
        <section className="space-y-6 pt-6 border-t border-[#E7E5E4]">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0C0A09]">
              Ustoz bilan bogʻlanish va metodik muloqot
            </h2>
            <p className="text-sm text-[#57534E] max-w-2xl leading-relaxed">
              Agar siz geografiya oʻqituvchisi, abituriyent yoki fan qiziquvchisi boʻlsangiz — darsliklar, 
              olimpiada testlari yoki dars taqdimotlari boʻyicha bemalol murojaat qilishingiz mumkin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3.5 p-4 rounded-xl border border-[#E7E5E4] bg-white hover:border-[#0D9488] hover:shadow-sm transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#F5F5F4] border border-[#E7E5E4]"
                    style={{ color: item.color }}
                  >
                    <Icon size={20} weight="bold" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-sm font-bold text-[#1C1917] group-hover:text-[#0D9488] transition-colors">
                      {item.name}
                    </p>
                    <p className="text-xs font-semibold text-[#0D9488]">
                      {item.handle}
                    </p>
                    <p className="text-[11px] text-[#78716C] leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Quick Email Copy Card */}
          <div className="p-4 rounded-xl border border-[#E7E5E4] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#57534E]">
            <span className="font-medium">Rasmiy xatlar va takliflar uchun pochta:</span>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F5F5F4] border border-[#D6D3D1] text-[#1C1917] font-semibold hover:bg-[#E7E5E4] transition-colors"
            >
              {copiedEmail ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copiedEmail ? "Nusxalandi!" : "geobek.uz@gmail.com nusxalash"}</span>
            </button>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="pt-8 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div className="flex items-center gap-1.5 font-medium">
            <span>© {new Date().getFullYear()} Qambarov O.X. | GEOBEK.</span>
            <span>Barcha huquqlar himoyalangan.</span>
          </div>

          <Link
            to="/"
            className="font-bold text-[#0D9488] hover:underline transition-colors"
          >
            ← Bosh sahifaga qaytish
          </Link>
        </footer>

      </main>
    </div>
  );
}
