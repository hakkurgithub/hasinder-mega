import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const trades = await prisma.trade.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(trades);
  } catch (error) {
    console.error('API Hatası:', error);
    return NextResponse.json({ 
      error: 'Trades yüklenemedi',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { category, title, amount, status } = await request.json();
    
    const trade = await prisma.trade.create({
      data: {
        category,
        title,
        amount,
        status: status || 'AKTIF'
      }
    });
    
    return NextResponse.json({ message: 'Trade başarıyla eklendi', trade }, { status: 201 });
  } catch (error) {
    console.error('API Hatası (POST):', error);
    return NextResponse.json({ 
      error: 'Trade eklenemedi',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}
