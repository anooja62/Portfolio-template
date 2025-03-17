import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Experience = () => {
  const { darkMode } = useTheme();
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    fetch("/profile/experiences.json")
      .then((res) => res.json())
      .then((data) => setExperienceData(data.experiences))
      .catch((err) => console.error("Failed to load experience data:", err));
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center px-4 md:px-12 py-12 transition-all duration-300
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">Experience</h1>

      {/* Timeline Container */}
      <div className="relative w-full max-w-5xl">
        {/* Vertical Line for Desktop */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[3px] bg-gray-600"></div>

        {/* Experience Cards */}
        {experienceData.map((exp, index) => (
          <div 
            key={index} 
            className="relative flex flex-col md:flex-row items-center md:items-start mb-10 w-full"
          >
            {/* Left Side (Date) - Show on the left for Desktop, Center for Mobile */}
            <div 
              className={`w-full md:w-1/2 text-center md:text-right mb-4 md:mb-0 px-4 order-2 
              ${index % 2 === 0 ? "md:order-1" : "md:order-3"}`}
            >
              <span className="inline-block px-4 py-2 rounded-lg text-sm font-semibold bg-blue-500 text-white">
                {exp.dateText}
              </span>
            </div>

            {/* Timeline Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 bg-blue-500 border-blue-700 hidden md:block"></div>

            {/* Right Side (Experience Details) - Full width on Mobile */}
            <div 
              className={`w-full md:w-1/2 px-4 order-1 
              ${index % 2 === 0 ? "md:order-3" : "md:order-1"}`}
            >
              <div 
                className={`p-6 rounded-lg shadow-lg transition-all duration-300
                ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}
              >
                <h3 className="text-lg md:text-xl font-semibold">{exp.title}</h3>
                <h4 className="font-medium text-blue-500">{exp.subtitle} · {exp.workType}</h4>
                <ul className="mt-2 list-disc list-inside text-sm md:text-base">
                  {exp.workDescription.map((desc, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: desc }}></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
