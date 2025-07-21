import LogoutButton from '@/components/LogoutButton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <LogoutButton />
      </header>
      <main>{children}</main>
    </div>
  );
}
