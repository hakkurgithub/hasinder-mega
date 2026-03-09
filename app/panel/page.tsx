'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  sector: string;
  balance: number;
  role: string;
  isAdmin: boolean;
}

export default function PanelPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('tib_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = '/giris';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('tib_user');
    window.location.href = '/giris';
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Yukleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#1B365D] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">TIB Agi - Kullanici Paneli</h1>
            <p className="text-sm text-blue-200">Hosgeldin, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm bg-[#D4AF37] px-3 py-1 rounded-full font-bold">
              Bakiye: {user.balance?.toFixed(2) || '0.00'} TL
            </span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-bold transition-colors"
            >
              Cikis Yap
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-[#1B365D] mb-4">Hesap Bilgileri</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Ad Soyad / Firma</p>
              <p className="font-bold text-gray-900">{user.name}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">E-posta</p>
              <p className="font-bold text-gray-900">{user.email}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase">Sektor</p>
              <p className="font-bold text-gray-900">{user.sector || 'Belirtilmemis'}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/talep-olustur" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-[#D4AF37]">
            <h3 className="font-bold text-[#1B365D] mb-2">Yeni Talep Olustur</h3>
            <p className="text-sm text-gray-600">Urun veya hizmet talebi acin</p>
          </Link>
          
          <Link href="/talepler" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500">
            <h3 className="font-bold text-[#1B365D] mb-2">Acik Talepler</h3>
            <p className="text-sm text-gray-600">Platformdaki talepleri goruntuleyinnce</p>
          </Link>
          
          <Link href="/borsa" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500">
            <h3 className="font-bold text-[#1B365D] mb-2">TIB Borsa</h3>
            <p className="text-sm text-gray-600">Ticaret islemleriniz</p>
          </Link>
          
          <Link href="/profil" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-500">
            <h3 className="font-bold text-[#1B365D] mb-2">Profil Ayarlari</h3>
            <p className="text-sm text-gray-600">Hesap bilgilerinizi guncelleyin</p>
          </Link>
        </div>

        {/* Status Card */}
        <div className="mt-8 bg-gradient-to-r from-[#1B365D] to-[#2d4a7c] rounded-xl shadow-lg p-6 text-white">
          <h3 className="font-bold text-[#D4AF37] mb-2">Hesap Durumu</h3>
          <p className="text-sm text-blue-200">
            Hesabiniz aktif ve tum islemler icin hazir. Herhangi bir sorunuz varsa destek ekibimizle iletisime gecebilirsiniz.
          </p>
        </div>
      </main>
    </div>
  );
}
