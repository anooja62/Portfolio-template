import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  return (
    <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16 px-6 sm:px-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-10 pt-10">ALL PROJECTS</h2>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              onClick={() => navigate(`/project/${project.id}`)} // Navigate on click
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-44 object-cover rounded-md"
              />
              {/* Project Info */}
              <h3 className="text-xl font-bold text-green-900 mt-4">{project.title}</h3>
              <p className="text-gray-700 mt-2">{project.description}</p>

              {/* View More Button (Optional) */}
              <div className="mt-4">
                <button
                  className="px-5 py-2 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent div click event
                    navigate(`/project/${project.id}`);
                  }}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AllProjects;
