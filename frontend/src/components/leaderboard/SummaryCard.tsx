import React from 'react'
import { FiTarget } from 'react-icons/fi'
import { GiAchievement } from 'react-icons/gi'
import { GoTrophy } from 'react-icons/go'

const SummaryCard = () => {
  return (
    <div>
        <h2 className='text-2xl font-semibold mb-4'>Quick Actions</h2>
        
        <div className='flex flex-row gap-5 items-center'>
            <div 
                className='flex-1 flex flex-col gap-1 items-center justify-center text-center border border-gray-800 bg-[#151920] hover:border-emerald-700 rounded-lg p-8 '>
                <FiTarget color="green" size={60}/>
                <h2 className='text-2xl'>1,247</h2>
                <h3 className='text-lg text-gray-500'>Total Bug Reports</h3>
            </div>

            <div
                className='flex-1 flex flex-col gap-1 items-center justify-center text-centerborder border-gray-800 bg-[#151920] hover:border-emerald-700 rounded-lg p-8 '>
                <GiAchievement color="green" size={60} />
                <h2 className='text-2xl'>87%</h2>
                <h3 className='text-lg text-gray-500'>Average Success Rate</h3>
            </div>

            <div
                className='flex-1 flex flex-col gap-1 items-center justify-center text-center border border-gray-800 bg-[#151920] hover:border-emerald-700 rounded-lg p-8 '>
                <GoTrophy color="green" size={60} />
                <h2 className='text-2xl'>$127k</h2>
                <h3 className='text-lg text-gray-500'>Total Payouts</h3>
            </div>
        </div>
    </div>
  )
}

export default SummaryCard