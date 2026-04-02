import React from 'react'
import { GoTrophy } from 'react-icons/go'

const Topthree = () => {
  return (
    <div>
        <div className='flex flex-col items-center'>
          <div className='flex flex-row justify-between items-center gap-3'>
            <GoTrophy  color="green" size={45}/>
            <h1 className="text-3xl font-semibold mb-2 mt-3">Leaderboard</h1>
          </div>
          <h3 className="text-lg mb-6 text-gray-400">Top bug hunters ranked by reputation and earnings</h3>
        </div>

    </div>
  )
}

export default Topthree