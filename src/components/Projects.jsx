import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const { darkMode } = useTheme();
  useEffect(() => {
    fetch("/profile/projects.json") // Fetch from public directory
      .then((response) => response.json())
      .then((data) => setProjectsData(data.projects))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <section
      className={`py-12 px-4 transition-all duration-300 
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
          <div
          key={index}
          className={`rounded-2xl p-5 shadow-lg transition-all duration-300 
            ${darkMode ? "bg-gray-800 hover:shadow-blue-500/50" : "bg-gray-100 hover:shadow-lg"}
            hover:scale-[1.02]`}
        >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full rounded-xl mb-4 object-cover"
                />
              )}

              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p
                className={`text-sm mt-2 whitespace-pre-line 
  ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                {project.bodyText}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.links?.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
                  >
                    {link.text}
                  </a>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags?.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
