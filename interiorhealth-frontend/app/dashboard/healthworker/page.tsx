import AuthGate from "@/components/AuthGate";

export default function HealthworkerDashboard() {
  return (
    <AuthGate allowedRoles={["healthworker"]}>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold text-blue-700">Healthworker Dashboard</h1>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <p className="mb-4 text-gray-700">
              Welcome, healthworker! Here you can manage your assigned patients, check drug availability,
              and update health records.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded border border-blue-100 p-4 hover:shadow-md">
                <h2 className="mb-2 text-lg font-semibold text-blue-600">Assigned Patients</h2>
                <p className="text-sm text-gray-600">View and manage patients under your care.</p>
              </div>

              <div className="rounded border border-green-100 p-4 hover:shadow-md">
                <h2 className="mb-2 text-lg font-semibold text-green-600">Drug Inventory</h2>
                <p className="text-sm text-gray-600">Check availability and request drugs for your patients.</p>
              </div>

              <div className="rounded border border-yellow-100 p-4 hover:shadow-md">
                <h2 className="mb-2 text-lg font-semibold text-yellow-600">Health Records</h2>
                <p className="text-sm text-gray-600">Update or review recent patient interactions and notes.</p>
              </div>

              <div className="rounded border border-red-100 p-4 hover:shadow-md">
                <h2 className="mb-2 text-lg font-semibold text-red-600">Support</h2>
                <p className="text-sm text-gray-600">Get help with your dashboard or report system issues.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGate>
  );
}
