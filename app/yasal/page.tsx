import Link from 'next/link';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-6 max-w-4xl mx-auto text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold text-[#1B365D] mb-8">Kullanım Koşulları ve KVKK Aydınlatma Metni</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">1. Aracı Hizmet Sağlayıcı Bildirimi</h2>
        <p>TİB Ağı, 6563 Sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun uyarınca "Aracı Hizmet Sağlayıcı" sıfatına haizdir. Platform, kullanıcılar arasındaki ticari işlemlerin tarafı olmayıp, sadece tarafları buluşturan teknik bir altyapı sunmaktadır.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">2. MASAK ve KYC Uyum Bildirimi</h2>
        <p>Platform üzerinden gerçekleştirilecek tüm finansal işlemler, TCMB lisanslı ödeme kuruluşları aracılığıyla yapılmaktadır. TİB Ağı bünyesinde herhangi bir fon tutulmamakta, ödemeler doğrudan lisanslı aracı kurumlar üzerinden yönetilmektedir.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">3. KVKK ve Gizlilik</h2>
        <p>6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında, üyelerimize ait ticari sırlar ve kişisel veriler en üst düzey güvenlik protokolleriyle saklanmaktadır. Üçüncü şahıslarla paylaşım sadece yasal zorunluluk hallerinde yapılmaktadır.</p>
      </section>

      <div className="mt-12 p-6 bg-gray-50 border-l-4 border-[#D4AF37] text-sm italic">
        Bu platform, İstanbul & Hatay Sanayici ve İş İnsanları Yatırım ve İşbirliği Platformu (HASİNDER) vizyonuyla işletilmektedir.
      </div>
      
      <Link href="/" className="mt-8 inline-block text-[#1B365D] font-bold underline">Ana Sayfaya Dön</Link>
    </div>
  );
}
