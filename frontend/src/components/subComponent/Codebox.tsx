import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaFileCode } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa";

type codeboxProps = {
  bountyId?: number | null;
  filePath?: string;
  submitClicked?: boolean;
  setSubmitClicked?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Codebox = ({ bountyId, filePath, submitClicked, setSubmitClicked }: codeboxProps) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //fetching the actual file content of this bounty
  useEffect(() => {
    if (bountyId == null) return;

    const fetchContent = async () => {
      try {
        setError(null);
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://localhost:3000/bounties/${bountyId}/content`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCode(res.data.content);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load file content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [bountyId]);

  const eachLines = code.split("\n");

  return (
    <div className="w-full h-full rounded-xl border border-[#1f2937] bg-[#0d1117] overflow-hidden">

      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-3 py-3 border-b border-[#1f2937] bg-[#161b22]">
          <FaFileCode color='green' size={20}/>

          <span className="ml-1 text-sm text-gray-400 font-medium">
            {filePath}
          </span>
        </div>

        <button className="flex flex-row gap-2 bg-emerald-500 p-3 hover:bg-emerald-400 text-black text-sm py-1 mt-3 mr-2 font-semibold items-center rounded-lg"
                onClick={() => setSubmitClicked?.(!submitClicked)}>
         <FaRegPaperPlane color='black' size={18}/>
         <span>
          Submit Bug Report
         </span>
        </button>
      </div>

      {/* main code Area */}
      {loading ? (
        <p className="p-6 text-gray-400 animate-pulse">Loading file...</p>
      ) : error ? (
        <p className="p-6 text-sm text-red-400">{error}</p>
      ) : (
        <div className="overflow-auto max-h-[70vh] p-4 font-mono text-sm">
          {eachLines.map((line, index) => (
            <div
              key={index}
              className="flex gap-4 hover:bg-white/5 px-2 rounded-md"
            >

              {/* increasing line number */}
              <span className="w-8 text-right text-gray-500 select-none">
                {index + 1}
              </span>

              {/* main code */}
              <span className="text-gray-300 whitespace-pre">
                {line || " "}
              </span>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Codebox