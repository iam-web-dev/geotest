import riverPaths from './riversGeo.json';

// Modular river dataset. Each entry: real GIS path (from Natural Earth 10m rivers_lake_centerlines)
// plus factual metadata. New rivers can be added here later without touching game logic —
// just add a `paths` entry in riversGeo.json (or via the same extraction pipeline) and a
// matching object below.
export const rivers = [
  {
    id: 'amudarya', name: 'Amudaryo', region: 'uzbekistan', difficulty: 'easy',
    length: '2,400 km', source: 'Pomir tog\'lari (Panj daryosi)', mouth: 'Orol dengizi',
    countries: ['Tojikiston', "Afg'oniston", "O'zbekiston", 'Turkmaniston'],
    fact: "Markaziy Osiyoning eng suvli daryosi, ammo endi deyarli Orolga yetib bormaydi.",
  },
  {
    id: 'syrdarya', name: 'Sirdaryo', region: 'uzbekistan', difficulty: 'easy',
    length: '2,212 km', source: "Norin va Qoradaryo qo'shilishi (Tyan-Shan)", mouth: 'Orol dengizi',
    countries: ["Qirg'iziston", "O'zbekiston", 'Tojikiston', "Qozog'iston"],
    fact: "Farg'ona vodiysidan boshlanib, Qozog'istongacha oqadi.",
  },
  {
    id: 'zarafshon', name: 'Zarafshon', region: 'uzbekistan', difficulty: 'medium',
    length: '877 km', source: 'Zarafshon muzligi (Tojikiston)', mouth: "Qorako'l vohasida yo'qoladi",
    countries: ['Tojikiston', "O'zbekiston"],
    fact: "Samarqand va Buxoroni sug'oradigan hayotbaxsh daryo, dengizga yetib bormaydi.",
  },
  {
    id: 'ili', name: 'Ili', region: 'centralAsia', difficulty: 'hard',
    length: '1,439 km', source: 'Tyan-Shan tog\'lari (Xitoy hududi)', mouth: 'Balxash ko\'li',
    countries: ['Xitoy', "Qozog'iston"],
    fact: "Balxash ko'lining asosiy suv manbai hisoblanadi.",
  },
  {
    id: 'nile', name: 'Nil', region: 'world', difficulty: 'easy',
    length: '6,650 km', source: "Viktoriya ko'li havzasi", mouth: "O'rta yer dengizi",
    countries: ['Misr', 'Sudan', 'Efiopiya', 'Uganda'],
    fact: "Dunyodagi eng uzun daryolardan biri hisoblanadi.",
  },
  {
    id: 'amazon', name: 'Amazonka', region: 'world', difficulty: 'easy',
    length: '6,400 km', source: 'Peru Andlari', mouth: 'Atlantika okeani',
    countries: ['Peru', 'Kolumbiya', 'Braziliya'],
    fact: "Suv sarfi bo'yicha dunyodagi eng katta daryo.",
  },
  {
    id: 'yangtze', name: 'Yanszi', region: 'world', difficulty: 'easy',
    length: '6,300 km', source: 'Tibet platosi', mouth: 'Sharqiy Xitoy dengizi',
    countries: ['Xitoy'],
    fact: "Osiyodagi eng uzun daryo.",
  },
  {
    id: 'mississippi', name: 'Missisipi', region: 'world', difficulty: 'easy',
    length: '3,730 km', source: "Itaska ko'li (Minnesota)", mouth: 'Meksika ko\'rfazi',
    countries: ['AQSH'],
    fact: "Shimoliy Amerikaning eng katta daryo tizimi.",
  },
  {
    id: 'danube', name: 'Dunay', region: 'world', difficulty: 'medium',
    length: '2,850 km', source: "Qora o'rmon (Germaniya)", mouth: 'Qora dengiz',
    countries: ['Germaniya', 'Avstriya', 'Vengriya', 'Ruminiya'],
    fact: "Eng ko'p davlat hududidan oqib o'tadigan daryo.",
  },
  {
    id: 'volga', name: 'Volga', region: 'world', difficulty: 'medium',
    length: '3,530 km', source: 'Valday tepaligi', mouth: 'Kaspiy dengizi',
    countries: ['Rossiya'],
    fact: "Yevropaning eng uzun daryosi.",
  },
  {
    id: 'mekong', name: 'Mekong', region: 'world', difficulty: 'medium',
    length: '4,350 km', source: 'Tibet platosi', mouth: 'Janubiy Xitoy dengizi',
    countries: ['Xitoy', 'Laos', 'Tailand', 'Kambodja', 'Vyetnam'],
    fact: "Janubi-Sharqiy Osiyoning asosiy hayot manbai.",
  },
  {
    id: 'ganges', name: 'Gang', region: 'world', difficulty: 'medium',
    length: '2,525 km', source: 'Gangotri muzligi (Himolay)', mouth: 'Bengal ko\'rfazi',
    countries: ['Hindiston', 'Bangladesh'],
    fact: "Hindular uchun muqaddas hisoblangan daryo.",
  },
  {
    id: 'indus', name: 'Ind', region: 'world', difficulty: 'medium',
    length: '3,180 km', source: 'Tibet platosi', mouth: 'Arabiston dengizi',
    countries: ['Xitoy', 'Hindiston', 'Pokiston'],
    fact: "Qadimiy Hind-Ariy tsivilizatsiyasi shu daryo bo'yida rivojlangan.",
  },
  {
    id: 'congo', name: 'Kongo', region: 'world', difficulty: 'hard',
    length: '4,700 km', source: 'Markaziy Afrika baland tekisligi', mouth: 'Atlantika okeani',
    countries: ['DR Kongo', 'Kongo Respublikasi'],
    fact: "Chuqurligi bo'yicha dunyodagi eng chuqur daryo.",
  },
  {
    id: 'rhine', name: 'Reyn', region: 'world', difficulty: 'medium',
    length: '1,230 km', source: 'Shveytsariya Alp tog\'lari', mouth: 'Shimoliy dengiz',
    countries: ['Shveytsariya', 'Germaniya', 'Niderlandiya'],
    fact: "Yevropaning eng muhim savdo daryolaridan biri.",
  },
  {
    id: 'niger', name: 'Niger', region: 'world', difficulty: 'hard',
    length: '4,200 km', source: "Gvineya tog'lari", mouth: 'Gvineya ko\'rfazi',
    countries: ['Gvineya', 'Mali', 'Niger', 'Nigeriya'],
    fact: "G'arbiy Afrikaning asosiy daryosi.",
  },
  {
    id: 'ob', name: 'Ob', region: 'world', difficulty: 'hard',
    length: '3,650 km', source: "Oltoy tog'lari", mouth: 'Ob ko\'rfazi',
    countries: ['Rossiya'],
    fact: "Rossiyaning eng katta daryo havzalaridan biri.",
  },
  {
    id: 'yenisey', name: 'Yenisey', region: 'world', difficulty: 'hard',
    length: '3,487 km', source: "Tyva tog'lari", mouth: 'Yenisey ko\'rfazi',
    countries: ['Rossiya', "Mo'g'uliston"],
    fact: "Suv hajmi bo'yicha Rossiyaning eng yirik daryosi.",
  },
  {
    id: 'lena', name: 'Lena', region: 'world', difficulty: 'hard',
    length: '4,400 km', source: 'Baykal tog\'lari yaqinida', mouth: 'Laptev dengizi',
    countries: ['Rossiya'],
    fact: "To'liq muzlab qoladigan eng uzun daryolardan biri.",
  },
  {
    id: 'parana', name: 'Parana', region: 'world', difficulty: 'hard',
    length: '4,880 km', source: 'Braziliya baland tekisligi', mouth: 'La-Plata orqali Atlantikaga',
    countries: ['Braziliya', 'Paragvay', 'Argentina'],
    fact: "Janubiy Amerikaning ikkinchi eng uzun daryosi.",
  },
].map(r => ({ ...r, paths: riverPaths[r.id] || [] }));

export const riverRegions = {
  uzbekistan: { label: "O'zbekiston", center: [64, 41], zoom: 6 },
  centralAsia: { label: 'Markaziy Osiyo', center: [70, 44], zoom: 3 },
  world: { label: 'Dunyo', center: [20, 15], zoom: 1 },
};
