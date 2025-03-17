import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Skills = () => {
  const { darkMode } = useTheme();
  const [skillsData, setSkillsData] = useState(null);

  useEffect(() => {
    fetch("/profile/skills.json")
      .then((res) => res.json())
      .then((data) => setSkillsData(data))
      .catch((err) => console.error("Failed to load skills data:", err));
  }, []);

  if (!skillsData) {
    return (
      <div className={`text-xl text-center min-h-screen flex items-center justify-center transition-all duration-300
        ${darkMode ? "text-white bg-gray-900" : "text-gray-900 bg-white"}`}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center px-6 py-10 transition-all duration-300
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Title */}
      <h1 className="text-5xl font-bold text-center mb-6">Skills</h1>

      {/* Intro Text */}
      <p className="text-lg text-center max-w-3xl mb-8">{skillsData.intro}</p>

      {/* Skills Sections */}
      <div className="w-full max-w-4xl">
        {skillsData.skills.map((category, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-2xl font-semibold text-center mb-4">{category.title}</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {category.items.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-16 h-16 md:w-20 md:h-20 transition-all duration-300"
                  />
                  <span className="mt-2 text-lg">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
