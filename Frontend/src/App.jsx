import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import MainPage from "./components/MainPage";
import AboutUs from "./components/AboutUs.jsx";
import Developer from "./components/Developer";
import CustomAlert from "./components/ui/CustomAlert.jsx";

const App = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem("currentPage") || "landing";
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  // Override default browser alert
  useEffect(() => {
    window.alert = (message) => {
      setAlertMessage(message);
    };
  }, []);

  const handleAuth = () => {
    const { email, password } = formData;
    if (email && password) {
      setIsAuthenticated(true);
      setCurrentPage("main");
      setFormData({ name: "", email: "", password: "" });
    }
  };

  const handleDownload = (extensionName) => {
    // Analytics/alert can stay, but it should not block download
    alert(`⬇️ Downloading ${extensionName}...`);
  };

  return (
    <>
      <CustomAlert message={alertMessage} onClose={() => setAlertMessage("")} />

      {/* Landing Page */}
      {currentPage === "landing" && (
        <LandingPage
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Login Page */}
      {currentPage === "login" && (
        <LoginPage
          email={formData.email}
          password={formData.password}
          onEmailChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onPasswordChange={(e) => setFormData({ ...formData, password: e.target.value })}
          onLogin={handleAuth}
          onSwitchToSignup={() => setCurrentPage("signup")}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Signup Page */}
      {currentPage === "signup" && (
        <SignupPage
          name={formData.name}
          email={formData.email}
          password={formData.password}
          onNameChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onEmailChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onPasswordChange={(e) => setFormData({ ...formData, password: e.target.value })}
          onSignup={handleAuth}
          onSwitchToLogin={() => setCurrentPage("login")}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "aboutus" && <AboutUs setCurrentPage={setCurrentPage} />}
      {currentPage === "developer" && <Developer setCurrentPage={setCurrentPage} />}


      {/* Main Page (accessible both logged-in or guest) */}
      {currentPage === "main" && (
        <MainPage
          isAuthenticated={isAuthenticated}
          handleDownload={handleDownload}
          setIsAuthenticated={setIsAuthenticated}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default App;
