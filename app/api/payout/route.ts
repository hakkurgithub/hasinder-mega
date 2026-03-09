import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { userId, invoiceUrl } = await request.json();

    if (!invoiceUrl) {
      return NextResponse.json({ error: 'Fatura yuklenmeden odeme talebi olusturulamaz.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('Mediation')
      .update({ status: 'ODEME_BEKLIYOR' })
      .eq('mediatorId', userId)
      .eq('status', 'TAMAMLANDI');

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Odeme talebiniz ve faturaniz mali incelemeye alindi.' });
  } catch (error) {
    console.error('Payout error:', error);
    return NextResponse.json({ error: 'Talep iletilemedi.' }, { status: 500 });
  }
}
