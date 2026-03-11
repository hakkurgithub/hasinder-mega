import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const routes = await prisma.logisticsRoute.findMany({
      where: { status: 'AKTIF' },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(routes);
  } catch (error) {
    return NextResponse.json({ error: 'Rotalar çekilemedi' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newRoute = await prisma.logisticsRoute.create({
      data: {
        origin: body.origin,
        destination: body.destination,
        vehicleType: body.vehicleType,
        capacity: body.capacity,
        targetPrice: body.targetPrice ? parseFloat(body.targetPrice) : null,
        status: 'AKTIF'
      }
    });
    return NextResponse.json(newRoute, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Rota oluşturulamadı' }, { status: 500 });
  }
}
