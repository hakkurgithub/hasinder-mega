'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PlusCircle, BarChart3, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';

// Environment değişkenlerini kullan
const S_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const S_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const sb = createClient(S_URL, S_KEY);

export default function Panel() {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getTrades = async () => {
    const { data, error } = await sb
      .from('trades')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Veri çekme hatası:', error.message);
    }
    if (data) setTrades(data);
  };

  useEffect(() => {
    getTrades();
  }, []);

  const addTrade = async () => {
    setLoading(true);
    const { error } = await sb.from('trades').insert([
      { category: 'Gıda', title: 'Yeni İlan', amount: '100 Ton', status: 'AKTIF' }
    ]);
    if (error) {
      alert('İlan eklenirken hata oluştu: ' + error.message);
    } else {
      alert('İlan başarıyla eklendi!');
      getTrades();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1B365D] font-sans p-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#1B365D] dark:text-white">
          TIB HUB Operational Center
        </h1>
        <button
          onClick={addTrade}
          disabled={loading}
          className="flex items-center gap-2 bg-[#1B365D] text-[#D4AF37] px-6 py-3 rounded-xl font-semibold hover:opacity-80 transition"
        >
          <PlusCircle /> {loading ? 'İşlemde...' : 'Yeni İlan / New Trade'}
        </button>
      </header>

      {/* KPI Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
      >
        <div className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow flex items-center gap-4">
          <BarChart3 className="text-[#D4AF37]" />
          <div>
            <p className="text-gray-500 dark:text-gray-300">Toplam İcraat</p>
            <h2 className="text-xl font-bold">{trades.length}</h2>
          </div>
        </div>
        <div className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow flex items-center gap-4">
          <ClipboardList className="text-[#D4AF37]" />
          <div>
            <p className="text-gray-500 dark:text-gray-300">Aktif Eşleşme</p>
            <h2 className="text-xl font-bold">
              {trades.filter(t => t.status === 'AKTIF').length}
            </h2>
          </div>
        </div>
        <div className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow flex items-center gap-4">
          <BarChart3 className="text-[#D4AF37]" />
          <div>
            <p className="text-gray-500 dark:text-gray-300">Tahmini Kar</p>
            <h2 className="text-xl font-bold">₺ {trades.length * 1000000}</h2>
          </div>
        </div>
      </motion.div>

      {/* Trade Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow"
      >
        <h2 className="text-2xl font-semibold mb-4 text-[#1B365D] dark:text-[#D4AF37]">
          Borsa Akışı
        </h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Kategori</th>
              <th className="py-2">Başlık</th>
              <th className="py-2">Miktar</th>
              <th className="py-2">Durum</th>
            </tr>
          </thead>
          <tbody>
            {trades.map(trade => (
              <tr
                key={trade.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-[#1B365D]/30"
              >
                <td className="py-2">{trade.category}</td>
                <td className="py-2">{trade.title}</td>
                <td className="py-2">{trade.amount}</td>
                <td className="py-2">{trade.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
