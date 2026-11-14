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
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Foydalanuvçi öffertasi</h1>
          <p className="text-xs text-[var(--text-secondary)]">Oxirgi yangilaniş: 01.01.2025</p>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#06B6D418' }}>
          <Shield size={18} style={{ color: '#06B6D4' }} />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-5 text-sm text-[var(--text-secondary)] leading-relaxed">

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">1. Umumiy qoidalar</h2>
          <p>Uşbu foydalanuvçi öffertasi (keyingi örinlarda "Oferta") GeoBek platformasi (keyingi örinlarda "Platforma") va uning foydalanuvçilari örtasidagi munosabatlarni tartibga soladi.</p>
          <p>Platformaga röyxatdan ötgan yoki undan foydalangan har bir şaxs uşbu Oferta şartlarini qabul qilgan hisoblanadi.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">2. Platformadan foydalaniş</h2>
          <p>Foydalanuvçi Platformadan faqat qonuniy maqsadlarda foydalanişi mumkin. Quyidagi harakatlar taqiqlanadi:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Boşqa foydalanuvçilarning şaxsiy ma'lumotlarini töplaş</li>
            <li>Platformaning işlaşiga xalaqit beruvçi harakatlar amalga oşiriş</li>
            <li>Soxta ma'lumotlar kiritiş yoki boşqa foydalanuvçilarni aldaş</li>
            <li>Mualliflik huquqi himoyasidagi materiallarni ruxsatsiz tarqatiş</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">3. Şaxsiy ma'lumotlar</h2>
          <p>Platforma foydalanuvçilarning şaxsiy ma'lumotlarini Özbekiston Respublikasining "Şaxsiy ma'lumotlar töğrisida"gi qonuniga muvofiq himoya qiladi.</p>
          <p>Töplangan ma'lumotlar faqat ta'lim xizmatlarini yaxşilaş maqsadida işlatiladi va uçinçi şaxslarga berilmaydi.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">4. Intellektual mulk</h2>
          <p>Platformadagi barça test savollari, maqolalar, rasmlar va boşqa materiallar GeoBek platformasiga tegişli bölib, mualliflik huquqi bilan himoyalangan.</p>
          <p>Materiallarni platforma ruxsatisiz köpaytiriş, tarqatiş yoki tijorat maqsadida işlatiş taqiqlanadi.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">5. Javobgarlik çegarasi</h2>
          <p>Platforma test natijalari va ta'lim materiallari sifati uçun mas'uliyat oladi. Biroq texnik nosozliklar, internet aloqasi uzilişi yoki fors-major holatlari tufayli yuzaga kelgan muammolar uçun Platforma javobgar emas.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">6. Özgartirişlar</h2>
          <p>Platforma uşbu Ofertani istalgan vaqtda özgartiriş huquqini özida saqlab qoladi. Özgartirişlar haqida foydalanuvçilar bildirişnoma orqali xabardor qilinadi.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">7. Boğlaniş</h2>
          <p>Savollar yoki şikoyatlar bölsa: <span className="text-[var(--primary)] font-medium">support@geobek.uz</span></p>
        </section>

      </div>
    </div>
  );
}
