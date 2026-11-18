import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ArrowUpRight, Play, X, InstagramLogo,
  YoutubeLogo, TelegramLogo, Image, VideoCamera, Check, Copy
} from '@phosphor-icons/react';
import SEO from '../components/SEO';

const SOCIAL_MEDIA_GALLERY = [
  {
    id: 1,
    type: 'video',
    platform: 'YouTube',
    channel: 'GEOBEK Taʼlim',
    channelUrl: 'https://youtube.com',
    title: 'GEOBEK 3D Yer globusi va interaktiv xaritalardan darsda foydalanish',
    caption: 'Maktab oʻquvchilariga geografiya fanini interaktiv 3D texnologiyalar orqali oʻrgatish metodikasi va ochiq dars tahlili.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-earth-rotating-in-space-41618-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    duration: '14:20',
    date: '2026-11-10',
  },
  {
    id: 2,
    type: 'image',
    platform: 'Telegram',
    channel: '@geobek_uz',
    channelUrl: 'https://t.me/iam_web_dev',
    title: 'Sinfxonada xaritalar tahlili va interaktiv amaliy dars',
    caption: 'Yosh geograf olimpiadachilar bilan darslik mavzulari boʻyicha koʻrgazmali taqdimotlar va relyef modellari tahlili.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80',
    date: '2026-10-24',
  },
  {
    id: 3,
    type: 'video',
    platform: 'Telegram',
    channel: '@geobek_uz',
    channelUrl: 'https://t.me/iam_web_dev',
    title: 'Amudaryo va Sirdaryo havzasi: Orolboʻyi geoekologik tahlili',
    caption: 'Markaziy Osiyoning asosiy daryo tarmoqlari, sugʻorish tizimlari va geoekologik muammolar yechimiga bagʻishlangan videodars.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-waves-lapping-the-sand-at-the-beach-41716-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?auto=format&fit=crop&w=1200&q=80',
    duration: '09:45',
    date: '2026-10-30',
  },
  {
    id: 4,
    type: 'image',
    platform: 'Instagram',
    channel: '@geobek.uz',
    channelUrl: 'https://instagram.com',
    title: 'Togʻ tizmalari va relyef shakllarini joyida oʻrganish dala amaliyoti',
    caption: 'Chotqol va Hisor togʻ tizmalarida oʻtkazilgan geografik ekspeditsiya va geomorfologik dala tadqiqoti lavhalari.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    date: '2026-11-02',
  },
  {
    id: 5,
    type: 'image',
    platform: 'Instagram',
    channel: '@geobek.uz',
    channelUrl: 'https://instagram.com',
    title: 'Respublika fan olimpiadasi gʻoliblarini taqdirlash marosimi',
    caption: 'Ustoz Qambarov Omadbek Xayrullo o‘g‘li shogirdlari bilan birgalikda fan olimpiadasi taqdirlash tantanasida.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    date: '2026-11-15',
  },
  {
    id: 6,
    type: 'image',
    platform: 'Telegram',
    channel: '@geobek_uz',
    channelUrl: 'https://t.me/iam_web_dev',
    title: '5–11-sinf yangi geografiya taqdimotlari (PPTX) ustida ishlash',
    caption: 'Darsliklarning har bir mavzusini rang-barang xaritalar, jadvallar va animatsiyalar bilan boyitish jarayoni.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    date: '2026-11-17',
  }
];

export default function Creator() {
  const [activeTab, setActiveTab] = useState('all'); // all, photos, videos
  const [activeVideo, setActiveVideo] = useState(null);
  const [activePhoto, setActivePhoto] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('geobek.uz@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const filteredMedia = SOCIAL_MEDIA_GALLERY.filter((item) => {
    if (activeTab === 'photos') return item.type === 'image';
    if (activeTab === 'videos') return item.type === 'video';
    return true;
  });

  return (
    <div className="min-h-dvh bg-[var(--background)] text-[var(--text-secondary)] font-sans antialiased selection:bg-[var(--primary)]/20 selection:text-[var(--primary)]">
      <SEO
        title="Qambarov Omadbek Xayrullo o‘g‘li — GEOBEK asoschisi"
        description="Geografiya fani ustozi, oliy toifali pedagog. GEOBEK taʼlim platformasi asoschisi va 5–11-sinf maktab taqdimotlari muallifi."
        url="/creator"
      />

      {/* Discreet Back Navigation to App */}
      <Link
        to="/"
        aria-label="GEOBEK bosh sahifasiga qaytish"
        className="fixed top-5 left-5 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-raised)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] shadow-sm backdrop-blur-sm transition-all duration-200 group cursor-pointer"
      >
        <ArrowLeft size={13} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
        <span>GEOBEK</span>
      </Link>

      <main className="max-w-[700px] mx-auto px-5 sm:px-6 py-16 sm:py-24">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <img
            src={`${import.meta.env.BASE_URL}dhh-avatar.png`}
            alt="Qambarov Omadbek Xayrullo o‘g‘li"
            className="size-[126px] rounded-full object-cover select-none shadow-md border border-[var(--border)] ring-4 ring-[var(--surface)]"
            loading="eager"
          />
        </div>

        {/* Name Title */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-[0.16em] text-[var(--text-primary)] text-center uppercase mb-7 select-none">
          <span className="text-[var(--primary)]">Q</span>AMBAROV{' '}
          <span className="text-[var(--primary)]">O</span>MADBEK{' '}
          <span className="text-[var(--primary)]">X</span>AYRULLO O‘G‘LI
        </h1>

        {/* Lead Bio Paragraph */}
        <p className="text-center text-[15px] sm:text-base leading-[1.75] text-[var(--text-secondary)] text-pretty max-w-xl mx-auto mb-8 font-normal">
          Men geografiya fani ustozi, oliy toifali pedagog,{' '}
          <a
            href="#geobek"
            className="text-[var(--text-primary)] font-medium border-b border-[var(--border)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors cursor-pointer"
          >
            GEOBEK taʼlim platformasi
          </a>{' '}
          asoschisi, umumtaʼlim maktablari{' '}
          <a
            href="#presentations"
            className="text-[var(--text-primary)] font-medium border-b border-[var(--border)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors cursor-pointer"
          >
            5–11-sinf taqdimotlari (PPTX)
          </a>{' '}
          muallifi, yosh geograf{' '}
          <a
            href="#olympiad"
            className="text-[var(--text-primary)] font-medium border-b border-[var(--border)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors cursor-pointer"
          >
            olimpiadachilar ustozi
          </a>
          , zamonaviy metodist va{' '}
          <a
            href="#philosophy"
            className="text-[var(--text-primary)] font-medium border-b border-[var(--border)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors cursor-pointer"
          >
            pedagogik falsafa
          </a>{' '}
          targʻibotchisiman.
        </p>

        {/* Secondary Bio / Writing & Socials */}
        <p className="text-center text-[15px] sm:text-base leading-[1.75] text-[var(--text-secondary)] text-pretty max-w-xl mx-auto mb-14 font-normal">
          Mening darslarim va metodik materiallarimni{' '}
          <a
            href="https://t.me/iam_web_dev"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--primary)] hover:text-[var(--primary-hover)] underline decoration-[var(--primary)]/40 hover:decoration-[var(--primary)] font-medium transition-colors"
          >
            Telegram
          </a>{' '}
          va{' '}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--primary)] hover:text-[var(--primary-hover)] underline decoration-[var(--primary)]/40 hover:decoration-[var(--primary)] font-medium transition-colors"
          >
            YouTube
          </a>
          da kuzatishingiz mumkin. Shuningdek{' '}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--primary)] hover:text-[var(--primary-hover)] underline decoration-[var(--primary)]/40 hover:decoration-[var(--primary)] font-medium transition-colors"
          >
            Instagram
          </a>{' '}
          orqali bogʻlanishingiz yoki toʻgʻridan-toʻgʻri{' '}
          <button
            onClick={handleCopyEmail}
            className="text-[var(--primary)] hover:text-[var(--primary-hover)] underline decoration-[var(--primary)]/40 hover:decoration-[var(--primary)] font-medium transition-colors cursor-pointer"
          >
            geobek.uz@gmail.com
          </button>
          ga xat yuborishingiz mumkin.
        </p>

        {/* Left-Aligned Detailed Sections */}
        <div className="space-y-11 mb-20">
          {/* Asoschi va Geografiya ustozi */}
          <section id="geobek" className="space-y-3.5 scroll-mt-10">
            <h2 className="text-[17px] sm:text-[18px] font-bold text-[var(--text-primary)] tracking-tight">
              GEOBEK platformasi asoschisi
            </h2>
            <div className="text-[15px] sm:text-base leading-[1.75] text-[var(--text-secondary)] space-y-3.5 text-pretty font-normal">
              <p>
                Koʻp yillik oʻqituvchilik faoliyatim davomida maktablarimizda geografiya fani boʻyicha zamonaviy, sifatli koʻrgazmali qurollar, yaxshi ishlangan taqdimotlar va rasmiy testlar yetishmasligiga guvoh boʻldim. Aynan shu boʻshliqni toʻldirish maqsadida men «GEOBEK» taʼlim loyihasini yoʻlga qoʻydim.
              </p>
              <p>
                Bugungi kunda platforma Oʻzbekistonning barcha viloyatlaridagi minglab maktab oʻqituvchilari, abituriyentlar va oʻquvchilar uchun darsliklar, testlar, interaktiv 3D Yer globusi va olimpiada materiallarini ochiq taqdim etuvchi zamonaviy xazinaga aylandi.
              </p>
            </div>
          </section>

          {/* 5–11-sinf maktab taqdimotlari */}
          <section id="presentations" className="space-y-3.5 scroll-mt-10">
            <h2 className="text-[17px] sm:text-[18px] font-bold text-[var(--text-primary)] tracking-tight">
              5–11-sinf maktab taqdimotlari (PPTX) muallifi
            </h2>
            <div className="text-[15px] sm:text-base leading-[1.75] text-[var(--text-secondary)] space-y-3.5 text-pretty font-normal">
              <p>
                Umumtaʼlim maktablarining 5-sinfidan 11-sinfigacha boʻlgan barcha geografiya darslik mavzularini batafsil tahlil qilib, darsda bevosita qoʻllash uchun qulay, yuqori sifatli slaydlar va xaritalar toʻplamini ishlab chiqdim.
              </p>
              <p>
                Har bir taqdimot dars maqsadi, geografik xaritalar, statistik raqamlar, jadval va mustahkamlovchi savollar bilan toʻliq taʼminlangan boʻlib, oʻqituvchilarning darsga tayyorgarlik vaqtini bir necha barobarga tejaydi.
              </p>
            </div>
          </section>

          {/* Fan olimpiadalari va mentorlik */}
          <section id="olympiad" className="space-y-3.5 scroll-mt-10">
            <h2 className="text-[17px] sm:text-[18px] font-bold text-[var(--text-primary)] tracking-tight">
              Fan olimpiadalari va mentorlik
            </h2>
            <div className="text-[15px] sm:text-base leading-[1.75] text-[var(--text-secondary)] space-y-3.5 text-pretty font-normal">
              <p>
                Oʻnlab iqtidorli oʻquvchilarim tuman, viloyat va respublika fan olimpiadalarida oliy oʻrinlarni egallab, davlat grantlari va nufuzli oliy oʻquv yurtlariga muddatidan oldin qabul qilindi.
              </p>
              <p>
                Shogirdlarim bilan birga nafaqat nazariy bilimlarni, balki xaritalar bilan ishlash, kartografik masalalarni matematik hisoblash va tabiiy geografik hodisalarni tahlil qilish koʻnikmalarini chuqur oʻrganamiz.
              </p>
            </div>
          </section>

          {/* Pedagogik falsafa */}
          <section id="philosophy" className="space-y-3.5 scroll-mt-10">
            <h2 className="text-[17px] sm:text-[18px] font-bold text-[var(--text-primary)] tracking-tight">
              «Geografiya — Vatanparvarlikning eng goʻzal ifodasi»
            </h2>
            <div className="text-[15px] sm:text-base leading-[1.75] text-[var(--text-secondary)] space-y-3.5 text-pretty font-normal">
              <p>
                Mening pedagogik aqidam: Oʻz yurtining har bir togʻini, daryosini, iqlimini va tabiiy boyligini bilmagan inson oʻz vatanini chin dildan seva olmaydi. Geografiya shunchaki faktlar yigʻindisi emas, bu ona zaminni asrash madaniyatidir.
              </p>
            </div>
          </section>
        </div>

        {/* ── Social Media Photos & Videos Section (Rasm va videolar bo'limi) ── */}
        <section id="media-gallery" className="pt-10 border-t border-[var(--border)] space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary-soft)] border border-[var(--primary-border)] text-[var(--primary)] text-xs font-mono font-semibold">
              <Image size={13} weight="bold" />
              <span>Ijtimoiy tarmoqlar arxivi</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              Foto va videolavhalar
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
              Telegram, YouTube va Instagram kanallaridagi eng soʻnggi ochiq darslar, dala ekspeditsiyalari, olimpiada jarayonlari va video qoʻllanmalar.
            </p>
          </div>

          {/* Media Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'Barchasi' },
              { id: 'photos', label: 'Fotolavhalar' },
              { id: 'videos', label: 'Videolavhalar' },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm'
                      : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--primary)]/40'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Media Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                {/* Media Preview Area */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={item.type === 'video' ? item.thumbnail : item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                  {/* Platform Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
                    {item.platform === 'Telegram' && <TelegramLogo size={13} weight="fill" className="text-sky-400" />}
                    {item.platform === 'YouTube' && <YoutubeLogo size={13} weight="fill" className="text-red-500" />}
                    {item.platform === 'Instagram' && <InstagramLogo size={13} weight="fill" className="text-pink-400" />}
                    <span>{item.channel}</span>
                  </div>

                  {/* Play Button for Video */}
                  {item.type === 'video' ? (
                    <button
                      onClick={() => setActiveVideo(item)}
                      className="absolute inset-0 m-auto size-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
                      title="Videoni tomosha qilish"
                      aria-label="Videoni tomosha qilish"
                    >
                      <Play size={18} weight="fill" className="ml-0.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActivePhoto(item)}
                      className="absolute bottom-2.5 right-2.5 size-8 rounded-lg bg-black/60 hover:bg-[var(--primary)] text-white flex items-center justify-center transition-all cursor-pointer"
                      title="Rasmni toʻliq koʻrish"
                      aria-label="Rasmni toʻliq koʻrish"
                    >
                      <Image size={15} weight="bold" />
                    </button>
                  )}

                  {/* Duration tag */}
                  {item.duration && (
                    <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[10px] font-semibold">
                      {item.duration}
                    </span>
                  )}
                </div>

                {/* Card Meta Content */}
                <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--primary)] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 mt-1 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-[10px] text-[var(--text-tertiary)] font-mono">
                    <span>{item.date}</span>
                    <a
                      href={item.channelUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--primary)] hover:underline flex items-center gap-0.5 font-sans font-semibold"
                    >
                      <span>Kanalda koʻrish</span>
                      <ArrowUpRight size={10} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Player Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden max-w-2xl w-full space-y-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 pb-0 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-500/20 text-red-500 flex items-center gap-1">
                    <YoutubeLogo size={13} weight="fill" />
                    <span>{activeVideo.platform}</span>
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate max-w-md">
                    {activeVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors cursor-pointer"
                  aria-label="Yopish"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              <div className="relative aspect-video bg-black">
                <video
                  src={activeVideo.videoSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 pt-0 space-y-2">
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {activeVideo.caption}
                </p>
                <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] font-mono">
                  <span>Muallif: Qambarov Omadbek | {activeVideo.channel}</span>
                  <a
                    href={activeVideo.channelUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--primary)] hover:underline inline-flex items-center gap-1 font-sans font-semibold"
                  >
                    <span>Kanalga aʼzo boʻlish</span>
                    <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photo Lightbox Modal */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden max-w-2xl w-full space-y-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 pb-0 flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-primary)] truncate max-w-md">
                  {activePhoto.title}
                </span>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors cursor-pointer"
                  aria-label="Yopish"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              <div className="relative max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              <div className="p-4 pt-0 space-y-2">
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {activePhoto.caption}
                </p>
                <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] font-mono">
                  <span>{activePhoto.platform} • {activePhoto.channel}</span>
                  <a
                    href={activePhoto.channelUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--primary)] hover:underline inline-flex items-center gap-1 font-sans font-semibold"
                  >
                    <span>Postni koʻrish</span>
                    <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Minimal Bottom Colophon */}
        <footer className="mt-20 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-tertiary)]">
          <span>© {new Date().getFullYear()} Qambarov Omadbek Xayrullo o‘g‘li | GEOBEK</span>
          <Link
            to="/"
            className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            ← GEOBEK bosh sahifasi
          </Link>
        </footer>
      </main>
    </div>
  );
}
