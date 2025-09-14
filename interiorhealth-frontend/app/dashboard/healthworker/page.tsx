import AuthGate from "@/components/AuthGate";

export default function HealthworkerDashboard() {
  return (
    <AuthGate allowedRoles={["healthworker"]}>
      <div className="min-h-screen bg-gray-100 p-0 md:p-8 flex flex-col">
        <div className="mx-auto w-full max-w-5xl py-8 px-4 md:px-0">
          <h1 className="mb-8 text-3xl font-semibold text-slate-800">Healthworker Dashboard</h1>

          <div className="rounded-2xl bg-white p-8 shadow-md">
            <p className="mb-8 text-slate-600 text-lg">
              Welcome! Manage your assigned patients, check inventory, and update health records with ease.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <WidgetCard
                icon="👨‍⚕️"
                title="Assigned Patients"
                description="View and manage patients under your care."
                color="bg-slate-100"
              />
              <WidgetCard
                icon="🧪"
                title="Drug Inventory"
                description="Check availability and request drugs for your patients."
                color="bg-slate-100"
              />
              <WidgetCard
                icon="📋"
                title="Health Records"
                description="Update or review recent patient interactions and notes."
                color="bg-slate-100"
              />
              <WidgetCard
                icon="💬"
                title="Support"
                description="Get help with your dashboard or report system issues."
                color="bg-slate-100"
              />
            </div>
          </div>
        </div>
      </div>
    </AuthGate>
  );
}

function WidgetCard({ icon, title, description, color }: { icon: string; title: string; description: string; color?: string }) {
  return (
    <div className={`rounded-2xl ${color || "bg-slate-100"} p-6 flex flex-col items-center shadow-sm hover:shadow-md transition`}>
      <span className="text-4xl mb-4">{icon}</span>
      <div className="text-lg font-medium text-slate-800 mb-2 text-center">{title}</div>
      <p className="text-slate-500 text-sm text-center">{description}</p>
    </div>
  );
}
