import { NextRequest, NextResponse } from 'next/server';

// Haber tablosu henuz tanimli degil - gecici cozum
export async function GET() {
  try {
    // Simdilik bos liste don
    return NextResponse.json([]);
  } catch (error) {
    console.error('API Hatasi:', error);
    return NextResponse.json({ 
      error: 'Haberler yuklenemedi',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { baslik } = await request.json();
    
    // Haber tablosu tanimlaninca aktif edilecek
    return NextResponse.json({ message: 'Haber basariyla eklendi (test modu)', baslik }, { status: 201 });
  } catch (error) {
    console.error('API Hatasi (POST):', error);
    return NextResponse.json({ 
      error: 'Haber eklenemedi',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}
