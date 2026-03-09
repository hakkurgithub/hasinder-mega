import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { userId, symbol, quantity, price } = body;

    if (!userId || !symbol || !quantity || !price) {
      return NextResponse.json(
        { error: 'userId, symbol, quantity ve price gereklidir.' },
        { status: 400 }
      );
    }

    const total = quantity * price;

    // Kullanici bakiyesini kontrol et
    const { data: user, error: userError } = await supabase
      .from('User')
      .select('balance')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'Kullanici bulunamadi.' }, { status: 404 });
    }

    if (user.balance < total) {
      return NextResponse.json({ error: 'Yetersiz bakiye.' }, { status: 400 });
    }

    // Trade olustur
    const { data: trade, error: tradeError } = await supabase
      .from('Trade')
      .insert({
        type: 'BUY',
        symbol,
        quantity,
        price,
        total,
        status: 'COMPLETED',
        userId
      })
      .select()
      .single();

    if (tradeError) throw tradeError;

    // Bakiyeyi guncelle
    const { error: updateError } = await supabase
      .from('User')
      .update({ balance: user.balance - total })
      .eq('id', userId);

    if (updateError) throw updateError;

    return NextResponse.json({ 
      message: 'Alim islemi basarili.',
      trade 
    }, { status: 201 });
  } catch (error) {
    console.error('Trade Buy Error:', error);
    return NextResponse.json({ error: 'Alim islemi basarisiz.' }, { status: 500 });
  }
}
