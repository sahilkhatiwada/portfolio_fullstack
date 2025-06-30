import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import Starfield from '../Starfield';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80, // Navbar height offset
        behavior: 'smooth',
      });
    }
  };

  const name = "Sahil Khatiwada";
  const tagline = "Full Stack Developer, Trainer & Mentor";

  const sentence = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.04,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 300
      }
    },
  };
  
  const taglineVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-dark-900">
      <Starfield />
      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center justify-center min-h-screen py-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-md sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-2 sm:mb-4"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6 text-gradient"
          >
            {name.split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.h2
            variants={taglineVariant}
            initial="hidden"
            animate="visible"
            className="text-lg sm:text-xl md:text-3xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-xs sm:max-w-none"
          >
            {tagline.split(' ').map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariant}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-8 sm:mb-12"
          >
            I create beautiful, functional, and user-centered digital experiences. 
            Passionate about clean code, innovative design, and building products that make a difference.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAbout}
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              View My Work
              <FiArrowDown className="animate-bounce" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Download Resume
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex justify-center items-center space-x-4 sm:space-x-6 mt-8 sm:mt-12"
          >
            <motion.a
              href="https://github.com/sahilkhatiwada"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white transition-all duration-300"
            >
              <FiGithub size={22} />
            </motion.a>
            
            <motion.a
              href="https://linkedin.com/in/sahil-khatiwada-3344621a7"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white transition-all duration-300"
            >
              <FiLinkedin size={22} />
            </motion.a>
            
            <motion.a
              href="https://twitter.com/username"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white transition-all duration-300"
            >
              <FiTwitter size={22} />
            </motion.a>
          </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-12 border-2 border-gray-400 dark:border-gray-400/50 rounded-full flex justify-center p-1"
        >
          <motion.div 
            className="w-1.5 h-3 bg-gray-400 dark:bg-gray-400/80 rounded-full"
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 