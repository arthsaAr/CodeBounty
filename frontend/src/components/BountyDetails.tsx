import React, { useEffect, useState } from "react";
import axios from "axios";
import SubmissionTips from "./subComponent/SubmissionTips";
import BountyStats from "./subComponent/BountyStats";
import RepositoryInfo from "./subComponent/RepositoryInfo";
import Codebox from "./subComponent/Codebox";
import Submissions from "./subComponent/Submissions";
import SubmissionForm from "./subComponent/SubmissionForm";
import BountyHeader, { Bounty } from "./subComponent/BountyHeader";

const API_URL = "http://localhost:3000";

type detailsProps = {
  setBountyClicked?: React.Dispatch<React.SetStateAction<number | null>>;
  selectedID?: number | null;
};

const BountyDetails = ({ setBountyClicked, selectedID }: detailsProps) => {
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [submitCounter, setSubmitCounter] = useState(0);
  const [totalLines, setTotalLines] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    if (selectedID == null) {
      setBounty(null);
      setLoading(false);
      return;
    }

    // Ignore the response if selectedID changes before it arrives
    let ignore = false;
    setLoading(true);

    const fetchBountyDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get<Bounty>(`${API_URL}/bounties/${selectedID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!ignore) setBounty(res.data);
      } catch (error) {
        console.error("Error fetching bounty details:", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchBountyDetails();

    return () => {
      ignore = true;
    };
  }, [selectedID]);

  // Same loading animation as when fetching repos.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f131a] text-white">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-400 text-lg animate-pulse">Loading Data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow px-8 md:px-16 py-6">
      <BountyHeader bounty={bounty} onBack={() => setBountyClicked?.(0)} />

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-3 items-start">
        <div className="flex flex-col gap-3">
          <Codebox
            bountyId={selectedID}
            filePath={bounty?.filePath}
            submitClicked={submitClicked}
            setSubmitClicked={setSubmitClicked}
            setTotalLines={setTotalLines}
          />

          {submitClicked && (
            <SubmissionForm
              selectedID={selectedID}
              setSubmitClicked={setSubmitClicked}
              setSubmitCounter={setSubmitCounter}
              totalLines={totalLines}
            />
          )}

          <Submissions
            clickedID={selectedID}
            submitClicked={submitCounter}
            count={submissionCount}
            setCount={setSubmissionCount}
          />
        </div>

        <div className="flex flex-col gap-3">
          <RepositoryInfo
            repository={bounty?.repository?.name}
            file={bounty?.filePath}
            owner={bounty?.repository?.owner?.username}
          />
          <BountyStats
            submissions={submissionCount}
            reward={bounty?.amount}
            status={bounty?.status}
          />
          <SubmissionTips />
        </div>
      </div>
    </div>
  );
};

export default BountyDetails;