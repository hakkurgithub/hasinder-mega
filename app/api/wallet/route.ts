import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    // Robotik Hesaplama: Tüm aracılık işlemlerini durumuna göre tara
    const mediations = await prisma.mediation.findMany({
      where: { mediatorId: userId }
    });

    const summary = mediations.reduce((acc, curr) => {
      if (curr.status === 'BEKLEMEDE' || curr.status === 'EVRAK_YUKLENDI') {
        acc.pending += curr.commissionAmount;
      } else if (curr.status === 'TAMAMLANDI') {
        acc.available += curr.commissionAmount;
      }
      acc.total += curr.commissionAmount;
      return acc;
    }, { pending: 0, available: 0, total: 0 });

    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json({ error: 'Cüzdan verileri hesaplanamadı.' }, { status: 500 });
  }
}
