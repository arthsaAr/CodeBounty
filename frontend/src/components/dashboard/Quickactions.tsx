import React from 'react'
import { FiTarget } from 'react-icons/fi'
import { GiAchievement } from "react-icons/gi";
import { SlBadge } from "react-icons/sl";

type NavBarProps = {
  setActivePage: (page: string) => void;
}

const Quickactions = ({ setActivePage}: NavBarProps) => {
  return (
    <div>
        <h2 className='text-2xl font-semibold mb-4'>Quick Actions</h2>
        
        <div className='flex flex-row gap-4'>
            <div 
                onClick={() => setActivePage("bounties")}
                className='flex flex-col gap-1 items-center border border-gray-800 bg-[#151920] hover:border-emerald-700 rounded-lg p-8 '>
                <FiTarget color="green" size={55}/>
                <h2 className='text-2xl'>Browse Bounties</h2>
                <h3 className='text-lg text-gray-500'>Find active bounties to work on</h3>
            </div>

            <div 
                onClick={() => setActivePage("leaderboard")}
                className='flex flex-col gap-1 items-center border border-gray-800 bg-[#151920] hover:border-emerald-700 rounded-lg p-8 '>
                <SlBadge color="green" size={55} />
                <h2 className='text-2xl'>Leaderboard</h2>
                <h3 className='text-lg text-gray-500'>See top hunters and stats</h3>
            </div>
        </div>
    </div>
  )
}

export default Quickactions