// NavBar.js
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const [navbar, setNavbar] = useState(false);
  const [activeLink, setActiveLink] = useState('Track Shipment');
  const router = useRouter();

  const handleNavbarToggle = () => {
    setNavbar(!navbar);
  };

  useEffect(() => {
    setActiveLink('shipment');
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     const res = await signOut();
  //     if (res.error) {
  //       // Handle any sign-out errors here
  //       console.error('Error during sign-out:', res.error);
  //     } else {
  //       router.push('/login');
  //     }
  //   } catch (error) {
  //     console.error('Error during sign-out:', error);
  //   }
  // };
  const handleLogout  = async () => {
    const res = await signOut();

    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <nav className={`bg-gradient-to-r from-blue-500 to-green-500 p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link
            href="shipment"
            passHref
            onClick={() => setActiveLink('Track Shipment')}
          >
            <button
              className={`${
                activeLink === 'Track Shipment'
                  ? 'text-yellow-300 bg-pink-600'
                  : 'text-white hover:bg-pink-600 hover:text-yellow-300'
              } font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out`}
            >
              Shipment Management
            </button>
          </Link>
          
          <Link
            href="driverRegistration"
            passHref
            onClick={() => setActiveLink('Driver')}
          >
            <button
              className={`${
                activeLink === 'Driver'
                  ? 'text-yellow-300 bg-pink-600'
                  : 'text-white hover:bg-pink-600 hover:text-yellow-300'
              } font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out`}
            >
              Driver Management
            </button>
          </Link>
        </div>
        
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
