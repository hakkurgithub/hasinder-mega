'use client';

export default function MemberDashboard() {
  return (
    <div className="min-h-screen bg-[#F4F7FA] p-6 lg:p-12 text-[#1B365D]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ÜST PANEL: HOŞGELDİN & ÖZET */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-[#1B365D] p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
          <div className="z-10">
            <h1 className="text-2xl font-light">Hoş Geldiniz, <span className="font-black italic text-[#D4AF37]">Sayın Üye</span></h1>
            <p className="text-[10px] opacity-60 uppercase tracking-[0.2em] mt-2 font-mono">TİB Otonom Borsa Ağı | Aktif Oturum</p>
          </div>
          <div className="flex gap-4 z-10">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 text-center">
              <p className="text-[9px] uppercase opacity-60">Güven Puanınız</p>
              <p className="text-2xl font-black text-[#D4AF37]">85<span className="text-xs">/100</span></p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 text-center">
              <p className="text-[9px] uppercase opacity-60">Aktif Eşleşme</p>
              <p className="text-2xl font-black text-green-400">12</p>
            </div>
          </div>
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        </div>

        {/* ORTA PANEL: GRAFİKLER & İŞLEMLER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* TİCARET HACMİ (GÖRSEL SİMÜLASYON) */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="font-black uppercase text-xs mb-6 flex justify-between">
              Ticaret Performansı <span className="text-[#D4AF37] italic">SON 30 GÜN</span>
            </h3>
            <div className="h-48 flex items-end gap-2 px-2">
              <div className="bg-gray-100 w-full h-[40%] rounded-t-lg"></div>
              <div className="bg-[#1B365D] w-full h-[65%] rounded-t-lg"></div>
              <div className="bg-gray-100 w-full h-[30%] rounded-t-lg"></div>
              <div className="bg-[#D4AF37] w-full h-[90%] rounded-t-lg"></div>
              <div className="bg-[#1B365D] w-full h-[55%] rounded-t-lg"></div>
              <div className="bg-gray-100 w-full h-[75%] rounded-t-lg"></div>
              <div className="bg-[#D4AF37] w-full h-[100%] rounded-t-lg shadow-lg"></div>
            </div>
          </div>

          {/* DİJİTAL TİB KARTI */}
          <div className="bg-gradient-to-br from-[#1B365D] to-[#0A192F] p-8 rounded-[2rem] shadow-2xl text-white relative border-t-4 border-[#D4AF37]">
            <div className="flex justify-between items-start mb-12">
              <div className="text-[10px] font-black uppercase opacity-60 italic">TİB Dijital Kimlik</div>
              <img src="https://raw.githubusercontent.com/hakkurgithub/images/main/silicon-campus-logo.jpg" className="h-6 rounded grayscale brightness-200" />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[8px] uppercase opacity-40">Üye Adı</p>
                <p className="text-lg font-bold tracking-tight">ÜYE ADI SOYADI</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-[8px] uppercase opacity-40">Şehir</p>
                  <p className="text-xs font-bold">İSTANBUL & HATAY</p>
                </div>
                <div className="bg-white p-2 rounded-lg">
                  {/* QR SİMÜLASYONU */}
                  <div className="w-12 h-12 bg-black flex items-center justify-center text-[6px] text-white">QR CODE</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
