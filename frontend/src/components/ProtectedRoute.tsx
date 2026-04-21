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

            //when no token, then blocking directly
            if(!token){
                setLoading(false);
                return;
            }

            if(role !== allowedRole){
                setLoading(false);
                return;
            }

            try{
                await axios.get("http://localhost:3000/protected", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setIsValid(true);
            } catch(error){
                //when invalid removing token and role data
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                setIsValid(false);
            }

            setLoading(false);
        };

        checkAuth();
    }, [allowedRole]);

    if(loading){
        return (
            <p>Checking access...</p>
        );
    }

    //blocking
    //if not logged in block access
    if(!isValid){
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}
