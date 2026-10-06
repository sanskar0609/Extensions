import React, { useState } from "react";

const ExtensionCard = ({ extension, image, isAuthenticated, handleDownload, redirectToLogin }) => {
  // Initialize with persisted count or a random base starting number (to look active)
  const [downloads, setDownloads] = useState(() => {
    const saved = localStorage.getItem(`downloads_${extension.id}`);
    return saved ? parseInt(saved) : Math.floor(Math.random() * 500) + 150;
  });

  const handleClick = () => {
    // Increment and visually save the counter
    const newCount = downloads + 1;
    setDownloads(newCount);
    localStorage.setItem(`downloads_${extension.id}`, newCount);

    handleDownload(extension.name); // optional analytics or tracking
    window.open(extension.downloadUrl, "_blank"); // ✅ opens download link
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
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{extension.name}</h3>
            {/* Download Counter Badge on the right */}
            <div className="flex items-center gap-1 text-xs font-semibold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white" title="Total Downloads">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {downloads}
            </div>
          </div>
          <p className="text-white/80 mb-3">{extension.description}</p>
          <span className="text-sm text-white/70 font-medium">{extension.category}</span>
        </div>
        <button
          onClick={handleClick}
          className="mt-4 py-2 w-full rounded-lg font-medium transition transform bg-black text-white hover:bg-gray-900 hover:scale-105"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ExtensionCard;
