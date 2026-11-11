import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const sessionCookie = request.cookies.get('__session')?.value;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // Check if accessing via admin subdomain (e.g. admin.rashx.org or admin.localhost:3000)
  const isAdminSubdomain = hostname.startsWith('admin.');

  if (isAdminSubdomain) {
    // If on admin subdomain login path, rewrite to Arabic platform dashboard login
    if (pathname === '/login') {
      requestHeaders.set('x-pathname', '/ar/dashboard/login');
      return NextResponse.rewrite(new URL('/ar/dashboard/login', request.url), {
        request: { headers: requestHeaders },
      });
    }

    // If root of admin subdomain, redirect to login if session missing, otherwise rewrite to dashboard
    if (pathname === '/' || pathname === '') {
      if (!sessionCookie) {
        return NextResponse.redirect(new URL('/ar/dashboard/login', request.url));
      }
      requestHeaders.set('x-pathname', '/ar/dashboard');
      return NextResponse.rewrite(new URL('/ar/dashboard', request.url), {
        request: { headers: requestHeaders },
      });
    }
  }

  // Dashboard route protection: /[locale]/dashboard/* (except /login)
  const dashboardMatch = pathname.match(/^\/([a-zA-Z]{2})\/dashboard(\/.*)?$/);
  if (dashboardMatch) {
    const locale = dashboardMatch[1];
    const subpath = dashboardMatch[2] || '';
    const isLoginPage = subpath === '/login' || subpath.startsWith('/login');

    if (!isLoginPage && !sessionCookie) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard/login`, request.url));
    }
  }

  // Protect /dashboard root if accessed without locale prefix
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    const isLoginPage = pathname === '/dashboard/login';
    if (!isLoginPage && !sessionCookie) {
      return NextResponse.redirect(new URL('/ar/dashboard/login', request.url));
    }
  }

  // Root path redirect to default Arabic locale /ar for main domain
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/ar', request.url));
  }

  // If user visits /admin or /ar/admin on main domain, rewrite/redirect to dashboard
  if (pathname === '/admin' || pathname === '/ar/admin') {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/ar/dashboard/login', request.url));
    }
    requestHeaders.set('x-pathname', '/ar/dashboard');
    return NextResponse.rewrite(new URL('/ar/dashboard', request.url), {
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
