import React from "react";
import { SiGithub } from "react-icons/si";

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
            
            <div className="bg-[#151920] p-4 rounded-sm w-96 text-center">
                <h2 className="text-lg font-semibold">Choose Your Role</h2>

                <div className="bg-[#151920] py-8 rounded-lg mt-4 border-gray-700 hover:border-green-600 border-2">

                </div>

                <div className="bg-[#151920] py-8 rounded-lg mt-2 border-gray-700  hover:border-green-600 border-2">

                </div>

                <div className="bg-[#151920] py-8 rounded-lg mt-2 border-gray-700  hover:border-green-600 border-2">

                </div>



                <button className="bg-[#10b981] hover:bg-green-600 text-black font-semibold py-2 px-4 mt-3 rounded "
                                onClick={() => {
                                    window.location.href = "http://localhost:3000/auth/github"
                                }}
                            >
                            <SiGithub className="mb-1 inline" />    Sign in with GitHub
                </button>
            </div>

            
        </div>
    );
}