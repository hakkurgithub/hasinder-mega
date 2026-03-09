import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Kullanicinin emirlerini getir
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId gereklidir.' }, { status: 400 });
    }

    const { data: orders, error } = await supabase
      .from('Order')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Orders GET Error:', error);
    return NextResponse.json({ error: 'Emirler getirilemedi.' }, { status: 500 });
  }
}

// Yeni emir olustur
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { userId, type, side, symbol, quantity, price } = body;

    if (!userId || !type || !side || !symbol || !quantity) {
      return NextResponse.json(
        { error: 'userId, type, side, symbol ve quantity gereklidir.' },
        { status: 400 }
      );
    }

    const { data: order, error } = await supabase
      .from('Order')
      .insert({
        type,
        side,
        symbol,
        quantity,
        price: price || null,
        status: 'OPEN',
        userId
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      message: 'Emir olusturuldu.',
      order 
    }, { status: 201 });
  } catch (error) {
    console.error('Orders POST Error:', error);
    return NextResponse.json({ error: 'Emir olusturulamadi.' }, { status: 500 });
  }
}

// Emir iptal et
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'orderId gereklidir.' }, { status: 400 });
    }

    const { data: order, error } = await supabase
      .from('Order')
      .update({ status: 'CANCELLED' })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      message: 'Emir iptal edildi.',
      order 
    }, { status: 200 });
  } catch (error) {
    console.error('Orders DELETE Error:', error);
    return NextResponse.json({ error: 'Emir iptal edilemedi.' }, { status: 500 });
  }
}
