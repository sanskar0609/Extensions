import React, { useState, useEffect } from "react";
import Background from "./Background.jsx";
import Navbar from "./Navbar.jsx";
import axios from "axios";

const API_BASE = "https://extensions-kphf.onrender.com/api/auth";

const LoginPage = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSwitchToSignup,
  setCurrentPage,
}) => {
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);

  // ✅ Function to store GitHub token from URL
  const storeGithubToken = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      setCurrentPage("main"); // redirect to main page
    }
  };

  useEffect(() => {
    storeGithubToken(); // check for GitHub token on page load
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE}/login`, { email, password });
      if (res.status === 200) {
        const data = res.data;
        localStorage.setItem("token", data.token);
        alert(`Login successful! Welcome ${data.user.name}`);
        setCurrentPage("main");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleGithubLogin = () => {
    // Redirect to backend GitHub OAuth
    window.location.href = `${API_BASE}/github`;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {showLoginSuccess && (
        <div className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          GitHub login successful 🎉
        </div>
      )}

      <Background />
      <Navbar setCurrentPage={setCurrentPage} />

      <div className="bg-white/50 backdrop-blur-md border border-white/30 p-10 rounded-3xl shadow-2xl w-96 animate-fadeIn scale-95 hover:scale-100 transition-transform duration-500 z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-bounce">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          className="border border-gray-300 rounded-lg w-full p-3 mb-4 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          className="border border-gray-300 rounded-lg w-full p-3 mb-4 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-white/80 text-blue-600 font-semibold py-3 rounded-lg shadow-md hover:bg-white hover:text-blue-700 transition duration-300 mb-3"
        >
          Login
        </button>

        <button
          onClick={handleGithubLogin}
          className="w-full bg-gray-800 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-gray-900 transition duration-300 mb-4 flex items-center justify-center gap-2"
        >
          {/* GitHub icon */}
          Login with GitHub
        </button>

        <p className="text-center text-sm mt-4 text-gray-700">
          Don’t have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            className="text-blue-500 underline hover:text-blue-600"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
