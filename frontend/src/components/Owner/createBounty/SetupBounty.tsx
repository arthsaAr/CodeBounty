import React from 'react'
import { useState } from "react";

const SetupBounty = () => {
    const [step, setStep] = useState(1);

  return (
    //mx-auto makes it center horizontally
    //max-w-1xl limits width - so it doesn’t stretch full screen
    <div className="max-w-5xl mx-auto">     
        <div className='flex flex-row text-center gap-5 justify-center px-33 mb-4'>
            <div className='flex items-center gap-2'>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-black text-xl
                    ${step === 1 ? "bg-emerald-400 text-black" : "bg-gray-700 text-gray-400"}
                    `}>
                1
                </div>
                <h1 className={`text-lg 
                    ${step === 1 ? "text-emerald-400" : "text-gray-400"}
                    `}>
                    Select Repository
                </h1>
            </div>

            <hr className="flex-1 h-px bg-gray-600 border-0 self-center" />

            <div className='flex items-center gap-2'>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-black text-xl
                    ${step === 2 ? "bg-emerald-400 text-black" : "bg-gray-700 text-gray-400"}
                    `}>
                2
                </div>
                <h1 className={`text-lg 
                    ${step === 2 ? "text-emerald-400" : "text-gray-400"}
                    `}>
                    Bounty Details
                </h1>
            </div>
        </div>

        {step === 1 && (
            <button
            onClick={() => setStep(2)}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded"
            >
            Continue
            </button>
        )}
    </div>
  )
}

export default SetupBounty