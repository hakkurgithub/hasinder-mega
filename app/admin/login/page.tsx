'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message || 'Giriş başarısız');
        return;
      }
      
      // Admin kontrolü
      if (!data.user?.isAdmin) {
        setError('Bu alana sadece yöneticiler erişebilir');
        return;
      }
      
      // Başarılı giriş - admin paneline yönlendir
      router.push('/admin');
      router.refresh();
      
    } catch (err) {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1220] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo ve Başlık */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37]/20 rounded-full mb-4">
            <Shield className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h1 className="text-2xl font-bold text-[#D4AF37]">HASINDER</h1>
          <p className="text-gray-400 mt-2">Yönetim Paneli Girişi</p>
        </div>

        {/* Login Formu */}
        <div className="bg-[#1B365D]/50 backdrop-blur-sm p-8 rounded-2xl border border-[#D4AF37]/20 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                E-posta Adresi
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0b1220] border border-[#D4AF37]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                placeholder="admin@hasinder.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0b1220] border border-[#D4AF37]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#D4AF37] text-[#1B365D] font-bold rounded-lg hover:bg-[#D4AF37]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#1B365D] border-t-transparent rounded-full animate-spin" />
                  Giriş yapılıyor...
                </>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#D4AF37]/10 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
              ← Siteye Dön
            </a>
          </div>
        </div>

        {/* Güvenlik Notu */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Bu alan sadece yetkili yöneticilere özeldir. Tüm giriş denemeleri kayıt altına alınmaktadır.
        </p>
      </div>
    </div>
  );
}
