import AuthGate from "@/components/AuthGate";

export default function AdminDashboard() {
  return (
    <AuthGate allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-blue-600">InteriorHealth</h2>
          </div>
          <nav className="p-4 space-y-2">
            <a href="#" className="block px-4 py-2 rounded hover:bg-blue-100 text-gray-700">Dashboard</a>
            <a href="#" className="block px-4 py-2 rounded hover:bg-blue-100 text-gray-700">Users</a>
            <a href="#" className="block px-4 py-2 rounded hover:bg-blue-100 text-gray-700">Orders</a>
            <a href="#" className="block px-4 py-2 rounded hover:bg-blue-100 text-gray-700">Drugs</a>
            <a href="#" className="block px-4 py-2 rounded hover:bg-red-100 text-red-600">Logout</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500">Welcome, Admin. Manage the system efficiently.</p>
          </header>

          {/* Dashboard Widgets */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
              <p className="mt-2 text-2xl font-bold text-blue-600">142</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold text-gray-700">Pending Orders</h3>
              <p className="mt-2 text-2xl font-bold text-yellow-500">37</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold text-gray-700">Available Drugs</h3>
              <p className="mt-2 text-2xl font-bold text-green-600">215</p>
            </div>
          </section>
        </main>
      </div>
    </AuthGate>
  );
}
