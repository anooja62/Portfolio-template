import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
const socialIcons = {
  linkedin: <FaLinkedin className="text-white text-3xl hover:text-blue-400 transition" />,
  github: <FaGithub className="text-white text-3xl hover:text-gray-400 transition" />,
  email: <FaEnvelope className="text-white text-3xl hover:text-red-400 transition" />,
};
const Header = () => {
  const [data, setData] = useState({ name: "Loading...", roles: [] });
  const [socialLinks, setSocialLinks] = useState([]);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetch("/profile/home.json")
      .then((res) => res.json())
      .then((jsonData) => setData(jsonData))
      .catch((err) => console.error("Failed to load data:", err));

      fetch("/profile/social.json")
      .then((res) => res.json())
      .then((jsonData) => setSocialLinks(jsonData.social))
      .catch((err) => console.error("Failed to load social.json:", err));
  }, []);

  useEffect(() => {
    if (data.roles.length === 0) return;

    const currentText = data.roles[index];
    let typingSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % data.roles.length);
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      setText(currentText.substring(0, charIndex));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, index, isDeleting, data.roles]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-7xl font-bold">{data.name}</h1>

      {/* Typewriter Effect */}
      <p className="text-xl mt-2">
        I'm <span className="text-white ">{text}</span>
        <span className="animate-blink">|</span>
      </p>

      {/* Social Icons */}
      <div className="flex space-x-6 mt-6">
        {socialLinks.map((link, i) => (
          <a key={i} href={link.href} target="_blank" rel="noopener noreferrer">
            {socialIcons[link.network]}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Header;
