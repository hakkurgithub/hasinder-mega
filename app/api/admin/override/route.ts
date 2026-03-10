import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { action, targetUserId } = await req.json();
    
    if (action === 'BAN_USER') {
      await prisma.user.update({ 
        where: { id: targetUserId }, 
        data: { status: 'BANNED' } 
      });
    } else if (action === 'RESET_SCORE') {
      // Şemada trustScore olmadığı için şimdilik sadece işlem kaydı tutuyoruz
      console.log(`User ${targetUserId} score reset requested.`);
    }

    return NextResponse.json({ success: true, message: 'İşlem başarıyla uygulandı.' });
  } catch (error) {
    return NextResponse.json({ error: 'İşlem başarısız' }, { status: 500 });
  }
}
