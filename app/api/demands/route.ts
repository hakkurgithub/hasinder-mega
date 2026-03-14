import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'has-insan-2026-ozel-anahtar');

// Talepleri listele (GET)
export async function GET() {
  try {
    const demands = await prisma.demand.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { creator: true }
    });

    return NextResponse.json(demands);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Veritabanı hatası', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Yeni talep oluştur (POST)
export async function POST(request: Request) {
  try {
    // Auth kontrolü
    const token = (await cookies()).get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Giriş yapmalısınız' }, { status: 401 });
    }

    // Token doğrulama
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.userId as string;

    const { title, amount } = await request.json();

    // Validasyon
    if (!title || !amount) {
      return NextResponse.json({ error: 'Başlık ve miktar zorunludur' }, { status: 400 });
    }

    // Talep oluştur
    const demand = await prisma.demand.create({
      data: {
        title,
        amount: parseFloat(amount),
        creatorId: userId,
        status: 'BEKLEMEDE'
      },
      include: { creator: true }
    });

    return NextResponse.json(demand, { status: 201 });
  } catch (error) {
    console.error('Create demand error:', error);
    return NextResponse.json(
      { error: 'Talep oluşturulamadı' },
      { status: 500 }
    );
  }
}
