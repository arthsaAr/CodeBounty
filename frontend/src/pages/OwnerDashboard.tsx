//starting dashboard implementation!
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components.tsx/Navbar";
import Quickstat from "../components.tsx/Quickstat";
import BrowseBounties from "../components.tsx/BrowseBounties";
import Leaderboard from "../components.tsx/Leaderboard";

export default function OwnerDashboard() {
    
  // const [bounties, setBounties] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:3000/bounties?owner=true", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => setBounties(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar setActivePage={setActivePage} activePage={activePage} />
      
      <div className="px-8 md:px-16 py-6">
        {activePage === "dashboard" && <Quickstat />}

        {activePage === "bounties" && <BrowseBounties />}

        {activePage === "leaderboard" && <Leaderboard />}
      </div>
      
      {/* <button className="bg-green-500 px-4 py-2 rounded mb-6">
        Create Bounty
      </button> */}

      {/* <div>
        {bounties.map((b: any) => (
          <div key={b.id} className="border p-4 mb-2 rounded">
            <p>{b.title}</p>
            <p>${b.amount}</p>
            <p>{b.status}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}