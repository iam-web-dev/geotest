// Real administrative data for Uzbekistan's 12 regions + Karakalpakstan + Tashkent city.
export const regionMeta = {
  andijan: {
    name: 'Andijon', capital: 'Andijon', population: '3.0 mln', area: '4,200 km²',
    borders: ["Qirg'iziston"], fact: "Farg'ona vodiysining eng zich joylashgan hududlaridan biri.",
  },
  fergana: {
    name: "Farg'ona", capital: "Farg'ona", population: '3.9 mln', area: '6,800 km²',
    borders: ["Qirg'iziston", 'Tojikiston'], fact: "Farg'ona vodiysining markazida joylashgan eng ko'p aholiga ega viloyat.",
  },
  namangan: {
    name: 'Namangan', capital: 'Namangan', population: '2.9 mln', area: '7,900 km²',
    borders: ["Qirg'iziston"], fact: "Farg'ona vodiysining shimoliy qismida joylashgan.",
  },
  jizzakh: {
    name: 'Jizzax', capital: 'Jizzax', population: '1.5 mln', area: '20,500 km²',
    borders: ["Qozog'iston", 'Tojikiston'], fact: "Mirzacho'l dashti shu hudud orqali o'tadi.",
  },
  sirdaryo: {
    name: 'Sirdaryo', capital: 'Guliston', population: '0.9 mln', area: '5,100 km²',
    borders: ["Qozog'iston", 'Tojikiston'], fact: "O'zbekistonning eng kichik viloyati.",
  },
  tashkent: {
    name: 'Toshkent', capital: 'Toshkent shahri', population: '2.9 mln (viloyat)', area: '15,300 km²',
    borders: ["Qozog'iston", "Qirg'iziston", 'Tojikiston'], fact: "Poytaxt Toshkent shahrini o'rab turadi.",
  },
  samarqand: {
    name: 'Samarqand', capital: 'Samarqand', population: '4.0 mln', area: '16,400 km²',
    borders: ['Tojikiston'], fact: "Amir Temur davlatining qadimiy poytaxti shu yerda joylashgan.",
  },
  qashqadaryo: {
    name: 'Qashqadaryo', capital: 'Qarshi', population: '3.4 mln', area: '28,400 km²',
    borders: ['Tojikiston', 'Turkmaniston'], fact: "O'zbekistonning asosiy gaz konlari shu hududda joylashgan.",
  },
  surxondaryo: {
    name: 'Surxondaryo', capital: 'Termiz', population: '2.7 mln', area: '20,800 km²',
    borders: ['Tojikiston', "Afg'oniston", 'Turkmaniston'], fact: "Afg'oniston bilan chegaradosh yagona viloyat.",
  },
  bukhara: {
    name: 'Buxoro', capital: 'Buxoro', population: '2.1 mln', area: '39,400 km²',
    borders: ['Turkmaniston'], fact: "Ipak yo'lidagi qadimiy savdo shahri joylashgan hudud.",
  },
  navoiy: {
    name: 'Navoiy', capital: 'Navoiy', population: '1.1 mln', area: '110,800 km²',
    borders: ['Turkmaniston', "Qozog'iston"], fact: "Qizilqum cho'lining katta qismini o'z ichiga oladi.",
  },
  xorazm: {
    name: 'Xorazm', capital: 'Urganch', population: '2.1 mln', area: '6,300 km²',
    borders: ['Turkmaniston'], fact: "Amudaryo shu hudud orqali oqib, Orolga yaqinlashadi.",
  },
  karakalpakstan: {
    name: "Qoraqalpog'iston", capital: 'Nukus', population: '2.1 mln', area: '166,600 km²',
    borders: ["Qozog'iston", 'Turkmaniston'], fact: "O'zbekistonning eng katta hududiy birligi, Orol dengizining katta qismi shu yerda.",
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
    return ids.map(id => ({ id, prompt: `Markazi ${regionMeta[id].capital} bo'lgan viloyatni toping`, type: 'capital' }));
  }
  if (difficulty === 'hard') {
    const geoQuestions = [
      { id: 'andijan', prompt: "Qirg'iziston bilan chegaradosh, Farg'ona vodiysidagi eng zich viloyatni toping" },
      { id: 'surxondaryo', prompt: "Afg'oniston bilan chegaradosh yagona viloyatni toping" },
      { id: largest, prompt: 'Maydoni bo\'yicha eng katta hududni toping' },
      { id: containsNukus, prompt: 'Nukus shahri joylashgan hududni toping' },
      { id: crossedByAmudaryo, prompt: "Amudaryo oqib o'tadigan viloyatni toping" },
      { id: 'sirdaryo', prompt: "O'zbekistonning eng kichik viloyatini toping" },
      { id: 'qashqadaryo', prompt: "Tojikiston va Turkmaniston bilan chegaradosh viloyatni toping" },
      { id: 'tashkent', prompt: "Poytaxtni o'rab turgan viloyatni toping" },
    ];
    return geoQuestions.map(q => ({ ...q, type: 'geo' }));
  }
  // expert: mixed
  const pools = [
    ...ids.map(id => ({ id, prompt: `Toping: ${regionMeta[id].name} viloyati`, type: 'name' })),
    ...ids.map(id => ({ id, prompt: `Markazi ${regionMeta[id].capital} bo'lgan viloyatni toping`, type: 'capital' })),
    ...buildRegionQuestions('hard'),
  ];
  return pools;
}
