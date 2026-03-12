'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/giris');
      } else {
        setError(data.error || 'Bir hata oluştu');
      }
    } catch (err) {
      setError('Bağlantı hatası oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-amber-500 text-center mb-6">TİB Kayıt Merkezi</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded mb-4 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">İsim veya Firma</label>
            <input 
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-500" 
              type="text" required onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">E-posta</label>
            <input 
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-500" 
              type="email" required onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Şifre</label>
            <input 
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white outline-none focus:border-amber-500" 
              type="password" required onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? 'Mühürleniyor...' : 'Ağa Katıl'}
          </button>
        </form>
        <p className="mt-6 text-center text-slate-500 text-sm">
          Zaten üye misiniz? <Link href="/giris" className="text-amber-500 hover:underline">Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
}
