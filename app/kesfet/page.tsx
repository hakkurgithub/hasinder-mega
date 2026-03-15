'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { PlusCircle, BarChart3, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Kesfet() {
  const [demands, setDemands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/demands')
      .then(res => res.json())
      .then(data => {
        setDemands(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0b1220] font-sans p-10">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#1B365D] dark:text-white">TIB HUB Operational Center</h1>
        <Link href="/panel">
          <button className="flex items-center gap-2 bg-[#1B365D] text-[#D4AF37] px-6 py-3 rounded-xl font-semibold">
            <PlusCircle /> Yeni İlan / New Trade
          </button>
        </Link>
      </header>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow flex items-center gap-4">
          <BarChart3 className="text-[#D4AF37]" />
          <div><p className="text-gray-500 dark:text-gray-300">Toplam İcraat</p><h2 className="text-xl font-bold">{demands.length}</h2></div>
        </div>
        <div className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow flex items-center gap-4">
          <ClipboardList className="text-[#D4AF37]" />
          <div><p className="text-gray-500 dark:text-gray-300">Aktif Eşleşme</p><h2 className="text-xl font-bold">{demands.filter(d => d.status === 'AKTIF').length}</h2></div>
        </div>
      </motion.div>

      <div className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4 text-[#D4AF37]">Borsa Akışı</h2>
        {demands.map(d => (
          <div key={d.id} className="flex justify-between p-4 border-b border-gray-700">
            <span>{d.title}</span>
            <span className="text-[#D4AF37]">{d.amount} TL</span>
          </div>
        ))}
      </div>
    </div>
  );
}
