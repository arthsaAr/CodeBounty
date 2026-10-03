import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaFileCode } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa";

type codeboxProps = {
  bountyId?: number | null;
  submitClicked?: boolean;
  setSubmitClicked?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Codebox = ({ bountyId, submitClicked, setSubmitClicked }: codeboxProps) => {
  const [code, setCode] = useState("");
  const [filePath, setFilePath] = useState("");
  const [truncated, setTruncated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bountyId == null) return;
    let cancelled = false;

    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3000/bounties/${bountyId}/content`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (cancelled) return;
        setCode(res.data.content);
        setFilePath(res.data.filePath);
        setTruncated(!!res.data.truncated);
      } catch (err: any) {
        if (cancelled) return;
        setError(err.response?.data?.message || "Failed to load file content");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchContent();
    return () => { cancelled = true; };
  }, [bountyId]);

  const eachLines = code.split("\n");

  return (
    <div className="w-full h-full rounded-xl border border-[#1f2937] bg-[#0d1117] overflow-hidden">

      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-3 py-3 border-b border-[#1f2937] bg-[#161b22] min-w-0">
          <FaFileCode color='green' size={20}/>

          <span className="ml-1 text-sm text-gray-400 font-medium truncate">
            {filePath || "Loading..."}
          </span>
        </div>

        <button className="flex flex-row gap-2 bg-emerald-500 p-3 hover:bg-emerald-400 text-black text-sm py-1 mt-3 mr-2 font-semibold items-center rounded-lg shrink-0"
                onClick={() => setSubmitClicked?.(!submitClicked)}>
         <FaRegPaperPlane color='black' size={18}/>
         <span>
          Submit Bug Report
         </span>
        </button>
      </div>

      {/* main code Area */}
      {loading ? (
        <div className="flex items-center justify-center gap-3 p-10 text-gray-400">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="animate-pulse">Loading file...</span>
        </div>
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
              <span className="w-8 shrink-0 text-right text-gray-500 select-none">
                {index + 1}
              </span>

              {/* main code */}
              <span className="text-gray-300 whitespace-pre">
                {line || " "}
              </span>
            </div>
          ))}
          {truncated && (
            <p className="mt-3 px-2 text-xs text-yellow-500">
              This file is large, so only the first part is shown.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default Codebox