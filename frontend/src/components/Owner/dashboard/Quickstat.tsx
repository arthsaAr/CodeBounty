import React, { useState, useEffect } from 'react'
import { FiTarget } from 'react-icons/fi'
import { RiCoinsLine } from "react-icons/ri";
import { FaArrowTrendUp } from "react-icons/fa6";

type quickStatProps = {
  userName: string;
}

const Quickstat = ({ userName }: quickStatProps) => {

  return (
    <div>
        <h1 className="text-3xl font-semibold mb-2 mt-3">Welcome back, {userName}!</h1>
        <h3 className="text-lg mb-6 text-gray-400">Manage your bounties and review submissions</h3>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-5xl'>
          <div className='rounded-lg bg-[#151920] border border-gray-800 p-6 flex justify-between items-center hover:border-gray-500 transition duration-300 ease-in-out cursor-pointer'>
            <div>
              <h1 className='text-gray-400 text-sm'>Credits</h1>
              <h2 className='text-emerald-400 mt-1 font-semibold text-2xl'>5000</h2>
            </div>
            <RiCoinsLine className="text-green-700"  opacity={0.8} size={35}/>
          </div>

          <div className='rounded-lg bg-[#151920] border border-gray-800 p-6 flex justify-between items-center hover:border-gray-500 transition duration-300 ease-in-out cursor-pointer'>
            <div>
              <h1 className='text-gray-400 text-sm'>Active Bounties</h1>
              <h2 className='text-emerald-400 mt-1 font-semibold text-2xl'>0</h2>
            </div>
            <FiTarget  className="text-blue-500" opacity={0.8} size={35}/>
          </div>

          <div className='rounded-lg bg-[#151920] border border-gray-800 p-6 flex justify-between items-center hover:border-gray-500 transition duration-300 ease-in-out cursor-pointer'>
            <div>
              <h1 className='text-gray-400 text-sm'>Total Spent</h1>
              <h2 className='mt-1 font-semibold text-2xl'>0</h2>
            </div>
            <FaArrowTrendUp className="text-green-700" opacity={0.8} size={35}/>
          </div>
        </div>
    </div>
  )
}

export default Quickstat