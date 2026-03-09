import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Kullanıcının emirlerini getir
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId gereklidir.' }, { status: 400 });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Orders GET Error:', error);
    return NextResponse.json({ error: 'Emirler getirilemedi.' }, { status: 500 });
  }
}

// Yeni emir oluştur
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, type, side, symbol, quantity, price } = body;

    if (!userId || !type || !side || !symbol || !quantity) {
      return NextResponse.json(
        { error: 'userId, type, side, symbol ve quantity gereklidir.' },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        type,
        side,
        symbol,
        quantity,
        price: price || null,
        status: 'OPEN',
        userId
      }
    });

    return NextResponse.json({ 
      message: 'Emir oluşturuldu.',
      order 
    }, { status: 201 });
  } catch (error) {
    console.error('Orders POST Error:', error);
    return NextResponse.json({ error: 'Emir oluşturulamadı.' }, { status: 500 });
  }
}

// Emir iptal et
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'orderId gereklidir.' }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' }
    });

    return NextResponse.json({ 
      message: 'Emir iptal edildi.',
      order 
    }, { status: 200 });
  } catch (error) {
    console.error('Orders DELETE Error:', error);
    return NextResponse.json({ error: 'Emir iptal edilemedi.' }, { status: 500 });
  }
}
