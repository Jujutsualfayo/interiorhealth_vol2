import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // These are real public route paths — not the folder names with (dashboard)
  const isDashboardRoute = ["/admin", "/patient", "/healthworker"].some(p =>
    pathname.startsWith(p)
  );

  if (!token && isDashboardRoute) {
    url.pathname = '/(auth)/login';
    return NextResponse.redirect(url);
  }

  if (token && isDashboardRoute) {
    if (pathname.startsWith('/admin') && role !== 'admin') {
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/patient') && role !== 'patient') {
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/healthworker') && role !== 'healthworker') {
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/patient/:path*", "/healthworker/:path*"], // match public URLs
};
