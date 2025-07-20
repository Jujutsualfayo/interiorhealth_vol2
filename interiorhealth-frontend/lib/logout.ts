// lib/logout.ts
'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    router.push('/(auth)/login'); // Redirect to login page
  };

  return logout;
}
