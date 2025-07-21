// lib/auth.ts
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useAuthRedirect(allowedRoles: string[]) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = Cookies.get("role");

    console.log("🎭 Cookie role:", role);

    if (!role || !allowedRoles.includes(role)) {
      router.replace("/unauthorized");
    } else {
      setLoading(false);
    }
  }, [allowedRoles, router]);

  return { loading };
}
