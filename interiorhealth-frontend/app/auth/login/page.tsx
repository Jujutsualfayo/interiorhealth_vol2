'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // This allows the browser to store the server-set cookies
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect user based on role returned by the API
        switch (data.role) {
          case 'admin':
            router.push('/dashboard/admin');
            break;
          case 'patient':
            router.push('/dashboard/patient');
            break;
          case 'healthworker':
            router.push('/dashboard/healthworker');
            break;
          default:
            router.push('/unauthorized');
        }
      } else {
        // Show activation message if account is inactive
        if (data.detail && data.detail.toLowerCase().includes('inactive')) {
          setError('Your account is not activated. Please check your email for a verification link or contact support.');
        } else {
          setError(data.message || data.detail || 'Login failed');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
