import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Kullanıcı ID eksik.' }, { status: 400 });

    const supabase = await createClient();
    const { data: user, error } = await supabase
      .from('User')
      .select('id, name, email, taxNo, sector, role, iban, phone')
      .eq('id', userId)
      .single();

    if (error || !user) return NextResponse.json({ error: 'Kullanıcı bulunamadı.' }, { status: 404 });
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, iban, phone, newPassword } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Eksik veri.' }, { status: 400 });

    const supabase = await createClient();
    const updateData: any = {};
    if (iban !== undefined) updateData.iban = iban;
    if (phone !== undefined) updateData.phone = phone;
    if (newPassword) updateData.password = newPassword;

    const { data: updatedUser, error } = await supabase
      .from('User')
      .update(updateData)
      .eq('id', userId)
      .select('id, name, iban, phone')
      .single();

    if (error) return NextResponse.json({ error: 'Güncelleme başarısız.' }, { status: 500 });
    return NextResponse.json({ success: true, message: 'Profil başarıyla güncellendi.', user: updatedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız.' }, { status: 500 });
  }
}
