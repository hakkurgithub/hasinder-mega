import React from 'react';
import Link from 'next/link';

export default function HasinderMainPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Üst Navigasyon - Dernek Menüsü */}
      <nav className="flex justify-between items-center p-6 bg-[#1B365D] text-white">
        <div className="text-2xl font-black tracking-tighter">HASİNDER</div>
        <div className="hidden md:flex space-x-6 text-xs uppercase font-bold">
          <Link href="/hakkimizda">Dernek</Link>
          <Link href="/haberler">Haberler</Link>
          <Link href="/etkinlikler">Etkinlikler</Link>
          <Link href="/iletisim">İletişim</Link>
        </div>
      </nav>

      {/* TİB Borsa Giriş Alanı (VİTRİN) */}
      <div className="bg-gradient-to-b from-[#1B365D] to-[#0A192F] py-24 px-6 text-center text-white border-b-4 border-[#D4AF37]">
        <h2 className="text-[#D4AF37] text-sm font-bold tracking-[0.3em] uppercase mb-4 animate-pulse">
          Otonom Ticaret Çağı Başladı
        </h2>
        <h1 className="text-5xl md:text-7xl font-black mb-8 italic">
          TİB <span className="text-[#D4AF37]">TİCARET AĞI</span>
        </h1>
        <p className="max-w-2xl mx-auto text-blue-100 text-lg font-light mb-12">
          Hatay'ın gücünü dijital borsayla birleştiriyoruz. Aracıların, satıcıların ve alıcıların otonom güvenli buluşma noktası.
        </p>
        
        <Link href="/giris" className="inline-block bg-[#D4AF37] text-[#0A192F] px-16 py-5 rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(212,175,55,0.4)]">
          BORSAYA GİRİŞ YAP →
        </Link>
        
        <div className="mt-8 text-[10px] text-blue-400 font-mono">
          [ 28.02.2026 KVKK & OTP SECURED SYSTEM ]
        </div>
      </div>

      {/* Dernek Faaliyetleri (Alt Bölüm) */}
      <div className="py-20 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#1B365D] border-b-2 border-gray-100 pb-2">Dernek Haberleri</h3>
          <p className="text-sm text-gray-500">Hasinder’in yeni projeleri ve Hatay için attığı adımlar...</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#1B365D] border-b-2 border-gray-100 pb-2">Etkinlikler</h3>
          <p className="text-sm text-gray-500">Gelecek ay düzenlenecek olan iş dünyası zirvesi detayları...</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#1B365D] border-b-2 border-gray-100 pb-2">İstatistikler</h3>
          <p className="text-sm text-gray-500">TİB Ağı üzerinden gerçekleşen aylık ticaret hacmi verileri...</p>
        </div>
      </div>
    </div>
  );
}
