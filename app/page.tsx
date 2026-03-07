import Link from 'next/link';

export default function HasinderMainPage() {
  return (
    <div className="bg-white">
      {/* TIB Borsa Giris Alani (VITRIN) */}
      <div className="bg-gradient-to-b from-[#1B365D] to-[#0A192F] py-24 px-6 text-center text-white border-b-4 border-[#D4AF37]">
        <h2 className="text-[#D4AF37] text-sm font-bold tracking-[0.3em] uppercase mb-4 animate-pulse">
          Otonom Ticaret Cagi Basladi
        </h2>
        <h1 className="text-5xl md:text-7xl font-black mb-8 italic text-balance">
          TIB <span className="text-[#D4AF37]">TICARET AGI</span>
        </h1>
        <p className="max-w-2xl mx-auto text-blue-100 text-lg font-light mb-12 text-pretty">
          Hatay'in gucunu dijital borsayla birlestiriyoruz. Aracilarin, saticilarin ve alicilarin otonom guvenli bulusma noktasi.
        </p>
        
        <Link href="/giris" className="inline-block bg-[#D4AF37] text-[#0A192F] px-16 py-5 rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(212,175,55,0.4)]">
          BORSAYA GIRIS YAP
        </Link>
        
        <div className="mt-8 text-[10px] text-blue-400 font-mono">
          [ 08.03.2026 KVKK & OTP SECURED SYSTEM ]
        </div>
      </div>

      {/* Dernek Faaliyetleri (Alt Bolum) */}
      <div className="py-20 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <Link href="/haberler" className="space-y-4 group cursor-pointer">
          <h3 className="text-xl font-bold text-[#1B365D] border-b-2 border-gray-100 pb-2 group-hover:text-[#D4AF37] transition-colors">Dernek Haberleri</h3>
          <p className="text-sm text-gray-500">Hasinder'in yeni projeleri ve Hatay icin attigi adimlar...</p>
        </Link>
        <Link href="/etkinlikler" className="space-y-4 group cursor-pointer">
          <h3 className="text-xl font-bold text-[#1B365D] border-b-2 border-gray-100 pb-2 group-hover:text-[#D4AF37] transition-colors">Etkinlikler</h3>
          <p className="text-sm text-gray-500">Gelecek ay duzenlenecek olan is dunyasi zirvesi detaylari...</p>
        </Link>
        <Link href="/kesfet" className="space-y-4 group cursor-pointer">
          <h3 className="text-xl font-bold text-[#1B365D] border-b-2 border-gray-100 pb-2 group-hover:text-[#D4AF37] transition-colors">Istatistikler</h3>
          <p className="text-sm text-gray-500">TIB Agi uzerinden gerceklesen aylik ticaret hacmi verileri...</p>
        </Link>
      </div>
      
      {/* Hizli Erisim Kartlari */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1B365D] text-center mb-12">Hizli Erisim</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link href="/kesfet" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 text-center group">
              <div className="w-12 h-12 bg-[#1B365D] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#D4AF37] transition-colors">
                <i className="ri-search-line text-xl text-white"></i>
              </div>
              <h4 className="font-bold text-[#1B365D]">Firma Kesfet</h4>
              <p className="text-xs text-gray-500 mt-2">Uye firmalari inceleyin</p>
            </Link>
            <Link href="/akilli-eslestirme" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 text-center group">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1B365D] transition-colors">
                <i className="ri-links-line text-xl text-white"></i>
              </div>
              <h4 className="font-bold text-[#1B365D]">Akilli Eslestirme</h4>
              <p className="text-xs text-gray-500 mt-2">Is ortagi buluturucu</p>
            </Link>
            <Link href="/haberler" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 text-center group">
              <div className="w-12 h-12 bg-[#1B365D] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#D4AF37] transition-colors">
                <i className="ri-newspaper-line text-xl text-white"></i>
              </div>
              <h4 className="font-bold text-[#1B365D]">Haberler</h4>
              <p className="text-xs text-gray-500 mt-2">Guncel gelismeler</p>
            </Link>
            <Link href="/iletisim" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 text-center group">
              <div className="w-12 h-12 bg-[#1B365D] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#D4AF37] transition-colors">
                <i className="ri-customer-service-2-line text-xl text-white"></i>
              </div>
              <h4 className="font-bold text-[#1B365D]">Iletisim</h4>
              <p className="text-xs text-gray-500 mt-2">Bize ulasin</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
