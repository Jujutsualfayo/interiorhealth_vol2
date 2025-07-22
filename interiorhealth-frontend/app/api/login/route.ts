import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Mock users
    const mockUsers = [
      {
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        token: 'mock-admin-token-123',
      },
      {
        email: 'healthworker@example.com',
        password: 'health123',
        role: 'healthworker',
        token: 'mock-health-token-456',
      },
      {
        email: 'patient@example.com',
        password: 'patient123',
        role: 'patient',
        token: 'mock-patient-token-789',
      },
    ];

    // Find matching user
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const response = NextResponse.json({ success: true, role: user.role });

      response.cookies.set('token', user.token, {
        httpOnly: true,
        path: '/',
      });

      response.cookies.set('role', user.role, {
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
