import React from 'react'
import { FaStar } from "react-icons/fa";

type RepoProps = {
    title: string;
    description: string;
    language: string;
    stars: number;
};

const Repository = ({
    title,
    description,
    language,
    stars
}: Repository) => {
  return (
    <div className='rounded-xl bg-[#151920] border border-gray-800 p-6 mt-2'>
        <h1 className='text-white text-2xl leading-snug'>{title}</h1>
        <h2 className='text-gray-500 text-lg'>{description}</h2>
        <div className='flex flex-row gap-2 mt-2'>
            
            <div className='flex flex-row gap-1 items-center'>
                <div className="w-3 h-3 rounded-full mt-[1px] bg-emerald-500"></div>
                <h1 className='text-white text-md'>{language}</h1>
            </div>

            <div className='flex flex-row gap-1 items-center'>
                <FaStar color="yellow" className="text-yellow-400 drop-shadow-md" size={20}/>
                <h1 className='text-white text-md'>{stars}</h1>
            </div>
        </div>
    </div>
  )
}

export default Repository