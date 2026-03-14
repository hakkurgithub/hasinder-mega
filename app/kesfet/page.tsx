import Link from 'next/link';
'use client';
import React, { useState, useEffect } from 'react';
import { PlusCircle, BarChart3, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';

interface Demand {
  id: string;
  title: string;
  amount: number;
  status: string;
  category: string;
  createdAt: string;
}

export default function Panel() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(false);

  const getDemands = async () => {
    try {
      const res = await fetch('/api/demands');
      const data = await res.json();
      setDemands(data);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    }
  };

  useEffect(() => { getDemands(); }, []);

  const addDemand = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/demands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Yeni İlan',
          amount: 100000,
          status: 'AKTIF',
          category: 'Gıda'
        })
      });
      if (res.ok) {
        alert('İlan başarıyla eklendi!');
        getDemands();
      }
    } catch (error) {
      console.error('Ekleme hatası:', error);
    }
    setLoading(false);
  };

  const totalProfit = demands.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0b1220] font-sans p-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#1B365D] dark:text-white">TIB HUB Operational Center</h1>
        <Link href="/dashboard"><button className="flex items-center gap-2 bg-[#1B365D] text-[#D4AF37] px-6 py-3 rounded-xl font-semibold">
          <PlusCircle /> {loading ? 'İşlemde...' : 'Yeni İlan / New Trade'}
        </button></Link>
      </header>

      {/* KPI Panel */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow flex items-center gap-4">
          <BarChart3 className="text-[#D4AF37]" />
          <div><p className="text-gray-500 dark:text-gray-300">Toplam İcraat</p><h2 className="text-xl font-bold">{demands.length}</h2></div>
        </div>
        <div className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow flex items-center gap-4">
          <ClipboardList className="text-[#D4AF37]" />
          <div><p className="text-gray-500 dark:text-gray-300">Aktif Eşleşme</p><h2 className="text-xl font-bold">{demands.filter(d => d.status === 'AKTIF').length}</h2></div>
        </div>
        <div className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow flex items-center gap-4">
          <BarChart3 className="text-[#D4AF37]" />
          <div><p className="text-gray-500 dark:text-gray-300">Tahmini Kar</p><h2 className="text-xl font-bold">₺ {totalProfit.toLocaleString()}</h2></div>
        </div>
      </motion.div>

      {/* Demand Table */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4 text-[#1B365D] dark:text-[#D4AF37]">Borsa Akışı</h2>
        <table className="w-full text-left">
          <thead><tr className="border-b"><th className="py-2">Kategori</th><th className="py-2">Başlık</th><th className="py-2">Miktar</th><th className="py-2">Durum</th></tr></thead>
          <tbody>
            {demands.map(demand => (
              <tr key={demand.id} className="border-b hover:bg-gray-50 dark:hover:bg-[#1B365D]/30">
                <td className="py-2">{demand.category}</td>
                <td className="py-2">{demand.title}</td>
                <td className="py-2">{demand.amount} TL</td>
                <td className="py-2">{demand.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
