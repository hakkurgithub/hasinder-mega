'use client';
import MediationList from '@/components/MediationList';
import ContractList from '@/components/ContractList';

export default function MemberDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-6 text-[#1B365D]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* BASLIK PANELI */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border-l-8 border-[#D4AF37] flex justify-between items-center">
          <div className="flex items-center space-x-4">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
             <h1 className="text-sm font-black uppercase tracking-widest">HAS INSANDER BORSA</h1>
          </div>
          <div className="text-[10px] font-mono text-gray-400">Node: 2026-SECURE</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <div className="lg:col-span-3 space-y-6">
            {/* TIB BORSA MOTORU */}
            <div className="bg-[#1B365D] text-white p-6 rounded-[2rem] shadow-2xl border-b-4 border-[#D4AF37]">
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h2 className="font-black text-lg uppercase italic text-[#D4AF37]">AKTIF TICARET MERKEZI</h2>
                <button className="bg-[#D4AF37] text-[#0A192F] px-4 py-1 rounded-full text-[10px] font-black uppercase">ILAN VER</button>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 min-h-[300px]">
                <MediationList />
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="font-black text-xs uppercase mb-4 opacity-70">ONAYLI SOZLESMELER</h2>
              <ContractList />
            </div>
          </div>

          {/* SAG PANEL */}
          <div className="space-y-6">
            <div className="bg-[#0A192F] p-6 rounded-[2rem] shadow-xl text-white border-t-4 border-[#D4AF37]">
              <p className="text-[8px] font-black uppercase opacity-40 mb-4 text-center">TIB ID</p>
              <div className="flex justify-center mb-4">
                <div className="bg-white p-4 rounded-xl text-black font-mono text-[10px]">VERIFIED</div>
              </div>
              <p className="text-center font-bold text-xs">UYE PANELI</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-[10px]">
                <span className="opacity-50 uppercase">Score:</span>
                <span className="text-[#D4AF37] font-black italic">85/100</span>
              </div>
            </div>

            <a href="/iletisim" className="block bg-green-600 text-white text-center p-4 rounded-2xl text-[10px] font-black shadow-lg uppercase">
              DESTEK
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
