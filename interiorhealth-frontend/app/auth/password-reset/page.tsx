"use client";
import React, { useState } from "react";

export default function PasswordResetRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const url = base.replace(/\/$/, "") + "/api/users/forgot-password/";
      const res = await fetch(
        url,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to request password reset");
      }
      setMessage("If the email exists, a reset link has been sent.");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 rounded-xl shadow-lg bg-gray-900 border border-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-white">Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full p-2 mb-4 rounded border border-gray-700 bg-gray-800 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      {message && <p className="mt-4 text-green-400">{message}</p>}
      {error && <p className="mt-4 text-red-400">{error}</p>}
    </div>
  );
}
