import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'E-posta ve sifre zorunludur.' }, { status: 400 });
    }

    const supabase = await createClient();
    
    // User tablosundan kullaniciyi bul
    const { data: user, error } = await supabase
      .from('User')
      .select('id, name, email, password, isAdmin, sector, balance, status, title')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Gecersiz e-posta veya sifre.' }, { status: 401 });
    }

    // Basit sifre kontrolu (uretimde hash kullanilmali)
    if (user.password !== password) {
      return NextResponse.json({ error: 'Gecersiz e-posta veya sifre.' }, { status: 401 });
    }

    // Hesap durumu kontrolu
    if (user.status === 'ONAY_BEKLIYOR') {
      return NextResponse.json({ error: 'Hesabiniz henuz onaylanmadi. Lutfen yonetici onayini bekleyin.' }, { status: 403 });
    }

    if (user.status === 'ENGELLI' || user.status === 'BANNED') {
      return NextResponse.json({ error: 'Hesabiniz askiya alinmistir.' }, { status: 403 });
    }

    return NextResponse.json({ 
      success: true, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email,
        isAdmin: user.isAdmin, 
        sector: user.sector, 
        balance: user.balance,
        role: user.title
      } 
    }, { status: 200 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Sunucu hatasi: ' + errorMessage }, { status: 500 });
  }
}
