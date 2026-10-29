import React from 'react'
import { CiFilter } from "react-icons/ci";

type reviewProps = {
  statusFilter: "all" | "pending" | "approved" | "rejected";
  setStatusFilter: React.Dispatch<React.SetStateAction<"all" | "pending" | "approved" | "rejected">>;
  counts: { all: number; pending: number; approved: number; rejected: number };
}

const ReviewSearch = ({ statusFilter, setStatusFilter, counts }: reviewProps) => {
  return (
        <div className='flex flex-row gap-3 items-center justify-start'>
            <CiFilter className="text-gray-400" size={24} />

            <div 
                onClick={() => {
                setStatusFilter("all");
                }}
                className={`
                rounded-lg cursor-pointer px-3 py-1 h-8 flex items-center text-sm
                ${
                    statusFilter === "all" ? "bg-emerald-500 border-emerald-500 text-white" : "bg-[#111827] text-gray-300 hover:bg-emerald-500"
                }
                `}>
                <h3>All <span className="text-xs text-gray-400">({counts.all})</span></h3>
            </div>
            <div
                onClick={() => {
                setStatusFilter("pending");
                }}
                className={`
                rounded-lg bg-[#111827] cursor-pointer px-3 py-1 h-8 flex items-center text-sm text-gray-300 hover:bg-gray-600
                ${
                    statusFilter === "pending" ? "bg-emerald-500 border-emerald-500 text-white" : "bg-[#111827] text-gray-300 hover:bg-emerald-500"
                }
                `}>
                <h3>Pending <span className="text-xs text-gray-400">({counts.pending})</span></h3>
            </div>
            <div 
                onClick={() => {
                setStatusFilter("approved");
                }}
                className={`
                rounded-lg bg-[#111827] cursor-pointer px-3 py-1 h-8 flex items-center text-sm text-gray-300 hover:bg-gray-600
                ${
                    statusFilter === "approved" ? "bg-emerald-500 border-emerald-500 text-white" : "bg-[#111827] text-gray-300 hover:bg-emerald-500"
                }
                `}>
                <h3>Approved <span className="text-xs text-gray-400">({counts.approved})</span></h3>
            </div>
            <div 
                onClick={() => {
                setStatusFilter("rejected");
                }}
                className={`
                rounded-lg bg-[#111827] cursor-pointer px-3 py-1 h-8 flex items-center text-sm text-gray-300 hover:bg-gray-600
                ${
                    statusFilter === "rejected" ? "bg-emerald-500 border-emerald-500 text-white" : "bg-[#111827] text-gray-300 hover:bg-emerald-500"
                }
                `}>
                <h3>Rejected <span className="text-xs text-gray-400">({counts.rejected})</span></h3>
            </div>
        </div>
  )
}

export default ReviewSearch