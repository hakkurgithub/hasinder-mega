import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'E-posta ve şifre zorunludur.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Basit dogrulama (Canlida sifreler hash'li karsilastirilacak)
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Gecersiz e-posta veya sifre.' }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, name: user.name, isAdmin: user.isAdmin, sector: user.sector, balance: user.balance } 
    }, { status: 200 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Sunucu hatasi: ' + errorMessage }, { status: 500 });
  }
}
