'use client';

import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export default function LogoutButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => {
        // logout logic here (e.g., delete cookies and redirect)
      }}
      className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}
