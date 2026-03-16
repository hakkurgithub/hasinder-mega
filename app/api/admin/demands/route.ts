import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

async function verifyAdminToken() {
  const cookieStore = await cookies(); // <-- await eklendi!
  const token = cookieStore.get('token')?.value;
  
  if (!token) return null;
  
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
    const { payload } = await jwtVerify(token, secret);
    return payload.isAdmin ? payload : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const admin = await verifyAdminToken();
  if (!admin) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 });
  }

  try {
    const demands = await prisma.demand.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(demands);
  } catch (error) {
    return NextResponse.json({ error: 'İlanlar çekilemedi' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await verifyAdminToken();
  if (!admin) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 });
  }

  try {
    const { demandId } = await request.json();
    
    await prisma.demand.delete({
      where: { id: demandId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Silme hatası' }, { status: 500 });
  }
}
