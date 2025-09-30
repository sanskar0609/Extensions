import React from "react";
import CardNav from "./ui/CardNav"; // ✅ Make sure you import CardNav
import logo from "../assets/logo.png";
import { href } from "react-router-dom";


const Navbar = ({ setCurrentPage }) => {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "https://www.linkedin.com/in/sanskar-sontakke-550347318/"},
        { label: "About Us", ariaLabel: "About Us",href: "https://twitter.com/sanskar0609" ,onClick: () => setCurrentPage("aboutus")}
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Portfolio", ariaLabel: "Featured Projects" ,href:"https://sanskarsontakkeportfolio.netlify.app/"},
        { label: "project", ariaLabel: "Project Case Studies", href:"https://sanskarsontakkeportfolio.netlify.app/" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
      { label: "Email", ariaLabel: "Email Sanskar", href: "mailto:sanskarsontakke06@gmail.com" },
      { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com/sanskar0609" },
      { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://www.linkedin.com/in/sanskar-sontakke-550347318/" }
    ]
    }
  ];

  return (
    <div>
      <CardNav
        logo={logo}
        logoAlt="Company Logo"
        items={items}
        baseColor="hsl(184, 70%, 21%)"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
        setCurrentPage={setCurrentPage} // ✅ Make sure this prop is passed from parent
      />
    </div>
  );
};

export default Navbar;
