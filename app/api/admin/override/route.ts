import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { targetUserId, action, adminSecret } = await request.json();

    // Sadece Baskanin (Admin) bildigi ozel dogrulama
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Yetkisiz erisim! Bu islem kaydedildi.' }, { status: 403 });
    }

    // Hucrelere Mudahale (Full Override)
    if (action === 'BAN_USER') {
      await supabase.from('User').update({ status: 'BANNED' }).eq('id', targetUserId);
    }

    return NextResponse.json({ success: true, message: 'Baskan mudahalesi basariyla uygulandi.' });
  } catch (error) {
    console.error('Admin override error:', error);
    return NextResponse.json({ error: 'Mudahale basarisiz.' }, { status: 500 });
  }
}
