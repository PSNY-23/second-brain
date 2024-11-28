import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home"; // Dashboard page
import AuthForm from "./pages/AuthForm"; // Login and SignUp page

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if the user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth route that handles both Sign In and Sign Up */}
        <Route path="/auth" element={<AuthForm />} />

        {/* Dashboard route - should redirect to sign-in if not authenticated */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Home /> : <Navigate to="/auth" />}
        />
         
        {/* Catch-all route - if the user is not authenticated, send them to /auth */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
