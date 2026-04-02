import React from 'react'
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { MdAccessTimeFilled } from "react-icons/md";

const submissions = () => {
  return (
    <div>
        <h2 className='text-2xl font-semibold mb-4'>Your Submissions</h2>

        <div className='flex gap-2 flex-row rounded-xl bg-[#151920] border border-gray-800 p-6 justify-start items-start cursor-pointer'>
            <div className='bg-yellow-600/10 rounded-xl p-1'>
              <MdAccessTimeFilled className="text-yellow-500"  opacity={0.8} size={35} />
            </div>
            <div>
                <h1 className='text-white text-2xl'>useEffect cleanup missing in Chart</h1>
                <h2 className='text-gray-500 font-normal text-md'>react-dashboard • Lines 45-60</h2>
                <div className='flex flex-row gap-2 mt-2'>
                    <span className='px-3 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20'>high</span>
                    <span className='px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'>pending</span>
                </div>
            </div>
        </div>

        <div className=' mt-4 flex gap-2 flex-row rounded-xl bg-[#151920] border border-gray-800 p-6 justify-start items-start cursor-pointer'>
            <div className='bg-green-600/10 rounded-xl p-1'>
              <IoCheckmarkCircleOutline  className="text-green-500"  opacity={0.8} size={35} />
            </div>
            <div>
                <h1 className='text-white text-2xl'>JWT secret exposed in code</h1>
                <h2 className='text-gray-500 font-normal text-md'>express-api • Lines 12-15</h2>
                <div className='flex flex-row gap-2 mt-2'>
                    <span className='px-3 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20'>critical</span>
                    <span className='px-3 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20'>approved</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default submissions