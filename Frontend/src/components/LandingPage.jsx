import React, { useState } from "react";
import { ChevronRight, Menu, X, Zap, Shield, Code } from "lucide-react";
import Silk from "./ui/Silk"; // Make sure the path is correct
import TextType from "./ui/TextType.jsx";
import logo from "../assets/logo.png";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

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
        <Navbar setCurrentPage={setCurrentPage} />

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

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default LandingPage;
