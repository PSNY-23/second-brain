import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false); // state to toggle between SignUp and SignIn
  const navigate = useNavigate();

  // Handle the form submission based on whether it's SignUp or SignIn
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = isSignUp ? "http://localhost:5000/signup" : "http://localhost:5000/signin"; // Change API endpoint based on the mode
    try {
      const response = await axios.post(endpoint, {
        email,
        password,
      });

      // On success, store the JWT token in localStorage
      localStorage.setItem("token", response.data.token);
      setLoading(false);

      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      setError(isSignUp ? "Sign-up failed. Please try again." : "Invalid credentials. Please try again.");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl mb-4">{isSignUp ? "Sign Up" : "Sign In"}</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? (isSignUp ? "Signing Up..." : "Signing In...") : (isSignUp ? "Sign Up" : "Sign In")}
        </button>
        
        {/* Toggle between Sign Up and Sign In */}
        <div className="mt-4 text-center">
          <span>{isSignUp ? "Already have an account?" : "Don't have an account?"}</span>
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 ml-2"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
