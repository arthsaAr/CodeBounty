import React, { useEffect } from 'react'
import { useState } from "react";
import RepositorySelector from "../createBounty/subComponent/RepositorySelector";
import Repository from './subComponent/Repository';
import BountyForm from './subComponent/Bountyform';
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { RiAddFill } from "react-icons/ri";

const SetupBounty = () => {
    const [step, setStep] = useState(1);
    const [selectedRepoId, setSelectedRepoId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        amount: "",
        difficulty: "easy",
        filePath: "",
    });

    const activateRepo = async (repoId: number) => {
        try {
            const token = localStorage.getItem("token");

            // if (!selectedRepoId) {
            //     alert("Select a repository first");
            //     return;
            // }

            await axios.patch(`http://localhost:3000/repositories/${repoId}/activate`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Repository Activated successfully!");

        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to activate Repository");
        }
    };

    const createBounty = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!selectedRepoId) {
                alert("Select a repository first");
                return;
            }

            const title = formData.title.trim();
            const description = formData.description.trim();
            const filePath = formData.filePath.trim();
            const difficulty = formData.difficulty.trim();
            const amountValue = Number(formData.amount);

            if (!title || !description || !difficulty || !filePath) {
                alert("Please fill in all bounty fields before submitting.");
                return;
            }

            if (formData.amount === "" || Number.isNaN(amountValue) || amountValue <= 0) {
                alert("Please enter a valid bounty amount greater than 0.");
                return;
            }

            const res = await axios.post(
                "http://localhost:3000/bounties",
                {
                    repositoryId: selectedRepoId,
                    title,
                    description,
                    amount: amountValue,
                    difficulty,
                    filePath,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Bounty created successfully!");

            // optional reset
            setStep(1);
            setFormData({
                title: "",
                description: "",
                amount: "",
                difficulty: "easy",
                filePath: "",
            });

        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to create bounty");
        }
    };

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false); //(mainly for blocking button, and showing loading when a call is being made)
    const [error, setError] = useState<string | null>(null);  //(proper error handling)

    //for fetching, getting the github/login/token and selecting all the repos for specific token user
    //returning all the repo data.
    const fetchRepos = async () => {
        try {
            setError(null);
            const token = localStorage.getItem("token");

            const res = await axios.get("http://localhost:3000/repositories", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setRepos(res.data);
        } catch(err: any) {
            const errorMsg = err.response?.data?.message || "Failed to fetch repositories";
            setError(errorMsg);
            console.error("Fetch repos error:", err);
        }
    }

    //this is triggered when the import button is clicked (from RepositorySelector component)
    //for now it is passed into the component and it's trigger is handled there
    const importRepos = async() => {
        try {
            setError(null);
            setLoading(true);
            const token = localStorage.getItem("token");
            
            //calling import from backend
            await axios.get("http://localhost:3000/repositories/import", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            //reff.
            await fetchRepos();   //refreshing after import
        } catch(err: any) {
            const errorMsg = err.response?.data?.message || "Failed to import repositories";
            setError(errorMsg);
            console.error("Import repos error:", err);
        } finally {
            setLoading(false);
        }
    }

    //runs once when loading a page
    useEffect(() => {
        fetchRepos();
    }, []);

  return (
    //mx-auto makes it center horizontally
    //max-w-1xl limits width - so it doesn’t stretch full screen
    <div className="max-w-5xl mx-auto">     
        <div className='flex flex-row text-center gap-5 justify-center px-33 mb-4'>
            <div className='flex items-center gap-2'>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-black text-xl
                    ${step === 1 ? "bg-emerald-400 text-black" : "bg-gray-700 text-gray-400"}
                    `}>
                1
                </div>
                <h1 className={`text-lg 
                    ${step === 1 ? "text-emerald-400" : "text-gray-400"}
                    `}
                    onClick={() => setStep(2)} >
                    Select Repository
                </h1>
            </div>

            <hr className="flex-1 h-px bg-gray-600 border-0 self-center" />

            <div className='flex items-center gap-2'>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-black text-xl
                    ${step === 2 ? "bg-emerald-400 text-black" : "bg-gray-700 text-gray-400"}
                    `}>
                2
                </div>
                <h1 className={`text-lg 
                    ${step === 2 ? "text-emerald-400" : "text-gray-400"}
                    `}>
                    Bounty Details
                </h1>
            </div>
        </div>

        {step === 1 && (
            <>
            <div className='rounded-xl bg-[#151920] border border-gray-800 p-6'>
                <RepositorySelector onImport={importRepos} isLoading={loading} />

                {error && (
                    <div className='bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded mb-4'>
                        <p>{error}</p>
                    </div>
                )}

                {repos.length === 0 && !loading && !error && (
                    <div className='text-center py-8 text-gray-400'>
                        <p className='text-lg'>Click "Import from GitHub" to get started!</p>
                    </div>
                )}

                {repos.map((repo: any) => (
                    <Repository
                        onClick={activateRepo(repo.id)} 
                        key={repo.id}
                        title={repo.name}
                        description="Imported from GitHub"
                        language="Unknown"
                        stars="N/A"
                        onSelect={() => {
                            setSelectedRepoId(repo.id);
                            setStep(2);
                        }}
                    />
                ))}
            </div>
            </>
        )}

        {step === 2 && (
            <>
            <div className='rounded-xl bg-[#151920] border border-gray-800 p-6'>
                <div
                    onClick={() => setStep(1)} 
                    className='inline-flex flex-row hover:bg-[#1d2532] items-center gap-1 border border-[#151920] px-3 py-2 justify-start rounded-lg mb-2'>
                    <MdKeyboardBackspace size={20} />
                    <h1 className='text-lg'>Back to repositories</h1>
                </div>

                {/* <div
                    onClick={activateRepo} 
                    className='w-1/4 mt-3 flex p-3 flex-row rounded-lg justify-center items-center hover:bg-gray-600 border border-emerald-500'>
                    <h1 className="text-xl font-semibold text-emerald-500 text-center ">Activate Repository</h1>
                </div> */}

                <h1 className=' mt-2 text-xl font-semibold font-sans'>Bounty Details</h1>

                <BountyForm formData={formData} setFormData={setFormData} />
                
                <div className='flex flex-row gap-3 mt-3'>
                    <div
                        onClick={createBounty} 
                        className='w-3/4 mt-3 flex p-3 flex-row rounded-lg bg-emerald-500 justify-center items-center hover:bg-emerald-600 transition-all'>
                        <RiAddFill color="black" size={20}/>
                        <h1 className="text-xl font-semibold text-black text-center ">Create Bounty</h1>
                    </div>
                    <div className='w-1/4 mt-3 flex p-3 flex-row rounded-lg justify-center items-center hover:bg-gray-600 border border-emerald-500'>
                        <h1 className="text-xl font-semibold text-emerald-500 text-center ">Cancel</h1>
                    </div>
                </div>
            </div>
            </>
        )}
    </div>
  )
}

export default SetupBounty