'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function HaberDetay() {
  const params = useParams();
  const [haber, setHaber] = useState<any>(null);

  useEffect(() => {
    if (params?.id) {
      fetch('/api/haberler')
        .then(res => res.json())
        .then(data => {
          const found = data.find((h: any) => h.id === params.id);
          setHaber(found);
        });
    }
  }, [params?.id]);

  if (!haber) return <div className="pt-24 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
      <Link href="/haberler" className="text-[#1B365D] hover:underline mb-4 block">← Geri Dön</Link>
      <h1 className="text-4xl font-bold mb-6">{haber.title || haber.baslik}</h1>
      {(haber.image || haber.resim) && (
        <img src={haber.image || haber.resim} className="w-full rounded-xl mb-6 shadow-md" />
      )}
      <div className="prose max-w-none whitespace-pre-wrap text-gray-700">
        {haber.content || haber.icerik}
      </div>
    </div>
  );
}
