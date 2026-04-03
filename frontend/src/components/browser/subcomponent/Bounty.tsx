import React from 'react'

type BountyProps = {
  title: string;
  credits: number;
  description: string;
  difficulty: string;
  repo: string;
  file: string;
  author: string;
  date: string;
};


const Bounty = ({
  title,
  credits,
  description,
  difficulty,
  repo,
  file,
  author,
  date,
}: BountyProps) => {
  return (
    <div>
        <div className='rounded-xl bg-[#151920] border border-gray-800 p-6 hover:border-emerald-700 cursor-pointer'>
        <div className='flex flex-row justify-between'>
          <div>
            <h1 className='text-white text-2xl'>{title}</h1>
            <h2 className='text-gray-500 font-normal text-md'>{description}</h2>
          </div>
          <div className='flex flex-col items-center justify-between'>
              <div className=' text-emerald-400 text-2xl'>
                  {credits}
              </div>
              <span className='text-gray-500 text-md mt-1'>credits</span>
          </div>
        </div>
        <hr className="my-3 h-px border-0 bg-white/20" />
        <div className='flex flex-row gap-2 mt-2 justify-between items-center'>
            <div className='flex flex-row gap-2'>
                <span className='px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>{difficulty}</span>
                <span className='text-gray-500 font-normal text-md'>{repo}</span>
            </div>
            <div>
                <span className='text-gray-500 font-normal text-md'>1 submissions</span>
            </div>
        </div>
        <hr className="my-3 h-px border-0 bg-white/20" />
          <h3 className='text-gray-200 font-normal text-lg'>{file}</h3>
          <h3 className='text-gray-500 font-normal text-sm'>by {author} • {date}</h3>
        </div>
    </div>
  )
}

export default Bounty