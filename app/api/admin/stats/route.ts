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
    const stats = await prisma.$transaction([
      prisma.user.count(),
      prisma.demand.count(),
      prisma.user.count({ where: { status: 'AKTIF' } }),
      prisma.demand.count({ where: { status: 'BEKLEMEDE' } })
    ]);

    return NextResponse.json({
      totalUsers: stats[0],
      totalDemands: stats[1],
      activeUsers: stats[2],
      pendingDemands: stats[3]
    });
  } catch (error) {
    return NextResponse.json({ error: 'Veri çekme hatası' }, { status: 500 });
  }
}
