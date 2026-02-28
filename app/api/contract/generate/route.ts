import { NextResponse } from 'next/server';
import { contractHeader, contractBody } from '@/lib/contract/template';

export async function POST(request: Request) {
  try {
    const { mediationId, buyerName, sellerName, productName, commission } = await request.json();
    const date = new Date().toLocaleDateString('tr-TR');
    const contractNo = `TIB-${Date.now()}`;

    const fullContract = contractHeader(contractNo, date) + contractBody(buyerName, sellerName, productName, commission);

    // Otonom Arşivleme: Belgeyi veritabanına veya Cloud Storage'a yolla
    console.log(`��� SÖZLEŞME OLUŞTURULDU: ${contractNo}`);

    return NextResponse.json({ 
      success: true, 
      contractText: fullContract,
      contractNo: contractNo 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Sözleşme botu hata verdi.' }, { status: 500 });
  }
}
