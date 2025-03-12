import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedProject = data.find((proj) => proj.id === parseInt(id));
        setProject(selectedProject);
      })
      .catch((err) => console.error("Error loading project details:", err));
  }, [id]);

  if (!project) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <motion.section
      className="py-16 px-6 sm:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
 <motion.div
  className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6"
  initial={{ y: 30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>

        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* Left Side - Project Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-contain rounded-md"
            />
          </motion.div>

          {/* Right Side - Project Details */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
            <p className="text-gray-600 mt-3">{project.description}</p>

            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mt-5">
                <h3 className="text-xl font-semibold text-gray-800">Technologies Used:</h3>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, index) => (
                    <motion.li
                      key={index}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm"
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Project Summary List */}
            {project.projectsummary && project.projectsummary.length > 0 && (
              <div className="mt-5">
                <h3 className="text-xl font-semibold text-gray-800">Project Highlights:</h3>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  {project.projectsummary.map((point, index) => (
                    <motion.li
                      key={index}
                      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Project Links */}
            <motion.div className="mt-6 flex gap-4">
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-green-800 text-white rounded-md hover:bg-green-900 transition"
                  whileHover={{ scale: 1.1 }}
                >
                  View Project
                </motion.a>
              )}
              {project.githublink && (
                <motion.a
                  href={project.githublink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
                  whileHover={{ scale: 1.1 }}
                >
                  GitHub Repo
                </motion.a>
              )}
            </motion.div>

            {/* Back to Projects */}
            <motion.div className="mt-6">
              <motion.button
                onClick={() => navigate(-1)}
                className="text-green-700 hover:underline"
                whileHover={{ scale: 1.1, color: "#065f46" }}
              >
                ← Back
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ProjectDetails;
