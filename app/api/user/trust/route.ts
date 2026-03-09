import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { userId } = await request.json();
    
    const { data: stats, error } = await supabase
      .from('Mediation')
      .select('status')
      .eq('mediatorId', userId);

    if (error) throw error;

    const completed = (stats || []).filter((s: { status: string }) => s.status === 'TAMAMLANDI').length;
    
    return NextResponse.json({
      score: 50 + (completed * 5),
      level: completed > 10 ? 'GOLD' : 'STANDART'
    });
  } catch (error) {
    console.error('Trust score error:', error);
    return NextResponse.json({ error: 'Guven skoru hesaplanamadi.' }, { status: 500 });
  }
}
