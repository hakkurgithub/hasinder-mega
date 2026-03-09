import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { demandId, mediatorId, title } = body;

    if (!mediatorId || !title) {
      return NextResponse.json({ error: 'Lutfen tum alanlari doldurun.' }, { status: 400 });
    }

    // Mediation olustur
    const { data: mediation, error } = await supabase
      .from('Mediation')
      .insert({
        title,
        mediatorId,
        demandId: demandId || null,
        status: 'BEKLEMEDE'
      })
      .select()
      .single();

    if (error) throw error;

    // Talep varsa durumunu guncelle
    if (demandId) {
      await supabase
        .from('Demand')
        .update({ status: 'ESLESTI' })
        .eq('id', demandId);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Eslestirme basarili!',
      mediation
    }, { status: 201 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    console.error('Eslestirme Hatasi:', error);
    return NextResponse.json({ error: 'Sistemsel bir hata olustu: ' + errorMessage }, { status: 500 });
  }
}
