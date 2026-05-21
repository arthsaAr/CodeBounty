//starting dashboard implementation!
import { useEffect, useState } from "react";
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

  const [bountyClickedOwner, setBountyClickedOwner] = useState<number | null>(0);
  const [clickedIDOwner,  setclickedIDOwner] = useState<number | null>(null);

  const [bountyClickedCommon, setBountyClickedCommon] = useState<number | null>(0);
  const [clickedIDCommon,  setclickedIDCommon] = useState<number | null>(null);

  const [bountyClickedHunter, setBountyClickedHunter] = useState<number | null>(0);
  const [clickedIDHunter,  setclickedIDHunter] = useState<number | null>(null);

  const [userName, setUserName] = useState("");

  const [bountyCount, setBountyCount] = useState(0);
    
    const getName = async () => {
        const token = localStorage.getItem("token");
  
        if (!token){
          return;
        }
  
        try {
            const res = await fetch("http://localhost:3000/auth/loggedname", { 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
  
            if (res.ok) {
                const data = await res.json();
                setUserName(data.username);
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching name:", error);
        }
    }
  
    useEffect(() => {
        getName();
      }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">

      <Navbar userName={userName} setActivePage={setActivePage} activePage={activePage} loginStatus={role} />

      <div className="flex-grow px-8 md:px-16 py-6 mt-20">
        {activePage === "dashboard" && (
          <>
            {role === "hunter" && bountyClickedHunter === 0 &&
            <>
              <HunterStat userName={userName} />
              <div className="flex flex-row gap-8 mt-6">
                {bountyCount > 0 && (
                  <div className="flex-1">
                    <RecentBounties 
                      setBountyCount={setBountyCount}
                      setActivePage={setActivePage}
                      setBountyClicked={setBountyClickedHunter}
                    setclickedID={setclickedIDHunter} 
                    />
                </div>
                )}
                <div className="flex-1">
                  <Submissions />
                </div>
              </div>
              </>
            }

            {role === "hunter" && bountyClickedHunter === 1 &&
              <>
                <BountyDetails setBountyClicked={setBountyClickedHunter} selectedID={clickedIDHunter} />
              </>
            }

            {role === "owner" && bountyClickedOwner === 0 &&
            <>
              <OwnerStat userName={userName} />
              <div className="flex flex-row gap-8 mt-6">
                <div className="flex-1">
                  <YourBounties
                    setActivePage={setActivePage}
                    setBountyClicked={setBountyClickedOwner}
                    setclickedID={setclickedIDOwner}  
                  />
                </div>
                <div className="flex-1">
                  <Recentactivity />
                </div>
              </div>
            </>
            }

            {role === "owner" && bountyClickedOwner === 1 &&
              <>
                <BountyDetails setBountyClicked={setBountyClickedOwner} selectedID={clickedIDOwner} />
              </>
            }

            {role === "common" && bountyClickedCommon === 0 &&
            <>
              <CommonStat userName={userName} />
              <div className="flex flex-row gap-8 mt-6">
                <div className="flex-1">
                  <YourBounties 
                    setActivePage={setActivePage}
                    setBountyClicked={setBountyClickedCommon}
                    setclickedID={setclickedIDCommon} 
                    />
                </div>
                <div className="flex-1">
                  <Submissions />
                </div>
              </div>
            </>
            }

            {role === "common" && bountyClickedCommon === 1 &&
              <>
                <BountyDetails setBountyClicked={setBountyClickedCommon} selectedID={clickedIDCommon} />
              </>
            }

            <Quickactions curPage={role} setActivePage={setActivePage} />
          </>
        )
        }

        {activePage === "bounties" && bountyClickedOwner === 0 &&
        (
          <>
          <Browserheader />
          <Searchbar setSelectedDifficulty={setSelectedDifficulty} setSortingOption={setSortingOption} setSearchQuery={setSearchQuery} />
          <ActiveBounties
            setBountyClickedOwner={setBountyClickedOwner}
            setclickedIDOwner={setclickedIDOwner}
            selectedDifficulty={selectedDifficulty} sortingOption={sortingOption} searchQuery={searchQuery} />
          </>
        )
        }

        {activePage === "bounties" && bountyClickedOwner === 1 &&
        (
          <>
          <BountyDetails setBountyClicked={setBountyClickedOwner} selectedID={clickedIDOwner} />
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