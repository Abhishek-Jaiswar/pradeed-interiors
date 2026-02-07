import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

// Define the paths that require authentication
const PROTECTED_PATHS = [ "/api/admin"]; //"/admin",

// Define paths that should be accessible without authentication (like login)
const PUBLIC_PATHS = [ "/api/auth/login"]; //"/admin/login",

export function proxy(request: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl;

  // Check if the path is protected
  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  );
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname === path);

  // If path is not protected or is a public path, continue
  if (!isProtectedPath || isPublicPath) {
    return NextResponse.next();
  }

  // Get the token from the cookies
  const token = request.cookies.get("auth_token")?.value;

  // If no token is found, redirect to login
  if (!token) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  try {
    // Verify token
    const secret =
      process.env.JWT_SECRET || "fallback-secret-key-for-development-only";

    // Try to verify the token
    const decoded = verify(token, secret);

    // Token is valid, continue
    return NextResponse.next();
  } catch (error) {
    // Token is invalid, redirect to login
    console.error("JWT verification failed:", error);
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }
}

// Define which paths this middleware should run on
export const config = {
  matcher: [
    // Match all admin routes
    "/admin/:path*",
    // Match all admin API routes
    "/api/admin/:path*",
    // Exclude login-related routes from pattern matching
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
