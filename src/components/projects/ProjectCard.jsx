import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";
import ReactMarkdown from "react-markdown";

const ProjectCard = ({ project }) => {
  const theme = useContext(ThemeContext);

  return (
    <div
      className="rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
    >
      {project.image && (
        <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
        <div className="text-gray-700 dark:text-gray-300 mt-2">
          <ReactMarkdown>{project.bodyText}</ReactMarkdown>
        </div>
      </div>
      <div className="p-4 flex flex-wrap gap-2">
        {project.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            {link.text}
          </a>
        ))}
      </div>
      {project.tags && (
        <div className="p-4 bg-gray-100 dark:bg-gray-700 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-semibold text-gray-800 bg-gray-300 rounded-full dark:text-gray-200 dark:bg-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
