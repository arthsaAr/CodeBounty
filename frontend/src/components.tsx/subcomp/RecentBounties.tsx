import React from 'react'
import { RiCoinsLine } from 'react-icons/ri'

const RecentBounties = () => {
  return (
    <div>
        <div className='flex flex-row justify-between mb-4 items-center'>
            <h2 className='text-2xl font-semibold'>Recent Bounties</h2>
            <button className='text-lg text-white hover:text-emerald-400'>View All</button>
        </div>

        <div className='rounded-xl bg-[#151920] border border-gray-800 p-6 flex justify-between items-start hover:border-emerald-700 cursor-pointer'>
            <div>
                <h1 className='text-white text-2xl'>Memory leak in Chart component</h1>
                <h2 className='text-gray-500 font-normal text-md'>react-dashboard /src/components/Chart.tsx</h2>
                <div className='flex flex-row gap-4 mt-2'>
                    <span className='px-3 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20'>hard</span>
                    <span className='px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20'>active</span>
                </div>
            </div>

            <div className='flex flex-col items-center justify-between'>
                <div className='px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium'>
                    500 credits
                </div>
                <span className='text-gray-500 text-sm mt-6'>3 submissions</span>
            </div>
        </div>
    </div>
  )
}

export default RecentBounties