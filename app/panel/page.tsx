'use client';
import React, { useState } from 'react';

export default function MemberDashboard() {
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [trades, setTrades] = useState([
    { id: 'TIB-001', title: 'Gida Tedarik / Bakliyat', amount: '50.000 TL', status: 'Eslesme Bekliyor', detail: 'Hatay Merkezli 10 Ton Nohut Tedariki', date: '01.03.2026' },
    { id: 'TIB-002', title: 'Insaat Malzemesi / Demir', amount: '120.000 TL', status: 'Onaylandi', detail: 'Istanbul Santiye Teslim Q12 Nervurlu Demir', date: '28.02.2026' },
    { id: 'TIB-003', title: 'Tekstil / Hammadde', amount: '75.000 TL', status: 'Eslesme Bekliyor', detail: 'Pamuklu Kumas Ham Bez Alimi', date: '01.03.2026' }
  ]);

  const startMatch = (id) => {
    setTrades(trades.map(t => t.id === id ? {...t, status: 'Eslesme Baslatildi'} : t));
    setSelectedTrade(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 text-[#1B365D]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="bg-[#1B365D] p-6 rounded-[2rem] text-white shadow-xl flex flex-col md:flex-row justify-between items-center border-b-4 border-[#D4AF37]">
          <div>
            <h1 className="text-xl font-black italic text-[#D4AF37]">HAS INSANDER <span className="text-white">BORSA PANELI</span></h1>
            <p className="text-[10px] opacity-60 font-mono tracking-widest uppercase">Silicon Campus Secured Node v3.2</p>
          </div>
          <div className="bg-green-500/20 px-6 py-2 rounded-2xl border border-green-500/30">
            <p className="text-[10px] text-green-400 font-black uppercase tracking-widest">LIVE TRADE FLOW ACTIVE</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="font-black text-sm uppercase mb-6 border-b pb-4">AKTIF TICARET MERKEZI</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-400 uppercase text-[10px] border-b">
                      <th className="pb-3 px-2">ID</th>
                      <th className="pb-3">TANIM</th>
                      <th className="pb-3">HACIM</th>
                      <th className="pb-3">DURUM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {trades.map((trade) => (
                      <tr key={trade.id} onClick={() => setSelectedTrade(trade)} className="hover:bg-blue-50 cursor-pointer transition-all">
                        <td className="py-4 px-2 font-mono text-blue-600 font-bold">{trade.id}</td>
                        <td className="py-4 font-bold">{trade.title}</td>
                        <td className="py-4 text-[#D4AF37] font-black">{trade.amount}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black ${trade.status.includes('Baslatildi') ? 'bg-orange-100 text-orange-700' : trade.status === 'Onaylandi' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
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

          <div className="space-y-6">
            <div className="bg-[#0A192F] p-6 rounded-[2rem] shadow-xl text-white border-t-4 border-[#D4AF37]">
              <p className="text-[8px] font-black uppercase opacity-40 mb-4 text-center">TIB Digital Identity</p>
              <div className="flex justify-center mb-4">
                <div className="bg-white p-4 rounded-2xl text-black font-mono text-[10px] text-center border-2 border-[#D4AF37]">HAS-2026 VERIFIED</div>
              </div>
              <p className="text-center font-bold text-xs uppercase">UYE PANELI</p>
              <div className="pt-4 mt-4 border-t border-white/10 flex justify-between text-[10px]">
                <span>GUVEN SKORU:</span>
                <span className="text-[#D4AF37] font-black italic text-right">85/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedTrade && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border-t-8 border-[#D4AF37]">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-black text-xl uppercase italic tracking-tighter">{selectedTrade.id} DETAYLARI</h3>
              <button onClick={() => setSelectedTrade(null)} className="text-gray-400 hover:text-red-500 font-bold uppercase text-xs">KAPAT</button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Ticaret Konusu</p>
                <p className="font-bold text-lg">{selectedTrade.title}</p>
                <p className="text-xs text-blue-600 mt-1 italic">{selectedTrade.detail}</p>
              </div>
              {selectedTrade.status === 'Eslesme Bekliyor' && (
                <button onClick={() => startMatch(selectedTrade.id)} className="w-full bg-[#1B365D] text-[#D4AF37] py-4 rounded-2xl font-black uppercase shadow-lg hover:bg-[#0A192F] transition-all">
                  ESLESME TALEBI GONDER
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
