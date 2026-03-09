import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: pendingMediations, error } = await supabase
      .from('Mediation')
      .select('*, User(name)')
      .eq('status', 'BEKLEMEDE')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return NextResponse.json(pendingMediations, { status: 200 });
  } catch (error: unknown) {
    console.error('Admin mediations GET error:', error);
    return NextResponse.json({ error: 'Eslesmeler cekilemedi.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const { mediationId } = await request.json();
    if (!mediationId) return NextResponse.json({ error: 'Eksik veri.' }, { status: 400 });

    // 1. Eslesmeyi ONAYLANDI yap
    const { data: mediation, error: updateError } = await supabase
      .from('Mediation')
      .update({ status: 'ONAYLANDI' })
      .eq('id', mediationId)
      .select()
      .single();

    if (updateError) throw updateError;

    // 2. Talebi TAMAMLANDI yap (eger demandId varsa)
    if (mediation.demandId) {
      await supabase
        .from('Demand')
        .update({ status: 'TAMAMLANDI' })
        .eq('id', mediation.demandId);
    }

    return NextResponse.json({ success: true, message: 'Ticaret tamamlandi.' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Admin mediations PUT error:', error);
    return NextResponse.json({ error: 'Islem basarisiz.' }, { status: 500 });
  }
}
