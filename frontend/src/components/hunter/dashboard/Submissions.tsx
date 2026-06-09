import { useEffect, useState } from 'react'
import Submission from './subcomponent/Submission';

type SubmissionsProps = {
    requestPage: string;
    clickedID?: number | null;
    submitClicked?: number;
}

type Report = {
    title: string;
    description: string;
    severity: string;
    status: string;
};

const Submissions = ({ requestPage, clickedID, submitClicked }: SubmissionsProps) => {
    const [reports, setReports] = useState<Report[]>([]);

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
          setReports(data);
          } catch (err) {
          console.error("Failed to fetch bounties:", err);
          }
      };
      
      if (clickedID != null) {
          fetchBounties();
      }
      }, [clickedID, submitClicked]);

  return (
    <div>
        {requestPage !== "bountyDetails" && ( 
            <h2 className='text-2xl font-semibold mb-4'>Your Submissions</h2>
        )}

        {reports.length > 0 ? (
            reports.map((recentReport) => (
            <Submission
                requestPage={requestPage}
                title={recentReport.title}
                description={recentReport.description}
                difficulty={recentReport.severity}
                status={recentReport.status}
                />
            ))
        ) : (
            <div className="text-gray-400 italic p-4 bg-zinc-900/50 rounded-lg text-center border border-zinc-800">
                You have not submitted any reports yet!
            </div>
        )}
    </div>
  )
}

export default Submissions