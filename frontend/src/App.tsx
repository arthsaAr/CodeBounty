import LoginPage from "./pages/LoginPage";
import OAuthSuccess from "./pages/OAuthSuccess";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/dashboard-hunter" element={
            <ProtectedRoute allowedRole = "hunter">
              <Dashboard role="hunter" />
            </ProtectedRoute>
          } />
        <Route path="/dashboard-owner" element={
            <ProtectedRoute allowedRole = "owner">
              <Dashboard role="owner" />
            </ProtectedRoute>
          } />
        <Route path="/dashboard-common" element={
          <ProtectedRoute allowedRole = "both">
            <Dashboard role="common" />
          </ProtectedRoute>
          } />
      </Routes>
    </Router>
  );
}

export default App;