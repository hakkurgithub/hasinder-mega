'use client';
import React, { useState, useEffect } from 'react';
import { PlusCircle, BarChart3, ClipboardList, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Demand {
  id: string;
  title: string;
  description: string | null;
  status: string;
  createdAt: string;
  Mediations?: { id: string; status: string; amount: number }[];
}

export default function Panel() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  const getDemands = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/demands');
      if (!res.ok) throw new Error('Veriler alinamadi');
      const data = await res.json();
      setDemands(data ?? []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Bir hata olustu');
      setDemands([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getDemands(); }, []);

  const addDemand = async () => {
    if (!newTitle.trim()) {
      alert('Talep basligi zorunludur');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/demands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: newTitle,
          description: newDescription || null
        })
      });
      
      if (!res.ok) throw new Error('Talep olusturulamadi');
      
      alert('Talep basariyla eklendi!');
      setNewTitle('');
      setNewDescription('');
      setShowForm(false);
      getDemands();
    } catch (err: any) {
      alert('Hata: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'BEKLEMEDE': return 'text-yellow-400 bg-yellow-500/20';
      case 'AKTIF': return 'text-green-400 bg-green-500/20';
      case 'ESLESTI': return 'text-blue-400 bg-blue-500/20';
      case 'TAMAMLANDI': return 'text-emerald-400 bg-emerald-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0b1220] font-sans p-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#1B365D] dark:text-white">HAS INSAN DER - Kesfet</h1>
        <div className="flex gap-3">
          <button 
            onClick={getDemands} 
            disabled={loading} 
            className="flex items-center gap-2 bg-white/10 border border-[#D4AF37] text-[#D4AF37] px-4 py-3 rounded-xl font-semibold hover:bg-[#D4AF37]/10 transition-all"
          >
            <RefreshCw className={loading ? 'animate-spin' : ''} size={18} />
          </button>
          <button 
            onClick={() => setShowForm(!showForm)} 
            disabled={loading} 
            className="flex items-center gap-2 bg-[#1B365D] text-[#D4AF37] px-6 py-3 rounded-xl font-semibold hover:bg-[#1B365D]/80 transition-all"
          >
            <PlusCircle size={18} /> Yeni Talep
          </button>
        </div>
      </header>

      {/* New Demand Form */}
      {showForm && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow mb-10"
        >
          <h3 className="text-lg font-bold text-[#1B365D] dark:text-white mb-4">Yeni Talep Olustur</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Talep Basligi *"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="p-3 border rounded-lg bg-white dark:bg-[#1B365D] dark:text-white dark:border-white/20"
            />
            <input
              type="text"
              placeholder="Aciklama (Opsiyonel)"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="p-3 border rounded-lg bg-white dark:bg-[#1B365D] dark:text-white dark:border-white/20"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button 
              onClick={addDemand}
              disabled={loading}
              className="bg-[#D4AF37] text-[#1B365D] px-6 py-2 rounded-lg font-semibold hover:bg-[#D4AF37]/80 transition-all"
            >
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button 
              onClick={() => setShowForm(false)}
              className="bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-white/20 transition-all"
            >
              Iptal
            </button>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* KPI Panel */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow flex items-center gap-4">
          <BarChart3 className="text-[#D4AF37]" />
          <div>
            <p className="text-gray-500 dark:text-gray-300">Toplam Talep</p>
            <h2 className="text-xl font-bold dark:text-white">{demands.length}</h2>
          </div>
        </div>
        <div className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow flex items-center gap-4">
          <ClipboardList className="text-[#D4AF37]" />
          <div>
            <p className="text-gray-500 dark:text-gray-300">Bekleyen</p>
            <h2 className="text-xl font-bold dark:text-white">{demands.filter(d => d.status === 'BEKLEMEDE').length}</h2>
          </div>
        </div>
        <div className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow flex items-center gap-4">
          <BarChart3 className="text-[#D4AF37]" />
          <div>
            <p className="text-gray-500 dark:text-gray-300">Eslesmis</p>
            <h2 className="text-xl font-bold dark:text-white">{demands.filter(d => d.status === 'ESLESTI' || d.status === 'TAMAMLANDI').length}</h2>
          </div>
        </div>
      </motion.div>

      {/* Demands Table */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#243B6B] p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-4 text-[#1B365D] dark:text-[#D4AF37]">Talep Listesi</h2>
        
        {loading && demands.length === 0 ? (
          <p className="text-center py-8 text-gray-500 dark:text-gray-400">Veriler yukleniyor...</p>
        ) : demands.length === 0 ? (
          <p className="text-center py-8 text-gray-500 dark:text-gray-400">Henuz talep bulunmuyor.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b dark:border-white/10">
                <th className="py-3 text-[#1B365D] dark:text-white">Baslik</th>
                <th className="py-3 text-[#1B365D] dark:text-white">Aciklama</th>
                <th className="py-3 text-[#1B365D] dark:text-white">Durum</th>
                <th className="py-3 text-[#1B365D] dark:text-white">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {demands.map(demand => (
                <tr key={demand.id} className="border-b dark:border-white/5 hover:bg-gray-50 dark:hover:bg-[#1B365D]/30">
                  <td className="py-3 font-medium dark:text-white">{demand.title}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">{demand.description || '-'}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(demand.status)}`}>
                      {demand.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(demand.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}
