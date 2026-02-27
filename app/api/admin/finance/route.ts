import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const finances = await prisma.mediation.findMany({
      where: { status: 'TAMAMLANDI' },
      include: {
        mediator: { select: { name: true, iban: true, taxNo: true } },
        demand: { select: { title: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(finances, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Finansal veriler çekilemedi.' }, { status: 500 });
  }
}
