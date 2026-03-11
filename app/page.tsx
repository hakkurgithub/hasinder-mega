import { prisma } from '@/lib/prisma';

export default async function Home() {
  // TypeScript hatasını önlemek için tipini any[] olarak mühürlüyoruz
  let latestDemands: any[] = [];
  let dbError = false;

  try {
    // Şemadaki status ve createdAt alanlarına göre veri çekiyoruz
    latestDemands = await prisma.demand.findMany({
      where: { status: 'BEKLEMEDE' }, // Şemadaki varsayılan status BEKLEMEDE
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
  } catch (error) {
    console.error("Ana sayfa talepleri çekilemedi:", error);
    dbError = true;
  }

  return (
    <div style={{padding:'40px', background:'#0f172a', minHeight:'100vh', color:'#fff', fontFamily:'sans-serif'}}>
      <h1 style={{color:'#fbbf24', fontSize:'2.5rem', marginBottom:'20px'}}>HAS İNSAN DER - TİB Ağı</h1>
      
      {dbError ? (
        <div style={{padding:'20px', border:'1px solid #ef4444', borderRadius:'10px', background:'rgba(239, 68, 68, 0.1)'}}>
          <p>⚠️ Sistem bakımda veya veritabanı bağlantısı bekleniyor.</p>
        </div>
      ) : (
        <div style={{marginTop:'30px'}}>
          <h2 style={{borderBottom:'2px solid #fbbf24', display:'inline-block', marginBottom:'20px'}}>Son Talepler</h2>
          <div style={{display:'grid', gap:'15px'}}>
            {latestDemands.length > 0 ? (
              latestDemands.map(d => (
                <div key={d.id} style={{padding:'15px', background:'rgba(255,255,255,0.05)', borderRadius:'8px', borderLeft:'4px solid #fbbf24'}}>
                  <strong style={{fontSize:'1.2rem'}}>{d.title}</strong>
                  <p style={{margin:'5px 0 0', color:'#94a3b8'}}>Tutar: {d.amount} TL</p>
                </div>
              ))
            ) : <p>Henüz aktif bir talep bulunmuyor.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
