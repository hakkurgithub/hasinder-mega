import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Şemada createdAt yoksa hata verir, güvenli olması için kaldırıldı veya ID ile sıralandı
    const demands = await prisma.demand.findMany({
      include: {
        creator: {
          select: { name: true } // sector alanı şemada yoksa buradan da çıkarıldı
        }
      }
    });
    return NextResponse.json(demands, { status: 200 });
  } catch (error: any) {
    console.error('Demands fetch error:', error);
    return NextResponse.json({ error: 'Talepler çekilirken hata oluştu.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, amount, creatorId } = body;

    if (!title || !amount || !creatorId) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik.' }, { status: 400 });
    }

    const newDemand = await prisma.demand.create({
      data: { 
        title, 
        amount: parseFloat(amount), 
        status: 'BEKLEMEDE',
        creatorId 
      }
    });

    return NextResponse.json({ success: true, demand: newDemand }, { status: 201 });
  } catch (error: any) {
    console.error('Demand create error:', error);
    return NextResponse.json({ error: 'Talep açılamadı.' }, { status: 500 });
  }
}
