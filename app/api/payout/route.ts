import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId, amount, invoiceUrl } = await request.json();

    // Robotik Kural: Fatura yüklenmeden ödeme talebi oluşturulamaz
    if (!invoiceUrl) {
      return NextResponse.json({ error: 'Fatura yüklenmeden ödeme talebi oluşturulamaz.' }, { status: 400 });
    }

    // Otonom Hakediş Kaydı
    const payoutRequest = await prisma.mediation.updateMany({
      where: { 
        mediatorId: userId,
        status: 'TAMAMLANDI'
      },
      data: {
        status: 'ODEME_BEKLIYOR'
      }
    });

    return NextResponse.json({ success: true, message: 'Ödeme talebiniz ve faturanız mali incelemeye alındı.' });
  } catch (error) {
    return NextResponse.json({ error: 'Talep iletilemedi.' }, { status: 500 });
  }
}
