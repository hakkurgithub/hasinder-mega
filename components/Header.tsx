import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#1B365D] text-white p-4 sticky top-0 z-50 border-b border-[#D4AF37]/30 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-4">
          <img src="https://raw.githubusercontent.com/hakkurgithub/images/main/silicon-campus-logo.jpg" alt="Silicon Campus" className="h-10 rounded shadow-sm border border-white/20" />
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs font-black tracking-tighter italic leading-none">İSTANBUL & HATAY SANAYİCİ VE İŞ İNSANLARI</span>
            <span className="text-[#D4AF37] text-[8px] md:text-[10px] font-bold uppercase tracking-widest leading-tight">YATIRIM VE İŞ BİRLİĞİ PLATFORMU (HASİNDER)</span>
          </div>
        </Link>
        <nav className="hidden lg:flex space-x-6 text-[10px] font-bold uppercase tracking-widest">
          <Link href="/panel" className="bg-[#D4AF37] text-[#0A192F] px-3 py-1 rounded hover:bg-white transition-all">Borsa Girişi</Link>
        </nav>
      </div>
    </header>
  );
}
