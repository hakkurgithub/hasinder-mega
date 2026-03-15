'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, LogOut, Settings } from 'lucide-react';

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/verify')
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.refresh();
    window.location.href = '/';
  };

  if (loading) {
    return <header className="h-16 bg-[#1B365D] animate-pulse" />;
  }

  return (
    <header className="h-16 bg-[#1B365D] border-b border-[#D4AF37]/20 px-4 md:px-8 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-xl font-bold text-[#D4AF37]">HASINDER</span>
      </Link>

      <nav className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-gray-300 hover:text-[#D4AF37]">Ana Sayfa</Link>
        <Link href="/kesfet" className="text-gray-300 hover:text-[#D4AF37]">Keşfet</Link>
        <Link href="/haberler" className="text-gray-300 hover:text-[#D4AF37]">Haberler</Link>
      </nav>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{user.name || user.email}</p>
              <p className="text-xs text-[#D4AF37]">{user.isAdmin ? '��� Admin' : 'Üye'}</p>
            </div>
            
            {user.isAdmin && (
              <Link 
                href="/admin" 
                className="px-3 py-1.5 bg-[#D4AF37] text-[#1B365D] text-sm font-bold rounded hover:bg-[#D4AF37]/90"
              >
                Admin Panel
              </Link>
            )}
            
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="Çıkış Yap"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link 
              href="/giris" 
              className="px-4 py-2 text-[#D4AF37] hover:text-white transition-colors"
            >
              Giriş Yap
            </Link>
            <Link 
              href="/kayit" 
              className="px-4 py-2 bg-[#D4AF37] text-[#1B365D] rounded font-medium hover:bg-[#D4AF37]/90"
            >
              Üye Ol
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
