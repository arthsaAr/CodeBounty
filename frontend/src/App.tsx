import LoginPage from "./pages/LoginPage";
import OAuthSuccess from "./pages/OAuthSuccess";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HunterDashboard from "./pages/HunterDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import CommonDashboard from "./pages/CommonDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/dashboard-hunter" element={
            <ProtectedRoute allowedRole = "hunter">
              <HunterDashboard />
            </ProtectedRoute>
          } />
        <Route path="/dashboard-owner" element={
            <ProtectedRoute allowedRole = "owner">
              <OwnerDashboard />
            </ProtectedRoute>
          } />
        <Route path="/dashboard-common" element={
          <ProtectedRoute allowedRole = "both">
            <CommonDashboard />
          </ProtectedRoute>
          } />
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