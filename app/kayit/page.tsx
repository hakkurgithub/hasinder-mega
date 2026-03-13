'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Kayit() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Kayıt başarısız');
      }
      
      setSuccess(true);
      setTimeout(() => router.push('/giris'), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-yellow-500 text-center mb-2">
          TİB Kayıt
        </h1>
        <p className="text-center text-gray-400 mb-6">Ağımıza Katılın</p>

        {error && (
          <div className="bg-red-900/50 text-red-200 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-900/50 text-green-200 p-3 rounded mb-4">
            Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Firma / Ad Soyad</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 bg-gray-700 rounded border border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">E-posta</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 bg-gray-700 rounded border border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Şifre</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-3 bg-gray-700 rounded border border-gray-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-white p-3 rounded font-bold"
          >
            Mührü Oluştur (Kayıt Ol)
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-400">
          Zaten hesabım var?{' '}
          <a href="/giris" className="text-yellow-500 hover:underline">
            Giriş yap
          </a>
        </p>
      </div>
    </main>
  );
}