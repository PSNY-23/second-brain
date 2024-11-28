import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import noiseSvg from "../assets/svg/noise.svg";

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

    const endpoint = isSignUp
      ? "http://localhost:5000/api/signup"
      : "http://localhost:5000/api/signin"; // Change API endpoint based on the mode

    try {
      const response = await axios.post(endpoint, {
        email,
        password,
      });

      // On success, store the JWT token in localStorage
      localStorage.setItem("token", response.data.token);
      setLoading(false);

      // Optionally, add the token to the Authorization header for future requests
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      // Redirect to dashboard after successful login/signup
      navigate("/dashboard");
    } catch (error) {
      setError(
        isSignUp
          ? "Sign-up failed. Please try again."
          : "Invalid credentials. Please try again."
      );
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      {/* <div className="absolute top-32 left-1/3 w-48 h-48 rounded-full bg-gradient-to-br from-yellow-500 to-red-400"></div> */}
      <div
        className="absolute top-32 left-1/3 w-48 h-48 rounded-full"
        style={{
          background: `linear-gradient(to bottom right, yellow, red), url(${noiseSvg})`,

          backgroundSize: "cover",
          backgroundBlendMode: "multiply", // Ensures the gradient and noise blend better
          filter: "contrast(200%) brightness(150%)", // Makes the noise more visible
        }}
      ></div>

      <div
        className="absolute bottom-24 right-1/3 w-48 h-48 rounded-full"
        style={{
          background: `linear-gradient(to bottom right, #63b3ed, #2b6cb0), url(${noiseSvg})`,
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          filter: "contrast(200%) brightness(150%)",
        }}
      ></div>

      <form
        onSubmit={handleSubmit}
        className="bg-transparent backdrop-blur-md text-gray-100 border p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl mb-4">{isSignUp ? "Sign Up" : "Sign In"}</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm  text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full peer px-3 py-2 border rounded-md outline-none appearance-none bg-transparent"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md outline-none appearance-none bg-transparent"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-transparent backdrop-blur-md border hover:border-none hover:bg-blue-700 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading
            ? isSignUp
              ? "Signing Up..."
              : "Signing In..."
            : isSignUp
            ? "Sign Up"
            : "Sign In"}
        </button>

        {/* Toggle between Sign Up and Sign In */}
        <div className="mt-4 text-center">
          <span>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500  ml-2"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
