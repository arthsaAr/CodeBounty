import React from 'react'

const SubmissionForm = () => {
  return (
    <div className="w-full h-full mt-2 rounded-xl border p-6 border-[#1f2937] bg-[#0d1117] overflow-hidden">
        <h1 className='text-white font-semibold text-lg'>Submit Bug Report</h1>
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-md text-gray-400">Title<span className='text-red-600'> *</span></label>
          <input 
            type="text"
            placeholder='Brief description of the bug'
            className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-md text-gray-400">Description<span className='text-red-600'> *</span></label>
          <textarea
            rows={4}
            placeholder="Detailed explanation of the bug and steps to fix it..."
            className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none"
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Severity<span className='text-red-600'> *</span></label>
          <div className='flex flex-row gap-3 '>
            <div 
              className={`w-1/4 p-6 text-center items-center rounded-lg border-2 border-gray-700 hover:border-emerald-500 text-lg
              `}>
                <h1 className='font-semibold text-md'>Easy</h1>
            </div>
            <div 
              className={`w-1/4 p-6 text-center items-center rounded-lg border-2 border-gray-700 hover:border-emerald-500 text-lg
              `}>
                <h1 className='font-semibold text-md'>Medium</h1>
            </div>
            <div 
              className={`w-1/4 p-6 text-center items-center rounded-lg border-2 border-gray-700 hover:border-emerald-500 text-lg
              `}>
                <h1 className='font-semibold text-md'>Hard</h1>
            </div>
            <div 
              className={`w-1/4 p-6 text-center items-center rounded-lg border-2 border-gray-700 hover:border-emerald-500 text-lg
              `}>
                <h1 className='font-semibold text-md'>Critical</h1>
            </div>
            </div>
        </div>

    </div>
  )
}

export default SubmissionForm