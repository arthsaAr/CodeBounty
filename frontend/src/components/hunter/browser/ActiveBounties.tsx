import React, { useEffect, useState } from 'react';
import Bounty from "./subcomponent/Bounty";

type ActiveBountiesProps = {
  selectedDifficulty: string;
  sortingOption: string;
  searchQuery: string;
  setBountyClickedOwner: React.Dispatch<React.SetStateAction<number | null>>;
  setclickedIDOwner?: React.Dispatch<React.SetStateAction<number | null>>;
}

const ActiveBounties = ({ selectedDifficulty, sortingOption, searchQuery, setBountyClickedOwner, setclickedIDOwner }: ActiveBountiesProps) => {
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

const sortedBounties = [...filteredBounties].sort((a: any, b: any) => {
  if (sortingOption === "newest") {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }
  if (sortingOption === "highest") {
    return b.amount - a.amount;
  }
  return 0;
});

const searchedBounties = sortedBounties.filter((bounty: any) =>
  bounty.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  bounty.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  bounty.repository.name.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div className='mt-3'>
      <h2 className='text-md text-gray-400 mb-3'>Showing {searchedBounties.length} active bounties</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {searchedBounties
          .map((bounty: any) => (
          <Bounty
          setBountyClickedOwner={setBountyClickedOwner}
          setclickedIDOwner={setclickedIDOwner}
          id={bounty.id}
          title={bounty.title}
          credits={bounty.amount}
          description={bounty.description}
          difficulty={bounty.difficulty}
          repo={bounty.repository.name}
          file={bounty.filePath}
          author={bounty.creator?.username || "Unknown"}
          date={bounty.createdAt}
          />
        ))}
      </div>
    </div>
  )
}

export default ActiveBounties