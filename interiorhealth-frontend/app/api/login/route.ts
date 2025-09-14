import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    let backendRes;
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const url = base ? `${base.replace(/\/$/, '')}/api/users/login/` : `/api/users/login/`;
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
    try {
      data = await backendRes.json();
    } catch (jsonError) {
      console.error('Backend response JSON error:', jsonError);
      return NextResponse.json({ error: 'Invalid response from authentication server.' }, { status: 502 });
    }

    if (!backendRes.ok) {
      return NextResponse.json({ error: data.message || 'Invalid credentials' }, { status: backendRes.status });
    }

    if (!data.token || !data.role) {
      return NextResponse.json({ error: 'Authentication failed: missing token or role.' }, { status: 500 });
    }

    // Set JWT token and role in cookies
    const response = NextResponse.json({ success: true, role: data.role });
    response.cookies.set('token', data.token, {
      httpOnly: true,
      path: '/',
    });
    response.cookies.set('role', data.role, {
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
