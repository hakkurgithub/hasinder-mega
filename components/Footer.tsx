import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-white pt-16 pb-8 border-t-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h4 className="text-[#D4AF37] font-black uppercase text-xs">Destek & İletişim</h4>
          <div className="space-y-3">
            <a href="https://wa.me/905333715577" target="_blank" className="flex items-center space-x-2 bg-green-600/10 p-2 rounded border border-green-600/30 text-[10px] hover:bg-green-600/20">
              <span className="text-green-500 font-bold italic">WhatsApp:</span> <span>0533 371 55 77</span>
            </a>
            <a href="mailto:kurt.hakki@gmail.com" className="flex items-center space-x-2 bg-blue-600/10 p-2 rounded border border-blue-600/30 text-[10px] hover:bg-blue-600/20">
              <span className="text-blue-400 font-bold italic">E-Posta:</span> <span>kurt.hakki@gmail.com</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-[#D4AF37] font-black uppercase text-xs mb-4">Adres</h4>
          <p className="text-[10px] opacity-60 leading-relaxed">
            Adile Naşit Caddesi<br/>
            OLCAY SEVALİSTA RESİDENCE Kat 2<br/>
            Esenyurt / İstanbul
          </p>
        </div>
        <div>
          <h4 className="text-[#D4AF37] font-black uppercase text-xs mb-4">Kurumsal</h4>
          <ul className="text-[10px] space-y-2 opacity-60">
            <li><Link href="/hakkimizda">Platform Hakkında</Link></li>
            <li><Link href="/yasal">KVKK & Gizlilik</Link></li>
          </ul>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-gray-500 italic uppercase tracking-widest">
            28.02.2026 Yasal Uyumlu<br/>Otonom Ticaret Platformu
          </p>
        </div>
      </div>
    </footer>
  );
}
