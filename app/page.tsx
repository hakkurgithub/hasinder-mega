import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let latestDemands: { id: string; title: string }[] = []
  let dbError = false
  let errorMessage = ''

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('Demand')
      .select('id, title')
      .eq('status', 'ACIK')
      .order('createdAt', { ascending: false })
      .limit(3)

    if (error) {
      errorMessage = error.message
      dbError = true
    } else {
      latestDemands = data || []
    }
  } catch (err: unknown) {
    errorMessage = err instanceof Error ? err.message : 'Bilinmeyen hata'
    dbError = true
  }

  return (
    <div style={{ padding: '40px', background: '#0f172a', minHeight: '100vh', color: '#fff' }}>
      <h1 style={{ color: '#fbbf24', marginBottom: '20px' }}>HAS INSAN DER - TIB Agi</h1>

      {dbError ? (
        <div style={{ padding: '20px', border: '1px solid #ef4444', borderRadius: '10px', background: '#1e1e1e' }}>
          <p style={{ color: '#fbbf24' }}>Sistem bakimda veya veritabani baglantisi bekliyor.</p>
          {errorMessage && <p style={{ color: '#9ca3af', fontSize: '12px' }}>{errorMessage}</p>}
        </div>
      ) : (
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ color: '#60a5fa' }}>Son Talepler</h2>
          {latestDemands.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {latestDemands.map((d) => (
                <li key={d.id} style={{ padding: '10px', borderBottom: '1px solid #374151' }}>
                  {d.title}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#9ca3af' }}>Henuz aktif talep bulunmuyor.</p>
          )}
        </div>
      )}
    </div>
  )
}
