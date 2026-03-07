#!/usr/bin/env node
import { prisma } from '../lib/prisma.js';

async function migrate() {
  try {
    console.log('Migration basliyor...');

    // Haber tablosu icin ornek veri
    const haberCount = await prisma.haber.count();
    if (haberCount === 0) {
      await prisma.haber.createMany({
        data: [
          {
            baslik: 'TIB Ticaret Agi Resmen Acildi',
            icerik: 'Hatay sanayicilerinin dijital bulusma noktasi olan TIB Ticaret Agi resmen acilarak hizmete baslamistir.',
            resim: null
          },
          {
            baslik: 'Ilk Is Birligi Anlasmasi Imzalandi',
            icerik: 'Platform araciligiyla ilk iki firmamiz arasinda tarim ve uretim alaninda is birligi anlasmasi imzalanmistir.',
            resim: null
          },
          {
            baslik: 'Yatirimci Davetlisi Konferansi',
            icerik: 'Aylik duzenlenen yatirimci konferansinda Turkiye ve Ortadogu bolgesinden katilimcilar hazir bulunmaktadir.',
            resim: null
          }
        ]
      });
      console.log('Haber tablosi dolduruld.');
    }

    // Trade tablosu icin ornek veri
    const tradeCount = await prisma.trade.count();
    if (tradeCount === 0) {
      await prisma.trade.createMany({
        data: [
          {
            category: 'ITHALATÇILIK',
            title: 'Tarım Ürünleri İthalatı',
            amount: '500000',
            status: 'AKTIF'
          },
          {
            category: 'IHRAÇAT',
            title: 'Hazır Giyim Genel İhracatı',
            amount: '1200000',
            status: 'AKTIF'
          },
          {
            category: 'ORTAKLIK',
            title: 'Tekstil Üretim Ortaklığı',
            amount: '750000',
            status: 'AKTIF'
          }
        ]
      });
      console.log('Trade tablosi dolduruld.');
    }

    console.log('Migration basariyla tamamlandi.');
    process.exit(0);
  } catch (error) {
    console.error('Migration hatasi:', error);
    process.exit(1);
  }
}

migrate();
