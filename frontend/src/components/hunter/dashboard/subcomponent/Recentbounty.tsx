import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type RecentProps = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  status: string;
  reward: number;
  submissions: number;
};

const Recentbounty = ({
  id,
  title,
  description,
  difficulty,
  status,
  reward,
  submissions
}: RecentProps) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/bounties/${id}`)}
      className='rounded-xl bg-[#151920] border border-gray-800 p-6 flex justify-between items-start hover:border-emerald-700 cursor-pointer mb-3'>
        <div>
            <h1 className='text-white text-2xl'>{title}</h1>
            <h2 className='text-gray-500 font-normal text-md'>{description}</h2>
            <div className='flex flex-row gap-2 mt-2'>
                <span className='px-3 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20'>{difficulty}</span>
                <span className='px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20'>{status}</span>
            </div>
        </div>

        <div className='flex flex-col items-center justify-between'>
            <div className='px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium'>
                {reward} credits
            </div>
            <span className='text-gray-500 text-sm mt-6'>{submissions} submissions</span>
        </div>
    </div>
  )
}

export default Recentbounty