import React from 'react'

const SetupBounty = () => {
  return (
    //mx-auto makes it center horizontally
    //max-w-1xl limits width - so it doesn’t stretch full screen
    <div className="max-w-5xl mx-auto">     
        <div className='flex flex-row text-center gap-5 justify-center px-33'>
            <div className='flex items-center gap-2'>
                <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-black text-xl">
                1
                </div>
                <h1 className='text-xl text-emerald-400'>Select Repository</h1>
            </div>

            <hr className="flex-1 h-px bg-gray-600 border-0 self-center" />

            <div className='flex items-center gap-2'>
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-xl">
                2
                </div>
                <h1 className='text-xl text-gray-400'>Bounty Details</h1>
            </div>
        </div>
    </div>
  )
}

export default SetupBounty