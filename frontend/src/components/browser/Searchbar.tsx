import React from 'react'
import { GoSearch } from "react-icons/go";
import { FaAngleDown } from "react-icons/fa6";

const Searchbar = () => {
  return (
     <div className="flex flex-row items-center w-full gap-3">
      <div className="flex-1 min-w-0 h-12 rounded-lg border border-gray-800 hover:border-emerald-700 bg-[#1f2937] p-1 shadow-sm transition-all focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500">
        <div className="flex items-center w-full bg-[#1f2937] rounded-md px-3 py-2">
          <GoSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search bounties..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="w-1/4 min-w-[160px] h-12 relative">
        <select
          defaultValue="newest"
          className="h-full w-full text-white border border-gray-800 rounded-lg bg-[#1f2937] px-3 pr-10 appearance-none"
        >
            <option value="newest" className='text-white'>Newest First</option>
            <option value="highest" className='text-white'>Highest Amount</option>
        </select>
        <FaAngleDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  )
}

export default Searchbar