"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';
import React, { useState } from 'react';

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 bg-gray-100 shadow">
        <button
          className="text-2xl p-2 rounded hover:bg-gray-200 focus:outline-none"
          aria-label="Open sidebar"
          onClick={() => setSidebarOpen(true)}
        >
          <span>&#9776;</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white font-bold text-lg">P</div>
          <span className="font-semibold text-lg text-green-700">Patient</span>
        </div>
        <LogoutButton />
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-56 bg-gradient-to-b from-green-200 to-green-100 p-8 flex flex-col justify-between shadow-lg transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ boxShadow: sidebarOpen ? '2px 0 8px rgba(0,0,0,0.08)' : 'none' }}
      >
        <button
          className="text-xl text-green-700 mb-6 self-end p-1 hover:bg-green-300 rounded"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        >
          &times;
        </button>
        <div>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-white font-bold text-xl mr-3">P</div>
            <div>
              <div className="font-semibold text-lg">Patient</div>
              <div className="text-xs text-gray-600">Welcome!</div>
            </div>
          </div>
          <nav className="flex flex-col space-y-4">
            <Link href="/dashboard/patient" className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-green-300 transition cursor-pointer font-medium ${pathname === "/dashboard/patient" ? "text-green-700 font-bold" : "text-green-900"}`}>
              <span>🏠</span> Home
            </Link>
            <Link href="/dashboard/patient/orders" className={`px-3 py-2 rounded hover:bg-green-300 transition cursor-pointer font-medium ${pathname === "/dashboard/patient/orders" ? "text-green-700 font-bold" : "text-green-900"}`}>
              My Orders
            </Link>
            <Link href="/dashboard/patient/account" className={`px-3 py-2 rounded hover:bg-green-300 transition cursor-pointer font-medium ${pathname === "/dashboard/patient/account" ? "text-green-700 font-bold" : "text-green-900"}`}>
              My Account
            </Link>
            <Link href="/dashboard/patient/health-tips" className={`px-3 py-2 rounded hover:bg-green-300 transition cursor-pointer font-medium ${pathname === "/dashboard/patient/health-tips" ? "text-green-700 font-bold" : "text-green-900"}`}>
              Health Tips
            </Link>
            <Link href="/dashboard/patient/drugs" className={`px-3 py-2 rounded hover:bg-green-300 transition cursor-pointer font-medium ${pathname === "/dashboard/patient/drugs" ? "text-green-700 font-bold" : "text-green-900"}`}>
              Drug Catalog
            </Link>
          </nav>
        </div>
        {/* Removed duplicate LogoutButton from sidebar */}
      </aside>

      {/* Main Content */}
      <main className="p-10 mt-4">{children}</main>
    </div>
  );
}
