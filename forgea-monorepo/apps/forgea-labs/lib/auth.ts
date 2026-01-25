// Server-only helper: avoid static imports of server modules at module scope so this file
// can be imported by client components without pulling Prisma/NextAuth into the bundle.
export async function getCurrentUser() {
  // Prevent accidental client-side execution
  if (typeof window !== "undefined") return null;

  const { auth } = await import("@/auth");
  const { db } = await import("@/lib/db");

  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      role: true,
      icprScore: true,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}
