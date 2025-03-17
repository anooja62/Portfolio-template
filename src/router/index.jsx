import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import React from "react";
import About from "../components/About";
import Navbar from "../components/Navbar";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
const Router = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
