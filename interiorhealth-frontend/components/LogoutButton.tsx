'use client';

import { useEffect, useState } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setShow(true);
    }
  }, []);

  const handleLogout = () => {
    deleteCookie('token');
    deleteCookie('role');
    router.push('/');
  };

  if (!show) return null;

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
