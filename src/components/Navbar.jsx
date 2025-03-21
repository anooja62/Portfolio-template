import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MoonIcon, SunIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../context/ThemeContext";
const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false);
  const [resumeLink, setResumeLink] = useState("");

  // Fetch JSON Data
  useEffect(() => {
    fetch("/profile/about.json") // Ensure the path is correct
      .then((response) => response.json())
      .then((data) => setResumeLink(data.resumeLink))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

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
          {["Home", "About", "Skills", "Education", "Experience", "Projects"].map((item, index) => (
            <NavLink
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `relative text-white transition hover:text-gray-300 ${
                  isActive ? "after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-400" : ""
                }`
              }
            >
              {item}
            </NavLink>
          ))}

          {/* Resume Link (Opens in New Tab) */}
          {resumeLink && (
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-white transition hover:text-gray-300"
            >
              Resume
            </a>
          )}
        </div>

        {/* Dark Mode Toggle & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          >
            {darkMode ?<MoonIcon className="w-6 h-6 text-gray-900" />  : <SunIcon className="w-6 h-6 text-yellow-400" />}
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
          {["Home", "About", "Skills", "Education", "Experience", "Projects"].map((item, index) => (
            <NavLink
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `text-white transition hover:text-gray-300 ${
                  isActive ? "border-b-2 border-blue-400" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {item}
            </NavLink>
          ))}

          {/* Resume Link in Mobile Menu */}
          {resumeLink && (
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Resume
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
