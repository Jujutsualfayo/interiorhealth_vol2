import { useAuthRedirect } from "@/lib/auth";


export default function AdminDashboard() {
  useAuthRedirect(["admin"]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Only accessible by Admins</p>
    </div>
  );
}
