'use client';
import React, { useState } from 'react';

export default function MemberDashboard() {
  // BORSA VERI MOTORU (SIMULE EDILMIS CANLI VERI)
  const [trades] = useState([
    { id: 'TIB-001', title: 'Gida Tedarik / Bakliyat', amount: '50.000 TL', status: 'Eslesme Bekliyor' },
    { id: 'TIB-002', title: 'Insaat Malzemesi / Demir', amount: '120.000 TL', status: 'Onaylandi' },
    { id: 'TIB-003', title: 'Tekstil / Hammadde', amount: '75.000 TL', status: 'Eslesme Bekliyor' }
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 text-[#1B365D]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ÜST PANEL: BORSA DURUMU */}
        <div className="bg-[#1B365D] p-6 rounded-[2rem] text-white shadow-xl flex flex-col md:flex-row justify-between items-center border-b-4 border-[#D4AF37]">
          <div>
            <h1 className="text-xl font-black italic text-[#D4AF37]">HAS INSANDER <span className="text-white">BORSA PANELİ</span></h1>
            <p className="text-[10px] opacity-60 font-mono tracking-widest uppercase">Silicon Campus Secured Node v3.0</p>
          </div>
          <div className="bg-green-500/20 px-6 py-2 rounded-2xl border border-green-500/30">
            <p className="text-[10px] text-green-400 font-black uppercase animate-pulse">● CANLI TICARET AKISI AKTIF</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* ANA BORSA EKRANI (MOTOR BURADA) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="font-black text-sm uppercase tracking-tighter">AKTIF TICARET VE ESLESME MERKEZI</h2>
                <button className="bg-[#D4AF37] text-[#0A192F] px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:scale-105 transition-transform">YENI ILAN EKLE</button>
              </div>
              
              {/* BORSA LISTESI */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-400 uppercase text-[10px] border-b">
                      <th className="pb-3">Islem ID</th>
                      <th className="pb-3">Ticaret Tanimi</th>
                      <th className="pb-3">Hacim</th>
                      <th className="pb-3">Durum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {trades.map((trade) => (
                      <tr key={trade.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 font-mono text-blue-600 font-bold">{trade.id}</td>
                        <td className="py-4 font-bold">{trade.title}</td>
                        <td className="py-4 text-[#D4AF37] font-black">{trade.amount}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black ${trade.status === 'Onaylandi' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {trade.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SAĞ PANEL: ÜYE KİMLİĞİ */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1B365D] to-[#0A192F] p-6 rounded-[2rem] shadow-xl text-white border-t-4 border-[#D4AF37]">
              <p className="text-[8px] font-black uppercase opacity-40 mb-4 text-center tracking-widest">TIB Digital Identity</p>
              <div className="flex justify-center mb-4">
                <div className="bg-white p-4 rounded-2xl text-black font-mono text-[10px] text-center border-2 border-[#D4AF37]">
                  HAS-2026<br/>VERIFIED
                </div>
              </div>
              <p className="text-center font-bold text-xs uppercase mb-1">Sayın Üye</p>
              <div className="pt-4 border-t border-white/10 flex justify-between text-[10px]">
                <span className="opacity-50">GÜVEN SKORU:</span>
                <span className="text-[#D4AF37] font-black italic">85/100</span>
              </div>
            </div>

            <a href="https://wa.me/905333715577" className="block bg-green-600 text-white text-center p-4 rounded-2xl text-xs font-black shadow-lg hover:bg-green-700 transition-all uppercase">
              BAŞKAN DESTEK HATTI
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
