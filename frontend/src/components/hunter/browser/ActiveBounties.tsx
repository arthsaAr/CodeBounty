import React, { useEffect, useState } from 'react';
import Bounty from "./subcomponent/Bounty";

type ActiveBountiesProps = {
  selectedDifficulty: string;
}

const ActiveBounties = ({ selectedDifficulty }: ActiveBountiesProps) => {
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

  
const filteredBounties = 
  selectedDifficulty === "all" ? 
  bounties : bounties.filter((bounty: any) => bounty.difficulty === selectedDifficulty);

  return (
    <div className='mt-3'>
      <h2 className='text-md text-gray-400 mb-3'>Showing {filteredBounties.length} active bounties</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {filteredBounties
          .map((bounty: any) => (
          <Bounty 
          id={bounty.id}
          title={bounty.title}
          credits={bounty.amount}
          description={bounty.description}
          difficulty={bounty.difficulty}
          repo={bounty.repository.name}
          // file={bounty.file}
          // author={bounty.repository.owner.username}
          // date={bounty.date}
          />
        ))}
      </div>
    </div>
  )
}

export default ActiveBounties