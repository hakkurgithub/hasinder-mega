'use client';
import React, { useState, useEffect } from 'react';

interface Demand {
  id: string;
  title: string;
  description: string | null;
  status: string;
  createdAt: string;
  Mediations?: { id: string; status: string; amount: number }[];
}

export default function DashboardPage() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDemands = async () => {
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

  useEffect(() => {
    fetchDemands();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'BEKLEMEDE': return 'bg-yellow-500/20 text-yellow-400';
      case 'ESLESTI': return 'bg-blue-500/20 text-blue-400';
      case 'TAMAMLANDI': return 'bg-green-500/20 text-green-400';
      case 'IPTAL': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] p-8 text-white font-sans">
      {/* Header */}
      <div className="flex justify-between items-end mb-12 border-b-2 border-[#D4AF37] pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter italic uppercase text-[#D4AF37]">
            HAS INSAN DER <span className="text-white">DASHBOARD</span>
          </h1>
          <p className="text-[10px] text-white/40 font-mono tracking-widest mt-1">
            TIB ARI SISTEMI | 2026 V.1.0
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center min-w-[120px]">
            <p className="text-[9px] uppercase opacity-50">Toplam Talep</p>
            <p className="text-2xl font-black">{demands.length}</p>
          </div>
          <div className="bg-[#D4AF37]/10 p-4 rounded-xl border border-[#D4AF37]/30 text-center min-w-[120px]">
            <p className="text-[9px] uppercase text-[#D4AF37]">Bekleyen</p>
            <p className="text-2xl font-black text-[#D4AF37]">
              {demands.filter(d => d.status === 'BEKLEMEDE').length}
            </p>
          </div>
        </div>
      </div>

      {/* Loading / Error States */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-white/60">Veriler yukleniyor...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Demands Table */}
      {!loading && !error && (
        <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-white/10 text-[#D4AF37] uppercase font-black italic">
              <tr>
                <th className="p-5">Talep Basligi</th>
                <th className="p-5">Aciklama</th>
                <th className="p-5">Durum</th>
                <th className="p-5">Eslesme</th>
                <th className="p-5">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {demands.length > 0 ? (
                demands.map((demand) => (
                  <tr key={demand.id} className="hover:bg-white/5 transition-all">
                    <td className="p-5 font-bold">{demand.title}</td>
                    <td className="p-5 text-white/60">
                      {demand.description || '-'}
                    </td>
                    <td className="p-5">
                      <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${getStatusColor(demand.status)}`}>
                        {demand.status}
                      </span>
                    </td>
                    <td className="p-5">
                      {demand.Mediations && demand.Mediations.length > 0 ? (
                        <span className="text-green-400 text-[9px]">
                          {demand.Mediations.length} eslesme
                        </span>
                      ) : (
                        <span className="text-white/40 text-[9px]">Yok</span>
                      )}
                    </td>
                    <td className="p-5 text-white/40 text-[9px]">
                      {new Date(demand.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/40">
                    Henuz talep bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Refresh Button */}
      <div className="mt-8 text-center">
        <button
          onClick={fetchDemands}
          className="bg-[#D4AF37] text-[#0A192F] px-6 py-2 rounded-lg font-bold hover:bg-[#D4AF37]/80 transition-all"
        >
          Yenile
        </button>
      </div>
    </div>
  );
}
