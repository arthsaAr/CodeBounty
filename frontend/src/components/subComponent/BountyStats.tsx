import React from 'react'

type BountyStatsProps = {
    submissions: number;
    reward: number;
    status: string;
}

const BountyStats = ({ submissions, reward, status }: BountyStatsProps) => {
  return (
    <div className='mt-4 rounded-lg bg-[#151920] border w-1/3 border-gray-800 p-5 justify-between items-center cursor-pointer'>
        <h1 className='text-white text-lg'>Bounty Stats</h1>

        <div className='flex flex-col gap-3 mt-3'>
            <div className='flex flex-row justify-between rounded-md bg-[#1b212c] border-gray-800 p-3'>
                <h1 className='text-gray-400 text-lg'>Total Submissions</h1>
                <h1 className='text-white text-lg'>{submissions}</h1>
            </div>
            <div className='flex flex-row justify-between rounded-md bg-[#1b212c] border-gray-800 p-3'>
                <h1 className='text-gray-400 text-lg'>Reward</h1>
                <h1 className='text-emerald-400 text-lg'>{reward}</h1>
            </div>
            <div className='flex flex-row justify-between rounded-md bg-[#1b212c] border-gray-800 p-3'>
                <h1 className='text-gray-400 text-lg'>Status</h1>
                <h1 className='text-emerald-400 text-lg'>{status}</h1>
            </div>
        </div>
    </div>
  )
}

export default BountyStats