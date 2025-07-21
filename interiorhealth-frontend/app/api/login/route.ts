// app/api/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Mock user check - replace with real DB logic
    const mockUser = {
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      token: 'mock-jwt-token-123',
    };

    if (email === mockUser.email && password === mockUser.password) {
      const cookieStore = await cookies(); // ✅ Fix
      cookieStore.set('token', mockUser.token, { httpOnly: true });
      cookieStore.set('role', mockUser.role);

      return NextResponse.json({ success: true, role: mockUser.role });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
