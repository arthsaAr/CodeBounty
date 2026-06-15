import React from 'react'
import ReviewerHeader from './subComponent/ReviewerHeader';

type reviewProps = {
  setActivePage: (page: string) => void;
}

const SubmissionReview = ( { setActivePage }: reviewProps ) => {
  return (
    <div>
        <h1 className='text-md'>
            <span 
                onClick={() => setActivePage("dashboard")}
                className=' text-gray-400 hover:text-gray-300 cursor-default'>Dashboard </span>
            <span className='text-gray-400'>&gt;</span>
            <span className=' text-gray-400 hover:text-gray-300 cursor-default'> Submission Review</span>
        </h1>

        <ReviewerHeader />
    </div>
  )
}

export default SubmissionReview