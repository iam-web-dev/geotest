import riverPaths from './riversGeo.json';

export const rivers = [
  // ── ÖZBEKISTON ──────────────────────────────────────────────────────────
  {
    id: 'amudarya', name: 'Amudaryo', region: 'uzbekistan', difficulty: 'easy',
    length: '2,540 km', source: "Pomir toğlari (Vaxş va Panj qöşilişi)", mouth: 'Orol dengizi',
    countries: ['Tojikiston', "Afğoniston", "Özbekiston", 'Turkmaniston'],
    fact: "Markaziy Osiyoning eng suvli daryosi; hajmi jihatidan Orolga yetib bormaydi.",
  },
  {
    id: 'syrdarya', name: 'Sirdaryo', region: 'uzbekistan', difficulty: 'easy',
    length: '2,212 km', source: "Norin va Qoradaryo qöşilişi (Tyan-Şan, Farğona vodiysi)", mouth: "Orol dengizi (Şimoliy Orol)",
    countries: ["Qirğiziston", "Özbekiston", 'Tojikiston', "Qozoğiston"],
    fact: "Markaziy Osiyoning ikkinçi eng uzun daryosi; Farğona vodiysini suğoradi.",
  },
  {
    id: 'zarafshon', name: 'Zarafşon', region: 'uzbekistan', difficulty: 'medium',
    length: '877 km', source: "Zarafşon muzligi (Tojikiston, Turkiston tizmasi)", mouth: "Qoraköl vohasida qurib yöqoladi",
    countries: ['Tojikiston', "Özbekiston"],
    fact: "Samarqand va Buxoroni ming yillar davomida suğorib kelgan; dengizga yetib bormaydi.",
  },
  {
    id: 'chirchiq', name: 'Çirçiq', region: 'uzbekistan', difficulty: 'medium',
    length: '161 km', source: "Çorboğ suv ombori (Tyan-Şan etagi, Toşkent viloyati)", mouth: "Sirdaryo (Çinoz yaqinida)",
    countries: ["Özbekiston"],
    fact: "Toşkent şahrining asosiy suv manbai; Çarvak GESi şu daryoda joylaşgan.",
  },
  {
    id: 'ohangaron', name: 'Ohangaron', region: 'uzbekistan', difficulty: 'medium',
    length: '223 km', source: "Çatqol tizmasi (Toşkent viloyati)", mouth: "Sirdaryo (Bekobod yaqinida)",
    countries: ["Özbekiston"],
    fact: "Angren şahrini suğoradigan daryo; havzasida kömir konlari mavjud.",
  },
  {
    id: 'qashqadaryo', name: "Qaşqadaryo", region: 'uzbekistan', difficulty: 'hard',
    length: '378 km', source: "Zarafşon-Hisor toğlari", mouth: "Qarşi çölida qurib yöqoladi",
    countries: ["Özbekiston"],
    fact: "Şahrisabz va Qarşi şaharlarini suğoradigan daryo; Amir Temurning vatani şu vodiyda.",
  },
  {
    id: 'surxondaryo', name: 'Surxondaryo', region: 'uzbekistan', difficulty: 'hard',
    length: '175 km', source: "Hisor tizmasi (Tojikiston çegarasi)", mouth: "Amudaryo (Termiz yaqinida)",
    countries: ["Özbekiston"],
    fact: "Özbekistonning eng janubidagi viloyat markazi — Termiz şu daryo böyida joylaşgan.",
  },
  {
    id: 'norin', name: 'Norin', region: 'uzbekistan', difficulty: 'hard',
    length: '807 km', source: "Tyan-Şan (Qirğiziston, Xon-Tengri yon bağri)", mouth: "Qoradaryo bilan qöşilib Sirdaryoni hosil qiladi",
    countries: ["Qirğiziston", "Özbekiston"],
    fact: "Sirdaryoning asosiy manbalaridan biri; Toktoğul suv ombori şu daryoda joylaşgan.",
  },
  {
    id: 'qoradaryo', name: 'Qoradaryo', region: 'uzbekistan', difficulty: 'hard',
    length: '180 km', source: "Farğona vodiysi şimoli-şarqi (Qirğiziston)", mouth: "Norin bilan qöşilib Sirdaryoni hosil qiladi",
    countries: ["Qirğiziston", "Özbekiston"],
    fact: "Norin bilan birlaşib Sirdaryoni hosil qiluvçi ikki asosiy irmoqdan biri.",
  },
  {
    id: 'isfayramsoy', name: 'Isfayramsoy', region: 'uzbekistan', difficulty: 'hard',
    length: '130 km', source: "Farğona tizmasi (Qirğiziston)", mouth: "Sirdaryo (Farğona vodiysi)",
    countries: ["Qirğiziston", "Özbekiston"],
    fact: "Farğona vodiysining janubiy qismini suğoradigan kiçik toğ daryosi.",
  },

  // ── MARKAZIY OSIYO ───────────────────────────────────────────────────────
  {
    id: 'ili', name: 'Ili', region: 'centralAsia', difficulty: 'medium',
    length: '1,439 km', source: "Tyan-Şan toğlari (Xitoy, Şarqiy Qozoğiston)", mouth: "Balxaş köli",
    countries: ['Xitoy', "Qozoğiston"],
    fact: "Balxaş kölining asosiy suv manbai; kölning ğarbiy yarmi çuçuk, şarqiy yarmi şör.",
  },
  {
    id: 'chu', name: 'Çu', region: 'centralAsia', difficulty: 'medium',
    length: '1,186 km', source: "Tyan-Şan (Qirğiziston, Issiqköl havzasi)", mouth: "Qozoğiston çölida qurib yöqoladi",
    countries: ["Qirğiziston", "Qozoğiston"],
    fact: "Qirğizistonning poytaxti Bişkek şu daryo böyida joylaşgan.",
  },
  {
    id: 'talas', name: 'Talas', region: 'centralAsia', difficulty: 'medium',
    length: '661 km', source: "Talas Ala-Too tizmasi (Qirğiziston)", mouth: "Qozoğiston çölida qurib yöqoladi",
    countries: ["Qirğiziston", "Qozoğiston"],
    fact: "751-yilda arab va xitoy qöşinlari örtasidagi maşhur Talas jangi şu daryo yonida bölgan.",
  },
  {
    id: 'murghab', name: 'Murghab', region: 'centralAsia', difficulty: 'hard',
    length: '850 km', source: "Hindukuş toğlari (Afğoniston)", mouth: "Marv vohasida qurib yöqoladi (Turkmaniston)",
    countries: ["Afğoniston", 'Turkmaniston'],
    fact: "Qadimiy Marv şahri (Marğiyona) şu daryo böyida joylaşgan bölib, Ipak yölining eng yirik şahriga aylangan.",
  },
  {
    id: 'tedzhen', name: 'Tedzhen (Harirud)', region: 'centralAsia', difficulty: 'hard',
    length: '1,150 km', source: "Hindukuş (Afğoniston, Band-e Bayon toğlari)", mouth: "Qoraqumdagi Tedzhen vohasida yöqoladi",
    countries: ["Afğoniston", 'Eron', 'Turkmaniston'],
    fact: "Herat şahri (Afğoniston) şu daryo böyida joylaşgan; uç davlat hududidan oqib ötadi.",
  },

  // ── DUNYO ────────────────────────────────────────────────────────────────
  {
    id: 'nile', name: 'Nil', region: 'world', difficulty: 'easy',
    length: '6,650 km', source: "Viktoriya köli (Uganda/Tanzaniya)", mouth: "Örta yer dengizi (Misr)",
    countries: ['Uganda', 'Sudan', 'Misr'],
    fact: "Dunyodagi eng uzun daryo; Misr tsivilizatsiyasi şu daryo böyida rivojlangan.",
  },
  {
    id: 'amazon', name: 'Amazonka', region: 'world', difficulty: 'easy',
    length: '6,400 km', source: "Peru Andlari (Nevado Mismi çöqqisi)", mouth: 'Atlantika okeani (Braziliya)',
    countries: ['Peru', 'Kolumbiya', 'Braziliya'],
    fact: "Suv hajmi böyiça dunyodagi eng katta daryo; dunyo çuçuk suvining ~20%ini oqizadi.",
  },
  {
    id: 'yangtze', name: 'Yanszi', region: 'world', difficulty: 'easy',
    length: '6,300 km', source: 'Tibet platosi (Geladandong toği)', mouth: 'Şarqiy Xitoy dengizi (Şanxay yaqinida)',
    countries: ['Xitoy'],
    fact: "Osiyodagi eng uzun daryo; Uç Jar töğoni — dunyodagi eng quvvatli GES — şu daryoda.",
  },
  {
    id: 'mississippi', name: 'Missisipi', region: 'world', difficulty: 'easy',
    length: '3,730 km', source: "Itaska köli (Minnesota, AQŞ)", mouth: "Meksika körfazi (Luiziana)",
    countries: ['AQŞ'],
    fact: "Şimoliy Amerikaning asosiy daryosi; Missuri irmoqi bilan birga 6,275 km ga etadi.",
  },
  {
    id: 'danube', name: 'Dunay', region: 'world', difficulty: 'medium',
    length: '2,860 km', source: "Qora örmon (Baden-Vyurtemberg, Germaniya)", mouth: 'Qora dengiz (Ruminiya)',
    countries: ['Germaniya', 'Avstriya', 'Slovakiya', 'Vengriya', 'Xorvatiya', 'Serbiya', 'Ruminiya', 'Bolgariya'],
    fact: "10 ta davlat hududidan oqib ötadigan, eng köp mamlakat bilan ötadigan daryo.",
  },
  {
    id: 'volga', name: 'Volga', region: 'world', difficulty: 'medium',
    length: '3,530 km', source: "Valday tepaligi (Tver viloyati, Rossiya)", mouth: 'Kaspiy dengizi (Astraxan yaqinida)',
    countries: ['Rossiya'],
    fact: "Yevropaning eng uzun daryosi; Rossiya iqtisodiy hayotining asosiy arteriyasi.",
  },
  {
    id: 'mekong', name: 'Mekong', region: 'world', difficulty: 'medium',
    length: '4,350 km', source: 'Tibet platosi (Lasagongma buloği, Xitoy)', mouth: 'Janubiy Xitoy dengizi (Vyetnam)',
    countries: ['Xitoy', 'Myanma', 'Laos', 'Tailand', 'Kambodja', 'Vyetnam'],
    fact: "Janubi-Şarqiy Osiyoning asosiy daryosi; dunyodagi eng boy içki baliq xilma-xilligiga ega.",
  },
  {
    id: 'ganges', name: 'Gang', region: 'world', difficulty: 'medium',
    length: '2,525 km', source: "Gangotri muzligi (Uttarakxand, Hindiston)", mouth: "Bengal körfazi (Bangladeş)",
    countries: ['Hindiston', 'Bangladeş'],
    fact: "Hindlar uçun muqaddas daryo; havzasida 500 milliondan ortiq kişi yaşaydi.",
  },
  {
    id: 'indus', name: 'Ind', region: 'world', difficulty: 'medium',
    length: '3,180 km', source: "Tibet platosi (Senge Khabab, Xitoy)", mouth: "Arabiston dengizi (Pokiston)",
    countries: ['Xitoy', 'Hindiston', 'Pokiston'],
    fact: "Pokistonning hayot tomirlari; Qadimgi Hind tsivilizatsiyasi miloddan avvalgi 3000-yillarda şu daryoda gullagan.",
  },
  {
    id: 'congo', name: 'Kongo', region: 'world', difficulty: 'hard',
    length: '4,700 km', source: "Lualaba daryosi (Katanga platosi, Kongo DR)", mouth: "Atlantika okeani",
    countries: ['Kongo DR', 'Kongo Respublikasi'],
    fact: "Dunyodagi eng çuqur daryo (315 m); suv sarfi böyiça Amazonkadan keyingi ikkinçi örinda.",
  },
  {
    id: 'rhine', name: 'Reyn', region: 'world', difficulty: 'medium',
    length: '1,230 km', source: "Şveytsariya Alplari (Graubünden kantoni)", mouth: "Şimoliy dengiz (Niderlandiya)",
    countries: ['Şveytsariya', 'Lixtenştayn', 'Avstriya', 'Germaniya', 'Frantsiya', 'Niderlandiya'],
    fact: "Ğarbiy Yevropaning eng muhim savdo daryosi; Rotterdamga yetib keladi.",
  },
  {
    id: 'niger', name: 'Niger', region: 'world', difficulty: 'hard',
    length: '4,200 km', source: "Futa-Jallona toğlari (Gvineya)", mouth: "Gvineya körfazi (Nigeriya)",
    countries: ['Gvineya', 'Mali', 'Niger', 'Benin', 'Nigeriya'],
    fact: "Ğarbiy Afrikaning eng uzun daryosi; Sahara çöliga kirib, yana janubga burqiladi.",
  },
  {
    id: 'ob', name: 'Ob', region: 'world', difficulty: 'hard',
    length: '3,650 km', source: "Biya va Katun qöşilişi (Oltoy, Rossiya)", mouth: "Ob körfazi (Kara dengizi)",
    countries: ['Rossiya'],
    fact: "Irtış bilan birgalikda 5,410 km hosil qiladi — dunyodagi eng uzun daryo tizimllaridan biri.",
  },
  {
    id: 'yenisey', name: 'Yenisey', region: 'world', difficulty: 'hard',
    length: '3,487 km', source: "Kiçik Yenisey (Möğuliston çegarasi, Tuva)", mouth: "Yenisey körfazi (Kara dengizi)",
    countries: ['Rossiya', "Möğuliston"],
    fact: "Suv hajmi böyiça Rossiyaning eng yirik daryosi; Yosib Brodskiy bu daryoga bağişlangan şe'r yozgan.",
  },
  {
    id: 'lena', name: 'Lena', region: 'world', difficulty: 'hard',
    length: '4,400 km', source: "Baykal köli yonidagi toğlar (Irkutsk viloyati)", mouth: "Laptev dengizi (Arktika)",
    countries: ['Rossiya'],
    fact: "Sibir permafrostidan oqib ötadigan eng uzun daryolardan biri; qişi töliq muzlaydi.",
  },
  {
    id: 'parana', name: 'Parana', region: 'world', difficulty: 'hard',
    length: '4,880 km', source: "Braziliya baland tekisligi (Paranaiba va Rio Grande qöşilişi)", mouth: "La-Plata orqali Atlantika okeaniga",
    countries: ['Braziliya', 'Paragvay', 'Argentina'],
    fact: "Janubiy Amerikaning ikkinçi eng uzun daryosi; Itaypu GES — dunyodagi eng quvvatlilardan biri — şu daryoda.",
  },
].map(r => ({ ...r, paths: riverPaths[r.id] || [] }));

export const riverRegions = {
  uzbekistan: { label: "Özbekiston", center: [64, 41], zoom: 6 },
  centralAsia: { label: 'Markaziy Osiyo', center: [68, 42], zoom: 3 },
  world: { label: 'Dunyo', center: [20, 15], zoom: 1 },
};
