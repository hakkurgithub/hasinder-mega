import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, inviteCode } = await request.json();
  
  // Sadece yetkili davet kodlarini kabul et (Örn: HASINDER2026)
  if (inviteCode !== 'HASINDER2026') {
    return NextResponse.json({ error: 'Gecersiz Davet Kodu' }, { status: 403 });
  }

  return NextResponse.json({ success: true, message: 'Kayit Alindi, OTP Bekleniyor' });
}
