import React from 'react'
import FileTreePicker from './FileTreePicker'

//complete this form completely(with added backend routes)
type formProps = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  repoUrl?: string;
};

const Bountyform = ({ formData, setFormData, repoUrl }: formProps) => {
  return (
    <div className='mt-2'>
      
        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">File path<span className='text-red-600'> *</span></label>
          {repoUrl ? (
            <FileTreePicker
              repoUrl={repoUrl}
              selectedPath={formData.filePath}
              onSelect={(path) => setFormData({ ...formData, filePath: path })}
            />
          ) : (
            <input 
              type="text"
              placeholder='Eg. src/components/Chart.tsx'
              value={formData.filePath}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  filePath: e.target.value
                })
              }
              className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500"
            />
          )}
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Bounty Title<span className='text-red-600'> *</span></label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                title: e.target.value
              }))
            }
            placeholder="Eg. Memory leak in Component"
            className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Description<span className='text-red-600'> *</span></label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                description: e.target.value
              }))
            }
            placeholder="Describe the issue or what you are looking for..."
            className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500 resize-none"
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Bounty Amount (Credits)<span className='text-red-600'> *</span></label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                amount: e.target.value
              }))
            }
            placeholder="Eg. 500"
            className="bg-[#0f131a] border border-gray-800 focus:border-emerald-500 outline-none rounded-lg px-3 py-2 text-white placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <label className="text-sm text-gray-400">Difficulty<span className='text-red-600'> *</span></label>
          <div className='flex flex-row gap-3 '>
            <div 
              onClick={() =>
                setFormData((prev: any) => ({
                  ...prev,
                  difficulty: "easy"
                }))
              }
              className={`flex flex-col gap-2 w-1/3 p-6 text-center items-center rounded-lg border-2 text-lg
                    ${
                      formData.difficulty === "easy"
                      ? "border-emerald-500 bg-emerald-500/5"
                      : "border-gray-800 hover:border-green-600"
                  }`}>
              <div className="w-5 h-5 rounded-full bg-green-400 shadow-[0_0_10px_3px_rgba(34,197,94,0.7)]"></div>
              <h1 className='font-semibold text-md'>Easy</h1>
            </div>
            <div 
              onClick={() =>
                setFormData((prev: any) => ({
                  ...prev,
                  difficulty: "medium"
                }))
              }
              className={`flex flex-col gap-2 w-1/3 p-6 text-center items-center rounded-lg border-2 text-lg
                    ${
                      formData.difficulty === "medium"
                      ? "border-emerald-500 bg-emerald-500/5"
                      : "border-gray-800 hover:border-green-600"
                    }
              `}>
              <div className="w-5 h-5 rounded-full bg-yellow-400 shadow-[0_0_10px_3px_rgba(250,204,21,0.7)]"></div>
              <h1 className='font-semibold text-md'>Medium</h1>
            </div>
            <div 
              onClick={() =>
                setFormData((prev: any) => ({
                  ...prev,
                  difficulty: "hard"
                }))
              }
              className={`flex flex-col gap-2 w-1/3 p-6 text-center items-center rounded-lg border-2 text-lg
                    ${
                      formData.difficulty === "hard"
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