'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Panel() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/demands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, amount: parseFloat(amount) }),
      });

      if (res.ok) {
        setTitle('');
        setAmount('');
        alert('Talep başarıyla oluşturuldu!');
        router.push('/');
      } else {
        const data = await res.json();
        setError(data.error || 'Bir hata oluştu');
      }
    } catch (err) {
      setError('Bağlantı hatası');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-500 mb-4 text-center">TİB Yönetim Paneli</h1>
      <p className="text-center mb-8 text-gray-400">Has İnsan Der - Operasyon Merkezi v11.6</p>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">Yeni Talep Oluştur</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Talep Başlığı</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded text-white"
                placeholder="Örn: 1000 kg pamuk ihtiyacı"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Tutar (TL)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded text-white"
                placeholder="50000"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900 rounded text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded disabled:opacity-50"
            >
              {loading ? 'Gönderiliyor...' : 'Talep Oluştur'}
            </button>
          </form>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-300 text-center">Saha verileri ve eşleşmeler bu alandan yönetilmektedir.</p>
        </div>
      </div>
    </main>
  );
}
