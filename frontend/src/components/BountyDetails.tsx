import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";

type Bounty = {
  id: number;
  title: string;
  description: string;
  amount: number;
  difficulty: string;
  status: string;
  repository?: {
    name: string;
    url: string;
  };
  creator?: {
    username: string;
  };
};

const fallbackBounty: Bounty = {
  id: 0,
  title: "Fix authentication race condition",
  description:
    "Review the login flow and submit a bug report with the affected line numbers, reproduction steps, and suggested fix.",
  amount: 250,
  difficulty: "Medium",
  status: "active",
  repository: {
    name: "codebounty/frontend",
    url: "https://github.com/arthsaAr/CodeBounty",
  },
  creator: {
    username: "repo_owner",
  },
};

const BountyDetails = () => {
  const { id } = useParams();

  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBountyDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://localhost:3000/bounties/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        setBounty(res.data);
      } catch (error) {
        console.error("Error fetching bounty details:", error);
        setBounty(fallbackBounty);
      } finally {
        setLoading(false);
      }
    };

    fetchBountyDetails();
  }, [id]);

  const visibleBounty = bounty ?? fallbackBounty;
  const codeSample = useMemo(
    () => `async function submitBugReport(report) {\n  const response = await fetch('/bug-reports', {\n    method: 'POST',\n    body: JSON.stringify(report),\n  })\n\n  return response.json()\n}`,
    []
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f131a] text-white">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>

          <div className="text-gray-400 text-lg animate-pulse">
            Loading bounty details...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f131a] text-white">
      <Navbar setActivePage={() => {}} activePage="bounties" loginStatus="hunter" />

      <main className="px-6 md:px-16 py-8 pt-28">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-emerald-500/20 bg-[#151920] p-6 shadow-2xl shadow-emerald-900/10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                {visibleBounty.status}
              </span>
              <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-sm text-sky-300">
                {visibleBounty.difficulty}
              </span>
            </div>
            <h1 className="text-3xl font-semibold md:text-5xl">{visibleBounty.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-300">
              {visibleBounty.description}
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-black/30 p-5 text-right">
            <div className="text-4xl font-bold text-emerald-400">
              {visibleBounty.amount}
            </div>
            <div className="text-sm text-gray-400">credits reward</div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-gray-800 bg-[#151920] p-6">
            <h2 className="mb-4 text-2xl font-semibold">Code panel</h2>
            <div className="mb-3 flex items-center justify-between rounded-lg bg-black/40 px-4 py-3 text-sm text-gray-400">
              <span>{visibleBounty.repository?.name ?? "Repository"}</span>
              <a
                href={visibleBounty.repository?.url ?? "#"}
                className="text-emerald-400 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Open repo
              </a>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0b0f14] p-5 text-sm leading-7 text-gray-200">
              <code>{codeSample}</code>
            </pre>
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-gray-800 bg-[#151920] p-6">
              <h2 className="mb-4 text-2xl font-semibold">Submission checklist</h2>
              <ul className="space-y-3 text-gray-300">
                <li>• Explain the bug and affected behavior</li>
                <li>• Include reproduction steps</li>
                <li>• Reference line numbers from the code panel</li>
                <li>• Suggest a fix or mitigation</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-gray-800 bg-[#151920] p-6">
              <h2 className="mb-4 text-2xl font-semibold">Bounty owner</h2>
              <p className="text-gray-300">Posted by {visibleBounty.creator?.username ?? "owner"}</p>
              <button className="mt-5 w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-black transition hover:bg-emerald-400">
                Submit bug report
              </button>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BountyDetails;
