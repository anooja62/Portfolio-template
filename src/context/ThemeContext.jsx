import { createContext, useEffect, useState, useContext } from "react";
import React from "react";
// Create Theme Context
const ThemeContext = createContext();

// Provider Component
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply dark mode to the document root
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
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}  {/* ✅ Make sure children are inside the provider */}
    </ThemeContext.Provider>
  );
};

// Custom Hook for easy access
export const useTheme = () => useContext(ThemeContext);
