
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import React from "react";
import ProjectDetails from "../pages/ProjectDetails";
import AllProjects from "../pages/AllProjects";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/all-projects" element={<AllProjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
