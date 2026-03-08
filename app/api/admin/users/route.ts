import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from('User')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Kullanicilar cekilemedi.' }, { status: 500 });
    }

    return NextResponse.json({ users }, { status: 200 });
  } catch (error: unknown) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Kullanicilar cekilemedi.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, status, action } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'Eksik veri.' }, { status: 400 });
    }

    // action veya status parametresini kabul et
    const newStatus = status || (action === 'APPROVE' ? 'APPROVED' : 'REJECTED');
    
    const { data: updatedUser, error } = await supabase
      .from('User')
      .update({ status: newStatus })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: 'Islem basarisiz.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error: unknown) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Islem basarisiz.' }, { status: 500 });
  }
}
}

export async function PUT(request: Request) {
  try {
    const { userId, action } = await request.json();
    if (!userId || !action) return NextResponse.json({ error: 'Eksik veri.' }, { status: 400 });

    const newStatus = action === 'APPROVE' ? 'AKTIF' : 'ENGELLI';
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status: newStatus }
    });

    // Firmaya Onay/Ret Maili At
    const subject = action === 'APPROVE' ? 'TİB Ağı Üyeliğiniz Onaylandı' : 'TİB Ağı Üyelik Başvurunuz Reddedildi';
    const message = action === 'APPROVE' 
      ? 'Tebrikler, kurumsal siciliniz onaylanmıştır. Sisteme giriş yapıp ticarete ve komisyon kazanmaya başlayabilirsiniz.'
      : 'Üyelik başvurunuz platform standartlarını karşılamadığı için reddedilmiştir.';
    
    await sendEmail(
      updatedUser.email,
      subject,
      `<h2>Yönetim Kurulu Kararı</h2><p>${message}</p>`
    );

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'İşlem başarısız.' }, { status: 500 });
  }
}
