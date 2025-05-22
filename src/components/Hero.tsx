import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaArrowDown } from 'react-icons/fa';

interface HeroProps {
  onAboutClick: () => void;
  onContactClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAboutClick, onContactClick }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center py-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 animated-gradient -z-10 opacity-20"></div>
      
      {/* Grid lines for visual effect */}
      <div className="absolute inset-0 grid grid-cols-6 -z-10">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="border-l border-white/5 h-full first:border-l-0"></div>
        ))}
      </div>
      <div className="absolute inset-0 grid grid-rows-6 -z-10">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="border-t border-white/5 w-full first:border-t-0"></div>
        ))}
      </div>
      
      {/* Blurred circles for depth */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-500/20 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-secondary-500/20 blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-4 inline-block"
        >
          <span className="px-4 py-1 rounded-full border border-primary-400/30 text-sm font-medium text-primary-400 backdrop-blur-sm">
            Software Developer
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight"
        >
          Krish Kumar <span className="text-primary-400">Sah</span>
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl font-light text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Software Developer | IT Student <span className="text-primary-400">@</span> Cincinnati, Ohio
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <a
            href="https://www.linkedin.com/in/krishsah/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FaLinkedin className="mr-2" /> LinkedIn
          </a>
          <a
            href="https://github.com/krishsah01"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <FaGithub className="mr-2" /> GitHub
          </a>
          <button
            onClick={onContactClick}
            className="btn-outline"
          >
            <FaEnvelope className="mr-2" /> Contact
          </button>
        </motion.div>
        
        <motion.button
          onClick={onAboutClick}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 hover:text-primary-400 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            y: [0, 10, 0]
          }}
          transition={{ 
            opacity: { delay: 1, duration: 1 },
            y: { delay: 1, duration: 1.5, repeat: Infinity, repeatType: "loop" }
          }}
        >
          <span className="mb-2 text-sm">Scroll to learn more</span>
          <FaArrowDown />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;