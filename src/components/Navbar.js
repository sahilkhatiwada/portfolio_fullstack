import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ADMIN_PASSWORD = 'yourStrongPassword'; // Use the same password as in Blog.js

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [isAdmin, setIsAdmin] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', isPage: true },
    { name: 'About', path: '#about', isPage: false },
    { name: 'Projects', path: '#projects', isPage: false },
    { name: 'Skills', path: '#skills', isPage: false },
    { name: 'Experience', path: '#experience', isPage: false },
    { name: 'Contact', path: '#contact', isPage: false },
    { name: 'Blog', path: '/blog', isPage: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname === '/') {
        let currentSection = '/';
        navItems.forEach(item => {
          if (!item.isPage) {
            const section = document.getElementById(item.path.substring(1));
            if (section && window.scrollY >= section.offsetTop - 100) {
              currentSection = item.path;
            }
          }
        });
        setActivePath(currentSection);
      } else {
        setActivePath(location.pathname);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const adminFlag = localStorage.getItem('isAdmin');
    if (adminFlag === 'true') setIsAdmin(true);
  }, []);

  const scrollToSection = (e, path) => {
    e.preventDefault();
    if (path.startsWith('#')) {
      // Find the target element
      const sectionId = path.substring(1);
      const element = document.getElementById(sectionId);
      
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80, // Adjust for navbar height
          behavior: 'smooth'
        });
        
        // If we are not on the homepage, first navigate there
        if (location.pathname !== '/') {
          // A little trick to make it work with React Router
          setTimeout(() => {
            window.history.pushState(null, "", '/');
            window.location.href = path; // Then scroll
          }, 300)
        }
      }
    }
    setIsOpen(false);
  };

  const handleAdminLogin = () => {
    const pwd = prompt('Enter admin password:');
    if (pwd === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const menuVariants = {
    closed: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.2,
            ease: 'easeOut',
        },
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: 'easeIn',
            staggerChildren: 0.05,
        },
    },
  };

  const navItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  const NavLink = ({ item, isMobile = false }) => {
    const isActive = activePath === item.path;

    const desktopClasses = `text-sm font-medium transition-colors duration-300 ${
        isActive
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
    }`;

    const mobileClasses = `block w-full text-left py-3 px-4 rounded-md text-base font-medium transition-all duration-300 ${
      isActive
          ? 'text-white bg-primary-600 shadow-md'
          : `text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700`
    }`;
    
    const linkClasses = isMobile ? mobileClasses : desktopClasses;

    if (item.isPage) {
      return (
        <Link to={item.path} className={linkClasses} onClick={() => setIsOpen(false)}>
          {item.name}
        </Link>
      );
    }

    // For anchor links
    if (location.pathname !== '/') {
      return (
        <Link to={`/${item.path}`} className={linkClasses} onClick={() => setIsOpen(false)}>
          {item.name}
        </Link>
      )
    }

    return (
      <a href={item.path} onClick={(e) => scrollToSection(e, item.path)} className={linkClasses}>
        {item.name}
      </a>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2" onClick={(e) => {
              if (location.pathname === '/') {
                  window.scrollTo({top: 0, behavior: 'smooth'});
              } else {
                  // Let React Router handle navigation
                  // No need to preventDefault
              }
              setIsOpen(false);
          }}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="text-3xl font-bold text-gradient"
            >
              SK
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink item={item} />
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-3 rounded-full bg-gray-200/50 dark:bg-dark-700/50 text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.button>

            {/* Admin login/logout button, only show on /blog */}
            {location.pathname === '/blog' && (
              !isAdmin ? (
                <button onClick={handleAdminLogin} className="px-4 py-2 bg-primary-600 text-white rounded-full font-medium shadow hover:bg-primary-700 transition">Admin Login</button>
              ) : (
                <button onClick={handleAdminLogout} className="px-4 py-2 bg-gray-400 text-white rounded-full font-medium shadow hover:bg-gray-500 transition">Logout</button>
              )
            )}

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-3 rounded-full bg-gray-200/50 dark:bg-dark-700/50 text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={isOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-dark-800 shadow-lg border-t border-gray-200 dark:border-dark-700"
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
                {navItems.map((item) => (
                  <motion.div key={item.name} variants={navItemVariants}>
                     <NavLink item={item} isMobile={true} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 