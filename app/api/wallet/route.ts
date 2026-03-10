import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'Kullanici ID eksik.' }, { status: 400 });
    }

    // Kullanicinin mevcut bakiyesini al
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'Kullanici bulunamadi.' }, { status: 404 });
    }

    // Robotik Hesaplama: Tum aracilik islemlerini durumuna gore tara
    const mediations = await prisma.mediation.findMany({
      where: { mediatorId: userId }
    });

    const summary = (mediations ?? []).reduce((acc, curr) => {
      const amount = curr.amount ?? 0;
      if (curr.status === 'BEKLEMEDE' || curr.status === 'EVRAK_YUKLENDI') {
        acc.pending += amount;
      } else if (curr.status === 'TAMAMLANDI' || curr.status === 'ONAYLANDI') {
        acc.available += amount;
      }
      acc.total += amount;
      return acc;
    }, { pending: 0, available: 0, total: 0 });

    return NextResponse.json({
      ...summary,
      currentBalance: user.balance ?? 0
    });
  } catch (error: any) {
    console.error('Wallet Error:', error);
    return NextResponse.json({ error: 'Cuzdan verileri hesaplanamadi.' }, { status: 500 });
  }
}
