import React, { useState } from 'react'
import { GoSearch } from "react-icons/go";
import { FaAngleDown } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";

type SearchbarProps = {
  setSelectedDifficulty: React.Dispatch<React.SetStateAction<string>>;
  setSortingOption?: React.Dispatch<React.SetStateAction<string>>;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
}

const Searchbar = ({ setSelectedDifficulty, setSortingOption, setSearchQuery }: SearchbarProps) => {
  const[activeTab, setActiveTab] = useState(1);

  return (
    <>
     <div className="flex flex-row items-center w-full gap-3 mb-4">
      <div className="flex-1 min-w-0 h-12 rounded-lg border border-gray-800 hover:border-emerald-700 bg-[#1f2937] p-1 shadow-sm transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500">
        <div className="flex items-center w-full bg-[#1f2937] rounded-md px-3 py-2">
          <GoSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search bounties..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="w-1/4 min-w-[160px] h-12 relative">
        <select
          defaultValue="newest"
          className="h-full w-full text-white border border-gray-800 rounded-lg bg-[#1f2937] px-3 pr-10 appearance-none"
          onChange={(e) => setSortingOption(e.target.value)}
        >
            <option value="newest" className='text-white'>Newest First</option>
            <option value="highest" className='text-white'>Highest Amount</option>
        </select>
        <FaAngleDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
    <div className='flex flex-row gap-2 items-center justify-start'>
        <CiFilter className="text-gray-400" size={19} />
        <h3 className="text-gray-400">Difficulty:</h3>

        <div 
          onClick={() => {
            setActiveTab(1);
            setSelectedDifficulty("all");
          }}
          className={`
            rounded-lg cursor-pointer px-3 py-1 h-8 flex items-center text-sm
            ${
              activeTab === 1 ? "bg-emerald-500 border-emerald-500 text-white" : "bg-[#111827] text-gray-300 hover:bg-emerald-500"
            }
          `}>
            <h3>All</h3>
        </div>
        <div
          onClick={() => {
            setActiveTab(2);
            setSelectedDifficulty("hard");
          }}
          className={`
            rounded-lg bg-[#111827] cursor-pointer px-3 py-1 h-8 flex items-center text-sm text-gray-300 hover:bg-gray-600
            ${
              activeTab === 2 ? "bg-emerald-500 border-emerald-500 text-white" : "bg-[#111827] text-gray-300 hover:bg-emerald-500"
            }
          `}>
            <h3>Hard</h3>
        </div>
        <div 
          onClick={() => {
            setActiveTab(3);
            setSelectedDifficulty("medium");
          }}
          className={`
            rounded-lg bg-[#111827] cursor-pointer px-3 py-1 h-8 flex items-center text-sm text-gray-300 hover:bg-gray-600
            ${
              activeTab === 3 ? "bg-emerald-500 border-emerald-500 text-white" : "bg-[#111827] text-gray-300 hover:bg-emerald-500"
            }
          `}>
            <h3>Medium</h3>
        </div>
        <div 
          onClick={() => {
            setActiveTab(4);
            setSelectedDifficulty("easy");
          }}
          className={`
            rounded-lg bg-[#111827] cursor-pointer px-3 py-1 h-8 flex items-center text-sm text-gray-300 hover:bg-gray-600
            ${
              activeTab === 4 ? "bg-emerald-500 border-emerald-500 text-white" : "bg-[#111827] text-gray-300 hover:bg-emerald-500"
            }
          `}>
            <h3>Easy</h3>
        </div>
    </div>
    </>
  )
}

export default Searchbar