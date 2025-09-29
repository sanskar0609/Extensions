import React from "react";

const ExtensionCard = ({ extension, image, isAuthenticated, handleDownload, redirectToLogin }) => {
  const handleClick = () => {
    if (isAuthenticated) {
      handleDownload(extension.name);
    } else {
      redirectToLogin(); // Redirect to login page
    }
  };

  return (
    <div
      className={`bg-gradient-to-br ${extension.color} shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl relative flex flex-col`}
    >
      <img
        src={image}
        alt={extension.name}
        className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between text-white">
        <div>
          <h3 className="text-lg font-semibold mb-2">{extension.name}</h3>
          <p className="text-white/80 mb-3">{extension.description}</p>
          <span className="text-sm text-white/70 font-medium">{extension.category}</span>
        </div>
        <button
          onClick={handleClick}
          className={`mt-4 py-2 w-full rounded-lg font-medium transition transform ${
            isAuthenticated
              ? "bg-white/20 text-white hover:bg-white/30 hover:scale-105"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
        >
          {isAuthenticated ? "Download" : "Login to Download 🔒"}
        </button>
      </div>
    </div>
  );
};

export default ExtensionCard;
