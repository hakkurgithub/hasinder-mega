import Link from 'next/link';

export default function NewsCard({ id, title, image, summary }: any) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-2 left-2 bg-[#D4AF37] text-[#0A192F] text-[8px] font-black px-2 py-1 rounded-full uppercase">
          HAS İNSANDER
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-[#1B365D] text-sm mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-500 text-[10px] line-clamp-2 mb-4">{summary}</p>
        <Link href={`/haberler/${id}`} className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest hover:underline">
          DETAYI OKU →
        </Link>
      </div>
    </div>
  );
}
