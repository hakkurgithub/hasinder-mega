import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Kullanici ID eksik.' }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, taxNo: true, sector: true, isAdmin: true, title: true }
    });

    if (!user) return NextResponse.json({ error: 'Kullanici bulunamadi.' }, { status: 404 });
    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    console.error('Profile POST error:', error);
    return NextResponse.json({ error: 'Sunucu hatasi.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, name, newPassword } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Eksik veri.' }, { status: 400 });

    const updateData: Record<string, string> = {};
    if (name !== undefined) updateData.name = name;
    if (newPassword) updateData.password = newPassword;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, name: true, email: true }
    });

    return NextResponse.json({ success: true, message: 'Profil basariyla guncellendi.', user: updatedUser }, { status: 200 });
  } catch (error: unknown) {
    console.error('Profile PUT error:', error);
    return NextResponse.json({ error: 'Guncelleme basarisiz.' }, { status: 500 });
  }
}
