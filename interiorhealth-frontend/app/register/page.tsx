'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'patient', // default, but could be a dropdown
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const url = base
        ? `${base.replace(/\/$/, '')}/api/patients/register/`
        : `/api/register`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      setSuccess('Registration was successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err: unknown) {
      // Network errors (like CORS or DNS) surface as TypeError("Failed to fetch") in browsers
      if (err instanceof TypeError) {
        setError(`Network error: ${err.message}. Check backend URL, CORS, and network connectivity.`);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 rounded-xl shadow-lg bg-gray-900 border border-gray-800">
      <h1 className="text-3xl font-extrabold mb-6 text-white text-center">Create Account</h1>
      {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
      {success && <p className="text-green-400 text-sm mb-4 text-center">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
            <option value="patient">Patient</option>
            <option value="health_worker">Health Worker</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}
