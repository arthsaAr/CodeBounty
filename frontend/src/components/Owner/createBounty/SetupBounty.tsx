import React from 'react'
import { useState } from "react";
import RepositorySelector from "../createBounty/subComponent/RepositorySelector";
import Repository from './subComponent/Repository';
import BountyForm from './subComponent/Bountyform';
import { MdKeyboardBackspace } from "react-icons/md";

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
            <>
            <div className='rounded-xl bg-[#151920] border border-gray-800 p-6'>
                <RepositorySelector />

                <Repository 
                    title="react-dashboard"
                    description="Modern React dashboard with TypeScript"
                    language="TypeScript"
                    stars="2345"
                    onSelect={() => setStep(2)}
                />

                <Repository 
                    title="express-api"
                    description="RESTful API built with Express and MongoDB"
                    language="JavaScript"
                    stars="1123"
                    onSelect={() => setStep(2)}
                />

                <Repository 
                    title="vue-components"
                    description="Collection of vue reusable components"
                    language="Vue"
                    stars="890"
                    onSelect={() => setStep(2)}
                />
            </div>
            </>
        )}

        {step === 2 && (
            <>
            <div className='rounded-xl bg-[#151920] border border-gray-800 p-6'>
                <div
                    onClick={() => setStep(1)} 
                    className='inline-flex flex-row hover:bg-[#1d2532] items-center gap-1 border border-[#151920] px-3 py-2 justify-start rounded-lg mb-2'>
                    <MdKeyboardBackspace size={20} />
                    <h1 className='text-lg'>Back to repositories</h1>
                </div>
                <h1 className='text-xl font-semibold font-sans'>Bounty Details</h1>
                <BountyForm />
            </div>
            </>
            // <button
            // onClick={() => setStep(1)}
            // className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded"
            // >
            // Continue
            // </button>
        )}
    </div>
  )
}

export default SetupBounty