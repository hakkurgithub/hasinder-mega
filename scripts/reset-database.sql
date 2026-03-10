-- Drop all existing tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS "AdminLog" CASCADE;
DROP TABLE IF EXISTS "Mediation" CASCADE;
DROP TABLE IF EXISTS "Demand" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- Drop any Prisma migration tables
DROP TABLE IF EXISTS "_prisma_migrations" CASCADE;

-- Create User table
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

-- Create unique index on email
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Create Demand table
CREATE TABLE "Demand" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'BEKLEMEDE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Demand_pkey" PRIMARY KEY ("id")
);

-- Create Mediation table
CREATE TABLE "Mediation" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "status" TEXT NOT NULL DEFAULT 'BEKLEMEDE',
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "mediatorId" TEXT NOT NULL,
    "demandId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mediation_pkey" PRIMARY KEY ("id")
);

-- Create AdminLog table
CREATE TABLE "AdminLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "AdminLog_pkey" PRIMARY KEY ("id")
);

-- Add foreign key constraints
ALTER TABLE "Mediation" ADD CONSTRAINT "Mediation_mediatorId_fkey" FOREIGN KEY ("mediatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Mediation" ADD CONSTRAINT "Mediation_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "Demand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AdminLog" ADD CONSTRAINT "AdminLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Create a default admin user (password: admin123 - hashed with bcrypt)
INSERT INTO "User" ("id", "name", "taxNo", "sector", "title", "email", "password", "balance", "isAdmin", "status", "tier", "iban", "createdAt")
VALUES (
    gen_random_uuid()::text,
    'Admin',
    '1234567890',
    'Yönetim',
    'Sistem Yöneticisi',
    'admin@hasinder.com',
    '$2a$10$rQnM1m8C8o8Q5Z5Z5Z5Z5OYVYqVYqVYqVYqVYqVYqVYqVYqVYqVYq',
    0,
    true,
    'AKTIF',
    'PREMIUM',
    NULL,
    CURRENT_TIMESTAMP
);
