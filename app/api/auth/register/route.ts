import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { name, taxNo, sector, role, email, password } = await request.json();

    // Validasyon
    if (!name || !taxNo || !sector || !role || !email || !password) {
      return NextResponse.json({ error: 'Tum alanlar zorunludur.' }, { status: 400 });
    }

    // Email kontrolu
    const { data: existingUser } = await supabase
      .from('User')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'Bu e-posta adresi zaten kayitli.' }, { status: 400 });
    }

    // Sifre hashleme
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanici olusturma
    const { data: user, error } = await supabase
      .from('User')
      .insert({
        name,
        taxNo,
        sector,
        role,
        email,
        password: hashedPassword,
        status: 'PENDING',
        tier: 'STANDARD',
        balance: 0,
        isAdmin: false
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Kayit sirasinda bir hata olustu: ' + error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Kaydiniz basariyla alindi. Onay surecinden sonra giris yapabilirsiniz.' 
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Kayit hatasi:', error);
    return NextResponse.json({ 
      error: 'Kayit sirasinda bir hata olustu.' 
    }, { status: 500 });
  }
}
