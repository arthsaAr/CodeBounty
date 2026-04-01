import React from 'react'
import { FiTarget } from 'react-icons/fi'
import { MdOutlineDashboard, MdOutlineLogout  } from "react-icons/md";
import { GoTrophy } from "react-icons/go";

const Navbar = () => {
  return (
    <div className='w-full bg-[#0f131a] text-white px-6 py-4 flex items-center justify-between'>
        <div className="text-xl font-semibold">
            <span className="text-green-400">&lt;/&gt;</span>{" "}
            Code<span className="text-green-400">Bounty</span>
        </div>

      <div className="flex items-center gap-4">
        <div className='flex flex-row gap-1 items-center rounded-lg p-2 hover:bg-gray-800'>  
            <MdOutlineDashboard color="green" size={20}/>
            <button>Dashboard</button>
        </div>
        <div className='flex flex-row gap-1 items-center rounded-lg  p-2 hover:bg-gray-800'>  
            <FiTarget color="green" size={20}/>
            <button>Browse Bounties</button>
        </div>
        <div className='flex flex-row gap-1 items-center rounded-lg p-2 hover:bg-gray-800'>  
            <GoTrophy  color="green" size={20}/>
            <button>Leaderboard</button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="hover:text-green-400">demo_user</button>
        <MdOutlineLogout color="gray" size={20} />
      </div>
    </div>
  )
}

export default Navbar