import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Supabase PostgreSQL bağlantı URL'i - öncelik sırası
const databaseUrl = 
  process.env.POSTGRES_PRISMA_URL || 
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.POSTGRES_URL || 
  process.env.DATABASE_URL

// Prisma client - bağlantı yoksa null döner
let prismaInstance: PrismaClient | null = null

if (databaseUrl) {
  try {
    prismaInstance = globalForPrisma.prisma ?? new PrismaClient({
      datasourceUrl: databaseUrl,
    })
    
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaInstance
    }
  } catch (error) {
    console.error('[v0] Failed to initialize Prisma client:', error)
    prismaInstance = null
  }
}

export const prisma = prismaInstance
