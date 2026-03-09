import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Haber tablosu tanimlaninca aktif edilecek
    return NextResponse.json({ message: 'Haber basariyla silindi (test modu)', id });
  } catch (error) {
    console.error('Haber silinirken hata:', error);
    return NextResponse.json({ error: 'Haber silinemedi' }, { status: 500 });
  }
}
