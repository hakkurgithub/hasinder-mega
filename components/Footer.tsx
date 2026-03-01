import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-white pt-16 pb-8 border-t-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h4 className="text-[#D4AF37] font-black uppercase text-xs">İLETİŞİM</h4>
          <div className="text-[10px] space-y-2 opacity-80">
            <p className="font-bold">Hakkı KURT</p>
            <p>Adile Naşit Caddesi, Olcay Sevalista Residence, Esenyurt/İstanbul</p>
            <a href="/iletisim" className="block text-green-400 font-bold hover:underline italic">WhatsApp: 0533 371 55 77</a>
            <a href="mailto:kurt.hakki@gmail.com" className="block text-blue-300 hover:underline italic">kurt.hakki@gmail.com</a>
          </div>
        </div>
        <div>
          <h4 className="text-[#D4AF37] font-black uppercase text-xs mb-4">HUKUKİ</h4>
          <ul className="text-[10px] space-y-2 opacity-60">
            <li><Link href="/yasal">KVKK & Gizlilik Politikası</Link></li>
            <li><Link href="/hakkimizda">Hakkımızda</Link></li>
          </ul>
        </div>
        <div className="text-right">
           <img src="https://raw.githubusercontent.com/hakkurgithub/images/main/silicon-campus-logo.jpg" alt="Silicon Campus" className="h-8 ml-auto mb-2 rounded opacity-50 grayscale hover:grayscale-0 transition-all" />
           <p className="text-[9px] text-gray-400 font-mono">Tüm Hakları Silicon Campus'e Aittir.</p>
           <p className="text-[9px] text-gray-600 mt-2 uppercase tracking-widest italic">28.02.2026 TİB OTONOM SİSTEM</p>
        </div>
      </div>
    </footer>
  );
}
