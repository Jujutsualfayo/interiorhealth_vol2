"use client";
import React from "react";
import Link from "next/link";

export default function SlideBackgroundLanding() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-green-100 via-white to-green-200">
      {/* Animated Slides Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Slide 1 */}
        <img
          src="/landing1.jpg"
          alt="Slide 1"
          className="absolute top-1/4 left-0 w-1/4 h-2/3 object-cover rounded-2xl border-4 border-green-700 shadow-lg"
          style={{ animation: "slide-x 12s ease-in-out infinite, slide-y 8s ease-in-out infinite" }}
        />
        {/* Slide 2 */}
        <img
          src="/landing2.jpg"
          alt="Slide 2"
          className="absolute top-1/2 left-1/4 w-1/4 h-2/3 object-cover rounded-2xl border-4 border-green-900 shadow-lg"
          style={{ animation: "slide-x 12s ease-in-out infinite, slide-y-reverse 10s ease-in-out infinite" }}
        />
        {/* Slide 3 */}
        <img
          src="/landing3.jpg"
          alt="Slide 3"
          className="absolute top-1/3 left-2/4 w-1/4 h-2/3 object-cover rounded-2xl border-4 border-green-400 shadow-lg"
          style={{ animation: "slide-x 12s ease-in-out infinite, slide-y 8s ease-in-out infinite" }}
        />
        {/* Slide 4 */}
        <img
          src="/landing4.jpg"
          alt="Slide 4"
          className="absolute top-1/4 left-3/4 w-1/4 h-2/3 object-cover rounded-2xl border-4 border-green-500 shadow-lg"
          style={{ animation: "slide-x 14s ease-in-out infinite, slide-y-reverse 12s ease-in-out infinite" }}
        />
      </div>
      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl px-6 py-12 bg-white/80 rounded-xl shadow-xl backdrop-blur-md">
        <h1 className="text-5xl font-extrabold mb-4 text-green-700 drop-shadow-lg">Welcome to Interior Health</h1>
        <p className="text-lg text-gray-700 mb-8">
          Bridging the gap in healthcare access for interior communities.<br />
          Affordable, accessible, and essential medical support at your fingertips.
        </p>
        <div className="flex justify-center space-x-6 mb-8">
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
        <div className="mt-8 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Interior Health. All rights reserved.
        </div>
      </div>
      {/* Keyframes for slide animation */}
      <style jsx>{`
        @keyframes slide-x {
          0% { transform: translateX(-10%); }
          50% { transform: translateX(10%); }
          100% { transform: translateX(-10%); }
        }
        @keyframes slide-y {
          0% { transform: translateY(-10%); }
          50% { transform: translateY(10%); }
          100% { transform: translateY(-10%); }
        }
        @keyframes slide-y-reverse {
          0% { transform: translateY(10%); }
          50% { transform: translateY(-10%); }
          100% { transform: translateY(10%); }
        }
        .animate-slide-x {
          animation: slide-x 12s ease-in-out infinite;
        }
        .animate-slide-y {
          animation: slide-y 8s ease-in-out infinite;
        }
        .animate-slide-y-reverse {
          animation: slide-y-reverse 10s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
