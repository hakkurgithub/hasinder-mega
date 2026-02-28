import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A192F] text-white flex flex-col items-center justify-center p-4">
      {/* Karanlık Fabrika Glow Efekti */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-pulse"></div>
      
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic">
          TİB <span className="text-[#D4AF37]">AĞI</span>
        </h1>
        <p className="text-xl text-blue-200 font-light tracking-widest uppercase">
          Dijital Ticaret Borsası & Otonom Aracı Platformu
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm py-8">
          <div className="border border-blue-900 p-4 rounded-xl bg-blue-950/50">
            <p className="text-[#D4AF37] font-bold">7/24 OTONOM</p>
            <p className="text-gray-400">Kendi Kendini Onaran Sistem</p>
          </div>
          <div className="border border-blue-900 p-4 rounded-xl bg-blue-950/50">
            <p className="text-[#D4AF37] font-bold">KVKK 2026 UYUMLU</p>
            <p className="text-gray-400">OTP ve QR Doğrulama</p>
          </div>
          <div className="border border-blue-900 p-4 rounded-xl bg-blue-950/50">
            <p className="text-[#D4AF37] font-bold">DİJİTAL NOTER</p>
            <p className="text-gray-400">Anlık PDF Sözleşme Üretimi</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href="/panel" className="bg-[#D4AF37] text-[#0A192F] px-12 py-4 rounded-full font-black text-lg hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            SİSTEME GİRİŞ YAP
          </Link>
          <Link href="/yasal" className="text-blue-300 underline text-sm hover:text-white">
            Yasal Mevzuat ve KVKK Aydınlatma
          </Link>
        </div>
      </div>

      <footer className="mt-20 text-[10px] text-blue-800 font-mono">
        SYSTEM STATUS: ONLINE | SECURITY: AES-256 | REGULATION: 28.02.2026 COMPLIANT
      </footer>
    </div>
  );
}
