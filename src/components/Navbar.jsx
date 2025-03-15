import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold">Lorem Ipsum</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {["Home", "About", "Skills", "Education", "Experience", "Projects", "Resume"].map(
            (item, index) => (
              <NavLink
                key={index}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `relative hover:text-blue-400 transition ${
                    isActive ? "text-blue-400" : ""
                  }`
                }
              >
                {item}
              </NavLink>
            )
          )}
        </div>

        {/* Dark Mode Toggle & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-700 rounded-full"
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <MoonIcon className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 items-center bg-gray-800 p-4 rounded-lg">
          {["Home", "About", "Skills", "Education", "Experience", "Projects", "Resume"].map(
            (item, index) => (
              <NavLink
                key={index}
                to={`/${item.toLowerCase()}`}
                className="hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </NavLink>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
