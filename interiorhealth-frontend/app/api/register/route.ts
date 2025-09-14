import { NextRequest, NextResponse } from 'next/server'

// Server-side proxy for user registration to avoid client-side CORS issues.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, role } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 })
    }

    // Prefer a server-only env var for backend origin; fall back to public var or a known backend
    const serverBase = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://interiorhealth-backend.onrender.com'
    const url = serverBase.replace(/\/$/, '') + '/api/users/register/'

    let backendRes: Response
    try {
      backendRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      })
    } catch (fetchError) {
      console.error('Backend fetch error (register):', fetchError)
      return NextResponse.json({ error: 'Unable to reach registration server.' }, { status: 502 })
    }

    let data: unknown
    try {
      data = await backendRes.json()
    } catch (jsonError) {
      console.error('Backend response JSON error (register):', jsonError)
      return NextResponse.json({ error: 'Invalid response from registration server.' }, { status: 502 })
    }

    if (!backendRes.ok) {
      const errMsg = typeof data === 'object' && data !== null && 'message' in data
        ? (data as { message?: string }).message
        : undefined
      return NextResponse.json({ error: errMsg || 'Registration failed' }, { status: backendRes.status })
    }

    // Mirror backend response and set cookies if present
    const isProd = process.env.NODE_ENV === 'production'
    const cookieOptions = {
      path: '/',
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 7,
    }

    const response = NextResponse.json(data, { status: 200 })
    // Safely read token/role if present
    if (typeof data === 'object' && data !== null) {
      const payload = data as { token?: string; role?: string }
      if (payload.token) response.cookies.set('token', payload.token, cookieOptions)
      // role cookie is readable by JS so httpOnly=false
      if (payload.role) response.cookies.set('role', payload.role, { ...cookieOptions, httpOnly: false })
    }

    return response
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 })
  }
}
