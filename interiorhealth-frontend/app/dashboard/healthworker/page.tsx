import AuthGate from "@/components/AuthGate";

export default function HealthworkerDashboard() {
  return (
    <AuthGate allowedRoles={["healthworker"]}>
      <div className="min-h-screen bg-gray-100 p-0 md:p-8 flex flex-col">
        <div className="mx-auto w-full max-w-5xl py-8 px-4 md:px-0">
          <h1 className="mb-8 text-3xl font-semibold text-slate-800">Healthworker Dashboard</h1>

          <div className="rounded-2xl bg-white p-8 shadow-md">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-2">Welcome, Healthworker!</h2>
                <p className="text-slate-600 text-base">Manage patients, inventory, and health records with ease.</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition">Add Patient</button>
                <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition">Request Drug</button>
              </div>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <WidgetStatCard icon="👨‍⚕️" title="Assigned Patients" value="12" color="bg-blue-50" />
              <WidgetStatCard icon="🧪" title="Drugs in Inventory" value="37" color="bg-blue-50" />
              <WidgetStatCard icon="📦" title="Pending Orders" value="5" color="bg-blue-50" />
              <WidgetStatCard icon="📋" title="Health Records" value="24" color="bg-blue-50" />
            </section>

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


const WidgetStatCard = ({ icon, title, value, color }: { icon: string; title: string; value: string; color?: string }) => (
  <div className={`rounded-2xl ${color || "bg-blue-50"} p-6 flex flex-col items-center shadow-sm hover:shadow-md transition`}>
    <span className="text-3xl mb-2">{icon}</span>
    <div className="text-base font-medium text-slate-700 mb-1 text-center">{title}</div>
    <div className="text-2xl font-bold text-blue-900 mb-1">{value}</div>
  </div>
);

function WidgetCard({ icon, title, description, color }: { icon: string; title: string; description: string; color?: string }) {
  return (
    <div className={`rounded-2xl ${color || "bg-slate-100"} p-6 flex flex-col items-center shadow-sm hover:shadow-md transition`}>
      <span className="text-4xl mb-4">{icon}</span>
      <div className="text-lg font-medium text-slate-800 mb-2 text-center">{title}</div>
      <p className="text-slate-500 text-sm text-center">{description}</p>
    </div>
  );
}
