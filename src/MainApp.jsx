import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import FallbackSpinner from "./components/FallbackSpinner";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import endpoints from "./constants/endpoints";

// Static Import Map (Manually add components)
const componentsMap = {
  About: React.lazy(() => import("./components/About")),
  Contact: React.lazy(() => import("./components/Contact")),
  Projects: React.lazy(() => import("./components/Projects")),
  Education: React.lazy(() => import("./components/Education")),
  // Add other components here
};

const MainApp = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(endpoints.routes);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div className="MainApp">
      <Navbar />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {data?.sections?.map(({ headerTitle, path, component }) => {
              const SectionComponent = componentsMap[component];

              if (!SectionComponent) {
                console.error(`Component "${component}" not found in componentsMap`);
                return null;
              }

              return (
                <Route
                  key={headerTitle}
                  path={path}
                  element={<SectionComponent header={headerTitle} />}
                />
              );
            })}
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default MainApp;
