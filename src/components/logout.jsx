// LogoutButton.js
"use client"
import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await signOut();

      console.log(res,"fesss");
      if (res.error) {
        console.error('Error during sign-out:', res.error);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
