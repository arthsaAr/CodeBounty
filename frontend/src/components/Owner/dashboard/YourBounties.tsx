import React, { useEffect, useState } from 'react'
import YourBounty from '../../hunter/dashboard/subcomponent/Recentbounty'

const API_URL = "http://localhost:3000";

type YourBountiesProps = {
    setActivePage?: React.Dispatch<React.SetStateAction<string>>;
    setBountyClicked?: React.Dispatch<React.SetStateAction<number | null>>;
    setclickedID?: React.Dispatch<React.SetStateAction<number | null>>;
}

const YourBounties = ({ setActivePage, setBountyClicked, setclickedID }: YourBountiesProps) => {
    const [bounties, setBounties] = useState<any[]>([]);
        
    useEffect(() => {
    const fetchBounties = async () => {
        try {    
        const token = localStorage.getItem("token");

        // mine route returns only the logged-in owner bounties
        const res = await fetch(`${API_URL}/bounties/mine`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // without this, an error response (like a 401) would be saved as bounties and break .map
        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }

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
            <button 
                onClick={() => {
                    setActivePage?.("bounties");
                }}
                className='text-lg text-white hover:text-emerald-400'>View All</button>
        </div>

        {bounties.length > 0 ? (
            bounties
            .map((recentBounty) => (
            <YourBounty 
                key={recentBounty.id}
                setBountyClicked={setBountyClicked}
                setclickedID={setclickedID}
                id={recentBounty.id}
                title={recentBounty.title}
                description={recentBounty.description}
                difficulty={recentBounty.difficulty}
                status={recentBounty.status}
                reward={recentBounty.amount}
                submissions={3}
                />
            ))
        ) : (
            <div className="text-gray-400 italic p-4 bg-zinc-900/50 rounded-lg text-center border border-zinc-800">
                No bounty at the moment!
            </div>
        )}
    </div>
  )
}

export default YourBounties