'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUP_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scxwhchnuhsuzkfvqmqw.supabase.co';
const SUP_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjeHdoY2hudWhzdXprZnZxbXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDM2OTQsImV4cCI6MjA4NzU3OTY5NH0.C_5GC8Eg9JFZuvtjJHKRYcbnVWSBgJ22ySC7Iti3a8w';
const supabase = createClient(SUP_URL, SUP_KEY);

export default function MemberPanel() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('borsa');
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
    <div className="min-h-screen bg-[#F0F2F5] text-[#1B365D] font-sans">
      <div className="flex">
        <aside className="w-64 bg-[#1B365D] min-h-screen p-6 text-white hidden lg:block shadow-2xl">
          <h1 className="text-xl font-black italic text-[#D4AF37] mb-10">TIB AG V6.1</h1>
          <nav className="space-y-4">
            <button onClick={() => setActiveTab('borsa')} className={`w-full text-left p-3 rounded-xl transition-all ${activeTab === 'borsa' ? 'bg-[#D4AF37] text-[#1B365D] font-bold' : 'hover:bg-white/10'}`}>Live Borsa</button>
            <button onClick={() => setActiveTab('islemler')} className={`w-full text-left p-3 rounded-xl transition-all ${activeTab === 'islemler' ? 'bg-[#D4AF37] text-[#1B365D] font-bold' : 'hover:bg-white/10'}`}>Transactions</button>
            <button className="w-full text-left p-3 rounded-xl hover:bg-white/10">Profile</button>
          </nav>
        </aside>

        <main className="flex-1 p-4 lg:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-blue-500">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Active Ads</p>
              <h3 className="text-2xl font-black">{trades.length}</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-green-500">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Completed</p>
              <h3 className="text-2xl font-black">12</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border-b-4 border-[#D4AF37]">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Net Profit</p>
              <h3 className="text-2xl font-black text-green-600">453k TL</h3>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#1B365D] text-[#D4AF37] rounded-3xl font-black shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
              <span className="text-2xl">+</span> NEW LISTING
            </button>
          </div>

          <section className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-black uppercase tracking-tighter">Trade Operation Center</h2>
            </div>
            <div className="p-4 overflow-x-auto">
              {loading ? (
                <p className="text-center py-20 font-bold">Syncing Data...</p>
              ) : (
                <table className="w-full text-left">
                  <thead className="text-[10px] uppercase text-gray-400 border-b">
                    <tr>
                      <th className="p-4">Category</th>
                      <th>Details</th>
                      <th>Volume</th>
                      <th className="text-right p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {trades.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50 group transition-all">
                        <td className="p-4">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[9px] font-black">{t.category || 'GIDA'}</span>
                        </td>
                        <td>
                          <p className="font-black text-sm uppercase">{t.title}</p>
                          <p className="text-[10px] opacity-50">{t.detail}</p>
                        </td>
                        <td className="font-black text-green-700">{t.amount}</td>
                        <td className="p-4 text-right">
                          <button className="bg-gray-100 group-hover:bg-[#1B365D] group-hover:text-white px-4 py-2 rounded-xl text-[10px] font-bold">VIEW</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1B365D]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl border-t-[12px] border-[#D4AF37]">
            <h2 className="text-2xl font-black italic mb-8 uppercase text-[#1B365D]">Create Trade</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Title" className="p-4 bg-gray-50 rounded-2xl w-full font-bold" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                <select className="p-4 bg-gray-50 rounded-2xl w-full font-bold" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option>GIDA</option><option>LOJISTIK</option><option>INSAAT</option><option>TEKSTIL</option>
                </select>
              </div>
              <input placeholder="Amount (e.g. 250.000 TL)" className="p-4 bg-gray-50 rounded-2xl w-full font-bold" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} required />
              <textarea placeholder="Terms and details" className="p-4 bg-gray-50 rounded-2xl w-full h-32 font-bold" value={formData.detail} onChange={(e) => setFormData({...formData, detail: e.target.value})} />
              <div className="flex justify-end gap-4 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="font-bold text-gray-400">CANCEL</button>
                <button type="submit" className="bg-[#1B365D] text-[#D4AF37] px-10 py-4 rounded-2xl font-black shadow-lg">START TRADE</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
