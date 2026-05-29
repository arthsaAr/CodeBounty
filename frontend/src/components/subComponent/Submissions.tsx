import React from 'react'

type SubmissionsProps = {
  submitClicked: number;
}

const Submissions = ({ submitClicked }: SubmissionsProps) => {
  return (
    <div className="w-full h-full mt-2 rounded-xl p-6 border border-[#1f2937] bg-[#0d1117] overflow-hidden">
        <h1 className='text-white font-semibold text-lg'>Submissions({submitClicked})</h1>
        
    </div>
  )
}

export default Submissions