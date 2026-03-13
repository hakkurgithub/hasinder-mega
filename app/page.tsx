'use client';

import { useState, useEffect } from 'react';

interface Demand {
  id: string;
  title: string;
  amount: number;
  status: string;
  creator: {
    name: string;
  };
}

export default function Home() {
  const [latestDemands, setLatestDemands] = useState<Demand[]>([]);
  const [dbError, setDbError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDemands() {
      try {
        const res = await fetch('/api/demands');
        if (!res.ok) throw new Error('API Hatası');
        const data = await res.json();
        setLatestDemands(data.slice(0, 5));
        setDbError(false);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
        setDbError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchDemands();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Yükleniyor...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-yellow-500 mb-8">
        HAS İNSAN DER - TİB Ağı
      </h1>
      
      {dbError ? (
        <div className="bg-red-900/50 border border-red-500 p-4 rounded-lg">
          ⚠️ Sistem bakımda veya veritabanı bağlantısı bekleniyor.
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Son Talepler</h2>
          {latestDemands.length > 0 ? (
            <div className="grid gap-4">
              {latestDemands.map((d) => (
                <div key={d.id} className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-bold">{d.title}</h3>
                  <p className="text-gray-400">{d.creator?.name}</p>
                  <p className="text-yellow-500">{d.amount} TL</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Henüz aktif talep bulunmuyor.</p>
          )}
        </div>
      )}
    </main>
  );
}