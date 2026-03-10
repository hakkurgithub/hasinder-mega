import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tüm talepleri listeleme
export async function GET() {
  try {
    const demands = await prisma.demand.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        Mediations: {
          select: { id: true, status: true, amount: true }
        }
      }
    });
    return NextResponse.json(demands ?? [], { status: 200 });
  } catch (error: any) {
    console.error('Demands GET Error:', error);
    return NextResponse.json({ error: 'Talepler çekilirken hata oluştu.' }, { status: 500 });
  }
}

// Yeni talep oluşturma
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json({ error: 'Talep başlığı zorunludur.' }, { status: 400 });
    }

    const newDemand = await prisma.demand.create({
      data: { 
        title, 
        description: description || null,
        status: 'BEKLEMEDE'
      }
    });

    return NextResponse.json({ success: true, demand: newDemand }, { status: 201 });
  } catch (error: any) {
    console.error('Demands POST Error:', error);
    return NextResponse.json({ error: 'Talep açılamadı: ' + error.message }, { status: 500 });
  }
}
