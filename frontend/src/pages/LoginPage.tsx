import React from "react";
import { FiGithub  } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoShieldOutline } from "react-icons/io5";
import { FiTarget } from "react-icons/fi";
import {useState} from "react";

export default function LoginPage() {
    const [selectedRole, setSelectedRole] = useState<string | null>(null);


    return (
        <div className="min-h-screen bg-[#0a0e14] text-white flex flex-col items-center justify-center p-6">
            <div className="text-center mb-8">
                <h1 className="text-5xl font-semibold tracking-tight">
                    <span className="text-emerald-500">&lt;/&gt;</span>{" "}
                    <span>Code</span>
                    <span className="text-emerald-500">Bounty</span>
                </h1>
                <h2 className="mt-2 text-gray-400 text-md">
                    Peer-to-peer bug bounty platform for GitHub repositories
                </h2>
            </div>


            <div className="bg-[#151920] p-8 rounded-lg w-full max-w-[420px] border border-gray-800 shadow-2xl">
                <h2 className="text-xl font-semibold mb-2 text-center">Choose Your Role</h2>

                <div
                    onClick={() => setSelectedRole("hunter")}
                    className={`bg-[#151920] p-4 rounded-lg mt-4 border-2 flex items-start gap-4
                        ${ 
                            selectedRole === "hunter"
                            ? "border-emerald-500 bg-emerald-500/5"
                            : "border-gray-800 hover:border-green-600"
                        }
                        `}>
                    <FiTarget color="green" size={30}/>
                    <div className="flex flex-col text-left">
                        <h2 className="font-semibold">Bug Hunter</h2>
                        <h3 className="text-xs text-gray-500 font-semibold">Review code and submit bug reports for rewards</h3>
                    </div>
                </div>

                <div
                    onClick={() => setSelectedRole("owner")} 
                    className={`bg-[#151920] p-4  rounded-lg mt-2 border-2 flex items-start gap-4
                        ${
                            selectedRole === "owner"
                            ? "border-emerald-500 bg-emerald-500/5" 
                            : "border-gray-800 hover:border-green-600"
                        }
                        `}>
                    <IoShieldOutline color="green" size={30}/>
                    <div className="flex flex-col text-left">
                        <h2 className="font-semibold">Repository Owner</h2>
                        <h3 className="text-xs text-gray-500 font-semibold">Post bounties and get your code reviewed</h3>
                    </div>
                </div>

                <div
                    onClick={() => setSelectedRole("both")} 
                    className={`bg-[#151920] p-4 rounded-lg mt-2 border-2 flex items-start gap-4
                        ${
                            selectedRole === "both"
                            ? "border-emerald-500 bg-emerald-500/5"
                            : "border-gray-800 hover:border-green-600"
                        }
                        `}>
                    <FaArrowTrendUp color="green" size={30}/>
                    <div className="flex flex-col text-left">
                        <h2 className="font-semibold">Both</h2>
                        <h3 className="text-xs text-gray-500 font-semibold">Hunt bugs & post bounties on your repositories</h3>
                    </div>
                    
                </div>



                <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 mt-3 rounded w-full"
                                onClick={() => {
                                    window.location.href = "http://localhost:3000/auth/github"
                                }}
                            >
                            <FiGithub  className="mb-1 inline" />    Sign in with GitHub
                </button>
                <h3 className="text-xs mt-2 text-gray-500 text-center">By signing in, you agree to our
                    <span className="underline text-gray-500 hover:text-emerald-400 ml-1">Terms of Service</span>
                </h3>
            </div>

            
        </div>
    );
}