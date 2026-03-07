import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, taxNo, sector, role, email, password } = await request.json();

    // Validasyon
    if (!name || !taxNo || !sector || !role || !email || !password) {
      return NextResponse.json({ error: 'Tum alanlar zorunludur.' }, { status: 400 });
    }

    // Email kontrolu
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Bu e-posta adresi zaten kayitli.' }, { status: 400 });
    }

    // Sifre hashleme
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanici olusturma
    const user = await prisma.user.create({
      data: {
        name,
        taxNo,
        sector,
        role,
        email,
        password: hashedPassword,
        status: 'PENDING',
        tier: 'STANDARD'
      }
    });

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
