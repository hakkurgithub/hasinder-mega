/*
  Warnings:

  - You are about to drop the column `iban` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Demand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LogisticsRoute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mediation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Demand" DROP CONSTRAINT "Demand_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Mediation" DROP CONSTRAINT "Mediation_demandId_fkey";

-- DropForeignKey
ALTER TABLE "Mediation" DROP CONSTRAINT "Mediation_mediatorId_fkey";

-- DropForeignKey
ALTER TABLE "Mediation" DROP CONSTRAINT "Mediation_sellerId_fkey";

-- DropIndex
DROP INDEX "User_taxNo_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "iban",
DROP COLUMN "phone",
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "tier" DROP DEFAULT;

-- DropTable
DROP TABLE "Demand";

-- DropTable
DROP TABLE "LogisticsRoute";

-- DropTable
DROP TABLE "Mediation";

-- DropTable
DROP TABLE "Trade";

-- CreateTable
CREATE TABLE "AdminLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "AdminLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdminLog" ADD CONSTRAINT "AdminLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
