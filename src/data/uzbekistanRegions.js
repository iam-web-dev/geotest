// Real administrative data for Uzbekistan's 12 regions + Karakalpakstan + Tashkent city.
export const regionMeta = {
  andijan: {
    name: 'Andijon', capital: 'Andijon', population: '3.0 mln', area: '4,200 km²',
    borders: ["Qirgʻiziston"], fact: "Fargʻona vodiysining eng zich joylashgan hududlaridan biri.",
  },
  fergana: {
    name: "Fargʻona", capital: "Fargʻona", population: '3.9 mln', area: '6,800 km²',
    borders: ["Qirgʻiziston", 'Tojikiston'], fact: "Fargʻona vodiysining markazida joylashgan eng koʻp aholiga ega viloyat.",
  },
  namangan: {
    name: 'Namangan', capital: 'Namangan', population: '2.9 mln', area: '7,900 km²',
    borders: ["Qirgʻiziston"], fact: "Fargʻona vodiysining shimoliy qismida joylashgan.",
  },
  jizzakh: {
    name: 'Jizzax', capital: 'Jizzax', population: '1.5 mln', area: '20,500 km²',
    borders: ["Qozogʻiston", 'Tojikiston'], fact: "Mirzachoʻl dashti shu hudud orqali oʻtadi.",
  },
  sirdaryo: {
    name: 'Sirdaryo', capital: 'Guliston', population: '0.9 mln', area: '5,100 km²',
    borders: ["Qozogʻiston", 'Tojikiston'], fact: "Oʻzbekistonning eng kichik viloyati.",
  },
  tashkent: {
    name: 'Toshkent', capital: 'Toshkent shahri', population: '2.9 mln (viloyat)', area: '15,300 km²',
    borders: ["Qozogʻiston", "Qirgʻiziston", 'Tojikiston'], fact: "Poytaxt Toshkent shahrini oʻrab turadi.",
  },
  samarqand: {
    name: 'Samarqand', capital: 'Samarqand', population: '4.0 mln', area: '16,400 km²',
    borders: ['Tojikiston'], fact: "Amir Temur davlatining qadimiy poytaxti shu yerda joylashgan.",
  },
  qashqadaryo: {
    name: 'Qashqadaryo', capital: 'Qarshi', population: '3.4 mln', area: '28,400 km²',
    borders: ['Tojikiston', 'Turkmaniston'], fact: "Oʻzbekistonning asosiy gaz konlari shu hududda joylashgan.",
  },
  surxondaryo: {
    name: 'Surxondaryo', capital: 'Termiz', population: '2.7 mln', area: '20,800 km²',
    borders: ['Tojikiston', "Afgʻoniston", 'Turkmaniston'], fact: "Afgʻoniston bilan chegaradosh yagona viloyat.",
  },
  bukhara: {
    name: 'Buxoro', capital: 'Buxoro', population: '2.1 mln', area: '39,400 km²',
    borders: ['Turkmaniston'], fact: "Ipak yoʻlidagi qadimiy savdo shahri joylashgan hudud.",
  },
  navoiy: {
    name: 'Navoiy', capital: 'Navoiy', population: '1.1 mln', area: '110,800 km²',
    borders: ['Turkmaniston', "Qozogʻiston"], fact: "Qizilqum choʻlining katta qismini oʻz ichiga oladi.",
  },
  xorazm: {
    name: 'Xorazm', capital: 'Urganch', population: '2.1 mln', area: '6,300 km²',
    borders: ['Turkmaniston'], fact: "Amudaryo shu hudud orqali oqib, Orolga yaqinlashadi.",
  },
  karakalpakstan: {
    name: "Qoraqalpogʻiston", capital: 'Nukus', population: '2.1 mln', area: '166,600 km²',
    borders: ["Qozogʻiston", 'Turkmaniston'], fact: "Oʻzbekistonning eng katta hududiy birligi, Orol dengizining katta qismi shu yerda.",
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
    return ids.map(id => ({ id, prompt: `Markazi ${regionMeta[id].capital} boʻlgan viloyatni toping`, type: 'capital' }));
  }
  if (difficulty === 'hard') {
    const geoQuestions = [
      { id: 'andijan', prompt: "Qirgʻiziston bilan chegaradosh, Fargʻona vodiysidagi eng zich viloyatni toping" },
      { id: 'surxondaryo', prompt: "Afgʻoniston bilan chegaradosh yagona viloyatni toping" },
      { id: largest, prompt: 'Maydoni boʻyicha eng katta hududni toping' },
      { id: containsNukus, prompt: 'Nukus shahri joylashgan hududni toping' },
      { id: crossedByAmudaryo, prompt: "Amudaryo oqib oʻtadigan viloyatni toping" },
      { id: 'sirdaryo', prompt: "Oʻzbekistonning eng kichik viloyatini toping" },
      { id: 'qashqadaryo', prompt: "Tojikiston va Turkmaniston bilan chegaradosh viloyatni toping" },
      { id: 'tashkent', prompt: "Poytaxtni oʻrab turgan viloyatni toping" },
    ];
    return geoQuestions.map(q => ({ ...q, type: 'geo' }));
  }
  // expert: mixed
  const pools = [
    ...ids.map(id => ({ id, prompt: `Toping: ${regionMeta[id].name} viloyati`, type: 'name' })),
    ...ids.map(id => ({ id, prompt: `Markazi ${regionMeta[id].capital} boʻlgan viloyatni toping`, type: 'capital' })),
    ...buildRegionQuestions('hard'),
  ];
  return pools;
}
