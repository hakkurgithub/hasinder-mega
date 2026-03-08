import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'E-posta ve sifre zorunludur.' }, { status: 400 });
    }

    const { data: user, error } = await supabase
      .from('User')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Gecersiz e-posta veya sifre.' }, { status: 401 });
    }

    // Sifre dogrulama (hash karsilastirma)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Gecersiz e-posta veya sifre.' }, { status: 401 });
    }

    // Hesap durumu kontrolu
    if (user.status === 'PENDING') {
      return NextResponse.json({ error: 'Hesabiniz henuz onaylanmadi.' }, { status: 403 });
    }

    return NextResponse.json({ 
      success: true, 
      user: { 
        id: user.id, 
        name: user.name, 
        role: user.role, 
        sector: user.sector, 
        balance: user.balance,
        isAdmin: user.isAdmin 
      } 
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Login hatasi:', error);
    return NextResponse.json({ error: 'Sunucu hatasi olustu.' }, { status: 500 });
  }
}
