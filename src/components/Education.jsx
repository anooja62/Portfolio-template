import React, { useState, useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Education = () => {
  const { darkMode } = useTheme();
  const [educationData, setEducationData] = useState([]);

  useEffect(() => {
    fetch("/profile/education.json")
      .then((res) => res.json())
      .then((data) => setEducationData(data.education))
      .catch((err) => console.error("Failed to load education data:", err));
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center px-4 py-10 transition-all duration-300
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Education</h1>

      {/* Timeline Container */}
      <div className="relative w-full max-w-3xl">
        {/* Vertical Line */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-[3px] hidden sm:block
          ${darkMode ? "bg-blue-400" : "bg-blue-600"}`}
        ></div>

        {/* Timeline Events */}
        {educationData.map((edu, index) => (
          <div key={index} className="relative flex flex-col sm:flex-row items-center mb-12 w-full">
            {/* Date Label */}
            <div className={`absolute -top-3 px-3 py-1 rounded-lg text-xs md:text-sm transition-all duration-300
              ${darkMode ? "bg-blue-400 text-black" : "bg-blue-600 text-white"}
              ${index % 2 === 0 ? "sm:left-[55%]" : "sm:right-[55%]"}
            `}>
              {edu.title}
            </div>

            {/* Timeline Circle Icon (Visible only on larger screens) */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center hidden sm:flex
              ${darkMode ? "bg-gray-900 border-4 border-blue-400" : "bg-black border-4 border-blue-600"}
            `}>
              <FaGraduationCap className={`text-xs transition-all duration-300 ${darkMode ? "text-blue-400" : "text-white"}`} />
            </div>

            {/* Education Card */}
            <div className={`p-5 sm:p-6 rounded-xl shadow-lg w-full sm:w-[45%] transition-all duration-300
              ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}
              ${index % 2 === 0 ? "sm:ml-auto" : "sm:mr-auto"}
            `}>
              <h3 className="text-lg md:text-xl font-semibold">{edu.cardTitle}</h3>
              <h4 className="font-medium text-blue-500">{edu.cardSubtitle}</h4>
              <p className="mt-2 text-sm md:text-base">{edu.cardDetailedText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
