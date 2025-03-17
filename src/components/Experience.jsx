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
    <div className={`min-h-screen flex flex-col items-center px-6 py-12 transition-all duration-300
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Title */}
      <h1 className="text-5xl font-bold text-center mb-12">Experience</h1>

      {/* Timeline Container */}
      <div className="relative w-full max-w-4xl">
        {/* Vertical Line */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-[3px] hidden sm:block
          ${darkMode ? "bg-blue-400" : "bg-gray-600"}`}
        ></div>

        {/* Experience Cards */}
        {experienceData.map((exp, index) => (
          <div key={index} className="relative flex items-center mb-12 w-full">
            {/* Date Label */}
            <div className={`absolute px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300
              ${darkMode ? "bg-blue-400 text-black" : "bg-blue-600 text-white"}
              ${index % 2 === 0 ? "left-0" : "right-0"}
            `}>
              {exp.dateText}
            </div>

            {/* Timeline Dot */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full transition-all duration-300
              ${darkMode ? "bg-blue-400 border-blue-600" : "bg-gray-300 border-gray-600"}
              border-4`}
            ></div>

            {/* Experience Card */}
            <div className={`p-6 rounded-xl shadow-lg w-[90%] sm:w-[45%] transition-all duration-300
              ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}
              ${index % 2 === 0 ? "ml-auto" : "mr-auto"}
            `}>
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <h4 className="font-medium text-blue-500">{exp.subtitle} · {exp.workType}</h4>
              <ul className="mt-2 list-disc list-inside">
                {exp.workDescription.map((desc, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: desc }}></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
