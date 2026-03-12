import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'has-insan-2026-ozel-anahtar');

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    // Geçici Düz Metin Kontrolü (Sadece ilk göç aşaması için)
    const isPlainValid = user.password === password;

    if (!isPasswordValid && !isPlainValid) {
      return NextResponse.json({ error: 'Hatalı şifre' }, { status: 401 });
    }

    const token = await new SignJWT({ userId: user.id, role: user.role, isAdmin: user.isAdmin })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    (await cookies()).set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24
    });

    return NextResponse.json({ success: true, user: { name: user.name, role: user.role } });
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
