import React, { useState } from 'react'
import ReviewerHeader from './subComponent/ReviewerHeader';
import { CiFilter } from "react-icons/ci";

type reviewProps = {
  setActivePage: (page: string) => void;
}

const SubmissionReview = ( { setActivePage }: reviewProps ) => {
    const [activeTab, setActiveTab] = useState(1);

  return (
    <div>
        <h1 className='text-md'>
            <span 
                onClick={() => setActivePage("dashboard")}
                className=' text-gray-400 hover:text-gray-300 cursor-default'>Dashboard </span>
            <span className='text-gray-400'>&gt;</span>
            <span className=' text-gray-400 hover:text-gray-300 cursor-default'> Submission Review</span>
        </h1>

        <ReviewerHeader />

        {/* adding filter row(similar to browse bounty) */}
        <div className='flex flex-row gap-3 items-center justify-start'>
            <CiFilter className="text-gray-400" size={24} />

            <div 
                onClick={() => {
                setActiveTab(1);
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
                }}
                className={`
                rounded-lg bg-[#111827] cursor-pointer px-3 py-1 h-8 flex items-center text-sm text-gray-300 hover:bg-gray-600
                ${
                    activeTab === 2 ? "bg-emerald-500 border-emerald-500 text-white" : "bg-[#111827] text-gray-300 hover:bg-emerald-500"
                }
                `}>
                <h3>Pending</h3>
            </div>
            <div 
                onClick={() => {
                setActiveTab(3);
                }}
                className={`
                rounded-lg bg-[#111827] cursor-pointer px-3 py-1 h-8 flex items-center text-sm text-gray-300 hover:bg-gray-600
                ${
                    activeTab === 3 ? "bg-emerald-500 border-emerald-500 text-white" : "bg-[#111827] text-gray-300 hover:bg-emerald-500"
                }
                `}>
                <h3>Approved</h3>
            </div>
            <div 
                onClick={() => {
                setActiveTab(4);
                }}
                className={`
                rounded-lg bg-[#111827] cursor-pointer px-3 py-1 h-8 flex items-center text-sm text-gray-300 hover:bg-gray-600
                ${
                    activeTab === 4 ? "bg-emerald-500 border-emerald-500 text-white" : "bg-[#111827] text-gray-300 hover:bg-emerald-500"
                }
                `}>
                <h3>Rejected</h3>
            </div>
        </div>


    </div>
  )
}

export default SubmissionReview