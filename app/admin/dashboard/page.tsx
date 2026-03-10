'use client';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  taxNo: string;
  sector: string;
  title: string;
  status: string;
  tier: string;
  balance: number;
  createdAt: string;
}

interface Mediation {
  id: string;
  status: string;
  amount: number;
  createdAt: string;
  demand?: { title: string };
  mediator?: { name: string };
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [mediations, setMediations] = useState<Mediation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'mediations'>('users');

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data ?? []);
      }
    } catch (error) {
      console.error('Users fetch error:', error);
      setUsers([]);
    }
  };

  const fetchMediations = async () => {
    try {
      const res = await fetch('/api/admin/mediations');
      if (res.ok) {
        const data = await res.json();
        setMediations(data ?? []);
      }
    } catch (error) {
      console.error('Mediations fetch error:', error);
      setMediations([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchMediations()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleUserAction = async (userId: string, action: 'APPROVE' | 'REJECT') => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action })
      });
      if (res.ok) {
        fetchUsers();
        alert(action === 'APPROVE' ? 'Kullanici onaylandi!' : 'Kullanici reddedildi!');
      }
    } catch (error) {
      alert('Islem basarisiz oldu.');
    }
  };

  const handleMediationApprove = async (mediationId: string) => {
    try {
      const res = await fetch('/api/admin/mediations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediationId })
      });
      if (res.ok) {
        fetchMediations();
        alert('Eslesme onaylandi ve komisyon dagitildi!');
      }
    } catch (error) {
      alert('Islem basarisiz oldu.');
    }
  };

  const pendingUsers = users.filter(u => u.status === 'ONAY_BEKLIYOR');
  const pendingMediations = mediations.filter(m => m.status === 'BEKLEMEDE');

  return (
    <div className="min-h-screen bg-[#0A192F] p-8 text-white font-sans">
      {/* UST PANEL: ISTATISTIK */}
      <div className="flex justify-between items-end mb-12 border-b-2 border-[#D4AF37] pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter italic uppercase text-[#D4AF37]">
            ADMIN <span className="text-white">HAREKAT MERKEZI</span>
          </h1>
          <p className="text-[10px] text-white/40 font-mono tracking-widest mt-1">
            HAS INSAN DER SECURED NETWORK | 2026 V.1.0
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center min-w-[120px]">
            <p className="text-[9px] uppercase opacity-50">Toplam Uye</p>
            <p className="text-2xl font-black">{users.length}</p>
          </div>
          <div className="bg-[#D4AF37]/10 p-4 rounded-xl border border-[#D4AF37]/30 text-center min-w-[120px]">
            <p className="text-[9px] uppercase text-[#D4AF37]">Onay Bekleyen</p>
            <p className="text-2xl font-black text-[#D4AF37]">{pendingUsers.length}</p>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/30 text-center min-w-[120px]">
            <p className="text-[9px] uppercase text-blue-400">Bekleyen Eslesme</p>
            <p className="text-2xl font-black text-blue-400">{pendingMediations.length}</p>
          </div>
        </div>
      </div>

      {/* TAB BUTTONS */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'users' 
              ? 'bg-[#D4AF37] text-[#0A192F]' 
              : 'bg-white/5 text-white hover:bg-white/10'
          }`}
        >
          Uye Yonetimi ({pendingUsers.length} bekleyen)
        </button>
        <button
          onClick={() => setActiveTab('mediations')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'mediations' 
              ? 'bg-[#D4AF37] text-[#0A192F]' 
              : 'bg-white/5 text-white hover:bg-white/10'
          }`}
        >
          Eslesme Onaylari ({pendingMediations.length} bekleyen)
        </button>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-white/60">Veriler yukleniyor...</p>
        </div>
      )}

      {/* USERS TAB */}
      {!loading && activeTab === 'users' && (
        <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-white/10 text-[#D4AF37] uppercase font-black italic">
              <tr>
                <th className="p-5">Uye Bilgisi</th>
                <th className="p-5">Sektor</th>
                <th className="p-5">Unvan</th>
                <th className="p-5">Durum</th>
                <th className="p-5 text-right">Mudahale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.length > 0 ? users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-all">
                  <td className="p-5 font-bold">
                    {user.name}
                    <div className="text-[9px] opacity-40 font-mono italic">Vergi No: {user.taxNo}</div>
                    <div className="text-[9px] opacity-40">{user.email}</div>
                  </td>
                  <td className="p-5">{user.sector}</td>
                  <td className="p-5">{user.title}</td>
                  <td className="p-5">
                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${
                      user.status === 'AKTIF' ? 'bg-green-500/20 text-green-400' : 
                      user.status === 'ONAY_BEKLIYOR' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-5 text-right space-x-2">
                    {user.status === 'ONAY_BEKLIYOR' && (
                      <>
                        <button 
                          onClick={() => handleUserAction(user.id, 'APPROVE')}
                          className="bg-green-500/20 text-green-400 px-3 py-1 rounded hover:bg-green-500 hover:text-white transition-all"
                        >
                          ONAYLA
                        </button>
                        <button 
                          onClick={() => handleUserAction(user.id, 'REJECT')}
                          className="bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition-all"
                        >
                          RED
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/40">
                    Henuz kayitli kullanici bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MEDIATIONS TAB */}
      {!loading && activeTab === 'mediations' && (
        <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-white/10 text-[#D4AF37] uppercase font-black italic">
              <tr>
                <th className="p-5">Talep</th>
                <th className="p-5">Araci</th>
                <th className="p-5">Komisyon</th>
                <th className="p-5">Durum</th>
                <th className="p-5 text-right">Islem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mediations.length > 0 ? mediations.map((mediation) => (
                <tr key={mediation.id} className="hover:bg-white/5 transition-all">
                  <td className="p-5 font-bold">{mediation.demand?.title ?? 'Bilinmiyor'}</td>
                  <td className="p-5">{mediation.mediator?.name ?? 'Bilinmiyor'}</td>
                  <td className="p-5 text-[#D4AF37] font-bold">{mediation.amount?.toFixed(2) ?? '0.00'} TL</td>
                  <td className="p-5">
                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${
                      mediation.status === 'ONAYLANDI' ? 'bg-green-500/20 text-green-400' : 
                      mediation.status === 'BEKLEMEDE' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {mediation.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    {mediation.status === 'BEKLEMEDE' && (
                      <button 
                        onClick={() => handleMediationApprove(mediation.id)}
                        className="bg-[#D4AF37] text-[#0A192F] px-4 py-1 rounded font-bold hover:bg-[#D4AF37]/80 transition-all"
                      >
                        ONAYLA
                      </button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/40">
                    Henuz eslesme bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* KVKK LOG KAYITLARI */}
      <div className="mt-12">
        <h4 className="text-[10px] font-black uppercase text-white/30 tracking-[0.3em] mb-4 italic">
          Sistem Islem Loglari (KVKK-2026)
        </h4>
        <div className="bg-black/30 p-4 rounded-xl font-mono text-[9px] text-green-400/70 border border-white/5 space-y-1">
          <p>[{new Date().toLocaleDateString('tr-TR')}] SYSTEM: Admin paneli acildi.</p>
          <p>[{new Date().toLocaleDateString('tr-TR')}] SECURITY: AES-256 veritabani muhürlendi.</p>
          <p>[{new Date().toLocaleDateString('tr-TR')}] INFO: Toplam {users.length} kullanici, {mediations.length} eslesme kayitli.</p>
        </div>
      </div>
    </div>
  );
}
