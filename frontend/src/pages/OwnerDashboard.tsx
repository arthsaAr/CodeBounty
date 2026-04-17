// page to show all the active bounties
// lets user act as bug hunters(fixers)
import React from 'react'
import Bottombar from "../components/Bottombar";
import Navbar from "../components/NavOwner";
import { useState } from "react";
import Quickstat from "../components/Owner/dashboard/Quickstat";
import Quickactions from "../components/Owner/dashboard/Quickactions";
import YourBounties from '../components/Owner/dashboard/YourBounties';
import Recentactivity from '../components/Owner/dashboard/RecentActivity';
import Browserheader from "../components/hunter/browser/Browserheader";
import Header from "../components/hunter/leaderboard/Header";
import TopThreeCard from "../components/hunter/leaderboard/TopThreeCard";
import Ranking from "../components/hunter/leaderboard/Ranking";
import SummaryCard from "../components/hunter/leaderboard/SummaryCard";
import Searchbar from "../components/hunter/browser/Searchbar";
import ActiveBounties from "../components/hunter/browser/ActiveBounties";

export default function OwnerDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">

      <Navbar setActivePage={setActivePage} activePage={activePage} />

      <div className="flex-grow px-8 md:px-16 py-6 mt-20">
        {activePage === "dashboard" && (
          <>
            <Quickstat />
            
            <div className="flex flex-row gap-8 mt-6">
              <div className="flex-1">
                <YourBounties />
              </div>
              <div className="flex-1">
                <Recentactivity />
              </div>
            </div>

            <Quickactions setActivePage={setActivePage} />
          </>
        )
        }

        {activePage === "bounties" && (
          <>
            <Browserheader />
            <Searchbar />
            <ActiveBounties />
          </>
        )
        }

        {activePage === "createBounty" && (
          <>
          <h1 className='text-white'>CREATE BOUNTY</h1>
          </>
        )
        }

        {activePage === "leaderboard" && (
          <>
            <Header />
            <TopThreeCard />
            <Ranking />
            <SummaryCard />
          </>
        )
        }
      </div>

      <Bottombar />
    </div>
  )
}
