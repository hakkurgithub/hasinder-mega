import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let latestDemands: any[] = [];
  let dbError = false;

  try {
    latestDemands = await prisma.demand.findMany({
      where: { status: 'BEKLEMEDE' },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  } catch (error) {
    console.error("DB Hatası:", error);
    dbError = true;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <header className="py-12 border-b border-slate-800 text-center">
        <h1 className="text-5xl font-extrabold text-amber-500 italic mb-4">HAS İNSAN DER</h1>
        <p className="text-xl text-slate-400">Ticari İstihbarat ve İş Birliği Ağı (TİB)</p>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex gap-4 mb-12 justify-center">
          <Link href="/giris" className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-xl font-bold transition-all">Giriş Yap</Link>
          <Link href="/kayit" className="border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-xl font-bold transition-all">Ağa Katıl</Link>
        </div>

        {dbError ? (
          <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-2xl text-center">
            <p className="text-red-400">⚠️ Sistem bakımdadır. Lütfen daha sonra tekrar deneyiniz.</p>
          </div>
        ) : (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-amber-500 border-l-4 border-amber-500 pl-4">Aktif Talepler</h2>
            <div className="grid gap-4">
              {latestDemands.length > 0 ? (
                latestDemands.map((d) => (
                  <div key={d.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white">{d.title}</h3>
                      <span className="text-amber-500 font-mono font-bold">{d.amount.toLocaleString()} TL</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic text-center py-10 bg-slate-900/50 rounded-2xl">Şu an aktif bir talep mühürlenmemiştir.</p>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
