export const ANNOUNCEMENT_CATEGORIES = [
  { id: 'all', label: 'Barçasi' },
  { id: 'pinned', label: 'Muhim' },
  { id: 'exams', label: 'Imtihonlar' },
  { id: 'school', label: 'Maktab taʼlimi' },
  { id: 'olympiad', label: 'Olimpiada' },
];

export const announcements = [
  {
    id: 1,
    title: "7–11-sinf geografiya darsliklarining barça taqdimotlari (prezentatsiyalari) platformaga yuklandi",
    category: 'sçool',
    categoryLabel: 'Maktab taʼlimi',
    categoryColor: '#2563EB',
    date: '14-noyabr, 2026',
    time: '12:30',
    isPinned: true,
    badge: 'Yangi taqdimotlar',
    summary: "Özbekiston maktablarining 7, 8, 9, 10 va 11-sinf geografiya fanlari böyiça barça mavzularning rasmiy taqdimotlari (PPTX) töliq yuklandi.",
    content: `Hurmatli öqituvçilar va öquvçilar!

Platformamizning "Maktab taʼlimi" bölimida 7, 8, 9, 10 va 11-sinf geografiya darsliklarining barça mavzulari böyiça sifatli multimedia taqdimotlari (prezentatsiyalari) joylaştirildi.

Uşbu taqdimotlar quyidagi afzalliklarga ega:
1. Darslikdagi har bir bob va mavzuni töliq qamrab olgan;
2. Rangli xaritalar, jadvallar, infografikalar va tuşunarli diagrammalar bilan boyitilgan;
3. Dars jarayonida dars ötiş yoki mustaqil tayyorlaniş uçun töğridan-töğri yuklab oliş (PPTX formatida) imkoniyati mavjud;
4. Interaktiv slayd köriş tizimi orqali dars davomida proyektor orqali namoyiş qiliş mumkin.

Barça taqdimotlarni "Maktab taʼlimi" bölimidan yuklab olişingiz mumkin.`,
    views: 3420,
    author: "Qambarov O.X. | GeoBek",
    actionLink: '/school',
    actionText: "Taqdimotlarga ötiş",
  },
  {
    id: 2,
    title: "2026-yilgi Geografiya fanidan Milliy Sertifikat imtihonlariga röyxatdan ötiş muddati eʼlon qilindi",
    category: 'exams',
    categoryLabel: 'Imtihonlar',
    categoryColor: '#D97706',
    date: '12-noyabr, 2026',
    time: '09:15',
    isPinned: true,
    badge: 'Muhim eʼlon',
    summary: "Bilim va malakalarni baholaş agentligi tomonidan geografiya fani böyiça navbatdagi milliy sertifikat sinovlari sanalari belgilandi.",
    content: `Hurmatli abituriyentlar va geografiya ixlosmandlari!

Bilim va malakalarni baholaş agentligi (BBA) tomonidan 2026-yilgi umumtaʼlim fanlarini biliş darajasini baholaşning milliy test tizimi böyiça navbatdagi imtihonlar jadvali tasdiqlandi.

Asosiy maʼlumotlar:
• Röyxatdan ötiş muddati: 20-noyabrgaça my.bba.uz orqali;
• Sinovlar formati: 45 ta nazariy va tahliliy savollar, şu jumladan yopiq va oçiq turdagi masalalar;
• Imtihon sanasi: 28-noyabr;
• A va A+ darajadagi sertifikat egalari oliy taʼlim muassasalariga kirişda geografiya fanidan maksimal 100% ballga ega böladilar.

Platformamizning "Testlar" bölimida milliy sertifikat formatidagi 45 talik yangilangan rasmiy sinov testlarini işlab, öz darajangizni hozirdanoq aniqlaşingiz mumkin.`,
    views: 5890,
    author: "GeoBek Ilmiy Kengaşi",
    actionLink: '/tests/milliy',
    actionText: "Sinov testini işlaş",
  },
  {
    id: 3,
    title: "Xalqaro Geografiya Olimpiadasi (iGeo) saralaş bosqiçi boşlanmoqda",
    category: 'olympiad',
    categoryLabel: 'Olimpiada',
    categoryColor: '#7C3AED',
    date: '10-noyabr, 2026',
    time: '16:00',
    isPinned: false,
    badge: 'Olimpiada',
    summary: "9–11-sinf öquvçilari örtasida xalqaro geografiya olimpiadasi uçun tuman va viloyat saralaş bosqiçlariga start berildi.",
    content: `Xalqaro Geografiya Olimpiadasining (International Geography Olympiad — iGeo) 2026-yilgi saralaş bosqiçlari boşlanmoqda.

Musobaqa 3 ta asosiy yönaliş böyiça ötkaziladi:
1. Yozma tahliliy test (Written Response Test);
2. Amaliy dala tadqiqoti (Fieldwork Exercise);
3. Multimediya testi (Multimedia Test).

Uşbu saralaş bosqiçiga tayyorgarlik köriş uçun platformamizning "Viktorina" va "Olimpiada testlari" bölimlaridan foydalanişingiz tavsiya etiladi.`,
    views: 2740,
    author: "Respublika Olimpiada Qömitasi",
    actionLink: '/quiz',
    actionText: "Olimpiada testlariga ötiş",
  },
  {
    id: 4,
    title: "Öqituvçilar attestatsiyasi uçun yangi metodik qöllanmalar va testlar joylandi",
    category: 'sçool',
    categoryLabel: 'Maktab taʼlimi',
    categoryColor: '#059669',
    date: '08-noyabr, 2026',
    time: '11:45',
    isPinned: false,
    badge: 'Pedagoglar uçun',
    summary: "Maktab geografiya öqituvçilari uçun toifa sinovlari va malaka toifasi attestatsiyasiga tayyorgarlik resurslari yangilandi.",
    content: `Pedagog kadrlarni attestatsiyadan ötkaziş jarayoniga tayyorgarlik körayotgan geografiya öqituvçilari diqqatiga!

Kutubxonamizda yangi darsliklar va pedagogik mahorat standartlariga moslaştirilgan:
• Geografiya öqitiş metodikasi;
• Dars işlanmalari va taqvim-mavzu rejalari;
• 30 talik attestatsiya sinov testlari joylaştirildi.

Uşbu resurslar toifa oşiriş istagida bölgan öqituvçilar uçun dars ötiş va imtihondan yuqori ball olişga yordam beradi.`,
    views: 4120,
    author: "Metodik Kengaş",
    actionLink: '/tests/attestation',
    actionText: "Attestatsiya testlarini köriş",
  },
  {
    id: 5,
    title: "Platforma kutubxonasiga yangi raqamli geografik atlaslar va xaritalar töplami qöşildi",
    category: 'sçool',
    categoryLabel: 'Kutubxona',
    categoryColor: '#0EA5E9',
    date: '05-noyabr, 2026',
    time: '14:20',
    isPinned: false,
    badge: 'Resurs',
    summary: "Özbekiston va jahon tabiiy, iqtisodiy hamda siyosiy xaritalarini yuqori aniqlikda köriş imkoniyati yaratildi.",
    content: `Kutubxona bölimida Özbekiston Geografiya Jamiyati bilan hamkorlikda yangi elektron xaritalar va atlaslar bazasi şakllantirildi.

Yangi materiallar:
- Özbekistonning yangilangan maʼmuriy-hududiy xaritasi;
- Özbekiston foydali qazilmalari va gidrografiyasi xaritasi;
- Jahon tabiiy zonalari va global iqlim xaritalari.

Materiallarni onlayn öqiş va PDF formatida yuklab oliş mumkin.`,
    views: 3190,
    author: "Kutubxona bölimi",
    actionLink: '/library',
    actionText: "Kutubxonaga ötiş",
  },
];
