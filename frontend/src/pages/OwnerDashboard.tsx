//starting dashboard implementation!
import { useEffect, useState } from "react";
import axios from "axios";

export default function OwnerDashboard() {
    
  const [bounties, setBounties] = useState([]);

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
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Owner Dashboard</h1>

      <button className="bg-green-500 px-4 py-2 rounded mb-6">
        Create Bounty
      </button>

      <div>
        {bounties.map((b: any) => (
          <div key={b.id} className="border p-4 mb-2 rounded">
            <p>{b.title}</p>
            <p>${b.amount}</p>
            <p>{b.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}