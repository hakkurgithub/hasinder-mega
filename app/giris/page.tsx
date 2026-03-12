'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      router.push('/panel');
    } else {
      const data = await res.json();
      setError(data.error || 'Giriş başarısız');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-amber-500 mb-2 text-center">TİB Girişi</h2>
        <p className="text-slate-400 text-center mb-6 text-sm">Hoş Geldiniz</p>
        
        {error && <p className="bg-red-500/10 text-red-400 p-3 rounded mb-4 text-xs text-center border border-red-500/30">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">E-posta</label>
            <input type="email" required className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-500" placeholder="bilgi@hasinsan.org" onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Şifre</label>
            <input type="password" required className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-500" placeholder="••••••••" onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-lg transition-all">Giriş Yap</button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/kayit" className="text-amber-500 text-sm hover:underline font-semibold">Yeni Hesap Oluştur</Link>
        </div>
      </div>
    </div>
  );
}
