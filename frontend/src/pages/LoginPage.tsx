import React from "react";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">
                <span className="text-green-400">&lt;/&gt;</span>{" "}
                <span>Code</span>
                <span className="text-green-400">Bounty</span>
            </h1>
            
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mt-3 rounded "
                onClick={() => {
                    window.location.href = "http://localhost:3000/auth/github"
                }}
            >
                Sign in with GitHub
            </button>
        </div>
    );
}