// components/LogoutButton.tsx
'use client';

import { useLogout } from '@/lib/logout';

export default function LogoutButton() {
  const logout = useLogout();

  return (
    <button
      onClick={logout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}
