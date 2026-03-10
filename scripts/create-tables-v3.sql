-- HAS INSAN DER - Veritabani Yapisini Olustur
-- Bu script Prisma semasina tam uyumlu tablolar olusturur

-- Oncelikle mevcut tablolari sil (temiz baslangic)
DROP TABLE IF EXISTS "AdminLog" CASCADE;
DROP TABLE IF EXISTS "Mediation" CASCADE;
DROP TABLE IF EXISTS "Demand" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- User tablosu
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "taxNo" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "iban" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- User email unique index
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Demand tablosu
CREATE TABLE "Demand" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'BEKLEMEDE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Demand_pkey" PRIMARY KEY ("id")
);

-- Mediation tablosu (Prisma semasindaki MediatorRelation iliskisine uyumlu)
CREATE TABLE "Mediation" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "status" TEXT NOT NULL DEFAULT 'BEKLEMEDE',
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "mediatorId" TEXT NOT NULL,
    "demandId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Mediation_pkey" PRIMARY KEY ("id")
);

-- AdminLog tablosu
CREATE TABLE "AdminLog" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" TEXT NOT NULL,
    CONSTRAINT "AdminLog_pkey" PRIMARY KEY ("id")
);

-- Foreign key constraints
ALTER TABLE "Mediation" ADD CONSTRAINT "Mediation_mediatorId_fkey" 
    FOREIGN KEY ("mediatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    
ALTER TABLE "Mediation" ADD CONSTRAINT "Mediation_demandId_fkey" 
    FOREIGN KEY ("demandId") REFERENCES "Demand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    
ALTER TABLE "AdminLog" ADD CONSTRAINT "AdminLog_adminId_fkey" 
    FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
