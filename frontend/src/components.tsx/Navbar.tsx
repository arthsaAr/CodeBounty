import React from 'react'
import { FiTarget } from 'react-icons/fi'
import { MdOutlineDashboard, MdOutlineLogout  } from "react-icons/md";
import { GoTrophy } from "react-icons/go";

type NavBarProps = {
  setActivePage: (page: string) => void;
  activePage: string;
}

const Navbar = ({ setActivePage, activePage }: NavBarProps) => {

  return (
    <div className='w-full bg-[#0f131a] text-white px-6 py-4 flex items-center justify-between'>
        <div className="text-xl font-semibold">
            <span className="text-green-400">&lt;/&gt;</span>{" "}
            Code<span className="text-green-400">Bounty</span>
        </div>

      <div className="flex items-center gap-4">
        <div 
          onClick={() => setActivePage("dashboard")}
          className={`flex flex-row gap-2 items-center rounded-lg px-3 py-2 cursor-pointer 
          ${
            activePage === "dashboard"
              ? "bg-gray-800"
              : "hover:bg-gray-800"
          }
          `}>  
            <MdOutlineDashboard color="green" size={20}/>
            <span className={activePage === "dashboard" ? "text-emerald-400" : "text-white"}>Dashboard</span>
        </div>

        <div
          onClick={() => setActivePage("bounties")}
          className={`flex flex-row gap-1 items-center rounded-lg p-2 
          ${            
            activePage === "bounties"
              ? "bg-gray-800"
              : "hover:bg-gray-800"
          }
          `}>  
            <FiTarget color="green" size={20}/>
            <span className={activePage === "bounties" ? "text-emerald-400" : "text-white"}>Browse Bounties</span>
        </div>

        <div 
          onClick={() => setActivePage("leaderboard")}
          className={`flex flex-row gap-1 items-center rounded-lg p-2 
          ${            
            activePage === "leaderboard"
              ? "bg-gray-800"
              : "hover:bg-gray-800"
          }
          `}>  
            <GoTrophy  color="green" size={20}/>
            <span className={activePage === "leaderboard" ? "text-emerald-400" : "text-white"}>Leaderboard</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="hover:text-green-400">demo_user</button>
        <button onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }}>
            <MdOutlineLogout color="gray" size={20} />
        </button>
      </div>
    </div>
  )
}

export default Navbar