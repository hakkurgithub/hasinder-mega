import NewsCard from '../../components/news/NewsCard';

const hasInsanderNews = [
  { 
    id: 1, 
    title: "İstanbul ve Hatay Sanayisi HAS İNSANDER Çatısında Birleşti", 
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000", 
    summary: "İstanbul ve Hataylı iş insanlarının dev iş birliği TİB Ağı ile otonom ticarete dönüştü." 
  },
  { 
    id: 2, 
    title: "Hakkı Kurt: 'Ticaretin Dijital Kalkanını Kurduk'", 
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000", 
    summary: "HAS İNSANDER Başkanı Hakkı Kurt, Silicon Campus destekli yeni sistemin detaylarını paylaştı." 
  },
  { 
    id: 3, 
    title: "Silicon Campus'ten HAS İNSANDER'e Tam Teknolojik Destek", 
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000", 
    summary: "Tüm hakları Silicon Campus'e ait olan otonom sistem siber güvenlik testlerinden başarıyla geçti." 
  }
];

export default function HasInsanderNews() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-12 border-l-8 border-[#D4AF37] pl-6">
          <h1 className="text-4xl font-black text-[#1B365D] tracking-tighter uppercase">
            HAS İNSANDER <span className="text-[#D4AF37]">HABER</span>
          </h1>
          <p className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-widest">
            İSTANBUL & HATAY SANAYİCİ VE İŞ İNSANLARI PLATFORMU
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {hasInsanderNews.map(news => <NewsCard key={news.id} {...news} />)}
        </div>
        
        <div className="mt-20 text-center opacity-30">
          <img src="https://raw.githubusercontent.com/hakkurgithub/images/main/silicon-campus-logo.jpg" alt="Silicon Campus" className="h-8 mx-auto mb-2 grayscale" />
          <p className="text-[9px] uppercase font-mono italic">Powered by Silicon Campus - All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
