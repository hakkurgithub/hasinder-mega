import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#1B365D] text-white p-4 sticky top-0 z-50 border-b border-[#D4AF37]/30 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* LOGO ALANI */}
        <Link href="/" className="flex items-center space-x-3">
          <img src="https://raw.githubusercontent.com/hakkurgithub/images/main/silicon-campus-logo.jpg" alt="Silicon Campus" className="h-10 rounded" />
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-tighter italic leading-none">İSTANBUL & HATAY SANAYİCİ VE İŞ İNSANLARI</span>
            <span className="text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest leading-tight">YATIRIM VE İŞ BİRLİĞİ PLATFORMU (HAS İNSANDER)</span>
          </div>
        </Link>

        {/* ANA MENÜ BUTONLARI */}
        <nav className="flex flex-wrap justify-center gap-4 text-[9px] font-black uppercase tracking-widest">
          <Link href="/hakkimizda" className="hover:text-[#D4AF37] border-b border-transparent hover:border-[#D4AF37] pb-1">Platform</Link>
          <Link href="/haberler" className="hover:text-[#D4AF37] border-b border-transparent hover:border-[#D4AF37] pb-1">Haberler</Link>
          <Link href="/etkinlikler" className="hover:text-[#D4AF37] border-b border-transparent hover:border-[#D4AF37] pb-1">Etkinlikler</Link>
          <Link href="/kesfet" className="hover:text-[#D4AF37] border-b border-transparent hover:border-[#D4AF37] pb-1">Firmaları Keşfet</Link>
          <Link href="/akilli-eslestirme" className="text-[#D4AF37] hover:text-white pb-1">Akıllı Eşleştirme</Link>
          <Link href="https://wa.me/905333715577" target="_blank" className="text-green-400">İletişim</Link>
        </nav>

        {/* BORSA HIZLI GİRİŞ */}
        <Link href="/panel" className="bg-[#D4AF37] text-[#0A192F] px-4 py-2 rounded-full font-black text-[10px] uppercase shadow-lg hover:scale-105 transition-transform">
          TİB BORSA GİRİŞ
        </Link>
      </div>
    </header>
  );
}
