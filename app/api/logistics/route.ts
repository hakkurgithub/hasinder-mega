import { NextResponse } from 'next/server';

// LogisticsRoute tablosu henuz tanimli degil - gecici cozum
export async function GET() {
  try {
    // Simdilik bos liste don
    return NextResponse.json([], { status: 200 });
  } catch (error: unknown) {
    console.error('Logistics GET error:', error);
    return NextResponse.json({ error: 'Lojistik rotalari cekilirken hata olustu.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { origin, destination, vehicleType, capacity } = body;

    if (!origin || !destination || !vehicleType || !capacity) {
      return NextResponse.json({ error: 'Lutfen zorunlu lojistik alanlarini doldurun.' }, { status: 400 });
    }

    // LogisticsRoute tablosu tanimlaninca aktif edilecek
    return NextResponse.json({ success: true, message: 'Rota kaydedildi (test modu)' }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    return NextResponse.json({ error: 'Rota olusturulamadi: ' + errorMessage }, { status: 500 });
  }
}
