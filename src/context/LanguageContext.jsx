import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'geo_language';

export const LANGUAGES = [
  { code: 'uz', name: 'Oʻzbekcha', flag: '🇺🇿', short: 'UZ' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', short: 'RU' },
  { code: 'kaa', name: 'Qaraqalpaqsha', flag: '🇺🇿', short: 'QR' },
];

export const TRANSLATIONS = {
  uz: {
    nav: {
      home: 'Bosh sahifa',
      map: 'Geografik xarita',
      tests: 'Online Testlar',
      school: 'Maktab taʼlimi',
      library: "Universitet Ta'limi",
      profile: 'Profil',
      games: 'Oʻyinlar',
      articles: 'Maqolalar',
      rankings: 'Reyting',
      certificates: 'Sertifikatlar',
      settings: 'Sozlamalar',
      creator: 'Ustoz Qambarov O.X.',
      login: 'Kirish',
      signup: 'Roʻyxatdan oʻtish',
      logout: 'Chiqish',
    },
    common: {
      search: 'Qidirish...',
      all: 'Barchasi',
      grade: 'Sinf',
      language: 'Til',
      subject: 'Fan',
      download: 'Yuklab olish',
      read: 'Oʻqish',
      onlineRead: 'Onlayn oʻqish',
      save: 'Saqlash',
      saved: 'Saqlanganlar',
      popular: 'Ommabop',
      share: 'Ulashish',
      close: 'Yopish',
      cancel: 'Bekor qilish',
      confirm: 'Tasdiqlash',
      back: 'Orqaga',
      photos: 'Fotolavhalar',
      videos: 'Videolar',
      socials: 'Ijtimoiy tarmoqlar',
    },
    auth: {
      title: 'GEOBEK taʼlim tizimiga xush kelibsiz',
      signinTab: 'Kirish',
      signupTab: 'Roʻyxatdan oʻtish',
      selectLanguage: 'Tilni tanlang (Asosiy til)',
      fullName: 'Toʻliq ismingiz',
      phone: 'Telefon raqam',
      username: 'Foydalanuvchi nomi (@login)',
      password: 'Parol',
      confirmPassword: 'Parolni tasdiqlang',
      roleLabel: 'Taʼlim darajangiz',
      regionLabel: 'Hududingiz',
      rememberMe: 'Meni eslab qolish',
      forgotPassword: 'Parolni unutdingizmi?',
      submitSignin: 'Tizimga kirish',
      submitSignup: 'Hisob yaratish',
      demoLogin: 'Mehmon sifatida kirish',
      haveAccount: 'Akkauntingiz bormi?',
      noAccount: 'Hali akkauntingiz yoʻqmi?',
    },
    school: {
      badge: 'MAKTAB DASTURI',
      title: 'Umumtaʼlim maktab geografiya taʼlimi',
      subtitle: '5–11-sinf darsliklari boʻyicha tayyor koʻrgazmali taqdimotlar (PPTX), dars ishlanmalari va koʻrgazmali materiallar.',
      filterGrade: '1. Sinfni tanlang',
      filterLanguage: '2. Tilni tanlang',
      filterSubject: '3. Fanni tanlang',
      subjectGeography: 'Geografiya',
      subjectPhysicalGeo: 'Tabiiy geografiya',
      subjectEconomicGeo: 'Iqtisodiy geografiya',
      topicsCount: 'ta mavzu',
      presentationsCount: 'ta taqdimot',
      downloadPptx: 'PPTX yuklab olish',
      previewSlides: 'Slaydlarni koʻrish',
      slidesCount: 'slayd',
      curriculum: 'Dastur',
    },
    library: {
      badge: 'RAQAMLI KUTUBXONA',
      title: 'Geografik darsliklar va ensiklopediyalar',
      subtitle: 'Rasmiy maktab darsliklari, geografik atlaslar, ilmiy adabiyotlar va olimpiada toʻplamlari.',
      filterLanguage: 'Til boʻyicha saralash',
      readersCount: 'oʻquvchi',
      rating: 'Reyting',
      pages: 'bet',
    },
    creator: {
      pageTitle: 'Qambarov Omadbek Xayrullo o‘g‘li — GEOBEK asoschisi',
      fullName: 'Qambarov Omadbek Xayrullo o‘g‘li',
      role: 'Geografiya fani ustozi, oliy toifali pedagog. GEOBEK taʼlim platformasi asoschisi va 5–11-sinf taqdimotlari muallifi.',
      socialTitle: 'Ijtimoiy tarmoqlardagi foto va videolavhalar',
      socialSubtitle: 'Ochiq darslar, fan olimpiadalari, dala amaliyotlari va darsliklar tahlili jarayonidan lavhalar.',
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      map: 'Географическая карта',
      tests: 'Онлайн Тесты',
      school: 'Школьное образование',
      library: 'Университетское Образование',
      profile: 'Профиль',
      games: 'Игры',
      articles: 'Статьи',
      rankings: 'Рейтинг',
      certificates: 'Сертификаты',
      settings: 'Настройки',
      creator: 'Учитель Камбаров О.Х.',
      login: 'Вход',
      signup: 'Регистрация',
      logout: 'Выход',
    },
    common: {
      search: 'Поиск...',
      all: 'Все',
      grade: 'Класс',
      language: 'Язык',
      subject: 'Предмет',
      download: 'Скачать',
      read: 'Читать',
      onlineRead: 'Читать онлайн',
      save: 'Сохранить',
      saved: 'Сохраненные',
      popular: 'Популярные',
      share: 'Поделиться',
      close: 'Закрыть',
      cancel: 'Отмена',
      confirm: 'Подтвердить',
      back: 'Назад',
      photos: 'Фотографии',
      videos: 'Видео',
      socials: 'Социальные сети',
    },
    auth: {
      title: 'Добро пожаловать в образовательную систему GEOBEK',
      signinTab: 'Вход',
      signupTab: 'Регистрация',
      selectLanguage: 'Выберите язык (Основной язык)',
      fullName: 'Ваше полное имя',
      phone: 'Номер телефона',
      username: 'Имя пользователя (@логин)',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      roleLabel: 'Ваш статус обучения',
      regionLabel: 'Ваш регион',
      rememberMe: 'Запомнить меня',
      forgotPassword: 'Забыли пароль?',
      submitSignin: 'Войти в систему',
      submitSignup: 'Создать аккаунт',
      demoLogin: 'Войти как гость',
      haveAccount: 'Уже есть аккаунт?',
      noAccount: 'Еще нет аккаунта?',
    },
    school: {
      badge: 'ШКОЛЬНАЯ ПРОГРАММА',
      title: 'Школьное географическое образование',
      subtitle: 'Готовые презентации (PPTX), конспекты уроков и наглядные материалы по учебникам 5–11 классов.',
      filterGrade: '1. Выберите класс',
      filterLanguage: '2. Выберите язык',
      filterSubject: '3. Выберите предмет',
      subjectGeography: 'География',
      subjectPhysicalGeo: 'Физическая география',
      subjectEconomicGeo: 'Экономическая география',
      topicsCount: 'тем',
      presentationsCount: 'презентаций',
      downloadPptx: 'Скачать PPTX',
      previewSlides: 'Просмотр слайдов',
      slidesCount: 'слайдов',
      curriculum: 'Программа',
    },
    library: {
      badge: 'ЦИФРОВАЯ БИБЛИОТЕКА',
      title: 'Географические учебники и энциклопедии',
      subtitle: 'Официальные школьные учебники, географические атласы, научная литература и олимпиадные сборники.',
      filterLanguage: 'Фильтр по языку',
      readersCount: 'читателей',
      rating: 'Рейтинг',
      pages: 'стр.',
    },
    creator: {
      pageTitle: 'Камбаров Омадбек Хайрулло угли — основатель GEOBEK',
      fullName: 'Камбаров Омадбек Хайрулло угли',
      role: 'Учитель географии, педагог высшей категории. Основатель платформы GEOBEK и автор презентаций для 5–11 классов.',
      socialTitle: 'Фото и видео из социальных сетей',
      socialSubtitle: 'Открытые уроки, предметные олимпиады, полевые практики и видеоразборы учебных материалов.',
    }
  },
  kaa: {
    nav: {
      home: 'Bas bet',
      map: 'Geografiyalıq karta',
      tests: 'Online Testler',
      school: 'Mektep tálimi',
      library: "Universitet Tálimi",
      profile: 'Profil',
      games: 'Oyınlar',
      articles: 'Maqalalar',
      rankings: 'Reyting',
      certificates: 'Sertifikatlar',
      settings: 'Sazlawlar',
      creator: 'Ustaz Qambarov O.X.',
      login: 'Kiriw',
      signup: 'Dizimnen ótiw',
      logout: 'Shıǵıw',
    },
    common: {
      search: 'İzlew...',
      all: 'Barlıǵı',
      grade: 'Klass',
      language: 'Til',
      subject: 'Pán',
      download: 'Júklep alıw',
      read: 'Oqıw',
      onlineRead: 'Onlayn oqıw',
      save: 'Saqlaw',
      saved: 'Saqlanǵanlar',
      popular: 'Kóp oqılǵanlar',
      share: 'Bólisiw',
      close: 'Jabıw',
      cancel: 'Biykar etiw',
      confirm: 'Tastıyıqlaw',
      back: 'Artqa',
      photos: 'Fotolavhalar',
      videos: 'Videolar',
      socials: 'Sociallıq tarmaqlar',
    },
    auth: {
      title: 'GEOBEK tálim sistemasına xosh keldińiz',
      signinTab: 'Kiriw',
      signupTab: 'Dizimnen ótiw',
      selectLanguage: 'Tildi saylań (Tiykarǵı til)',
      fullName: 'Tolıq atı-familiyańız',
      phone: 'Telefon nomeri',
      username: 'Paydalanıwshı atı (@login)',
      password: 'Parol',
      confirmPassword: 'Paroldi tastıyıqlań',
      roleLabel: 'Tálim dárejeńiz',
      regionLabel: 'Aymaǵıńız',
      rememberMe: 'Meni yadta saqlaw',
      forgotPassword: 'Paroldi umıttıńızba?',
      submitSignin: 'Sistemaga kiriw',
      submitSignup: 'Akkaunt jaratıw',
      demoLogin: 'Miyhman sıpatında kiriw',
      haveAccount: 'Akkauntıńız barma?',
      noAccount: 'Ele akkauntıńız joqpa?',
    },
    school: {
      badge: 'MEKTEP DÁSTÚRI',
      title: 'Ulıwma bilim beriw mektebi geografiya tálimi',
      subtitle: '5–11-klass sabaqlıqları boyınsha tayar kórsetpeli prezentatsiyalar (PPTX), sabaq islenbeleri hám kórsetpeli materiallar.',
      filterGrade: '1. Klass saylań',
      filterLanguage: '2. Tildi saylań',
      filterSubject: '3. Pándi saylań',
      subjectGeography: 'Geografiya',
      subjectPhysicalGeo: 'Tábiyiy geografiya',
      subjectEconomicGeo: 'Ekonomikalıq geografiya',
      topicsCount: 'tema',
      presentationsCount: 'prezentatsiya',
      downloadPptx: 'PPTX júklep alıw',
      previewSlides: 'Slaydlardı kóriw',
      slidesCount: 'slayd',
      curriculum: 'Dástúr',
    },
    library: {
      badge: 'SANLI KITAPXANA',
      title: 'Geografiyalıq sabaqlıqlar hám entsiklopediyalar',
      subtitle: 'Rásmiy mektep sabaqlıqları, geografiyalıq atlaslar, ilimiy ádebiyatlar hám olimpiada toplamları.',
      filterLanguage: 'Til boyınsha saralaw',
      readersCount: 'oqıwshı',
      rating: 'Reyting',
      pages: 'bet',
    },
    creator: {
      pageTitle: 'Qambarov Omadbek Xayrullo o‘g‘li — GEOBEK tiykarshısı',
      fullName: 'Qambarov Omadbek Xayrullo o‘g‘li',
      role: 'Geografiya páni ustazı, joqarı toparlı pedagog. GEOBEK tálim platforması tiykarshısı hám 5–11-klass prezentatsiyaları avtorı.',
      socialTitle: 'Sociallıq tarmaqlardaǵı foto hám videolavhalar',
      socialSubtitle: 'Ashıq sabaqlar, pán olimpiadaları, dala ámeliyatları hám sabaqlıqlar tallawı procesinen lavhalar.',
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === 'uz' || saved === 'ru' || saved === 'kaa')) {
        return saved;
      }
    } catch (e) {
      console.warn('Language load error:', e);
    }
    return 'uz';
  });

  const setLanguage = useCallback((newLang) => {
    if (newLang === 'uz' || newLang === 'ru' || newLang === 'kaa') {
      setLanguageState(newLang);
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
        document.documentElement.lang = newLang;
      } catch (e) {
        console.warn('Language save error:', e);
      }
    }
  }, []);

  // Sync html lang
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Translation helper function
  const t = useCallback((path, fallback = '') => {
    const keys = path.split('.');
    let cur = TRANSLATIONS[language] || TRANSLATIONS.uz;
    for (const k of keys) {
      if (!cur || cur[k] === undefined) {
        // Fallback to Uzbek
        let fallbackCur = TRANSLATIONS.uz;
        for (const fk of keys) {
          if (!fallbackCur || fallbackCur[fk] === undefined) return fallback || path;
          fallbackCur = fallbackCur[fk];
        }
        return fallbackCur;
      }
      cur = cur[k];
    }
    return cur || fallback || path;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
