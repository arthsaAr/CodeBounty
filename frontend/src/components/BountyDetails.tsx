import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CiCalendar } from "react-icons/ci";
import Bottombar from "../components/Bottombar";

const BountyDetails = () => {
  const { id } = useParams();

  const [bounty, setBounty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBountyDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://localhost:3000/bounties/${id}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        setBounty(res.data);
      } catch (error) {
        console.error("Error fetching bounty details:", error);
      } finally{
        setLoading(false);
      }
    };

    fetchBountyDetails();
  }, [id]);

  //same loading animation as when fetching repos.
  if(loading){
      return (
          <div className="flex items-center justify-center min-h-screen bg-[#0f131a] text-white">
              <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>

                  <div className="text-gray-400 text-lg animate-pulse">
                      Loading Data...
                  </div>
              </div>
          </div>
      );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
        <Navbar setActivePage={null} activePage={"owner"} loginStatus={"owner"} />

        <div className="flex-grow px-8 md:px-16 py-6 mt-20">
        <div className="flex flex-col md:flex-row justify-between px-8 md:px-16 py-6 mt-20 gap-8">
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-2">

            <div className="flex flex-col items-center md:items-start gap-2">
              <h1 className="text-4xl font-semibold">{bounty?.title}</h1>
              <h3 className="text-lg  text-gray-400">{bounty?.description}</h3>

              <div className="flex flex-col md:flex-row gap-2 md:items-center">
                <span className="text-lg font-semibold py-1 px-3 rounded-full
                  bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {bounty?.difficulty}
                </span>
                <span className="text-lg font-semibold py-1 px-3 rounded-full
                  bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {bounty?.status}
                </span>

                <div className="flex flex-row items-center gap-1">
                  <CiCalendar size={24}/>
                  <h3 className="text-lg text-gray-400">{new Date(bounty?.createdAt).toLocaleDateString()}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-1">
            <h3 className="text-4xl  text-emerald-400">{bounty?.amount}</h3>
            <h3 className="text-xl  text-gray-400">credits</h3>
          </div>
        </div>
      </div>
        
      <Bottombar />
    </div>
  )
}

export default BountyDetails