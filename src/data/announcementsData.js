export const ANNOUNCEMENT_CATEGORIES = [
  { id: 'all', label: 'Barchasi' },
  { id: 'pinned', label: 'Muhim' },
  { id: 'exams', label: 'Imtihonlar' },
  { id: 'school', label: 'Maktab taʼlimi' },
  { id: 'olympiad', label: 'Olimpiada' },
];

export const announcements = [
  {
    id: 1,
    title: "7–11-sinf geografiya darsliklarining barcha taqdimotlari (prezentatsiyalari) platformaga yuklandi",
    category: 'school',
    categoryLabel: 'Maktab taʼlimi',
    categoryColor: '#2563EB',
    date: '14-noyabr, 2026',
    time: '12:30',
    isPinned: true,
    badge: 'Yangi taqdimotlar',
    summary: "Oʻzbekiston maktablarining 7, 8, 9, 10 va 11-sinf geografiya fanlari boʻyicha barcha mavzularning rasmiy taqdimotlari (PPTX) toʻliq yuklandi.",
    content: `Hurmatli oʻqituvchilar va oʻquvchilar!

Platformamizning "Maktab taʼlimi" boʻlimida 7, 8, 9, 10 va 11-sinf geografiya darsliklarining barcha mavzulari boʻyicha sifatli multimedia taqdimotlari (prezentatsiyalari) joylashtirildi.

Ushbu taqdimotlar quyidagi afzalliklarga ega:
1. Darslikdagi har bir bob va mavzuni toʻliq qamrab olgan;
2. Rangli xaritalar, jadvallar, infografikalar va tushunarli diagrammalar bilan boyitilgan;
3. Dars jarayonida dars oʻtish yoki mustaqil tayyorlanish uchun toʻgʻridan-toʻgʻri yuklab olish (PPTX formatida) imkoniyati mavjud;
4. Interaktiv slayd koʻrish tizimi orqali dars davomida proyektor orqali namoyish qilish mumkin.

Barcha taqdimotlarni "Maktab taʼlimi" boʻlimidan yuklab olishingiz mumkin.`,
    views: 3420,
    author: "Qambarov O.X. | GEOHISTORY",
    actionLink: '/school',
    actionText: "Taqdimotlarga oʻtish",
  },
  {
    id: 2,
    title: "2026-yilgi Geografiya fanidan Milliy Sertifikat imtihonlariga roʻyxatdan oʻtish muddati eʼlon qilindi",
    category: 'exams',
    categoryLabel: 'Imtihonlar',
    categoryColor: '#D97706',
    date: '12-noyabr, 2026',
    time: '09:15',
    isPinned: true,
    badge: 'Muhim eʼlon',
    summary: "Bilim va malakalarni baholash agentligi tomonidan geografiya fani boʻyicha navbatdagi milliy sertifikat sinovlari sanalari belgilandi.",
    content: `Hurmatli abituriyentlar va geografiya ixlosmandlari!

Bilim va malakalarni baholash agentligi (BBA) tomonidan 2026-yilgi umumtaʼlim fanlarini bilish darajasini baholashning milliy test tizimi boʻyicha navbatdagi imtihonlar jadvali tasdiqlandi.

Asosiy maʼlumotlar:
• Roʻyxatdan oʻtish muddati: 20-noyabrgacha my.bba.uz orqali;
• Sinovlar formati: 45 ta nazariy va tahliliy savollar, shu jumladan yopiq va ochiq turdagi masalalar;
• Imtihon sanasi: 28-noyabr;
• A va A+ darajadagi sertifikat egalari oliy taʼlim muassasalariga kirishda geografiya fanidan maksimal 100% ballga ega boʻladilar.

Platformamizning "Testlar" boʻlimida milliy sertifikat formatidagi 45 talik yangilangan rasmiy sinov testlarini ishlab, oʻz darajangizni hozirdanoq aniqlashingiz mumkin.`,
    views: 5890,
    author: "GeoBek Ilmiy Kengashi",
    actionLink: '/tests/milliy',
    actionText: "Sinov testini ishlash",
  },
  {
    id: 3,
    title: "Xalqaro Geografiya Olimpiadasi (iGeo) saralash bosqichi boshlanmoqda",
    category: 'olympiad',
    categoryLabel: 'Olimpiada',
    categoryColor: '#7C3AED',
    date: '10-noyabr, 2026',
    time: '16:00',
    isPinned: false,
    badge: 'Olimpiada',
    summary: "9–11-sinf oʻquvchilari oʻrtasida xalqaro geografiya olimpiadasi uchun tuman va viloyat saralash bosqichlariga start berildi.",
    content: `Xalqaro Geografiya Olimpiadasining (International Geography Olympiad — iGeo) 2026-yilgi saralash bosqichlari boshlanmoqda.

Musobaqa 3 ta asosiy yoʻnalish boʻyicha oʻtkaziladi:
1. Yozma tahliliy test (Written Response Test);
2. Amaliy dala tadqiqoti (Fieldwork Exercise);
3. Multimediya testi (Multimedia Test).

Ushbu saralash bosqichiga tayyorgarlik koʻrish uchun platformamizning "Viktorina" va "Olimpiada testlari" boʻlimlaridan foydalanishingiz tavsiya etiladi.`,
    views: 2740,
    author: "Respublika Olimpiada Qoʻmitasi",
    actionLink: '/quiz',
    actionText: "Olimpiada testlariga oʻtish",
  },
  {
    id: 4,
    title: "Oʻqituvchilar attestatsiyasi uchun yangi metodik qoʻllanmalar va testlar joylandi",
    category: 'school',
    categoryLabel: 'Maktab taʼlimi',
    categoryColor: '#059669',
    date: '08-noyabr, 2026',
    time: '11:45',
    isPinned: false,
    badge: 'Pedagoglar uchun',
    summary: "Maktab geografiya oʻqituvchilari uchun toifa sinovlari va malaka toifasi attestatsiyasiga tayyorgarlik resurslari yangilandi.",
    content: `Pedagog kadrlarni attestatsiyadan oʻtkazish jarayoniga tayyorgarlik koʻrayotgan geografiya oʻqituvchilari diqqatiga!

Kutubxonamizda yangi darsliklar va pedagogik mahorat standartlariga moslashtirilgan:
• Geografiya oʻqitish metodikasi;
• Dars ishlanmalari va taqvim-mavzu rejalari;
• 30 talik attestatsiya sinov testlari joylashtirildi.

Ushbu resurslar toifa oshirish istagida boʻlgan oʻqituvchilar uchun dars oʻtish va imtihondan yuqori ball olishga yordam beradi.`,
    views: 4120,
    author: "Metodik Kengash",
    actionLink: '/tests/attestation',
    actionText: "Attestatsiya testlarini koʻrish",
  },
  {
    id: 5,
    title: "Platforma kutubxonasiga yangi raqamli geografik atlaslar va xaritalar toʻplami qoʻshildi",
    category: 'school',
    categoryLabel: 'Kutubxona',
    categoryColor: '#0EA5E9',
    date: '05-noyabr, 2026',
    time: '14:20',
    isPinned: false,
    badge: 'Resurs',
    summary: "Oʻzbekiston va jahon tabiiy, iqtisodiy hamda siyosiy xaritalarini yuqori aniqlikda koʻrish imkoniyati yaratildi.",
    content: `Kutubxona boʻlimida Oʻzbekiston Geografiya Jamiyati bilan hamkorlikda yangi elektron xaritalar va atlaslar bazasi shakllantirildi.

Yangi materiallar:
- Oʻzbekistonning yangilangan maʼmuriy-hududiy xaritasi;
- Oʻzbekiston foydali qazilmalari va gidrografiyasi xaritasi;
- Jahon tabiiy zonalari va global iqlim xaritalari.

Materiallarni onlayn oʻqish va PDF formatida yuklab olish mumkin.`,
    views: 3190,
    author: "Kutubxona boʻlimi",
    actionLink: '/library',
    actionText: "Kutubxonaga oʻtish",
  },
];
