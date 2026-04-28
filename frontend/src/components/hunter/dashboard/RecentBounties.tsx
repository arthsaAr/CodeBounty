import React from 'react'
import { RiCoinsLine } from 'react-icons/ri'
import Recentbounty from './subcomponent/Recentbounty'

const RecentBounties = () => {
  return (
    <div>
        <div className='flex flex-row justify-between mb-4 items-center'>
            <h2 className='text-2xl font-semibold'>Recent Bounties</h2>
            <button className='text-lg text-white hover:text-emerald-400'>View All</button>
        </div>

        <Recentbounty 
            id={1}
            title="Memory leak in Chart component"
            description="react-dashboard /src/components/Chart.tsx"
            difficulty="hard"
            status="active"
            reward={500}
            submissions={3}
        />

        <Recentbounty 
            id={2}
            title="Security vulnerability in JWT validation"
            description="express-api / src/middleware/auth.js"
            difficulty="hard"
            status="active"
            reward={750}
            submissions={5}
        />

        <Recentbounty
            id={3} 
            title="Date formatting edge cases"
            description="react-dashboard / src/utils/formatters.ts"
            difficulty="medium"
            status="active"
            reward={250}
            submissions={2}
        />

        <Recentbounty 
            id={4}
            title="Debounce hook optimization"
            description="react-dashboard / src/hooks/useDebounce.ts"
            difficulty="easy"
            status="active"
            reward={150}
            submissions={1}
        />

    </div>
  )
}

export default RecentBounties