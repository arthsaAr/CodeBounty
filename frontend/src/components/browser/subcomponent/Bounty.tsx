import React from 'react'

const Bounty = () => {
  return (
    <div>
        <div className='rounded-xl bg-[#151920] border border-gray-800 p-6 hover:border-emerald-700 cursor-pointer'>
        <div className='flex flex-row justify-between'>
          <div>
            <h1 className='text-white text-2xl'>Debounce hook optimization</h1>
            <h2 className='text-gray-500 font-normal text-md'>The custom debounce hook could be optimized. Looking for cleaner implementation.</h2>
          </div>
          <div className='flex flex-col items-center justify-between'>
              <div className=' text-emerald-400 text-2xl'>
                  150
              </div>
              <span className='text-gray-500 text-md mt-1'>credits</span>
          </div>
        </div>
        <hr className="my-3 h-px border-0 bg-white/20" />
        <div className='flex flex-row gap-2 mt-2 justify-between items-center'>
            <div className='flex flex-row gap-2'>
                <span className='px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>easy</span>
                <span className='text-gray-500 font-normal text-md'>react-dashboard</span>
            </div>
            <div>
                <span className='text-gray-500 font-normal text-md'>1 submissions</span>
            </div>
        </div>
        <hr className="my-3 h-px border-0 bg-white/20" />
          <h3 className='text-gray-200 font-normal text-lg'>src/hooks/useDebounce.ts</h3>
          <h3 className='text-gray-500 font-normal text-sm'>by charlie_code • 2/14/2026</h3>
        </div>
    </div>
  )
}

export default Bounty