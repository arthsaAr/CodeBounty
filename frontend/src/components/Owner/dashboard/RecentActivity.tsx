import React from 'react'
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { MdAccessTimeFilled } from "react-icons/md";
import Submission from '../../hunter/dashboard/subcomponent/Submission';

const Recentactivity = () => {
  return (
    <div>
        <h2 className='text-2xl font-semibold mb-4'>Recent Activity</h2>

{/* TODO - Implement dynamic submissions fetching */}
        <Submission 
            title="useEffect cleanup missing in Chart"
            description="react-dashboard • Lines 45-60"
            difficulty="high"
            status="pending"
        />

        <Submission 
            title="JWT validation bypass in auth middleware"
            description="express-api • Lines 12-15"
            difficulty="critical"
            status="approved"
        />
    </div>
  )
}

export default Recentactivity