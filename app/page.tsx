import { prisma } from '@/lib/prisma';

export default async function Home() {
  let latestDemands = [];
  let dbError = false;

  try {
    // Veritabanı bağlantısı varsa verileri çek
    latestDemands = await prisma.demand.findMany({
      where: { status: 'BEKLEMEDE' },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }) || [];
  } catch (error) {
    console.error("Ana sayfa talepleri çekilemedi:", error);
    dbError = true;
  }

  return (
    <div style={{padding:'40px', background:'#0f172a', minHeight:'100vh', color:'#fff'}}>
      <h1 style={{color:'#fbbf24'}}>HAS İNSAN DER - TİB Ağı</h1>
      
      {dbError ? (
        <div style={{padding:'20px', border:'1px solid red', borderRadius:'10px'}}>
          <p>⚠️ Sistem bakımda veya veritabanı bağlantısı bekleniyor.</p>
        </div>
      ) : (
        <div style={{marginTop:'30px'}}>
          <h2>Son Talepler</h2>
          {(latestDemands && latestDemands.length > 0) ? (
            latestDemands.map(d => (
              <div key={d.id} style={{padding:'10px', margin:'10px 0', background:'#1e293b', borderRadius:'5px'}}>
                <h3>{d.title}</h3>
                <p>{d.description || 'Açıklama yok'}</p>
                <small>Durum: {d.status}</small>
              </div>
            ))
          ) : <p>Henüz aktif talep bulunmuyor.</p>}
        </div>
      )}
    </div>
  );
}
