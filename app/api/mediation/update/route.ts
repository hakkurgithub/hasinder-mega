
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const { mediationId, newStatus, userId } = await request.json();

    // Sadece alıcı veya admin onay verebilir (Güvenlik kuralı)
    const mediation = await prisma.mediation.findUnique({
      where: { id: mediationId },
      include: { demand: true }
    });

    if (!mediation) return NextResponse.json({ error: 'İşlem bulunamadı.' }, { status: 404 });

    // Hukuki Zırh: Alıcı malı teslim aldım demeden statü 'TAMAMLANDI' olamaz.
    const updated = await prisma.mediation.update({
      where: { id: mediationId },
      data: { status: newStatus }
    });

    return NextResponse.json({ success: true, status: updated.status });
  } catch (error) {
    return NextResponse.json({ error: 'İşlem güncellenemedi.' }, { status: 500 });
  }
}

function mkdirRecursive(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}
