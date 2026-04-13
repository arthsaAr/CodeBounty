//when login is successful redirecting to this page for storing the token in local storage
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // For now just send to owner dashboard

      //only to owner dashboard(for hunter)
      if(role === "hunter"){
        navigate("/dashboard-hunter");
      }else if(role === "owner"){
        navigate("/dashboard-owner");
      }
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p>Logging you in...!</p>
    </div>
  );
}