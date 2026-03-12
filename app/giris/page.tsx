'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      router.push('/panel');
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-amber-500 mb-6 text-center">TİB Girişi</h2>
        {error && <p className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">{error}</p>}
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="E-posta"
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:border-amber-500 outline-none"
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Şifre"
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:border-amber-500 outline-none"
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
          <button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-amber-900/20">
            Mührü Aç (Giriş Yap)
          </button>
        </div>
      </form>
    </div>
  );
}
