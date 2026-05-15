import React from 'react'
import { useNavigate } from "react-router-dom";

type BountyProps = {
  id: number;
  title: string;
  credits: number;
  description: string;
  difficulty: string;
  repo: string;
  file: string;
  author: string;
  date: string;
  setBountyClickedOwner?: React.Dispatch<React.SetStateAction<number | null>>;
  setclickedIDOwner?: React.Dispatch<React.SetStateAction<number | null>>;
};

const Bounty = ({
  id,
  title,
  credits,
  description,
  difficulty,
  repo,
  file,
  author,
  date,
  setBountyClickedOwner,
  setclickedIDOwner
}: BountyProps) => {
  // const navigate = useNavigate();

  return (
    <div onClick={() => {
      setBountyClickedOwner(1)
      setclickedIDOwner(id);
    }}
      >
        <div className='rounded-xl bg-[#151920] border border-gray-800 p-6 hover:border-emerald-700 cursor-pointer'>
        <div className='flex justify-between items-start gap-4'>
          <div>
            <h1 className='text-white text-2xl leading-snug'>{title}</h1>
            <h2 className='text-gray-500 text-md mt-1'>{description}</h2>
          </div>
          <div className='flex flex-col items-end'>
              <div className=' text-emerald-400 text-3xl'>
                  {credits}
              </div>
              <span className='text-gray-500 text-md mt-1'>credits</span>
          </div>
        </div>

        <hr className="my-4 border-white/10" />

        <div className='flex flex-row gap-2 mt-2 justify-between items-center'>
            <div className='flex flex-row gap-2'>
                <span className={`px-3 py-1 text-xs font-medium rounded-full 
                  ${difficulty === "easy" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                    difficulty === "medium" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                    difficulty === "hard" ? "bg-red-500/10 text-red-400 border border-red-500/20" : 
                    "bg-gray-100 text-gray-800"
                  }
                  `}>
                  {difficulty}
                </span>
                <span className='text-gray-500 font-normal text-md'>{repo}</span>
            </div>
            <div>
                <span className='text-gray-500 font-normal text-md'>1 submissions</span>
            </div>
        </div>

        <hr className="my-4 border-white/10" />
        
          <div className="space-y-1">
            <h3 className="text-gray-200 text-md">
              {file}
            </h3>
            <div className='flex flex-row gap-1'>
              <h3 className="text-gray-500 text-md">
                by {author} •
              </h3>
              <h3 className="text-gray-500 text-md">
                <p>
                  {new Date(date).toLocaleDateString()}
                </p>
              </h3>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Bounty