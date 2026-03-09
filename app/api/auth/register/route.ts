import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { name, email, inviteCode, password } = await request.json();
    
    if (!inviteCode || !email || !password) {
      return NextResponse.json({ error: 'Gerekli alanlar eksik' }, { status: 400 });
    }

    // Davet kodu kontrol - TODO: Supabase'den almanız önerilir
    const validCodes = ['HASINDER2026', 'TEST123', 'DEMO2026'];
    if (!validCodes.includes(inviteCode)) {
      return NextResponse.json({ error: 'Gecersiz Davet Kodu' }, { status: 403 });
    }

    const supabase = await createClient();
    
    // Kullanıcı zaten var mı kontrol et
    const { data: existingUser } = await supabase
      .from('User')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'E-posta zaten kayitli' }, { status: 400 });
    }

    // Yeni kullanıcı oluştur
    const { data: newUser, error: insertError } = await supabase
      .from('User')
      .insert({
        name: name || 'Yeni Kullanıcı',
        email,
        password, // Canlıda hash'lenmelidir
        taxNo: '',
        sector: '',
        role: 'user',
        status: 'active',
        tier: 'basic'
      })
      .select('id, email, name')
      .single();

    if (insertError || !newUser) {
      console.error('Register error:', insertError);
      return NextResponse.json({ error: 'Kayıt başarısız' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Kayıt başarılı. Lütfen giriş yapınız.',
      user: newUser
    }, { status: 201 });

  } catch (error: any) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
