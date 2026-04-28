import React from 'react'
import Navbar from "./NavBar";

const BountyDetails = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar setActivePage={null} activePage={null} loginStatus={"owner"} />

        <div className="flex-grow px-8 md:px-16 py-6 mt-20">
          <h1 className="text-3xl font-semibold mb-2 mt-3">Debounce hook optimization</h1>
          <h3 className="text-lg mb-6 text-gray-400">The custom debounce hook could be optimized. Looking for cleaner implementation.</h3>
        </div>
    </div>
  )
}

export default BountyDetails