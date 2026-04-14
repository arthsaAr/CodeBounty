// page to show all the active bounties
// lets user act as bug hunters(fixers)
import React from 'react'
import Bottombar from "../components/Bottombar";
import Navbar from "../components/NavOwner";
import { useState } from "react";

export default function OwnerDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">

      <Navbar setActivePage={setActivePage} activePage={activePage} />

      <div className="flex-grow px-8 md:px-16 py-6 mt-20">
        CHECK
      </div>

      <Bottombar />
    </div>
  )
}
