import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login) and relevant API routes
  if (
    (pathname.startsWith('/admin') && pathname !== '/admin/login') ||
    pathname.startsWith('/api/admin')
  ) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyToken(token);
    
    // If no payload or role is not ADMIN, redirect or return error
    if (!payload || payload.role !== 'ADMIN') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
