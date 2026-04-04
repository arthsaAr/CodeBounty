import React from 'react'
import { MdAccessTimeFilled } from "react-icons/md";

type SubmissionProps = {
  title: string;
  description: string;
  difficulty: string;
  status: string;
  reward: number;
  submissions: number;
};


const Submission = ({
  title,
  description,
  difficulty,
  status
}: Submission) => {
  return (
    <div className='flex gap-2 mb-3 flex-row rounded-xl bg-[#151920] border border-gray-800 p-6 justify-start items-start cursor-pointer'>
        <div className='bg-yellow-600/10 rounded-xl p-1'>
            <MdAccessTimeFilled className="text-yellow-500"  opacity={0.8} size={35} />
        </div>
        <div>
            <h1 className='text-white text-2xl'>{title}</h1>
            <h2 className='text-gray-500 font-normal text-md'>{description}</h2>
            <div className='flex flex-row gap-2 mt-2'>
                <span className='px-3 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20'>{difficulty}</span>
                <span className='px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'>{status}</span>
            </div>
        </div>
    </div>
  )
}

export default Submission