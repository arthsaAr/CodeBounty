import React from 'react'
import { GiHazardSign } from "react-icons/gi";

const SubmissionTips = () => {
  return (
    <div className='mt-4 rounded-lg bg-[#151920] border w-full border-gray-800 p-6 justify-between items-center cursor-pointer'>
        <div className='flex flex-row gap-1 items-center'>
            <GiHazardSign size={24} color='green'/>
            <h1 className='text-emerald-400 text-lg'>Submission Tips</h1>
        </div>
        <ul className='flex flex-col gap-1 ml-5 mt-1 list-disc list-inside'>
            <li className='text-gray-400 text-lg'>Be specific about the issue</li>
            <li className='text-gray-400 text-lg'>Include line numbers</li>
            <li className='text-gray-400 text-lg'>Suggest a fix if possible</li>
            <li className='text-gray-400 text-lg'>Test your findings</li>
        </ul>
    </div>
  )
}

export default SubmissionTips