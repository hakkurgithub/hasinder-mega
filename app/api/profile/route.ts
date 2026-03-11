import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) return NextResponse.json({ error: 'UserID gerekli' }, { status: 400 });

    const user = await (prisma.user.findUnique as any)({
      where: { id: userId },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        taxNo: true, 
        sector: true, 
        role: true, 
        iban: true, 
        phone: true 
      }
    });

    if (!user) return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Profil yüklenemedi.' }, { status: 500 });
  }
}
