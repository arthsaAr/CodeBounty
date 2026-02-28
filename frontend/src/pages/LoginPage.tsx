import React from "react";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold">
                <span className="text-green-400">&lt;/&gt;</span>{" "}
                <span>Code</span>
                <span className="text-green-400">Bounty</span>
            </h1>
            <h2 className="mt-2 text-gray-400">
                Peer-to-peer bug bounty platform for GitHub repositories
            </h2>
            
            <button className="bg-green-500 hover:bg-green-600 text-black font-normal py-2 px-4 mt-3 rounded "
                onClick={() => {
                    window.location.href = "http://localhost:3000/auth/github"
                }}
            >
                Sign in with GitHub
            </button>
        </div>
    );
}