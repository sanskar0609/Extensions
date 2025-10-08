import React, { useEffect, useState } from "react";
import Background from "./Background.jsx";
import ExtensionCard from "./ui/ExtensionCard.jsx";
import gmail from "../assets/gmail.png";
import leetcode from "../assets/leetcode.png";
import font from "../assets/font1.png";
import Navbar from "./Navbar";

// Example images for extensions
const extensionImages = {
  Gmail: gmail,
  Leetcode: leetcode,
  "Font Detector & Styler": font,
};

const MainPage = ({ handleDownload, setCurrentPage }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);

  // Check login state (localStorage for normal login, sessionStorage for GitHub login)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserName(payload.name || "User");
      } catch {
        setUserName("User");
      }
    } else if (sessionStorage.getItem("githubLoggedIn")) {
      setIsAuthenticated(true);
      setUserName("GitHub User");
    } else {
      setIsAuthenticated(false);
      setUserName("Guest");
    }
  }, []);

  const categories = [
    { id: 1, name: "Productivity" },
    { id: 2, name: "AI tools" },
    { id: 3, name: "AI Assistants" },
  ];

  const extensions = [
    {
      id: 1,
      name: "Gmail",
      category: "Productivity",
      description:
        "Supercharge your Gmail experience with AI — summarize long emails instantly, generate smart AI replies, and use speech-to-text to draft messages hands-free",
      color: "bg-white/30",
      downloadUrl:
        "https://drive.google.com/drive/folders/1ayivPExIMJaVofcbq2ZKhYT2vISaAagW?usp=drive_link",
    },
    {
      id: 2,
      name: "Leetcode",
      category: "AI tools",
      description:
        "Crack LeetCode faster with AI — get detailed question explanations, smart hints, and step-by-step solutions instantly.",
      color: "bg-white/30",
      downloadUrl: "https://github.com/sanskar0609/leetcode-extension",
    },
    {
      id: 3,
      name: "Font Detector & Styler",
      category: "AI Assistants",
      description: "Instantly detect and style fonts on any webpage with customizable options.",
      color: "bg-white/30",
      downloadUrl:"https://github.com/sanskar0609/Font_detector-Extension-",
    },
  ];

  // GitHub login (frontend-only, session)
  const handleGitHubLogin = () => {
    sessionStorage.setItem("githubLoggedIn", "true");
    setIsAuthenticated(true);
    setUserName("GitHub User");
  
  // Show popup
  setShowLoginSuccess(true);
  setTimeout(() => setShowLoginSuccess(false), 2000); // hide after 2s
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("githubLoggedIn");
    setIsAuthenticated(false);
    setUserName("Guest");
    setCurrentPage("landing");
  };

  return (
    <div className="relative min-h-screen p-6">
       {showLoginSuccess && (
      <div className="fixed top-10 right-10 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
        GitHub login successful 🎉
      </div>
    )}

      <Background />
      <Navbar setCurrentPage={setCurrentPage} />

      <main className="relative z-10 mt-20">
        <header className="flex justify-between items-center mb-8 text-white">
          <h1 className="text-3xl font-bold text-center mt--10">
            Welcome, {userName} 👋
          </h1>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </header>

        {/* Categories */}
        <section className="mb-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-white text-center">
            Categories
          </h2>
          <div className="flex gap-3 flex-wrap justify-center">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="bg-blue-700/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-700/30"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </section>

        {/* Extensions */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Extensions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {extensions.map((ext) => (
              <ExtensionCard
                key={ext.id}
                extension={ext}
                image={extensionImages[ext.name]}
                isAuthenticated={isAuthenticated}
                handleDownload={handleDownload}
                redirectToLogin={() => setCurrentPage("login")}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
