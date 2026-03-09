import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { userId } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Kullanici ID eksik.' }, { status: 400 });

    const { data: user, error } = await supabase
      .from('User')
      .select('id, name, email, taxNo, sector, isAdmin, title')
      .eq('id', userId)
      .single();

    if (error || !user) return NextResponse.json({ error: 'Kullanici bulunamadi.' }, { status: 404 });
    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    console.error('Profile POST error:', error);
    return NextResponse.json({ error: 'Sunucu hatasi.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const { userId, name, newPassword } = await request.json();
    if (!userId) return NextResponse.json({ error: 'Eksik veri.' }, { status: 400 });

    const updateData: Record<string, string> = {};
    if (name !== undefined) updateData.name = name;
    if (newPassword) updateData.password = newPassword;

    const { data: updatedUser, error } = await supabase
      .from('User')
      .update(updateData)
      .eq('id', userId)
      .select('id, name, email')
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Profil basariyla guncellendi.', user: updatedUser }, { status: 200 });
  } catch (error: unknown) {
    console.error('Profile PUT error:', error);
    return NextResponse.json({ error: 'Guncelleme basarisiz.' }, { status: 500 });
  }
}
