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
      <aside className="w-64 bg-blue-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Healthworker Navigation</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/dashboard/healthworker">
            <span className="hover:underline cursor-pointer">Home</span>
          </Link>
          <Link href="/dashboard/healthworker/orders">
            <span className="hover:underline cursor-pointer">Orders</span>
          </Link>
          <Link href="/dashboard/healthworker/patients">
            <span className="hover:underline cursor-pointer">Patients</span>
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
