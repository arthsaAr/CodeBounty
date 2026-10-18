import { useEffect, useState } from 'react'
import Submission from './subcomponent/Submission';

const API_URL = "http://localhost:3000";

type SubmissionsProps = {
    requestPage: string;
    clickedID?: number | null;
    submitClicked?: number;
    setCount?: React.Dispatch<React.SetStateAction<number>>;
}

type Report = {
    id: number;
    title: string;
    description: string;
    severity: string;
    status: string;
    lineStart: number;
    lineEnd: number;
    hunter?: { username: string };
};

const Submissions = ({ requestPage, clickedID, submitClicked, setCount }: SubmissionsProps) => {
    const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
      const fetchBounties = async () => {
          try {
          const token = localStorage.getItem("token");
          const res = await fetch(`${API_URL}/bugReports/bounty/${clickedID}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
  
          const data = await res.json();
          setReports(data);

          setCount?.(Array.isArray(data) ? data.length : 0);   //this sends the real number of submissions/reports to the heading!
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
                key={recentReport.id}
                requestPage={requestPage}
                title={recentReport.title}
                description={recentReport.description}
                difficulty={recentReport.severity}
                status={recentReport.status}
                username={recentReport.hunter?.username}
                lineStart={recentReport.lineStart}
                lineEnd={recentReport.lineEnd}
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