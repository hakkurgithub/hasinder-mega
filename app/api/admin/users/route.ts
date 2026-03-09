import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/mailer';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: pendingUsers, error } = await supabase
      .from('User')
      .select('*')
      .eq('status', 'ONAY_BEKLIYOR')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return NextResponse.json(pendingUsers, { status: 200 });
  } catch (error: unknown) {
    console.error('Admin users GET error:', error);
    return NextResponse.json({ error: 'Kullanicilar cekilemedi.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const { userId, action } = await request.json();
    if (!userId || !action) return NextResponse.json({ error: 'Eksik veri.' }, { status: 400 });

    const newStatus = action === 'APPROVE' ? 'AKTIF' : 'ENGELLI';
    
    const { data: updatedUser, error } = await supabase
      .from('User')
      .update({ status: newStatus })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    // Firmaya Onay/Ret Maili At
    const subject = action === 'APPROVE' ? 'TIB Agi Uyeliginiz Onaylandi' : 'TIB Agi Uyelik Basvurunuz Reddedildi';
    const message = action === 'APPROVE' 
      ? 'Tebrikler, kurumsal siciliniz onaylanmistir. Sisteme giris yapip ticarete ve komisyon kazanmaya baslayabilirsiniz.'
      : 'Uyelik basvurunuz platform standartlarini karsilamadigi icin reddedilmistir.';
    
    await sendEmail(
      updatedUser.email,
      subject,
      `<h2>Yonetim Kurulu Karari</h2><p>${message}</p>`
    );

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error: unknown) {
    console.error('Admin users PUT error:', error);
    return NextResponse.json({ error: 'Islem basarisiz.' }, { status: 500 });
  }
}
