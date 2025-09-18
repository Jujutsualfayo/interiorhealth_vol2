
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Use environment variable for backend URL in production
const BACKEND_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://interiorhealth-vol2-1.onrender.com";

export async function GET(req: NextRequest) {
  // Get token from Authorization header or cookies
  const authHeader = req.headers.get("authorization");
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  try {
    const backendRes = await fetch(
      `${BACKEND_URL.replace(/\/$/, "")}/api/drugs/patients/inventory/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader ? { Authorization: authHeader } : {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    let data;
    try {
      data = await backendRes.json();
    } catch (jsonErr) {
      // If response is not JSON, return text
      const text = await backendRes.text();
      return NextResponse.json({ error: "Backend did not return JSON", details: text }, { status: backendRes.status });
    }
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    // Log error and return message
    console.error("Error fetching backend inventory:", err);
    return NextResponse.json({ error: "Failed to fetch backend inventory", details: String(err) }, { status: 500 });
  }
}
