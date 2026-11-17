import riverPaths from './riversGeo.json';

export const rivers = [
  // ── OʻZBEKISTON ──────────────────────────────────────────────────────────
  {
    id: 'amudarya', name: 'Amudaryo', region: 'uzbekistan', difficulty: 'easy',
    length: '2,540 km', source: "Pomir togʻlari (Vaxsh va Panj qoʻshilishi)", mouth: 'Orol dengizi',
    countries: ['Tojikiston', "Afgʻoniston", "Oʻzbekiston", 'Turkmaniston'],
    fact: "Markaziy Osiyoning eng suvli daryosi; hajmi jihatidan Orolga yetib bormaydi.",
  },
  {
    id: 'syrdarya', name: 'Sirdaryo', region: 'uzbekistan', difficulty: 'easy',
    length: '2,212 km', source: "Norin va Qoradaryo qoʻshilishi (Tyan-Shan, Fargʻona vodiysi)", mouth: "Orol dengizi (Shimoliy Orol)",
    countries: ["Qirgʻiziston", "Oʻzbekiston", 'Tojikiston', "Qozogʻiston"],
    fact: "Markaziy Osiyoning ikkinchi eng uzun daryosi; Fargʻona vodiysini sugʻoradi.",
  },
  {
    id: 'zarafshon', name: 'Zarafshon', region: 'uzbekistan', difficulty: 'medium',
    length: '877 km', source: "Zarafshon muzligi (Tojikiston, Turkiston tizmasi)", mouth: "Qorakoʻl vohasida qurib yoʻqoladi",
    countries: ['Tojikiston', "Oʻzbekiston"],
    fact: "Samarqand va Buxoroni ming yillar davomida sugʻorib kelgan; dengizga yetib bormaydi.",
  },
  {
    id: 'chirchiq', name: 'Chirchiq', region: 'uzbekistan', difficulty: 'medium',
    length: '161 km', source: "Chorbogʻ suv ombori (Tyan-Shan etagi, Toshkent viloyati)", mouth: "Sirdaryo (Chinoz yaqinida)",
    countries: ["Oʻzbekiston"],
    fact: "Toshkent shahrining asosiy suv manbai; Charvak GESi shu daryoda joylashgan.",
  },
  {
    id: 'ohangaron', name: 'Ohangaron', region: 'uzbekistan', difficulty: 'medium',
    length: '223 km', source: "Chatqol tizmasi (Toshkent viloyati)", mouth: "Sirdaryo (Bekobod yaqinida)",
    countries: ["Oʻzbekiston"],
    fact: "Angren shahrini sugʻoradigan daryo; havzasida koʻmir konlari mavjud.",
  },
  {
    id: 'qashqadaryo', name: "Qashqadaryo", region: 'uzbekistan', difficulty: 'hard',
    length: '378 km', source: "Zarafshon-Hisor togʻlari", mouth: "Qarshi choʻlida qurib yoʻqoladi",
    countries: ["Oʻzbekiston"],
    fact: "Shahrisabz va Qarshi shaharlarini sugʻoradigan daryo; Amir Temurning vatani shu vodiyda.",
  },
  {
    id: 'surxondaryo', name: 'Surxondaryo', region: 'uzbekistan', difficulty: 'hard',
    length: '175 km', source: "Hisor tizmasi (Tojikiston chegarasi)", mouth: "Amudaryo (Termiz yaqinida)",
    countries: ["Oʻzbekiston"],
    fact: "Oʻzbekistonning eng janubidagi viloyat markazi — Termiz shu daryo boʻyida joylashgan.",
  },
  {
    id: 'norin', name: 'Norin', region: 'uzbekistan', difficulty: 'hard',
    length: '807 km', source: "Tyan-Shan (Qirgʻiziston, Xon-Tengri yon bagʻri)", mouth: "Qoradaryo bilan qoʻshilib Sirdaryoni hosil qiladi",
    countries: ["Qirgʻiziston", "Oʻzbekiston"],
    fact: "Sirdaryoning asosiy manbalaridan biri; Toktogʻul suv ombori shu daryoda joylashgan.",
  },
  {
    id: 'qoradaryo', name: 'Qoradaryo', region: 'uzbekistan', difficulty: 'hard',
    length: '180 km', source: "Fargʻona vodiysi shimoli-sharqi (Qirgʻiziston)", mouth: "Norin bilan qoʻshilib Sirdaryoni hosil qiladi",
    countries: ["Qirgʻiziston", "Oʻzbekiston"],
    fact: "Norin bilan birlashib Sirdaryoni hosil qiluvchi ikki asosiy irmoqdan biri.",
  },
  {
    id: 'isfayramsoy', name: 'Isfayramsoy', region: 'uzbekistan', difficulty: 'hard',
    length: '130 km', source: "Fargʻona tizmasi (Qirgʻiziston)", mouth: "Sirdaryo (Fargʻona vodiysi)",
    countries: ["Qirgʻiziston", "Oʻzbekiston"],
    fact: "Fargʻona vodiysining janubiy qismini sugʻoradigan kichik togʻ daryosi.",
  },

  // ── MARKAZIY OSIYO ───────────────────────────────────────────────────────
  {
    id: 'ili', name: 'Ili', region: 'centralAsia', difficulty: 'medium',
    length: '1,439 km', source: "Tyan-Shan togʻlari (Xitoy, Sharqiy Qozogʻiston)", mouth: "Balxash koʻli",
    countries: ['Xitoy', "Qozogʻiston"],
    fact: "Balxash koʻlining asosiy suv manbai; koʻlning gʻarbiy yarmi chuchuk, sharqiy yarmi shoʻr.",
  },
  {
    id: 'chu', name: 'Chu', region: 'centralAsia', difficulty: 'medium',
    length: '1,186 km', source: "Tyan-Shan (Qirgʻiziston, Issiqkoʻl havzasi)", mouth: "Qozogʻiston choʻlida qurib yoʻqoladi",
    countries: ["Qirgʻiziston", "Qozogʻiston"],
    fact: "Qirgʻizistonning poytaxti Bishkek shu daryo boʻyida joylashgan.",
  },
  {
    id: 'talas', name: 'Talas', region: 'centralAsia', difficulty: 'medium',
    length: '661 km', source: "Talas Ala-Too tizmasi (Qirgʻiziston)", mouth: "Qozogʻiston choʻlida qurib yoʻqoladi",
    countries: ["Qirgʻiziston", "Qozogʻiston"],
    fact: "751-yilda arab va xitoy qoʻshinlari oʻrtasidagi mashhur Talas jangi shu daryo yonida boʻlgan.",
  },
  {
    id: 'murghab', name: 'Murghab', region: 'centralAsia', difficulty: 'hard',
    length: '850 km', source: "Hindukush togʻlari (Afgʻoniston)", mouth: "Marv vohasida qurib yoʻqoladi (Turkmaniston)",
    countries: ["Afgʻoniston", 'Turkmaniston'],
    fact: "Qadimiy Marv shahri (Margʻiyona) shu daryo boʻyida joylashgan boʻlib, Ipak yoʻlining eng yirik shahriga aylangan.",
  },
  {
    id: 'tedzhen', name: 'Tedzhen (Harirud)', region: 'centralAsia', difficulty: 'hard',
    length: '1,150 km', source: "Hindukush (Afgʻoniston, Band-e Bayon togʻlari)", mouth: "Qoraqumdagi Tedzhen vohasida yoʻqoladi",
    countries: ["Afgʻoniston", 'Eron', 'Turkmaniston'],
    fact: "Herat shahri (Afgʻoniston) shu daryo boʻyida joylashgan; uch davlat hududidan oqib oʻtadi.",
  },

  // ── DUNYO ────────────────────────────────────────────────────────────────
  {
    id: 'nile', name: 'Nil', region: 'world', difficulty: 'easy',
    length: '6,650 km', source: "Viktoriya koʻli (Uganda/Tanzaniya)", mouth: "Oʻrta yer dengizi (Misr)",
    countries: ['Uganda', 'Sudan', 'Misr'],
    fact: "Dunyodagi eng uzun daryo; Misr tsivilizatsiyasi shu daryo boʻyida rivojlangan.",
  },
  {
    id: 'amazon', name: 'Amazonka', region: 'world', difficulty: 'easy',
    length: '6,400 km', source: "Peru Andlari (Nevado Mismi choʻqqisi)", mouth: 'Atlantika okeani (Braziliya)',
    countries: ['Peru', 'Kolumbiya', 'Braziliya'],
    fact: "Suv hajmi boʻyicha dunyodagi eng katta daryo; dunyo chuchuk suvining ~20%ini oqizadi.",
  },
  {
    id: 'yangtze', name: 'Yanszi', region: 'world', difficulty: 'easy',
    length: '6,300 km', source: 'Tibet platosi (Geladandong togʻi)', mouth: 'Sharqiy Xitoy dengizi (Shanxay yaqinida)',
    countries: ['Xitoy'],
    fact: "Osiyodagi eng uzun daryo; Uch Jar toʻgʻoni — dunyodagi eng quvvatli GES — shu daryoda.",
  },
  {
    id: 'mississippi', name: 'Missisipi', region: 'world', difficulty: 'easy',
    length: '3,730 km', source: "Itaska koʻli (Minnesota, AQSH)", mouth: "Meksika koʻrfazi (Luiziana)",
    countries: ['AQSH'],
    fact: "Shimoliy Amerikaning asosiy daryosi; Missuri irmoqi bilan birga 6,275 km ga etadi.",
  },
  {
    id: 'danube', name: 'Dunay', region: 'world', difficulty: 'medium',
    length: '2,860 km', source: "Qora oʻrmon (Baden-Vyurtemberg, Germaniya)", mouth: 'Qora dengiz (Ruminiya)',
    countries: ['Germaniya', 'Avstriya', 'Slovakiya', 'Vengriya', 'Xorvatiya', 'Serbiya', 'Ruminiya', 'Bolgariya'],
    fact: "10 ta davlat hududidan oqib oʻtadigan, eng koʻp mamlakat bilan oʻtadigan daryo.",
  },
  {
    id: 'volga', name: 'Volga', region: 'world', difficulty: 'medium',
    length: '3,530 km', source: "Valday tepaligi (Tver viloyati, Rossiya)", mouth: 'Kaspiy dengizi (Astraxan yaqinida)',
    countries: ['Rossiya'],
    fact: "Yevropaning eng uzun daryosi; Rossiya iqtisodiy hayotining asosiy arteriyasi.",
  },
  {
    id: 'mekong', name: 'Mekong', region: 'world', difficulty: 'medium',
    length: '4,350 km', source: 'Tibet platosi (Lasagongma bulogʻi, Xitoy)', mouth: 'Janubiy Xitoy dengizi (Vyetnam)',
    countries: ['Xitoy', 'Myanma', 'Laos', 'Tailand', 'Kambodja', 'Vyetnam'],
    fact: "Janubi-Sharqiy Osiyoning asosiy daryosi; dunyodagi eng boy ichki baliq xilma-xilligiga ega.",
  },
  {
    id: 'ganges', name: 'Gang', region: 'world', difficulty: 'medium',
    length: '2,525 km', source: "Gangotri muzligi (Uttarakxand, Hindiston)", mouth: "Bengal koʻrfazi (Bangladesh)",
    countries: ['Hindiston', 'Bangladesh'],
    fact: "Hindlar uchun muqaddas daryo; havzasida 500 milliondan ortiq kishi yashaydi.",
  },
  {
    id: 'indus', name: 'Ind', region: 'world', difficulty: 'medium',
    length: '3,180 km', source: "Tibet platosi (Senge Khabab, Xitoy)", mouth: "Arabiston dengizi (Pokiston)",
    countries: ['Xitoy', 'Hindiston', 'Pokiston'],
    fact: "Pokistonning hayot tomirlari; Qadimgi Hind tsivilizatsiyasi miloddan avvalgi 3000-yillarda shu daryoda gullagan.",
  },
  {
    id: 'congo', name: 'Kongo', region: 'world', difficulty: 'hard',
    length: '4,700 km', source: "Lualaba daryosi (Katanga platosi, Kongo DR)", mouth: "Atlantika okeani",
    countries: ['Kongo DR', 'Kongo Respublikasi'],
    fact: "Dunyodagi eng chuqur daryo (315 m); suv sarfi boʻyicha Amazonkadan keyingi ikkinchi oʻrinda.",
  },
  {
    id: 'rhine', name: 'Reyn', region: 'world', difficulty: 'medium',
    length: '1,230 km', source: "Shveytsariya Alplari (Graubünden kantoni)", mouth: "Shimoliy dengiz (Niderlandiya)",
    countries: ['Shveytsariya', 'Lixtenshtayn', 'Avstriya', 'Germaniya', 'Frantsiya', 'Niderlandiya'],
    fact: "Gʻarbiy Yevropaning eng muhim savdo daryosi; Rotterdamga yetib keladi.",
  },
  {
    id: 'niger', name: 'Niger', region: 'world', difficulty: 'hard',
    length: '4,200 km', source: "Futa-Jallona togʻlari (Gvineya)", mouth: "Gvineya koʻrfazi (Nigeriya)",
    countries: ['Gvineya', 'Mali', 'Niger', 'Benin', 'Nigeriya'],
    fact: "Gʻarbiy Afrikaning eng uzun daryosi; Sahara choʻliga kirib, yana janubga burqiladi.",
  },
  {
    id: 'ob', name: 'Ob', region: 'world', difficulty: 'hard',
    length: '3,650 km', source: "Biya va Katun qoʻshilishi (Oltoy, Rossiya)", mouth: "Ob koʻrfazi (Kara dengizi)",
    countries: ['Rossiya'],
    fact: "Irtısh bilan birgalikda 5,410 km hosil qiladi — dunyodagi eng uzun daryo tizimllaridan biri.",
  },
  {
    id: 'yenisey', name: 'Yenisey', region: 'world', difficulty: 'hard',
    length: '3,487 km', source: "Kichik Yenisey (Moʻgʻuliston chegarasi, Tuva)", mouth: "Yenisey koʻrfazi (Kara dengizi)",
    countries: ['Rossiya', "Moʻgʻuliston"],
    fact: "Suv hajmi boʻyicha Rossiyaning eng yirik daryosi; Yosib Brodskiy bu daryoga bagʻishlangan she'r yozgan.",
  },
  {
    id: 'lena', name: 'Lena', region: 'world', difficulty: 'hard',
    length: '4,400 km', source: "Baykal koʻli yonidagi togʻlar (Irkutsk viloyati)", mouth: "Laptev dengizi (Arktika)",
    countries: ['Rossiya'],
    fact: "Sibir permafrostidan oqib oʻtadigan eng uzun daryolardan biri; qishi toʻliq muzlaydi.",
  },
  {
    id: 'parana', name: 'Parana', region: 'world', difficulty: 'hard',
    length: '4,880 km', source: "Braziliya baland tekisligi (Paranaiba va Rio Grande qoʻshilishi)", mouth: "La-Plata orqali Atlantika okeaniga",
    countries: ['Braziliya', 'Paragvay', 'Argentina'],
    fact: "Janubiy Amerikaning ikkinchi eng uzun daryosi; Itaypu GES — dunyodagi eng quvvatlilardan biri — shu daryoda.",
  },
].map(r => ({ ...r, paths: riverPaths[r.id] || [] }));

export const riverRegions = {
  uzbekistan: { label: "Oʻzbekiston", center: [64, 41], zoom: 6 },
  centralAsia: { label: 'Markaziy Osiyo', center: [68, 42], zoom: 3 },
  world: { label: 'Dunyo', center: [20, 15], zoom: 1 },
};
