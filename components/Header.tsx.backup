import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#1B365D] text-white p-4 sticky top-0 z-50 border-b border-[#D4AF37]/30 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row justify-between items-center gap-4">
        
        {/* LOGO & RESMİ İSİM */}
        <Link href="/" className="flex items-center space-x-3 shrink-0">
          <img src="https://raw.githubusercontent.com/hakkurgithub/images/main/silicon-campus-logo.jpg" alt="Silicon Campus" className="h-10 rounded" />
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs font-black tracking-tighter italic leading-none">İSTANBUL & HATAY SANAYİCİ VE İŞ İNSANLARI</span>
            <span className="text-[#D4AF37] text-[8px] md:text-[9px] font-bold uppercase tracking-widest leading-tight">YATIRIM VE İŞ BİRLİĞİ PLATFORMU (HAS İNSANDER)</span>
          </div>
        </Link>

        {/* ANA NAVİGASYON (TEK VÜCUT) */}
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[9px] font-black uppercase tracking-widest text-white/90">
          <Link href="/hakkimizda" className="hover:text-[#D4AF37] transition-colors">Platform</Link>
          <Link href="/haberler" className="hover:text-[#D4AF37] transition-colors">Haberler</Link>
          <Link href="/etkinlikler" className="hover:text-[#D4AF37] transition-colors">Etkinlikler</Link>
          <Link href="/kesfet" className="hover:text-[#D4AF37] transition-colors">Keşfet</Link>
          <Link href="/akilli-eslestirme" className="hover:text-[#D4AF37] transition-colors text-[#D4AF37]">Akıllı Eşleştirme</Link>
          <Link href="/rehber" className="hover:text-[#D4AF37] transition-colors">Rehber</Link>
          <Link href="/iletisim" className="hover:text-[#D4AF37] transition-colors">İletişim</Link>
        </nav>

        {/* ÜYE GİRİŞ & BORSA BUTONLARI */}
        <div className="flex items-center space-x-3 shrink-0">
          <Link href="/giris" className="text-[10px] font-bold hover:text-[#D4AF37] px-2">Giriş Yap</Link>
          <Link href="/giris?tab=register" className="bg-white/10 border border-white/20 text-[10px] font-bold px-3 py-1.5 rounded hover:bg-white/20 transition-all">Üye Ol</Link>
          <Link href="/panel" className="bg-[#D4AF37] text-[#0A192F] px-4 py-2 rounded-full font-black text-[10px] uppercase shadow-lg hover:scale-105 transition-transform">
            TİB BORSA GİRİŞ
          </Link>
        </div>
      </div>
    </header>
  );
}
