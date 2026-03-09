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

    // Kullanıcı bakiyesini kontrol et
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    }

    if (user.balance < total) {
      return NextResponse.json({ error: 'Yetersiz bakiye.' }, { status: 400 });
    }

    // Trade oluştur ve bakiyeyi güncelle
    const [trade] = await prisma.$transaction([
      prisma.trade.create({
        data: {
          type: 'BUY',
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
        data: { balance: { decrement: total } }
      })
    ]);

    return NextResponse.json({ 
      message: 'Alım işlemi başarılı.',
      trade 
    }, { status: 201 });
  } catch (error) {
    console.error('Trade Buy Error:', error);
    return NextResponse.json({ error: 'Alım işlemi başarısız.' }, { status: 500 });
  }
}
