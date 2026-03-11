import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { baslik, icerik, resim } = await req.json();
    
    // v0'dan gelen Türkçe verileri Prisma'nın İngilizce alanlarına mühürle
    const haber = await prisma.haber.create({
      data: {
        title: baslik,
        content: icerik,
        image: resim || null
      }
    });

    return NextResponse.json({ success: true, haber });
  } catch (error) {
    return NextResponse.json({ error: 'Haber eklenemedi' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const haberler = await prisma.haber.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(haberler);
  } catch (error) {
    return NextResponse.json({ error: 'Haberler alınamadı' }, { status: 500 });
  }
}
