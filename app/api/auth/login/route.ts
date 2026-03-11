import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'has-insan-2026-ozel-anahtar');

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || user.password !== password) { // Not: Normalde bcrypt ile kontrol edilmeli
      return NextResponse.json({ error: 'Hatalı e-posta veya şifre' }, { status: 401 });
    }

    // JWT mühürleme (Tier alanı kaldırıldı, sadece şemadaki alanlar eklendi)
    const token = await new SignJWT({ 
      userId: user.id, 
      role: user.role,
      isAdmin: user.isAdmin 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    // Cookie mühürleme
    (await cookies()).set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 saat
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role,
        balance: user.balance,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Giriş işlemi başarısız' }, { status: 500 });
  }
}
