import React from 'react'
import { MdAccessTimeFilled } from "react-icons/md";

type SubmissionProps = {
  requestPage: string;
  title: string;
  description: string;
  difficulty: string;
  status: string;
  username: string;
};

const Submission = ({
  requestPage,
  title,
  description,
  difficulty,
  status,
  username
}: SubmissionProps) => {
  return (
    <div className='flex gap-2 mb-3 flex-row rounded-xl bg-[#151920] border border-gray-800 p-6 justify-start items-start cursor-pointer'>
        {requestPage === "bountyDetails" ? (
          <>
          <div className='bg-yellow-600/10 rounded-xl p-1'>
              <MdAccessTimeFilled className="text-yellow-500"  opacity={0.8} size={35} />
          </div>
          <div>
              <div className='flex flex-row gap-2 items-center justify-end'>
                <h1 className='text-white text-2xl'>{title}</h1>
                <span className='px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'>{status}</span>
              </div>
              <h2 className='text-gray-500 font-normal text-md'>{description}</h2>
              <div className='flex flex-row gap-2 mt-2'>
                  <span className='px-3 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20'>{difficulty}</span>
                  <span className='text-gray-500 font-normal text-md'>Lines 46-60</span>
                  <span className='text-gray-500 font-normal text-md'>By {username}</span>
              </div>
          </div>
          </>
        ) : (
          <>
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
          </>
        )}
    </div>
  )
}

export default Submission