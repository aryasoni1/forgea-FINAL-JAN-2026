export async function GET(request: Request) {
  const [{ default: NextAuth }, { authConfig }] = await Promise.all([
    import("next-auth"),
    import("@/auth.config"),
  ]);

  const { GET } = NextAuth(authConfig);
  return GET(request);
}

export async function POST(request: Request) {
  const [{ default: NextAuth }, { authConfig }] = await Promise.all([
    import("next-auth"),
    import("@/auth.config"),
  ]);

  const { POST } = NextAuth(authConfig);
  return POST(request);
}
