import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const mediations = await prisma.mediation.findMany({
      include: {
        demand: { select: { title: true } },
        mediator: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(mediations);
  } catch (error) {
    return NextResponse.json({ error: 'Veriler alınamadı' }, { status: 500 });
  }
}
