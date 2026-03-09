import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  let latestDemands: { id: string; title: string }[] = [];
  let dbError = false;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('Demand')
      .select('id, title')
      .eq('status', 'ACIK')
      .order('createdAt', { ascending: false })
      .limit(3);
    
    if (error) {
      console.error("Supabase error:", error);
      dbError = true;
    } else {
      latestDemands = data || [];
    }
  } catch (error) {
    console.error("Ana sayfa talepleri cekilemedi:", error);
    dbError = true;
  }

  return (
    <div style={{padding:'40px', background:'#0f172a', minHeight:'100vh', color:'#fff'}}>
      <h1 style={{color:'#fbbf24'}}>HAS İNSAN DER - TİB Ağı</h1>
      
      {dbError ? (
        <div style={{padding:'20px', border:'1px solid red', borderRadius:'10px'}}>
          <p>⚠️ Sistem bakimda veya veritabani baglantisi bekliyor.</p>
        </div>
      ) : (
        <div style={{marginTop:'30px'}}>
          <h2>Son Talepler</h2>
          {latestDemands.length > 0 ? (
            latestDemands.map(d => <div key={d.id}>{d.title}</div>)
          ) : <p>Henuz aktif talep bulunmuyor.</p>}
        </div>
      )}
    </div>
  );
}
