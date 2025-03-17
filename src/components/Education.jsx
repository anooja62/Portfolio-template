import React, { useState, useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa";

const Education = () => {
  const [educationData, setEducationData] = useState([]);

  useEffect(() => {
    fetch("/profile/education.json")
      .then((res) => res.json())
      .then((data) => setEducationData(data.education))
      .catch((err) => console.error("Failed to load education data:", err));
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Education</h1>

      {/* Timeline Container */}
      <div className="relative w-full max-w-3xl">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[3px] bg-blue-600 hidden sm:block"></div>

        {/* Timeline Events */}
        {educationData.map((edu, index) => (
          <div key={index} className="relative flex flex-col sm:flex-row items-center mb-12 w-full">
            {/* Date Label */}
            <div
              className={`absolute ${
                index % 2 === 0 ? "sm:left-[55%]" : "sm:right-[55%]"
              } -top-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-xs md:text-sm`}
            >
              {edu.title}
            </div>

            {/* Timeline Circle Icon (Visible only on larger screens) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-black border-4 border-blue-600 rounded-full flex items-center justify-center hidden sm:flex">
              <FaGraduationCap className="text-white text-xs" />
            </div>

            {/* Education Card */}
            <div
              className={`bg-gray-900 p-5 sm:p-6 rounded-xl shadow-lg w-full sm:w-[45%] ${
                index % 2 === 0 ? "sm:ml-auto" : "sm:mr-auto"
              }`}
            >
              <h3 className="text-lg md:text-xl font-semibold">{edu.cardTitle}</h3>
              <h4 className="text-blue-400 font-medium">{edu.cardSubtitle}</h4>
              <p className="text-gray-300 mt-2 text-sm md:text-base">{edu.cardDetailedText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
