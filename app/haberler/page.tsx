import NewsCard from '@/components/news/NewsCard';

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
        {/* HAS İNSANDER MANŞET */}
        <div className="flex flex-col mb-12 border-l-8 border-[#D4AF37] pl-6">
          <h1 className="text-4xl font-black text-[#1B365D] tracking-tighter">
            HAS İNSANDER <span className="text-[#D4AF37]">HABER</span>
          </h1>
          <p className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-widest">
            İstanbul & Hatay Sanayici ve İş İnsanları Yatırım ve İş Birliği Platformu
          </p>
        </div>
        
        {/* Ana Manşet */}
        <div className="relative h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl group border-b-4 border-[#D4AF37]">
          <img src={hasInsanderNews[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent flex flex-col justify-end p-10">
            <div className="bg-[#D4AF37] text-[#0A192F] text-[10px] font-black px-3 py-1 rounded-full w-fit mb-4">FLAŞ HABER</div>
            <h2 className="text-white text-4xl font-black mb-4 max-w-3xl leading-tight">{hasInsanderNews[0].title}</h2>
            <p className="text-blue-100 text-lg max-w-2xl opacity-80">{hasInsanderNews[0].summary}</p>
          </div>
        </div>

        {/* Haber Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {hasInsanderNews.map(news => <NewsCard key={news.id} {...news} />)}
        </div>
      </div>
    </div>
  );
}
