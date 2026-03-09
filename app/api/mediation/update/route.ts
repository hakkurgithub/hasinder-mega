import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const { mediationId, newStatus } = await request.json();

    const { data: mediation, error: findError } = await supabase
      .from('Mediation')
      .select('id')
      .eq('id', mediationId)
      .single();

    if (findError || !mediation) return NextResponse.json({ error: 'Islem bulunamadi.' }, { status: 404 });

    const { data: updated, error: updateError } = await supabase
      .from('Mediation')
      .update({ status: newStatus })
      .eq('id', mediationId)
      .select('status')
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, status: updated.status });
  } catch (error) {
    console.error('Mediation update error:', error);
    return NextResponse.json({ error: 'Islem guncellenemedi.' }, { status: 500 });
  }
}
