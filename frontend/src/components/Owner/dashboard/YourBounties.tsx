import React, { useEffect, useState } from 'react'
import { RiCoinsLine } from 'react-icons/ri'
import YourBounty from '../../hunter/dashboard/subcomponent/Recentbounty'

type YourBountiesProps = {
    setBountyClicked?: React.Dispatch<React.SetStateAction<number | null>>;
    setclickedID?: React.Dispatch<React.SetStateAction<number | null>>;
}

const YourBounties = ({ setBountyClicked, setclickedID }: YourBountiesProps) => {
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
    <div>
        <div className='flex flex-row justify-between mb-4 items-center'>
            <h2 className='text-2xl font-semibold'>Your Bounties</h2>
            <button className='text-lg text-white hover:text-emerald-400'>View All</button>
        </div>

        {bounties
          .map((recentBounty: any) => (
          <YourBounty 
            setBountyClicked={setBountyClicked}
            setclickedID={setclickedID}
            id={recentBounty.id}
            title={recentBounty.title}
            description={recentBounty.description}
            difficulty={recentBounty.difficulty}
            status={recentBounty.status}
            reward={recentBounty.reward}
            submissions={3}
        />
        ))}

    </div>
  )
}

export default YourBounties