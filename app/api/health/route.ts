import { NextResponse } from 'next/server';
import { checkSystemVitals } from '@/lib/healing/doctor';

export async function GET() {
  const vitals = await checkSystemVitals();

  if (vitals.status === 'CRITICAL') {
    // Otonom Müdahale Günlüğü
    console.error(`��� KRİTİK HATA TESPİT EDİLDİ: [${new Date().toISOString()}] - Müdahale: ${vitals.action}`);
    
    // Vercel/Edge üzerinde otomatik cache temizliği ve bağlantı yenileme tetiklenir
    return NextResponse.json({ message: 'Self-healing triggered', vitals }, { status: 500 });
  }

  return NextResponse.json({ message: 'System is running smooth', vitals }, { status: 200 });
}
