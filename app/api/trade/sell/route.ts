import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, symbol, quantity, price } = body;

    if (!userId || !symbol || !quantity || !price) {
      return NextResponse.json(
        { error: 'userId, symbol, quantity ve price gereklidir.' },
        { status: 400 }
      );
    }

    const total = quantity * price;

    // Trade oluştur ve bakiyeyi güncelle
    const [trade] = await prisma.$transaction([
      prisma.trade.create({
        data: {
          type: 'SELL',
          symbol,
          quantity,
          price,
          total,
          status: 'COMPLETED',
          userId
        }
      }),
      prisma.user.update({
        where: { id: userId },
        data: { balance: { increment: total } }
      })
    ]);

    return NextResponse.json({ 
      message: 'Satış işlemi başarılı.',
      trade 
    }, { status: 201 });
  } catch (error) {
    console.error('Trade Sell Error:', error);
    return NextResponse.json({ error: 'Satış işlemi başarısız.' }, { status: 500 });
  }
}
