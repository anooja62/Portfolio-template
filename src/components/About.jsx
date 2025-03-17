import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const About = () => {
  const { darkMode } = useTheme();
  const [aboutData, setAboutData] = useState({ about: "", imageSource: "" });

  useEffect(() => {
    fetch("/profile/about.json")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Failed to load about data:", err));
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center p-6 md:p-10 transition-all duration-300 
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Centered Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">About</h1>

      {/* Content Wrapper */}
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center">
        {/* Left Side - Text */}
        <div className="w-full md:w-2/3 text-left px-4">
          <p className="text-base md:text-lg leading-relaxed">{aboutData.about}</p>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/3 flex justify-center mt-6 md:mt-0">
          {aboutData.imageSource && (
            <img
              src={aboutData.imageSource}
              alt="Profile"
              className={`w-60 h-60 md:w-80 md:h-80 object-cover p-2 rounded-lg transition-all duration-300 
                ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
