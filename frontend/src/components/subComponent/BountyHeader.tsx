import React from "react";
import { CiCalendar } from "react-icons/ci";
import { MdKeyboardBackspace } from "react-icons/md";
import { FiUser } from "react-icons/fi";

export type Bounty = {
  title: string;
  description: string;
  difficulty: string;
  status: string;
  amount: number;
  filePath: string;
  createdAt: string;
  creator?: { username: string };
  repository?: { name: string; owner?: { username: string } };
};

type BountyHeaderProps = {
  bounty: Bounty | null;
  onBack?: () => void;
};

const BountyHeader = ({ bounty, onBack }: BountyHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between px-8 md:px-16 py-6 gap-8">
      <div className="flex flex-col items-center text-center md:items-start md:text-left gap-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex flex-row hover:bg-[#1d2532] items-center gap-1 border border-[#151920] px-3 py-2 justify-start rounded-lg mb-2"
        >
          <MdKeyboardBackspace size={20} />
          <span className="text-lg">Back to repositories</span>
        </button>

        <div className="flex flex-col items-center md:items-start gap-2">
          <h1 className="text-4xl font-semibold">{bounty?.title}</h1>
          <h3 className="text-lg text-gray-400">{bounty?.description}</h3>

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
              <FiUser size={24} className="text-gray-400" />
              <h3 className="text-lg text-gray-400">{bounty?.creator?.username}</h3>
            </div>

            <div className="flex flex-row items-center gap-1">
              <CiCalendar size={24} />
              <h3 className="text-lg text-gray-400">
                {bounty?.createdAt ? new Date(bounty.createdAt).toLocaleDateString() : ""}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-center gap-1">
        <h3 className="text-4xl text-emerald-400">{bounty?.amount}</h3>
        <h3 className="text-xl text-gray-400">credits</h3>
      </div>
    </div>
  );
};

export default BountyHeader;