import React from 'react'
import pic1 from "../../assets/profile/boy.png";
import pic2 from "../../assets/profile/woman.png";
import pic3 from "../../assets/profile/man.png";
import pic4 from "../../assets/profile/boy2.png";
import pic5 from "../../assets/profile/woman2.png";
import pic6 from "../../assets/profile/man2.png";

const Ranking = () => {
  return (
    <div className=' bg-[#151920] border border-gray-800 rounded-lg p-3 mt-5'>
      <h1 className='text-xl font-semibold'>All Ranking</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-md">

          <thead className="text-gray-400 border-b border-gray-800">
            <tr>
              <th className="py-3">Rank</th>
              <th className="py-3">Hunter</th>
              <th className="py-3">Reputation</th>
              <th className="py-3">Total Earned</th>
              <th className="py-3">Success Rate</th>
            </tr>
          </thead>

          <tbody className="text-white text-lg">
            <tr className="border-b border-gray-800 hover:bg-gray-800/40">
              <td className="py-3 ">#1 🥇</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <img src={pic1} className="w-8 h-8 rounded-full border border-emerald-400" />
                  <span>security_hawk</span>
                </div>
              </td>
              <td className="py-3 text-emerald-400">2450</td>
              <td className="py-3 text-emerald-400">$8,900</td>
              <td className="py-3">
                <div className='inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium'>
                    94%
                </div>
              </td>
            </tr>

            <tr className="border-b border-gray-800 hover:bg-gray-800/40">
              <td className="py-3">#2 🥈</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <img src={pic2} className="w-8 h-8 rounded-full border border-emerald-400" />
                  <span>hunter_pro</span>
                </div>
              </td>
              <td className="py-3 text-emerald-400">2180</td>
              <td className="py-3 text-emerald-400">$7,650</td>
              <td className="py-3">
                <div className='inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium'>
                    91%
                </div>
              </td>
            </tr>

            <tr className="border-b border-gray-800 hover:bg-gray-800/40">
              <td className="py-3">#3 🥉</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <img src={pic3} className="w-8 h-8 rounded-full border border-emerald-400" />
                  <span>bug_finder</span>
                </div>
              </td>
              <td className="py-3 text-emerald-400">1890</td>
              <td className="py-3 text-emerald-400">$6,200</td>
              <td className="py-3">
                <div className='inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-medium'>
                    88%
                </div>
              </td>
            </tr>

            <tr className="border-b border-gray-800 hover:bg-gray-800/40">
              <td className="py-3">#4</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <img src={pic4} className="w-8 h-8 rounded-full border border-emerald-400" />
                  <span>code_ninja</span>
                </div>
              </td>
              <td className="py-3 text-emerald-400">1650</td>
              <td className="py-3 text-emerald-400">$5,400</td>
              <td className="py-3">
                <div className='inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-medium'>
                    85%
                </div>
              </td>
            </tr>

            <tr className="border-b border-gray-800 hover:bg-gray-800/40">
              <td className="py-3">#5</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <img src={pic5} className="w-8 h-8 rounded-full border border-emerald-400" />
                  <span>dev_sleuth</span>
                </div>
              </td>
              <td className="py-3 text-emerald-400">1420</td>
              <td className="py-3 text-emerald-400">$4,800</td>
              <td className="py-3">
                <div className='inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-medium'>
                    83%
                </div>
              </td>
            </tr>

            <tr className="hover:bg-gray-800/40">
              <td className="py-3">#6</td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <img src={pic6} className="w-8 h-8 rounded-full border border-emerald-400" />
                  <span>dedmo_user</span>
                </div>
              </td>
              <td className="py-3 text-emerald-400">850</td>
              <td className="py-3 text-emerald-400">$2,100</td>
              <td className="py-3 ">
                <div className='inline-block px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm font-medium'>
                    78%
                </div>
              </td>
            </tr>

          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Ranking