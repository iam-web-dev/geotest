import { useNavigate } from 'react-router-dom';
import { CaretLeft, Shield } from '@phosphor-icons/react';

export default function Oferta() {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto space-y-5 pb-10">
      <div className="flex items-center gap-3 pt-1">
        <button onClick={() => navigate('/profile')}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
          <CaretLeft size={18} weight="bold" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Foydalanuvchi o'ffertasi</h1>
          <p className="text-xs text-[var(--text-secondary)]">Oxirgi yangilanish: 01.01.2025</p>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#06B6D418' }}>
          <Shield size={18} style={{ color: '#06B6D4' }} />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-5 text-sm text-[var(--text-secondary)] leading-relaxed">

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">1. Umumiy qoidalar</h2>
          <p>Ushbu foydalanuvchi o'ffertasi (keyingi o'rinlarda "Oferta") Geo-Test platformasi (keyingi o'rinlarda "Platforma") va uning foydalanuvchilari o'rtasidagi munosabatlarni tartibga soladi.</p>
          <p>Platformaga ro'yxatdan o'tgan yoki undan foydalangan har bir shaxs ushbu Oferta shartlarini qabul qilgan hisoblanadi.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">2. Platformadan foydalanish</h2>
          <p>Foydalanuvchi Platformadan faqat qonuniy maqsadlarda foydalanishi mumkin. Quyidagi harakatlar taqiqlanadi:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Boshqa foydalanuvchilarning shaxsiy ma'lumotlarini to'plash</li>
            <li>Platformaning ishlashiga xalaqit beruvchi harakatlar amalga oshirish</li>
            <li>Soxta ma'lumotlar kiritish yoki boshqa foydalanuvchilarni aldash</li>
            <li>Mualliflik huquqi himoyasidagi materiallarni ruxsatsiz tarqatish</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">3. Shaxsiy ma'lumotlar</h2>
          <p>Platforma foydalanuvchilarning shaxsiy ma'lumotlarini O'zbekiston Respublikasining "Shaxsiy ma'lumotlar to'g'risida"gi qonuniga muvofiq himoya qiladi.</p>
          <p>To'plangan ma'lumotlar faqat ta'lim xizmatlarini yaxshilash maqsadida ishlatiladi va uchinchi shaxslarga berilmaydi.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">4. Intellektual mulk</h2>
          <p>Platformadagi barcha test savollari, maqolalar, rasmlar va boshqa materiallar Geo-Test platformasiga tegishli bo'lib, mualliflik huquqi bilan himoyalangan.</p>
          <p>Materiallarni platforma ruxsatisiz ko'paytirish, tarqatish yoki tijorat maqsadida ishlatish taqiqlanadi.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">5. Javobgarlik chegarasi</h2>
          <p>Platforma test natijalari va ta'lim materiallari sifati uchun mas'uliyat oladi. Biroq texnik nosozliklar, internet aloqasi uzilishi yoki fors-major holatlari tufayli yuzaga kelgan muammolar uchun Platforma javobgar emas.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">6. O'zgartirishlar</h2>
          <p>Platforma ushbu Ofertani istalgan vaqtda o'zgartirish huquqini o'zida saqlab qoladi. O'zgartirishlar haqida foydalanuvchilar bildirishnoma orqali xabardor qilinadi.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">7. Bog'lanish</h2>
          <p>Savollar yoki shikoyatlar bo'lsa: <span className="text-[var(--primary)] font-medium">support@geo-test.uz</span></p>
        </section>

      </div>
    </div>
  );
}
