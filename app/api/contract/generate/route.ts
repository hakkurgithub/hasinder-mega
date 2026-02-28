import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { mediationId, buyerName, sellerName, productName, commission } = await request.json();
    const date = new Date().toLocaleDateString('tr-TR');
    const contractNo = `TIB-${Date.now()}`;

    const fullContract = `Contract No: ${contractNo} | Date: ${date} | Buyer: ${buyerName} | Seller: ${sellerName}`;

    return NextResponse.json({ 
      success: true, 
      contractText: fullContract,
      contractNo: contractNo 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Contract Bot Error' }, { status: 500 });
  }
}
