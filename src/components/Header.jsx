import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const texts = ["Developer", "Coder", "Freelancer"];

const Header = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index];
    let typingSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      setText(currentText.substring(0, charIndex));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, index, isDeleting]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-5xl font-bold">Your Name</h1>

      {/* Typewriter Effect */}
      <p className="text-xl mt-2">
        I'm a <span className="text-gray-400">{text}</span>
        <span className="animate-blink">|</span>
      </p>

      {/* Social Icons */}
      <div className="flex space-x-6 mt-6">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-white text-3xl hover:text-blue-400 transition" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-white text-3xl hover:text-gray-400 transition" />
        </a>
        <a href="mailto:your@email.com">
          <FaEnvelope className="text-white text-3xl hover:text-red-400 transition" />
        </a>
      </div>
    </div>
  );
};

export default Header;
