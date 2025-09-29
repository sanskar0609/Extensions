import React, { useState } from 'react';
import LandingPage from './LandingPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import MainPage from './MainPage.jsx';

const ExtensionMarketplace = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAuth = () => {
    if (formData.email && formData.password) {
      setIsAuthenticated(true);
      setCurrentPage('main');
      setFormData({ email: '', password: '', name: '' });
    }
  };

  const handleDownload = (extName) => {
    alert(`Downloading ${extName}...`);
  };

  return (
    <div>
      {!isAuthenticated && currentPage === 'landing' && (
        <LandingPage setCurrentPage={setCurrentPage} />
      )}
      {!isAuthenticated && currentPage === 'login' && (
        <LoginPage
          setCurrentPage={setCurrentPage}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          formData={formData}
          setFormData={setFormData}
          handleAuth={handleAuth}
        />
      )}
      {!isAuthenticated && currentPage === 'signup' && (
        <SignupPage
          setCurrentPage={setCurrentPage}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          formData={formData}
          setFormData={setFormData}
          handleAuth={handleAuth}
        />
      )}
      {isAuthenticated && currentPage === 'main' && (
        <MainPage
          setIsAuthenticated={setIsAuthenticated}
          setCurrentPage={setCurrentPage}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default ExtensionMarketplace;
