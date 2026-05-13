//starting dashboard implementation!
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/NavBar";
import HunterStat from "../components/hunter/dashboard/Quickstat";
import OwnerStat from "../components/Owner/dashboard/Quickstat";
import CommonStat from "../components/common/dashboard/Quickstat";
import Browserheader from "../components/hunter/browser/Browserheader";
import Header from "../components/hunter/leaderboard/Header";
import RecentBounties from "../components/hunter/dashboard/RecentBounties";
import Submissions from "../components/hunter/dashboard/Submissions";
import Quickactions from "../components/Quickactions";
import Searchbar from "../components/hunter/browser/Searchbar";
import ActiveBounties from "../components/hunter/browser/ActiveBounties";
import Bottombar from "../components/Bottombar";
import TopThreeCard from "../components/hunter/leaderboard/TopThreeCard";
import Ranking from "../components/hunter/leaderboard/Ranking";
import SummaryCard from "../components/hunter/leaderboard/SummaryCard";
import YourBounties from '../components/Owner/dashboard/YourBounties';
import Recentactivity from '../components/Owner/dashboard/RecentActivity';
import CreateHeader from "../components/Owner/createBounty/CreateHeader";
import SetupBounty from '../components/Owner/createBounty/SetupBounty';
import BountyDetails from "../components/BountyDetails";

type dashboardProps = {
  role: string;
};


const Dashboard = ({
  role
}: dashboardProps) => {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortingOption, setSortingOption] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [bountyClicked, setBountyClicked] = useState<number | null>(0);
  const [clickedID,  setclickedID] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(activePage === "bounties" && bountyClicked === true){
      navigate(`/bounty/${clickedID}`);
    }
  }, [activePage, bountyClicked, clickedID, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">

      <Navbar setActivePage={setActivePage} activePage={activePage} loginStatus={role} />
      
      <div className="flex-grow px-8 md:px-16 py-6 mt-20">
        {activePage === "dashboard" && (
          <>
            {role === "hunter" && 
              <HunterStat />
            }

            {role === "owner" && 
              <OwnerStat />
            }
             
            {role === "common" && 
              <CommonStat />
            }

            {role === "hunter" && 
              <div className="flex flex-row gap-8 mt-6">
                <div className="flex-1">
                  <RecentBounties />
                </div>
                <div className="flex-1">
                  <Submissions />
                </div>
              </div>
            }

            {role === "owner" && 
              <div className="flex flex-row gap-8 mt-6">
                <div className="flex-1">
                  <YourBounties />
                </div>
                <div className="flex-1">
                  <Recentactivity />
                </div>
              </div>
            }

            {role === "common" && 
              <div className="flex flex-row gap-8 mt-6">
                <div className="flex-1">
                  <YourBounties />
                </div>
                <div className="flex-1">
                  <Submissions />
                </div>
              </div>
            }

            <Quickactions curPage={role} setActivePage={setActivePage} />
          </>
        )
        }

        {activePage === "bounties" && bountyClicked === 0 &&
        (
          ///
          <>
          <Browserheader />
          <Searchbar setSelectedDifficulty={setSelectedDifficulty} setSortingOption={setSortingOption} setSearchQuery={setSearchQuery} />
          <ActiveBounties
            setBountyClicked={setBountyClicked}
            setclickedID={setclickedID}
            selectedDifficulty={selectedDifficulty} sortingOption={sortingOption} searchQuery={searchQuery} />
          </>
          ///
        )
        }

        {activePage === "bounties" && bountyClicked === 1 &&
        (
          <>
          <BountyDetails setBountyClicked={setBountyClicked} />
          </>
        )
        }

        {role !== "hunter" && activePage === "createBounty" && (
            <>
            <CreateHeader />
            <SetupBounty />
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
        )}
      </div>

      <Bottombar />
    </div>
  );
}

export default Dashboard;