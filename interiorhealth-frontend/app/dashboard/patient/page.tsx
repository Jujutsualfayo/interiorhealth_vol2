import AuthGate from "@/components/AuthGate";

export default function PatientDashboard() {
  return (
    <AuthGate allowedRoles={["patient"]}>
      <main className="p-8">
        <h1 className="text-2xl font-bold">Patient Dashboard</h1>
        <p className="mt-4 text-gray-700">
          Welcome to your patient dashboard. Here you can view available medications,
          place orders, and track deliveries.
        </p>
      </main>
    </AuthGate>
  );
}
