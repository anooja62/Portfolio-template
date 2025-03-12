import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; 
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/data/profile.json")
      .then((res) => res.json())
      .then((data) => setName(data.name))
      .catch((err) => console.error("Error loading name:", err));
  }, []);

  return (
    <nav className="bg-green-900 text-white p-5 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo / Name */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          {name || "Loading..."}
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          </li>
          <li>
            <Link to="/all-projects" className="hover:text-gray-300 transition">My Projects</Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col items-center gap-4 bg-green-800 py-5 mt-2 rounded-lg shadow-lg"
          >
            <li>
              <Link 
                to="/" 
                className="hover:text-gray-300 transition"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/all-projects" 
                className="hover:text-gray-300 transition"
                onClick={() => setIsOpen(false)}
              >
                My Projects
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
