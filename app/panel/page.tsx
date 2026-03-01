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
        console.error("TIB DB Error:", err);
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
            <p className="text-[10px] opacity-60">Supabase Diagnostics v4.1</p>
          </div>
          <div className={`px-4 py-1 rounded-full text-[10px] font-black ${dbError ? 'bg-red-500' : 'bg-green-500'}`}>
            {dbError ? 'BAGLANTI HATASI' : 'BAGLANTI AKTIF'}
          </div>
        </div>

        {/* HATA EKRANI (Eger Baglanmiyorsa) */}
        {dbError && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-xl text-red-700 text-xs">
            <p className="font-bold uppercase italic">Sistem Teşhisi:</p>
            <p>{dbError}</p>
            <p className="mt-2 opacity-70">Not: Supabase'de 'trades' tablosu kurulu mu ve RLS izinleri acik mi?</p>
          </div>
        )}

        {/* BORSA LISTESI */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h2 className="font-black text-xs uppercase mb-4">CANLI TICARET VERILERI</h2>
          {loading ? (
            <p className="text-center py-10 animate-pulse font-bold">Veriler Cekiliyor...</p>
          ) : trades.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 italic">Veritabaninda henüz aktif ilan bulunmuyor.</p>
              <p className="text-[10px] mt-2 text-blue-500">Supabase Dashboard -> Table Editor -> 'trades' tablosuna veri ekleyin.</p>
            </div>
          ) : (
            <div className="overflow-x-auto text-sm">
              <table className="w-full text-left">
                <thead className="border-b text-[10px] text-gray-400">
                  <tr><th className="pb-2">ID</th><th className="pb-2">TANIM</th><th className="pb-2">DURUM</th></tr>
                </thead>
                <tbody className="divide-y">
                  {trades.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50"><td className="py-3 font-mono">{t.id}</td><td className="py-3 font-bold">{t.title}</td><td className="py-3 text-[10px]">{t.status}</td></tr>
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
