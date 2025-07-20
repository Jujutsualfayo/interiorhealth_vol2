"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login/`,
        { email, password },
        { withCredentials: true }
      );

      const { access, role } = response.data;

      // Store credentials
      localStorage.setItem("token", access);
      localStorage.setItem("role", role);

      // Redirect based on user role
      switch (role) {
        case "admin":
          router.push("/(dashboard)/admin");
          break;
        case "patient":
          router.push("/(dashboard)/patient");
          break;
        case "healthworker":
          router.push("/(dashboard)/healthworker");
          break;
        default:
          router.push("/");
      }
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
