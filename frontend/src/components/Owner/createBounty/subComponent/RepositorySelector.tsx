import React from 'react'
import { LuGithub } from "react-icons/lu";

const RepositorySelector = () => {
  return (
    <div className='flex flex-row items-center justify-between mb-2'>
        <h1 className='text-white text-2xl leading-snug'>Your Repositories</h1>
        <div className='rounded-xl bg-[#151920] border-4 border-emerald-600 p-2 hover:bg-gray-700'>
            <div className='flex flex-row items-center gap-2'>
                <LuGithub color="green" size={25} />
                <h1 className='text-lg font-semibold text-emerald-500'>Import from GitHub</h1>
            </div>
        </div>
    </div>
  )
}

export default RepositorySelector