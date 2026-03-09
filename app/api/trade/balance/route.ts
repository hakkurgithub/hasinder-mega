import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Kullanıcı bakiyesi ve trade geçmişi
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId gereklidir.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        balance: true,
        Trades: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    }

    return NextResponse.json({
      userId: user.id,
      name: user.name,
      balance: user.balance,
      recentTrades: user.Trades
    }, { status: 200 });
  } catch (error) {
    console.error('Balance GET Error:', error);
    return NextResponse.json({ error: 'Bakiye bilgisi getirilemedi.' }, { status: 500 });
  }
}
