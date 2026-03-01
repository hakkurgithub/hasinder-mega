export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* SOL TARAF: Kurumsal Bilgiler */}
        <div className="space-y-8">
          <div className="border-l-8 border-[#D4AF37] pl-6">
            <h1 className="text-4xl font-black text-[#1B365D] tracking-tighter uppercase">İLETİŞİM <span className="text-[#D4AF37]">MERKEZİ</span></h1>
            <p className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-widest">HAS İNSANDER Resmi İrtibat Hattı</p>
          </div>
          
          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h4 className="text-[#1B365D] font-bold uppercase text-xs mb-2">Genel Merkez</h4>
              <p className="text-sm text-gray-600 italic">Adile Naşit Caddesi, Olcay Sevalista Residence Kat 2, Esenyurt / İSTANBUL</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <h4 className="text-[#1B365D] font-bold uppercase text-xs mb-2">E-Posta</h4>
              <a href="mailto:kurt.hakki@gmail.com" className="text-sm text-blue-600 hover:underline">kurt.hakki@gmail.com</a>
            </div>

            <div className="p-6 bg-green-50 rounded-2xl border border-green-200">
              <h4 className="text-green-800 font-bold uppercase text-xs mb-2">Hızlı WhatsApp Hattı</h4>
              <a href="https://wa.me/905333715577" target="_blank" className="text-lg font-black text-green-700">0533 371 55 77</a>
              <p className="text-[10px] text-green-600 mt-1 italic">7/24 Borsa ve Sevkiyat Destek</p>
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: Mesaj Formu */}
        <div className="bg-[#1B365D] p-10 rounded-3xl shadow-2xl">
          <h3 className="text-white font-bold text-xl mb-6">Bize Mesaj Gönderin</h3>
          <form className="space-y-4">
            <input type="text" placeholder="Adınız Soyadınız" className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:border-[#D4AF37] outline-none transition-all" />
            <input type="email" placeholder="E-Posta Adresiniz" className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:border-[#D4AF37] outline-none transition-all" />
            <textarea placeholder="Mesajınız..." rows={4} className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:border-[#D4AF37] outline-none transition-all"></textarea>
            <button type="button" className="w-full bg-[#D4AF37] text-[#0A192F] py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg">GÖNDER</button>
          </form>
          <p className="mt-6 text-[9px] text-white/40 text-center uppercase font-mono">Powered by Silicon Campus - Secured Data Cell</p>
        </div>

      </div>
    </div>
  );
}
