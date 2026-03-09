-- Create User table if not exists
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "taxNo" TEXT NOT NULL,
  "sector" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "balance" DOUBLE PRECISION DEFAULT 0,
  "isAdmin" BOOLEAN DEFAULT false,
  "status" TEXT NOT NULL,
  "tier" TEXT NOT NULL,
  "iban" TEXT,
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- Create AdminLog table if not exists
CREATE TABLE IF NOT EXISTS "AdminLog" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "action" TEXT NOT NULL,
  "details" TEXT,
  "userId" TEXT REFERENCES "User"("id"),
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- Create Demand table if not exists
CREATE TABLE IF NOT EXISTS "Demand" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "status" TEXT DEFAULT 'BEKLEMEDE',
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- Create Mediation table if not exists
CREATE TABLE IF NOT EXISTS "Mediation" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "status" TEXT DEFAULT 'BEKLEMEDE',
  "amount" DOUBLE PRECISION DEFAULT 0,
  "mediatorId" TEXT NOT NULL REFERENCES "User"("id"),
  "demandId" TEXT NOT NULL REFERENCES "Demand"("id"),
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

-- Add iban column to User if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'User' AND column_name = 'iban') THEN
    ALTER TABLE "User" ADD COLUMN "iban" TEXT;
  END IF;
END $$;
