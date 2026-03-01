export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-[#1B365D]">BİZ <span className="text-[#D4AF37]">KİMİZ?</span></h1>
          <div className="h-1 w-20 bg-[#D4AF37] mx-auto"></div>
        </div>
        
        <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed text-lg">
          <p>
            <strong>İSTANBUL & HATAY SANAYİCİ VE İŞ İNSANLARI YATIRIM VE İŞ BİRLİĞİ PLATFORMU (HAS İNSANDER)</strong>, 
            iki büyük şehrin ticari gücünü birleştirmek, Hatay'ın üretim potansiyelini İstanbul'un sermaye ve pazarlama ağıyla otonom bir sistemde buluşturmak amacıyla kurulmuştur.
          </p>
          <p>
            Başkanımız <strong>Hakkı KURT</strong> liderliğinde ve <strong>Silicon Campus</strong> teknolojik iş birliği ile 
            Türkiye'nin ilk otonom ticaret borsa ağı olan TİB'i hayata geçirmiş bulunmaktayız.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          <div className="p-8 bg-gray-50 rounded-3xl border-t-4 border-[#1B365D]">
            <h3 className="font-bold text-[#1B365D] mb-4 uppercase italic">Vizyonumuz</h3>
            <p className="text-sm">Ticaretin dijitalleştiği 2026 dünyasında, hatasız ve güvenli borsa altyapısı sağlamak.</p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl border-t-4 border-[#D4AF37]">
            <h3 className="font-bold text-[#1B365D] mb-4 uppercase italic">Partnerimiz</h3>
            <p className="text-sm">Silicon Campus - Tüm teknolojik haklar ve altyapı koruma altındadır.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
