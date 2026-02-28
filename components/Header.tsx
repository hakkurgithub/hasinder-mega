import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#1B365D] text-white p-4 sticky top-0 z-50 border-b border-[#D4AF37]/30 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter italic">
          HASİNDER <span className="text-[#D4AF37]">TİB</span>
        </Link>
        <nav className="hidden md:flex space-x-6 text-[10px] font-bold uppercase tracking-widest">
          <Link href="/kesfet" className="hover:text-[#D4AF37]">Keşfet</Link>
          <Link href="/haberler" className="hover:text-[#D4AF37]">Haberler</Link>
          <Link href="/panel" className="text-[#D4AF37] border border-[#D4AF37] px-2 py-1 rounded">Borsa Paneli</Link>
          <Link href="/user/profile" className="hover:text-[#D4AF37]">Profilim</Link>
        </nav>
      </div>
    </header>
  );
}
