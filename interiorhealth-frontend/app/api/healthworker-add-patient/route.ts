import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Get JWT token from cookies (async)
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
    console.log("Forwarding headers to backend:", headers);
    const backendRes = await fetch("http://localhost:8000/api/users/register/by-healthworker/", {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    });
    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    return NextResponse.json({ detail: "Server error." }, { status: 500 });
  }
}
