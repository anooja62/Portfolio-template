import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Projects = ({ header }) => {
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  const numberOfItems = showMore && data ? data.length : 6;

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects?.slice(0, numberOfItems).map((project, index) => (
              <motion.div
                key={project.title}
                initial="hidden"
                animate="visible"
                variants={fadeInVariant}
                transition={{ delay: index * 0.1 }} // Staggered animation
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          {!showMore && (
            <div className="flex justify-center mt-8">
              <button
                className="px-6 py-2 text-white bg-gray-700 hover:bg-gray-800 rounded-lg transition"
                onClick={() => setShowMore(true)}
              >
                Show More
              </button>
            </div>
          )}
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
