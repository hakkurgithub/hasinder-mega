'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Vercel uzerindeki anahtarlari oncelikle dene, yoksa manuel anahtari kullan
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scxwhchnuhsuzkfvqmqw.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function MemberDashboard() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('Sistem Baslatiliyor...');

  useEffect(() => {
    async function fetchTrades() {
      try {
        const { data, error } = await supabase.from('trades').select('*');
        if (error) throw error;
        setTrades(data || []);
        setStatusMsg(data && data.length > 0 ? 'Veri Akisi Aktif' : 'Tablo Bos: Veri Bekleniyor');
      } catch (err) {
        setStatusMsg('Baglanti Hatasi: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTrades();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 text-[#1B365D]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="bg-[#1B365D] p-6 rounded-[2rem] text-white shadow-xl flex justify-between items-center border-b-4 border-[#D4AF37]">
          <div>
            <h1 className="text-xl font-black italic text-[#D4AF37]">HAS INSANDER <span className="text-white">BORSA</span></h1>
            <p className="text-[10px] opacity-60 uppercase tracking-widest">Supabase Force Connect v4.5</p>
          </div>
          <div className="bg-green-500/20 px-4 py-1 rounded-full text-[10px] font-black border border-green-500/30">
            {statusMsg.toUpperCase()}
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h2 className="font-black text-xs uppercase mb-4 text-gray-500">CANLI TICARET LISTESI</h2>
          {loading ? (
            <p className="text-center py-10 animate-pulse font-bold">TIB Agindan Veriler Cekiliyor...</p>
          ) : trades.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-gray-400 italic font-bold">Veritabaninda henüz aktif ilan bulunmuyor.</p>
              <p className="text-[8px] text-blue-400 font-mono bg-blue-50 p-2 rounded">DURUM: {statusMsg}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[10px] text-gray-400 border-b">
                    <th className="pb-3 px-2">ID</th>
                    <th className="pb-3">TANIM</th>
                    <th className="pb-3">HACIM</th>
                    <th className="pb-3 text-right">DURUM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {trades.map((t) => (
                    <tr key={t.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-4 px-2 font-mono text-blue-600 font-bold">{t.id}</td>
                      <td className="py-4 font-bold">{t.title}</td>
                      <td className="py-4 text-[#D4AF37] font-black">{t.amount || 'Giris Yapilmadi'}</td>
                      <td className="py-4 text-right">
                        <span className="bg-[#1B365D] text-white px-3 py-1 rounded-full text-[9px] font-black uppercase">
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
