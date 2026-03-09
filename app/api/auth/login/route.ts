import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'E-posta ve şifre zorunludur.' }, { status: 400 });
    }

    const supabase = await createClient();
    
    const { data: users, error: queryError } = await supabase
      .from('User')
      .select('id, name, role, sector, balance, password')
      .eq('email', email)
      .single();

    if (queryError || !users) {
      return NextResponse.json({ error: 'Geçersiz e-posta veya şifre.' }, { status: 401 });
    }

    // Basit doğrulama (Canlıda şifreler hash'li karşılaştırılacak)
    if (users.password !== password) {
      return NextResponse.json({ error: 'Geçersiz e-posta veya şifre.' }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true, 
      user: { id: users.id, name: users.name, role: users.role, sector: users.sector, balance: users.balance } 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: 'Sunucu hatası: ' + error.message }, { status: 500 });
  }
}
