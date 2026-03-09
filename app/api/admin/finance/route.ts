import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: finances, error } = await supabase
      .from('Mediation')
      .select('*, User(name, taxNo)')
      .eq('status', 'TAMAMLANDI')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return NextResponse.json(finances, { status: 200 });
  } catch (error) {
    console.error('Finans API Hatasi:', error);
    return NextResponse.json({ error: 'Finansal veriler cekilemedi.' }, { status: 500 });
  }
}
