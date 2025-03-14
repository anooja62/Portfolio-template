import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { ThemeContext } from "styled-components";
import endpoints from "../constants/endpoints";
import Header from "./Header";
import FallbackSpinner from "./FallbackSpinner";

function Education({ header }) {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [width, setWidth] = useState("50vw");

  useEffect(() => {
    fetch(endpoints.education)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));

    const handleResize = () => {
      if (window.innerWidth < 576) {
        setWidth("90vw");
      } else if (window.innerWidth < 768) {
        setWidth("90vw");
      } else if (window.innerWidth < 1024) {
        setWidth("75vw");
      } else {
        setWidth("50vw");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width }}
          className="mx-auto p-4"
        >
          <div className="flex flex-col gap-6">
            {data.education.map((education, index) => (
              <div key={index} className="bg-white shadow-lg p-4 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800">{education.title}</h3>
                <p className="text-gray-600">{education.institution}</p>
                <p className="text-gray-500 text-sm">{education.year}</p>
                {education.icon && (
                  <img
                    src={education.icon.src}
                    alt={education.icon.alt}
                    className="h-10 w-10 object-contain mt-2"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
