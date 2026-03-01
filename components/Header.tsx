import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#1B365D] text-white p-4 sticky top-0 z-50 border-b border-[#D4AF37]/30 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="flex items-center space-x-3">
          <img src="https://raw.githubusercontent.com/hakkurgithub/images/main/silicon-campus-logo.jpg" alt="Silicon Campus" className="h-10 rounded shadow-md" />
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs font-black tracking-tighter italic leading-none">İSTANBUL & HATAY SANAYİCİ VE İŞ İNSANLARI</span>
            <span className="text-[#D4AF37] text-[8px] md:text-[9px] font-bold uppercase tracking-widest leading-tight">YATIRIM VE İŞ BİRLİĞİ PLATFORMU (HAS İNSANDER)</span>
          </div>
        </Link>
        <nav className="flex flex-wrap justify-center gap-4 text-[9px] font-black uppercase tracking-widest text-white/80">
          <Link href="/hakkimizda" className="hover:text-[#D4AF37]">Platform</Link>
          <Link href="/haberler" className="hover:text-[#D4AF37]">Haberler</Link>
          <Link href="/kesfet" className="hover:text-[#D4AF37]">Keşfet</Link>
          <Link href="/panel" className="text-[#D4AF37] border border-[#D4AF37]/50 px-2 py-1 rounded bg-[#D4AF37]/10">BORSA PANELİ</Link>
          <a href="https://wa.me/905333715577" target="_blank" className="text-green-400">YARDIM</a>
        </nav>
      </div>
    </header>
  );
}
