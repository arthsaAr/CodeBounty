import React from 'react'
import { FiTarget } from 'react-icons/fi'
import { GiAchievement } from 'react-icons/gi'
import { SlBadge } from "react-icons/sl";
import { FaArrowTrendUp } from "react-icons/fa6";
import boyPic from "../../assets/profile/boy.png";
import womanPic from "../../assets/profile/woman.png";
import manPic from "../../assets/profile/man.png";

const TopThreeCard = () => {
  return (
     <div className='flex flex-row gap-5 items-center'>
        <div 
            className='flex-1 flex flex-col gap-1 items-center justify-center text-center border border-gray-800 bg-[#151920] hover:border-emerald-700 rounded-lg p-8 '>
            <img
              src={boyPic}
              alt='profile'
              className="w-28 h-28 rounded-full border-4 border-gray-500 object-cover"
            />
            <h2 className='text-6xl mt-2'>#3</h2>
            <h3 className='text-xl font-semibold text-white'>hunter_pro</h3>
        
        
          <div className='flex flex-row gap-2 mt-1'>
            <div className='flex flex-row gap-1 items-center'>
              <GiAchievement color="green" size={25} />
              <h2 className='text-gray-400 text-lg'>2180</h2>
            </div>

            <div className='flex flex-row gap-1 items-center'>
              <FaArrowTrendUp  color="green" size={25} />
              <h2 className='text-gray-400 text-lg'>91%</h2>
            </div>
          </div>

          <div className='flex flex-col items-center mt-3'>
            <h2 className='text-3xl text-emerald-500'>$7,645</h2>
            <h3 className='text-lg text-gray-400'>Total Earned</h3>
          </div>
        </div>

        <div
            className='flex-1 flex flex-col gap-1 items-center justify-center text-centerborder border-gray-800 bg-[#151920] hover:border-emerald-700 rounded-lg p-8 '>
            <img
              src={manPic}
              alt='profile'
              className="w-36 h-36 rounded-full border-4 border-emerald-500 object-cover"
            />
            <h2 className='text-7xl text-emerald-500 mt-2'>#1</h2>
            <h3 className='text-xl text-white font-semibold'>security_hawk</h3>

            <div className='flex flex-row gap-2 mt-1'>
              <div className='flex flex-row gap-1 items-center'>
                <SlBadge color="green" size={25} />
                <h2 className='text-gray-400 text-lg'>2450</h2>
              </div>

              <div className='flex flex-row gap-1 items-center'>
                <FaArrowTrendUp  color="green" size={25} />
                <h2 className='text-gray-400 text-lg'>94%</h2>
              </div>
              
            </div>

            <div className='flex flex-col items-center mt-3'>
              <h2 className='text-3xl text-emerald-500'>$8,900</h2>
              <h3 className='text-lg text-gray-400'>Total Earned</h3>
            </div>
        </div>

        <div
            className='flex-1 flex flex-col gap-1 items-center justify-center text-center border border-gray-800 bg-[#151920] hover:border-emerald-700 rounded-lg p-8 '>
            <img
              src={womanPic}
              alt='profile'
              className="w-28 h-28 rounded-full border-4 border-gray-500 object-cover"
            />
            <h2 className='text-6xl mt-2'>#2</h2>
            <h3 className='text-xl text-white font-semibold'>bug_buster</h3>

            <div className='flex flex-row gap-3 mt-1'>
              <div className='flex flex-row gap-1 items-center'>
                <GiAchievement color="green" size={25} />
                <h2 className='text-gray-400 text-lg'>1890</h2>
              </div>

              <div className='flex flex-row gap-1 items-center'>
                <FaArrowTrendUp  color="green" size={25} />
                <h2 className='text-gray-400 text-lg'>88%</h2>
              </div>
            </div>

            <div className='flex flex-col items-center mt-3'>
              <h2 className='text-3xl text-emerald-500'>$8,200</h2>
              <h3 className='text-lg text-gray-400'>Total Earned</h3>
            </div>
        </div>
    </div>
  )
}

export default TopThreeCard