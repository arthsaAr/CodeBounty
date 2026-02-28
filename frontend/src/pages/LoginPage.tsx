import React from "react";
import { FiGithub  } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoShieldOutline } from "react-icons/io5";
import { FiTarget } from "react-icons/fi";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#0a0e14] text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold">
                <span className="text-green-400">&lt;/&gt;</span>{" "}
                <span>Code</span>
                <span className="text-green-400">Bounty</span>
            </h1>
            <h2 className="mt-2 text-gray-400">
                Peer-to-peer bug bounty platform for GitHub repositories
            </h2>
            
            <div className="bg-[#151920] p-4 rounded-sm w-96 text-center mt-4">
                <h2 className="text-lg font-semibold">Choose Your Role</h2>

                <div className="bg-[#151920] py-5 rounded-lg mt-4 border-gray-700 hover:border-green-600 border-2 flex items-start gap-4">
                    <FiTarget color="green" className="ml-1" size={30}/>
                    <div className="flex flex-col text-left">
                        <h2 className="font-semibold">Bug Hunter</h2>
                        <h3 className="text-xs text-gray-500 font-semibold">Review code and submit bug reports for rewards</h3>
                    </div>
                </div>

                <div className="bg-[#151920] py-5  rounded-lg mt-2 border-gray-700  hover:border-green-600 border-2 flex items-start gap-4">
                    <IoShieldOutline color="green"  className="ml-1" size={30}/>
                    <div className="flex flex-col text-left">
                        <h2 className="font-semibold">Repository Owner</h2>
                        <h3 className="text-xs text-gray-500 font-semibold">Post bounties and get your code reviewed</h3>
                    </div>
                </div>

                <div className="bg-[#151920] py-5 rounded-lg mt-2 border-gray-700  hover:border-green-600 border-2 flex items-start gap-4">
                    <FaArrowTrendUp color="green"  className="ml-1" size={30}/>
                    <div className="flex flex-col text-left">
                        <h2 className="font-semibold">Both</h2>
                        <h3 className="text-xs text-gray-500 font-semibold">Hunt bugs and post bounties on your repositories</h3>
                    </div>
                    
                </div>



                <button className="bg-[#10b981] hover:bg-green-600 text-black font-semibold py-2 mt-3 rounded w-full"
                                onClick={() => {
                                    window.location.href = "http://localhost:3000/auth/github"
                                }}
                            >
                            <FiGithub  className="mb-1 inline" />    Sign in with GitHub
                </button>
                <h3 className="text-xs mt-2 text-gray-400">By signing in, you agree to our Terms of Service</h3>
            </div>

            
        </div>
    );
}