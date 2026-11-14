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
    title: "Xaritalar siri va geografiyaga oşnolik",
    content: `Bolaligimdan tabiatning har bir hodisasiga, toğlar bağrida oqadigan jilğalardan tortib, bahorda qirlarni qoplagan lolalargaça qiziqiş bilan qarardim. Qölimga tuşgan birinçi geografik atlas esa dunyomni butunlay özgartirib yuborgan. 

Öşanda xarita şunçaki rang-barang çizmalar emas, balki butun boşli insoniyat tarixi, zaminning tirik nafasini ifodalovçi möjiza ekanini his qilganman. Geografiya men uçun bir umrlik kasb emas, hayotimning mazmuniga, Vatanimni yanada çuqurroq anglaş vositasiga aylandi.`
  },
  {
    period: "Ustozlik va maktabdagi yillar",
    title: "Sinfxona, öquvçilar nigohi va metodika izlanişlari",
    content: `Köp yillar davomida maktab öquvçilariga geografiya fanidan saboq berib kelmoqdaman. Sinfxonaga kirganimda doskaga oddiy maʼruza yozib beriş men uçun heç qaçon yetarli bölmagan. Öquvçining közida qiziqiş öti yonişi uçun u xaritani his qilişi, Amudaryoning qayerdan boşlanib qayerga quyilişini, Qizilqum sarhadlarini öz közi bilan körgandek tasavvur qilişi kerak.

Şu yillar davomida yuzlab iqtidorli öquvçilarni tuman, viloyat va respublika fan olimpiadalariga tayyorladim. Ularning har bir muvaffaqiyati, geografiya orqali dunyoqaraşining kengayişi men uçun eng katta mukofot böldi.`
  },
  {
    period: "GeoBek ğoyasi va yaratilişi",
    title: "Nega taʼlimni raqamlaştirişga qaror qildim?",
    content: `Afsuski, uzoq yillar davomida maktablarimizda geografiya öqituvçilari uçun zamonaviy, sifatli körgazmali qurollar, yaxşi işlangan taqdimotlar va rasmiy testlar yetişmay keldi. Köplab öqituvçilar darsga tayyorlaniş uçun soatlab vaqt sarflar, ammo internetdan sifatli material topa olmas edi.

Aynan şu böşliqni töldiriş maqsadida men «GeoBek» metodik loyihasini yölga qöydim. 5-sinfdan 11-sinfgaça bölgan barça darslik mavzularini tahlil qilib, sifatli taqdimotlar (PPTX), dars işlanmalari va DTM standartidagi savollarni tayyorladim. 

GeoBek platformasi esa ana şu köp yillik mehnatimizni respublikadagi barça ustozlar va öquvçilar uçun bir joyga jamlagan zamonaviy, oçiq va qulay xazinaga aylandi.`
  },
  {
    period: "Hayotiy va pedagogik falsafa",
    title: "«Geografiya — Vatanparvarlikning eng gözal ifodasi»",
    content: `Mening pedagogik aqidam juda sodda:
Öz yurtining har bir toğini, daryosini, iqlimini va tabiiy boyligini bilmagan inson öz vatanini çin dildan seva olmaydi. Geografiya — bu quruq faktlar yiğindisi emas, bu tabiatga mehr, resurslarni asraş madaniyati va dunyo bilan munosabatni örganiş ilmidir.

Biz yaratayotgan har bir darslik, taqdimot va test savoli yurtimiz yoşlarining tafakkurini kengaytirişga xizmat qilişi kerak. Bugungi öquvçi ertangi kunning davlat arbobi, geologi, ekologi yoki muhandisidir. Ularga berayotgan bilimimiz halol, aniq va mehr bilan yetkazilişi şart.`
  }
];

const MEDIA_GALLERY = [
  {
    type: 'image',
    title: 'Dars jarayoni va öquvçilar bilan maşğulot',
    category: 'Pedagogika',
    description: 'Sinfxonada xaritalar tahlili va yoş geograf olimpiadaçilar bilan amaliy dars.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1000&q=80',
  },
  {
    type: 'image',
    title: 'Özbekistonning tabiiy landşaftlari va dala amaliyoti',
    category: 'Ekspeditsiya',
    description: 'Toğ tizmalari, daryo havzalari va relyef şakllarini joyida örganiş jarayoni.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    type: 'image',
    title: 'Darsliklar, atlaslar va metodik qöllanmalar',
    category: 'GeoBek',
    description: '5–11-sinf maktab öquv dasturlari uçun tayyorlangan körgazmali taqdimotlar töplami.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80',
  },
  {
    type: 'video',
    title: 'GeoBek 3D Xaritalar va Darsliklar Tahlili',
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
    handle: 'GeoBek Taʼlim',
    url: 'https://youtube.com',
    desc: 'Video darslar, xaritalar şarhi va olimpiada masalalari tahlili',
    icon: YoutubeLogo,
    color: '#DC2626'
  },
  {
    name: 'Aloqa & Savollar',
    handle: 'Qambarov O.X. (Shaxsiy)',
    url: 'https://t.me/iam_web_dev',
    desc: 'Öqituvçilar va abituriyentlar uçun metodik yordam',
    icon: TelegramLogo,
    color: '#0D9488'
  },
  {
    name: 'Elektron Poçta',
    handle: 'geobek.uz@gmail.com',
    url: 'mailto:geobek.uz@gmail.com',
    desc: 'Rasmiy takliflar va hamkorlik uçun',
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
        title="Qambarov O.X. – Geografiya ustozi, GeoBek ilmiy rahbari va muallifi"
        description="Geograf ustoz Qambarov O.X.ning hayot yöli, pedagogik tajribasi, geografiya metodikasi va GeoBek ta'lim portali haqida."
      />

      {/* ── Top Bar: Radically Clean - ONLY Back Button ── */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E7E5E4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#57534E] hover:text-[#0C0A09] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-[#0D9488]" />
            <span>GeoBek platformasiga qaytiş</span>
          </Link>

          <span className="text-xs font-serif font-bold text-[#78716C]">
            Qambarov O.X. | GeoBek
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
              «Geografiya — bu şunçaki toğ va daryo nomlarini yodlaş emas. Bu öz zaminini seviş, uning har bir zarrasini eʼzozlaş va dunyo bilan munosabatni tuşuniş kalitidir.»
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
              <span className="font-semibold text-[#1C1917]">GeoBek asosçisi</span>
              <span>•</span>
              <span>5–11-sinf taqdimotlar muallifi</span>
            </div>
          </div>
        </section>

        {/* ── Life Story (Ustozning hayot yöli va keçinmalari) ── */}
        <section className="space-y-10">
          <div className="border-b border-[#E7E5E4] pb-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0D9488]">
              PEDAGOGIK FAOLIYAT VA HIKOYALAR
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#0C0A09] mt-1">
              Ustozlik yöli va hayotiy saboqlar
            </h2>
            <p className="text-sm text-[#78716C] mt-1">
              Maktab sinfxonalaridan tortib zamonaviy raqamli taʼlim platformasigaça bölgan yöl.
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
              <span>KÖRGAZMALI QUROLLAR VA LAVHALAR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0C0A09] mt-1">
              Foto va videolavhalar
            </h2>
            <p className="text-sm text-[#78716C] mt-1">
              Dars jarayonlari, GeoBek taqdimotlari va Özbekistonning betakror tabiati.
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
                            title="Videoni tomoşa qiliş"
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

        {/* ── Contacts & Mentorship (Ustoz bilan boğlaniş) ── */}
        <section className="space-y-6 pt-6 border-t border-[#E7E5E4]">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0C0A09]">
              Ustoz bilan boğlaniş va metodik muloqot
            </h2>
            <p className="text-sm text-[#57534E] max-w-2xl leading-relaxed">
              Agar siz geografiya öqituvçisi, abituriyent yoki fan qiziquvçisi bölsangiz — darsliklar, 
              olimpiada testlari yoki dars taqdimotlari böyiça bemalol murojaat qilişingiz mumkin.
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
            <span className="font-medium">Rasmiy xatlar va takliflar uçun poçta:</span>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F5F5F4] border border-[#D6D3D1] text-[#1C1917] font-semibold hover:bg-[#E7E5E4] transition-colors"
            >
              {copiedEmail ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copiedEmail ? "Nusxalandi!" : "geobek.uz@gmail.com nusxalaş"}</span>
            </button>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="pt-8 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div className="flex items-center gap-1.5 font-medium">
            <span>© {new Date().getFullYear()} Qambarov O.X. | GeoBek.</span>
            <span>Barça huquqlar himoyalangan.</span>
          </div>

          <Link
            to="/"
            className="font-bold text-[#0D9488] hover:underline transition-colors"
          >
            ← Boş sahifaga qaytiş
          </Link>
        </footer>

      </main>
    </div>
  );
}
