import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

function Skills({ header }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto px-4 py-8"
        >
          <h4 className="whitespace-pre-wrap text-lg text-gray-700">
            <ReactMarkdown>{data.intro}</ReactMarkdown>
          </h4>

          {data.skills?.map((rows) => (
            <div key={rows.title} className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900">{rows.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
                {rows.items.map((item) => (
                  <motion.div 
                    key={item.title} 
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img className="h-20 w-20 mb-2" src={item.icon} alt={item.title} />
                    <p className="text-gray-800">{item.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
