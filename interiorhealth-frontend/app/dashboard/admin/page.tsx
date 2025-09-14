"use client"
import AuthGate from "@/components/AuthGate";
import Link from "next/link";
import { useState } from "react";

const sidebarLinks = [
  { href: "/dashboard/admin", label: "Dashboard", icon: "🏠" },
  { href: "/dashboard/admin/users", label: "Users", icon: "👥" },
  { href: "/dashboard/admin/orders", label: "Orders", icon: "📦" },
  { href: "/dashboard/admin/drugs", label: "Drugs", icon: "🧪" },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <AuthGate allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 h-full z-40 w-72 bg-white shadow-lg flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">InteriorHealth</h2>
            <button
              className="text-xl text-slate-700 p-2 rounded hover:bg-slate-200"
              aria-label="Close sidebar"
              onClick={() => setSidebarOpen(false)}
            >
              &times;
            </button>
          </div>
          {/* Profile Section */}
          <div className="flex flex-col items-center py-6 border-b">
            <div className="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-2xl mb-2">A</div>
            <div className="font-semibold text-lg text-slate-800">Admin</div>
            <div className="text-xs text-gray-500">System Administrator</div>
          </div>
          <nav className="p-4 flex-1 space-y-2">
            {sidebarLinks.map(link => (
              <Link key={link.href} href={link.href} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium transition">
                <span className="text-xl">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-black/10 text-black font-medium transition mt-8">
              <span className="text-xl">🚪</span> Logout
            </button>
          </nav>
        </aside>

        {/* Sidebar overlay for mobile */}
        {!sidebarOpen && (
          <button
            className="fixed top-4 left-4 z-50 bg-white shadow p-2 rounded-full text-2xl text-slate-700"
            aria-label="Open sidebar"
            onClick={() => setSidebarOpen(true)}
          >
            &#9776;
          </button>
        )}

        {/* Main Content */}
        <main className="flex-1 py-10 px-6 md:px-12 ml-72">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold text-slate-800">Admin Dashboard</h1>
            <p className="text-slate-500 text-lg">Welcome, Admin. Manage the system efficiently.</p>
          </header>

          {/* Dashboard Widgets */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <WidgetCard
              icon="👥"
              title="Total Users"
              value="142"
              color="bg-slate-100"
            />
            <WidgetCard
              icon="📦"
              title="Pending Orders"
              value="37"
              color="bg-slate-100"
            />
            <WidgetCard
              icon="🧪"
              title="Available Drugs"
              value="215"
              color="bg-slate-100"
            />
          </section>
        </main>
      </div>
    </AuthGate>
  );
}

function WidgetCard({ icon, title, value, color }: { icon: string; title: string; value: string; color?: string }) {
  return (
    <div className={`rounded-2xl ${color || "bg-slate-100"} p-8 flex flex-col items-center shadow-sm hover:shadow-md transition`}>
      <span className="text-4xl mb-4">{icon}</span>
      <div className="text-lg font-medium text-slate-800 mb-2 text-center">{title}</div>
      <div className="text-3xl font-bold text-slate-700 mb-2">{value}</div>
    </div>
  );
}
