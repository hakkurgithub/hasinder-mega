import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    
    // Robotik Sorgu: Üyenin geçmişini tara
    const stats = await prisma.mediation.findMany({
      where: { mediatorId: userId }
    });

    // Puan hesaplama simülasyonu
    const completed = stats.filter(s => s.status === 'TAMAMLANDI').length;
    
    return NextResponse.json({
      score: 50 + (completed * 5),
      level: completed > 10 ? 'GOLD' : 'STANDART'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Güven skoru hesaplanamadı.' }, { status: 500 });
  }
}
