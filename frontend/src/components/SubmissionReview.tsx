import React, { useState } from 'react'
import ReviewerHeader from './subComponent/ReviewerHeader';
import AllReports from './subComponent/AllReports';
import ReviewSearch from './subComponent/ReviewSearch';

type reviewProps = {
  setActivePage: (page: string) => void;
}

const SubmissionReview = ( { setActivePage }: reviewProps ) => {
    const [activeTab, setActiveTab] = useState(1);

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

        <ReviewSearch setActivePage={setActivePage} />
        <AllReports />
    </div>
  )
}

export default SubmissionReview