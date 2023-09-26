import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
// import Layout from "@/src/components/Layout";
import NavBar from "@/src/components/layoutProviders";
import Shipments from "@/src/components/Shipment/shipment";
// import Profile from "../../components/sideBar";
import DriverView from "../../components/driverView";
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";

import 'react-toastify/dist/ReactToastify.css';
export default async function Register() {
  const session = await getServerSession(authOptions);

  if (!session) {
    Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
      });
    redirect("/login"); 
  }

  console.log(session,'testststsaytsasd8787868y6') 
  if (session.user.role === 'admin') {
    return (
        <>
        <NavBar></NavBar> 
        </>);
  }
  else if (session.user.role === 'driver') {
    return (
        <>
          <DriverView session={session}></DriverView>
        </>);
  }


}



    
  

 




