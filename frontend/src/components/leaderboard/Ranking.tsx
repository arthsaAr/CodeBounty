import React from 'react'
import pic1 from "../../assets/profile/boy.png";
import pic2 from "../../assets/profile/woman.png";
import pic3 from "../../assets/profile/man.png";

const Ranking = () => {
  return (
    <div className=' bg-[#151920] border border-gray-800 rounded-lg p-3 mt-3'>
      <h1 className='text-xl font-semibold'>All Ranking</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-md">

          <thead className="text-gray-400 text-center border-b border-gray-800">
            <tr>
              <th className="py-3">Rank</th>
              <th className="py-3">Hunter</th>
              <th className="py-3">Reputation</th>
              <th className="py-3">Total Earned</th>
              <th className="py-3">Success Rate</th>
            </tr>
          </thead>

          <tbody className="text-white text-lg text-center">
            <tr className="border-b border-gray-800 hover:bg-gray-800/40">
              <td className="py-3 ">🥇 #1</td>
              <td className="py-3 flex flex-row items-center gap-2">
                <img src={pic1} className="w-8 h-8 rounded-full border border-emerald-400" />
                security_hawk
              </td>
              <td className="py-3 text-emerald-400">2450</td>
              <td className="py-3">$8,900</td>
              <td className="py-3">94%</td>
            </tr>

            <tr className="border-b border-gray-800 hover:bg-gray-800/40">
              <td className="py-3">🥈 #2</td>
              <td className="py-3">hunter_pro</td>
              <td className="py-3 text-emerald-400">2180</td>
              <td className="py-3">$7,650</td>
              <td className="py-3">91%</td>
            </tr>

            <tr className="border-b border-gray-800 hover:bg-gray-800/40">
              <td className="py-3">🥉 #3</td>
              <td className="py-3">bug_finder</td>
              <td className="py-3 text-emerald-400">1890</td>
              <td className="py-3">$6,200</td>
              <td className="py-3">88%</td>
            </tr>

            <tr className="border-b border-gray-800 hover:bg-gray-800/40">
              <td className="py-3">#4</td>
              <td className="py-3">code_ninja</td>
              <td className="py-3 text-emerald-400">1650</td>
              <td className="py-3">$5,400</td>
              <td className="py-3">85%</td>
            </tr>

            <tr className="border-b border-gray-800 hover:bg-gray-800/40">
              <td className="py-3">#5</td>
              <td className="py-3">dev_sleuth</td>
              <td className="py-3 text-emerald-400">1420</td>
              <td className="py-3">$4,800</td>
              <td className="py-3">82%</td>
            </tr>

            <tr className="hover:bg-gray-800/40">
              <td className="py-3">#6</td>
              <td className="py-3">demo_user</td>
              <td className="py-3 text-emerald-400">850</td>
              <td className="py-3">$2,100</td>
              <td className="py-3">78%</td>
            </tr>

          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Ranking