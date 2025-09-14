import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default function HealthworkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-48 bg-blue-900 p-4 flex flex-col">
        <h2 className="text-base font-semibold mb-6 text-blue-100">Healthworker</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/dashboard/healthworker" className="px-3 py-2 rounded text-blue-100 hover:bg-blue-800 transition">
            Home
          </Link>
          <Link href="/dashboard/healthworker/orders" className="px-3 py-2 rounded text-blue-100 hover:bg-blue-800 transition">
            Orders
          </Link>
          <Link href="/dashboard/healthworker/patients" className="px-3 py-2 rounded text-blue-100 hover:bg-blue-800 transition">
            Patients
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <LogoutButton />
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
