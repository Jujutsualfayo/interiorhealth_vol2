"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';
import React, { useState } from 'react';

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
  <header className="flex items-center justify-between p-4 bg-gray-900 shadow-lg border-b border-gray-800">
        <button
          className="text-2xl p-2 rounded hover:bg-gray-700 focus:outline-none text-gray-200 border border-gray-700"
          aria-label="Open sidebar"
          onClick={() => setSidebarOpen(true)}
        >
          <span>&#9776;</span>
        </button>
        <div className="flex items-center gap-3 relative">
          <button
            className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg focus:outline-none border-2 border-gray-500"
            aria-label="Open profile"
            onClick={() => setProfileOpen((open) => !open)}
          >
            P
          </button>
          <span className="font-semibold text-lg text-gray-200">Patient</span>
          {profileOpen && (
            <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl p-6 min-w-[220px] z-50 border border-gray-200">
              <div className="mb-2 text-gray-900 font-bold text-lg">Benjamin Alfayo</div>
              <div className="mb-1 text-sm text-gray-700">patient@example.com</div>
              <div className="mb-3 text-sm text-gray-700">0700000000</div>
              <Link href="/dashboard/patient/account" className="block w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 text-center font-bold mb-2">Edit Profile</Link>
              <button className="w-full bg-gray-100 text-gray-900 py-2 rounded hover:bg-gray-200 text-center font-bold" onClick={() => setProfileOpen(false)}>Close</button>
            </div>
          )}
        </div>
        <LogoutButton />
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-70" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-56 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 p-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ boxShadow: sidebarOpen ? '2px 0 8px rgba(0,0,0,0.18)' : 'none' }}
      >
        <button
          className="text-xl text-gray-300 mb-6 self-end p-1 hover:bg-gray-800 rounded"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        >
          &times;
        </button>
        <div>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-xl mr-3">P</div>
            <div>
              <div className="font-semibold text-lg text-gray-200">Patient</div>
              <div className="text-xs text-gray-400">Welcome!</div>
            </div>
          </div>
          <nav className="flex flex-col space-y-4">
            <Link href="/dashboard/patient" className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800 transition cursor-pointer font-medium ${pathname === "/dashboard/patient" ? "text-gray-100 font-bold" : "text-gray-300"}`}> 
              <span>🏠</span> Home
            </Link>
            <Link href="/dashboard/patient/orders" className={`px-3 py-2 rounded hover:bg-gray-800 transition cursor-pointer font-medium ${pathname === "/dashboard/patient/orders" ? "text-gray-100 font-bold" : "text-gray-300"}`}> 
              My Orders
            </Link>
            <Link href="/dashboard/patient/account" className={`px-3 py-2 rounded hover:bg-gray-800 transition cursor-pointer font-medium ${pathname === "/dashboard/patient/account" ? "text-gray-100 font-bold" : "text-gray-300"}`}> 
              My Account
            </Link>
            <Link href="/dashboard/patient/health-tips" className={`px-3 py-2 rounded hover:bg-gray-800 transition cursor-pointer font-medium ${pathname === "/dashboard/patient/health-tips" ? "text-gray-100 font-bold" : "text-gray-300"}`}> 
              Health Tips
            </Link>
            <Link href="/dashboard/patient/drugs" className={`px-3 py-2 rounded hover:bg-gray-800 transition cursor-pointer font-medium ${pathname === "/dashboard/patient/drugs" ? "text-gray-100 font-bold" : "text-gray-300"}`}> 
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
