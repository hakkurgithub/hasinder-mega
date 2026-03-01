'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Vercel uzerindeki anahtarlari dene, bulamazsan yedek manuel anahtari kullan
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scxwhchnuhsuzkfvqmqw.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function MemberDashboard() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState('Baglanti Bekleniyor...');

  useEffect(() => {
    async function loadBorsa() {
      try {
        const { data, error } = await supabase.from('trades').select('*');
        if (error) throw error;
        setTrades(data || []);
        setDbStatus(data && data.length > 0 ? 'BAGLANTI AKTIF' : 'TABLO BOS (VERI GIRIN)');
      } catch (err) {
        setDbStatus('HATA: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    loadBorsa();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 text-[#1B365D]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="bg-[#1B365D] p-6 rounded-[2rem] text-white shadow-xl flex flex-col md:flex-row justify-between items-center border-b-4 border-[#D4AF37]">
          <div>
            <h1 className="text-xl font-black italic text-[#D4AF37]">HAS INSANDER <span className="text-white">BORSA</span></h1>
            <p className="text-[10px] opacity-60 uppercase tracking-widest">Live Database Engine v4.5</p>
          </div>
          <div className={`px-6 py-2 rounded-2xl border ${dbStatus.includes('HATA') ? 'bg-red-500/20 border-red-500' : 'bg-green-500/20 border-green-500'}`}>
            <p className="text-[10px] font-black uppercase tracking-widest">{dbStatus}</p>
          </div>
        </div>

        {/* BORSA TABLOSU */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h2 className="font-black text-sm uppercase mb-6 border-b pb-4">GERCEK ZAMANLI TICARET AKISI</h2>
          
          {loading ? (
            <div className="text-center py-20 animate-pulse font-black text-blue-600">VERILER SUPABASE'DEN CEKILIYOR...</div>
          ) : trades.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="font-bold italic">Borsa şu an boş görünüyor.</p>
              <p className="text-[10px] mt-2 uppercase">Supabase > Table Editor > 'trades' tablosuna veri ekleyerek baslayin.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-400 uppercase text-[10px] border-b">
                    <th className="pb-3 px-2 text-center">ID</th>
                    <th className="pb-3">TICARET TANIMI</th>
                    <th className="pb-3">HACIM</th>
                    <th className="pb-3 text-right">DURUM</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {trades.map((trade) => (
                    <tr key={trade.id} className="hover:bg-blue-50/50 transition-all">
                      <td className="py-4 px-2 font-mono text-blue-600 font-bold text-center">{trade.id}</td>
                      <td className="py-4 font-bold">{trade.title}</td>
                      <td className="py-4 text-[#D4AF37] font-black">{trade.amount || 'Girilmedi'}</td>
                      <td className="py-4 text-right">
                        <span className="bg-[#1B365D] text-white px-3 py-1 rounded-full text-[9px] font-black uppercase">
                          {trade.status}
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
