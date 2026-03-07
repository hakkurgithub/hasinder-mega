import asyncio
import os
from prisma import Prisma

async def main():
    prisma = Prisma()
    await prisma.connect()
    
    try:
        # Haber tablosu örnekleri oluştur
        haberler = [
            {
                "baslik": "TIB Ticaret Agi Resmi Olarak Basladi",
                "icerik": "Hatay'in gucunu dijital borsayla birlestiren TIB Ticaret Agi resmi olarak faaliyete basladi. Ilk gun 50+ firma kaydoldu.",
                "resim": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"
            },
            {
                "baslik": "Hasinder 2026 Is Dunyasi Zirvesi Duyuruldu",
                "icerik": "Ocak ayinda duzenlenen zirveye katilan 200'den fazla is insani Hatay ekonomisinin geleceği hakkinda tartistiklar.",
                "resim": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"
            },
            {
                "baslik": "Akilli Eslestirme Sistemi Is Ortakliklari Sagliyor",
                "icerik": "Yapay zeka destekli eslestirme sistemi ilk ayinda 150+ basarili is ortakligi olusturdu.",
                "resim": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"
            }
        ]
        
        for haber in haberler:
            existing = await prisma.haber.find_first(
                where={"baslik": haber["baslik"]}
            )
            if not existing:
                await prisma.haber.create(data=haber)
                print(f"✓ Haber olusturuldu: {haber['baslik']}")
        
        # Trades tablosu ornekleri olustur
        trades = [
            {"category": "İthalatça", "title": "Elektronik Bileşenleri", "amount": "50000", "status": "AKTIF"},
            {"category": "İhracat", "title": "Tekstil Ürünleri", "amount": "75000", "status": "AKTIF"},
            {"category": "Komisyon", "title": "Gıda Ürünleri", "amount": "25000", "status": "AKTIF"},
            {"category": "İthalatça", "title": "Makine Parçaları", "amount": "100000", "status": "AKTIF"},
        ]
        
        for trade in trades:
            existing = await prisma.trade.find_first(
                where={"title": trade["title"]}
            )
            if not existing:
                await prisma.trade.create(data=trade)
                print(f"✓ Trade olusturuldu: {trade['title']}")
        
        print("\n✅ Migration basariyla tamamlandi!")
        
    except Exception as e:
        print(f"❌ Migration hatasi: {str(e)}")
    finally:
        await prisma.disconnect()

if __name__ == "__main__":
    asyncio.run(main())
