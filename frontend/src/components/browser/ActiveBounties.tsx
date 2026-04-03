import React from 'react'
import Bounty from "./subcomponent/Bounty";

const ActiveBounties = () => {
  return (
    <div className='mt-3'>
      <h2 className='text-md text-gray-400 mb-3'>Showing 4 active bounties</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Bounty 
          title="Debounce hook optimization" 
          credits={150}
          description="The custom debounce hook could be optimized. Looking for cleaner implementation."
          difficulty="easy"
          repo="react-dashboard"
          file="src/hooks/useDebounce.ts"
          author="genix"
          date="3/10/2026"
          />
        <Bounty 
          title="Date formatting edge cases" 
          credits={250}
          description="Date formatter doesn't handle timezone edge cases correctly. Need comprehensive testing."
          difficulty="medium"
          repo="analytics-app"
          file="src/components/Chart.tsx"
          author="genix"
          date="3/12/2026"
          />
        <Bounty 
          title="Security vulnerability in JWT validation" 
          credits={750}
          description="Potential security issue in JWT token validation. Need thorough security review."
          difficulty="hard"
          repo="analytics-app"
          file="src/components/Chart.tsx"
          author="ggegeg enix"
          date="3/10/2029"
          />
        <Bounty 
          title="Memory leak in Chart component" 
          credits={500}
          description="The Chart component causes memory leaks when rapidly switching between dashboards. Looking for performance optimization."
          difficulty="hard"
          repo="react-dashboard"
          file="src/hooks/useDebounce.ts"
          author="genix"
          date="3/11/2026"
          />
      </div>
    </div>
  )
}

export default ActiveBounties