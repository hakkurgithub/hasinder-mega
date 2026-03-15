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
