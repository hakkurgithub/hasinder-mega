import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Tum talepleri listeleme
export async function GET() {
  try {
    const demands = await prisma.demand.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, sector: true }
        }
      }
    });
    return NextResponse.json(demands, { status: 200 });
  } catch (error: unknown) {
    console.error('Demands GET error:', error);
    return NextResponse.json({ error: 'Talepler cekilirken hata olustu.' }, { status: 500 });
  }
}

// Yeni talep olusturma
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, userId } = body;

    if (!title || !userId) {
      return NextResponse.json({ error: 'Baslik ve kullanici ID zorunludur.' }, { status: 400 });
    }

    const newDemand = await prisma.demand.create({
      data: { title, description, userId }
    });

    return NextResponse.json({ success: true, demand: newDemand }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    console.error('Demands POST error:', error);
    return NextResponse.json({ error: 'Talep acilamadi: ' + errorMessage }, { status: 500 });
  }
}
