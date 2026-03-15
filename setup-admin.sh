#!/bin/bash

echo "======================================"
echo "HASINDER ADMIN DASHBOARD KURULUMU"
echo "======================================"
echo ""

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. YEDEKLEME
if [ -f "middleware.ts" ]; then
    echo -e "${YELLOW}[1/9] Mevcut middleware.ts yedekleniyor...${NC}"
    cp middleware.ts middleware.ts.backup.$(date +%Y%m%d_%H%M%S)
    echo -e "${GREEN}✓ Yedek oluşturuldu${NC}"
else
    echo -e "${YELLOW}[1/9] middleware.ts yok, yedekleme atlanıyor${NC}"
fi

# 2. KLASÖR YAPISI OLUŞTURMA
echo -e "${YELLOW}[2/9] Klasör yapısı oluşturuluyor...${NC}"
mkdir -p app/admin
mkdir -p components/admin
mkdir -p app/api/admin/stats
mkdir -p app/api/admin/users
mkdir -p app/api/admin/demands
echo -e "${GREEN}✓ Klasörler oluşturuldu${NC}"

# 3. MIDDLEWARE.TS
echo -e "${YELLOW}[3/9] middleware.ts oluşturuluyor...${NC}"
cat > middleware.ts << 'EOF'
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const ADMIN_PATHS = ['/admin', '/admin/:path*'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (!ADMIN_PATHS.some(path => pathname.startsWith(path.replace('/:path*', '')))) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', request.url));

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jwtVerify(token, secret);
    if (!payload.isAdmin) return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = { matcher: ['/admin/:path*'] };
EOF
echo -e "${GREEN}✓ middleware.ts oluşturuldu${NC}"

# 4. ADMIN LAYOUT
echo -e "${YELLOW}[4/9] app/admin/layout.tsx oluşturuluyor...${NC}"
cat > app/admin/layout.tsx << 'EOF'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import AdminSidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';

async function verifyAdmin() {
  const token = cookies().get('token')?.value;
  if (!token) redirect('/login');
  
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jwtVerify(token, secret);
    if (!payload.isAdmin) redirect('/');
    return payload;
  } catch {
    redirect('/login');
  }
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await verifyAdmin();
  return (
    <div className="min-h-screen bg-[#0b1220] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminHeader user={user} />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
EOF
echo -e "${GREEN}✓ app/admin/layout.tsx oluşturuldu${NC}"

# 5. SIDEBAR COMPONENT
echo -e "${YELLOW}[5/9] components/admin/Sidebar.tsx oluşturuluyor...${NC}"
cat > components/admin/Sidebar.tsx << 'EOF'
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
EOF
echo -e "${GREEN}✓ components/admin/Sidebar.tsx oluşturuldu${NC}"

# 6. ADMIN HEADER
echo -e "${YELLOW}[6/9] components/admin/AdminHeader.tsx oluşturuluyor...${NC}"
cat > components/admin/AdminHeader.tsx << 'EOF'
'use client';
import { Shield, Bell } from 'lucide-react';
import { JWTPayload } from 'jose';

interface AdminHeaderProps { user: JWTPayload & { name?: string; email?: string } }

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-[#1B365D]/50 border-b border-[#D4AF37]/20 flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <Shield className="text-[#D4AF37]" size={24} />
        <span className="text-[#D4AF37] font-semibold">Admin Kontrol Paneli</span>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-[#D4AF37]">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">0</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1B365D] font-bold">
            {user.name?.charAt(0) || user.email?.charAt(0) || 'A'}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">{user.name || 'Admin'}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
EOF
echo -e "${GREEN}✓ components/admin/AdminHeader.tsx oluşturuldu${NC}"

# 7. DASHBOARD PAGE
echo -e "${YELLOW}[7/9] app/admin/page.tsx oluşturuluyor...${NC}"
cat > app/admin/page.tsx << 'EOF'
import { prisma } from '@/lib/prisma';
import StatsCard from '@/components/admin/StatsCard';
import { Users, FileText, Truck, TrendingUp } from 'lucide-react';

async function getStats() {
  const [totalUsers, totalDemands, activeUsers, pendingDemands] = await Promise.all([
    prisma.user.count(),
    prisma.demand.count(),
    prisma.user.count({ where: { status: 'AKTIF' } }),
    prisma.demand.count({ where: { status: 'BEKLEMEDE' } })
  ]);
  return { totalUsers, totalDemands, activeUsers, pendingDemands };
}

async function getRecentUsers() {
  return await prisma.user.findMany({
    take: 5, orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, status: true, createdAt: true }
  });
}

async function getRecentDemands() {
  return await prisma.demand.findMany({
    take: 5, orderBy: { createdAt: 'desc' },
    include: { creator: { select: { name: true, email: true } } }
  });
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentUsers = await getRecentUsers();
  const recentDemands = await getRecentDemands();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Dashboard</h2>
        <p className="text-gray-400">Platform genel durumu ve istatistikler</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Toplam Üye" value={stats.totalUsers} icon={Users} trend="+12%" color="blue" />
        <StatsCard title="Toplam İlan" value={stats.totalDemands} icon={FileText} trend="+5%" color="gold" />
        <StatsCard title="Aktif Üye" value={stats.activeUsers} icon={TrendingUp} color="green" />
        <StatsCard title="Bekleyen İlan" value={stats.pendingDemands} icon={Truck} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#1B365D]/30 rounded-xl border border-[#D4AF37]/20 overflow-hidden">
          <div className="p-6 border-b border-[#D4AF37]/20">
            <h3 className="text-lg font-semibold text-white">Son Kayıt Olan Üyeler</h3>
          </div>
          <table className="w-full">
            <thead className="bg-[#1B365D]/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Üye</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Durum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/10">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#1B365D]/20">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'AKTIF' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{new Date(user.createdAt).toLocaleDateString('tr-TR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#1B365D]/30 rounded-xl border border-[#D4AF37]/20 overflow-hidden">
          <div className="p-6 border-b border-[#D4AF37]/20">
            <h3 className="text-lg font-semibold text-white">Son Eklenen İlanlar</h3>
          </div>
          <table className="w-full">
            <thead className="bg-[#1B365D]/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Başlık</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Tutar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/10">
              {recentDemands.map((demand) => (
                <tr key={demand.id} className="hover:bg-[#1B365D]/20">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-white">{demand.title}</p>
                    <p className="text-xs text-gray-400">{demand.creator.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#D4AF37]">{demand.amount.toLocaleString('tr-TR')} ₺</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${demand.status === 'AKTIF' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {demand.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
EOF
echo -e "${GREEN}✓ app/admin/page.tsx oluşturuldu${NC}"

# 8. STATS CARD COMPONENT
echo -e "${YELLOW}[8/9] components/admin/StatsCard.tsx oluşturuluyor...${NC}"
cat > components/admin/StatsCard.tsx << 'EOF'
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: string;
  color: 'blue' | 'gold' | 'green' | 'orange';
}

const colorVariants = {
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  gold: 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30',
  green: 'bg-green-500/20 text-green-400 border-green-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
};

export default function StatsCard({ title, value, icon: Icon, trend, color }: StatsCardProps) {
  return (
    <div className={`p-6 rounded-xl border ${colorVariants[color]} backdrop-blur-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          {trend && <p className="text-sm mt-2 text-green-400">↑ {trend} <span className="text-gray-500">bu ay</span></p>}
        </div>
        <div className="p-3 rounded-lg bg-white/5"><Icon size={24} /></div>
      </div>
    </div>
  );
}
EOF
echo -e "${GREEN}✓ components/admin/StatsCard.tsx oluşturuldu${NC}"

# 9. API ROUTES
echo -e "${YELLOW}[9/9] API Routes oluşturuluyor...${NC}"

# Stats API
cat > app/api/admin/stats/route.ts << 'EOF'
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

async function verifyAdminToken() {
  const token = cookies().get('token')?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jwtVerify(token, secret);
    return payload.isAdmin ? payload : null;
  } catch { return null; }
}

export async function GET() {
  const admin = await verifyAdminToken();
  if (!admin) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 });
  try {
    const stats = await prisma.$transaction([
      prisma.user.count(), prisma.demand.count(),
      prisma.user.count({ where: { status: 'AKTIF' } }),
      prisma.demand.count({ where: { status: 'BEKLEMEDE' } })
    ]);
    return NextResponse.json({ totalUsers: stats[0], totalDemands: stats[1], activeUsers: stats[2], pendingDemands: stats[3] });
  } catch {
    return NextResponse.json({ error: 'Veri çekme hatası' }, { status: 500 });
  }
}
EOF

# Users API
cat > app/api/admin/users/route.ts << 'EOF'
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

async function verifyAdminToken() {
  const token = cookies().get('token')?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jwtVerify(token, secret);
    return payload.isAdmin ? payload : null;
  } catch { return null; }
}

export async function GET() {
  const admin = await verifyAdminToken();
  if (!admin) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 });
  try {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: 'Kullanıcılar çekilemedi' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const admin = await verifyAdminToken();
  if (!admin) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 });
  try {
    const { userId, status } = await request.json();
    const updatedUser = await prisma.user.update({ where: { id: userId }, data: { status } });
    return NextResponse.json(updatedUser);
  } catch {
    return NextResponse.json({ error: 'Güncelleme hatası' }, { status: 500 });
  }
}
EOF

# Demands API
cat > app/api/admin/demands/route.ts << 'EOF'
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

async function verifyAdminToken() {
  const token = cookies().get('token')?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jwtVerify(token, secret);
    return payload.isAdmin ? payload : null;
  } catch { return null; }
}

export async function GET() {
  const admin = await verifyAdminToken();
  if (!admin) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 });
  try {
    const demands = await prisma.demand.findMany({ orderBy: { createdAt: 'desc' }, include: { creator: { select: { name: true, email: true } } } });
    return NextResponse.json(demands);
  } catch {
    return NextResponse.json({ error: 'İlanlar çekilemedi' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await verifyAdminToken();
  if (!admin) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 });
  try {
    const { demandId } = await request.json();
    await prisma.demand.delete({ where: { id: demandId } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Silme hatası' }, { status: 500 });
  }
}
EOF

echo -e "${GREEN}✓ API Routes oluşturuldu${NC}"

echo ""
echo "======================================"
echo -e "${GREEN}✅ KURULUM TAMAMLANDI!${NC}"
echo "======================================"
echo ""
echo "ÖNEMLİ BİLGİLER:"
echo ""
echo "1. ${YELLOW}Jose kütüphanesi kurulumu gerekli:${NC}"
echo "   npm install jose"
echo ""
echo "2. ${YELLOW}.env.local dosyanıza JWT_SECRET ekleyin:${NC}"
echo "   JWT_SECRET=your_super_secret_key_here"
echo ""
echo "3. ${YELLOW}Lib klasörü kontrolü:${NC}"
echo "   Eğer lib/prisma.ts yoksa oluşturun:"
echo "   import { PrismaClient } from '@prisma/client';"
echo "   export const prisma = new PrismaClient();"
echo ""
echo "4. ${YELLOW}Admin erişimi için:${NC}"
echo "   Veritabanında isAdmin=true olan bir kullanıcı olmalı."
echo "   npx prisma studio ile güncelleyebilirsiniz."
echo ""
echo "5. ${YELLOW}Çalıştırma:${NC}"
echo "   npm run dev"
echo "   http://localhost:3000/admin"
echo ""
echo "6. ${YELLOW}Geri Alma (Rollback):${NC}"
echo "   ./setup-admin.sh sil veya:"
echo "   rm -rf app/admin components/admin app/api/admin middleware.ts"
echo "   mv middleware.ts.backup.* middleware.ts (varsa)"
echo ""
echo -e "${GREEN}Başarılar!${NC}"