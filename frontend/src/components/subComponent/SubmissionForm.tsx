import React, { useState } from 'react'

const SubmissionForm = () => {
    const [formData, setFormData] = useState({
            title: "",
            description: "",
            linestart: "",
            lineend: "",
            severity: "",
        });

  return (
    <div className="w-full h-full mt-2 rounded-xl border p-6 border-[#1f2937] bg-[#0d1117] overflow-hidden">
        <h1 className='text-white font-semibold text-lg'>Submit Bug Report</h1>
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-md text-gray-400">Title<span className='text-red-600'> *</span></label>
          <input
            type="text"
            placeholder='Brief description of the bug'
            className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500"
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                title: e.target.value
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-md text-gray-400">Description<span className='text-red-600'> *</span></label>
          <textarea
            rows={4}
            placeholder="Detailed explanation of the bug and steps to fix it..."
            className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none"
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                description: e.target.value
              }))
            }
          />
        </div>

        <div className='flex flex-row gap-2 items-center'>
          <div className="flex flex-col gap-1 mt-2 w-1/2">
            <label className="text-md text-gray-400">Line Start<span className='text-red-600'> *</span></label>
            <input
              type="text"
              className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500"
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  linestart: e.target.value
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-1 mt-2 w-1/2">
            <label className="text-md text-gray-400">Line End<span className='text-red-600'> *</span></label>
            <input
              type="text"
              className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500"
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  lineend: e.target.value
                }))
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Severity<span className='text-red-600'> *</span></label>
          <div className='flex flex-row gap-3 '>
            <div 
                onClick={() =>
                setFormData((prev: any) => ({
                  ...prev,
                  severity: "easy"
                }))
              }
              className={`flex flex-col gap-2 w-1/3 p-6 text-center items-center rounded-lg border-2 text-lg
                    ${
                      formData.severity === "easy"
                      ? "border-emerald-500 bg-emerald-500/5"
                      : "border-gray-800 hover:border-green-700"
                    }
              `}>
                <h1 className='font-semibold text-md'>Easy</h1>
            </div>
            <div 
                onClick={() =>
                setFormData((prev: any) => ({
                  ...prev,
                  severity: "medium"
                }))
              }
              className={`flex flex-col gap-2 w-1/3 p-6 text-center items-center rounded-lg border-2 text-lg
                    ${
                      formData.severity === "medium"
                      ? "border-emerald-500 bg-emerald-500/5"
                      : "border-gray-800 hover:border-green-700"
                    }
              `}>
                <h1 className='font-semibold text-md'>Medium</h1>
            </div>
            <div 
                onClick={() =>
                    setFormData((prev: any) => ({
                    ...prev,
                    severity: "hard"
                    }))
                }
              className={`flex flex-col gap-2 w-1/3 p-6 text-center items-center rounded-lg border-2 text-lg
                    ${
                      formData.severity === "hard"
                      ? "border-emerald-500 bg-emerald-500/5"
                      : "border-gray-800 hover:border-green-700"
                    }
              `}>
                <h1 className='font-semibold text-md'>Hard</h1>
            </div>
            <div 
                onClick={() =>
                    setFormData((prev: any) => ({
                    ...prev,
                    severity: "critical"
                    }))
                }
              className={`flex flex-col gap-2 w-1/3 p-6 text-center items-center rounded-lg border-2 text-lg
                    ${
                      formData.severity === "critical"
                      ? "border-emerald-500 bg-emerald-500/5"
                      : "border-gray-800 hover:border-green-700"
                    }
              `}>
                <h1 className='font-semibold text-md'>Critical</h1>
            </div>
            </div>
        </div>

        <div className='flex flex-row gap-3 mt-3'>
            <div className='w-3/4 mt-3 p-3 rounded-lg bg-emerald-500 justify-center items-center hover:bg-emerald-600 transition-all'>
                <h1 className="text-xl font-semibold text-black text-center ">Submit Report</h1>
            </div>
            <div className='w-1/4 mt-3 flex p-3 flex-row rounded-lg justify-center items-center hover:bg-gray-700 border border-emerald-500'>
                <h1 className="text-xl font-semibold text-emerald-500 text-center ">Cancel</h1>
            </div>
        </div>
    </div>
  )
}

export default SubmissionForm