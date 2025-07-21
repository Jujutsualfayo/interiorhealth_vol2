// lib/auth.ts
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useAuthRedirect(allowedRoles: string[]) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    console.log("🔐 Cookie token:", token);
    console.log("🎭 Cookie role:", role);

    if (!token) {
      router.replace("/auth/login");
    } else if (!role || !allowedRoles.includes(role)) {
      router.replace("/unauthorized"); // or /auth/login if you want
    } else {
      setLoading(false); // All good
    }
  }, [allowedRoles, router]);

  return { loading };
}
