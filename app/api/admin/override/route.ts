import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { targetUserId, action, adminSecret } = await request.json();

    // Sadece Başkanın (Admin) bildiği özel doğrulama
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Yetkisiz erişim! Bu işlem kaydedildi.' }, { status: 403 });
    }

    // Hücrelere Müdahale (Full Override)
    if (action === 'BAN_USER') {
      await prisma.user.update({ where: { id: targetUserId }, data: { status: 'BANNED' } });
    } else if (action === 'RESET_SCORE') {
      await prisma.user.update({ where: { id: targetUserId }, data: { trustScore: 100 } });
    }

    return NextResponse.json({ success: true, message: 'Başkan müdahalesi başarıyla uygulandı.' });
  } catch (error) {
    return NextResponse.json({ error: 'Müdahale başarısız.' }, { status: 500 });
  }
}
