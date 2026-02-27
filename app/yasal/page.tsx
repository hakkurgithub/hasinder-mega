import Link from 'next/link';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-6 max-w-4xl mx-auto text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold text-[#1B365D] mb-8">Hukuki Düzenlemeler ve Şeffaflık Metni</h1>
      
      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-bold text-[#D4AF37] mb-4 underline">1. 6698 Sayılı KVKK Aydınlatma Metni</h2>
          <p>TİB Ağı, üye firmaların ticari sığlarını ve kişisel verilerini 6698 Sayılı Kanun'a uygun olarak işler. Verileriniz, AES-256 standardıyla şifrelenmiş veritabanlarında saklanır ve açık rızanız olmaksızın üçüncü taraflarla paylaşılmaz.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#D4AF37] mb-4 underline">2. MASAK ve Kara Para Aklama ile Mücadele (AML)</h2>
          <p>Platform, 5549 Sayılı Suç Gelirlerinin Aklanmasının Önlenmesi Hakkında Kanun ve 6493 Sayılı Kanun kapsamındaki yükümlülüklere tam uyum sağlar. TİB Ağı bir ödeme kuruluşu değildir; tüm para trafiği TCMB lisanslı aracı kurumlar üzerinden yönetilir.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#D4AF37] mb-4 underline">3. Aracı Hizmet Sağlayıcı Sorumluluk Sınırı</h2>
          <p>6563 Sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun uyarınca, platformumuz "Aracı Hizmet Sağlayıcı"dır. Taraflar arasındaki ticari ihtilaflardan, malın ayıbından veya ödeme gecikmelerinden TİB Ağı hukuki olarak sorumlu tutulamaz.</p>
        </section>
      </div>

      <div className="mt-12 p-6 bg-red-50 border-l-4 border-red-600 text-sm italic text-red-900 font-medium">
        Uyarı: Sisteme sahte belge veya yanıltıcı ticari bilgi yükleyen hesaplar, MASAK ve ilgili yargı mercilerine bildirilmek üzere süresiz olarak askıya alınır.
      </div>
      
      <Link href="/" className="mt-8 inline-block text-[#1B365D] font-bold hover:text-[#D4AF37] transition-colors">
        <i className="ri-arrow-left-line"></i> Ana Sayfaya Dön
      </Link>
    </div>
  );
}
