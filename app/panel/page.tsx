'use client';
import MediationList from '../../components/MediationList';
import ContractList from '../../components/ContractList';

export default function MemberDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-6 text-[#1B365D]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* BORSA DURUM CUBUGU */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border-l-8 border-[#D4AF37] flex justify-between items-center">
          <div className="flex items-center space-x-4">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
             <h1 className="text-sm font-black uppercase tracking-widest">HAS INSANDER <span className="text-[#D4AF37]">CANLI BORSA EKRANI</span></h1>
          </div>
          <div className="text-[10px] font-mono text-gray-400 uppercase italic">Silicon Campus Secured Trade Node: #TIB-2026</div>
        </div>

        {/* ANA BORSA MOTORU */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <div className="lg:col-span-3 space-y-6">
            {/* TICARET VE ESLESME LISTESI */}
            <div className="bg-[#1B365D] text-white p-6 rounded-[2rem] shadow-2xl border-b-4 border-[#D4AF37]">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h2 className="font-black text-lg uppercase italic tracking-tighter text-[#D4AF37]">AKTIF TICARET VE ARABULUCULUK LISTESI</h2>
                <button className="bg-[#D4AF37] text-[#0A192F] px-4 py-1 rounded-full text-[10px] font-black uppercase">YENI ILAN VER</button>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 min-h-[400px]">
                <MediationList />
              </div>
            </div>

            {/* ONAYLANAN KONTRATLAR */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="font-black text-xs uppercase mb-4 border-b pb-2">ONAYLANAN KONTRATLARIM</h2>
              <ContractList />
            </div>
          </div>

          {/* SAG PANEL */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1B365D] to-[#0A192F] p-6 rounded-[2rem] shadow-xl text-white border-t-4 border-[#D4AF37]">
              <div className="text-[8px] font-black uppercase opacity-40 mb-4 text-center">TIB Dijital Kimlik Karti</div>
              <div className="flex justify-center mb-4 text-black">
                <div className="bg-white p-2 rounded-xl text-center font-mono text-[8px]">
                  VERIFIED<br/>BY<br/>SILICON CAMPUS
                </div>
              </div>
              <p className="text-center font-bold text-xs">SAYIN UYE</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-[9px]">
                <span className="opacity-50 uppercase font-bold">Guven Skoru:</span>
                <span className="text-[#D4AF37] font-black italic text-sm">85/100</span>
              </div>
            </div>

            {/* KUCUK ISTATISTIK */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
               <h4 className="text-[9px] font-black uppercase mb-4 opacity-50">Haftalik Performans</h4>
               <div className="flex items-end gap-1 h-20">
                  <div className="bg-gray-100 w-full h-[40%] rounded"></div>
                  <div className="bg-[#D4AF37] w-full h-[80%] rounded"></div>
                  <div className="bg-gray-100 w-full h-[30%] rounded"></div>
                  <div className="bg-[#1B365D] w-full h-[60%] rounded"></div>
               </div>
            </div>
            
            <a href="https://wa.me/905333715577" className="block bg-green-500 text-white text-center p-4 rounded-2xl text-xs font-black shadow-lg hover:bg-green-600 transition-all uppercase">
              BASKAN DESTEK HATTI
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
