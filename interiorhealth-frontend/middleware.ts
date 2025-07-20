// middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // If not logged in, redirect to login for protected routes
  const isAuthRoute = pathname.startsWith('/(auth)');
  const isDashboardRoute = pathname.startsWith('/(dashboard)');

  if (!token && isDashboardRoute) {
    url.pathname = '/(auth)/login';
    return NextResponse.redirect(url);
  }

  // If logged in, check role access
  if (token && isDashboardRoute) {
    if (pathname.includes('/admin') && role !== 'admin') {
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }

    if (pathname.includes('/patient') && role !== 'patient') {
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }

    if (pathname.includes('/healthworker') && role !== 'healthworker') {
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(dashboard)/:path*"], // 👈 valid here, not in next.config.ts
};
