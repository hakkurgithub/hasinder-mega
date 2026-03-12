import { prisma } from '@/lib/prisma';

export default async function Home() {
  // TypeScript'in 'never[]' hatasını bu mühürle aşıyoruz
  let latestDemands: any[] = [];
  let dbError = false;

  try {
    // Şemamızda mühürlü olan 'BEKLEMEDE' statüsüne göre çekiyoruz
    latestDemands = await prisma.demand.findMany({
      where: { status: 'BEKLEMEDE' },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  } catch (error) {
    console.error("Ana sayfa veritabanı hatası:", error);
    dbError = true;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <header className="max-w-4xl mx-auto border-b border-amber-500/30 pb-6 text-center">
        <h1 className="text-4xl font-bold text-amber-500">HAS İNSAN DER</h1>
        <p className="text-slate-400 mt-2 font-semibold">TİB Ağı - Ticari İstihbarat ve İş Birliği</p>
      </header>

      <main className="max-w-4xl mx-auto mt-12">
        {dbError ? (
          <div className="bg-red-500/10 border border-red-500 p-6 rounded-2xl text-center">
            <p className="text-lg">⚠️ Sistem bakımı devam ediyor. Veritabanı bağlantısı bekleniyor.</p>
          </div>
        ) : (
          <section>
            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-amber-500 pl-4">Son Talepler</h2>
            <div className="grid gap-4">
              {latestDemands.length > 0 ? (
                latestDemands.map((d: any) => (
                  <div key={d.id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-amber-500/50 transition-all shadow-xl">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">{d.title}</h3>
                      <span className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase">
                        {d.status}
                      </span>
                    </div>
                    <p className="text-amber-400 font-mono mt-3 text-lg">{d.amount.toLocaleString()} TL</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700">
                  <p className="text-slate-500 italic">Şu an aktif bir talep mühürlenmemiştir.</p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
