'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// NOT: ENV degiskenleriniz Vercel uzerinde tanimli olmalidir.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function MemberDashboard() {
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // VERITABANINDAN VERI CEKME
  useEffect(() => {
    async function fetchTrades() {
      const { data, error } = await supabase.from('trades').select('*');
      if (!error && data) setTrades(data);
      setLoading(false);
    }
    fetchTrades();
  }, []);

  // VERITABANINA GUNCELLEME GONDERME
  const startMatch = async (id) => {
    const { error } = await supabase
      .from('trades')
      .update({ status: 'Eslesme Baslatildi' })
      .eq('id', id);

    if (!error) {
      setTrades(trades.map(t => t.id === id ? {...t, status: 'Eslesme Baslatildi'} : t));
      setSelectedTrade(null);
    }
  };

  if (loading) return <div className="p-10 font-bold text-center">TIB Agi Yukleniyor...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 text-[#1B365D]">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-[#1B365D] p-6 rounded-[2rem] text-white shadow-xl flex flex-col md:flex-row justify-between items-center border-b-4 border-[#D4AF37]">
          <div>
            <h1 className="text-xl font-black italic text-[#D4AF37]">HAS INSANDER <span className="text-white">BORSA PANELI</span></h1>
            <p className="text-[10px] opacity-60 font-mono tracking-widest uppercase text-white/50">Supabase Connected Node v4.0</p>
          </div>
          <div className="bg-green-500/20 px-6 py-2 rounded-2xl border border-green-500/30">
            <p className="text-[10px] text-green-400 font-black uppercase">DATABASE LIVE</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="font-black text-sm uppercase mb-6 border-b pb-4">GERCEK ZAMANLI TICARET MASASI</h2>
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
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black ${trade.status.includes('Baslatildi') ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
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
        </div>
      </div>

      {selectedTrade && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border-t-8 border-[#D4AF37]">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-black text-xl uppercase italic">{selectedTrade.id} DETAYLARI</h3>
              <button onClick={() => setSelectedTrade(null)} className="text-gray-400 font-bold text-[10px]">KAPAT</button>
            </div>
            <div className="space-y-4">
              <p className="font-bold text-lg">{selectedTrade.title}</p>
              <p className="text-xs text-blue-600 italic">{selectedTrade.detail || 'Detay belirtilmemis.'}</p>
              <button onClick={() => startMatch(selectedTrade.id)} className="w-full bg-[#1B365D] text-[#D4AF37] py-4 rounded-2xl font-black uppercase shadow-lg">
                VERITABANINA ESLESME KAYDET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
