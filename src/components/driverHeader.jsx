"use client"
import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react"; // Import the signOut function from NextAuth.js

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await signOut();

      console.log(res,"res");
        router.push('/login');
      
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };


  
  return (
    <div className={`bg-gradient-to-r from-blue-500 to-green-500 p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">Driver Dashboard</h1>
        <Button
          type="primary"
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
