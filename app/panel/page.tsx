'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Vercel ENV degiskenlerini dene, yoksa manuel yedek anahtari kullan
const SUP_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scxwhchnuhsuzkfvqmqw.supabase.co';
const SUP_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';

const supabase = createClient(SUP_URL, SUP_KEY);

export default function MemberDashboard() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState('Checking Connection...');

  useEffect(() => {
    async function fetchBorsa() {
      try {
        const { data, error } = await supabase.from('trades').select('*');
        if (error) throw error;
        setTrades(data || []);
        setDbStatus(data && data.length > 0 ? 'DATABASE LIVE' : 'TABLE EMPTY');
      } catch (err) {
        setDbStatus('ERROR: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBorsa();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 text-[#1B365D]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="bg-[#1B365D] p-6 rounded-[2rem] text-white shadow-xl flex justify-between items-center border-b-4 border-[#D4AF37]">
          <div>
            <h1 className="text-xl font-black italic text-[#D4AF37]">HAS INSANDER <span className="text-white">BORSA</span></h1>
            <p className="text-[10px] opacity-60 uppercase tracking-widest">Supabase Node v4.6</p>
          </div>
          <div className="bg-green-500/20 px-4 py-1 rounded-full text-[10px] font-black border border-green-500/30">
            {dbStatus}
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <h2 className="font-black text-xs uppercase mb-4 text-gray-400">AKTIF TICARET LISTESI</h2>
          {loading ? (
            <p className="text-center py-20 animate-pulse font-bold uppercase">Veri Cekiliyor...</p>
          ) : trades.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 italic font-bold">Veritabaninda henuz aktif ilan bulunmuyor.</p>
              <p className="text-[9px] mt-2 text-blue-500 uppercase">Supabase Table Editor uzerinden veri ekleyiniz.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[10px] text-gray-400 border-b">
                    <th className="pb-3 px-2">ID</th>
                    <th className="pb-3">TICARET TANIMI</th>
                    <th className="pb-3">HACIM</th>
                    <th className="pb-3 text-right">DURUM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {trades.map((t) => (
                    <tr key={t.id} className="hover:bg-blue-50/50">
                      <td className="py-4 px-2 font-mono text-blue-600 font-bold">{t.id}</td>
                      <td className="py-4 font-bold">{t.title}</td>
                      <td className="py-4 text-[#D4AF37] font-black">{t.amount || '0 TL'}</td>
                      <td className="py-4 text-right font-black uppercase text-[9px]">
                        {t.status}
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
