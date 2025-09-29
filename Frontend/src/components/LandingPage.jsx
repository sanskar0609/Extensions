import React, { useState } from "react";
import { ChevronRight, Menu, X, Zap, Shield, Code } from "lucide-react";
import Silk from "./ui/Silk"; // Make sure the path is correct
import TextType from "./ui/TextType";
import logo from "../assets/logo.png";
const LandingPage = ({ setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Silk Background */}
      <div className="absolute inset-0 -z-10">
        <Silk
          speed={5}
          scale={1}
          color="#16696fff"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <nav className="bg-white/20 backdrop-blur-md fixed w-full z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <img
                    src={logo} // import logo from your assets
                    alt="ExtensionHub Logo"
                    className="w-40 h-15 object-cover"
                  />
                </span>
              </div>

              <div className="hidden md:flex space-x-4">
                <button
                  onClick={() => setCurrentPage("login")}
                  className="px-6 py-2 text-white-700 hover:text-white-600 font-medium bg-transparent"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentPage("signup")}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium"
                >
                  Sign Up
                </button>
              </div>

              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-4">
            <button
              onClick={() => {
                setCurrentPage("login");
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-white-700 hover:bg-gray-100 mb-2"
            >
              Login
            </button>
            <button
              onClick={() => {
                setCurrentPage("signup");
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
            >
              Sign Up
            </button>
          </div>
        )}

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            <TextType
              text={[
                "Supercharge Your Web Projects!",
                "Extensions That Make Coding Fun!",
                "Build Smarter Websites!",
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Discover powerful extensions to enhance your browsing experience.
          </p>
          <button
            onClick={() => setCurrentPage("main")}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-lg font-semibold hover:shadow-2xl transform hover:scale-105"
          >
            Get Started Free <ChevronRight className="inline ml-2" />
          </button>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto mt-24 grid md:grid-cols-3 gap-8 px-4">
          {[
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Lightning Fast",
              desc: "Optimized for speed",
              color: "from-yellow-400 to-orange-500",
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Secure & Private",
              desc: "Your data stays safe",
              color: "from-green-400 to-emerald-500",
            },
            {
              icon: <Code className="w-8 h-8" />,
              title: "Easy Integration",
              desc: "One-click install",
              color: "from-blue-400 to-purple-500",
            },
          ].map((f, i) => (
            <div key={i} className="bg-white/30 p-8 rounded-2xl shadow-lg">
              <div
                className={`w-16 h-16 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center text-white mb-4 mx-auto`}
              >
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{f.title}</h3>
              <p className="text-white">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
