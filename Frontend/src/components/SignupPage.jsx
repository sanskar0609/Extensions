import React from "react";
import Background from "./Background.jsx";
import Navbar from "./Navbar.jsx";
import axios from "axios";

const API_BASE = "https://extensions-kphf.onrender.com/api/auth"; // Backend URL

const SignupPage = ({
  name,
  email,
  password,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSwitchToLogin,
  setCurrentPage,
}) => {

  // Backend signup & auto-login function
  const handleSignup = async () => {
    try {
      // 1️⃣ Signup request
      const res = await axios.post(`${API_BASE}/signup`, { name, email, password });

      if (res.status === 201) {
        alert(res.data.message); // show success message

        // 2️⃣ Automatically log in the user
        const loginRes = await axios.post(`${API_BASE}/login`, { email, password });
        if (loginRes.status === 200) {
          const data = loginRes.data;
          localStorage.setItem("token", data.token); // save JWT
          alert(`Welcome ${data.user.name}! You are now logged in.`);
          setCurrentPage("main"); // redirect to MainPage
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Background />
      <Navbar setCurrentPage={setCurrentPage} />
      <div className="bg-white/50 backdrop-blur-md border border-white/30 p-10 rounded-3xl shadow-2xl w-96 animate-fadeIn scale-95 hover:scale-100 transition-transform duration-500 z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-bounce">
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={onNameChange}
          className="border border-gray-300 rounded-lg w-full p-3 mb-4 placeholder-gray-500 focus:ring-2 focus:ring-green-300 focus:outline-none transition"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          className="border border-gray-300 rounded-lg w-full p-3 mb-4 placeholder-gray-500 focus:ring-2 focus:ring-green-300 focus:outline-none transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          className="border border-gray-300 rounded-lg w-full p-3 mb-4 placeholder-gray-500 focus:ring-2 focus:ring-green-300 focus:outline-none transition"
        />

        <button
          onClick={handleSignup} // 🔹 backend-connected signup
          className="w-full bg-white/80 text-green-600 font-semibold py-3 rounded-lg shadow-md hover:bg-white hover:text-green-700 transition duration-300"
        >
          Sign Up
        </button>

        <p className="text-center text-sm mt-4 text-gray-700">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-green-500 underline hover:text-green-600"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
