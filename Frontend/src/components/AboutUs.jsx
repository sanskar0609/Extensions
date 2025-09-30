import React from "react";
import { Users, Target, Zap, Award } from "lucide-react";
import Background from "./Background.jsx";
import Navbar from "./Navbar.jsx";

export default function AboutUs({ setCurrentPage }) {
  const themePrimary = "hsl(184, 70%, 21%)"; // Deep Teal
  const themeAccent = "skyblue"; // Accent color

  const values = [
    {
      icon: <Target className="w-8 h-8" style={{ color: themeAccent }} />,
      title: "Our Mission",
      description:
        "To provide users with easy access to all our extensions in one place, empowering them to enhance productivity and digital experiences.",
    },
    {
      icon: <Users className="w-8 h-8" style={{ color: themeAccent }} />,
      title: "Our Users",
      description:
        "We serve a diverse community of users who want seamless tools for work, learning, and creativity, ensuring every extension is accessible and useful.",
    },
    {
      icon: <Zap className="w-8 h-8" style={{ color: themeAccent }} />,
      title: "Innovation First",
      description:
        "We continuously create and improve extensions, embracing new technology to deliver features that make your tasks faster and smarter.",
    },
    {
      icon: <Award className="w-8 h-8" style={{ color: themeAccent }} />,
      title: "Quality Driven",
      description:
        "Each extension is carefully developed and tested to ensure reliability, usability, and a high-quality experience for all users.",
    },
  ];

  const stats = [
    { number: "3+", label: "Extensions Available" },
    { number: "10+", label: "Active Users" },
    { number: "5+", label: "Years of Development" },
    { number: "99%", label: "User Satisfaction" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start">
      <Background />
      <Navbar setCurrentPage={setCurrentPage} />

      {/* Hero Section */}
      <div className="text-center mt-24 px-4 sm:px-6 lg:px-8 z-10">
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
          style={{ color: themePrimary }}
        >
          About{" "}
          <span style={{ color: themeAccent }}>
            Our Extensions
          </span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed bg-white/60 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-lg text-[hsl(184,70%,21%)]">
          Our website hosts all our extensions in one place. Browse, download, and use them to enhance productivity, streamline your workflow, and make everyday tasks easier.
        </p>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-6 z-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/30 text-center shadow-lg transform hover:scale-105 transition duration-500"
          >
            <div className="text-4xl font-bold mb-2" style={{ color: themePrimary }}>
              {stat.number}
            </div>
            <div className="font-semibold" style={{ color: themePrimary }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Who We Are Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 z-10">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
            style={{ color: themePrimary }}
          >
            Who We Are
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-[hsl(184,70%,21%)]">
            We are a dedicated team focused on creating and sharing extensions that improve digital experiences. Our platform centralizes all our tools so users can access them easily and efficiently.
          </p>
          <p className="text-lg leading-relaxed text-[hsl(184,70%,21%)]">
            Our goal is to make technology more accessible, helpful, and fun for everyone. Every extension is crafted to simplify tasks, boost productivity, and provide real value to our users.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 z-10">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ color: themePrimary }}
        >
          What Drives Us
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-lg hover:shadow-sky-200 hover:scale-105 transform transition duration-500"
            >
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3
                className="text-xl font-bold mb-3 text-center"
                style={{ color: themePrimary }}
              >
                {value.title}
              </h3>
              <p className="leading-relaxed text-center text-[hsl(184,70%,21%)]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-6 py-16 z-10">
        <div
          className="rounded-3xl p-12 text-center text-white shadow-2xl"
          style={{
            background: `linear-gradient(to right, hsl(184, 70%, 21%), skyblue)`,
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Download Your Favorite Extensions
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Explore our collection and enhance your workflow. Click below to start downloading and using our extensions right away.
          </p>
          <button
            onClick={() => setCurrentPage("main")}
            className="bg-white/90 text-[hsl(184,70%,21%)] font-semibold px-8 py-4 rounded-full shadow-md hover:bg-white hover:scale-105 transition duration-300"
          >
            Browse Extensions
          </button>
        </div>
      </div>
    </div>
  );
}
