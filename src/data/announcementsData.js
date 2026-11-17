export const ANNOUNCEMENT_CATEGORIES = [
  { id: 'all', label: 'Barchasi' },
  { id: 'exams', label: 'Imtihonlar' },
  { id: 'school', label: 'Maktab taʼlimi' },
  { id: 'olympiad', label: 'Olimpiada' },
  { id: 'library', label: 'Kutubxona' },
];

/**
 * Backend ma'lumotlar bazasi modeli bilan 100% mos keluvchi statik e'lonlar.
 * Har bir e'lon bir xil kalitlar (fields) tuzilmasiga ega:
 * - id: number
 * - slug: string
 * - title: string
 * - category: string
 * - categoryLabel: string
 * - categoryColor: string
 * - date: string
 * - time: string
 * - publishedAt: string (ISO-8601)
 * - summary: string
 * - content: string
 * - views: number
 * - author: string
 * - authorRole: string
 * - coverImage: string (asosiy rasm - e'lonlar ro'yxatida ko'rinadi)
 * - media: Array<{ type: 'image' | 'video', url: string, caption?: string, thumbnail?: string }>
 * - actionLink: string
 * - actionText: string
 */
export const announcements = [
  {
    id: 1,
    slug: 'maktab-geografiya-darsliklari-taqdimotlari',
    title: '7–11-sinf geografiya darsliklarining barcha taqdimotlari (prezentatsiyalari) platformaga yuklandi',
    category: 'school',
    categoryLabel: 'Maktab taʼlimi',
    categoryColor: '#1E5BF8',
    date: '14-noyabr, 2026',
    time: '12:30',
    publishedAt: '2026-11-14T12:30:00Z',
    summary: 'Oʻzbekiston maktablarining 7, 8, 9, 10 va 11-sinf geografiya fanlari boʻyicha barcha mavzularning rasmiy taqdimotlari (PPTX) toʻliq yuklandi.',
    content: `Hurmatli oʻqituvchilar va oʻquvchilar!

Platformamizning "Maktab taʼlimi" boʻlimida 7, 8, 9, 10 va 11-sinf geografiya darsliklarining barcha mavzulari boʻyicha sifatli multimedia taqdimotlari (prezentatsiyalari) joylashtirildi.

Ushbu taqdimotlar quyidagi afzalliklarga ega:
1. Darslikdagi har bir bob va mavzuni toʻliq qamrab olgan;
2. Rangli xaritalar, jadvallar, infografikalar va tushunarli diagrammalar bilan boyitilgan;
3. Dars jarayonida dars oʻtish yoki mustaqil tayyorlanish uchun toʻgʻridan-toʻgʻri yuklab olish (PPTX formatida) imkoniyati mavjud;
4. Interaktiv slayd koʻrish tizimi orqali dars davomida proyektor orqali namoyish qilish mumkin.

Barcha taqdimotlarni "Maktab taʼlimi" boʻlimidan yuklab olishingiz mumkin.`,
    views: 3420,
    author: 'Qambarov O.X.',
    authorRole: 'GEOBEK ilmiy muharriri',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop',
        caption: '7–11-sinf geografiya darsliklari taqdimotlari toʻplami',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop',
        caption: 'Interaktiv dars ishlanmalari va koʻrgazmali xaritalar',
      },
      {
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        caption: 'Taqdimotlarni yuklab olish va darsda qoʻllash boʻyicha video qoʻllanma',
      },
    ],
    actionLink: '/school',
    actionText: 'Taqdimotlarga oʻtish',
  },
  {
    id: 2,
    slug: 'milliy-sertifikat-imtihonlari-royxatdan-otish',
    title: '2026-yilgi Geografiya fanidan Milliy Sertifikat imtihonlariga roʻyxatdan oʻtish muddati eʼlon qilindi',
    category: 'exams',
    categoryLabel: 'Imtihonlar',
    categoryColor: '#1E5BF8',
    date: '12-noyabr, 2026',
    time: '09:15',
    publishedAt: '2026-11-12T09:15:00Z',
    summary: 'Bilim va malakalarni baholash agentligi tomonidan geografiya fani boʻyicha navbatdagi milliy sertifikat sinovlari sanalari belgilandi.',
    content: `Hurmatli abituriyentlar va geografiya ixlosmandlari!

Bilim va malakalarni baholash agentligi (BBA) tomonidan 2026-yilgi umumtaʼlim fanlarini bilish darajasini baholashning milliy test tizimi boʻyicha navbatdagi imtihonlar jadvali tasdiqlandi.

Asosiy maʼlumotlar:
• Roʻyxatdan oʻtish muddati: 20-noyabrgacha my.bba.uz orqali;
• Sinovlar formati: 45 ta nazariy va tahliliy savollar, shu jumladan yopiq va ochiq turdagi masalalar;
• Imtihon sanasi: 28-noyabr;
• A va A+ darajadagi sertifikat egalari oliy taʼlim muassasalariga kirishda geografiya fanidan maksimal 100% ballga ega boʻladilar.

Platformamizning "Testlar" boʻlimida milliy sertifikat formatidagi 45 talik yangilangan rasmiy sinov testlarini ishlab, oʻz darajangizni hozirdanoq aniqlashingiz mumkin.`,
    views: 5890,
    author: 'GEOBEK Ilmiy Kengashi',
    authorRole: 'Baholash ekspert guruhi',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
        caption: 'Milliy sertifikat sinovlariga tayyorgarlik jarayoni',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200&auto=format&fit=crop',
        caption: 'Bilim va malakalarni baholash agentligi test markazi',
      },
    ],
    actionLink: '/tests/milliy',
    actionText: 'Sinov testini ishlash',
  },
  {
    id: 3,
    slug: 'xalqaro-geografiya-olimpiadasi-saralash',
    title: 'Xalqaro Geografiya Olimpiadasi (iGeo) saralash bosqichi boshlanmoqda',
    category: 'olympiad',
    categoryLabel: 'Olimpiada',
    categoryColor: '#1E5BF8',
    date: '10-noyabr, 2026',
    time: '16:00',
    publishedAt: '2026-11-10T16:00:00Z',
    summary: '9–11-sinf oʻquvchilari oʻrtasida xalqaro geografiya olimpiadasi uchun tuman va viloyat saralash bosqichlariga start berildi.',
    content: `Xalqaro Geografiya Olimpiadasining (International Geography Olympiad — iGeo) 2026-yilgi saralash bosqichlari boshlanmoqda.

Musobaqa 3 ta asosiy yoʻnalish boʻyicha oʻtkaziladi:
1. Yozma tahliliy test (Written Response Test);
2. Amaliy dala tadqiqoti (Fieldwork Exercise);
3. Multimediya testi (Multimedia Test).

Ushbu saralash bosqichiga tayyorgarlik koʻrish uchun platformamizning "Viktorina" va "Olimpiada testlari" boʻlimlaridan foydalanishingiz tavsiya etiladi. Saralashda yuqori oʻrin olgan oʻquvchilar terma jamoa oʻquv-mashgʻulot yigʻinlariga jalb etiladi.`,
    views: 2740,
    author: 'Respublika Olimpiada Qoʻmitasi',
    authorRole: 'Olimpiada koordinatori',
    coverImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop',
        caption: 'Xalqaro Geografiya Olimpiadasi (iGeo) xaritasi',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507842229451-79b1be886a20?q=80&w=1200&auto=format&fit=crop',
        caption: 'Ilmiy tadqiqot va dala amaliyoti mashgʻulotlari',
      },
    ],
    actionLink: '/quiz',
    actionText: 'Olimpiada testlariga oʻtish',
  },
  {
    id: 4,
    slug: 'oqituvchilar-attestatsiyasi-metodik-qollanmalar',
    title: 'Oʻqituvchilar attestatsiyasi uchun yangi metodik qoʻllanmalar va testlar joylandi',
    category: 'school',
    categoryLabel: 'Maktab taʼlimi',
    categoryColor: '#1E5BF8',
    date: '08-noyabr, 2026',
    time: '11:45',
    publishedAt: '2026-11-08T11:45:00Z',
    summary: 'Maktab geografiya oʻqituvchilari uchun toifa sinovlari va malaka toifasi attestatsiyasiga tayyorgarlik resurslari yangilandi.',
    content: `Pedagog kadrlarni attestatsiyadan oʻtkazish jarayoniga tayyorgarlik koʻrayotgan geografiya oʻqituvchilari diqqatiga!

Kutubxonamizda yangi darsliklar va pedagogik mahorat standartlariga moslashtirilgan:
• Geografiya oʻqitish metodikasi;
• Dars ishlanmalari va taqvim-mavzu rejalari;
• 30 talik attestatsiya sinov testlari joylashtirildi.

Ushbu resurslar toifa oshirish istagida boʻlgan oʻqituvchilar uchun dars oʻtish va imtihondan yuqori ball olishga yordam beradi. Har bir material elektron shaklda oʻqish uchun tayyor holga keltirilgan.`,
    views: 4120,
    author: 'Metodik Kengash',
    authorRole: 'Metodist ekspert',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
        caption: 'Pedagoglar uchun metodik dars ishlanmalari va standartlar',
      },
      {
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        caption: 'Attestatsiya testlarini tahlil qilish videodarsi',
      },
    ],
    actionLink: '/tests/attestation',
    actionText: 'Attestatsiya testlarini koʻrish',
  },
  {
    id: 5,
    slug: 'kutubxonaga-yangi-raqamli-atlaslar-qoshildi',
    title: 'Platforma kutubxonasiga yangi raqamli geografik atlaslar va xaritalar toʻplami qoʻshildi',
    category: 'library',
    categoryLabel: 'Kutubxona',
    categoryColor: '#1E5BF8',
    date: '05-noyabr, 2026',
    time: '14:20',
    publishedAt: '2026-11-05T14:20:00Z',
    summary: 'Oʻzbekiston va jahon tabiiy, iqtisodiy hamda siyosiy xaritalarini yuqori aniqlikda koʻrish imkoniyati yaratildi.',
    content: `Kutubxona boʻlimida Oʻzbekiston Geografiya Jamiyati bilan hamkorlikda yangi elektron xaritalar va atlaslar bazasi shakllantirildi.

Yangi materiallar:
- Oʻzbekistonning yangilangan maʼmuriy-hududiy xaritasi;
- Oʻzbekiston foydali qazilmalari va gidrografiyasi xaritasi;
- Jahon tabiiy zonalari va global iqlim xaritalari.

Materiallarni platformada toʻgʻridan-toʻgʻri onlayn oʻqish va yuqori sifatli PDF formatida yuklab olish mumkin.`,
    views: 3190,
    author: 'Kutubxona boʻlimi',
    authorRole: 'Raqamli fond koordinatori',
    coverImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop',
        caption: 'Oʻzbekiston va jahon tabiiy geografik atlasi',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
        caption: 'Raqamli kosmik suratlar va relyef modellari',
      },
    ],
    actionLink: '/library',
    actionText: 'Kutubxonaga oʻtish',
  },
  {
    id: 6,
    slug: 'yangi-interaktiv-geografik-oyinlar',
    title: 'Platformada interaktiv geografik mini-oʻyinlar va viloyatlar bellashuvi yangilandi',
    category: 'olympiad',
    categoryLabel: 'Oʻyinlar & Viktorina',
    categoryColor: '#1E5BF8',
    date: '02-noyabr, 2026',
    time: '17:10',
    publishedAt: '2026-11-02T17:10:00Z',
    summary: 'Oʻquvchilar bilimini sinash uchun yangi xarita oʻyinlari, daryolar va togʻlar boʻyicha tezkor topshiriqlar joriy etildi.',
    content: `Oʻrganish jarayonini yanada qiziqarli qilish maqsadida platformamizga yangi interaktiv geografiya oʻyinlari qoʻshildi!

Yangi oʻyin turlari:
1. Oʻzbekiston viloyatlari xaritasi — chegaralar va markazlarni topish;
2. Daryolar va koʻllar bellashuvi — qitʼalar boʻylab gidrografik obyektlar;
3. Poytaxtlar va bayroqlar sinovi — tezkor javoblar formati.

Har bir oʻyin orqali toʻplangan ballar umumiy reytingingizda aks etadi va yangi nishonlarni ochishga xizmat qiladi.`,
    views: 2950,
    author: 'GEOBEK Dasturlash Jamoasi',
    authorRole: 'Platforma muhandislari',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        caption: 'Viloyatlar va poytaxtlar interaktiv bellashuvi',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
        caption: 'Sayyoramiz daryolari va togʻ tizmalari xaritasi',
      },
    ],
    actionLink: '/games',
    actionText: 'Oʻyinlarga oʻtish',
  },
];

/**
 * ID yoki Slug orqali e'lonni topish
 */
export function getAnnouncementById(idOrSlug) {
  if (!idOrSlug) return null;
  const numId = Number(idOrSlug);
  return announcements.find((item) => item.id === numId || item.slug === String(idOrSlug)) || null;
}

/**
 * Oxirgi e'lonlarni olish (joriy e'lonni chiqarib tashlash imkoniyati bilan)
 */
export function getRecentAnnouncements(limit = 3, excludeId = null) {
  return announcements
    .filter((item) => (excludeId !== null ? item.id !== Number(excludeId) : true))
    .slice(0, limit);
}
