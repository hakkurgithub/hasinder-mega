import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-white pt-12 pb-6 border-t-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-[#D4AF37] font-black mb-4 uppercase text-xs">Kurumsal</h4>
          <ul className="text-[10px] space-y-2 opacity-70">
            <li><Link href="/hakkimizda">Hakkımızda</Link></li>
            <li><Link href="/yasal">KVKK & Yasal</Link></li>
            <li><Link href="/rehber">Kullanım Rehberi</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#D4AF37] font-black mb-4 uppercase text-xs">Ticaret Ağı</h4>
          <ul className="text-[10px] space-y-2 opacity-70">
            <li><Link href="/panel/lojistik">Lojistik Takip</Link></li>
            <li><Link href="/pazarlama-araclari">Pazarlama Araçları</Link></li>
            <li><Link href="/admin/dashboard">Yönetim Paneli</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#D4AF37] font-black mb-4 uppercase text-xs">İletişim Kanalları</h4>
          <ul className="text-[10px] space-y-3">
            <li className="flex items-center space-x-2">
              <span className="text-green-500">���</span>
              <a href="https://wa.me/905XXXXXXXXX" target="_blank" className="hover:underline">WhatsApp Destek Hattı</a>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-400">���</span>
              <a href="mailto:iletisim@hasinder.org.tr" className="hover:underline">iletisim@hasinder.org.tr</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 text-center text-[9px] opacity-40 uppercase tracking-[0.3em]">
        © 2026 HASİNDER TİB - Karanlık Fabrika Otonom Sistemleri
      </div>
    </footer>
  );
}
