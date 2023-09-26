"use client"
import React, { useState, useEffect } from "react";
import NavBar from "@/src/components/layoutProviders";
import Shipments from "../../components/Shipment/shipment";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <>
      <NavBar />
      <Shipments />
    </>
  );
}

export default Profile;

