'use client';

export default function MemberDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 text-[#1B365D]">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* KURUMSAL HEADER */}
        <div className="bg-[#1B365D] p-6 rounded-3xl text-white shadow-xl border-b-4 border-[#D4AF37]">
          <h1 className="text-xl font-black italic">HAS INSANDER <span className="text-[#D4AF37]">UYE PANELI</span></h1>
          <p className="text-[10px] opacity-60 font-mono">Guvenli Baglanti Aktif | 2026</p>
        </div>

        {/* OZET BILGILER - HATA RISKSIZ SAF KOD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-[10px] uppercase font-bold text-gray-400">Uye Durumu</p>
            <p className="text-2xl font-black text-green-600">AKTIF</p>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-gray-500 italic">Sistem uzerinden ticaret yapmaya yetkiniz bulunmaktadir.</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-[10px] uppercase font-bold text-gray-400">Guven Skoru (TrustScore)</p>
            <p className="text-2xl font-black text-[#D4AF37]">85 / 100</p>
            <div className="mt-4 pt-4 border-t font-mono text-[9px] text-blue-500 underline uppercase tracking-tighter">
              Nasil Yukseltirilir?
            </div>
          </div>
        </div>

        {/* ACIL DUYURU / BORSA YONLENDIRME */}
        <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-3xl">
          <h3 className="font-black text-sm uppercase text-yellow-800">Canli Borsa Islemleri</h3>
          <p className="text-xs text-yellow-700 mt-2">
            Borsa islemleri ve eslesmeleri gormek icin ana sayfadaki "BORSA" sekmesini kullaniniz. 
            Bu panel su an guncelleme asamasindadir.
          </p>
        </div>

        <a href="https://wa.me/905333715577" className="block bg-green-500 text-white text-center p-4 rounded-2xl text-xs font-black shadow-lg uppercase">
          BASKAN DESTEK HATTI (WHATSAPP)
        </a>

      </div>
    </div>
  );
}
