'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, Truck, Newspaper, LogOut } from 'lucide-react';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Üyeler', icon: Users },
  { href: '/admin/demands', label: 'İlanlar', icon: FileText },
  { href: '/admin/logistics', label: 'Lojistik', icon: Truck },
  { href: '/admin/news', label: 'Haberler', icon: Newspaper },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1B365D] border-r border-[#D4AF37]/20 z-50">
      <div className="p-6 border-b border-[#D4AF37]/20">
        <h1 className="text-xl font-bold text-[#D4AF37]">HASINDER</h1>
        <p className="text-xs text-gray-400 mt-1">Yönetim Paneli</p>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-[#D4AF37] text-[#1B365D] font-semibold' : 'text-gray-300 hover:bg-[#1B365D]/50 hover:text-[#D4AF37]'
              }`}>
              <Icon size={20} /><span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#D4AF37]/20">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 transition-colors">
          <LogOut size={20} /><span>Siteye Dön</span>
        </Link>
      </div>
    </aside>
  );
}
