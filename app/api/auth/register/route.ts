import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { name, taxNo, sector, role, email, password } = await request.json();

    // Zorunlu alan kontrolu
    if (!name || !taxNo || !sector || !role || !email || !password) {
      return NextResponse.json({ error: 'Tum alanlari doldurunuz.' }, { status: 400 });
    }

    const supabase = await createClient();

    // Email zaten kayitli mi kontrol et
    const { data: existingUser } = await supabase
      .from('User')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'Bu e-posta adresi zaten kayitli.' }, { status: 400 });
    }

    // Yeni kullaniciyi kaydet
    const { data: newUser, error } = await supabase
      .from('User')
      .insert({
        name,
        taxNo,
        sector,
        title: role, // role bilgisini title alanina kaydediyoruz
        email,
        password, // Gercek uygulamada hash'lenmeli
        balance: 0,
        isAdmin: false,
        status: 'ONAY_BEKLIYOR',
        tier: 'STANDART'
      })
      .select()
      .single();

    if (error) {
      console.error('Register error:', error);
      return NextResponse.json({ error: 'Kayit sirasinda hata olustu: ' + error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Kaydiniz alindi! Yonetim onayindan sonra giris yapabilirsiniz.',
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Sistemsel hata: ' + errorMessage }, { status: 500 });
  }
}
