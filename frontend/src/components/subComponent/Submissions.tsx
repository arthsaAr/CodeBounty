import React, { useEffect, useState } from 'react'

type SubmissionsProps = {
  submitClicked: number;
}

const Submissions = ({ submitClicked }: SubmissionsProps) => {
   const [recentSubmissions, setRecentSubmissions] = useState([]);
    
      useEffect(() => {
          const fetchBounties = async () => {
              try {
              const token = localStorage.getItem("token");
              const res = await fetch(`http://localhost:3000/bugReports/bounty/${submitClicked}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
      
              const data = await res.json();
              setRecentSubmissions(data);
              } catch (err) {
              console.error("Failed to fetch bounties:", err);
              }
          };
          
          if (submitClicked) {
              fetchBounties();
          }
          }, [submitClicked]);
          
  return (
    <div className="w-full h-full mt-2 rounded-xl p-6 border border-[#1f2937] bg-[#0d1117] overflow-hidden">
        <h1 className='text-white font-semibold text-lg'>Submissions({submitClicked})</h1>

        <div className='mt-2 rounded-lg bg-[#151920] border w-full border-gray-800 p-6 justify-between items-center cursor-pointer'>
            TODO!
        </div>
    </div>
  )
}

export default Submissions