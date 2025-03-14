import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

function About({ header }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="container mx-auto p-4">
        {data ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            <div className="text-left text-lg font-medium md:w-1/2">
              <ReactMarkdown>{data.about}</ReactMarkdown>
            </div>
            <div className="flex justify-center items-center md:w-1/2">
              <img
                src={data?.imageSource}
                alt="profile"
                className="rounded-lg shadow-lg max-w-full"
              />
            </div>
          </motion.div>
        ) : (
          <FallbackSpinner />
        )}
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
