import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // TypeScript yerel tiplerle inatlaştığı için 'as any' ile geçiyoruz
    const finances = await (prisma.mediation.findMany as any)({
      where: { status: 'TAMAMLANDI' },
      include: {
        mediator: { 
          select: { 
            name: true, 
            iban: true, 
            taxNo: true 
          } 
        },
        demand: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(finances);
  } catch (error) {
    console.error('Finance fetch error:', error);
    return NextResponse.json(
      { error: 'Finansal veriler alınamadı.' }, 
      { status: 500 }
    );
  }
}
