import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getPreferredLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && ['ar', 'en'].includes(cookieLocale)) {
    return cookieLocale;
  }
  return 'ar';
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const sessionCookie = request.cookies.get('__session')?.value;
  const preferredLocale = getPreferredLocale(request);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // Exclude /sign and /:locale/sign from dashboard guard and admin-subdomain rewrites
  if (
    pathname === '/sign' ||
    pathname.startsWith('/sign/') ||
    pathname.match(/^\/[a-zA-Z]{2}\/sign(\/.*)?$/)
  ) {
    const res = NextResponse.next({
      request: { headers: requestHeaders },
    });
    res.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    res.headers.set('Referrer-Policy', 'no-referrer');
    return res;
  }

  // Check if accessing via admin subdomain (e.g. admin.rashx.org or admin.localhost:3000)
  const isAdminSubdomain = hostname.startsWith('admin.');

  if (isAdminSubdomain) {
    // If on admin subdomain login path, rewrite to localized platform dashboard login
    if (pathname === '/login') {
      requestHeaders.set('x-pathname', `/${preferredLocale}/dashboard/login`);
      return NextResponse.rewrite(new URL(`/${preferredLocale}/dashboard/login`, request.url), {
        request: { headers: requestHeaders },
      });
    }

    // If root of admin subdomain, redirect to login if session missing, otherwise rewrite to dashboard
    if (pathname === '/' || pathname === '') {
      if (!sessionCookie) {
        return NextResponse.redirect(new URL(`/${preferredLocale}/dashboard/login`, request.url));
      }
      requestHeaders.set('x-pathname', `/${preferredLocale}/dashboard`);
      return NextResponse.rewrite(new URL(`/${preferredLocale}/dashboard`, request.url), {
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
      return NextResponse.redirect(new URL(`/${preferredLocale}/dashboard/login`, request.url));
    }
  }

  // Root path redirect to default Arabic locale /ar for main domain
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }

  // If user visits /admin or /:locale/admin on main domain, rewrite/redirect to dashboard
  const adminMatch = pathname.match(/^\/([a-zA-Z]{2})\/admin$/);
  if (pathname === '/admin' || adminMatch) {
    const locale = adminMatch ? adminMatch[1] : preferredLocale;
    if (!sessionCookie) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard/login`, request.url));
    }
    requestHeaders.set('x-pathname', `/${locale}/dashboard`);
    return NextResponse.rewrite(new URL(`/${locale}/dashboard`, request.url), {
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
