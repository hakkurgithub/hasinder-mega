import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const { mediationId, newStatus } = await request.json();

    const mediation = await prisma.mediation.findUnique({
      where: { id: mediationId }
    });

    if (!mediation) return NextResponse.json({ error: 'Islem bulunamadi.' }, { status: 404 });

    const updated = await prisma.mediation.update({
      where: { id: mediationId },
      data: { status: newStatus }
    });

    return NextResponse.json({ success: true, status: updated.status });
  } catch (error) {
    console.error('Mediation update error:', error);
    return NextResponse.json({ error: 'Islem guncellenemedi.' }, { status: 500 });
  }
}
