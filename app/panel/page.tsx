'use client';
import MediationList from '@/components/MediationList';
import ContractList from '@/components/ContractList';

export default function MemberDashboard() {
  return (
    <div className="min-h-screen bg-[#F4F7FA] p-4 lg:p-8 text-[#1B365D]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ÜST ÖZET PANELİ */}
        <div className="bg-[#1B365D] p-6 rounded-[2rem] text-white shadow-xl flex flex-col md:flex-row justify-between items-center border-b-4 border-[#D4AF37]">
          <div>
            <h1 className="text-xl font-black italic text-[#D4AF37]">HAS İNSANDER <span className="text-white uppercase">TİB BORSA PANELİ</span></h1>
            <p className="text-[9px] opacity-60 font-mono tracking-widest uppercase">Silicon Campus Secured Trade Engine v2.0</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-center">
              <p className="text-[8px] uppercase opacity-50">Güven Skorunuz</p>
              <p className="text-xl font-black text-[#D4AF37]">85</p>
            </div>
            <div className="bg-green-500/20 px-4 py-2 rounded-xl border border-green-500/30 text-center">
              <p className="text-[8px] uppercase text-green-400">Piyasa Durumu</p>
              <p className="text-xl font-black text-green-400 font-mono">AÇIK</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* SOL TARAF: AKTİF BORSA MOTORU (Burası Geri Geldi!) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="font-black text-sm uppercase tracking-tighter">��� AKTİF TİCARET EŞLEŞMELERİ (TİB)</h2>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold italic">Otonom Veri Akışı</span>
              </div>
              {/* OTONOM MOTOR BURADA ÇALIŞIYOR */}
              <MediationList />
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="font-black text-sm uppercase tracking-tighter mb-6 border-b pb-4">��� ONAYLANMIŞ KONTRATLARIM</h2>
              <ContractList />
            </div>
          </div>

          {/* SAĞ TARAF: DİJİTAL KİMLİK & ANALİZ */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1B365D] to-[#0A192F] p-6 rounded-[2rem] shadow-2xl text-white border-t-4 border-[#D4AF37]">
              <div className="text-[9px] font-black uppercase opacity-40 mb-4 italic text-center">TİB Dijital Kimlik Kartı</div>
              <div className="flex justify-center mb-4">
                <div className="bg-white p-2 rounded-xl">
                   {/* QR SİMÜLASYONU */}
                  <div className="w-24 h-24 bg-black flex items-center justify-center text-[10px] text-white text-center">TİB-ID-2026<br/>VERIFIED</div>
                </div>
              </div>
              <p className="text-center font-bold text-sm tracking-tight mb-1 uppercase">Sayın Üye Soyadı</p>
              <p className="text-center text-[9px] text-[#D4AF37] font-mono">Member ID: #HAS-2026-001</p>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 text-center">
               <h4 className="text-[10px] font-black uppercase mb-2">Hızlı Yardım</h4>
               <a href="https://wa.me/905333715577" className="inline-block w-full bg-green-500 text-white py-2 rounded-xl text-xs font-bold hover:bg-green-600 transition-all">
                 BAŞKAN DESTEK HATTI
               </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
