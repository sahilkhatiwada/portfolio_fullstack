import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';
import { Link, animateScroll as scroll } from 'react-scroll';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', icon: <FaGithub />, url: 'https://github.com/sahilkhatiwada' },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/sahil-khatiwada-3344621a7/' },
    { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com/your-username' },
  ];

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' },
  ];

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: 'easeInOutCubic',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      },
    },
  };

  return (
    <footer className="relative bg-gray-100 dark:bg-dark-900/50 border-t border-gray-200 dark:border-dark-700">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="container-custom py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 text-center md:text-left">
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gradient mb-3">Sahil khatiwada</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              A passionate Full Stack Developer building modern and responsive web applications.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                  whileHover={{ x: 5, color: '#4F46E5' }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-60}
                    className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-wider uppercase">Connect</h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  className="flex items-center justify-center md:justify-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-1 text-center md:text-right">
             <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-wider uppercase">Contact Info</h4>
             <p className="text-gray-600 dark:text-gray-400 text-sm">sahilkhatiwada@hotmail.com</p>
             <p className="text-gray-600 dark:text-gray-400 text-sm">Itahari, Nepal</p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-700 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} Sahil khatiwada. All Rights Reserved.</p>
        </motion.div>
      </motion.div>
      <motion.button
        onClick={scrollToTop}
        aria-label="Go to top"
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 right-8 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-dark-900"
      >
        <FiArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;
