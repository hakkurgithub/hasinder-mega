import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const finances = await prisma.mediation.findMany({
      where: { status: 'TAMAMLANDI' },
      include: {
        mediator: { 
          select: { 
            name: true, 
            iban: true, 
            taxNo: true 
          } 
        },
        demand: true  // Eksikse ekle
      },
    });

    return NextResponse.json(finances);
  } catch (error) {
    console.error('Finance fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch finances' }, 
      { status: 500 }
    );
  }
}