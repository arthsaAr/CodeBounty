import React from 'react'
import { FiTarget } from 'react-icons/fi'
import { MdOutlineDashboard, MdOutlineLogout  } from "react-icons/md";
import { GoTrophy } from "react-icons/go";
import { RiCoinsLine } from 'react-icons/ri';
import { SlBadge } from 'react-icons/sl';
import pic1 from "../assets/profile/boy.png";
import { RiAddFill } from "react-icons/ri";

type NavBarProps = {
  setActivePage: (page: string) => void;
  activePage: string;
  loginStatus: string;
}

const NavBar = ({ setActivePage, activePage, loginStatus }: NavBarProps) => {

  return (
    <div className="w-full fixed top-0 z-50 bg-[#0f131a]/70 backdrop-blur-md text-white px-6 py-4 flex items-center justify-between">
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
          className={`flex flex-row gap-2 items-center rounded-lg px-3 py-2 cursor-pointer 
          ${            
            activePage === "bounties"
              ? "bg-gray-800"
              : "hover:bg-gray-800"
          }
          `}>  
            <FiTarget color="green" size={20}/>
            <span className={activePage === "bounties" ? "text-emerald-400" : "text-white"}>Browse Bounties</span>
        </div>

        {loginStatus !== "hunter" && (
          <div
            onClick={() => setActivePage("createBounty")}
            className={`flex flex-row gap-2 items-center rounded-lg px-3 py-2 cursor-pointer 
            ${            
              activePage === "createBounty"
                ? "bg-gray-800"
                : "hover:bg-gray-800"
            }
            `}>  
              <RiAddFill color="green" size={20}/>
              <span className={activePage === "createBounty" ? "text-emerald-400" : "text-white"}>Create Bounty</span>
          </div>
        )}

        <div 
          onClick={() => setActivePage("leaderboard")}
          className={`flex flex-row gap-2 items-center rounded-lg px-3 py-2 cursor-pointer 
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
        
      {loginStatus === "owner" ? 
        <div className='flex flex-row bg-gray-700 rounded-full p-2 gap-2'>
          <RiCoinsLine className="text-green-700" size={22}/>
          <h3>5000</h3>
        </div>
      :  
        <div className='flex flex-row gap-2'>
          <div className='flex flex-row bg-gray-700 rounded-full p-2 gap-2'>
            <RiCoinsLine className="text-green-700" size={22}/>
            <h3>320</h3>
          </div>

          <div className='bg-gray-700 flex flex-row rounded-full p-2 gap-2'>
            <SlBadge className="text-green-700" size={22}/>  
            <h3>850</h3>
          </div>
        </div>
      }

        <img src={pic1} className="w-8 h-8 rounded-full border border-emerald-400" />
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

export default NavBar