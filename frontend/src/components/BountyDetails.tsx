import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";

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
          <h1 className="text-3xl font-semibold mb-2 mt-3">{bounty?.title}</h1>
          <h3 className="text-lg mb-6 text-gray-400">{bounty?.description}</h3>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg mb-6 text-gray-400">{bounty?.amount}</h3>
            <h3 className="text-lg mb-6 text-gray-400">credits</h3>
          </div>
        </div>

        <div className="flex flex-row px-8 md:px-16 py-6 mt-20">
          <h1 className="text-lg font-semibold mb-2 mt-3">{bounty?.difficulty}</h1>
          <h3 className="text-lg mb-6 text-gray-400">{bounty?.status}</h3>
          <h3 className="text-lg mb-6 text-gray-400">{bounty?.createdAt}</h3>
        </div>
    </div>
  )
}

export default BountyDetails