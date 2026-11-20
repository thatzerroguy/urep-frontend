import { NextRequest, NextResponse } from 'next/server';

const ACCESS_TOKEN_KEY = 'urep_access_token';
const ADMIN_ACCESS_TOKEN_KEY = 'urep_admin_access_token';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const participantToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const adminToken = request.cookies.get(ADMIN_ACCESS_TOKEN_KEY)?.value;

  if (pathname === '/dashboard' && !participantToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === '/login' && participantToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if ((pathname === '/admin' || pathname.startsWith('/admin/')) && !adminToken) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  if (pathname === '/admin-login' && adminToken) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/dashboard', '/admin-login', '/admin/:path*'],
};
