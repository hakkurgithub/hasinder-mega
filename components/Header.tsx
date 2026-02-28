import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#1B365D] text-white p-4 sticky top-0 z-50 border-b border-[#D4AF37]/30 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex flex-col">
          <span className="text-sm font-black tracking-tighter italic leading-none">İSTANBUL & HATAY SANAYİCİ VE İŞ İNSANLARI</span>
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">YATIRIM VE İŞ BİRLİĞİ PLATFORMU (HASİNDER)</span>
        </Link>
        <nav className="hidden lg:flex space-x-6 text-[10px] font-bold uppercase tracking-widest">
          <Link href="/kesfet" className="hover:text-[#D4AF37]">Keşfet</Link>
          <Link href="/panel" className="bg-[#D4AF37] text-[#0A192F] px-3 py-1 rounded">Borsa</Link>
          <Link href="/user/profile" className="hover:text-[#D4AF37]">Profil</Link>
        </nav>
      </div>
    </header>
  );
}
