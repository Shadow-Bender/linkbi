import { PrismaClient } from '../src/generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: process.env.DATABASE_URL ? {
    db: {
      url: process.env.DATABASE_URL,
    },
  } : undefined,
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;