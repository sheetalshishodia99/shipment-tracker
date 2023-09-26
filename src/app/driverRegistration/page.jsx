// DriverRegistration.js
"use client"
import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
import NavBar from '@/src/components/layoutProviders';
import Driver from '../../components/DriverManagement/driver'
import { redirect } from "next/navigation";
import { useSession } from 'next-auth/react';


const DriverRegistration = () => { 
      // const { data: session } = useSession();
      // if (!session) redirect("/login");
  return (
    <>
    <NavBar></NavBar>
    <Driver></Driver>
    </>
  );
};

export default DriverRegistration;
