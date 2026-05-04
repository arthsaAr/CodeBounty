import React, { useEffect, useState } from 'react';
import Bounty from "./subcomponent/Bounty";


const ActiveBounties = () => {
  const [bounties, setBounties] = useState([]);

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const res = await fetch("http://localhost:3000/bounties/");

        const data = await res.json();
        setBounties(data);
      } catch (err) {
        console.error("Failed to fetch bounties:", err);
      }
    };

    fetchBounties();
  }, []);


  return (
    <div className='mt-3'>
      <h2 className='text-md text-gray-400 mb-3'>Showing {bounties.length} active bounties</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {bounties.map((bounty: any) => (
          <Bounty 
          id={bounty.id}
          title={bounty.title}
          credits={bounty.credits}
          description={bounty.description}
          difficulty={bounty.difficulty}
          repo={bounty.repo}
          file={bounty.file}
          author={bounty.author}
          date={bounty.date}
          />
        ))}
      </div>
    </div>
  )
}

export default ActiveBounties