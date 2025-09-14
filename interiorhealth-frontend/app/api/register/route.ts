import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 });
    }

    const serverBase = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const url = serverBase
      ? `${serverBase.replace(/\/$/, '')}/api/users/register/`
      : 'http://localhost:8000/api/users/register/';

    let backendRes;
    try {
      backendRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
    } catch (fetchError) {
      console.error('Backend fetch error (register):', fetchError);
      return NextResponse.json({ error: 'Unable to reach registration server.' }, { status: 502 });
    }

    let data;
    try {
      data = await backendRes.json();
    } catch (jsonError) {
      console.error('Backend response JSON error (register):', jsonError);
      return NextResponse.json({ error: 'Invalid response from registration server.' }, { status: 502 });
    }

    if (!backendRes.ok) {
      return NextResponse.json({ error: data.message || 'Registration failed' }, { status: backendRes.status });
    }

    // If backend returned token and role, set cookies similarly to the login route
    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      path: '/',
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 7,
    };

    const response = NextResponse.json({ success: true, role: data.role });
    if (data.token) response.cookies.set('token', data.token, cookieOptions);
    if (data.role) response.cookies.set('role', data.role, { ...cookieOptions, httpOnly: false });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
