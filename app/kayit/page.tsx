'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(true);
        // Başkanım, kullanıcıyı boşluğa değil, doğruca giriş kapısına mühürlüyoruz
        setTimeout(() => {
          router.push('/giris');
        }, 1500);
      } else {
        setError(data.error || 'Kayıt sırasında bir pürüz çıktı.');
      }
    } catch (err) {
      setError('Sistem bağlantısında bir hata oluştu.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold text-amber-500 mb-2 text-center italic">HAS İNSAN DER</h2>
        <p className="text-slate-300 text-center mb-6 text-sm font-semibold">TİB Ağı Kayıt Merkezi</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded mb-4 text-xs text-center">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded mb-4 text-xs text-center">
            Mührünüz basıldı! Giriş sayfasına aktarılıyorsunuz...
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-500/80 mb-1">Firma / Ad Soyad</label>
            <input 
              type="text" 
              required
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white focus:border-amber-500 outline-none transition-all"
              placeholder="Has İnsan Temsilcisi"
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-500/80 mb-1">E-posta</label>
            <input 
              type="email" 
              required
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white focus:border-amber-500 outline-none transition-all"
              placeholder="bilgi@hasinsan.org"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-500/80 mb-1">Şifre</label>
            <input 
              type="password" 
              required
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white focus:border-amber-500 outline-none transition-all"
              placeholder="••••••••"
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button 
            disabled={success}
            className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg active:scale-95"
          >
            {success ? 'Mühürlendi...' : 'Ağa Katıl (Kayıt Ol)'}
          </button>
        </form>
        
        <div className="mt-6 text-center border-t border-slate-800 pt-4">
          <Link href="/giris" className="text-slate-400 text-sm hover:text-amber-500 transition-colors italic">
            Zaten mühürlüyüm, giriş yapayım.
          </Link>
        </div>
      </div>
    </div>
  );
}
