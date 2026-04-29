import React from 'react'
import { RiCoinsLine } from 'react-icons/ri'
import YourBounty from '../../hunter/dashboard/subcomponent/Recentbounty'

const YourBounties = () => {
  return (
    <div>
        <div className='flex flex-row justify-between mb-4 items-center'>
            <h2 className='text-2xl font-semibold'>Your Bounties</h2>
            <button className='text-lg text-white hover:text-emerald-400'>View All</button>
        </div>

        <YourBounty 
            id={1}
            title="Memory leak in Chart component"
            description="react-dashboard /src/components/Chart.tsx"
            difficulty="hard"
            status="active"
            reward={500}
            submissions={3}
        />

        <YourBounty 
            id={2}
            title="Security vulnerability in JWT validation"
            description="express-api / src/middleware/auth.js"
            difficulty="hard"
            status="active"
            reward={750}
            submissions={5}
        />

        <YourBounty 
            id={3}
            title="Date formatting edge cases"
            description="react-dashboard / src/utils/formatters.ts"
            difficulty="medium"
            status="active"
            reward={250}
            submissions={2}
        />

        <YourBounty 
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

export default YourBounties