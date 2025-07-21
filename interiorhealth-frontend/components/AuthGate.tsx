"use client";

import { ReactNode } from "react";
import { useAuthRedirect } from "@/lib/auth";

interface AuthGateProps {
  allowedRoles: string[];
  children: ReactNode;
}

export default function AuthGate({ allowedRoles, children }: AuthGateProps) {
  const { loading } = useAuthRedirect(allowedRoles);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
