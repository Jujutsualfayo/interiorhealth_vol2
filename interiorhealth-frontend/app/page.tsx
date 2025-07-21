'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-100 via-white to-green-100">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-5xl font-extrabold mb-4 text-green-700">Welcome to Interior Health</h1>
        <p className="text-lg text-gray-700 mb-8">
          Bridging the gap in healthcare access for interior communities.
          Affordable, accessible, and essential medical support at your fingertips.
        </p>

        <div className="flex justify-center space-x-6">
          <Link
            href="/auth/login"
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="border border-green-600 text-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition"
          >
            Register
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Interior Health. All rights reserved.
        </div>
      </div>
    </main>
  );
}
