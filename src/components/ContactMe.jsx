import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setLoading(false);
        },
        (error) => {
          alert("Failed to send message.");
          console.error("Error:", error);
          setLoading(false);
        }
      );
  };

  return (
    <motion.section 
      className="bg-gray-900 text-white py-16 px-6 sm:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Side - Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">CONTACT ME</h2>
          <p className="text-gray-300">your_email@example.com</p>
          <p className="text-gray-300">+123 456 7890</p>
          <p className="text-gray-300">50 London, 5678 ABC</p>
        </div>

        {/* Right Side - Contact Form */}
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg bg-gray-100 text-black border border-gray-400 focus:outline-none focus:border-green-800 transition-all duration-300 focus:ring-2 focus:ring-green-600"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg bg-gray-100 text-black border border-gray-400 focus:outline-none focus:border-green-800 transition-all duration-300 focus:ring-2 focus:ring-green-600"
              required
            />
            <textarea
              name="message"
              placeholder="Type your message..."
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-lg bg-gray-100 text-black border border-gray-400 focus:outline-none focus:border-green-800 transition-all duration-300 focus:ring-2 focus:ring-green-600"
              required
            />
            <motion.button 
              type="submit" 
              className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactMe;
