import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Geçersiz bilgiler' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: { 
        id: user.id, 
        name: user.name, 
        isAdmin: user.isAdmin, 
        tier: user.tier,
        balance: user.balance 
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Giriş yapılamadı' }, { status: 500 });
  }
}
