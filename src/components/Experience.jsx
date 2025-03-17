import React, { useState, useEffect } from "react";

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    fetch("/profile/experiences.json")
      .then((res) => res.json())
      .then((data) => setExperienceData(data.experiences))
      .catch((err) => console.error("Failed to load experience data:", err));
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center px-6 py-12">
      {/* Title */}
      <h1 className="text-5xl font-bold text-center mb-12">Experience</h1>

      {/* Timeline Container */}
      <div className="relative w-full max-w-4xl">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[3px] bg-gray-600"></div>

        {/* Experience Cards */}
        {experienceData.map((exp, index) => (
          <div key={index} className="relative flex items-center mb-12 w-full">
            {/* Date Label */}
            <div className={`absolute ${index % 2 === 0 ? "left-0" : "right-0"} bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold`}>
              {exp.dateText}
            </div>

            {/* Timeline Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-300 border-4 border-gray-600 rounded-full"></div>

            {/* Experience Card */}
            <div className={`bg-gray-900 p-6 rounded-xl shadow-lg w-[90%] sm:w-[45%] ${index % 2 === 0 ? "ml-auto" : "mr-auto"}`}>
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <h4 className="text-blue-400 font-medium">{exp.subtitle} · {exp.workType}</h4>
              <ul className="text-gray-300 mt-2 list-disc list-inside">
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
