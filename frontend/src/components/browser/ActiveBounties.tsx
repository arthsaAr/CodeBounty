import React from 'react'
import Bounty from "./subcomponent/Bounty";

const ActiveBounties = () => {
  return (
    <div className='mt-3'>
      <h2 className='text-md text-gray-400 mb-3'>Showing 4 active bounties</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Bounty />
        <Bounty />
        <Bounty />
        <Bounty />
      </div>

    </div>
  )
}

export default ActiveBounties