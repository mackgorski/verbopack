import { PrismaClient } from '@prisma/client';

declare global {
  interface Global {
    prisma: PrismaClient;
  }
}

export const prisma: PrismaClient = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;