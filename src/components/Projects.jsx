import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  if (!projects.length)
    return <p className="text-center text-gray-300 py-10">Loading...</p>;

  return (
    <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16 px-6 sm:px-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-8">MY PROJECTS</h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          className="rounded-lg"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-xl font-semibold text-green-800 mt-4">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {project.description}
                </p>

                <Link
                  to={`/project/${project.id}`}
                  className="mt-4 inline-block px-5 py-3 bg-green-800 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition"
                >
                  View Details
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Custom Styling for Swiper */}
      <style>
        {`
          .swiper-button-prev, .swiper-button-next {
            color: #fff !important; /* White icons */
          }
          .swiper-button-prev:hover, .swiper-button-next:hover {
            color: #D1FAE5 !important; /* Lighter green */
          }
          .swiper-pagination-bullet {
            background: #D1FAE5 !important; /* Light Green */
          }
          .swiper-pagination-bullet-active {
            background: #10B981 !important; /* Green */
          }
        `}
      </style>
    </section>
  );
};

export default Projects;
