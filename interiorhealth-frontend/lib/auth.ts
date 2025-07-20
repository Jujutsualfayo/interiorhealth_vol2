// lib/auth.ts

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Utility to get token and role from localStorage
export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const getUserRole = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("role");
  }
  return null;
};

// Hook to use auth state and role-based redirection
export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getAuthToken();
    const storedRole = getUserRole();

    setToken(storedToken);
    setRole(storedRole);
    setLoading(false);
  }, []);

  return { token, role, loading };
}

// Redirect unauthenticated users or users with wrong roles
export function useAuthRedirect(allowedRoles: string[]) {
  const router = useRouter();
  const { token, role, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!token || !role || !allowedRoles.includes(role)) {
        router.replace("/(auth)/login");
      }
    }
  }, [token, role, loading, router, allowedRoles]);

  return { token, role, loading };
}
