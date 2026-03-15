'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

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
    return <header className="h-16 bg-[#1B365D]" />;
  }

  return (
    <header className="h-16 bg-[#1B365D] border-b border-[#D4AF37]/20 px-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-[#D4AF37]">
        HASINDER
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user.name || user.email}</p>
              <p className="text-xs text-[#D4AF37]">{user.isAdmin ? 'Admin' : 'Uye'}</p>
            </div>
            
            {user.isAdmin && (
              <Link href="/admin" className="px-3 py-1 bg-[#D4AF37] text-[#1B365D] text-sm font-bold rounded">
                Admin
              </Link>
            )}
            
            <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-400">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/giris" className="px-4 py-2 text-[#D4AF37]">Giris Yap</Link>
            <Link href="/kayit" className="px-4 py-2 bg-[#D4AF37] text-[#1B365D] rounded font-medium">
              Uye Ol
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
