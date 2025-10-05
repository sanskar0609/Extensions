import React from "react";
import ProfileCard from "./ProfileCard";
import Background from "./Background";
import Navbar from "./Navbar";
import me from "../assets/myphoto.jpg";

const DeveloperPage = ({ setCurrentPage }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* Background layer */}
      <Background />

      {/* Navbar at top */}
      <div className="absolute top-0 w-full z-20">
        <Navbar setCurrentPage={setCurrentPage} />
      </div>

      {/* Centered ProfileCard with top margin */}
      <div className="flex items-center justify-center flex-1 w-full z-10 px-2 mt-15">
        <ProfileCard
          name="Sontakke Sanskar"
          title="Software Engineer"
          handle="Gmail"
          status="Online"
          contactText="Contact Me"
          avatarUrl={me}
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
          innerGradient="linear-gradient(135deg, hsl(184, 70%, 21%) 0%, hsl(184, 70%, 31%) 100%)"
          behindGradient="linear-gradient(135deg, hsl(184, 70%, 21%) 0%, hsl(184, 70%, 31%) 100%)"
          className="max-w-md md:max-w-lg w-full scale-105 hover:scale-110 transition-transform duration-500 h-[350px]" // adjust height as needed
        />
      </div>
    </div>
  );
};

export default DeveloperPage;
