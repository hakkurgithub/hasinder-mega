'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function MemberDashboard() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(null);

  useEffect(() => {
    async function fetchTrades() {
      try {
        const { data, error } = await supabase.from('trades').select('*');
        if (error) throw error;
        setTrades(data || []);
      } catch (err) {
        setDbError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTrades();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 text-[#1B365D]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="bg-[#1B365D] p-6 rounded-[2rem] text-white shadow-xl flex justify-between items-center border-b-4 border-[#D4AF37]">
          <div>
            <h1 className="text-xl font-black italic text-[#D4AF37]">HAS INSANDER <span className="text-white">BORSA</span></h1>
            <p className="text-[10px] opacity-60 uppercase">Supabase Stable v4.2</p>
          </div>
          <div className={`px-4 py-1 rounded-full text-[10px] font-black ${dbError ? 'bg-red-500' : 'bg-green-500'}`}>
            {dbError ? 'CONNECTION ERROR' : 'LIVE DATABASE'}
          </div>
        </div>

        {/* ERROR DISPLAY */}
        {dbError && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-xl text-red-700 text-xs">
            <p className="font-bold uppercase italic">Sistem Notu:</p>
            <p>{dbError}</p>
          </div>
        )}

        {/* TRADES LIST */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h2 className="font-black text-xs uppercase mb-4 text-gray-500 tracking-widest">AKTIF TICARET VERILERI</h2>
          {loading ? (
            <p className="text-center py-10 animate-pulse font-bold">Veriler Cekiliyor...</p>
          ) : trades.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 italic font-bold">Veritabaninda aktif ilan bulunmuyor.</p>
              <p className="text-[10px] mt-2 text-blue-500 uppercase">Supabase Table Editor uzerinden veri ekleyiniz.</p>
            </div>
          ) : (
            <div className="overflow-x-auto text-sm">
              <table className="w-full text-left">
                <thead className="border-b text-[10px] text-gray-400">
                  <tr>
                    <th className="pb-3 px-2">ID</th>
                    <th className="pb-3">TANIM</th>
                    <th className="pb-3">HACIM</th>
                    <th className="pb-3">DURUM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {trades.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2 font-mono text-blue-600 font-bold">{t.id}</td>
                      <td className="py-4 font-bold">{t.title}</td>
                      <td className="py-4 text-[#D4AF37] font-black">{t.amount || '0 TL'}</td>
                      <td className="py-4">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[9px] font-black uppercase">
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
