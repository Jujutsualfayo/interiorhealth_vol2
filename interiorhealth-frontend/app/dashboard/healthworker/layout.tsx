"use client";
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import React, { useState } from 'react';

export default function HealthworkerLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
  <header className="flex items-center justify-between p-4 bg-gray-900 shadow-lg border-b border-blue-900">
        <button
          className="text-2xl p-2 rounded hover:bg-gray-200 focus:outline-none"
          aria-label="Open sidebar"
          onClick={() => setSidebarOpen(true)}
        >
          <span>&#9776;</span>
        </button>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <LogoutButton />
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
  className={`fixed top-0 left-0 z-50 h-full w-48 bg-gradient-to-b from-blue-900 to-gray-900 p-6 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ boxShadow: sidebarOpen ? '2px 0 8px rgba(0,0,0,0.08)' : 'none' }}
      >
        <button
          className="text-xl text-blue-100 mb-6 self-end p-1 hover:bg-blue-800 rounded"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        >
          &times;
        </button>
        <h2 className="text-base font-semibold mb-6 text-blue-100">Healthworker</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/dashboard/healthworker" className="px-3 py-2 rounded text-blue-100 hover:bg-blue-800 hover:text-white transition font-medium">
            Home
          </Link>
          <Link href="/dashboard/healthworker/orders" className="px-3 py-2 rounded text-black hover:bg-blue-800 hover:text-blue-100 transition">
            Orders
          </Link>
          <Link href="/dashboard/healthworker/patients" className="px-3 py-2 rounded text-black hover:bg-blue-800 hover:text-blue-100 transition">
            Patients
          </Link>
        </nav>
      </aside>

  <main className="p-8 mt-6">{children}</main>
    </div>
  );
}
