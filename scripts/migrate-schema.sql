-- HAS INSANDER Schema Migration
-- Bu script User tablosunu gunceller ve Haber, Trade tablolarini olusturur

-- User tablosuna role alani ekleme (eger yoksa)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='User' AND column_name='role') THEN
    ALTER TABLE "User" ADD COLUMN "role" TEXT DEFAULT 'UYELIK_BEKLIYOR';
  END IF;
END $$;

-- title kolonunu role ile degistir (eger varsa)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='User' AND column_name='title') THEN
    UPDATE "User" SET "role" = COALESCE("title", 'UYELIK_BEKLIYOR') WHERE "role" IS NULL OR "role" = 'UYELIK_BEKLIYOR';
    ALTER TABLE "User" DROP COLUMN IF EXISTS "title";
  END IF;
END $$;

-- Haber tablosu olusturma
CREATE TABLE IF NOT EXISTS "Haber" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "baslik" TEXT NOT NULL,
  "icerik" TEXT NOT NULL,
  "resim" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- trades tablosu olusturma
CREATE TABLE IF NOT EXISTS "trades" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "category" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "amount" TEXT NOT NULL,
  "status" TEXT DEFAULT 'AKTIF',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Ornek haberler ekleme (eger bos ise)
INSERT INTO "Haber" ("id", "baslik", "icerik", "resim", "createdAt", "updatedAt")
SELECT 
  gen_random_uuid()::text,
  'Istanbul ve Hatay Sanayisi HAS INSANDER Catisinda Birlesti',
  'Istanbul ve Hatay is insanlarinin dev is birligi TIB Agi ile otonom ticarete donustu. Platform artik aktif ve uyelik basvurulari alinmaktadir.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "Haber" LIMIT 1);

INSERT INTO "Haber" ("id", "baslik", "icerik", "resim", "createdAt", "updatedAt")
SELECT 
  gen_random_uuid()::text,
  'Hakki Kurt: Ticaretin Dijital Kalkanini Kurduk',
  'HAS INSANDER Baskani Hakki Kurt, Silicon Campus destekli yeni sistemin detaylarini paylasti. Sistem KVKK uyumlu ve guvenli ticaret saglamaktadir.',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE (SELECT COUNT(*) FROM "Haber") < 2;

INSERT INTO "Haber" ("id", "baslik", "icerik", "resim", "createdAt", "updatedAt")
SELECT 
  gen_random_uuid()::text,
  'Silicon Campus tan HAS INSANDER e Tam Teknolojik Destek',
  'Tum haklari Silicon Campus e ait olan otonom sistem siber guvenlik testlerinden basariyla gecti. Platform artik canli ve guvenli.',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
WHERE (SELECT COUNT(*) FROM "Haber") < 3;
