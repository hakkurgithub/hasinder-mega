-- Kullanici tablosu
CREATE TABLE IF NOT EXISTS "User" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" VARCHAR(255) NOT NULL,
  "taxNo" VARCHAR(50) NOT NULL,
  "sector" VARCHAR(100) NOT NULL,
  "title" VARCHAR(100) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "balance" DOUBLE PRECISION DEFAULT 0,
  "isAdmin" BOOLEAN DEFAULT FALSE,
  "status" VARCHAR(50) NOT NULL,
  "tier" VARCHAR(50) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Talep tablosu
CREATE TABLE IF NOT EXISTS "Demand" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "status" VARCHAR(50) DEFAULT 'ACIK',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE
);

-- Admin log tablosu
CREATE TABLE IF NOT EXISTS "AdminLog" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "action" VARCHAR(255) NOT NULL,
  "details" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "adminId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE
);

-- Arabuluculuk tablosu
CREATE TABLE IF NOT EXISTS "Mediation" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" VARCHAR(255) NOT NULL,
  "status" VARCHAR(50) DEFAULT 'BEKLEMEDE',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "mediatorId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "demandId" UUID
);

-- Trade (Islem) tablosu
CREATE TABLE IF NOT EXISTS "Trade" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "type" VARCHAR(10) NOT NULL,
  "symbol" VARCHAR(20) NOT NULL,
  "quantity" DOUBLE PRECISION NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "total" DOUBLE PRECISION NOT NULL,
  "status" VARCHAR(20) DEFAULT 'PENDING',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE
);

-- Order (Emir) tablosu
CREATE TABLE IF NOT EXISTS "Order" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "type" VARCHAR(10) NOT NULL,
  "side" VARCHAR(10) NOT NULL,
  "symbol" VARCHAR(20) NOT NULL,
  "quantity" DOUBLE PRECISION NOT NULL,
  "price" DOUBLE PRECISION,
  "filledQty" DOUBLE PRECISION DEFAULT 0,
  "status" VARCHAR(20) DEFAULT 'OPEN',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE
);

-- Indexler
CREATE INDEX IF NOT EXISTS "idx_demand_status" ON "Demand"("status");
CREATE INDEX IF NOT EXISTS "idx_demand_userId" ON "Demand"("userId");
CREATE INDEX IF NOT EXISTS "idx_trade_userId" ON "Trade"("userId");
CREATE INDEX IF NOT EXISTS "idx_trade_symbol" ON "Trade"("symbol");
CREATE INDEX IF NOT EXISTS "idx_order_userId" ON "Order"("userId");
CREATE INDEX IF NOT EXISTS "idx_order_status" ON "Order"("status");
