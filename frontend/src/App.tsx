import LoginPage from "./pages/LoginPage";
import OAuthSuccess from "./pages/OAuthSuccess";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HunterDashboard from "./pages/HunterDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import CommonDashboard from "./pages/CommonDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/dashboard-hunter" element={<HunterDashboard />} />
        <Route path="/dashboard-owner" element={<OwnerDashboard />} />
        <Route path="/dashboard-common" element={<CommonDashboard />} />
      </Routes>
    </Router>
    
    // <div className="min-h-screen bg-black text-white flex items-center justify-center">
    //   <h1 className="text-4xl font-bold">
    //     <span className="text-green-400">&lt;/&gt;</span>{" "}
    //     <span>Code</span>
    //     <span className="text-green-400">Bounty</span>
    //   </h1>
    // </div>
  );
}

export default App;