import React, { useEffect, useState } from "react";
import Background from "./Background";
import CardNav from "./ui/CardNav";
import ExtensionCard from "./Extensioncard"; 
import gmail from '../assets/gmail.png';
import leetcode from '../assets/leetcode.png';
import font from '../assets/font1.png';
import Navbar from "./Navbar";

// Example images for extensions
const extensionImages = {
  "Focus Timer": gmail,
  "Figma Helper": leetcode,
  "AI Writer": font,
};

const MainPage = ({ handleDownload, setCurrentPage }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);

      // Decode JWT to get user name
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserName(payload.name || "User"); // ✅ use name from JWT
      } catch {
        setUserName("User");
      }
    }
  }, []);

  const categories = [
    { id: 1, name: "Productivity" },
    { id: 2, name: "Design Tools" },
    { id: 3, name: "AI Assistants" },
  ];

  const extensions = [
    {
      id: 1,
      name: "Focus Timer",
      category: "Productivity",
      description: "Boost your focus sessions.",
      color: "bg-white/30",
    },
    {
      id: 2,
      name: "Figma Helper",
      category: "Design Tools",
      description: "Quick Figma shortcuts.",
      color: "bg-white/30",
    },
    {
      id: 3,
      name: "AI Writer",
      category: "AI Assistants",
      description: "Generate text instantly.",
      color: "bg-white/30",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserName("Guest");
    setCurrentPage("landing");
  };

  return (
    <div className="relative min-h-screen p-6">
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
