'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('token');
    const role = getCookie('role');

    if (token && role) {
      router.push(`/dashboard/${role}`);
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-100 via-white to-blue-100 text-gray-800">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-5xl font-extrabold mb-4 text-green-700">Welcome to Interior Health</h1>
        <p className="text-lg text-gray-700 mb-8">
          Bridging the gap in healthcare access for interior communities.
          Affordable, accessible, and essential medical support at your fingertips.
        </p>

        <div className="flex justify-center space-x-6">
          <a
            href="/(auth)/login"
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            Login
          </a>
          <a
            href="/(auth)/register"
            className="border border-green-600 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition"
          >
            Register
          </a>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Interior Health. All rights reserved.
        </div>
      </div>
    </main>
  );
}
