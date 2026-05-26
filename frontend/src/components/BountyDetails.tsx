import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiCalendar } from "react-icons/ci";
import SubmissionTips from "./subComponent/SubmissionTips";
import BountyStats from "./subComponent/BountyStats";
import RepositoryInfo from "./subComponent/RepositoryInfo";
import Codebox from "./subComponent/Codebox";
import { MdKeyboardBackspace } from "react-icons/md";

type detailsProps = {
  setBountyClicked?: React.Dispatch<React.SetStateAction<number | null>>;
  selectedID?: number | null;
}

const BountyDetails = ({setBountyClicked, selectedID}: detailsProps) => {
  const [bounty, setBounty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitClicked, setSubmitClicked] = useState<number | null>(0);

  useEffect(() => {
    if (selectedID == null) {
      setBounty(null);
      setLoading(false);
      return;
    }

    const fetchBountyDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://localhost:3000/bounties/${selectedID}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setBounty(res.data);
      } catch (error) {
        console.error("Error fetching bounty details:", error);
      } finally{
        setLoading(false);
      }
    };

    fetchBountyDetails();
  }, [selectedID]);

  //same loading animation as when fetching repos.
  if(loading){
      return (
          <div className="flex items-center justify-center min-h-screen bg-[#0f131a] text-white">
              <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>

                  <div className="text-gray-400 text-lg animate-pulse">
                      Loading Data...
                  </div>
              </div>
          </div>
      );
  }
  
  return (
      <div className="flex-grow px-8 md:px-16 py-6">
        <div className="flex flex-col md:flex-row justify-between px-8 md:px-16 py-6 gap-8">
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-2">

            <div onClick={() => setBountyClicked(0)}
                className='inline-flex flex-row hover:bg-[#1d2532] items-center gap-1 border border-[#151920] px-3 py-2 justify-start rounded-lg mb-2'>
                <MdKeyboardBackspace size={20} />
                <h1 className='text-lg'>Back to repositories</h1>
            </div>

            <div className="flex flex-col items-center md:items-start gap-2">
              <h1 className="text-4xl font-semibold">{bounty?.title}</h1>
              <h3 className="text-lg  text-gray-400">{bounty?.description}</h3>

              <div className="flex flex-col md:flex-row gap-2 md:items-center">
                <span className={`px-3 py-1 text-lg font-medium rounded-full 
                  ${bounty?.difficulty === "easy" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                    bounty?.difficulty === "medium" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                    bounty?.difficulty === "hard" ? "bg-red-500/10 text-red-400 border border-red-500/20" : 
                    "bg-gray-100 text-gray-800"
                  }
                  `}>
                  {bounty?.difficulty}
                </span>
                <span className={`text-lg font-semibold py-1 px-3 rounded-full
                  ${bounty?.status === "active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                    bounty?.status === "completed" ? "bg-gray-500/10 text-gray-400 border border-gray-500/20" :
                    bounty?.status === "cancelled" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }
                  `}>
                  {bounty?.status}
                </span>

                <div className="flex flex-row items-center gap-1">
                  <CiCalendar size={24}/>
                  <h3 className="text-lg text-gray-400">{new Date(bounty?.createdAt).toLocaleDateString()}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-1">
            <h3 className="text-4xl  text-emerald-400">{bounty?.amount}</h3>
            <h3 className="text-xl  text-gray-400">credits</h3>
          </div>
        </div>

        <div className="flex flex-row w-full gap-3 items-start">
  
        <div className="w-1/2 flex flex-col">
          <Codebox setSubmitClicked={setSubmitClicked} />
        </div>

        <div className="w-1/2 flex flex-col gap-3">
          <RepositoryInfo repository={bounty?.repository?.name} file={bounty?.filePath} owner={bounty?.repository?.owner?.username} />
          <BountyStats submissions={1} reward={bounty?.amount} status={bounty?.status} />
          <SubmissionTips />
        </div>
      </div>
      </div>
  )
}

export default BountyDetails