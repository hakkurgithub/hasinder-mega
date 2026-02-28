import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#1B365D] text-white p-4 sticky top-0 z-50 border-b border-[#D4AF37]/30 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-black italic tracking-tighter">HASİNDER</span>
          <span className="text-[#D4AF37] font-bold text-xs border-l border-white/20 pl-2 uppercase tracking-widest">TİB Ağı</span>
        </Link>
        <nav className="hidden md:flex space-x-6 text-[10px] font-bold uppercase tracking-widest">
          <Link href="/kesfet" className="hover:text-[#D4AF37] transition-colors">Keşfet</Link>
          <Link href="/haberler" className="hover:text-[#D4AF37] transition-colors">Haberler</Link>
          <Link href="/panel" className="bg-[#D4AF37] text-[#0A192F] px-3 py-1 rounded shadow-sm">Borsa Paneli</Link>
          <Link href="/user/profile" className="hover:text-[#D4AF37] transition-colors">Profilim</Link>
        </nav>
      </div>
    </header>
  );
}
