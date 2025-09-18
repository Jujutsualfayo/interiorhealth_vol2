"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get("token") : null;
  const [status, setStatus] = useState<string>("Verifying...");

  useEffect(() => {
    if (!token) {
      setStatus("No token provided.");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/verify-email/?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus("Email verified! Redirecting to login...");
          setTimeout(() => router.push("/auth/login"), 2000);
        } else {
          setStatus(data.detail || "Verification failed.");
        }
      })
      .catch(() => setStatus("Network error. Please try again."));
  }, [token, router]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
      fontFamily: "Inter, Arial, sans-serif"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "2.5rem 2rem",
        maxWidth: "400px",
        width: "100%",
        textAlign: "center"
      }}>
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" style={{marginBottom: "1rem"}}>
          <circle cx="12" cy="12" r="12" fill="#6366f1" />
          <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 style={{color: "#6366f1", fontWeight: 700, marginBottom: "0.5rem"}}>Email Verification</h2>
        <p style={{fontSize: "1.1rem", marginBottom: "1.5rem", color: "#334155"}}>{status}</p>
        {status !== "Verifying..." && status !== "Email verified! Redirecting to login..." && (
          <button
            onClick={() => router.push("/auth/login")}
            style={{
              background: "#6366f1",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(99,102,241,0.12)"
            }}
          >
            Go to Login
          </button>
        )}
      </div>
      <footer style={{marginTop: "2rem", color: "#64748b", fontSize: "0.95rem"}}>
        &copy; {new Date().getFullYear()} InteriorHealth
      </footer>
    </div>
  );
}
