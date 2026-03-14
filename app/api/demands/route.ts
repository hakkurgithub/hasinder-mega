import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
