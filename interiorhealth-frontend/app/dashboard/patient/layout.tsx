"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-green-200 to-green-100 p-8 flex flex-col justify-between shadow-lg">
        <div>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center text-white font-bold text-xl mr-3">P</div>
            <div>
              <div className="font-semibold text-lg">Patient</div>
              <div className="text-xs text-gray-600">Welcome!</div>
            </div>
          </div>
          <nav className="flex flex-col space-y-4">
            <Link href="/dashboard/patient" legacyBehavior>
              <a className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-green-300 transition cursor-pointer font-medium ${pathname === "/dashboard/patient" ? "text-green-700 font-bold" : "text-green-900"}`}>
                <span>🏠</span> Home
              </a>
            </Link>
            <Link href="/dashboard/patient/orders" legacyBehavior>
              <a className={`px-3 py-2 rounded hover:bg-green-300 transition cursor-pointer font-medium ${pathname === "/dashboard/patient/orders" ? "text-green-700 font-bold" : "text-green-900"}`}>
                My Orders
              </a>
            </Link>
            <Link href="/dashboard/patient/account" legacyBehavior>
              <a className={`px-3 py-2 rounded hover:bg-green-300 transition cursor-pointer font-medium ${pathname === "/dashboard/patient/account" ? "text-green-700 font-bold" : "text-green-900"}`}>
                My Account
              </a>
            </Link>
            <Link href="/dashboard/patient/health-tips" legacyBehavior>
              <a className={`px-3 py-2 rounded hover:bg-green-300 transition cursor-pointer font-medium ${pathname === "/dashboard/patient/health-tips" ? "text-green-700 font-bold" : "text-green-900"}`}>
                Health Tips
              </a>
            </Link>
            <Link href="/dashboard/patient/drugs" legacyBehavior>
              <a className={`px-3 py-2 rounded hover:bg-green-300 transition cursor-pointer font-medium ${pathname === "/dashboard/patient/drugs" ? "text-green-700 font-bold" : "text-green-900"}`}>
                Drug Catalog
              </a>
            </Link>
          </nav>
        </div>
        <div className="mb-2">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="p-10">{children}</main>
      </div>
    </div>
  );
}
