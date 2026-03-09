import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Supabase PostgreSQL bağlantı URL'i
const databaseUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('[v0] POSTGRES_URL or DATABASE_URL environment variable is not set')
  throw new Error('DATABASE_URL environment variable is not set')
}

console.log('[v0] Connecting to database with URL starting with:', databaseUrl.substring(0, 30) + '...')

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasourceUrl: databaseUrl,
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
