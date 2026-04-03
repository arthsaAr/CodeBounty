//starting dashboard implementation!
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Quickstat from "../components/dashboard/Quickstat";
import  Browserheader from "../components/browser/browserheader";
import Leaderboard from "../components/leaderboard/Topthree";
import RecentBounties from "../components/dashboard/RecentBounties";
import Submissions from "../components/dashboard/Submissions";
import Quickactions from "../components/dashboard/Quickactions";
import Searchbar from "../components/browser/Searchbar";
import ActiveBounties from "../components/browser/ActiveBounties";
import Bottombar from "../components/Bottombar";

export default function OwnerDashboard() {
    
  // const [bounties, setBounties] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   axios.get("http://localhost:3000/bounties?owner=true", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then(res => setBounties(res.data))
  //   .catch(err => console.error(err));
  // }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">

      <Navbar setActivePage={setActivePage} activePage={activePage} />
      
      <div className="flex-grow px-8 md:px-16 py-6">
        {activePage === "dashboard" && (
          <>
            <Quickstat /> 
            <div className="flex flex-row gap-8 mt-6">
              <div className="flex-1">
                <RecentBounties />
              </div>
              <div className="flex-1">
                <Submissions />
              </div>
            </div>

            <Quickactions setActivePage={setActivePage} />
          </>
        )
        }

        {activePage === "bounties" && 
        (
          <>
          <Browserheader />
          <Searchbar />
          <ActiveBounties />
          </>
        )
        }

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

      <Bottombar />
    </div>
  );
}