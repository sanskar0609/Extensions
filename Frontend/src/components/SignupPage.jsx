import React, { useState } from "react";
import Background from "./Background.jsx";
import Navbar from "./Navbar.jsx";
import axios from "axios";

const API_BASE = "http://localhost:5000";

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
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!name || !email || !password) {
      alert("Please fill all details first");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/auth/send-otp`, { email });
      if (res.status === 200) {
        alert("OTP sent to your email!");
        setStep(2);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
    setLoading(false);
  };

  // Backend signup & auto-login function
  const handleSignup = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }
    setLoading(true);
    try {
      // 1️⃣ Signup request with OTP
      const res = await axios.post(`${API_BASE}/api/auth/signup`, { name, email, password, otp });

      if (res.status === 201) {
        alert(res.data.message); // show success message

        // 2️⃣ Automatically log in the user
        const loginRes = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
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
    setLoading(false);
  };

  // 🔹 GitHub OAuth signup/login
  const handleGithubLogin = () => {
    window.location.href = `${API_BASE}/api/auth/github`;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Background />
      <Navbar setCurrentPage={setCurrentPage} />
      <div className="bg-white/50 backdrop-blur-md border border-white/30 p-10 rounded-3xl shadow-2xl w-[90%] max-w-sm animate-fadeIn scale-95 hover:scale-100 transition-transform duration-500 z-10 mx-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 animate-bounce">
          Sign Up
        </h2>

        {step === 1 ? (
          <>
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
              onClick={handleSendOtp}
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-white/80'} text-green-600 font-semibold py-3 rounded-lg shadow-md hover:bg-white hover:text-green-700 transition duration-300 mb-3`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            {/* 🔹 GitHub Signup/Login Button */}
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
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Sign Up with GitHub
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-700 text-center mb-4">
              Enter the OTP sent to <b>{email}</b>
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-3 mb-4 placeholder-gray-500 focus:ring-2 focus:ring-green-300 focus:outline-none transition"
            />
            <button
              onClick={handleSignup} // 🔹 backend-connected signup
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-green-600'} text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300 mb-3`}
            >
              {loading ? "Verifying..." : "Verify & Sign Up"}
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full text-gray-500 hover:text-gray-700 transition duration-300 mt-2 text-sm"
            >
              Back
            </button>
          </>
        )}

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
