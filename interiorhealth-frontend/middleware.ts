import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Check if the route is a protected dashboard route
  const isDashboardRoute = pathname.startsWith('/dashboard');

  if (!token && isDashboardRoute) {
    // Redirect unauthenticated users to login
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  if (token && isDashboardRoute) {
    // Role-based redirection for protected dashboard routes
    if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/dashboard/patient') && role !== 'patient') {
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith('/dashboard/healthworker') && role !== 'healthworker') {
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Apply middleware only to dashboard routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
