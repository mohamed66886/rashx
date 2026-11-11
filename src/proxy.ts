import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Check if accessing via admin subdomain (e.g. admin.rashx.org or admin.localhost:3000)
  const isAdminSubdomain = hostname.startsWith('admin.');

  if (isAdminSubdomain) {
    // If root of admin subdomain, route directly to Arabic platform dashboard
    if (pathname === '/' || pathname === '') {
      return NextResponse.rewrite(new URL('/ar/dashboard', request.url));
    }
    // If /login on admin subdomain, rewrite to /ar/dashboard/login
    if (pathname === '/login') {
      return NextResponse.rewrite(new URL('/ar/dashboard/login', request.url));
    }
  }

  // Root path redirect to default Arabic locale /ar for main domain
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/ar', request.url));
  }

  // If user visits /admin or /ar/admin on main domain, rewrite/redirect to dashboard
  if (pathname === '/admin' || pathname === '/ar/admin') {
    return NextResponse.redirect(new URL('/ar/dashboard', request.url));
  }

  return NextResponse.next();
}

export const middleware = proxy;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|brand|fonts).*)'],
};
