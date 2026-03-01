'use client';
import { useState } from 'react';

export default function AdminDashboard() {
  const [members, setMembers] = useState([
    { id: 1, name: "Ahmet Yılmaz", city: "Hatay", trust: 85, status: "Aktif", gsm: "0532...", tax: "123456" },
    { id: 2, name: "Mehmet Demir", city: "İstanbul", trust: 40, status: "Beklemede", gsm: "0544...", tax: "654321" },
  ]);

  return (
    <div className="min-h-screen bg-[#0A192F] p-8 text-white font-sans">
      {/* ÜST PANEL: İSTATİSTİK */}
      <div className="flex justify-between items-end mb-12 border-b-2 border-[#D4AF37] pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter italic uppercase text-[#D4AF37]">ADMİN <span className="text-white">HAREKAT MERKEZİ</span></h1>
          <p className="text-[10px] text-white/40 font-mono tracking-widest mt-1">SİLİCON CAMPUS SECURED NETWORK | 2026 V.1.0</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center min-w-[120px]">
            <p className="text-[9px] uppercase opacity-50">Toplam Üye</p>
            <p className="text-2xl font-black">1,248</p>
          </div>
          <div className="bg-[#D4AF37]/10 p-4 rounded-xl border border-[#D4AF37]/30 text-center min-w-[120px]">
            <p className="text-[9px] uppercase text-[#D4AF37]">Onay Bekleyen</p>
            <p className="text-2xl font-black text-[#D4AF37]">12</p>
          </div>
        </div>
      </div>

      {/* ANA TABLO: ÜYE DENETİMİ */}
      <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-white/10 text-[#D4AF37] uppercase font-black italic">
            <tr>
              <th className="p-5">Üye Bilgisi</th>
              <th className="p-5">Bölge</th>
              <th className="p-5">Güven Puanı</th>
              <th className="p-5">Durum</th>
              <th className="p-5 text-right">Müdahale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-white/5 transition-all">
                <td className="p-5 font-bold">
                  {member.name}
                  <div className="text-[9px] opacity-40 font-mono italic">Vergi No: {member.tax}</div>
                </td>
                <td className="p-5">{member.city}</td>
                <td className="p-5 text-center">
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#D4AF37] h-full" style={{ width: `${member.trust}%` }}></div>
                  </div>
                  <span className="text-[9px] mt-1 block">{member.trust}/100</span>
                </td>
                <td className="p-5">
                  <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${member.status === 'Aktif' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {member.status}
                  </span>
                </td>
                <td className="p-5 text-right space-x-2">
                  <button className="bg-white/10 hover:bg-[#D4AF37] hover:text-[#0A192F] px-3 py-1 rounded transition-all">DÜZENLE</button>
                  <button className="bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition-all">RED</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* KVKK LOG KAYITLARI */}
      <div className="mt-12">
        <h4 className="text-[10px] font-black uppercase text-white/30 tracking-[0.3em] mb-4 italic">Sistem İşlem Logları (KVKK-2026)</h4>
        <div className="bg-black/30 p-4 rounded-xl font-mono text-[9px] text-green-400/70 border border-white/5 space-y-1">
          <p>[01.03.2026 14:55] ADMIN: #1 nolu üye Güven Puanı 85'e güncellendi.</p>
          <p>[01.03.2026 14:52] SYSTEM: Yeni üye başvurusu alındı (#Mehmet Demir).</p>
          <p>[01.03.2026 14:50] SECURITY: AES-256 veritabanı mühürlendi.</p>
        </div>
      </div>
    </div>
  );
}
