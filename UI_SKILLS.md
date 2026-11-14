# UI Skills Guide (ibelick/ui-skills)

Ushbu loyihaga `npx skills add ibelick/ui-skills` orqali quyidagi 9 ta maxsus UI mahoratlari (skills) oʻrnatildi va `.agents/skills/` katalogida saqlanmoqda:

---

## 1. `baseline-ui`
* **Vazifasi:** AI tomonidan yaratilgan "slop" (chalkash, ortiqcha) interfeyslarni tozalash, boʻshliqlar (spacing), ierarxiya, tipografiya va tartibni toʻgʻrilash.
* **Qoidalari:**
  * **Stack:** Tailwind CSS standart sinflari, `motion/react` animatsiyalari, `cn` (`clsx` + `tailwind-merge`) yordamchisi.
  * **Balans & Ekran:** `h-screen` oʻrniga har doim `h-dvh` ishlatiladi.
  * **Fokus va qulaylik:** Ikonkali tugmalarda har doim `aria-label` boʻlishi shart.
  * **Animatsiya:** Faqat kompozitor xususiyatlari (`transform`, `opacity`) animatsiya qilinadi. Hech qachon `width`, `height`, `margin`, `padding` animatsiya qilinmaydi.

---

## 2. `improve-ui`
* **Vazifasi:** Mavjud sahifa yoki komponentni uning dizayn tizimiga muvofiq audit qilish, tasdiqlangan muammolarni aniqlash va aniq tuzatish rejasini shakllantirish.
* **Qoidalari:**
  * Mahsulot oʻziga xosligini saqlab qolgan holda tartibga keltirish.
  * Shaxsiy dizayn manbalari va tokenlarni inobatga olish.

---

## 3. `fixing-accessibility`
* **Vazifasi:** Foydalanish qulayligi (A11y) standartlariga moslashtirish.
* **Qoidalari:**
  * Ranglar kontrasti (WCAG AA/AAA talablari).
  * Klaviatura orqali boshqarish (Tab, Focus, Escape).
  * Ekran oʻquvchi (Screen reader) mosligi va semantik HTML (`<nav>`, `<main>`, `<header>`, `<article>`).

---

## 4. `fixing-motion-performance`
* **Vazifasi:** Animatsiyalar tezligi va silliqligini 60/120 FPS darajasida ushlab turish.
* **Qoidalari:**
  * Qayta chizish (layout thrashing/repaint) ni oldini olish.
  * `will-change` va GPU tezlatgichlarini meʼyorida ishlatish.

---

## 5. `fixing-metadata`
* **Vazifasi:** SEO, OpenGraph, Twitter Cards va Viewport parametrlarini toʻgʻri sozlash.
* **Qoidalari:**
  * Dinamik sarlavhalar, taʼriflar va `theme-color` meta-teglar.

---

## 6. `component-canvas` & `create-canvas`
* **Vazifasi:** Komponentlar variantlari va dizayn konsepsiyalarini toʻliq ekranda interaktiv tekshirish va sinash uchun kanvas yaratish.

---

## 7. `create-design-md`
* **Vazifasi:** Loyiha uchun maxsus dizayn qoidalari va tokenlarini belgilovchi `DESIGN.md` faylini yaratish yoki yangilash.

---

## 8. `ui-skills-root`
* **Vazifasi:** UI vazifalarini toʻgʻri skillga yoʻnaltiruvchi CLI qatlami.
* **Foydalanish buyruqlari:**
  ```bash
  npx ui-skills start
  npx ui-skills categories
  npx ui-skills list --category <category>
  npx ui-skills get <slug>
  ```

---

## 9. `tailwind-design-system`
* **Manba:** `wshobson/agents@tailwind-design-system`
* **Vazifasi:** Tailwind CSS (v4) asosida mustahkam, masshtablanuvchi dizayn tizimi, semantik dizayn tokenlari (`@theme`), komponent variantlari (`cva`), responsiv va A11y andozalarini qurish.
* **Qoidalari:**
  * **Dizayn tokenlari:** Semantik ranglar (OKLCH asosida) va CSS-first tokenlar.
  * **Komponent arxitekturasi:** Variantlar va holatlar (`default`, `hover`, `focus`, `disabled`, `dark mode`) uchun `cva` va `cn` vositalaridan foydalanish.
  * **Tipografiya & Boʻshliqlar:** Bir xil oʻlchamdagi spacing va shrift ierarxiyasini taʼminlash.

