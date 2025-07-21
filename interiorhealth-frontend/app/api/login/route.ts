// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const mockUser = {
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      token: 'mock-jwt-token-123',
    };

    if (email === mockUser.email && password === mockUser.password) {
      const response = NextResponse.json({ success: true, role: mockUser.role });

      // ✅ Set cookies on the response (this is the correct way!)
      response.cookies.set('token', mockUser.token, {
        httpOnly: true,
        path: '/',
      });

      response.cookies.set('role', mockUser.role, {
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
