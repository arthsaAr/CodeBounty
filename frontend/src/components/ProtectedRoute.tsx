import React from 'react'
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }: Props) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    //if not logged in block access
    if(!token){
        return <Navigate to="/login" />;
    }

    //wrong role
    if(role !== allowedRole){
        return <Navigate to="/login" />;
    }
  
    return <>{children}</>;
}
