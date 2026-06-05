import React, { useEffect, useState } from 'react'
import Submission from '../../hunter/dashboard/subcomponent/Submission';

type props = {
    clickedID?: number | null;
}

const Recentactivity = ({ clickedID }: props) => {
   const [activity, setActivity] = useState([]);
  
    useEffect(() => {
        const fetchBounties = async () => {
            try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3000/bugReports/bounty/${clickedID}`, {
                  method: "GET",
                  headers: {
                      "Authorization": `Bearer ${token}`
                  }
              });
    
            const data = await res.json();
            setActivity(data);
            } catch (err) {
            console.error("Failed to fetch bounties:", err);
            }
        };
        
        if (clickedID) {
            fetchBounties();
        }
        }, [clickedID]);

  return (
    <div>
        <h2 className='text-2xl font-semibold mb-4'>Recent Activity</h2>

        {activity.length > 0 ? (
            activity
            .map((recentReport: any) => (
            <Submission 
                title={recentReport.title}
                description={recentReport.description}
                difficulty={recentReport.severity}
                status={recentReport.status}
                />
            ))
        ) : (
            <div className="text-gray-400 italic p-4 bg-zinc-900/50 rounded-lg text-center border border-zinc-800">
                You dont have any activity yet!
            </div>
        )}
    </div>
  )
}

export default Recentactivity