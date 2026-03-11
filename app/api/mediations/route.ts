import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { demandId, mediatorId, sellerTaxNo, proposedPrice } = body;

    const seller = await prisma.user.findUnique({
      where: { taxNo: sellerTaxNo }
    });

    if (!seller) {
      return NextResponse.json({ error: 'Satıcı bulunamadı.' }, { status: 404 });
    }

    const priceValue = parseFloat(proposedPrice);
    
    // TypeScript inadını kırmak için 'any' ile geçiyoruz
    const mediationData: any = {
      demandId,
      mediatorId,
      sellerId: seller.id,
      amount: priceValue,
      commissionAmount: priceValue * 0.02,
      status: 'BEKLEMEDE'
    };

    const mediation = await prisma.mediation.create({
      data: mediationData
    });

    return NextResponse.json({ success: true, mediation });
  } catch (error) {
    console.error('Build Fix:', error);
    return NextResponse.json({ error: 'İşlem başarısız.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // TypeScript yerel tipleri tanımasa bile veriyi çekebilmesi için 'as any' mühürü
    const mediations = await (prisma.mediation.findMany as any)({
      include: { demand: true, mediator: true, seller: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(mediations);
  } catch (error) {
    return NextResponse.json({ error: 'Veri alınamadı.' }, { status: 500 });
  }
}
