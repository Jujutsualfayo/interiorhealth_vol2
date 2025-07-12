'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-blue-50 flex flex-col">
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to Interior Health
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Affordable drugs and medical support for interior communities, accessible anytime.
          </p>
          <div className="flex gap-4">
            <Link href="/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow">
                Get Started
              </button>
            </Link>
            <a
              href="#about"
              className="text-blue-600 hover:underline font-medium self-center"
            >
              Learn more
            </a>
          </div>
        </div>
        {/* ✅ SVG Illustration Here */}
      <img
        src="/images/healthcare-illustration.svg"
        alt="Healthcare Illustration"
        className="w-[500px] h-auto mb-6"
      />
      </section>

      <section id="about" className="bg-white py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg">
            Empowering patients and health workers in underserved areas with timely, affordable medical support through tech.
          </p>
        </div>
      </section>

      <footer className="mt-auto bg-blue-800 text-white py-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Interior Health. All rights reserved.</p>
      </footer>
    </main>
  );
}
