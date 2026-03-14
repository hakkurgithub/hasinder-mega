'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
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
        router.push('/'); // Ana sayfaya yönlendir
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
      <h1 className="text-3xl font-bold text-yellow-500 mb-8">Yeni Talep Oluştur</h1>
      
      <form onSubmit={handleSubmit} className="max-w-md bg-gray-800 p-6 rounded-lg mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Talep Başlığı</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white"
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
            className="w-full p-2 bg-gray-700 rounded text-white"
            placeholder="50000"
            required
          />
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-900 rounded text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Gönderiliyor...' : 'Talep Oluştur'}
        </button>
      </form>
    </main>
  );
}
