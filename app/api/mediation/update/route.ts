import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const { mediationId, newStatus } = await request.json();

    // Arabuluculuk kaydını bul ve ilişkili talebi kontrol et
    const mediation = await prisma.mediation.findUnique({
      where: { id: mediationId },
      include: { demand: true }
    });

    if (!mediation) {
      return NextResponse.json({ error: 'İşlem bulunamadı.' }, { status: 404 });
    }

    // Statü Güncelleme (Hukuki Zırh: Alıcı onayı vb. kontroller panelden yönetilir)
    const updated = await prisma.mediation.update({
      where: { id: mediationId },
      data: { status: newStatus }
    });

    return NextResponse.json({ success: true, status: updated.status });
  } catch (error) {
    console.error('Mediation update error:', error);
    return NextResponse.json({ error: 'İşlem güncellenemedi.' }, { status: 500 });
  }
}
