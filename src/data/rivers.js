import riverPaths from './riversGeo.json';

export const rivers = [
  // ── O'ZBEKISTON ──────────────────────────────────────────────────────────
  {
    id: 'amudarya', name: 'Amudaryo', region: 'uzbekistan', difficulty: 'easy',
    length: '2,540 km', source: "Pomir tog'lari (Vaxsh va Panj qo'shilishi)", mouth: 'Orol dengizi',
    countries: ['Tojikiston', "Afg'oniston", "O'zbekiston", 'Turkmaniston'],
    fact: "Markaziy Osiyoning eng suvli daryosi; hajmi jihatidan Orolga yetib bormaydi.",
  },
  {
    id: 'syrdarya', name: 'Sirdaryo', region: 'uzbekistan', difficulty: 'easy',
    length: '2,212 km', source: "Norin va Qoradaryo qo'shilishi (Tyan-Shan, Farg'ona vodiysi)", mouth: "Orol dengizi (Shimoliy Orol)",
    countries: ["Qirg'iziston", "O'zbekiston", 'Tojikiston', "Qozog'iston"],
    fact: "Markaziy Osiyoning ikkinchi eng uzun daryosi; Farg'ona vodiysini sug'oradi.",
  },
  {
    id: 'zarafshon', name: 'Zarafshon', region: 'uzbekistan', difficulty: 'medium',
    length: '877 km', source: "Zarafshon muzligi (Tojikiston, Turkiston tizmasi)", mouth: "Qorako'l vohasida qurib yo'qoladi",
    countries: ['Tojikiston', "O'zbekiston"],
    fact: "Samarqand va Buxoroni ming yillar davomida sug'orib kelgan; dengizga yetib bormaydi.",
  },
  {
    id: 'chirchiq', name: 'Chirchiq', region: 'uzbekistan', difficulty: 'medium',
    length: '161 km', source: "Chorbog' suv ombori (Tyan-Shan etagi, Toshkent viloyati)", mouth: "Sirdaryo (Chinoz yaqinida)",
    countries: ["O'zbekiston"],
    fact: "Toshkent shahrining asosiy suv manbai; Charvak GESi shu daryoda joylashgan.",
  },
  {
    id: 'ohangaron', name: 'Ohangaron', region: 'uzbekistan', difficulty: 'medium',
    length: '223 km', source: "Chatqol tizmasi (Toshkent viloyati)", mouth: "Sirdaryo (Bekobod yaqinida)",
    countries: ["O'zbekiston"],
    fact: "Angren shahrini sug'oradigan daryo; havzasida ko'mir konlari mavjud.",
  },
  {
    id: 'qashqadaryo', name: "Qashqadaryo", region: 'uzbekistan', difficulty: 'hard',
    length: '378 km', source: "Zarafshon-Hisor tog'lari", mouth: "Qarshi cho'lida qurib yo'qoladi",
    countries: ["O'zbekiston"],
    fact: "Shahrisabz va Qarshi shaharlarini sug'oradigan daryo; Amir Temurning vatani shu vodiyda.",
  },
  {
    id: 'surxondaryo', name: 'Surxondaryo', region: 'uzbekistan', difficulty: 'hard',
    length: '175 km', source: "Hisor tizmasi (Tojikiston chegarasi)", mouth: "Amudaryo (Termiz yaqinida)",
    countries: ["O'zbekiston"],
    fact: "O'zbekistonning eng janubidagi viloyat markazi — Termiz shu daryo bo'yida joylashgan.",
  },
  {
    id: 'norin', name: 'Norin', region: 'uzbekistan', difficulty: 'hard',
    length: '807 km', source: "Tyan-Shan (Qirg'iziston, Xon-Tengri yon bag'ri)", mouth: "Qoradaryo bilan qo'shilib Sirdaryoni hosil qiladi",
    countries: ["Qirg'iziston", "O'zbekiston"],
    fact: "Sirdaryoning asosiy manbalaridan biri; Toktog'ul suv ombori shu daryoda joylashgan.",
  },
  {
    id: 'qoradaryo', name: 'Qoradaryo', region: 'uzbekistan', difficulty: 'hard',
    length: '180 km', source: "Farg'ona vodiysi shimoli-sharqi (Qirg'iziston)", mouth: "Norin bilan qo'shilib Sirdaryoni hosil qiladi",
    countries: ["Qirg'iziston", "O'zbekiston"],
    fact: "Norin bilan birlashib Sirdaryoni hosil qiluvchi ikki asosiy irmoqdan biri.",
  },
  {
    id: 'isfayramsoy', name: 'Isfayramsoy', region: 'uzbekistan', difficulty: 'hard',
    length: '130 km', source: "Farg'ona tizmasi (Qirg'iziston)", mouth: "Sirdaryo (Farg'ona vodiysi)",
    countries: ["Qirg'iziston", "O'zbekiston"],
    fact: "Farg'ona vodiysining janubiy qismini sug'oradigan kichik tog' daryosi.",
  },

  // ── MARKAZIY OSIYO ───────────────────────────────────────────────────────
  {
    id: 'ili', name: 'Ili', region: 'centralAsia', difficulty: 'medium',
    length: '1,439 km', source: "Tyan-Shan tog'lari (Xitoy, Sharqiy Qozog'iston)", mouth: "Balxash ko'li",
    countries: ['Xitoy', "Qozog'iston"],
    fact: "Balxash ko'lining asosiy suv manbai; ko'lning g'arbiy yarmi chuchuk, sharqiy yarmi sho'r.",
  },
  {
    id: 'chu', name: 'Chu', region: 'centralAsia', difficulty: 'medium',
    length: '1,186 km', source: "Tyan-Shan (Qirg'iziston, Issiqko'l havzasi)", mouth: "Qozog'iston cho'lida qurib yo'qoladi",
    countries: ["Qirg'iziston", "Qozog'iston"],
    fact: "Qirg'izistonning poytaxti Bishkek shu daryo bo'yida joylashgan.",
  },
  {
    id: 'talas', name: 'Talas', region: 'centralAsia', difficulty: 'medium',
    length: '661 km', source: "Talas Ala-Too tizmasi (Qirg'iziston)", mouth: "Qozog'iston cho'lida qurib yo'qoladi",
    countries: ["Qirg'iziston", "Qozog'iston"],
    fact: "751-yilda arab va xitoy qo'shinlari o'rtasidagi mashhur Talas jangi shu daryo yonida bo'lgan.",
  },
  {
    id: 'murghab', name: 'Murghab', region: 'centralAsia', difficulty: 'hard',
    length: '850 km', source: "Hindukush tog'lari (Afg'oniston)", mouth: "Marv vohasida qurib yo'qoladi (Turkmaniston)",
    countries: ["Afg'oniston", 'Turkmaniston'],
    fact: "Qadimiy Marv shahri (Marg'iyona) shu daryo bo'yida joylashgan bo'lib, Ipak yo'lining eng yirik shahriga aylangan.",
  },
  {
    id: 'tedzhen', name: 'Tedzhen (Harirud)', region: 'centralAsia', difficulty: 'hard',
    length: '1,150 km', source: "Hindukush (Afg'oniston, Band-e Bayon tog'lari)", mouth: "Qoraqumdagi Tedzhen vohasida yo'qoladi",
    countries: ["Afg'oniston", 'Eron', 'Turkmaniston'],
    fact: "Herat shahri (Afg'oniston) shu daryo bo'yida joylashgan; uch davlat hududidan oqib o'tadi.",
  },

  // ── DUNYO ────────────────────────────────────────────────────────────────
  {
    id: 'nile', name: 'Nil', region: 'world', difficulty: 'easy',
    length: '6,650 km', source: "Viktoriya ko'li (Uganda/Tanzaniya)", mouth: "O'rta yer dengizi (Misr)",
    countries: ['Uganda', 'Sudan', 'Misr'],
    fact: "Dunyodagi eng uzun daryo; Misr tsivilizatsiyasi shu daryo bo'yida rivojlangan.",
  },
  {
    id: 'amazon', name: 'Amazonka', region: 'world', difficulty: 'easy',
    length: '6,400 km', source: "Peru Andlari (Nevado Mismi cho'qqisi)", mouth: 'Atlantika okeani (Braziliya)',
    countries: ['Peru', 'Kolumbiya', 'Braziliya'],
    fact: "Suv hajmi bo'yicha dunyodagi eng katta daryo; dunyo chuchuk suvining ~20%ini oqizadi.",
  },
  {
    id: 'yangtze', name: 'Yanszi', region: 'world', difficulty: 'easy',
    length: '6,300 km', source: 'Tibet platosi (Geladandong tog\'i)', mouth: 'Sharqiy Xitoy dengizi (Shanxay yaqinida)',
    countries: ['Xitoy'],
    fact: "Osiyodagi eng uzun daryo; Uch Jar to'g'oni — dunyodagi eng quvvatli GES — shu daryoda.",
  },
  {
    id: 'mississippi', name: 'Missisipi', region: 'world', difficulty: 'easy',
    length: '3,730 km', source: "Itaska ko'li (Minnesota, AQSH)", mouth: "Meksika ko'rfazi (Luiziana)",
    countries: ['AQSH'],
    fact: "Shimoliy Amerikaning asosiy daryosi; Missuri irmoqi bilan birga 6,275 km ga etadi.",
  },
  {
    id: 'danube', name: 'Dunay', region: 'world', difficulty: 'medium',
    length: '2,860 km', source: "Qora o'rmon (Baden-Vyurtemberg, Germaniya)", mouth: 'Qora dengiz (Ruminiya)',
    countries: ['Germaniya', 'Avstriya', 'Slovakiya', 'Vengriya', 'Xorvatiya', 'Serbiya', 'Ruminiya', 'Bolgariya'],
    fact: "10 ta davlat hududidan oqib o'tadigan, eng ko'p mamlakat bilan o'tadigan daryo.",
  },
  {
    id: 'volga', name: 'Volga', region: 'world', difficulty: 'medium',
    length: '3,530 km', source: "Valday tepaligi (Tver viloyati, Rossiya)", mouth: 'Kaspiy dengizi (Astraxan yaqinida)',
    countries: ['Rossiya'],
    fact: "Yevropaning eng uzun daryosi; Rossiya iqtisodiy hayotining asosiy arteriyasi.",
  },
  {
    id: 'mekong', name: 'Mekong', region: 'world', difficulty: 'medium',
    length: '4,350 km', source: 'Tibet platosi (Lasagongma bulog\'i, Xitoy)', mouth: 'Janubiy Xitoy dengizi (Vyetnam)',
    countries: ['Xitoy', 'Myanma', 'Laos', 'Tailand', 'Kambodja', 'Vyetnam'],
    fact: "Janubi-Sharqiy Osiyoning asosiy daryosi; dunyodagi eng boy ichki baliq xilma-xilligiga ega.",
  },
  {
    id: 'ganges', name: 'Gang', region: 'world', difficulty: 'medium',
    length: '2,525 km', source: "Gangotri muzligi (Uttarakxand, Hindiston)", mouth: "Bengal ko'rfazi (Bangladesh)",
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
    fact: "Dunyodagi eng chuqur daryo (315 m); suv sarfi bo'yicha Amazonkadan keyingi ikkinchi o'rinda.",
  },
  {
    id: 'rhine', name: 'Reyn', region: 'world', difficulty: 'medium',
    length: '1,230 km', source: "Shveytsariya Alplari (Graubünden kantoni)", mouth: "Shimoliy dengiz (Niderlandiya)",
    countries: ['Shveytsariya', 'Lixtenshtayn', 'Avstriya', 'Germaniya', 'Frantsiya', 'Niderlandiya'],
    fact: "G'arbiy Yevropaning eng muhim savdo daryosi; Rotterdamga yetib keladi.",
  },
  {
    id: 'niger', name: 'Niger', region: 'world', difficulty: 'hard',
    length: '4,200 km', source: "Futa-Jallona tog'lari (Gvineya)", mouth: "Gvineya ko'rfazi (Nigeriya)",
    countries: ['Gvineya', 'Mali', 'Niger', 'Benin', 'Nigeriya'],
    fact: "G'arbiy Afrikaning eng uzun daryosi; Sahara cho'liga kirib, yana janubga burqiladi.",
  },
  {
    id: 'ob', name: 'Ob', region: 'world', difficulty: 'hard',
    length: '3,650 km', source: "Biya va Katun qo'shilishi (Oltoy, Rossiya)", mouth: "Ob ko'rfazi (Kara dengizi)",
    countries: ['Rossiya'],
    fact: "Iртiш bilan birgalikda 5,410 km hosil qiladi — dunyodagi eng uzun daryo tizimllaridan biri.",
  },
  {
    id: 'yenisey', name: 'Yenisey', region: 'world', difficulty: 'hard',
    length: '3,487 km', source: "Kichik Yenisey (Mo'g'uliston chegarasi, Tuva)", mouth: "Yenisey ko'rfazi (Kara dengizi)",
    countries: ['Rossiya', "Mo'g'uliston"],
    fact: "Suv hajmi bo'yicha Rossiyaning eng yirik daryosi; Yosib Brodskiy bu daryoga bag'ishlangan she'r yozgan.",
  },
  {
    id: 'lena', name: 'Lena', region: 'world', difficulty: 'hard',
    length: '4,400 km', source: "Baykal ko'li yonidagi tog'lar (Irkutsk viloyati)", mouth: "Laptev dengizi (Arktika)",
    countries: ['Rossiya'],
    fact: "Sibir permafrostidan oqib o'tadigan eng uzun daryolardan biri; qishi to'liq muzlaydi.",
  },
  {
    id: 'parana', name: 'Parana', region: 'world', difficulty: 'hard',
    length: '4,880 km', source: "Braziliya baland tekisligi (Paranaiba va Rio Grande qo'shilishi)", mouth: "La-Plata orqali Atlantika okeaniga",
    countries: ['Braziliya', 'Paragvay', 'Argentina'],
    fact: "Janubiy Amerikaning ikkinchi eng uzun daryosi; Itaypu GES — dunyodagi eng quvvatlilardan biri — shu daryoda.",
  },
].map(r => ({ ...r, paths: riverPaths[r.id] || [] }));

export const riverRegions = {
  uzbekistan: { label: "O'zbekiston", center: [64, 41], zoom: 6 },
  centralAsia: { label: 'Markaziy Osiyo', center: [68, 42], zoom: 3 },
  world: { label: 'Dunyo', center: [20, 15], zoom: 1 },
};
