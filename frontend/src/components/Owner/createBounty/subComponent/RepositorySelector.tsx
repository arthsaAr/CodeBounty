import React from 'react'
import { LuGithub } from "react-icons/lu";

const RepositorySelector = ({onImport, isLoading}: any) => {
  return (
    <div className='flex flex-row items-center justify-between mb-2'>
        <h1 className='text-white text-2xl leading-snug'>Your Repositories</h1>
        <div className='rounded-xl bg-[#151920] border-4 border-emerald-600 p-2 hover:bg-gray-700'>
            <div
              onClick={onImport}
              disabled={isLoading}
              className={`flex flex-row items-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                <LuGithub color="green" size={25} />
                <h1 className='text-lg font-semibold text-emerald-500'>
                  {isLoading ? 'Importing...' : 'Import from GitHub'}
                </h1>
            </div>
        </div>
    </div>
  )
}

export default RepositorySelector