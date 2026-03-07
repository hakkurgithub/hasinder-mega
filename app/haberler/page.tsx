'use client';

import { useEffect, useState } from 'react';
import NewsCard from '../../components/news/NewsCard';

export default function HasInsanderNews() {
  const [haberler, setHaberler] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHaberler = async () => {
      try {
        const response = await fetch('/api/haberler');
        const data = await response.json();
        setHaberler(data);
      } catch (error) {
        console.error('Haberler yuklenemedi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHaberler();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-12 border-l-8 border-[#D4AF37] pl-6">
          <h1 className="text-4xl font-black text-[#1B365D] tracking-tighter uppercase">
            HAS INSANDER <span className="text-[#D4AF37]">HABER</span>
          </h1>
          <p className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-widest">
            ISTANBUL & HATAY SANAYICI VE IS INSANLARI PLATFORMU
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Haberler yukleniyor...</p>
          </div>
        ) : haberler.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Haber bulunamadi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {haberler.map((haber) => (
              <NewsCard 
                key={haber.id} 
                id={haber.id}
                title={haber.baslik} 
                image={haber.resim || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000'}
                summary={haber.icerik.substring(0, 100) + '...'} 
              />
            ))}
          </div>
        )}
        
        <div className="mt-20 text-center opacity-30">
          <img src="https://raw.githubusercontent.com/hakkurgithub/images/main/silicon-campus-logo.jpg" alt="Silicon Campus" className="h-8 mx-auto mb-2 grayscale" />
          <p className="text-[9px] uppercase font-mono italic">Powered by Silicon Campus - All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
