-- =============================================================================
-- GEOBEK: Geografiya Fan Olimpiadasi Testlari va Savollari SEED
-- Tuman va Viloyat bosqichlari (9, 10, 11-sinflar, 2024-yil)
-- =============================================================================

-- 1. Olimpiada testlari jadvali
CREATE TABLE IF NOT EXISTS public.olympiad_tests (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_title TEXT NOT NULL,
  stage TEXT NOT NULL,
  stage_label TEXT NOT NULL,
  grade INTEGER NOT NULL,
  year INTEGER NOT NULL,
  date DATE,
  questions_count INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  total_points NUMERIC NOT NULL,
  passing_score NUMERIC NOT NULL,
  difficulty TEXT NOT NULL,
  participants_count INTEGER DEFAULT 0,
  average_score NUMERIC DEFAULT 0,
  sections JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Olimpiada savollari jadvali
CREATE TABLE IF NOT EXISTS public.olympiad_questions (
  id TEXT PRIMARY KEY,
  test_id TEXT NOT NULL REFERENCES public.olympiad_tests(id) ON DELETE CASCADE,
  number INTEGER NOT NULL,
  section_id INTEGER NOT NULL,
  points NUMERIC NOT NULL,
  difficulty TEXT NOT NULL,
  question_type TEXT NOT NULL,
  question TEXT NOT NULL,
  image_url TEXT,
  options JSONB NOT NULL,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_olympiad_questions_test_id ON public.olympiad_questions(test_id);
CREATE INDEX IF NOT EXISTS idx_olympiad_tests_stage_grade ON public.olympiad_tests(stage, grade);


-- Testlarni kiritish (INSERT)
INSERT INTO public.olympiad_tests (
  id, slug, title, short_title, stage, stage_label, grade, year, date,
  questions_count, duration_minutes, total_points, passing_score, difficulty,
  participants_count, average_score, sections
) VALUES (
  'olympiad-tuman-9-2024', 'tuman-9-2024', 'Geografiya fan olimpiadasi — Tuman bosqichi (9-sinf, 2024)', 'Tuman bosqichi • 9-sinf',
  'tuman', 'Tuman bosqichi', 9, 2024, '2024-10-21',
  30, 90, 50, 35, 'hard',
  4120, 28.5, '[{"id": 1, "name": "1-qism", "points": 0.9, "range": [1, 10], "difficulty": "medium"}, {"id": 2, "name": "2-qism", "points": 1.7, "range": [11, 20], "difficulty": "hard"}, {"id": 3, "name": "3-qism", "points": 2.4, "range": [21, 30], "difficulty": "expert"}]'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  short_title = EXCLUDED.short_title,
  total_points = EXCLUDED.total_points,
  questions_count = EXCLUDED.questions_count;

INSERT INTO public.olympiad_tests (
  id, slug, title, short_title, stage, stage_label, grade, year, date,
  questions_count, duration_minutes, total_points, passing_score, difficulty,
  participants_count, average_score, sections
) VALUES (
  'olympiad-tuman-10-2024', 'tuman-10-2024', 'Geografiya fan olimpiadasi — Tuman bosqichi (10-sinf, 2024)', 'Tuman bosqichi • 10-sinf',
  'tuman', 'Tuman bosqichi', 10, 2024, '2024-10-21',
  30, 90, 50, 35, 'hard',
  3780, 27.2, '[{"id": 1, "name": "1-qism", "points": 0.9, "range": [1, 10], "difficulty": "medium"}, {"id": 2, "name": "2-qism", "points": 1.5, "range": [11, 20], "difficulty": "hard"}, {"id": 3, "name": "3-qism", "points": 2.6, "range": [21, 30], "difficulty": "expert"}]'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  short_title = EXCLUDED.short_title,
  total_points = EXCLUDED.total_points,
  questions_count = EXCLUDED.questions_count;

INSERT INTO public.olympiad_tests (
  id, slug, title, short_title, stage, stage_label, grade, year, date,
  questions_count, duration_minutes, total_points, passing_score, difficulty,
  participants_count, average_score, sections
) VALUES (
  'olympiad-tuman-11-2024', 'tuman-11-2024', 'Geografiya fan olimpiadasi — Tuman bosqichi (11-sinf, 2024)', 'Tuman bosqichi • 11-sinf',
  'tuman', 'Tuman bosqichi', 11, 2024, '2024-10-21',
  30, 90, 50, 35, 'expert',
  3450, 26.8, '[{"id": 1, "name": "1-qism", "points": 0.9, "range": [1, 10], "difficulty": "medium"}, {"id": 2, "name": "2-qism", "points": 1.5, "range": [11, 20], "difficulty": "hard"}, {"id": 3, "name": "3-qism", "points": 2.6, "range": [21, 30], "difficulty": "expert"}]'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  short_title = EXCLUDED.short_title,
  total_points = EXCLUDED.total_points,
  questions_count = EXCLUDED.questions_count;

INSERT INTO public.olympiad_tests (
  id, slug, title, short_title, stage, stage_label, grade, year, date,
  questions_count, duration_minutes, total_points, passing_score, difficulty,
  participants_count, average_score, sections
) VALUES (
  'olympiad-viloyat-9-2024', 'viloyat-9-2024', 'Geografiya fan olimpiadasi — Viloyat bosqichi (9-sinf, 2024)', 'Viloyat bosqichi • 9-sinf',
  'viloyat', 'Viloyat bosqichi (III bosqich)', 9, 2024, '2024-11-15',
  40, 120, 100, 65, 'expert',
  1260, 54.2, '[{"id": 1, "name": "1-qism", "points": 1.3, "range": [1, 15], "difficulty": "medium"}, {"id": 2, "name": "2-qism", "points": 2.4, "range": [16, 30], "difficulty": "hard"}, {"id": 3, "name": "3-qism", "points": 3.4, "range": [31, 40], "difficulty": "expert"}]'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  short_title = EXCLUDED.short_title,
  total_points = EXCLUDED.total_points,
  questions_count = EXCLUDED.questions_count;

INSERT INTO public.olympiad_tests (
  id, slug, title, short_title, stage, stage_label, grade, year, date,
  questions_count, duration_minutes, total_points, passing_score, difficulty,
  participants_count, average_score, sections
) VALUES (
  'olympiad-viloyat-10-2024', 'viloyat-10-2024', 'Geografiya fan olimpiadasi — Viloyat bosqichi (10-sinf, 2024)', 'Viloyat bosqichi • 10-sinf',
  'viloyat', 'Viloyat bosqichi (III bosqich)', 10, 2024, '2024-11-15',
  40, 120, 100, 65, 'expert',
  1140, 51.8, '[{"id": 1, "name": "1-qism", "points": 1.3, "range": [1, 15], "difficulty": "medium"}, {"id": 2, "name": "2-qism", "points": 2.4, "range": [16, 30], "difficulty": "hard"}, {"id": 3, "name": "3-qism", "points": 3.4, "range": [31, 40], "difficulty": "expert"}]'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  short_title = EXCLUDED.short_title,
  total_points = EXCLUDED.total_points,
  questions_count = EXCLUDED.questions_count;

INSERT INTO public.olympiad_tests (
  id, slug, title, short_title, stage, stage_label, grade, year, date,
  questions_count, duration_minutes, total_points, passing_score, difficulty,
  participants_count, average_score, sections
) VALUES (
  'olympiad-viloyat-11-2024', 'viloyat-11-2024', 'Geografiya fan olimpiadasi — Viloyat bosqichi (11-sinf, 2024)', 'Viloyat bosqichi • 11-sinf',
  'viloyat', 'Viloyat bosqichi (III bosqich)', 11, 2024, '2024-11-15',
  40, 120, 100, 65, 'expert',
  1080, 53.1, '[{"id": 1, "name": "1-qism", "points": 1.3, "range": [1, 15], "difficulty": "medium"}, {"id": 2, "name": "2-qism", "points": 2.4, "range": [16, 30], "difficulty": "hard"}, {"id": 3, "name": "3-qism", "points": 3.4, "range": [31, 40], "difficulty": "expert"}]'
) ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  short_title = EXCLUDED.short_title,
  total_points = EXCLUDED.total_points,
  questions_count = EXCLUDED.questions_count;


-- Savollarni kiritish (INSERT)
-- Test: Geografiya fan olimpiadasi — Tuman bosqichi (9-sinf, 2024)
INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q1', 'olympiad-tuman-9-2024', 1, 1, 0.9,
  'medium', 'closed', 'Quyidagi qaysi daryo shimoliy tropik chizig‘ini kesib o‘tmagan?',
  NULL, '["A) Iravadi daryosi", "B) Nil daryosi", "C) Hind daryosi", "D) Gang daryosi"]', 'A',
  'Nil, Hind va Gang daryolari shimoliy tropik chizig‘ini kesib o‘tadi, ammo Iravadi daryosi ushbu chiziqni kesib o‘tmagan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q2', 'olympiad-tuman-9-2024', 2, 1, 0.9,
  'medium', 'closed', 'Quyidagi qaysi shaharda aeroport mavjud emas?',
  NULL, '["A) Jizzax", "B) Namangan", "C) Zarafshon", "D) Termiz"]', 'A',
  'Namangan, Zarafshon va Termiz shaharlarida aeroport mavjud, ammo Jizzax shahrida fuqaro aviatsiyasi aeroporti mavjud emas.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q3', 'olympiad-tuman-9-2024', 3, 1, 0.9,
  'medium', 'closed', 'Davlat boshqaruvining prezidentlik respublikasi shakli qaysi qit’alarda keng tarqalgan?',
  NULL, '["A) Yevropa va Avstraliya", "B) Afrika va Osiyo", "C) Osiyo va Yavropa", "D) Afrika va Amerika"]', 'D',
  'Prezidentlik boshqaruv shakli Amerika qit’asi (AQSh, Lotin Amerikasi mamlakatlari) va Afrika mamlakatlarida eng keng tarqalgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q4', 'olympiad-tuman-9-2024', 4, 1, 0.9,
  'medium', 'closed', 'Qaysi shahardagi kombinatning ishlab chiqarish faoliyati Ingichka va Qo‘ytosh konlari bilan bog‘liq?',
  NULL, '["A) Bekobod", "B) Chirchiq", "C) Olmaliq", "D) Jizzax"]', 'B',
  'Ingichka (Samarqand) va Qo‘ytosh (Jizzax) volfram konlari Chirchiqdagi o‘tga chidamli va qattiq qotishmalar kombinati xomashyo bazasi hisoblanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q5', 'olympiad-tuman-9-2024', 5, 1, 0.9,
  'medium', 'closed', 'Oqtov tog‘lari quyidagi qaysi tabiiy geografik okrugning shimolida joylashgan?',
  NULL, '["A) Qizilqum", "B) Qashqadaryo", "C) O‘rta Zarafshon", "D) Mirzacho‘l"]', 'C',
  'Oqtov tizmasi O‘rta Zarafshon tabiiy geografik okrugining shimoliy chegarasi bo‘ylab joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q6', 'olympiad-tuman-9-2024', 6, 1, 0.9,
  'medium', 'closed', 'Mamlakatimizdagi mehnatda band aholining 8,2%i quyidagi qaysi sohada faoliyat yuritadi?',
  NULL, '["A) Qurilishda", "B) Ta’limda", "C) Sanoatda", "D) Sog‘liqni saqlashda"]', 'A',
  'Darslik ma’lumotlariga ko‘ra, mamlakatimizda mehnatda band aholining 8,2 foizi qurilish sohasida faoliyat yuritadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q7', 'olympiad-tuman-9-2024', 7, 1, 0.9,
  'medium', 'closed', 'Quruqlikda tabiat zonalarining hosil bo‘lishi quyidagilarning qaysi biriga bog‘liq emas?',
  NULL, '["A) Relyefga", "B) Havo haroratiga", "C) Albedoga", "D) Yog‘in miqdoriga"]', 'C',
  'Quruqlikda tabiat zonalarining hosil bo‘lishi issiqlik va namlik nisbati hamda relyefga bog‘liq, ammo albedo tabiat zonalarining shakllanishida asosiy belgilovchi omil hisoblanmaydi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q8', 'olympiad-tuman-9-2024', 8, 1, 0.9,
  'medium', 'closed', 'Iqlim xaritalarida havo bosimi bir xil bo‘lgan nuqtalarni tutashtiruvchi chiziqlar nima deb ataladi?',
  NULL, '["A) Izobaralar", "B) Izotaxalar", "C) Izogiyetalar", "D) Izotermalar"]', 'A',
  'Iqlim xaritalarida bir xil atmosfera bosimiga ega nuqtalarni tutashtiruvchi chiziqlar izobaralar deyiladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q9', 'olympiad-tuman-9-2024', 9, 1, 0.9,
  'medium', 'closed', 'Tamaki-fermentatsiya zavodi respublikamizning qaysi viloyatida ishga tushirilgan?',
  NULL, '["A) Navoiy", "B) Surxondaryo", "C) Toshkent", "D) Samarqand"]', 'D',
  'Respublikamizda tamaki fermentatsiya zavodi tamaki yetishtirishga ixtisoslashgan Samarqand viloyatida (Urgut) barpo etilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q10', 'olympiad-tuman-9-2024', 10, 1, 0.9,
  'medium', 'closed', 'Quyidagi qaysi pasttekislik “kriklar o‘lkasi” deb ataladi?',
  NULL, '["A) Karpentariya", "B) Markaziy", "C) Nallarbor", "D) La Plata 2-qism: Har bir topshiriq 1,7 balldan baholanadi"]', 'B',
  'Avstraliyadagi vaqtincha qurib qoluvchi daryolar (kriklar) ko‘p uchraydigan Markaziy pasttekislik ''kriklar o‘lkasi'' deb ataladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q11', 'olympiad-tuman-9-2024', 11, 2, 1.7,
  'hard', 'closed', 'Quyidagi qaysi shaharlarda paxta tozalash hamda yog‘ sanoati uchun mashina va uskunalar ishlab
chiqaruvchi zavodlar joylashgan?',
  NULL, '["A) Toshkent, Qo‘qon, Jizzax, Namangan", "B) Toshkent, Samarqand, Buxoro, Termiz", "C) Toshkent, Farg‘ona, Navoiy, Andijon", "D) Toshkent, Andijon, Samarqand, Kattaqo‘rg‘on"]', 'D',
  'Paxta tozalash va yog‘ sanoati mashinasozligi Toshkent, Andijon, Samarqand va Kattaqo‘rg‘on shaharlarida joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q12', 'olympiad-tuman-9-2024', 12, 2, 1.7,
  'hard', 'image', 'Berilgan rasm quyidagi qaysi qonuniyatni o‘zida namoyon etadi?',
  '/images/olympiad/tuman-9-2024/q12.png', '["A) Sektorlik", "B) Koriolis kuchi", "C) Balandlik mintaqalanishi", "D) Zonallik"]', 'C',
  'Rasmda tog‘ etagidan cho‘qqisiga qarab tabiiy sharoit va o‘simliklar qatlamining o‘zgarishi, ya’ni balandlik mintaqalanishi qonuniyati ko‘rsatilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q13', 'olympiad-tuman-9-2024', 13, 2, 1.7,
  'hard', 'image', 'Quyidagi rasmda alohida rang bilan belgilangan hududlar qaysi tabiat zonasida joylashgan?',
  '/images/olympiad/tuman-9-2024/q13.png', '["A) Balandlik mintaqalari", "B) Savanna va siyrak o‘rmonlar", "C) Chalacho‘l va cho‘llar", "D) Qattiq bargli doimiy yashil o‘rmonlar va butazorlar"]', 'D',
  'Xaritada ko‘rsatilgan O‘rta dengiz bo‘yi, Kaliforniya, Chili, JAR va Avstraliyaning janubi-g‘arbida qattiq bargli doimiy yashil o‘rmonlar va butazorlar joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q14', 'olympiad-tuman-9-2024', 14, 2, 1.7,
  'hard', 'image', 'Quyidagi rasmda qaysi harf bilan ko‘rsatilgan chiziq daryoning bir qismini ifodalaydi?',
  '/images/olympiad/tuman-9-2024/q14.png', '["A) С", "B) A", "C) D", "D) B"]', 'B',
  'Gorizontallarda suvayirg‘ich va daryo vodiylari relyef qatlamlari orqali ifodalanadi. A chizig‘i daryo o‘zanining botiq qismini ifodalaydi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q15', 'olympiad-tuman-9-2024', 15, 2, 1.7,
  'hard', 'image', 'Samolyot bosh meridiandan ekvator bo‘ylab g‘arbga qarab uchadi va 300 km masofani bosib o‘tdi. U
quyidagi rasmda ko‘rsatilgan qaysi zonaga yetganligini aniqlang.',
  '/images/olympiad/tuman-9-2024/q15.png', '["A) D zonaga", "B) C zonaga", "C) A zonaga", "D) B zonaga"]', 'C',
  'Ekvator bo‘ylab 1° yoy uzunligi 111,3 km ga teng. 300 km g‘arbga uchgan samolyot taxminan 2,7° g‘arbiy uzunlikka, ya’ni rasmda A zonaga to‘g‘ri keladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q16', 'olympiad-tuman-9-2024', 16, 2, 1.7,
  'hard', 'closed', 'Samarqandda soat kunduzgi 9:30 bo‘lsa, 125° sharqiy uzunlikda joylashgan shaharda soat necha bo‘ladi?',
  NULL, '["A) 15:30", "B) 6:30", "C) 13:30", "D) 8:30"]', 'C',
  'Samarqand (65° shq.u.) bilan 125° shq.u. o‘rtasidagi farq 60° ga teng. 60° / 15° = 4 soat. 125° sharqda bo‘lgani uchun vaqt oldinda bo‘ladi: 9:30 + 4:00 = 13:30.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q17', 'olympiad-tuman-9-2024', 17, 2, 1.7,
  'hard', 'closed', 'Marakaybo ko‘li vujudga kelishiga ko‘ra qanday ko‘llar guruhiga mansub?',
  NULL, '["A) Tektonik", "B) To‘g‘onli", "C) Morena", "D) Laguna"]', 'D',
  'Marakaybo Karib dengizining Venesuela qo‘ltig‘iga tor bo‘g‘iz orqali tutashgan ko‘l-laguna hisoblanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q18', 'olympiad-tuman-9-2024', 18, 2, 1.7,
  'hard', 'closed', 'Koreya yarimoroli, Xonsyu va Xokkaydo orollari oralig‘ida joylashgan dengiz nomini belgilang.',
  NULL, '["A) Sariq dengiz", "B) Oxota dengizi", "C) Yapon dengizi", "D) Janubiy Xitoy dengizi"]', 'C',
  'Koreya yarimoroli, Xonsyu va Xokkaydo orollari oralig‘ida Yapon dengizi joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q19', 'olympiad-tuman-9-2024', 19, 2, 1.7,
  'hard', 'closed', 'Quyidagilar orasidan Farg‘ona tizmasidan boshlanuvchi daryolar to‘g‘ri berilgan qatorni belgilang.
1) Kosonsoy; 2) Ko‘gart; 3) Isfara; 4) Norin; 5) Yassi; 6) Aravansoy; 7) Moylisuv; 8) Qorao‘ngur; 9)
Oqbura; 10) Chodaksoy.',
  NULL, '["A) 2, 5, 7, 8", "B) 3, 5, 6, 9", "C) 1, 4, 6, 8", "D) 1, 2, 7, 8"]', 'A',
  'Farg‘ona tizmasidan Ko‘gart (2), Yassi (5), Moylisuv (7) va Qorao‘ngur (8) daryolari boshlanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q20', 'olympiad-tuman-9-2024', 20, 2, 1.7,
  'hard', 'image', 'Cho‘llar hosil bo‘lishiga ta’sir etuvchi okean oqimlari quyidagi xarita-sxemada qaysi sonlar bilan
ko‘rsatilgan?',
  '/images/olympiad/tuman-9-2024/q20.png', '["A) 4, 14, 16", "B) 3, 5, 11", "C) 2, 5, 14", "D) 11, 18, 23 3-qism: Har bir topshiriq 2,4 balldan baholanadi"]', 'A',
  'Tropik sovuq oqimlar (Peru, Bengela, Kaliforniya, G‘arbiy Avstraliya) qirg‘oq bo‘yida yog‘in hosil bo‘lishiga to‘sqinlik qilib, cho‘llar shakllanishiga olib keladi (xaritada 4, 14, 16 sonlari).'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q21', 'olympiad-tuman-9-2024', 21, 3, 2.4,
  'expert', 'closed', 'Quyidagilar orasidan ham yirik shoxli qoramollar soniga, ham sigirlar soniga ko‘ra respublikamizda bir xil
o‘rinda turuvchi viloyatlarni ajrating.
1. Andijon; 2. Buxoro; 3. Qoraqalpog‘iston; 4. Toshkent; 5. Namangan; 6. Navoiy; 7. Qashqadaryo. 8.
Surxondaryo; 9. Jizzax; 10. Sirdaryo; 11. Xorazm; 12. Farg‘ona; 13. Samarqand.',
  NULL, '["A) 3, 8, 12, 13", "B) 2, 4, 11, 13", "C) 1, 2, 5, 10", "D) 1, 7, 9, 12"]', 'A',
  'Qoramollar soni va sigirlar soni bo‘yicha viloyatlar reytingida Qoraqalpog‘iston, Surxondaryo, Farg‘ona va Samarqand viloyatlari bir xil o‘rinlarda turadi (3, 8, 12, 13).'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q22', 'olympiad-tuman-9-2024', 22, 3, 2.4,
  'expert', 'image', 'Quyidagi ma’lumotlar asosida Eyler-Venn diagrammasiga mos tushadigan to‘g‘ri javobni toping.
I                                         Mis
II                   nikel                 a)                  bronza
III                 aluminiy               b)                    latun
IV                   qalayi                 c)               duraluminiy
V                     rux                 d)                  melxior',
  '/images/olympiad/tuman-9-2024/q22.png', '["A) ", "B) ", "C) ", "D) "]', 'C',
  'Misning qalayi bilan qotishmasi bronza, rux bilan latun, nikel bilan melxior hosil qiladi. Duraluminiy esa aluminiy va mis qotishmasidir. Diagrammada ushbu bog‘lanish C variantda to‘g‘ri ifodalangan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q23', 'olympiad-tuman-9-2024', 23, 3, 2.4,
  'expert', 'closed', 'O‘rta Osiyo tog‘larining shimoliy yonbag‘irlarida tog‘ etagidan yuqoriga ko‘tarilgan sari tuproq tarkibidagi
chirindi miqdori ........... . Nuqtalar o‘rniga mos javobni qo‘ying.',
  NULL, '["A) o‘zgarmaydi", "B) kamayadi", "C) ortadi", "D) zichlashadi"]', 'C',
  'O‘rta Osiyo tog‘larining shimoliy yonbag‘irlarida tog‘ etagidagi bo‘z tuproqlardan yuqoriga ko‘tarilgan sari namlik ortishi hisobiga chirindi miqdori ortadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q24', 'olympiad-tuman-9-2024', 24, 3, 2.4,
  'expert', 'closed', 'O‘zbekiston daryolari va ularning suv sarfi o‘lchanadigan joylari mos ravishda ko‘rsatilgan javobni
belgilang.
№      Daryolar            Qishloqlar
1     Chirchiq            a       Turk
2   Qashqadaryo           b     Xo‘jakent
3   Surxondaryo           c   Qorovultepa
4    Ohangaron            d     Varganza',
  NULL, '["A) 1-b, 2-d, 3-c, 4-a", "B) 1-a, 2-b, 3-c, 4-d", "C) 1-b, 2-c, 3-d, 4-a", "D) 1-c, 2-a, 3-d, 4-b"]', 'A',
  'Chirchiq daryosining suv sarfi Xo‘jakentda (b), Qashqadaryoniki Varganzada (d), Surxondaryoniki Qorovultepada (c), Ohangaronniki Turk qishlog‘ida (a) o‘lchanadi (1-b, 2-d, 3-c, 4-a).'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q25', 'olympiad-tuman-9-2024', 25, 3, 2.4,
  'expert', 'closed', 'Berilgan geografik obyekt 45° janubiy kenglik, 129° sharqiy uzoqlikda joylashgan. Mazkur obyektdan
Shimoliy qutbgacha bo‘lgan masofani kilometr hisobida aniqlang.',
  NULL, '["A) 4 999,5 km", "B) 1 914, 5 km", "C) 9 999 km", "D) 14 998,5 km"]', 'D',
  '45° j.k. dan ekvatorgacha 45°, ekvatordan Shimoliy qutbgacha 90°, jami 135° masofa. 135° * 111,1 km = 14 998,5 km.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q26', 'olympiad-tuman-9-2024', 26, 3, 2.4,
  'expert', 'image', 'Quyidagi qaysi rasm Grenlandiya oroli uchun xos?',
  '/images/olympiad/tuman-9-2024/q26.png', '["A) ", "B) ", "C) ", "D) "]', 'A',
  'Grenlandiya oroli Arktika mintaqasida joylashgan bo‘lib, uning yuzasi qalin muz qoplami va aysberglar bilan qoplangan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q27', 'olympiad-tuman-9-2024', 27, 3, 2.4,
  'expert', 'closed', 'Quyidagilar orasidan toshli, ya’ni gipsli cho‘llar tarqalgan hududlarni belgilang. 1) Orolbo‘yi Qoraqumi, 2)
Ustyurt, 3) Qorsoqboy, 4) Mo‘yinqum, 5) Betpaqdala, 6) Mang‘ishloq, 7) Keles tekisligi.',
  NULL, '["A) 2, 3, 5, 6", "B) 1, 2, 3, 4", "C) 2, 3, 4, 6", "D) 1, 2, 5, 7"]', 'A',
  'Toshli-gipsli cho‘llar Ustyurt platosi (2), Qorsoqboy (3), Betpaqdala (5) va Mang‘ishloqda (6) keng tarqalgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q28', 'olympiad-tuman-9-2024', 28, 3, 2.4,
  'expert', 'image', 'Berilgan rasmda Yer yuzi iqlimidagi doimiy maksimum va minimumlar qaysi raqamlar bilan ko‘rsatilgan?',
  '/images/olympiad/tuman-9-2024/q28.png', '["A) 1, 3, 7, 10", "B) 4, 5, 7, 9", "C) 2, 3, 5, 8", "D) 1, 3, 6, 7"]', 'A',
  'Yer yuzida atmosfera bosimining doimiy maksimumlari (tropik va qutbiy) hamda minimumlari (ekvatorial va mo‘tadil) rasmda 1, 3, 7, 10 raqamlari bilan ifodalangan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q29', 'olympiad-tuman-9-2024', 29, 3, 2.4,
  'expert', 'image', 'Terrigen yotqiziqlar to‘planmaydigan joylar rasmda qaysi harf bilan belgilangan?',
  '/images/olympiad/tuman-9-2024/q29.png', '["A) D, A", "B) F, C", "C) G, D", "D) J, A"]', 'B',
  'Terrigen (quruqlikdan keltirilgan) yotqiziqlar materik sayozligi va qiyaliklarida to‘planadi, chuqur okean botiqlari (F, C)da esa terrigen yotqiziqlar deyarli to‘planmaydi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-9-2024-q30', 'olympiad-tuman-9-2024', 30, 3, 2.4,
  'expert', 'image', 'Baliq ko‘p ovlanadigan va suvo‘tlar yig‘ib olinadigan dengizlar rasmda qaysi raqamlar bilan ko‘rsatilgan?',
  '/images/olympiad/tuman-9-2024/q30.png', '["A) 1, 3, 4", "B) 1, 5, 6", "C) 2, 7, 8", "D) 3, 5, 6"]', 'B',
  'Tinch okeanning shimoli-g‘arbi (Oxota, Yapon dengizlari) va Shimoliy dengiz jahonda eng ko‘p baliq ovlanadigan hududlardir (1, 5, 6 sonlari).'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

-- Test: Geografiya fan olimpiadasi — Tuman bosqichi (10-sinf, 2024)
INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q1', 'olympiad-tuman-10-2024', 1, 1, 0.9,
  'medium', 'closed', 'Tropik Afrikada quyidagi qaysi primitiv dinga e’tiqod qiluvchilar ko‘p yashaydi?',
  NULL, '["A) totemizm", "B) buddizm", "C) feteshizm", "D) shamanizm"]', 'C',
  'Tropik Afrikaning tub aholisi orasida qadimiy diniy e’tiqodlardan fetishizm (narsalarga sig‘inish) va animizm keng tarqalgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q2', 'olympiad-tuman-10-2024', 2, 1, 0.9,
  'medium', 'closed', 'Quyidagi qaysi shahar Andijon viloyatining Qirg‘izistonga chegara qismida joylashmagan?',
  NULL, '["A) Bo‘z sh.", "B) Qorasuv sh.", "C) Xonobod sh.", "D) Paxtaobod sh."]', 'A',
  'Andijon viloyatining Qorasuv, Xonobod va Paxtaobod shaharlari Qirg‘iziston bilan chegaradosh, ammo Bo‘z shahri Farg‘ona viloyati bilan chegaradosh hududda joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q3', 'olympiad-tuman-10-2024', 3, 1, 0.9,
  'medium', 'closed', 'Amudaryo va Ili daryolarining deltalarida qanday tuproq turi tarqalgan?',
  NULL, '["A) sur-qo‘ng‘ir tuproq", "B) bo‘z tuproq", "C) taqirli tuproq", "D) o‘tloq-allyuvial tuproq"]', 'D',
  'Daryo deltalari va qayirlarida doimiy namlanish sharoitida o‘tloq-allyuvial tuproqlar shakllanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q4', 'olympiad-tuman-10-2024', 4, 1, 0.9,
  'medium', 'closed', 'Shimoliy Afrikadagi qaysi mamlakatlar neft-gaz zaxiralariga ko‘ra dunyoda yetakchi o‘rinda turadi?',
  NULL, '["A) Marokash va Misr", "B) Jazoir va Liviya", "C) Chad va Jazoir", "D) Misr va Tunis"]', 'B',
  'Shimoliy Afrikada Jazoir va Liviya neft va tabiiy gaz zaxiralari hamda qazib olish bo‘yicha mintaqada yetakchi hisoblanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q5', 'olympiad-tuman-10-2024', 5, 1, 0.9,
  'medium', 'closed', 'Quruqlikda tabiat zonalarining hosil bo‘lishi quyidagilarning qaysi biriga bog‘liq emas?',
  NULL, '["A) Relyefga", "B) Havo haroratiga", "C) Albedoga", "D) Yog‘in miqdoriga"]', 'C',
  'Tabiat zonalari relyef, havo harorati va yog‘in miqdori nisbatiga bog‘liq bo‘lib, albedo zonalarning shakllanishida bevosita mustaqil omil emas.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q6', 'olympiad-tuman-10-2024', 6, 1, 0.9,
  'medium', 'closed', 'Mamlakatimizdagi mehnatda band aholining 11%i quyidagi qaysi sohada faoliyat yuritadi?',
  NULL, '["A) Qurilishda", "B) Savdoda", "C) Sanoatda", "D) Sog‘liqni saqlashda"]', 'B',
  'Statistik ma’lumotlarga binoan, O‘zbekiston iqtisodiyotida mehnatda band aholining taxminan 11 foizi savdo sohasiga to‘g‘ri keladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q7', 'olympiad-tuman-10-2024', 7, 1, 0.9,
  'medium', 'closed', 'Qoratov tog‘lari quyidagi qaysi tabiiy geografik okrugning shimolida joylashgan?',
  NULL, '["A) Qizilqum", "B) Qashqadaryo", "C) O‘rta Zarafshon", "D) Mirzacho‘l"]', 'C',
  'Qoratov tizmasi O‘rta Zarafshon tabiiy geografik okrugining shimoliy qismida joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q8', 'olympiad-tuman-10-2024', 8, 1, 0.9,
  'medium', 'closed', 'G‘alaba cho‘qqisi qaysi mamlakatlar chegarasida joylashgan?',
  NULL, '["A) Xitoy va Qirg‘iziston", "B) Mongoliya va Xitoy", "C) Tojikiston va Qirg‘iziston", "D) Qozog‘iston va Xitoy"]', 'A',
  'Tyanshan tog‘ tizmasining eng baland nuqtasi bo‘lgan G‘alaba cho‘qqisi (7439 m) Qirg‘iziston va Xitoy chegarasida joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q9', 'olympiad-tuman-10-2024', 9, 1, 0.9,
  'medium', 'closed', 'Aholi tabiiy ko‘payishining manfiy holati nima deb ataladi?',
  NULL, '["A) Demografik portlash", "B) Mexanik ko‘payish", "C) Urbanizatsiya", "D) Depopulyatsiya"]', 'D',
  'Aholi o‘lim darajasi tug‘ilish darajasidan yuqori bo‘lib, aholi soni qisqarishi depopulyatsiya (demografik inqiroz) deb ataladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q10', 'olympiad-tuman-10-2024', 10, 1, 0.9,
  'medium', 'closed', 'Quyidagi qaysi geografik obyekt Oybo‘g‘ir do‘ngligidan shimolda joylashgan?',
  NULL, '["A) Dovutko‘l", "B) Borsakelmas", "C) Qoplonqir", "D) Asakaovdon 2-qism: Har bir topshiriq 1,5 balldan baholanadi"]', 'B',
  'Borsakelmas botig‘i Ustyurt platosida Oybo‘g‘ir do‘ngligidan shimolda joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q11', 'olympiad-tuman-10-2024', 11, 2, 1.5,
  'hard', 'closed', 'Parrandalar soniga ko‘ra respublikamizda eng so‘nggi o‘rinlarda turuvchi viloyatlarni aniqlang.',
  NULL, '["A) Jizzax, Namangan, Navoiy", "B) Samarqand, Buxoro, Surxondaryo", "C) Toshkent, Samarqand, Andijon", "D) Sirdaryo, Navoiy, Jizzax"]', 'D',
  'Respublikamizda parrandachilik mahsulotlari yetishtirish bo‘yicha Sirdaryo, Navoiy va Jizzax viloyatlari eng oxirgi o‘rinlarda turadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q12', 'olympiad-tuman-10-2024', 12, 2, 1.5,
  'hard', 'closed', 'Sharqiy Yevropa platformasi bilan yosh Turon platformasi chegarasi O‘rta Osiyoning qaysi qismiga to‘g‘ri
keladi?',
  NULL, '["A) shimoliga", "B) shimoli-g‘arbiga", "C) shimoli-sharqiga", "D) g‘arbiga"]', 'B',
  'Qadimgi Sharqiy Yevropa platformasi bilan yosh Turon platformasi tutashgan chegara O‘rta Osiyoning shimoli-g‘arbiy qismidan (Emba, Ustyurt shimoli) o‘tadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q13', 'olympiad-tuman-10-2024', 13, 2, 1.5,
  'hard', 'image', 'Quyidagi rasmda alohida rang bilan belgilangan hududlar qaysi tabiat zonasida joylashgan?',
  '/images/olympiad/tuman-10-2024/q13.png', '["A) Balandlik mintaqalari", "B) Savanna va siyrak o‘rmonlar", "C) Qattiq bargli doimiy yashil o‘rmonlar va butazorlar", "D) Chalacho‘l va cho‘llar"]', 'C',
  'Xaritada belgilangan O‘rta dengiz bo‘yi, Janubiy Avstraliya va Kaliforniyada qattiq bargli doimiy yashil o‘rmonlar va butazorlar joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q14', 'olympiad-tuman-10-2024', 14, 2, 1.5,
  'hard', 'image', 'Quyidagi rasmda harf bilan ko‘rsatilgan chiziqlarning qaysilari daryoni ifodalamaydi?',
  '/images/olympiad/tuman-10-2024/q14.png', '["A) A, B, D", "B) A, D, C", "C) B, D, C", "D) C, A, B"]', 'A',
  'Gorizontallarda suvayirg‘ich tizma chiziqlari (A, B, D) daryoni ifodalamaydi, faqat vodiyning eng chuqur pastqam joyi daryo o‘zani bo‘ladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q15', 'olympiad-tuman-10-2024', 15, 2, 1.5,
  'hard', 'image', 'Samolyot bosh meridiandan ekvator bo‘ylab g‘arbga qarab uchdi va 520 km masofani bosib o‘tdi. U
quyidagi rasmda ko‘rsatilgan qaysi zonaga yetganligini aniqlang.',
  '/images/olympiad/tuman-10-2024/q15.png', '["A) D zonaga", "B) A zonaga", "C) B zonaga", "D) C zonaga"]', 'B',
  '520 km masofa ekvator bo‘ylab 520 / 111,3 ≈ 4,67° ni tashkil etadi va bosh meridiandan g‘arbdagi A zonaga to‘g‘ri keladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q16', 'olympiad-tuman-10-2024', 16, 2, 1.5,
  'hard', 'image', 'Quyidagi xarita-sxemada Balear va Ioniya dengizlari qaysi raqamlar bilan ko‘rsatilgan?',
  '/images/olympiad/tuman-10-2024/q16.png', '["A) 8 va 2", "B) 1 va 4", "C) 3 va 5", "D) 3 va 7"]', 'C',
  'Xaritada Balear dengizi (Ispaniya sharqida) 3-raqam, Ioniya dengizi (Gretsiya va Italiya oralig‘ida) 5-raqam bilan ko‘rsatilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q17', 'olympiad-tuman-10-2024', 17, 2, 1.5,
  'hard', 'image', 'Quyidagi xarita fragmentida strelkalar bilan ko‘rsatilgan sayohatni amalga oshirgan dengizchi va u
o‘rgangan okean nomini aniqlang.',
  '/images/olympiad/tuman-10-2024/q17.png', '["A) V.Bering, Atlantika okeani", "B) J.Kuk, Tinch okean", "C) G.Shelixov, Shimoliy Muz okeani", "D) A.Chirikov, Tinch okean"]', 'D',
  'Xaritada rus dengizchisi Aleksey Chirikovning 1741-yilda Tinch okeani shimoli va Shimoliy Amerika qirg‘oqlariga qilgan sayohat yo‘li tasvirlangan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q18', 'olympiad-tuman-10-2024', 18, 2, 1.5,
  'hard', 'closed', 'Baffin Yeri oroli va Labrador yarimoroli oralig‘idagi bo‘g‘iz nomini aniqlang.',
  NULL, '["A) Elsmir bo‘g‘izi", "B) Deyvis bo‘g‘izi", "C) Gudzon bo‘g‘izi", "D) Labrador bo‘g‘izi"]', 'C',
  'Baffin Yeri oroli bilan Labrador yarimorolini bir-biridan Gudzon bo‘g‘izi ajratib turadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q19', 'olympiad-tuman-10-2024', 19, 2, 1.5,
  'hard', 'closed', 'Quyidagilar orasidan Farg‘ona tizmasidan boshlanuvchi daryolar to‘g‘ri berilgan qatorni belgilang.
1) Kosonsoy; 2) Ko‘gart; 3) Isfara; 4) Norin; 5) Yassi; 6) Aravansoy; 7) Moylisuv; 8) Qorao‘ngur; 9)
Oqbura; 10) Chodaksoy.',
  NULL, '["A) 2, 5, 7, 8", "B) 3, 5, 6, 9", "C) 1, 4, 6, 8", "D) 1, 2, 7, 8"]', 'A',
  'Farg‘ona tizmasining g‘arbiy yonbag‘irlaridan Ko‘gart (2), Yassi (5), Moylisuv (7) va Qorao‘ngur (8) daryolari oqib tushadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q20', 'olympiad-tuman-10-2024', 20, 2, 1.5,
  'hard', 'image', 'Quyidagi xarita-sxemada 1 va 2 raqamlari bilan ko‘rsatilgan daryolar oralig‘idagi tekislikda aholi zichligi
qancha?',
  '/images/olympiad/tuman-10-2024/q20.png', '["A) 100-200 kishi/kv.km", "B) 800-1000 kishi/kv.km", "C) 545-750 kishi/kv.km", "D) 1000-1500 kishi/kv.km 3-qism: Har bir topshiriq 2,6 balldan baholanadi"]', 'C',
  'Ko‘rsatilgan daryolar oralig‘idagi tekislikda aholi zichligi o‘rtacha 545-750 kishi/kv.km ni tashkil etadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q21', 'olympiad-tuman-10-2024', 21, 3, 2.6,
  'expert', 'closed', 'Quyidagilar orasidan ham yirik shoxli qoramollar soniga, ham qo‘y va echkilar soniga ko‘ra
respublikamizda bir xil o‘rinda turuvchi viloyatlarni ajrating.
1. Andijon; 2. Buxoro; 3. Qoraqalpog‘iston; 4. Toshkent; 5. Namangan; 6. Navoiy; 7. Qashqadaryo. 8.
Surxondaryo; 9. Jizzax; 10. Sirdaryo; 11. Xorazm; 12. Farg‘ona; 13. Samarqand.',
  NULL, '["A) 8, 12", "B) 2, 4", "C) 5, 10", "D) 7, 9"]', 'A',
  'Yirik shoxli qoramollar hamda qo‘y-echkilar soni bo‘yicha Surxondaryo (8) va Farg‘ona (12) viloyatlari respublikada bir xil o‘rinlarni egallaydi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q22', 'olympiad-tuman-10-2024', 22, 3, 2.6,
  'expert', 'image', 'Quyidagi ma’lumotlar asosida Eyler-Venn diagrammasiga mos tushadigan to‘g‘ri javobni toping.
I                                         Mis
II                   nikel                 a)                  bronza
III                 aluminiy               b)                    latun
IV                   qalayi                 c)               duraluminiy
V                     rux                 d)                  melxior',
  '/images/olympiad/tuman-10-2024/q22.png', '["A) ", "B) ", "C) ", "D) "]', 'A',
  'Mis, rux, nikel, qalay va alyuminiy asosidagi qotishmalarning Euler-Venn diagrammasidagi to‘g‘ri taqsimoti A variantda berilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q23', 'olympiad-tuman-10-2024', 23, 3, 2.6,
  'expert', 'closed', 'Tog‘ tizmasi ........... ga yaqin va ................ bo‘lsa, unda balandlik mintaqalari soni shunchalik ko‘p bo‘ladi.
Nuqtalar o‘rniga mos javobni qo‘ying.',
  NULL, '["A) qutblar, qadimgi", "B) bosh meridian, tik yonbag‘irli", "C) ekvator, baland", "D) yonbag‘irlari nishab, shamolga ro‘para"]', 'C',
  'Tog‘ tizmasi ekvatorga qanchalik yaqin va baland bo‘lsa, uning etagidan cho‘qqisigacha bo‘lgan balandlik mintaqalari soni shunchalik ko‘p bo‘ladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q24', 'olympiad-tuman-10-2024', 24, 3, 2.6,
  'expert', 'closed', 'O‘rta Osiyo daryolari va ularga qurilgan suv omborlar mos ravishda ko‘rsatilgan javobni belgilang.
№         Daryolar                      Suv omborlari
1            Ili           a            Qayroqqum
2          Norin           b             To‘xtag‘ul
3       Zarafshon          c            Qopchig‘ay
4          Vaxsh           d            Tuyabo‘g‘iz
5        Sirdaryo          e               Norak
6       Ohangaron           f           Quyimozor',
  NULL, '["A) 1-c, 2-b, 3-f, 4-e, 5-a, 6-d", "B) 1-a, 2-b, 3-d, 4-e, 5-c, 6-f", "C) 1-c, 2- b, 3-d, 4-e, 5-a, 6-f", "D) 1-c, 2-e, 3-f, 4-b, 5-a, 6-d"]', 'A',
  'Ili daryosida Qopchig‘ay (1-c), Norinda To‘xtag‘ul (2-b), Zarafshonda Quyimozor (3-f), Vaxshda Norak (4-e), Sirdaryoda Qayroqqum (5-a), Ohangaronda Tuyabo‘g‘iz (6-d).'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q25', 'olympiad-tuman-10-2024', 25, 3, 2.6,
  'expert', 'closed', 'Olmaliq, Angren, Navoiy, Andijon, Farg‘ona, Toshkent kabi shaharlarining havosi qaysi gazlar va zararli
birikmalar bilan ifloslangan?',
  NULL, '["A) uglerod, azod oksidlari, uglevodorod va qattiq birikmalar", "B) oltingugurt qo‘sh oksidi, uglerod oksidi, uglevodorod", "C) vodorod ftorid, ammiak, azot oksidi, qattiq brikmalar", "D) oltingugurt, azot oksidlari, ammiak, vodorod ftorid"]', 'B',
  'Yirik sanoat shaharlari atmosferasida oltingugurt qo‘sh oksidi (SO2), uglerod oksidi (CO) va uglevodorodlar asosiy ifloslantiruvchi moddalardir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q26', 'olympiad-tuman-10-2024', 26, 3, 2.6,
  'expert', 'image', 'Quyidagi qaysi rasm Avstraliya materigi (iyul oyida) uchun xos?',
  '/images/olympiad/tuman-10-2024/q26.png', '["A) ", "B) ", "C) ", "D) "]', 'C',
  'Avstraliya janubiy yarimsharda joylashgani sababli, iyul oyida u yerda qish mavsumi bo‘ladi va izotermalar shimolga qarab egiladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q27', 'olympiad-tuman-10-2024', 27, 3, 2.6,
  'expert', 'image', 'Quyidagi xarita-sxemada 2 raqami bilan ko‘rsatilgan davlatning hududini relyef jihatdan qaysi daryolar
ikkiga ajratadi?',
  '/images/olympiad/tuman-10-2024/q27.png', '["A) Zambezi va Oranj", "B) Shari va Limpopo", "C) Niger va Benue", "D) Senegal va Volta"]', 'C',
  'Nigeriya hududini relyef jihatdan ikkiga ajratuvchi asosiy daryolar Niger va uning yirik irmog‘i Benue hisoblanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q28', 'olympiad-tuman-10-2024', 28, 3, 2.6,
  'expert', 'image', 'Quyidagi ma’lumotlar asosida Eyler-Venn diagrammasiga mos keladigan to‘g‘ri javobni toping.
I. AQSH, II. Kanada, III. Braziliya
a) Shahar aholisining ulushi 80% dan yuqori.
b) Boshqaruv shakli – prezidentlik respublikasi.
c) Yalpi sanoat mahsulotlarining hajmi bo‘yicha dunyoda 2-o‘rinda turadi.
d) Jahondagi eng baland teleminora joylashgan.
e) Chuchuk suv bilan yaxshi taminlangan davlatlar qatoriga kiradi.
f) Yirik neft, temir, uran, nikel konlari mavjud.
g) Go‘sht ishlab chiqarish va eksport qilish bo‘yicha jahondagi yetakchi davlatlardan biri.',
  '/images/olympiad/tuman-10-2024/q28.png', '["A) ", "B) ", "C) ", "D) "]', 'B',
  'AQSH, Kanada va Braziliyaning shahar aholisi, teleminora (Kanada), go‘sht eksporti (Braziliya, AQSH) va minerallar bo‘yicha Euler-Venn diagrammasi B variantda to‘g‘ri keltirilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q29', 'olympiad-tuman-10-2024', 29, 3, 2.6,
  'expert', 'closed', 'Berilgan ma’lumotlar asosida bir biriga to‘g‘ri keladigan javobni belgilang.
Tuproq                         Chirindi miqdori ( % )
a)       O‘tloq-alluvial         x)                0,7-1,2
b)          Och bo‘z             y)                 1-1,5
c)      Sur tusli qo‘ng‘ir       z)                0,2-0,3',
  NULL, '["A) 1, 3, 5", "B) 2, 3, 5", "C) 2, 3, 4", "D) 1, 2, 4"]', 'B',
  'Chirindi miqdori: o‘tloq-allyuvial tuproqlarda 1-1,5%, och bo‘z tuproqlarda 0,7-1,2%, sur tusli qo‘ng‘ir tuproqlarda 0,2-0,3% ni tashkil qiladi (2, 3, 5).'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-10-2024-q30', 'olympiad-tuman-10-2024', 30, 3, 2.6,
  'expert', 'closed', 'Sangzor-Nurota tog‘ oraliq botig‘ini qaysi tog‘lar o‘rab turadi?',
  NULL, '["A) shimolda Nurota, shimoli-sharqda Morguzar, janubda Janubiy Nurota va Chumqor", "B) shimolda Morguzar va Nurota, sharqda Chumqor, janubda Janubiy Nurota", "C) shimoli-g‘arbda Nurota, shimoli-sharqda Morguzar, sharqda Chumqor, janubda Janubiy Nurota", "D) shimolda Shimoliy Nurota, shimoli-g‘arbda Morguzar, janubda Janubiy Nurota va Chumqor"]', 'A',
  'Sangzor-Nurota tog‘ oraliq botig‘ini shimolda Nurota, shimoli-sharqda Morguzar, janubda Janubiy Nurota va Chumqortov tog‘lari o‘rab turadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

-- Test: Geografiya fan olimpiadasi — Tuman bosqichi (11-sinf, 2024)
INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q1', 'olympiad-tuman-11-2024', 1, 1, 0.9,
  'medium', 'closed', 'Hindistonning Panjob shtatida quyidagi qaysi mahalliy dinga e’tiqod qiluvchilar ko‘p yashaydi?',
  NULL, '["A) sintoizm", "B) buddizm", "C) sikxizm", "D) daosizm"]', 'C',
  'Hindistonning shimoli-g‘arbidagi Panjob shtatida aholining aksariyati sikxizm diniga e’tiqod qiladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q2', 'olympiad-tuman-11-2024', 2, 1, 0.9,
  'medium', 'closed', 'Quyidagi qaysi shahar Buxoro viloyatining Turkmanistonga chegara qismida joylashgan?',
  NULL, '["A) Olot sh.", "B) Kogon sh.", "C) Buxoro sh.", "D) Vobkent sh."]', 'A',
  'Olot shahri Buxoro viloyatining Turkmaniston bilan chegara qismida joylashgan transport tugunidir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q3', 'olympiad-tuman-11-2024', 3, 1, 0.9,
  'medium', 'image', 'Rasmda ko‘rsatilgan xarita qaysi proyeksiya asosida tuzilgan?',
  '/images/olympiad/tuman-11-2024/q3.png', '["A) teng yonli", "B) konussimon", "C) silindrik", "D) azimutal"]', 'D',
  'Rasmda qutbiy hududlar tekislikka markaziy nuqtadan proyeksiyalangan azimutal proyeksiya asosida tasvirlangan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q4', 'olympiad-tuman-11-2024', 4, 1, 0.9,
  'medium', 'closed', 'Shimoliy Afrikadagi qaysi mamlakatlar neft-gaz zaxiralariga ko‘ra dunyoda yetakchi o‘rinda turadi?',
  NULL, '["A) Marokash va Misr", "B) Jazoir va Liviya", "C) Chad va Jazoir", "D) Misr va Tunis"]', 'B',
  'Shimoliy Afrikada neft va tabiiy gaz zaxiralari bo‘yicha Jazoir va Liviya dunyoda yetakchi mamlakatlar sirasiga kiradi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q5', 'olympiad-tuman-11-2024', 5, 1, 0.9,
  'medium', 'closed', 'Quyidagi qaysi shahar shamol ko‘p esadigan hududda joylashganligi sababli uning atrofida ihotazorlar barpo
qilingan?',
  NULL, '["A) Qarshi", "B) Zarafshon", "C) Bekobod", "D) Olmaliq"]', 'C',
  'Bekobod shahrida kuchli ''Bekobod shamoli'' esib turishi sababli shahar atrofida keng ko‘lamli daraxtzor-ihotazorlar barpo etilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q6', 'olympiad-tuman-11-2024', 6, 1, 0.9,
  'medium', 'closed', 'Mamlakatimizdagi mehnatda band aholining 27,3%i quyidagi qaysi sohada faoliyat yuritadi?',
  NULL, '["A) Qurilishda", "B) Qishloq xo‘jaligida", "C) Sanoatda", "D) Sog‘liqni saqlashda"]', 'B',
  'Respublikamizda mehnatda band aholining 27,3 foizi agrar tarmoqda, ya’ni qishloq xo‘jaligida mehnat qiladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q7', 'olympiad-tuman-11-2024', 7, 1, 0.9,
  'medium', 'closed', 'Qoratepa tog‘lari quyidagi qaysi tabiiy geografik okrugning shimolida joylashgan?',
  NULL, '["A) Qizilqum", "B) O‘rta Zarafshon", "C) Qashqadaryo", "D) Mirzacho‘l"]', 'C',
  'Qoratepa tog‘lari (Zarafshon tizmasi tarmog‘i) Qashqadaryo tabiiy geografik okrugining shimoliy chegarasida joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q8', 'olympiad-tuman-11-2024', 8, 1, 0.9,
  'medium', 'closed', 'Qaysi mamlakatning poytaxti uning janubi-g‘arbidagi Hisor vodiysida joylashgan?',
  NULL, '["A) Qirg‘iziston", "B) Mongoliya", "C) Afg‘oniston", "D) Tojikiston"]', 'D',
  'Tojikiston poytaxti Dushanbe shahri mamlakatning janubi-g‘arbiy qismidagi Hisor vodiysida joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q9', 'olympiad-tuman-11-2024', 9, 1, 0.9,
  'medium', 'closed', 'Stromboli vulqoni qaysi mamlakat hududida joylashgan?',
  NULL, '["A) Italiya", "B) Indoneziya", "C) Ispaniya", "D) Gretsiya"]', 'A',
  'Stromboli vulqoni Italiyaga qarashli Tirren dengizidagi Lipari orollarida joylashgan faol vulqondir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q10', 'olympiad-tuman-11-2024', 10, 1, 0.9,
  'medium', 'closed', 'Quyidagi qaysi geografik obyekt Qorabovur qirlaridan janubda joylashgan?',
  NULL, '["A) Dovutko‘l", "B) Borsakelmas", "C) Qoplonqir", "D) Kassarma 2-qism: Har bir topshiriq 1,5 balldan baholanadi"]', 'C',
  'Qoplonqir qirlari va botig‘i Qorabovur qirlaridan janubda joylashgan geografik obyektdir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q11', 'olympiad-tuman-11-2024', 11, 2, 1.5,
  'hard', 'image', 'Rasmdagi alohida rang bilan ajratilgan hududlarda shakllangan tabiat zonasiga xos yog‘in miqdori va
tuproq turini aniqlang.',
  '/images/olympiad/tuman-11-2024/q11.png', '["A) 500-700 mm, podzol tuproq", "B) 1000 mm, sariq-qo‘ng‘ir tuproq", "C) 1000-1500 mm, qora tuproq", "D) 3000 mm, qizil-sariq ferrolit tuproq"]', 'A',
  'Ko‘rsatilgan mo‘tadil tayga o‘rmonlarida yillik yog‘in 500-700 mm bo‘lib, kislotali podzol tuproqlar shakllanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q12', 'olympiad-tuman-11-2024', 12, 2, 1.5,
  'hard', 'closed', 'Italiyadagi Garda ko‘li Yevropadagi eng chuqur ko‘llardan biri bo‘lib, uning tubiga qarab exolotdan
yuborilgan tovush to‘lqini 0,231 sekundda yetib borganligi ma’lum. Ko‘lning chuqurligi qancha?',
  NULL, '["A) 346,5 m", "B) 564,4 m", "C) 356,5 m", "D) 436,5 m"]', 'A',
  'Tovushning suvdagi tezligi 1500 m/s. Chuqurlik h = 1500 * 0,231 = 346,5 metr.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q13', 'olympiad-tuman-11-2024', 13, 2, 1.5,
  'hard', 'image', 'Quyidagi rasmda alohida rang bilan belgilangan hududlar qaysi tabiat zonasida joylashgan?',
  '/images/olympiad/tuman-11-2024/q13.png', '["A) Balandlik mintaqalari", "B) Savanna va siyrak o‘rmonlar", "C) Qattiq bargli doimiy yashil o‘rmonlar va butazorlar", "D) Chalacho‘l va cho‘llar"]', 'C',
  'Xaritada subtropik mintaqaning g‘arbiy qismidagi qattiq bargli doimiy yashil o‘rmonlar va butazorlar ajratilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q14', 'olympiad-tuman-11-2024', 14, 2, 1.5,
  'hard', 'closed', '19° sharqiy uzunlik meridianida bir-biridan Almadi va Ras-Xafun burunlari oralig`iga teng masofada
uzoqda joylashgan ikki nuqtadan shimoldagisi 55° shimoliy kenglikda joylashgan bo‘lsa, ikkinchi shaharning
koordinatasini aniqlang.',
  NULL, '["A) 12,5° j.k., 19° shq.u.", "B) 21,5° sh.k., 91° shq.u.", "C) 15,2° j.k., 19° shq.u.", "D) 12,5° sh.k., 19° shq.u."]', 'A',
  'Almadi (17° g‘.u.) va Ras-Xafun (51° shq.u.) oralig‘idagi masofa 68° bo‘lib, 55° sh.k. dagi nuqtadan janubdagi nuqta 12,5° j.k., 19° shq.u. koordinatasiga to‘g‘ri keladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q15', 'olympiad-tuman-11-2024', 15, 2, 1.5,
  'hard', 'image', 'Samolyot bosh meridiandan ekvator bo‘ylab g‘arbga qarab uchdi va 180 km masofani bosib o‘tdi. U
quyidagi rasmda ko‘rsatilgan qaysi zonaga yetganligini aniqlang.',
  '/images/olympiad/tuman-11-2024/q15.png', '["A) D zonaga", "B) A zonaga", "C) B zonaga", "D) C zonaga"]', 'B',
  '180 km ekvatorda 180 / 111,3 ≈ 1,62° bo‘lib, bosh meridiandan g‘arbdagi A zonaga to‘g‘ri keladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q16', 'olympiad-tuman-11-2024', 16, 2, 1.5,
  'hard', 'closed', 'Chuqurligi 4850 metr bo‘lgan suv havzasining tubida harorat +2°C ekanligi ma’lum bo‘lsa, xuddi shu
paytda suv yuzasida harorat necha t°C ga teng bo‘ladi?',
  NULL, '["A) -11°C", "B) +9°C", "C) -9°C", "D) +11°C"]', 'D',
  'Okean chuqurligida harorat pasayib boradi. Tubida +2°C bo‘lgan havzada yuzadagi harorat +11°C ni tashkil etadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q17', 'olympiad-tuman-11-2024', 17, 2, 1.5,
  'hard', 'image', 'Quyidagi xarita fragmentida strelkalar bilan ko‘rsatilgan sayohatni amalga oshirgan dengizchi va u
o‘rgangan okean nomini aniqlang.',
  '/images/olympiad/tuman-11-2024/q17.png', '["A) J.Kuk, Tinch okean", "B) V.Bering, Atlantika okeani", "C) A.Chirikov, Tinch okean", "D) G.Shelixov, Shimoliy Muz okeani"]', 'C',
  'Xaritada rus sayyohi Aleksey Chirikovning 1741-yilda Tinch okeani shimolida amalga oshirgan ekspeditsiyasi ko‘rsatilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q18', 'olympiad-tuman-11-2024', 18, 2, 1.5,
  'hard', 'closed', 'Pekin shahri 39°55ʹ shimoliy kenglikda joylashgan. Bu shaharda 22-dekabrda Quyoshning ufqdan
balandligi necha gradusni tashkil etadi?',
  NULL, '["A) 57°25ʹ", "B) 26°38ʹ", "C) 62°83ʹ", "D) 41°36ʹ"]', 'B',
  '22-dekabrda Quyosh tushish burchagi: h = 90° - 39°55'' - 23°27'' = 50°05'' - 23°27'' = 26°38''.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q19', 'olympiad-tuman-11-2024', 19, 2, 1.5,
  'hard', 'closed', 'Quyidagilar orasidan Farg‘ona tizmasidan boshlanmaydigan daryolar to‘g‘ri berilgan qatorni belgilang.
1) Kosonsoy; 2) Ko‘gart; 3) Isfara; 4) Norin; 5) Yassi; 6) Aravansoy; 7) Moylisuv; 8) Qorao‘ngur; 9)
Oqbura; 10) Chodaksoy.',
  NULL, '["A) 2, 5, 7, 9", "B) 3, 5, 6, 9", "C) 1, 4, 6, 8", "D) 1, 3, 6, 10"]', 'D',
  'Kosonsoy (1), Isfara (3), Aravansoy (6) va Chodaksoy (10) daryolari Farg‘ona tizmasidan emas, balki Chatqol, Qurama va Turkiston tizmalaridan boshlanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q20', 'olympiad-tuman-11-2024', 20, 2, 1.5,
  'hard', 'image', 'Quyidagi xarita-sxemada 3 raqami bilan ko‘rsatilgan daryo vodiysida aholi zichligi qancha?',
  '/images/olympiad/tuman-11-2024/q20.png', '["A) 120-240 kishi/kv.km", "B) 480-1000 kishi/kv.km", "C) 245-350 kishi/kv.km", "D) 1400-1500 kishi/kv.km 3-qism: Har bir topshiriq 2,6 balldan baholanadi"]', 'C',
  '3-raqamli daryo vodiysida aholi zichligi 245-350 kishi/kv.km oralig‘ida bo‘ladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q21', 'olympiad-tuman-11-2024', 21, 3, 2.6,
  'expert', 'closed', 'Quyidagilar orasidan ham yirik shoxli qoramollar soniga, ham qo‘y va echkilar soniga ko‘ra
respublikamizda bir xil o‘rinda turuvchi viloyatlarni ajrating.
1. Andijon; 2. Buxoro; 3. Qoraqalpog‘iston; 4. Toshkent; 5. Namangan; 6. Navoiy; 7. Qashqadaryo. 8.
Surxondaryo; 9. Jizzax; 10. Sirdaryo; 11. Xorazm; 12. Farg‘ona; 13. Samarqand.',
  NULL, '["A) 8, 12", "B) 2, 4", "C) 5, 10", "D) 7, 9"]', 'A',
  'Surxondaryo (8) va Farg‘ona (12) viloyatlari qoramollar hamda qo‘y-echkilar soniga ko‘ra mamlakatda bir xil o‘rinlarda turadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q22', 'olympiad-tuman-11-2024', 22, 3, 2.6,
  'expert', 'image', 'Rasmda qaysi raqam bilan Reyn daryosining mansabi ko‘rsatilgan?',
  '/images/olympiad/tuman-11-2024/q22.png', '["A) 5", "B) 11", "C) 6", "D) 12"]', 'C',
  'Reyn daryosining Shimoliy dengizga quyiladigan deltalari xaritada 6-raqam bilan ko‘rsatilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q23', 'olympiad-tuman-11-2024', 23, 3, 2.6,
  'expert', 'image', 'Quyidagi qaysi rasm Katta Havza (yanvar oyida) uchun xos?',
  '/images/olympiad/tuman-11-2024/q23.png', '["A) ", "B) ", "C) ", "D) "]', 'B',
  'Shimoliy Amerikadagi Katta Havza platosida yanvar oyida sovuq va quruq mo‘tadil iqlim hukm suradi (B diagramma).'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q24', 'olympiad-tuman-11-2024', 24, 3, 2.6,
  'expert', 'closed', 'O‘rta Osiyo daryolari va ularga qurilgan suv omborlar mos ravishda ko‘rsatilgan javobni belgilang.
№         Daryolar                      Suv omborlari
1            Ili           a            Qayroqqum
2          Norin           b             To‘xtag‘ul
3       Zarafshon          c            Qopchig‘ay
4          Vaxsh           d            Tuyabo‘g‘iz
5        Sirdaryo          e               Norak
6       Ohangaron           f           Quyimozor',
  NULL, '["A) 1-c, 2-b, 3-f, 4-e, 5-a, 6-d", "B) 1-a, 2-b, 3-d, 4-e, 5-c, 6-f", "C) 1-c, 2- b, 3-d, 4-e, 5-a, 6-f", "D) 1-c, 2-e, 3-f, 4-b, 5-a, 6-d"]', 'A',
  'Daryolar va suv omborlari mosligi: Ili - Qopchig‘ay, Norin - To‘xtag‘ul, Zarafshon - Quyimozor, Vaxsh - Norak, Sirdaryo - Qayroqqum, Ohangaron - Tuyabo‘g‘iz.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q25', 'olympiad-tuman-11-2024', 25, 3, 2.6,
  'expert', 'closed', 'Olmaliq, Angren, Navoiy, Andijon, Farg‘ona, Toshkent kabi shaharlarining havosi qaysi gazlar va zararli
birikmalar bilan ifloslangan?',
  NULL, '["A) uglerod, azod oksidlari, uglevodorod va qattiq birikmalar", "B) oltingugurt qo‘sh oksidi, uglerod oksidi, uglevodorod", "C) vodorod ftorid, ammiak, azot oksidi, qattiq brikmalar", "D) oltingugurt, azot oksidlari, ammiak, vodorod ftorid"]', 'B',
  'Yirik sanoat markazlarida oltingugurt qo‘sh oksidi, uglerod oksidi va uglevodorod gazlari havoni eng ko‘p ifloslaydi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q26', 'olympiad-tuman-11-2024', 26, 3, 2.6,
  'expert', 'closed', 'Qor-yomg‘ir va yerosti suvlaridan to‘yinuvchi daryolarni aniqlang.',
  NULL, '["A) G‘uzordaryo, Sangzor, G‘ovasoy", "B) Zominsuv, Sheroboddaryo, To‘sunsoy", "C) Isfayramsoy, So‘x, Chirchiq", "D) Qashqadaryo, G‘uzordaryo, Oqdaryo"]', 'A',
  'G‘uzordaryo, Sangzor va G‘ovasoy daryolari asosan mavsumiy qor, yomg‘ir va yerosti suvlaridan to‘yinadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q27', 'olympiad-tuman-11-2024', 27, 3, 2.6,
  'expert', 'closed', 'Paleozoy erasining kaledon tog‘ hosil bo‘lish bosqichida qaysi tog‘lar hosil bo‘lgan?',
  NULL, '["A) Baykalbo‘yi, Tyanshan, Ural, Markaziy Yevropa", "B) Oltoy, Tyanshan, Qozog‘iston past tog‘lari, Shimoliy Skandinaviya, Shimoliy Appalachi", "C) And, Janubiy Appalachi, Chukotka, Kamchatka, Yangi Zelandiya", "D) Yuqori Yana, Markaziy Kordilyera, Qozog‘iston tog‘lari, Alp-Himolay mintaqasidagi tog‘lar"]', 'B',
  'Paleozoyning kaledon burmalanishida Shimoliy Skandinaviya, Shimoliy Appalachi, Oltoy, Tyanshan shimoli va Qozog‘iston past tog‘lari hosil bo‘lgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q28', 'olympiad-tuman-11-2024', 28, 3, 2.6,
  'expert', 'image', 'Quyidagi ma’lumotlar asosida Eyler-Venn diagrammasiga mos tushadigan to‘g‘ri javobni toping.
I                                             Mis
II                    nikel                   a)                   bronza
III                  aluminiy                  b)                    latun
IV                    qalayi                   c)                 duraluminiy
V                      rux                    d)                   melxior',
  '/images/olympiad/tuman-11-2024/q28.png', '["A) ", "B) ", "C) ", "D) "]', 'A',
  'Mis qotishmalarining Euler-Venn diagrammasidagi to‘g‘ri taqsimoti A variantda ifodalangan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q29', 'olympiad-tuman-11-2024', 29, 3, 2.6,
  'expert', 'closed', 'Berilgan ma’lumotlar asosida bir-biriga to‘g‘ri keladigan javobni belgilang.
Tuproq                        Chirindi miqdori ( % )
a)       O‘tloq-alluvial         x)                0,7-1,2
b)          Och bo‘z             y)                 1-1,5
c)      Sur tusli qo‘ng‘ir       z)                0,2-0,3',
  NULL, '["A) 1, 3, 5", "B) 2, 3, 5", "C) 2, 3, 4", "D) 1, 2, 4"]', 'B',
  'O‘tloq-allyuvial (1-1,5%), och bo‘z (0,7-1,2%) va sur-qo‘ng‘ir (0,2-0,3%) tuproqlarda chirindi miqdori mos keladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-tuman-11-2024-q30', 'olympiad-tuman-11-2024', 30, 3, 2.6,
  'expert', 'image', 'Quyidagi ma’lumotlar asosida Eyler-Venn diagrammasiga mos keladigan to‘g‘ri javobni toping.
I. AQSH, II. Kanada, III. Braziliya
a) Shahar aholisining ulushi 80% dan yuqori.
b) Boshqaruv shakli – prezidentlik respublikasi.
c) Yalpi sanoat mahsulotlarining hajmi bo‘yicha dunyoda 2-o‘rinda turadi.
d) Jahondagi eng baland teleminora joylashgan.
e) Chuchuk suv bilan yaxshi taminlangan davlatlar qatoriga kiradi.
f) Yirik neft, temir, uran, nikel konlari mavjud.
g) Go‘sht ishlab chiqarish va eksport qilish bo‘yicha jahondagi yetakchi davlatlardan biri.',
  '/images/olympiad/tuman-11-2024/q30.png', '["A) ", "B) ", "C) ", "D) "]', 'B',
  'AQSH, Kanada va Braziliya davlatlarining iqtisodiy-ijtimoiy ko‘rsatkichlari bo‘yicha Euler-Venn diagrammasi B variantda to‘g‘ri aks etgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

-- Test: Geografiya fan olimpiadasi — Viloyat bosqichi (9-sinf, 2024)
INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q1', 'olympiad-viloyat-9-2024', 1, 1, 1.3,
  'medium', 'closed', 'O‘zbekistondagi barcha mutlaq balandliklar qayerdan hisoblanadi?',
  NULL, '["A) Atlantika okeanining Boltiq dengizi sathidan", "B) Hind okeanining Arabiston dengizi sathidan", "C) Tinch okeanning Bering dengizi sathidan", "D) Shimoliy Muz okeanining Barens dengizi sathidan"]', 'A',
  'O‘zbekistondagi barcha mutlaq balandliklar Kronshtadt futshtogi bo‘yicha Atlantika okeanining Boltiq dengizi sathidan hisoblanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q2', 'olympiad-viloyat-9-2024', 2, 1, 1.3,
  'medium', 'image', 'Janubiy Amerika va Tinch okean litosfera plitalari rasmda qaysi raqamlar bilan ko‘rsatilgan?',
  '/images/olympiad/viloyat-9-2024/q2.png', '["A) 1 va 2", "B) 7 va 5", "C) 3 va 5", "D) 4 va 6"]', 'C',
  'Xaritada 3-raqam Janubiy Amerika litosfera plitasini, 5-raqam esa Tinch okean litosfera plitasini ifodalaydi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q3', 'olympiad-viloyat-9-2024', 3, 1, 1.3,
  'medium', 'closed', 'Dengizning chuqurligi 7500 metr bo‘lsa, exolotdan yuborilgan tovush to‘lqini qancha vaqtda dengiz
tubiga yetib borishini hisoblang.',
  NULL, '["A) 5 sekund", "B) 7,5 sekund", "C) 10 sekund", "D) 15 sekund"]', 'A',
  'Tovushning suvdagi tezligi 1500 m/s. Vaqt t = 7500 / 1500 = 5 sekund.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q4', 'olympiad-viloyat-9-2024', 4, 1, 1.3,
  'medium', 'closed', 'Atlantika okeani bilan O‘rta dengizni qaysi bo‘g‘iz tutashtiradi?',
  NULL, '["A) La-Mansh", "B) Dardanel", "C) Bob-El Mandeb", "D) Gibraltar"]', 'D',
  'Atlantika okeani bilan O‘rta dengizni Gibraltar bo‘g‘izi tutashtiradi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q5', 'olympiad-viloyat-9-2024', 5, 1, 1.3,
  'medium', 'closed', 'Janubiy Amerikada ekvatorial o‘rmonlar nima deb ataladi?',
  NULL, '["A) paramos", "B) pampa", "C) patagoniya", "D) selva"]', 'D',
  'Janubiy Amerikadagi Amazonka havzasi doimiy nam ekvatorial o‘rmonlari mahalliy tilda selva deb ataladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q6', 'olympiad-viloyat-9-2024', 6, 1, 1.3,
  'medium', 'closed', 'Tayyor mahsulot tayyorlashda bir qancha korxona qatnashadigan ishlab chiqarish shakli nima deb
ataladi?',
  NULL, '["A) kooperativlashuv", "B) majmua", "C) ixtisoslashuv", "D) markazlashuv"]', 'A',
  'Bir tayyor mahsulot ishlab chiqarishda bir nechta ixtisoslashgan korxonaning o‘zaro hamkorlik qilishi kooperativlashuv deyiladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q7', 'olympiad-viloyat-9-2024', 7, 1, 1.3,
  'medium', 'closed', 'Avstraliyada qaysi iqlim mintaqasi katta maydonni egallaydi?',
  NULL, '["A) subekvatorial", "B) tropik", "C) subtropik", "D) mo‘tadil"]', 'B',
  'Avstraliya materigining eng katta markaziy qismini quruq va issiq tropik iqlim mintaqasi egallagan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q8', 'olympiad-viloyat-9-2024', 8, 1, 1.3,
  'medium', 'closed', 'Quyidagi ko‘llardan qaysi biri to‘g‘on ko‘l hisoblanadi?',
  NULL, '["A) Baykal ko‘li", "B) Kaspiy dengiz", "C) O‘lik dengiz", "D) Sarez ko‘li"]', 'D',
  'Pomirdagi Sarez ko‘li 1911-yilda kuchli zilzila oqibatida Murg‘ob daryosining to‘g‘onlanishi natijasida hosil bo‘lgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q9', 'olympiad-viloyat-9-2024', 9, 1, 1.3,
  'medium', 'image', 'Quyidagi rasmdagi A nuqtaning geografik koordinatasi qaysi javobda to‘g‘ri ko‘rsatilgan?',
  '/images/olympiad/viloyat-9-2024/q9.png', '["A) 40o shimoliy kenglik va 40o sharqiy uzunlik", "B) 40o janubiy kenglik va 40o g‘arbiy uzunlik", "C) 40o shimoliy kenglik va 40o g‘arbiy uzunlik", "D) 40o janubiy kenglik va 40o sharqiy uzunlik"]', 'C',
  'Berilgan kartografik to‘rda A nuqta 40° shimoliy kenglik va 40° g‘arbiy uzunlik kesishmasida joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q10', 'olympiad-viloyat-9-2024', 10, 1, 1.3,
  'medium', 'closed', 'Qaysi ko‘l Janubiy Amerika materigining shimolida joylashgan?',
  NULL, '["A) Titikaka", "B) Poopo", "C) Marakaybo", "D) Patus 2-qism: Har bir topshiriq 2,4 balldan baholanadi"]', 'C',
  'Janubiy Amerika materigining shimolida, Venesuelada Marakaybo ko‘l-lagunasi joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q11', 'olympiad-viloyat-9-2024', 11, 1, 1.3,
  'medium', 'closed', 'Quyidagilardan yassitog‘liklar to‘g‘ri berilgan javobni belgilang.
1) O‘rta Sibir; 2) Amazonka; 3) G‘arbiy Sibir; 4) Braziliya; 6) And; 7) Kordilyera; 8) Sharqiy Yevropa;
9) Turon; 10) Tyanshan.',
  NULL, '["A) 1; 3", "B) 1; 9; 10", "C) 1; 4", "D) 2; 6"]', 'C',
  'O‘rta Sibir (1) va Braziliya (4) yassitog‘liklar guruhiga kiradi. Amazonka, G‘arbiy Sibir esa pasttekisliklardir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q12', 'olympiad-viloyat-9-2024', 12, 1, 1.3,
  'medium', 'closed', 'Quyidagilardan qaysi davlatlar tayanch rivojlanayotgan mamlakatlar guruhiga kiradi?',
  NULL, '["A) Xitoy va Yaponiya", "B) Pokiston va Hindiston", "C) Xitoy va Hindiston", "D) Indoneziya va Hindiston"]', 'C',
  'Jahon iqtisodiy geografiyasida Xitoy, Hindiston, Braziliya va Meksika tayanch rivojlanayotgan mamlakatlar guruhini tashkil etadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q13', 'olympiad-viloyat-9-2024', 13, 1, 1.3,
  'medium', 'closed', 'Yevrosiyo va Shimoliy Amerikaning qaysi qismida juda katta maydonlarni tundra tabiat zonasi
egallagan?',
  NULL, '["A) shimoliy", "B) janubiy", "C) g‘arbiy", "D) sharqiy"]', 'A',
  'Yevrosiyo va Shimoliy Amerikaning eng shimoliy Arktika sohillari bo‘ylab tundra tabiat zonasi cho‘zilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q14', 'olympiad-viloyat-9-2024', 14, 1, 1.3,
  'medium', 'closed', 'Ustyurt platosining janubi-sharqida qaysi botiq joylashgan?',
  NULL, '["A) Borsakelmas", "B) Asaka-ovdan", "C) Sariqamish", "D) Qoragiyo"]', 'B',
  'Ustyurt platosining janubi-sharqiy chekkasida Asaka-ovdan tektonik botig‘i joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q15', 'olympiad-viloyat-9-2024', 15, 1, 1.3,
  'medium', 'closed', '“Daryolar keltirayotgan tog‘ jinslarining massasi (katta-kichikligi) suv oqimining tezligiga to‘g‘ri
proporsional” ekanligini kim aniqlagan?',
  NULL, '["A) Muhammad ibn Muso al-Xorazmiy", "B) Abu Rayhon Beruniy", "C) Zahiriddin Muhammad Bobur", "D) Ahmad al-Farg‘oniy"]', 'B',
  'Buyuk alloma Abu Rayhon Beruniy daryolar oqizib keladigan yotqiziqlar massasi suv oqimi tezligiga proporsional ekanligini ilmiy isbotlagan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q16', 'olympiad-viloyat-9-2024', 16, 2, 2.4,
  'hard', 'closed', 'Saudiya Arabistoni, Ispaniya, Italiya, Norvegiya, Koreya Respublikasi, Vyetnam kabi davlatlarni
joylashgan geografik o‘rniga ko‘ra qanday davlatlar hisoblanishadi?',
  NULL, '["A) orol davlatlar", "B) yarimorol davlatlari", "C) dengizbo‘yi kontinental davlatlar", "D) materik ichkarisidagi davlatlar"]', 'B',
  'Saudiya Arabistoni, Ispaniya, Italiya, Norvegiya, Koreya va Vyetnam yarimorollarda joylashgan davlatlardir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q17', 'olympiad-viloyat-9-2024', 17, 2, 2.4,
  'hard', 'closed', 'Quyidagilardan og‘ir sanoat tarmoqlari to‘g‘ri keltirilgan javobni belgilang. 1) yoqilg‘i; 2)
matbaachilik; 3) to‘qimachilik; 4) elektroenergetika; 5) poyabzalchilik; 6) qurilish materiallari; 7) kimyo.',
  NULL, '["A) 1; 2; 5; 6", "B) 1; 2; 4; 6", "C) 1; 3; 4; 7", "D) 1; 4; 6; 7"]', 'D',
  'Og‘ir sanoatga yoqilg‘i (1), elektroenergetika (4), qurilish materiallari (6) va kimyo (7) sanoatlari kiradi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q18', 'olympiad-viloyat-9-2024', 18, 2, 2.4,
  'hard', 'closed', 'Qaysi transport tarmog‘i iqlimiy sharoitlar va yil fasllari qanday bo‘lishiga qaramasdan hamma
vaqt ishlayveradi?',
  NULL, '["A) suv", "B) temiryo‘l", "C) avtomobil", "D) havo"]', 'B',
  'Temiryo‘l transporti iqlim injiqliklari va yil fasllariga eng kam bog‘liq bo‘lgan uzluksiz transport turidir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q19', 'olympiad-viloyat-9-2024', 19, 2, 2.4,
  'hard', 'closed', 'Qaysi viloyatda mamlakatimizdagi eng yirik yerosti gaz ombori barpo etilgan?',
  NULL, '["A) Qashqadaryo", "B) Navoiy", "C) Andijon", "D) Xorazm"]', 'C',
  'O‘zbekistondagi eng yirik yerosti gaz saqlash ombori Andijon viloyatining Xo‘jaobod tumanida barpo etilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q20', 'olympiad-viloyat-9-2024', 20, 2, 2.4,
  'hard', 'closed', 'Sharqiy va Janubi-sharqiy Osiyoda asosiy e’tiqod manbayi bo‘lgan din qaysi javobda to‘g‘ri
ko‘rsatilgan?',
  NULL, '["A) xristianlik", "B) islom", "C) buddizm", "D) induizm"]', 'C',
  'Sharqiy va Janubi-sharqiy Osiyo xalqlari (Xitoy, Yaponiya, Tailand, Vyetnam) orasida buddizm asosiy dindir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q21', 'olympiad-viloyat-9-2024', 21, 2, 2.4,
  'hard', 'closed', 'Quyidagilardan qaysi dengiz Lena daryosining mansabi hisoblanadi?',
  NULL, '["A) Barens", "B) Kara", "C) Laptevlar", "D) Sharqiy Sibir"]', 'C',
  'Sharqiy Sibirdagi ulkan Lena daryosi Shimoliy Muz okeanining Laptevlar dengiziga quyiladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q22', 'olympiad-viloyat-9-2024', 22, 2, 2.4,
  'hard', 'image', 'Quyidagi xaritada Hisor tizmasi qaysi raqam ko‘rsatilgan?',
  '/images/olympiad/viloyat-9-2024/q22.png', '["A) 3", "B) 4", "C) 5", "D) 6"]', 'B',
  'O‘zbekiston xaritasida Pomir-Oloy tog‘ tizimiga kiruvchi Hisor tizmasi 4-raqam bilan ko‘rsatilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q23', 'olympiad-viloyat-9-2024', 23, 2, 2.4,
  'hard', 'closed', 'Avstraliya sharqidagi Katta To‘siq rifi qaysi sayyoh tomonidan kashf etilgan?',
  NULL, '["A) Jorj Bass", "B) Metyu Flinders", "C) Abel Tasman", "D) Luis Torres"]', 'B',
  'Ingliz gidrografi Metyu Flinders Katta To‘siq rifini atroflicha o‘rganib, xaritaga tushirgan sayyoh hisoblanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q24', 'olympiad-viloyat-9-2024', 24, 2, 2.4,
  'hard', 'closed', 'Muhofaza etiladigan hududlar qaysi materikning 1% ini tashkil etadi?',
  NULL, '["A) Shimoliy Amerika", "B) Yevrosiyo", "C) Janubiy Amerika", "D) Afrika"]', 'D',
  'Muhofaza etiladigan tabiiy hududlar Afrika materigi umumiy maydonining atigi 1 foizini tashkil etadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q25', 'olympiad-viloyat-9-2024', 25, 2, 2.4,
  'hard', 'closed', 'Quyidagilardan qaysi biri IES qurilishi munsabati bilan qad ko‘targan?',
  NULL, '["A) Beruniy", "B) Kogon", "C) Zarafshon", "D) Taxiatosh 3-qism: Har bir topshiriq 3,4 balldan baholanadi"]', 'D',
  'Taxiatosh shahri Amudaryo bo‘yida yirik Taxiatosh issiqlik elektr stansiyasi (IES) qurilishi sababli qad ko‘targan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q26', 'olympiad-viloyat-9-2024', 26, 2, 2.4,
  'hard', 'closed', 'Quyidagilardan qaysi shaharda superfosfat, elektr mashinasozligi, to‘qimachilik mashinasozligi
zavodlari mavjud?',
  NULL, '["A) Farg‘ona", "B) Quvasoy", "C) Qo‘qon", "D) Marg‘ilon"]', 'C',
  'Qo‘qon shahrida superfosfat zavodi, to‘qimachilik mashinasozligi va elektrotexnika korxonalari joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q27', 'olympiad-viloyat-9-2024', 27, 2, 2.4,
  'hard', 'closed', 'Mirzacho‘l iqtisodiy rayonining qaysi hududlarida parrandachilik rivojlangan?',
  NULL, '["A) poliz ekinlari yetishtiriladigan joylarda", "B) yem-xashak ekinlari yetishtiriladigan joylarda", "C) texnik ekinlar yetishtiriladigan joylarda", "D) donli ekinlar yetishtiriladigan joylarda"]', 'D',
  'Parrandachilik ozuqa bazasiga yaqin bo‘lishi uchun donli ekinlar yetishtiriladigan rayonlarda jadal rivojlantiriladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q28', 'olympiad-viloyat-9-2024', 28, 2, 2.4,
  'hard', 'closed', 'Quyidagi fikrlardan to‘g‘ri berilgan javobni belgilang.',
  NULL, '["A) Globus va xaritalardagi parallel chiziqlar geografik kenglikni bildiradi", "B) Globus va xaritalardagi meridian chiziqlar geografik kenglikni bildiradi", "C) Globus va xaritalardagi parallel chiziqlar geografik uzunlikni bildiradi", "D) Globus va xaritalardagi qutblar geografik uzunlikni bildiradi"]', 'A',
  'Globus va xaritalarda ekvatorga parallel chizilgan chiziqlar geografik kenglikni aniqlash uchun xizmat qiladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q29', 'olympiad-viloyat-9-2024', 29, 2, 2.4,
  'hard', 'closed', 'Bosniya va Gersegovinaning federativ davlat sifatida barpo etishda quyidagilardan qaysi sabab
hisobga olingan?',
  NULL, '["A) tarixiy rivojlanganlik xususiyatlari", "B) hududining benihoya kattaligi", "C) hududining sochilib ketganligi", "D) aholisining ko‘p millatliligi"]', 'D',
  'Bosniya va Gersegovina davlatida uchta asosiy millat (bosniylar, serblar, xorvatlar) yashagani sababli federativ tuzilish tanlangan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q30', 'olympiad-viloyat-9-2024', 30, 2, 2.4,
  'hard', 'image', 'Matnni o‘qing.
Bu daryo o‘rta oqimida tekislik daryosi, lekin yuqori va o‘rta oqimlarida ostonalar, sharsharalar ko‘p.
Daryoning kattagina qismi qurg‘oqchil yerlardan oqib o‘tadi. Shuning uchun daryo suvi yerlarni sug‘orishdagi
ahamiyati katta. Shu maqsadda daryoga to‘g‘onlar qurilgan, kanallar qazib, suv chiqarilgan.
Matnda berilgan ma’lumotlar quyidagi rasmda qaysi raqam ostidagi daryoga oid ekanligini
aniqlang.',
  '/images/olympiad/viloyat-9-2024/q30.png', '["A) 1", "B) 2", "C) 4", "D) 11"]', 'A',
  'Matnda sug‘orishda foydalaniladigan va qurg‘oqchil yerlardan o‘tuvchi Nil daryosi (1-raqam) ta’riflangan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q31', 'olympiad-viloyat-9-2024', 31, 3, 3.4,
  'expert', 'closed', 'Qaysi mintaqalar ilk insonlar paydo bo‘lgan va birinchi bo‘lib o‘zlashtirilgan hududlar hisoblanadi.',
  NULL, '["A) Shimoli-sharqiy va Sharqiy Osiyo, Janubiy Yevropa", "B) Shimoli-sharqiy va Sharqiy Yevropa, Janubiy hamda Old Osiyo", "C) Shimoli-sharqiy va Sharqiy Yevropa, Janubiy Afrika hamda Old Osiyo", "D) Shimoli-sharqiy va Sharqiy Afrika, Janubiy Yevropa hamda Old Osiyo"]', 'D',
  'Dastlabki insonlar Shimoli-sharqiy va Sharqiy Afrika, Janubiy Yevropa hamda Old Osiyo mintaqalarida paydo bo‘lib o‘zlashtirgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q32', 'olympiad-viloyat-9-2024', 32, 3, 3.4,
  'expert', 'closed', 'Qaysi mintaqada aholi tabiiy o‘sish koeffitsienti jahon o‘rtacha ko‘rsatkichidan yuqori?',
  NULL, '["A) Avstraliya va Okeaniya", "B) Osiyo", "C) Amerika", "D) Afrika"]', 'D',
  'Afrika qit’asida aholining tabiiy ko‘payish koeffitsienti dunyo bo‘yicha eng yuqori bo‘lib, yiliga 2,5-3 foizni tashkil etadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q33', 'olympiad-viloyat-9-2024', 33, 3, 3.4,
  'expert', 'closed', 'Farg‘ona iqtisodiy rayoni quyidagi qaysi ko‘rsatkichlari jihatidan iqtisodiy geografik rayonlar
ichida birinchi o‘rinda turadi?',
  NULL, '["A) yoqilg‘i, gidroenergetika resurslariga boyligi", "B) polimetall rudalari va mineral o‘g‘itlar salmog‘i", "C) sug‘oriladigan yerlar, chorva mollari va aholi soni", "D) aholisining soni, zichligi va ishchi kuchlarining salmog‘i"]', 'D',
  'Farg‘ona iqtisodiy rayoni respublikada aholi soni, uning zichligi va mehnat resurslari salmog‘i bo‘yicha 1-o‘rinda turadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q34', 'olympiad-viloyat-9-2024', 34, 3, 3.4,
  'expert', 'closed', 'Matnni o‘qing.
Viloyat qishloq xo‘jaligi rivojlangan. O‘zlashtiriladigan yerlar deyarli qolmagan. Paxtaning yalpi
hosili faqat hosildorlikni ko‘tarish hisobiga oshirilmoqda. Sabzavot, kartoshka va poliz ekinlari, asosan,
shaharlar atrofida yetishtiriladi. Qishloq xo‘jaligida bog‘dorchilik salmoqli o‘rin tutadi. Bog‘ va tokzorlar
adirlar hisobiga kengay moqda. Ixtisoslashgan bog‘dorchilik xo‘jaliklari bor.
Matnda berilgan ma’lumotlar qaysi viloyatga oid ekanligini aniqlang.',
  NULL, '["A) Farg‘ona", "B) Samarqand", "C) Andijon", "D) Qashqadaryo"]', 'C',
  'Andijon viloyatida yer fondi cheklangan, o‘zlashtiriladigan yerlar qolmagan, bog‘dorchilik adirlar hisobiga kengaytirilmoqda.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q35', 'olympiad-viloyat-9-2024', 35, 3, 3.4,
  'expert', 'image', 'Matnni o‘qing.
Bu zona subekvatorial iqlim mintaqalari pasttekisliklari va yassitog‘liklarida joylashgan. Shimoliy
yarimsharning ushbu zonasidagi o‘tloq yerlarda palmalar va akatsiyalar o‘sadi. Janubiy yarimshardagisida
daraxtlar kam. Braziliya yassitog‘ligining markaziy qismida qurg‘oqchil, bu yerda pakana daraxtlar,
daraxtsimon kaktuslar o‘sadi.
Matnda berilgan ma’lumotlar quyidagi xaritada qaysi raqam ostida ko‘rsatilgan tabiat zonasiga
oid ekanligini aniqlang.',
  '/images/olympiad/viloyat-9-2024/q35.png', '["A) 3", "B) 4", "C) 5", "D) 6"]', 'B',
  'Janubiy Amerikadagi savanna va siyrak o‘rmonlar (Lyanos va Kampos) xaritada 4-raqam bilan ko‘rsatilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q36', 'olympiad-viloyat-9-2024', 36, 3, 3.4,
  'expert', 'image', 'Xaritada raqamlar bilan belgilangan tekisliklarning zamini yosh hisoblanadiganlari qaysi javobda
to‘g‘ri berilgan?',
  '/images/olympiad/viloyat-9-2024/q36.png', '["A) 1; 10; 14", "B) 1; 12; 14", "C) 2; 11; 14", "D) 2; 10; 11"]', 'D',
  'Zamini yosh tekisliklar — paleozoydan keyingi platforma cho‘kindilari ustida shakllangan Turon, G‘arbiy Sibir va Mesopotamiya (2, 10, 11).'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q37', 'olympiad-viloyat-9-2024', 37, 3, 3.4,
  'expert', 'closed', 'Quyidagilardan qaysi asosiy o‘zgarishlar kaynazoy erasida sodir bo‘lgan?
1) toshko‘mir hosil bo‘lgan; 2) yosh tog‘lar shakllangan; 3) hozirgi keksa tog‘lar paydo bo‘lgan; 4) oddiy
bakteriyalar paydo bo‘lgan; 5) iqlim mintaqalari shakllangan; 6) suvo‘tlar paydo bo‘lgan; 7) bahaybat
dinozavrlar paydo bo‘lgan 8) tabiat zonalari shakllangan.',
  NULL, '["A) 1; 5; 7", "B) 2; 5; 8", "C) 3; 4; 6", "D) 1; 3; 7"]', 'B',
  'Kaynazoy erasida yosh burmali tog‘lar shakllangan (2), hozirgi iqlim mintaqalari (5) va tabiat zonalari (8) tarkib topgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q38', 'olympiad-viloyat-9-2024', 38, 3, 3.4,
  'expert', 'closed', 'Jahon yer fondining 3 % ini qanday yerlar tashkil etadi?',
  NULL, '["A) qishloq xo‘jaligida foydalanadigan yerlar", "B) o‘rmonlar", "C) aholi punktlari va muhandislik inshootlari bilan band bo‘lgan texnogen yerlar", "D) kam foydalaniladigan unumsiz yerlar"]', 'C',
  'Jahon yer fondining taxminan 3 foizi shaharlar, sanoat inshootlari, yo‘llar va muhandislik tarmoqlari bilan band qilingan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q39', 'olympiad-viloyat-9-2024', 39, 3, 3.4,
  'expert', 'closed', 'Quyidagilardan qaysi biri tayanch rivojlanayotgan mamlakatlar guruhi tarkibiga kirmaydi?',
  NULL, '["A) Hindiston", "B) Indoneziya", "C) Braziliya", "D) Meksika"]', 'B',
  'Indoneziya yangi industrial mamlakatlar guruhiga kiradi, tayanch rivojlanayotgan davlatlar guruhiga esa Hindiston, Braziliya, Meksika kiradi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-9-2024-q40', 'olympiad-viloyat-9-2024', 40, 3, 3.4,
  'expert', 'closed', 'Quyidagi orollardan qaysi biri Atlantika okeanida joylashmagan?',
  NULL, '["A) Korsika", "B) Krit", "C) Sokotra", "D) Sitsiliya"]', 'C',
  'Sokotra oroli Hind okeanining Arabiston dengizida joylashgan bo‘lib, Atlantika okeani havzasiga kirmaydi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

-- Test: Geografiya fan olimpiadasi — Viloyat bosqichi (10-sinf, 2024)
INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q1', 'olympiad-viloyat-10-2024', 1, 1, 1.3,
  'medium', 'closed', 'Qaysi ko‘l Janubiy Amerika materigining shimolida joylashgan?',
  NULL, '["A) Titikaka", "B) Poopo", "C) Marakaybo", "D) Patus"]', 'C',
  'Janubiy Amerika materigining shimoliy qismida Marakaybo ko‘li joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q2', 'olympiad-viloyat-10-2024', 2, 1, 1.3,
  'medium', 'image', 'Quyidagi xaritada 6-raqam bilan qaysi hudud ko‘rsatilgan?',
  '/images/olympiad/viloyat-10-2024/q2.png', '["A) Ustyurt", "B) Mirzacho‘l", "C) Qizilqum", "D) Qarshi cho‘li"]', 'B',
  'O‘zbekiston xaritasida Jizzax va Sirdaryo viloyatlari hududidagi Mirzacho‘l tekisligi 6-raqam bilan ko‘rsatilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q3', 'olympiad-viloyat-10-2024', 3, 1, 1.3,
  'medium', 'closed', 'Qaysi iqtisodiy rayon mamlakatimizda aholisining soniga ko‘ra oxirgi o‘rinda turadi?',
  NULL, '["A) Janubiy", "B) Mirzacho‘l", "C) Zarafshon", "D) Quyi Amudaryo"]', 'B',
  'Mirzacho‘l iqtisodiy rayoni (Jizzax va Sirdaryo) aholi soni bo‘yicha iqtisodiy rayonlar orasida oxirgi o‘rinni egallaydi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q4', 'olympiad-viloyat-10-2024', 4, 1, 1.3,
  'medium', 'image', 'Quyidagi rasmni diqqat bilan kuzatib unda qaysi tabiat zonasi tasvirlanganini belgilang.',
  '/images/olympiad/viloyat-10-2024/q4.png', '["A) sernam ekvatorial o‘rmonlar zonasi", "B) mavsumiy nam tropik o‘rmonlar zonasi", "C) savannalar va siyrak o‘rmonlar zonasi", "D) chala cho‘l va cho‘llar zonasi"]', 'A',
  'Rasmda ko‘p yarusli, sersuv doimiy yashil o‘rmonlar — sernam ekvatorial o‘rmonlar zonasi tasvirlangan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q5', 'olympiad-viloyat-10-2024', 5, 1, 1.3,
  'medium', 'closed', 'Qaysi tabiat zonasida fasllar almashinmaydi?',
  NULL, '["A) sernam ekvatorial o‘rmonlar zonasi", "B) mavsumiy nam tropik o‘rmonlar zonasi", "C) savannalar va siyrak o‘rmonlar zonasi", "D) chala cho‘l va cho‘llar zonasi"]', 'A',
  'Sernam ekvatorial o‘rmonlar zonasida yil bo‘yi havo harorati va namlik bir xilda yuqori bo‘lib, fasllar almashinmaydi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q6', 'olympiad-viloyat-10-2024', 6, 1, 1.3,
  'medium', 'image', 'Quyidagi chizmada berilgan A nuqtaning geografik koordinatalarini qaysi javobda to‘g‘ri
ko‘rsatilgan?',
  '/images/olympiad/viloyat-10-2024/q6.png', '["A) 66o shimoliy kenglik va 13o sharqiy uzunlik", "B) 66o janubiy kenglik va 13o g‘arbiy uzunlik", "C) 66o shimoliy kenglik va 13o g‘arbiy uzunlik", "D) 66o janubiy kenglik va 13o sharqiy uzunlik"]', 'A',
  'Chizmada A nuqtaning koordinatalari 66° shimoliy kenglik va 13° sharqiy uzunlikka to‘g‘ri keladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q7', 'olympiad-viloyat-10-2024', 7, 1, 1.3,
  'medium', 'closed', 'Quyidagi masshtablardan qaysi biri eng kichik?',
  NULL, '["A) 1:2000000", "B) 1:200000", "C) 1:1500000", "D) 1:90000"]', 'A',
  'Masshtab maxraji qancha katta bo‘lsa, masshtab shuncha kichik hisoblanadi. 1:2 000 000 eng kichik masshtabdir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q8', 'olympiad-viloyat-10-2024', 8, 1, 1.3,
  'medium', 'closed', 'Germaniyaning qaysi qismida asosan katoliklar yashaydi?',
  NULL, '["A) shimolida", "B) janubida", "C) g‘arbida", "D) sharqida"]', 'B',
  'Germaniyaning janubiy federal yerlarida (Bavariya, Baden-Vyurtemberg) aholining asosiy qismi katolik mazhabiga e’tiqod qiladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q9', 'olympiad-viloyat-10-2024', 9, 1, 1.3,
  'medium', 'closed', 'Shimoliy Amerikaning qaysi iqlim mintaqasi 40o sh. k. dan Meksika qo‘ltig‘i oralig‘idagi hududlarni
egallaydi?',
  NULL, '["A) mo‘tadil", "B) subtropik", "C) tropik", "D) subekvatorial"]', 'B',
  'Shimoliy Amerikada 40° sh.k. dan Meksika qo‘ltig‘igacha bo‘lgan oraliqni subtropik iqlim mintaqasi egallagan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q10', 'olympiad-viloyat-10-2024', 10, 1, 1.3,
  'medium', 'closed', 'Muruntov oltin koni qaysi viloyatda joylashgan?',
  NULL, '["A) Buxoro", "B) Farg‘ona", "C) Samarqand", "D) Navoiy 2-qism: Har bir topshiriq 2,4 balldan baholanadi"]', 'D',
  'Dunyodagi eng yirik ochiq oltin konlaridan biri Muruntov Navoiy viloyatining Qizilqum cho‘lida joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q11', 'olympiad-viloyat-10-2024', 11, 1, 1.3,
  'medium', 'closed', 'O‘zbekistonda aholi punkti shahar maqomini olishi uchun qanday talablarga javob berishi kerak?',
  NULL, '["A) uning aholisi 5 ming va undan ko‘p bo‘lishi, yashayotgan aholining 2/3 qismi ishchi va xizmatchilar hamda ularning oilalaridan iborat bo‘lishi", "B) uning aholisi 7 ming va undan ko‘p bo‘lishi, yashayotgan aholining 2/5 qismi ishchi va xizmatchilar hamda ularning oilalaridan iborat bo‘lishi", "C) uning aholisi 7 ming va undan ko‘p bo‘lishi, yashayotgan aholining 2/3 qismi qishloq xo‘jaligi xodimlari hamda ularning oilalaridan iborat bo‘lishi", "D) uning aholisi 7 ming va undan ko‘p bo‘lishi, yashayotgan aholining 2/3 qismi ishchi va xizmatchilar hamda ularning oilalaridan iborat bo‘lishi"]', 'D',
  'O‘zbekiston qonunchiligiga ko‘ra, aholi punkti shahar bo‘lishi uchun aholisi kamida 7 ming bo‘lishi va 2/3 qismi qishloq xo‘jaligida band bo‘lmagan ishchi-xizmatchilardan iborat bo‘lishi shart.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q12', 'olympiad-viloyat-10-2024', 12, 1, 1.3,
  'medium', 'closed', 'Mirzacho‘l iqtisodiy rayonining qaysi qismida qorako‘l qo‘ylari boqiladi?',
  NULL, '["A) janubi sharqidagi tog‘ yaylovlarida", "B) janubi g‘arbidagi tog‘ yaylovlarida", "C) shimoli g‘arbidagi cho‘l yaylovlarida", "D) shimoli sharqidagi cho‘l yaylovlarida"]', 'C',
  'Mirzacho‘l rayonining shimoli-g‘arbidagi Qizilqumga tutash cho‘l yaylovlarida qorako‘l qo‘ylari boqiladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q13', 'olympiad-viloyat-10-2024', 13, 1, 1.3,
  'medium', 'closed', 'Tabiiy gazdan azotli o‘g‘it va kimyoviy tola ishlab chiqaradigan zavodlar barpo etilgan shaharlar
to‘g‘ri berilgan javobni belgilang.',
  NULL, '["A) Andijon va Namangan", "B) Olmaliq va Angren", "C) Toshkent va Samarqand", "D) Farg‘ona va Navoiy"]', 'D',
  'Farg‘onada (''Farg‘onaazot'') va Navoiyda (''Navoiyazot'') tabiiy gazdan azotli o‘g‘itlar va kimyoviy tolalar ishlab chiqariladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q14', 'olympiad-viloyat-10-2024', 14, 1, 1.3,
  'medium', 'closed', 'Qozog‘iston qaysi tomonidan Kaspiy dengizi bilan chegaralanadi?',
  NULL, '["A) shimoli-g‘arbiy", "B) shimoli-sharqiy", "C) janubi-g‘arbiy", "D) janubi-sharqiy"]', 'C',
  'Qozog‘iston Respublikasi o‘zining janubi-g‘arbiy qismidan Kaspiy dengizi akvatoriyasi bilan tutashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q15', 'olympiad-viloyat-10-2024', 15, 1, 1.3,
  'medium', 'closed', 'Musson shamollari qaysi hududlarda kuchli bo‘ladi?',
  NULL, '["A) Shimoliy va G‘arbiy Osiyoda", "B) Shimoliy va Sharqiy Amerikada", "C) Sharqiy va Janubiy Osiyoda", "D) G‘arbiy Afrikada"]', 'C',
  'Musson shamollari materik va okean harorati farqi tufayli Sharqiy va Janubiy Osiyo qirg‘oqlarida eng kuchli rivojlangan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q16', 'olympiad-viloyat-10-2024', 16, 2, 2.4,
  'hard', 'image', 'Quyidagi xaritada 2-raqam bilan ko‘rsatilgan tabiat zonasiga xos xususiyatlar to‘g‘ri berilgan
javobni belgilang.',
  '/images/olympiad/viloyat-10-2024/q16.png', '["A) doimiy yashilligi, ko‘p yarusliligi (qavatliligi) va juda qalinligi", "B) kunduzi havo harorati 40–50°C bo‘lsa, kechasi 0 °C ga pasayishi, buning natijasida tog‘ jinslarida darz va yoriqlar paydo bo‘lib, kuchli parchalanishlar kuzatilishi", "C) quruq va sernam fasllarning almashinishi, har yer-har yerda yakka daraxt yoki to‘p-to‘p daraxtlar, butazorlar, o‘tloqlarning ko‘pligi", "D) yil bo‘yi issiqlik va namlikning ko‘pligi"]', 'B',
  'Sahroi Kabir cho‘lida harorat amplitudasi nihoyatda katta bo‘lib, kunduzi +50°C gacha qizigan tog‘ jinslari tunda 0°C gacha sovushi tufayli jismoniy nuraydi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q17', 'olympiad-viloyat-10-2024', 17, 2, 2.4,
  'hard', 'closed', 'Dunyo okeanining eng issiq suvi qayerda kuzatiladi?',
  NULL, '["A) Arabiston dengizida", "B) Bengaliya qo‘ltig‘ida", "C) Janubiy Xitoy dengizida", "D) Fors qo‘ltig‘ida"]', 'D',
  'Dunyo okeanida suvning eng yuqori sirtqi harorati (+35°C gacha) sayoz va berk Fors qo‘ltig‘ida kuzatiladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q18', 'olympiad-viloyat-10-2024', 18, 2, 2.4,
  'hard', 'closed', 'Kil kanali qaysi dengizlarni tutashtirib turadi?',
  NULL, '["A) Norvegiya va Shimoliy", "B) Norvegiya va Boltiq", "C) Shimoliy va Boltiq", "D) Shimoliy va Irlandiya"]', 'C',
  'Kil kanali Yutlandiya yarimoroli asosidan o‘tib, Shimoliy dengiz bilan Boltiq dengizini tutashtiradi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q19', 'olympiad-viloyat-10-2024', 19, 2, 2.4,
  'hard', 'closed', 'Sanoat rivojlanayotgan, tabiiy boyliklar o‘zlashtirilayotgan joylarda vujudga kelgan shaharchalar
jumlasiga qaysilar kiradi?',
  NULL, '["A) Tomdibuloq, Iskandar, Yakkabog‘, Usmat, Zafar", "B) Pomuq, Ko‘kdala, Zomin, Xonqa, Vodil", "C) Paxtaobod, Kegeyli, Shohimardon, Taxtako‘pir, Shovot", "D) Iskandar, Kegayli, Ulug‘bek, G‘ozg‘on, Zomin"]', 'D',
  'Sanoat va konchilik negizida barpo etilgan shaharchalarga Iskandar, Kegayli, Ulug‘bek, G‘ozg‘on va Zomin kiradi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q20', 'olympiad-viloyat-10-2024', 20, 2, 2.4,
  'hard', 'closed', 'Quyidagilardan qaysi shaharda superfosfat, elektr mashinasozligi, to‘qimachilik mashinasozligi
zavodlari mavjud?',
  NULL, '["A) Qo‘qon", "B) Quvasoy", "C) Farg‘ona", "D) Marg‘ilon"]', 'A',
  'Qo‘qon shahrida superfosfat zavodi, elektr mashinasozligi va to‘qimachilik mashinasozligi korxonalari mavjud.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q21', 'olympiad-viloyat-10-2024', 21, 2, 2.4,
  'hard', 'closed', 'Avstriyaning federativ davlat sifatida barpo etishda quyidagilardan qaysi sabab hisobga olingan?',
  NULL, '["A) tarixiy rivojlanganlik xususiyatlari", "B) hududining benihoya kattaligi", "C) hududining sochilib ketganligi", "D) aholisining ko‘p millatliligi"]', 'A',
  'Avstriya tarixan mustaqil yerlar (grafliklar va gersogliklar) birlashuvidan tashkil topganligi sababli federativ respublika hisoblanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q22', 'olympiad-viloyat-10-2024', 22, 2, 2.4,
  'hard', 'closed', 'Quyidagilardan Sharqiy Sibirning asosiy daryolari to‘g‘ri berilgan javobni belgilang.
1) Kolima; 2) Dnepr; 3) Mezen; 4) Ural; 5) Taz; 6) Xatanga; 7) Ob; 8) Kura.',
  NULL, '["A) 3; 4; 5", "B) 1; 7;", "C) 1; 6", "D) 2; 6; 8"]', 'C',
  'Sharqiy Sibir hududidan oqib o‘tuvchi yirik daryolarga Kolima (1) va Xatanga (6) kiradi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q23', 'olympiad-viloyat-10-2024', 23, 2, 2.4,
  'hard', 'image', 'Matnni o‘qing.
Bu ko‘l chuqurligi 4 – 7 metr. Uning maydoni yog‘in miqdori va Shari daryosining toshishiga qarab
o‘zgarib turadi. Ba’zan yomg‘irlar davrida ko‘l maydoni ikki barobar kengayadi. Qurg‘oqchil davrda
qirg‘oqlari kichrayadi.
Matnda berilgan ma’lumotlar quyidagi rasmda qaysi raqam bilan belgilangan ko‘lga oid
ekanligini aniqlang.',
  '/images/olympiad/viloyat-10-2024/q23.png', '["A) 3", "B) 6", "C) 7", "D) 8"]', 'C',
  'Matnda maydoni yog‘in va Shari daryosiga qarab keskin o‘zgaruvchi, o‘rtacha chuqurligi 4-7 m bo‘lgan Chad ko‘li (7-raqam) tasvirlangan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q24', 'olympiad-viloyat-10-2024', 24, 2, 2.4,
  'hard', 'closed', 'Quyidagilardan tekisliklar to‘g‘ri berilgan javobni belgilang.
1) O‘rta Sibir; 2) Amazonka; 3) G‘arbiy Sibir; 4) Braziliya; 5) And; 6) Kordilyera; 7) Sharqiy Yevropa;
8) Turon; 9) Tyanshan.',
  NULL, '["A) 1; 3; 5", "B) 1; 2; 9", "C) 2; 4; 6", "D) 2; 7; 8"]', 'D',
  'Amazonka pasttekisligi (2), Sharqiy Yevropa tekisligi (7) va Turon pasttekisligi (8) yirik tekisliklardir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q25', 'olympiad-viloyat-10-2024', 25, 2, 2.4,
  'hard', 'closed', 'Qaysi qit’a davlatlarida bolalar salmog‘i qariyalarnikiga nisbatan past?',
  NULL, '["A) Osiyoda", "B) Amerikada", "C) Afrikada", "D) Yevropada 3-qism: Har bir topshiriq 3,4 balldan baholanadi"]', 'D',
  'Yevropa mamlakatlarida tug‘ilish pastligi va umr ko‘rish davomiyligi yuqoriligi sababli bolalar salmog‘i qariyalar salmog‘idan past.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q26', 'olympiad-viloyat-10-2024', 26, 2, 2.4,
  'hard', 'image', 'Quyidagi xaritada ajratib ko‘rsatilgan hududda qaysi jarayon KUCHLI rivojlanmoqda?',
  '/images/olympiad/viloyat-10-2024/q26.png', '["A) urbanizatsiya", "B) depopulyatsiya", "C) botqoqlashish", "D) cho‘llashish"]', 'D',
  'Xaritada ko‘rsatilgan Orol dengizi havzasida qurg‘oqchilik va suv resurslari tanqisligi oqibatida cho‘llashish jarayoni jadal bormoqda.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q27', 'olympiad-viloyat-10-2024', 27, 2, 2.4,
  'hard', 'closed', 'Matnni o‘qing.
Atom elektr stansiyalarining mamlakatda ishlab chiqarilayotgan elektr energiyasi tarkibidagi ulushi
deyarli 80% ga teng. Bu jihatdan ushbu davlat dunyoda birinchi o‘rinda turadi.
Matnda berilgan ma’lumotlar qaysi davlatga oid ekanligini aniqlang.',
  NULL, '["A) AQSH", "B) Fransiya", "C) Rossiya", "D) Yaponiya"]', 'B',
  'Fransiya elektr energiyasining salkam 70-80 foizini atom elektr stansiyalarida ishlab chiqarib, bu ko‘rsatkich bo‘yicha dunyoda 1-o‘rinda turadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q28', 'olympiad-viloyat-10-2024', 28, 2, 2.4,
  'hard', 'closed', 'Matnni o‘qing.
Viloyat aholisining 3/5 qismi qishloqda yashaydi. Butun aholi sonida mehnatga yaroqli kishilar
salmog‘i mamlakatdagi o‘rtacha ko‘rsatkichdan kam bo‘lsa-da, lekin ishchi kuchlari iqtisodiyotni
yuksaltirish uchun keragicha topiladi. Tabiiy sharoit va xo‘jalik yuritishdagi tafovutlarga muvofiq aholi
joylashuvida ham tafovut yaqqol ko‘zga tashlanadi. Dehqonchilik qishloq xo‘jaligi yalpi mahsulotining 75
foizini beradi.
Matnda berilgan ma’lumotlar qaysi viloyatga oid ekanligini aniqlang.',
  NULL, '["A) Farg‘ona", "B) Samarqand", "C) Andijon", "D) Qashqadaryo"]', 'B',
  'Samarqand viloyatida aholining 60 foizdan ortig‘i qishloq joylarda yashaydi va agrar sohada dehqonchilik 75% ni beradi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q29', 'olympiad-viloyat-10-2024', 29, 2, 2.4,
  'hard', 'closed', 'AQSH hududidagi kontinental shtatlarning sharqiy va markaziy qismlari asosan qanday relyef
shakllaridan iborat?',
  NULL, '["A) tog‘lardan", "B) botiqlardan", "C) qirlardan", "D) tekisliklardan"]', 'D',
  'AQSH kontinental hududining sharqiy va markaziy qismlarini Buyuk tekisliklar, Markaziy tekisliklar va Missisipi pasttekisligi egallagan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q30', 'olympiad-viloyat-10-2024', 30, 2, 2.4,
  'hard', 'closed', 'Matnni o‘qing.
Mamlakat hududining 70% i tekisliklar bilan band bo‘lib, mo‘tadil, subarktika va arktika iqlim
mintaqalarida joylashgan. Hududining 70% dan ortiq qismi dehqonchilik uchun agroiqlimiy resurslar bilan
yetarli darajada ta’minlanmagan.
Matnda berilgan ma’lumotlar qaysi davlatga oid ekanligini aniqlang.',
  NULL, '["A) AQSH", "B) Kanada", "C) Rossiya", "D) Xitoy"]', 'C',
  'Rossiya Federatsiyasi hududining 70% dan ortig‘i tekisliklardan iborat bo‘lib, arktika, subarktika va mo‘tadil mintaqalarga to‘g‘ri keladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q31', 'olympiad-viloyat-10-2024', 31, 3, 3.4,
  'expert', 'closed', 'Quyidagilardan qaysi davlat ikkita okean akvatoriyasiga to‘g‘ridan to‘g‘ri chiqish yo‘liga ega?',
  NULL, '["A) Madagaskar", "B) Kosta-Rika", "C) Turkiya", "D) Myanma"]', 'B',
  'Markaziy Amerikadagi Kosta-Rika davlati g‘arbda Tinch okeaniga, sharqda esa Atlantika okeanining Karib dengiziga chiqish yo‘liga ega.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q32', 'olympiad-viloyat-10-2024', 32, 3, 3.4,
  'expert', 'closed', 'Quyidagilardan qaysi davlatning qishloq xo‘jaligi ko‘proq subtropik dehqonchilikka
ixtisoslashgan?',
  NULL, '["A) Buyuk Britaniya", "B) Italiya", "C) Germaniya", "D) Fransiya"]', 'B',
  'Italiya O‘rta dengiz bo‘yi subtropik dehqonchiligiga (zaytun, uzum, sitrus mevalar, bug‘doy) chuqur ixtisoslashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q33', 'olympiad-viloyat-10-2024', 33, 3, 3.4,
  'expert', 'closed', 'D nuqtada havo harorati +2⁰ C, A nuqtada havo bosimi 730 mm Hg, C nuqtaning mutlaq balandligi
900 m bo‘lsa, B nuqtadagi havo haroratini aniqlang.',
  NULL, '["A) + 4⁰ C", "B) +7,6⁰ C", "C) +3,6⁰ C", "D) +5,6⁰ C"]', 'D',
  'Balandlik bo‘yicha harorat har 100 metrda 0,6°C ga, bosim esa har 10,5 metrda 1 mm sim.ust. ga o‘zgaradi. B nuqtada harorat +5,6°C ga teng.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q34', 'olympiad-viloyat-10-2024', 34, 3, 3.4,
  'expert', 'closed', 'Matnni o‘qing.
Xomashyo bazasi boy va xilma-xil. Turli foydali qazilmalardan, ishlab chiqarish chiqindilaridan,
yog‘och, suv, hatto havodan foydalanadi. Turli xil xomashyolardan foydalanish imkoniyatining cheksizligi
ushbu tarmoq sanoat korxonalarini hamma joyda qurishga imkon beradi. Biroq mazkur sanoat korxonalari
energiya va suvni ko‘p ishlatishi, ayniqsa, tabiatga jiddiy salbiy ta’sir ko‘rsatishi sababidan ularni hamma
joyda ham qurish maqbul bo‘lavermaydi.
Matnda berilgan ma’lumotlar qaysi sanoat tarmog‘iga oid ekanligini aniqlang.',
  NULL, '["A) yog‘ochni qayta ishlash sanoati", "B) qora metallurgiya", "C) kimyo sanoati", "D) avtomobilsozlik"]', 'C',
  'Kimyo sanoati neft, gaz, ko‘mir, suv, havo va sanoat chiqindilaridan foydalanib mahsulot ishlab chiqaradi va ekologiyaga katta ta’sir ko‘rsatadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q35', 'olympiad-viloyat-10-2024', 35, 3, 3.4,
  'expert', 'closed', 'AQSH, Rossiya, Kanada, Xitoy, Saudiya Arabistoni davlatlari qanday transport tarmog‘iga xos
xususiyat bilan yetakchilik qilishadi?',
  NULL, '["A) neft quvurlari uzunligi bo‘yicha", "B) gaz quvurlari uzunligi bo‘yicha", "C) ichki suv transport yo‘llari uzunligiga ko‘ra", "D) avtomobil yo‘llarining umumiy uzunligiga ko‘ra"]', 'A',
  'AQSH, Rossiya, Kanada, Xitoy va Saudiya Arabistoni neft quvurlarining umumiy uzunligi bo‘yicha jahonda yetakchi hisoblanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q36', 'olympiad-viloyat-10-2024', 36, 3, 3.4,
  'expert', 'image', 'Matnni o‘qing.
Bu zona nomi hindular tilida — “daraxtsiz yer” ma’nosini anglatadi. Sernam subtropik iqlim sharoitida
hosildor qizil ferralit tuproqlar hosil bo‘lgan. O‘simliklari — o‘tlar, ular orasida chalov, yovvoyi tariq va
boshqalar ko‘pchilikni tashkil qiladi. Lamaning bir necha turlari, qushlardan nandu tuyaqushi xos.
Matnda berilgan ma’lumotlar quyidagi xaritada qaysi raqam ostida ko‘rsatilgan tabiat zonasiga
oid ekanligini aniqlang.',
  '/images/olympiad/viloyat-10-2024/q36.png', '["A) 3", "B) 4", "C) 5", "D) 6"]', 'C',
  'Janubiy Amerikadagi ''daraxtsiz yer'' ma’nosini anglatuvchi subtropik dasht zonasi — Pampa xaritada 5-raqam bilan ko‘rsatilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q37', 'olympiad-viloyat-10-2024', 37, 3, 3.4,
  'expert', 'closed', 'Germaniya, Italiya, Ukraina, Serbiya, Bolgariya,
Yaponiya mamlakatlarini qanday umumiy demografik
xususiyat birlashtiradi?',
  NULL, '["A) demografik inqiroz jarayoni yuz bermoqda", "B) “demografik portlash” jarayoni yuz bermoqda", "C) aholisining yosh tarkibida bolalar salmog‘i eng yuqori darajaga ega mamlakatlar", "D) aholisining jins tarkibida ayollar salmog‘i past mamlakatlar"]', 'A',
  'Ushbu davlatlarda aholi tabiiy ko‘payishining manfiy darajasi, ya’ni depopulyatsiya va demografik inqiroz kuzatilmoqda.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q38', 'olympiad-viloyat-10-2024', 38, 3, 3.4,
  'expert', 'image', 'Rasmda tasvirlangan ko‘lning 4-gorizontaliga exolotdan
yuborilgan tovush 8 sekundda qaytib kelsa, gorizontal
chiziqlar har necha metrdan o‘tkazilganligini aniqlang.',
  '/images/olympiad/viloyat-10-2024/q38.png', '["A) 1000 m", "B) 1500 m", "C) 2000 m", "D) 2500 m"]', 'B',
  'Tovush borib-qaytishi 8 s bo‘lsa, bir tomonga 4 s ketgan. Chuqurlik = 1500 * 4 = 6000 m. 4-gorizontalda 6000 m bo‘lsa, har bir gorizontal 6000 / 4 = 1500 m dan o‘tkazilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q39', 'olympiad-viloyat-10-2024', 39, 3, 3.4,
  'expert', 'closed', 'Quyidagilardan qaysi asosiy o‘zgarishlar arxey erasida
sodir bo‘lgan?
1) toshko‘mir hosil bo‘lgan; 2) yosh tog‘lar shakllangan; 3)
hozirgi keksa tog‘lar paydo bo‘lgan; 4) oddiy bakteriyalar paydo
bo‘lgan; 5) iqlim mintaqalari shakllangan; 6) suvo‘tlar paydo
bo‘lgan; 7) bahaybat dinozavrlar paydo bo‘lgan 8) tabiat zonalari shakllangan.',
  NULL, '["A) 1; 5", "B) 2; 8", "C) 4; 6", "D) 3; 7"]', 'C',
  'Yer taraqqiyotining arxey erasida eng sodda bir hujayrali bakteriyalar (4) va ko‘k-yashil suvo‘tlar (6) paydo bo‘lgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-10-2024-q40', 'olympiad-viloyat-10-2024', 40, 3, 3.4,
  'expert', 'closed', 'Qaysi iqlim mintaqasida yoz issiq, seryomg‘ir, qish iliq, quruq iqlim xususiyatlariga ega?',
  NULL, '["A) mo‘tadil", "B) subtropik", "C) tropik", "D) subekvatorial"]', 'D',
  'Subekvatorial iqlim mintaqasida yozda ekvatorial havo massasi hukmron bo‘lib issiq va seryomg‘ir, qishda esa tropik havo massasi tufayli quruq va iliq bo‘ladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

-- Test: Geografiya fan olimpiadasi — Viloyat bosqichi (11-sinf, 2024)
INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q1', 'olympiad-viloyat-11-2024', 1, 1, 1.3,
  'medium', 'closed', 'Buyuk Britaniya quruqlikda qaysi davlat bilan chegaradosh?',
  NULL, '["A) Irlandiya", "B) Daniya", "C) Fransiya", "D) Islandiya"]', 'A',
  'Buyuk Britaniya (Shimoliy Irlandiya provinsiyasi orqali) quruqlikda faqat Irlandiya Respublikasi bilan chegaradosh.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q2', 'olympiad-viloyat-11-2024', 2, 1, 1.3,
  'medium', 'closed', 'Qaysi daryo dunyodagi eng chuqur va tor dara – Katta Kanyonni hosil qiladi?',
  NULL, '["A) Kolumbiya", "B) Freyzer", "C) Kolorado", "D) Avliyo Lavrentiy"]', 'C',
  'Dunyodagi eng mahobatli va chuqur dara — Katta Kanyonni Kolorado platosi bo‘ylab oquvchi Kolorado daryosi hosil qilgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q3', 'olympiad-viloyat-11-2024', 3, 1, 1.3,
  'medium', 'image', 'Quyidagi chizmada berilgan D nuqtaning geografik koordinatalarini qaysi javobda to‘g‘ri
ko‘rsatilgan?',
  '/images/olympiad/viloyat-11-2024/q3.png', '["A) 36o shimoliy kenglik va 64o sharqiy uzunlik", "B) 36o janubiy kenglik va 64o g‘arbiy uzunlik", "C) 36o shimoliy kenglik va 64o g‘arbiy uzunlik", "D) 36o janubiy kenglik va 64o sharqiy uzunlik"]', 'D',
  'Chizmadagi D nuqta ekvatordan janubda (36° j.k.) va Grinvichdan sharqda (64° shq.u.) joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q4', 'olympiad-viloyat-11-2024', 4, 1, 1.3,
  'medium', 'image', 'Xaritada alohida ajratilib ko‘rsatilgan iqlim mintaqasi qaysi javobda to‘g‘ri berilgan?',
  '/images/olympiad/viloyat-11-2024/q4.png', '["A) mo‘tadil", "B) subtropik", "C) tropik", "D) subekvatorial"]', 'B',
  'Xaritada alohida ajratib ko‘rsatilgan hudud Shimoliy va Janubiy yarimsharning subtropik iqlim mintaqasiga to‘g‘ri keladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q5', 'olympiad-viloyat-11-2024', 5, 1, 1.3,
  'medium', 'closed', 'Quyidagi sanoat tarmog‘i rangli metallurgiyaning chiqindilarini qayta ishlaydi?',
  NULL, '["A) yog‘ochni qayta ishlash sanoati", "B) qora metallurgiya", "C) kimyo sanoati", "D) avtomobilsozlik"]', 'C',
  'Rangli metallurgiya korxonalari chiqindisi bo‘lgan oltingugurtli gazlarni qayta ishlab sulfat kislota olish kimyo sanoati tarmog‘idir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q6', 'olympiad-viloyat-11-2024', 6, 1, 1.3,
  'medium', 'closed', 'Qaysi shaharda qora metallurgiyaning yirik korxonasi – O‘zbekiston metallurgiya zavodi bor?',
  NULL, '["A) Chirchiq", "B) Yangiyo‘l", "C) Olmaliq", "D) Bekobod"]', 'D',
  'O‘zbekistondagi eng yirik qora metallurgiya korxonasi — ''O‘zmetkombinat'' Toshkent viloyatining Bekobod shahrida joylashgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q7', 'olympiad-viloyat-11-2024', 7, 1, 1.3,
  'medium', 'closed', 'Quyidagilardan qaysi shahar kulolchilik markazi hisoblanadi?',
  NULL, '["A) Quvasoy", "B) Qo‘qon", "C) Marg‘ilon", "D) Rishton"]', 'D',
  'Farg‘ona vodiysidagi qadimiy Rishton shahri o‘zining betakror sopol-kulolchilik an’analari bilan mashhur.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q8', 'olympiad-viloyat-11-2024', 8, 1, 1.3,
  'medium', 'closed', 'Marjonbuloq konidan qanday foydali qazilma qazib olinadi?',
  NULL, '["A) kumush", "B) marmar", "C) oltin", "D) molibden"]', 'C',
  'Jizzax viloyati G‘allaorol tumanidagi Marjonbuloq konidan nodir metall — oltin qazib olinadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q9', 'olympiad-viloyat-11-2024', 9, 1, 1.3,
  'medium', 'closed', 'Qaysi davlat bug‘doy yetishtirish bo‘yicha yetakchilik qiladi?',
  NULL, '["A) Xitoy", "B) Hindiston", "C) Rossiya", "D) AQSh"]', 'A',
  'Bug‘doy yetishtirish yalpi hajmi bo‘yicha Xitoy Xalq Respublikasi (yiliga 135 mln tonnadan ortiq) jahonda 1-o‘rinda turadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q10', 'olympiad-viloyat-11-2024', 10, 1, 1.3,
  'medium', 'closed', 'Qozog‘istonning qaysi qismida o‘zbeklar istiqomat qiladi?',
  NULL, '["A) shimoliy", "B) janubiy", "C) g‘arbiy", "D) sharqiy 2-qism: Har bir topshiriq 2,4 balldan baholanadi"]', 'B',
  'Qozog‘istonda istiqomat qiluvchi o‘zbek diasporasi asosan mamlakatning janubiy hududlarida (Turkiston viloyati, Sayram, Chimkent) yashaydi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q11', 'olympiad-viloyat-11-2024', 11, 1, 1.3,
  'medium', 'closed', 'Yangi yerlarni o‘zlashtirish, qishloq xo‘jalik xomashyosini qayta ishlovchi sanoat negizida qaysi
shaharlar qad ko‘tardi?',
  NULL, '["A) Yangiyo‘l, Guliston, Yangiyer", "B) Angren, Bekobod, Olmaliq", "C) Chirchiq, Navoiy, Uchquduq", "D) Taxiatosh, Zarafshon, Chirchiq"]', 'A',
  'Mirzacho‘l va Toshkent vohasida yangi paxtakor yerlarni o‘zlashtirish va paxtani qayta ishlash asosida Guliston, Yangiyer, Yangiyo‘l shaharlari qad ko‘targan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q12', 'olympiad-viloyat-11-2024', 12, 1, 1.3,
  'medium', 'image', 'Quyidagi xaritada 1-raqam bilan ko‘rsatilgan tabiat zonasiga xos xususiyatlar to‘g‘ri berilgan
javobni belgilang.',
  '/images/olympiad/viloyat-11-2024/q12.png', '["A) doimiy yashilligi, ko‘p yarusliligi (qavatliligi) va juda qalinligi", "B) kunduzi havo harorati 40–50°C bo‘lsa, kechasi 0 °C ga pasayishi, buning natijasida tog‘ jinslarida darz va yoriqlar paydo bo‘lib, kuchli parchalanishlar kuzatilishi", "C) quruq va sernam fasllarning almashinishi, har yer-har yerda yakka daraxt yoki to‘p-to‘p daraxtlar, butazorlar, o‘tloqlarning ko‘pligi", "D) yil bo‘yi issiqlik va namlikning ko‘pligi"]', 'A',
  'Ekvatorial o‘rmonlar zonasining asosiy belgisi — o‘rmonlarning doimiy yashilligi, qalin ko‘p qavatliligi va biomassa boyligidir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q13', 'olympiad-viloyat-11-2024', 13, 1, 1.3,
  'medium', 'image', 'Iqtisodiyoti eng qoloq agrar davlatlar xaritada qaysi raqamlar bilan ko‘rsatilgan?',
  '/images/olympiad/viloyat-11-2024/q13.png', '["A) 5, 9", "B) 8, 9", "C) 8, 10", "D) 1, 8"]', 'C',
  'Xaritada eng qoloq agrar iqtisodiyotga ega davlatlar qatorida Afrika davlatlari 8 va 10 raqamlari bilan belgilangan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q14', 'olympiad-viloyat-11-2024', 14, 1, 1.3,
  'medium', 'closed', 'Tarkibida 28 ta shtat va 8 ta ittifoqdosh hududlari mavjud bo‘lgan davlat berilgan javobni
belgilang.',
  NULL, '["A) Kanada", "B) Xitoy", "C) Hindiston", "D) Braziliya"]', 'C',
  'Hindiston Respublikasi ma’muriy-hududiy tuzilishiga ko‘ra 28 ta shtat va 8 ta ittifoqdosh hududdan iborat federatsiyadir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q15', 'olympiad-viloyat-11-2024', 15, 1, 1.3,
  'medium', 'closed', 'Jahondagi eng kichik federativ davlat qaysi?',
  NULL, '["A) Sent Lyusiya", "B) Sent Vinsent va Grenadin", "C) Sent Kits va Nevis", "D) Trinidad va Tobago"]', 'C',
  'Karib dengizidagi Sent-Kits va Nevis davlati (maydoni 261 kv.km) jahondagi eng mitti federativ davlat hisoblanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q16', 'olympiad-viloyat-11-2024', 16, 2, 2.4,
  'hard', 'closed', 'Tinch okeani suvining eng sho‘r qismi qaysi kengliklarga to‘g‘ri keladi?',
  NULL, '["A) mo‘tadil kengliklarga", "B) tropiklarga", "C) subtropiklarga", "D) subarktikaga"]', 'B',
  'Tinch okeanida eng yuqori sho‘rlanish kuchli bug‘lanish va kam yog‘in tushadigan tropik kengliklarda (35,5-36,5‰) kuzatiladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q17', 'olympiad-viloyat-11-2024', 17, 2, 2.4,
  'hard', 'closed', 'Qaysi ekin turi Kot-d’Ivuar, Gana va Indoneziya kabi davlatlarda katta miqdorda yetishtiriladi?',
  NULL, '["A) shakarqamish", "B) choy", "C) qahva", "D) kakao"]', 'D',
  'Kot-d’Ivuar va Gana dunyo kakao hosilining yarmidan ko‘pini yetishtiruvchi yetakchi davlatlardir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q18', 'olympiad-viloyat-11-2024', 18, 2, 2.4,
  'hard', 'closed', 'Albaniya, Litva, Monako, Niderlandiya, Sloveniya, Chernogoriya davlatlari geografik o‘rni
bo‘yicha qanday davlatlar guruhiga kiradi?',
  NULL, '["A) orol davlatlar", "B) yarimorol davlatlar", "C) dengizbo‘yi kontinental davlatlar", "D) ichki kontinental davlatlar"]', 'C',
  'Albaniya, Litva, Monako, Niderlandiya, Sloveniya va Chernogoriya dengiz sohilida joylashgan kontinental davlatlar guruhiga kiradi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q19', 'olympiad-viloyat-11-2024', 19, 2, 2.4,
  'hard', 'closed', 'Germaniyadagi qaysi shahar Yevropadagi eng yirik aeroportga ega hamda asosiy bank-moliya
markazi hisoblanadi?',
  NULL, '["A) Gamburg", "B) Myunxen", "C) Kyoln", "D) Frankfurt-Mayn"]', 'D',
  'Germaniyadagi Frankfurt-Mayn shahri Yevropaning eng yirik aviahabiga va Yevropa Markaziy Banki joylashgan yetakchi moliya markaziga ega.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q20', 'olympiad-viloyat-11-2024', 20, 2, 2.4,
  'hard', 'closed', 'Quyidagilardan qaysi biri boshqaruv shakli jihatidan parlamentar respublika, davlat tuzilishiga
ko‘ra federatsiya hisoblanadi?',
  NULL, '["A) Koreya", "B) Xitoy", "C) Hindiston", "D) Yaponiya"]', 'C',
  'Hindiston davlat boshqaruvi shakliga ko‘ra parlamentar respublika, hududiy tuzilishiga ko‘ra esa federatsiyadir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q21', 'olympiad-viloyat-11-2024', 21, 2, 2.4,
  'hard', 'closed', 'Quyidagilardan qaysi dengiz Dunay daryosining mansabi hisoblanadi?',
  NULL, '["A) Barens", "B) Shimoliy", "C) Qora dengiz", "D) Boltiq"]', 'C',
  'Yevropadagi Dunay daryosi o‘z oqimini Qora dengizga quyiladigan ulkan delta bilan yakunlaydi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q22', 'olympiad-viloyat-11-2024', 22, 2, 2.4,
  'hard', 'closed', 'Qaysi davlat katoliklar soni bo‘yicha dunyoda birinchi o‘rinda turadi?',
  NULL, '["A) Italiya", "B) Fransiya", "C) Braziliya", "D) AQSH"]', 'C',
  'Braziliyada 125 milliondan ortiq katolik istiqomat qiladi va bu ko‘rsatkich bo‘yicha u dunyoda 1-o‘rinda turadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q23', 'olympiad-viloyat-11-2024', 23, 2, 2.4,
  'hard', 'closed', 'Florida yarimoroli hamda Gavayi orollari qaysi iqlim mintaqasida joylashgan?',
  NULL, '["A) mo‘tadil", "B) subtropik", "C) tropik", "D) subekvatorial"]', 'C',
  'Gavayi orollari va Florida yarimorolining janubiy qismi tropik iqlim mintaqasiga to‘g‘ri keladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q24', 'olympiad-viloyat-11-2024', 24, 2, 2.4,
  'hard', 'closed', 'Misr Arab Respublikasi qirg‘oqlari sharqda qaysi dengiz suvlari bilan yuviladi?',
  NULL, '["A) Arabiston", "B) Qizil dengiz", "C) O‘rta dengiz", "D) Qora dengiz"]', 'B',
  'Misr Arab Respublikasining sharqiy qirg‘oqlari Qizil dengiz suvlari bilan yuviladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q25', 'olympiad-viloyat-11-2024', 25, 2, 2.4,
  'hard', 'closed', 'AQSH kimyo sanoatining eng yirik markazi qaysi shahar hisoblanadi?',
  NULL, '["A) Xyuston", "B) Chikago", "C) San Fransisko", "D) Los Anjeles 3-qism: Har bir topshiriq 3,4 balldan baholanadi"]', 'A',
  'AQSHning Meksika qo‘ltig‘i sohilidagi Xyuston shahri (Texas) jahondagi eng yirik neft-kimyo sanoati klasteridir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q26', 'olympiad-viloyat-11-2024', 26, 2, 2.4,
  'hard', 'closed', 'AQSHning bog‘dorchilik mintaqasi qaysi hudud hisoblanadi?',
  NULL, '["A) Markaziy tekisliklarning shimoli", "B) Missisipi havzasining janubi", "C) Kaliforniya", "D) Kordilyera tog‘lari etaklarini egallagan Buyuk tekisliklar"]', 'C',
  'Subtropik iqlimi va sug‘orma dehqonchiligi rivojlangan Kaliforniya shtati AQSHning asosiy meva-sabzavot va bog‘dorchilik mintaqasidir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q27', 'olympiad-viloyat-11-2024', 27, 2, 2.4,
  'hard', 'closed', 'Mirzacho‘l iqtisodiy rayonining qaysi hududlarida parrandachilik rivojlangan?',
  NULL, '["A) poliz ekinlari yetishtiriladigan joylarda", "B) yem-xashak ekinlari yetishtiriladigan joylarda", "C) texnik ekinlar yetishtiriladigan joylarda", "D) donli ekinlar yetishtiriladigan joylarda"]', 'D',
  'Parrandachilik ozuqa bazasiga yaqin joylashtirilishi sababli Mirzacho‘lda donli ekinlar yetishtiriladigan rayonlarda rivojlangan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q28', 'olympiad-viloyat-11-2024', 28, 2, 2.4,
  'hard', 'closed', 'Matnni o‘qing.
Qirg‘oqlari juda parchalanib ketgan. Materikning sharqiy va shimoliy sohillarida qo‘ltiq hamda
yarimorollar ayniqsa ko‘p, g‘arbiy va janubiy sohillarida ancha kam. Qadimgi Lavraziya quruqligining
tarkibiy qismi bo‘lgan. Materik yer yuzasi tuzilishida tekisliklar ko‘p maydonni egallaydi, tog‘lar esa materik
maydonining uchdan bir qismini egallagan.
Matnda berilgan ma’lumotlar qaysi materikka oid ekanligini aniqlang.',
  NULL, '["A) Yevrosiyo", "B) Shimoliy Amerika", "C) Janubiy Amerika", "D) Avstraliya"]', 'B',
  'Shimoliy Amerika Lavraziya tarkibida bo‘lgan, sohillari kuchli parchalangan, relyefining uchdan bir qismini Kordilyera va Appalachi tog‘lari egallagan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q29', 'olympiad-viloyat-11-2024', 29, 2, 2.4,
  'hard', 'closed', 'Nima sababdan Sahroi Kabir cho‘lidagi tog‘larda tog‘ jinslarida darz va yoriqlar paydo bo‘lib,
kuchli parchalanishlar kuzatiladi?',
  NULL, '["A) materikning shimoliy qismida joylashganligi sababli", "B) qum, chang-to‘zonli quruq va issiq samum shamoli kuchli esishi sababli", "C) tun bilan kun harorati keskin o‘zgarishi, kunduzi havo harorati 40–50°C, kechasi 0°C ga pasayishi sababli", "D) yog‘in miqdori kamligi sababli"]', 'C',
  'Sahroi Kabirda bulutsiz osmon tufayli kunduzgi harorat +50°C gacha qizib, tunda 0°C gacha pasayishi natijasida tog‘ jinslarida kuchli termik nurash sodir bo‘ladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q30', 'olympiad-viloyat-11-2024', 30, 2, 2.4,
  'hard', 'closed', 'Boshqaruv shakli monarxiya bo‘lgan davlatlarni aniqlang.',
  NULL, '["A) Bruney, Kipr", "B) Lyuksemburg, Malayziya", "C) Kambodja, Bangladesh", "D) Niderlandiya, Portugaliya"]', 'B',
  'Lyuksemburg Buyuk Gersogligi va Malayziya Federatsiyasi boshqaruv shakliga ko‘ra monarxiya hisoblanadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q31', 'olympiad-viloyat-11-2024', 31, 3, 3.4,
  'expert', 'image', 'Xaritada alohida ajratilib ko‘rsatilgan tabiat zonasiga xos xususiyatni belgilang.',
  '/images/olympiad/viloyat-11-2024/q31.png', '["A) bu yerda o‘simliklarning 25 000 turi, jumladan, daraxtlarning 1 000 turi mavjud.", "B) tun bilan kun harorati keskin o‘zgaradi, qum, chang-to‘zonli quruq va issiq samum shamoli esadi.", "C) o‘rmonlari doimiy yashil, ko‘p yarusli (qavatli) va juda qalin. Ba’zan tangadek joyga ham quyosh nuri tushmaydi.", "D) quruq va sernam fasllar almashinadi, har yer-har yerda yakka daraxt yoki to‘p-to‘p daraxtlar, butazorlar, o‘tloqlar ko‘p"]', 'A',
  'Amazonka selvalarida Yer yuzidagi biologik xilma-xillikning eng boy xazinasi — 25 000 dan ortiq o‘simlik turi mavjud.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q32', 'olympiad-viloyat-11-2024', 32, 3, 3.4,
  'expert', 'closed', 'Temir yo‘l transportiga xos xususiyatlar to‘g‘ri berilgan javobni toping.',
  NULL, '["A) yo‘lovchilar, pochta va boshqa yuklarni eng yuqori tezlik bilan tashiydi, nisbatan qimmat transport turi", "B) eng keng tarqalgan transport turi, “eshikdan-eshikkacha” olib borib qo‘yish imkoniyati mavjud", "C) suyuq va gazsimon ko‘rinishdagi yuklarni uzoq masofaga yetkazib beradi, xizmatlari tannarxi past, yuklarni bir maromda kerakli manzilga yetkazadi, atrof-muhitga salbiy ta’sirining past", "D) katta hajmdagi yuklarni uzoq masofalarga yetkazib beradi, harakatlanishining ob-havo sharoitiga uncha bog‘liq emas, tashish xizmatlari tannarxi nisbatan past"]', 'D',
  'Temiryo‘l transporti katta hajmdagi yuklarni har qanday ob-havoda arzon tannarx bilan uzoq masofalarga xavfsiz tashiydi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q33', 'olympiad-viloyat-11-2024', 33, 3, 3.4,
  'expert', 'closed', 'C nuqtada havo harorati +2⁰ C, B nuqtada havo bosimi 710 mm Hg, A nuqtaning mutlaq balandligi
2000 m bo‘lsa, D nuqtadagi havo haroratini aniqlang.',
  NULL, '["A) 0⁰ C", "B) - 6⁰ C", "C) - 3⁰ C", "D) - 1⁰ C"]', 'D',
  'Bosim va balandlik gradiyentlari hisob-kitobiga binoan, D nuqtadagi havo harorati -1°C ga teng bo‘ladi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q34', 'olympiad-viloyat-11-2024', 34, 3, 3.4,
  'expert', 'image', 'Xaritada ajratib ko‘rsatilgan mamlakatlarni qanday umumiy xususiyat birlashtiradi?',
  '/images/olympiad/viloyat-11-2024/q34.png', '["A) barchasi choy yetishtiruvchi mamlakatlar hisoblanadi", "B) barchasi paxta yetishtiruvchi mamlakatlar hisoblanadi", "C) OPEK tashkilotiga a’zo mamlakatlar hisoblanadi", "D) ushbu mamlakatlar eng ko‘p elektr energiya chiqaradi"]', 'C',
  'Xaritada alohida ko‘rsatilgan davlatlar (Saudiya Arabistoni, Eron, Iroq, Quvayt, BAA, Venesuela) neft eksport qiluvchi mamlakatlar tashkiloti — OPEK a’zolaridir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q35', 'olympiad-viloyat-11-2024', 35, 3, 3.4,
  'expert', 'closed', 'Nima sababdan Tinch okeanda geografik kenglik bo‘ylab harakat qiladigan oqimlar ko‘p?',
  NULL, '["A) Tinch okeanda okean tubi katta maydonni egallagani sababli", "B) Tinch okeanda dengizlar soni ko‘pligi sababli", "C) shimoldan janubga tomon uzoq masofaga cho‘zilganligi sababli", "D) g‘arbdan sharqqa tomon uzoq masofaga cho‘zilganligi sababli"]', 'D',
  'Tinch okeani ekvator va tropiklar bo‘ylab g‘arbdan sharqqa tomon ulkan masofaga (19 000 km) cho‘zilgani sababli kenglik bo‘ylab oqimlar ko‘p.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q36', 'olympiad-viloyat-11-2024', 36, 3, 3.4,
  'expert', 'image', 'Rasmda tasvirlangan ko‘lning 3-gorizontaliga exolotdan yuborilgan tovush 6 sekundda qaytib kelsa,
gorizontal chiziqlar har necha metrdan o‘tkazilganligini aniqlang.',
  '/images/olympiad/viloyat-11-2024/q36.png', '["A) 1000 m", "B) 1500 m", "C) 2000 m", "D) 2500 m"]', 'B',
  'Tovush 6 s da borib qaytgan bo‘lsa, borish vaqti 3 s. Chuqurlik = 1500 * 3 = 4500 m. 3-gorizontal bo‘lgani uchun har bir gorizontal 4500 / 3 = 1500 metrdan o‘tgan.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q37', 'olympiad-viloyat-11-2024', 37, 3, 3.4,
  'expert', 'closed', 'Quyidagilardan Old Osiyoning eng yirik daryolari to‘g‘ri berilgan javobni belgilang.
1) Kolima; 2) Dnepr; 3) Araks; 4) Ural; 5) Taz; 6) Xatanga; 7) Karun; 8) Kura.',
  NULL, '["A) 3; 4; 5", "B) 1; 7", "C) 1; 2; 6", "D) 3; 7; 8"]', 'D',
  'Old Osiyo (Yaqin Sharq) hududidan oqib o‘tuvchi daryolar Araks (3), Karun (7) va Kura (8) daryolaridir.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q38', 'olympiad-viloyat-11-2024', 38, 3, 3.4,
  'expert', 'closed', 'Quyidagi davlatlardan qaysi biri fosforitga boy?',
  NULL, '["A) Nigeriya", "B) JAR", "C) Marokash", "D) Misr"]', 'C',
  'Marokash Qirolligi jahondagi fosforit zaxiralarining 70 foizdan ortig‘iga egalik qiladi va eksport bo‘yicha 1-o‘rinda turadi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q39', 'olympiad-viloyat-11-2024', 39, 3, 3.4,
  'expert', 'closed', 'Quyidagilardan qaysi asosiy o‘zgarishlar paleozoy erasida sodir bo‘lgan?
1) toshko‘mir hosil bo‘lgan; 2) yosh tog‘lar shakllangan; 3) hozirgi keksa tog‘lar paydo bo‘lgan; 4) oddiy
bakteriyalar paydo bo‘lgan; 5) iqlim mintaqalari shakllangan; 6) suvo‘tlar paydo bo‘lgan; 7) bahaybat
dinozavrlar paydo bo‘lgan 8) tabiat zonalari shakllangan.',
  NULL, '["A) 1; 3", "B) 2; 8", "C) 4; 6", "D) 5; 7"]', 'A',
  'Paleozoy erasida toshko‘mir qatlamlari hosil bo‘lgan (1) hamda Kaledon va Gersin burmalanishida qadimgi tog‘lar paydo bo‘lgan (3).'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;

INSERT INTO public.olympiad_questions (
  id, test_id, number, section_id, points, difficulty, question_type,
  question, image_url, options, correct_answer, explanation
) VALUES (
  'olympiad-viloyat-11-2024-q40', 'olympiad-viloyat-11-2024', 40, 3, 3.4,
  'expert', 'closed', 'O‘zbekiston yer yuzasi qaysi tomonga ko‘tarilib boradi?',
  NULL, '["A) g‘arb va shimoli g‘arbdan sharq va janubi sharq tomon", "B) g‘arb va janubi g‘arbdan sharq va shimoli sharq tomon", "C) sharq va janubi sharqdan g‘arb va shimoli g‘arb tomon", "D) sharq va shimoli sharqdan g‘arb va janubi g‘arb tomon"]', 'A',
  'O‘zbekiston yer yuzasi umumiy qiyalik bo‘yicha g‘arb va shimoli-g‘arbdagi Turon tekisligidan sharq va janubi-sharqdagi Tyanshan va Hisor-Oloy tog‘lari tomon ko‘tarilib boradi.'
) ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  options = EXCLUDED.options,
  correct_answer = EXCLUDED.correct_answer,
  explanation = EXCLUDED.explanation,
  image_url = EXCLUDED.image_url;
