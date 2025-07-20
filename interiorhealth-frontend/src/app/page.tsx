// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[80px_1fr_80px] font-sans bg-gradient-to-br from-blue-50 to-white text-gray-800">
      {/* Header */}
      <header className="row-start-1 flex items-center justify-between px-8 py-4 shadow-md bg-white">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="InteriorHealth" width={40} height={40} />
          <h1 className="text-xl font-bold text-blue-700">InteriorHealth</h1>
        </div>
        <nav className="flex gap-6 text-sm">
          <Link href="/login" className="hover:underline text-blue-600">
            Login
          </Link>
          <Link href="/register" className="hover:underline text-blue-600">
            Register
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="row-start-2 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-blue-800">
          Welcome to InteriorHealth
        </h2>
        <p className="text-lg text-gray-700 max-w-xl">
          Empowering healthcare providers and patients through secure, accessible digital tools.
        </p>
        <div className="flex gap-4 mt-4">
          <Link
            href="/login"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Register
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 text-sm text-gray-600 flex items-center justify-center border-t py-4">
        &copy; {new Date().getFullYear()} InteriorHealth. All rights reserved.
      </footer>
    </div>
  );
}
















