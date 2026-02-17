// lib/prisma.ts
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// Puxa a string de conexão do .env
const connectionString = process.env.DATABASE_URL!

// Configura o Pool de conexões do Postgres
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as unknown as { 
  prisma: PrismaClient | undefined 
}

// Inicializa o Prisma passando o adaptador de alta performance
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma