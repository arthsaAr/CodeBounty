import React from 'react'
import { useState } from "react";
import NavBar from '../components/NavBar'
import Bottombar from "../components/Bottombar";

const CommonDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
        <NavBar setActivePage={setActivePage} activePage={activePage} loginStatus="common" />

        <div className="flex-grow px-8 md:px-16 py-6 mt-20">

        </div>
        
        <Bottombar />
    </div>
  )
}

export default CommonDashboard