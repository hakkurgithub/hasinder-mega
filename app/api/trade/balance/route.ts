import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Kullanici bakiyesi ve trade gecmisi
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId gereklidir.' }, { status: 400 });
    }

    // Kullanici bilgilerini cek
    const { data: user, error: userError } = await supabase
      .from('User')
      .select('id, name, balance')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'Kullanici bulunamadi.' }, { status: 404 });
    }

    // Son 10 trade'i cek
    const { data: trades, error: tradesError } = await supabase
      .from('Trade')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
      .limit(10);

    if (tradesError) throw tradesError;

    return NextResponse.json({
      userId: user.id,
      name: user.name,
      balance: user.balance,
      recentTrades: trades || []
    }, { status: 200 });
  } catch (error) {
    console.error('Balance GET Error:', error);
    return NextResponse.json({ error: 'Bakiye bilgisi getirilemedi.' }, { status: 500 });
  }
}
