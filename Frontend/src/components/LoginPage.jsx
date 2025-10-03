import React, { useState } from "react";
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
    // For backend OAuth, redirect
    window.location.href = `${API_BASE}/github`;

    // For frontend-only demo login (session):
    // sessionStorage.setItem("githubLoggedIn", "true");
    // setShowLoginSuccess(true);
    // setTimeout(() => setShowLoginSuccess(false), 2000);
    // setCurrentPage("main");
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.222-.124-.303-.536-1.524.116-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.403c1.018.005 2.042.137 3.003.403 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.119 3.176.77.841 1.235 1.912 1.235 3.222 0 4.61-2.805 5.625-5.475 5.921.43.372.815 1.102.815 2.222v3.293c0 .319.216.694.825.576C20.565 21.796 24 17.303 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
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
