import React from 'react'
import { useState } from "react";

const Bountyform = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  return (
    <div className='mt-2'>
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">File path<span className='text-red-600'> *</span></label>
          <select className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white">
            <option>src/components/Chart.tsx</option>
            <option>src/hooks/useDebounce.ts</option>
            <option>src/pages/Dashboard.tsx</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Bounty Title<span className='text-red-600'> *</span></label>
          <input
            type="text"
            placeholder="Eg. Memory leak in Component"
            className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Description<span className='text-red-600'> *</span></label>
          <textarea
            rows={4}
            placeholder="Describe the issue or what you are looking for..."
            className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none"
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Bounty Amount (Credits)<span className='text-red-600'> *</span></label>
          <input
            type="number"
            placeholder="Eg. 500"
            className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500"
          />
        </div>

        

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Difficulty<span className='text-red-600'> *</span></label>
          <div className='flex flex-row gap-3 '>
            <div 
              onClick={() => setSelectedDifficulty("Easy")}
              className={`flex flex-col gap-2 w-1/3 p-6 text-center items-center rounded-lg border-2 text-lg
                    ${
                      selectedDifficulty === "Easy"
                      ? "border-emerald-500 bg-emerald-500/5"
                      : "border-gray-800 hover:border-green-600"
                    }
              `}>
              <div className="w-5 h-5 rounded-full bg-green-400 shadow-[0_0_10px_3px_rgba(34,197,94,0.7)]"></div>
              <h1 className='font-semibold text-md'>Easy</h1>
            </div>
            <div 
              onClick={() => setSelectedDifficulty("Medium")}
              className={`flex flex-col gap-2 w-1/3 p-6 text-center items-center rounded-lg border-2 text-lg
                    ${
                      selectedDifficulty === "Medium"
                      ? "border-emerald-500 bg-emerald-500/5"
                      : "border-gray-800 hover:border-green-600"
                    }
              `}>
              <div className="w-5 h-5 rounded-full bg-yellow-400 shadow-[0_0_10px_3px_rgba(250,204,21,0.7)]"></div>
              <h1 className='font-semibold text-md'>Medium</h1>
            </div>
            <div 
              onClick={() => setSelectedDifficulty("Hard")}
              className={`flex flex-col gap-2 w-1/3 p-6 text-center items-center rounded-lg border-2 text-lg
                    ${
                      selectedDifficulty === "Hard"
                      ? "border-emerald-500 bg-emerald-500/5"
                      : "border-gray-800 hover:border-green-600"
                    }
              `}>
              <div className="w-5 h-5 rounded-full bg-red-500 shadow-[0_0_10px_3px_rgba(239,68,68,0.7)]"></div>
              <h1 className='font-semibold text-md'>Hard</h1>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Bountyform