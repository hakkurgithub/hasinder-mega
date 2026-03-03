'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const S_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scxwhchnuhsuzkfvqmqw.supabase.co';
const S_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';
const supabase = createClient(S_URL, S_KEY);

export default function MemberDashboard() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', amount: '', category: 'GIDA', detail: '' });

  const fetchBorsa = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('trades').select('*').order('created_at', { ascending: false });
    if (!error) setTrades(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchBorsa(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('trades').insert([{ ...formData, status: 'AKTIF' }]);
    if (!error) {
      setFormData({ title: '', amount: '', category: 'GIDA', detail: '' });
      setIsModalOpen(false);
      fetchBorsa();
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#1B365D]">
      {/* Chrome Translation Blocker */}
      <meta name="google" content="notranslate" />
      
      <div className="flex">
        <aside className="w-64 bg-[#1B365D] min-h-screen p-6 text-white hidden lg:block">
          <h1 className="text-xl font-black text-[#D4AF37] mb-10">TIB ADMIN</h1>
          <nav className="space-y-4 font-bold">
            <div className="p-3 bg-white/10 rounded-xl">Borsa Live</div>
            <div className="p-3 opacity-50">Transactions</div>
            <div className="p-3 opacity-50">Profile</div>
          </nav>
        </aside>

        <main className="flex-1 p-4 lg:p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-blue-500">
              <p className="text-[10px] text-gray-400 font-bold">ACTIVE ADS</p>
              <h3 className="text-2xl font-black">{trades.length}</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-green-500">
              <p className="text-[10px] text-gray-400 font-bold">REVENUE</p>
              <h3 className="text-2xl font-black">453k TL</h3>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#1B365D] text-[#D4AF37] rounded-3xl font-black shadow-xl hover:scale-105 transition-all">
              + START NEW TRADE
            </button>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden">
            <div className="p-8 border-b font-black uppercase">Operation Board</div>
            <div className="p-4 overflow-x-auto">
              {loading ? (
                <p className="text-center py-20 font-bold">Loading Data...</p>
              ) : (
                <table className="w-full text-left">
                  <thead className="text-[10px] text-gray-400 border-b">
                    <tr><th className="p-4">Category</th><th>Detail</th><th>Volume</th><th>Status</th></tr>
                  </thead>
                  <tbody className="divide-y">
                    {trades.map((t) => (
                      <tr key={t.id} className="text-sm font-bold">
                        <td className="p-4"><span className="bg-blue-100 px-3 py-1 rounded-full text-[9px]">{t.category || 'GIDA'}</span></td>
                        <td>{t.title}</td>
                        <td className="text-green-700">{t.amount}</td>
                        <td className="p-4"><span className="text-[10px] uppercase">{t.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1B365D]/90 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl">
            <h2 className="text-xl font-black mb-6 uppercase">New Trade Form</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input placeholder="Item Title" className="p-4 bg-gray-50 rounded-xl w-full" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
              <input placeholder="Price / Amount" className="p-4 bg-gray-50 rounded-xl w-full" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} required />
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="font-bold text-gray-400">CLOSE</button>
                <button type="submit" className="bg-[#1B365D] text-[#D4AF37] px-8 py-3 rounded-xl font-black">CONFIRM</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
