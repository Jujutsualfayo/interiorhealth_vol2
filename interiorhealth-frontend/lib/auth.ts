// lib/auth.ts

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Utility: Get token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Utility: Get role from localStorage
export const getUserRole = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("role");
  }
  return null;
};

// Hook: Access auth token and role
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

// Hook: Redirect users not in allowed roles
export function useAuthRedirect(allowedRoles: string | string[]) {
  const router = useRouter();
  const { token, role, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      const rolesArray = Array.isArray(allowedRoles)
        ? allowedRoles
        : [allowedRoles];

      if (!token) {
        router.replace("/(auth)/login");
      } else if (!role || !rolesArray.includes(role)) {
        router.replace("/unauthorized"); // Optional fallback page
      }
    }
  }, [token, role, loading, router, allowedRoles]);

  return { token, role, loading };
}
