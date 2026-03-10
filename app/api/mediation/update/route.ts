
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const { mediationId, newStatus } = await request.json();

    if (!mediationId || !newStatus) {
      return NextResponse.json({ error: 'Eksik veri.' }, { status: 400 });
    }

    // Mediation'ın var olup olmadığını kontrol et
    const mediation = await prisma.mediation.findUnique({
      where: { id: mediationId },
      include: { demand: true }
    });

    if (!mediation) return NextResponse.json({ error: 'İşlem bulunamadı.' }, { status: 404 });

    // Mediation durumunu güncelle
    const updated = await prisma.mediation.update({
      where: { id: mediationId },
      data: { status: newStatus }
    });

    return NextResponse.json({ success: true, status: updated.status });
  } catch (error: any) {
    console.error('Mediation Update Error:', error);
    return NextResponse.json({ error: 'İşlem güncellenemedi.' }, { status: 500 });
  }
}
