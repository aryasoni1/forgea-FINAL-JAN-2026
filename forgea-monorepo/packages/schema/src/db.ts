import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

/**
 * Canonical Prisma client for Forgea.
 * Use this everywhere to avoid multiple client lifecycles.
 */
let prisma = globalForPrisma.prisma;

function initPrisma(): PrismaClient {
  if (prisma) return prisma;

  const datasourceUrl = process.env.DATABASE_URL;
  if (!datasourceUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: datasourceUrl }),
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }

  return prisma;
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = initPrisma();
    const value = client[prop as keyof PrismaClient];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
