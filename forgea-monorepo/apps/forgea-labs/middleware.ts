import { NextRequest, NextResponse } from "next/server";

// Edge-safe middleware: do NOT import server-side auth helpers (e.g. auth(), Prisma, NextAuth
// adapters) here because those pull server-only packages into the Edge runtime. The middleware
// must remain small and safe to run on the Edge.

const protectedRoutes = ["/dashboard", "/lab", "/ticket", "/admin"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Only check cookie presence here. Do NOT validate or decode the session in the Edge.
  // Validation and RBAC belong to server components / API routes where Prisma and NextAuth
  // helpers can be used safely.
  const secureCookie = request.cookies.get(
    "__Secure-next-auth.session-token",
  )?.value;
  const devCookie = request.cookies.get("next-auth.session-token")?.value;
  const hasSessionCookie = Boolean(secureCookie || devCookie);

  if (!hasSessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/lab/:path*",
    "/ticket/:path*",
    "/admin/:path*",
  ],
};
