import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

/**
 * Canonical Prisma client for Forgea.
 * Use this everywhere to avoid multiple client lifecycles.
 */
const datasourceUrl = process.env.DATABASE_URL;

if (!datasourceUrl) {
  throw new Error("DATABASE_URL is not set");
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: datasourceUrl }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
