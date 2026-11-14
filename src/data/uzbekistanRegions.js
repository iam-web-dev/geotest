// Real administrative data for Uzbekistan's 12 regions + Karakalpakstan + Tashkent city.
export const regionMeta = {
  andijan: {
    name: 'Andijon', capital: 'Andijon', population: '3.0 mln', area: '4,200 km²',
    borders: ["Qirğiziston"], fact: "Farğona vodiysining eng ziç joylaşgan hududlaridan biri.",
  },
  fergana: {
    name: "Farğona", capital: "Farğona", population: '3.9 mln', area: '6,800 km²',
    borders: ["Qirğiziston", 'Tojikiston'], fact: "Farğona vodiysining markazida joylaşgan eng köp aholiga ega viloyat.",
  },
  namangan: {
    name: 'Namangan', capital: 'Namangan', population: '2.9 mln', area: '7,900 km²',
    borders: ["Qirğiziston"], fact: "Farğona vodiysining şimoliy qismida joylaşgan.",
  },
  jizzakh: {
    name: 'Jizzax', capital: 'Jizzax', population: '1.5 mln', area: '20,500 km²',
    borders: ["Qozoğiston", 'Tojikiston'], fact: "Mirzaçöl daşti şu hudud orqali ötadi.",
  },
  sirdaryo: {
    name: 'Sirdaryo', capital: 'Guliston', population: '0.9 mln', area: '5,100 km²',
    borders: ["Qozoğiston", 'Tojikiston'], fact: "Özbekistonning eng kiçik viloyati.",
  },
  tashkent: {
    name: 'Toşkent', capital: 'Toşkent şahri', population: '2.9 mln (viloyat)', area: '15,300 km²',
    borders: ["Qozoğiston", "Qirğiziston", 'Tojikiston'], fact: "Poytaxt Toşkent şahrini örab turadi.",
  },
  samarqand: {
    name: 'Samarqand', capital: 'Samarqand', population: '4.0 mln', area: '16,400 km²',
    borders: ['Tojikiston'], fact: "Amir Temur davlatining qadimiy poytaxti şu yerda joylaşgan.",
  },
  qashqadaryo: {
    name: 'Qaşqadaryo', capital: 'Qarşi', population: '3.4 mln', area: '28,400 km²',
    borders: ['Tojikiston', 'Turkmaniston'], fact: "Özbekistonning asosiy gaz konlari şu hududda joylaşgan.",
  },
  surxondaryo: {
    name: 'Surxondaryo', capital: 'Termiz', population: '2.7 mln', area: '20,800 km²',
    borders: ['Tojikiston', "Afğoniston", 'Turkmaniston'], fact: "Afğoniston bilan çegaradoş yagona viloyat.",
  },
  bukhara: {
    name: 'Buxoro', capital: 'Buxoro', population: '2.1 mln', area: '39,400 km²',
    borders: ['Turkmaniston'], fact: "Ipak yölidagi qadimiy savdo şahri joylaşgan hudud.",
  },
  navoiy: {
    name: 'Navoiy', capital: 'Navoiy', population: '1.1 mln', area: '110,800 km²',
    borders: ['Turkmaniston', "Qozoğiston"], fact: "Qizilqum çölining katta qismini öz içiga oladi.",
  },
  xorazm: {
    name: 'Xorazm', capital: 'Urganç', population: '2.1 mln', area: '6,300 km²',
    borders: ['Turkmaniston'], fact: "Amudaryo şu hudud orqali oqib, Orolga yaqinlaşadi.",
  },
  karakalpakstan: {
    name: "Qoraqalpoğiston", capital: 'Nukus', population: '2.1 mln', area: '166,600 km²',
    borders: ["Qozoğiston", 'Turkmaniston'], fact: "Özbekistonning eng katta hududiy birligi, Orol dengizining katta qismi şu yerda.",
  },
};

export const regionIds = Object.keys(regionMeta);

const largest = 'karakalpakstan';
const containsNukus = 'karakalpakstan';
const crossedByAmudaryo = 'xorazm';

export function buildRegionQuestions(difficulty) {
  const ids = regionIds;
  if (difficulty === 'easy') {
    return ids.map(id => ({ id, prompt: `Toping: ${regionMeta[id].name} viloyati`, type: 'name' }));
  }
  if (difficulty === 'medium') {
    return ids.map(id => ({ id, prompt: `Markazi ${regionMeta[id].capital} bölgan viloyatni toping`, type: 'capital' }));
  }
  if (difficulty === 'hard') {
    const geoQuestions = [
      { id: 'andijan', prompt: "Qirğiziston bilan çegaradoş, Farğona vodiysidagi eng ziç viloyatni toping" },
      { id: 'surxondaryo', prompt: "Afğoniston bilan çegaradoş yagona viloyatni toping" },
      { id: largest, prompt: 'Maydoni böyiça eng katta hududni toping' },
      { id: containsNukus, prompt: 'Nukus şahri joylaşgan hududni toping' },
      { id: crossedByAmudaryo, prompt: "Amudaryo oqib ötadigan viloyatni toping" },
      { id: 'sirdaryo', prompt: "Özbekistonning eng kiçik viloyatini toping" },
      { id: 'qashqadaryo', prompt: "Tojikiston va Turkmaniston bilan çegaradoş viloyatni toping" },
      { id: 'tashkent', prompt: "Poytaxtni örab turgan viloyatni toping" },
    ];
    return geoQuestions.map(q => ({ ...q, type: 'geo' }));
  }
  // expert: mixed
  const pools = [
    ...ids.map(id => ({ id, prompt: `Toping: ${regionMeta[id].name} viloyati`, type: 'name' })),
    ...ids.map(id => ({ id, prompt: `Markazi ${regionMeta[id].capital} bölgan viloyatni toping`, type: 'capital' })),
    ...buildRegionQuestions('hard'),
  ];
  return pools;
}
