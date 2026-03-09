import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Tum talepleri listeleme
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: demands, error } = await supabase
      .from('Demand')
      .select('*, User(name, sector)')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return NextResponse.json(demands, { status: 200 });
  } catch (error: unknown) {
    console.error('Demands GET error:', error);
    return NextResponse.json({ error: 'Talepler cekilirken hata olustu.' }, { status: 500 });
  }
}

// Yeni talep olusturma
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { title, description, userId } = body;

    if (!title || !userId) {
      return NextResponse.json({ error: 'Baslik ve kullanici ID zorunludur.' }, { status: 400 });
    }

    const { data: newDemand, error } = await supabase
      .from('Demand')
      .insert({ title, description, userId })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, demand: newDemand }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    console.error('Demands POST error:', error);
    return NextResponse.json({ error: 'Talep acilamadi: ' + errorMessage }, { status: 500 });
  }
}
