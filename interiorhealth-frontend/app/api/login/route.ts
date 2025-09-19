import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // Prefer a server-only env var for the backend origin to avoid exposing it publicly.
    // Fall back to the public var if needed, then finally to localhost for dev.
    const serverBase = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const url = serverBase
      ? `${serverBase.replace(/\/$/, '')}/api/users/login/`
      : 'http://localhost:8000/api/users/login/';

    let backendRes;
    try {
      backendRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    } catch (fetchError) {
      console.error('Backend fetch error:', fetchError);
      return NextResponse.json({ error: 'Unable to reach authentication server.' }, { status: 502 });
    }

    let data;
    let isJson = false;
    try {
      const contentType = backendRes.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await backendRes.json();
        isJson = true;
      } else {
        // Try to parse as text for HTML error pages
        const text = await backendRes.text();
        data = { message: text };
      }
    } catch (jsonError) {
      console.error('Backend response JSON error:', jsonError);
      return NextResponse.json({ error: 'Invalid response from authentication server.' }, { status: 502 });
    }

    if (!backendRes.ok) {
      // Handle rate limiting (429) and server errors
      if (backendRes.status === 429) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
      }
      if (backendRes.status >= 500) {
        return NextResponse.json({ error: 'Server error. Please try again later.' }, { status: backendRes.status });
      }
      // Fallback for other errors
      return NextResponse.json({ error: (isJson ? data.message : undefined) || 'Invalid credentials' }, { status: backendRes.status });
    }

    if (!data.access || !data.user || !data.user.role) {
      return NextResponse.json({ error: 'Authentication failed: missing token or role.' }, { status: 500 });
    }

    // Set JWT token and role in cookies on the frontend domain.
    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      path: '/',
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax' as const,
      // 7 days
      maxAge: 60 * 60 * 24 * 7,
    };

    const response = NextResponse.json({ success: true, role: data.user.role });
    // httpOnly token
    response.cookies.set('token', data.access, cookieOptions);
    // non-httpOnly role (client-side code may read it)
    response.cookies.set('role', data.user.role, { ...cookieOptions, httpOnly: false });
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
