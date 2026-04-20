import React from 'react'

const Bountyform = () => {
  return (
    <div className='mt-2'>
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">File path*</label>
          <select className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white">
            <option>src/components/Chart.tsx</option>
            <option>src/hooks/useDebounce.ts</option>
            <option>src/pages/Dashboard.tsx</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Bounty Title*</label>
          <input
            type="text"
            placeholder="Eg. Memory leak in Component"
            className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Description*</label>
          <textarea
            rows={4}
            placeholder="Describe the issue or what you are looking for..."
            className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none"
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Bounty Amount (Credits)*</label>
          <input
            type="number"
            placeholder="Eg. 500"
            className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Difficulty*</label>
          <div className='flex flex-row gap-3 '>
            <div className='w-1/3 p-6 text-center rounded-lg border text-lg border-emerald-500'>
              Easy
            </div>
            <div className='p-6 w-1/3 rounded-lg text-center border text-lg border-emerald-500'>
              Medium
            </div>
            <div className='p-6 w-1/3 rounded-lg border text-center text-lg border-emerald-500'>
              Hard
            </div>
          </div>
        </div>

    </div>
  )
}

export default Bountyform