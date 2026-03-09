import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const finances = await prisma.mediation.findMany({
      where: { status: 'TAMAMLANDI' },
      include: {
        mediator: { select: { name: true, taxNo: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(finances, { status: 200 });
  } catch (error) {
    console.error('Finans API Hatası:', error);
    return NextResponse.json({ error: 'Finansal veriler çekilemedi.' }, { status: 500 });
  }
}
