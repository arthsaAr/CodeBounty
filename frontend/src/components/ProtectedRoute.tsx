import React, { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import axios from "axios";

interface Props {
    children: React.ReactNode;
    allowedRole: string;
}

export default function ProtectedRoute({ children, allowedRole }: Props) {

    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("role");

            let valid = false;

            //when no token, then blocking directly
            if(!token){
                // setLoading(false);
                // return;
            } else if(role !== allowedRole){
                // setLoading(false);
                // return;
            } else {
                try{
                    await axios.get("http://localhost:3000/protected", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    valid = true;
                } catch(error){
                    //when invalid removing token and role data
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    valid = false;
                }
            }

            setIsValid(valid);

            setIsValid(valid);

            setTimeout(() => {
                setLoading(false);
            }, 800);
        };

        checkAuth();
    }, [allowedRole]);

    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0f131a] text-white">
                <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>

                    <div className="text-gray-400 text-lg animate-pulse">
                        Checking access...
                    </div>
                </div>
            </div>
        );
    }

    //blocking
    //if not logged in block access
    if(isValid === false){
        return <Navigate to="/login" />;
    }

    if(isValid === true){
        return <>{children}</>;
    }

    return null;

}
