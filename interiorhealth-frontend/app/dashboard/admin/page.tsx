import AuthGate from "@/components/AuthGate";

export default function AdminDashboard() {
  return (
    <AuthGate allowedRoles={["admin"]}>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Only accessible by Admins</p>
      </div>
    </AuthGate>
  );
}