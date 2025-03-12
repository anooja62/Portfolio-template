import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetch("/data/about.json")
      .then((res) => res.json())
      .then((data) => setAbout(data))
      .catch((err) => console.error("Error loading about:", err));
  }, []);

  if (!about) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <section className="bg-white text-gray-900 py-16 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2"
        >
          <img
            src={about.image}
            alt="About Me"
            className="rounded-lg shadow-2xl w-full object-cover"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-4xl font-bold text-green-800 mb-6">ABOUT ME</h2>
          <p className="text-gray-700 leading-relaxed">{about.description}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
