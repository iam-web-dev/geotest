import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, TelegramLogo, GithubLogo, InstagramLogo,
  YoutubeLogo, TwitterLogo, EnvelopeSimple, Play,
  MapPin, Sparkle, Copy, Check, Camera
} from '@phosphor-icons/react';
import SEO from '../components/SEO';

const LIFE_CHAPTERS = [
  {
    year: "Bolalik va ilk uchqun",
    title: "Eskirgan atlaslar va dunyoni anglash istagi",
    content: `Hammasi qoʻlimga tushgan eski, sahifalari sargʻaygan geografik atlasdan boshlangan. Bolalikda boshqa shaharlarga, uzoq mamlakatlarga borish imkoni boʻlmagan paytlarda, xaritalar men uchun dunyoga ochilgan yagona deraza edi. Har bir togʻ tizmasi, daryo oʻzani va qitʼa chegaralari menga sirli bir dunyoni soʻzlab bergandek tuyulardi.

U paytlarda kompyuter yoki tezkor internet yoʻq edi. Biror davlat haqida maʼlumot topish uchun kutubxonaga borish, ensiklopediyalarni titish kerak boʻlardi. Ana shu bolalik qiziqishi keyinchalik butun hayotimning asosiy yoʻnalishiga aylanishini u paytda hatto tasavvur ham qilmagandim.`
  },
  {
    year: "Oʻrganish yillari",
    title: "Dasturlashga kirib kelish va tunlar mehnati",
    content: `Kompyuter bilan ilk jiddiy toʻqnashganimda, men uchun eng hayratlanarlisi bitta narsa boʻldi: siz oʻz qoʻlingiz bilan noldan nimadir yarata olasiz. Klaviaturada yozilgan bir necha qator kod ekranda butun bir dunyoni jonlantirishi mumkin.

Dasturlashni oʻrganish oson kechmadi. Internet sekin, zamonaviy noutbuk yoʻq, atrofda yoʻl koʻrsatuvchi mentorlar deyarli uchramaydigan davrlar edi. Ammo ishtiyoq har qanday toʻsiqdan ustun keldi. Kechalari tonggacha xatolar (bug) ustida ishlash, Linux tizimlarini sozlash, inglizcha hujjatlarni lugʻat bilan tarjima qilib oʻqish — bularning barchasi haqiqiy muhandislik sabogʻi boʻldi. Men dasturlashni shunchaki ish emas, oʻz fikrini erkin ifoda etish sanʼati deb qabul qildim.`
  },
  {
    year: "Burilish nuqtasi",
    title: "Nega aynan GeoBek? Muammo va qaror",
    content: `Kunlarning birida maktab darsliklari va DTM testlarini internetdan qidirib koʻrdim. Duch kelgan manzara esa meni qattiq ranjitdi: 2010-yillardan qolgan, har tomoni qimor va behayo reklamalar bilan toʻla, mobil telefonda ochilishi uchun 15 soniya kutish kerak boʻlgan yaroqsiz saytlar.

Oʻquvchi yoki oʻqituvchi bitta xaritani yoki test savolini koʻrish uchun bir nechta reklamani majburan yopishi kerak edi. Oʻzimga savol berdim: «Nega bizning yoshlarimiz xalqaro darajadagi, toza, zamonaviy va tezkor vositalardan foydalana olmasligi kerak? Nega buni kimdir boshqa qilishi kerak?»

Ana shu savolga javob sifatida GeoBekʼning birinchi qator kodi yozildi. Men uni hech qanday grant, homiy yoki tijoriy maqsadsiz — shunchaki yurtimiz taʼlimi uchun toza va munosib loyiha boʻlsin deb boshladim.`
  },
  {
    year: "Bugungi kun",
    title: "Falsafa: Oddiylik, halollik va erkin bilim",
    content: `Bugun GeoBek — Oʻzbekistondagi 5-sinfdan 11-sinfgacha boʻlgan maktab dasturini, DTM va Milliy sertifikat testlarini, interaktiv 3D Yer globusini oʻzida jamlagan platforma.

Mening hayotiy qoidam oddiy:
1. Insonlarga foydasi tegmaydigan murakkablikdan voz kech.
2. Dasturiy taʼminotda hech qachon foydalanuvchining eʼtiborini arzon reklamaga sotma.
3. Qilgan har bir ishing ortida shaxsiy javobgarlik va yuzing yorugʻ boʻlsin.

Hayot — bu biz ortimizdan qoldiradigan izlar yigʻindisidir. Agar GeoBek orqali bittagina boʻlsa ham oʻquvchi geografiyani sevib qolsa, dunyoni chuqurroq anglatsa, demak, yashayotgan umrim va yozgan kodlarim zoye ketmabdi.`
  }
];

const MEDIA_ITEMS = [
  {
    type: 'image',
    title: 'Ish maydoni va tunlar mehnati',
    category: 'Muhandislik',
    description: 'Arch Linux, terminal va GeoBek arxitekturasi yozilgan sokin tunlar.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
  },
  {
    type: 'video',
    title: 'GeoBek 3D Globus va Dvigatel',
    category: 'Video Demo',
    description: 'Three.js va maxsus shaderlar yordamida brauzerda 60 FPS bilan ishlaydigan Yer modeli.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-earth-rotating-in-space-41618-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1000&q=80',
  },
  {
    type: 'image',
    title: 'Togʻlar, tabiat va ilhom',
    category: 'Sayohat',
    description: 'Oʻzbekistonning tabiiy goʻzalligi — xaritalarga boʻlgan muhabbat manbai.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    type: 'image',
    title: 'Kitoblar, darsliklar va xaritalar',
    category: 'Tadqiqot',
    description: 'GeoBek maktab dasturi uchun tahlil qilingan milliy geografiya darsliklari toʻplami.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80',
  }
];

const SOCIAL_LINKS = [
  {
    name: 'Telegram',
    handle: '@iam_web_dev',
    url: 'https://t.me/iam_web_dev',
    icon: TelegramLogo,
    color: '#229ED9'
  },
  {
    name: 'GitHub',
    handle: 'github.com/iam-web-dev',
    url: 'https://github.com/iam-web-dev',
    icon: GithubLogo,
    color: '#E2E8F0'
  },
  {
    name: 'Instagram',
    handle: '@ibrohimjon_mamirov',
    url: 'https://instagram.com',
    icon: InstagramLogo,
    color: '#E4405F'
  },
  {
    name: 'YouTube',
    handle: '@geobek_uz',
    url: 'https://youtube.com',
    icon: YoutubeLogo,
    color: '#FF0000'
  },
  {
    name: 'X (Twitter)',
    handle: '@iam_web_dev',
    url: 'https://x.com',
    icon: TwitterLogo,
    color: '#1DA1F2'
  },
  {
    name: 'Email',
    handle: 'ibrohimjonmamirov120909@gmail.com',
    url: 'mailto:ibrohimjonmamirov120909@gmail.com',
    icon: EnvelopeSimple,
    color: '#10B981'
  }
];

export default function Creator() {
  const [playingVideo, setPlayingVideo] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ibrohimjonmamirov120909@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0C1017] text-[#E2E8F0] selection:bg-teal-500/20 selection:text-teal-300 font-sans">
      <SEO
        title="Ibrohimjon Mamirov – Hayot hikoyasi va GeoBek muallifi"
        description="GeoBek yaratuvchisi Ibrohimjon Mamirovning shaxsiy hayot yo'li, dasturlashga kirib kelishi va ta'lim loyihasi tarixi."
      />

      {/* ── Top Bar: Radically Clean - ONLY Back Button ── */}
      <header className="sticky top-0 z-40 bg-[#0C1017]/90 backdrop-blur-md border-b border-[#1E293B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>GeoBek platformasiga qaytish</span>
          </Link>

          <span className="text-[11px] font-mono text-[#64748B]">
            Ibrohimjon Mamirov
          </span>
        </div>
      </header>

      {/* ── Main Content Container ── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-20">
        
        {/* ── Personal Hero ── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-xs font-mono text-teal-400">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>MUALLIF HAQIDA • SHAXSIY HIKOYA</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-[#F8FAFC] leading-tight">
              Ibrohimjon Mamirov
            </h1>
            <p className="text-lg sm:text-xl text-[#94A3B8] leading-relaxed max-w-2xl font-serif italic">
              «Dastur yozish — bu shunchaki tirikchilik emas. Bu insonlarga, ayniqsa ilm olayotgan yoshlarga hurmat bilan foydali narsa yaratish sanʼatidir.»
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#64748B] pt-2">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-teal-400" />
              <span>Toshkent, Oʻzbekiston</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Sparkle size={14} className="text-amber-400" />
              <span>Dasturchi & GeoBek asoschisi</span>
            </div>
          </div>
        </section>

        {/* ── Life Story (Bir insonning hayot yo'li) ── */}
        <section className="space-y-12">
          <div className="border-b border-[#1E293B] pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#F8FAFC]">
              Hayot yoʻli va kechinmalar
            </h2>
            <p className="text-sm text-[#94A3B8] mt-1">
              Atlaslardan boshlangan qiziqish, oʻz ustida ishlash va GeoBek loyihasining dunyoga kelishi.
            </p>
          </div>

          <div className="space-y-12">
            {LIFE_CHAPTERS.map((chapter, idx) => (
              <article key={idx} className="space-y-3">
                <div className="text-xs font-mono text-teal-400 font-semibold uppercase tracking-wider">
                  {chapter.year}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#F8FAFC]">
                  {chapter.title}
                </h3>
                <div className="text-base sm:text-lg text-[#CBD5E1] font-serif leading-relaxed whitespace-pre-line pt-1">
                  {chapter.content}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Photo & Video Moments (Foto va videolavhalar) ── */}
        <section className="space-y-8">
          <div className="border-b border-[#1E293B] pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
              <Camera size={14} />
              <span>MOMENTS & MEDIA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#F8FAFC] mt-1">
              Foto va videolavhalar
            </h2>
            <p className="text-sm text-[#94A3B8] mt-1">
              Ish muhiti, ilhom manbalari va GeoBek platformasining yuragi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MEDIA_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-[#1E293B] bg-[#111726] overflow-hidden flex flex-col transition-all hover:border-[#334155]"
              >
                {/* Media Container */}
                <div className="relative aspect-[16/10] bg-[#0A0D14] overflow-hidden">
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
                            className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-teal-500/90 text-[#0C1017] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
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
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-mono bg-black/60 backdrop-blur-md text-[#E2E8F0] border border-white/10">
                    {item.category}
                  </span>
                </div>

                {/* Media Info */}
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <h4 className="font-bold text-base font-serif text-[#F8FAFC]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Social Media & Contact Links ── */}
        <section className="space-y-6 pt-4 border-t border-[#1E293B]">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#F8FAFC]">
              Ijtimoiy tarmoqlar va aloqa
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Savollar, takliflar yoki shunchaki fikr almashish uchun doim ochiqman.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {SOCIAL_LINKS.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-lg border border-[#1E293B] bg-[#111726] hover:border-teal-500/50 hover:bg-[#161F33] transition-all group"
                >
                  <div
                    className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 bg-[#0C1017] border border-[#1E293B]"
                    style={{ color: link.color }}
                  >
                    <Icon size={18} weight="bold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#F8FAFC] group-hover:text-teal-300 transition-colors">
                      {link.name}
                    </p>
                    <p className="text-[11px] font-mono text-[#64748B] truncate">
                      {link.handle}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="p-4 rounded-lg border border-[#1E293B] bg-[#111726]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#94A3B8]">
            <span>Toʻgʻridan-toʻgʻri pochta manzili:</span>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#172033] border border-[#2A3854] text-[#E2E8F0] hover:text-white transition-colors"
            >
              {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedEmail ? "Nusxalandi!" : "ibrohimjonmamirov120909@gmail.com nusxalash"}</span>
            </button>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Ibrohimjon Mamirov.</span>
            <span>GeoBek loyihasi.</span>
          </div>

          <Link
            to="/"
            className="hover:text-[#F8FAFC] transition-colors"
          >
            ← Bosh sahifaga qaytish
          </Link>
        </footer>

      </main>
    </div>
  );
}
