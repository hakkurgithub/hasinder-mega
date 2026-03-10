import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Tüm mediations'ları listele
export async function GET() {
  try {
    const mediations = await prisma.mediation.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        mediator: { select: { id: true, name: true, email: true } },
        demand: { select: { id: true, title: true, status: true } }
      }
    });
    return NextResponse.json(mediations ?? [], { status: 200 });
  } catch (error: any) {
    console.error('Mediations GET Error:', error);
    return NextResponse.json({ error: 'Eşleşmeler çekilemedi.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { demandId, mediatorId, proposedPrice } = body;

    if (!demandId || !mediatorId) {
      return NextResponse.json({ error: 'Talep ID ve Aracı ID zorunludur.' }, { status: 400 });
    }

    // Aracının var olup olmadığını kontrol et
    const mediator = await prisma.user.findUnique({
      where: { id: mediatorId }
    });

    if (!mediator) {
      return NextResponse.json({ error: 'Aracı bulunamadı.' }, { status: 404 });
    }

    // Talebin var olup olmadığını kontrol et
    const demand = await prisma.demand.findUnique({
      where: { id: demandId }
    });

    if (!demand) {
      return NextResponse.json({ error: 'Talep bulunamadı.' }, { status: 404 });
    }

    // Komisyon tutarını hesapla (varsa)
    const priceValue = proposedPrice ? parseFloat(proposedPrice) : 0;
    const commissionAmount = priceValue > 0 ? priceValue * 0.02 : 0; // %2 Bilgi Komisyonu

    // Eşleştirmeyi (Mediation) Veritabanına Kaydet
    const mediation = await prisma.mediation.create({
      data: {
        demandId,
        mediatorId,
        amount: commissionAmount,
        status: 'BEKLEMEDE'
      }
    });

    // Talebin durumunu 'ESLESTI' olarak güncelle
    await prisma.demand.update({
      where: { id: demandId },
      data: { status: 'ESLESTI' }
    });

    return NextResponse.json({ 
      success: true, 
      mediation,
      message: commissionAmount > 0 
        ? `Esleştirme Başarılı! İşlem tamamlandığında hesabınıza ${commissionAmount.toFixed(2)} TL komisyon yatırılacaktır.`
        : 'Eşleştirme başarıyla oluşturuldu.'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Eşleştirme Hatası:', error);
    return NextResponse.json({ error: 'Sistemsel bir hata oluştu: ' + error.message }, { status: 500 });
  }
}
