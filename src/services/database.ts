import { PrismaClient } from '@prisma/client';

// Crie uma instância do PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare explicitamente a propriedade prisma no globalThis
declare global {
  var prisma: PrismaClient | undefined;
}

// Use uma instância única de PrismaClient
prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
