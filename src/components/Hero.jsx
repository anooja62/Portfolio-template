import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/profile.json")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Error loading profile:", err));
  }, []);

  if (!profile) {
    return <p className="text-center text-gray-500 py-10">Loading...</p>;
  }

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 py-16 sm:py-20 bg-gradient-to-r from-green-900 via-green-700 to-green-500 text-white">
      {/* Left Side: Name & Role */}
      <div className="text-center md:text-left max-w-lg pt-10">
        {/* Animated Text */}
        <motion.h3
          className="font-bold text-3xl sm:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {profile.name}
        </motion.h3>

        {/* Role with Animated Effect */}
        <motion.h2
          className="text-white text-4xl sm:text-6xl font-extrabold pt-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {profile.role.toUpperCase()}
        </motion.h2>

        {/* Call-to-Action Button */}
        <motion.button
          className="mt-6 px-6 sm:px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/all-projects")}
        >
          View My Works
        </motion.button>
      </div>

      {/* Profile Image with Floating Effect */}
      <motion.div
        className="mt-8 md:mt-0 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full p-1"></div>
        <img
          src={profile.profileImage}
          alt="Profile"
          className="w-72 sm:w-80 h-72 sm:h-80 object-cover rounded-full border-4 border-white shadow-2xl transform hover:scale-105 transition duration-300"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
