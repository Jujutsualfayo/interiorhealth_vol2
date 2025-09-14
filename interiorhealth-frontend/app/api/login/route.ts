import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Make a real request to the backend
    const backendRes = await fetch('http://localhost:8000/api/users/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!backendRes.ok) {
      const errorData = await backendRes.json();
      return NextResponse.json({ error: errorData.message || 'Invalid credentials' }, { status: 401 });
    }

    const data = await backendRes.json();
    // Set JWT token and role in cookies
    const response = NextResponse.json({ success: true, role: data.role });
    if (data.token) {
      response.cookies.set('token', data.token, {
        httpOnly: true,
        path: '/',
      });
    }
    if (data.role) {
      response.cookies.set('role', data.role, {
        path: '/',
      });
    }
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
