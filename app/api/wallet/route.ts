import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { userId } = await request.json();

    const { data: mediations, error } = await supabase
      .from('Mediation')
      .select('status')
      .eq('mediatorId', userId);

    if (error) throw error;

    const summary = (mediations || []).reduce((acc: { pending: number; available: number; total: number }, curr: { status: string }) => {
      if (curr.status === 'BEKLEMEDE' || curr.status === 'EVRAK_YUKLENDI') {
        acc.pending += 1;
      } else if (curr.status === 'TAMAMLANDI') {
        acc.available += 1;
      }
      acc.total += 1;
      return acc;
    }, { pending: 0, available: 0, total: 0 });

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Wallet error:', error);
    return NextResponse.json({ error: 'Cuzdan verileri hesaplanamadi.' }, { status: 500 });
  }
}
