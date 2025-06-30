import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiPenTool, FiUsers, FiTrendingUp } from 'react-icons/fi';

const AnimatedNumber = ({ value }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [inView, count, value]);
  
  return (
    <motion.span ref={ref} className="text-3xl font-bold text-primary-600 dark:text-primary-400">
      {rounded}
    </motion.span>
  );
};

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const features = [
    {
      icon: <FiCode size={32} />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and well-documented code that follows best practices.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <FiPenTool size={32} />,
      title: 'Creative Design',
      description: 'Creating beautiful and intuitive user interfaces that enhance user experience.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <FiUsers size={32} />,
      title: 'Team Collaboration',
      description: 'Working effectively in teams, communicating clearly, and contributing to shared goals.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <FiTrendingUp size={32} />,
      title: 'Continuous Learning',
      description: 'Staying updated with the latest technologies and industry best practices.',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
  }

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-dark-800 overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            About <span className="text-gradient">Me</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            I'm a passionate full-stack developer with 1+ years of experience creating 
            innovative digital solutions. I love turning complex problems into simple, 
            beautiful, and intuitive designs.
          </motion.p>
        </motion.div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 items-center mb-12 md:mb-16"
        >
          <motion.div
            variants={slideInLeft}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              My Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
              I started my journey in web development with a curiosity to understand how 
              the digital world works. Over the years, I've worked on various projects 
              ranging from small business websites to complex enterprise applications.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
              My approach combines technical expertise with creative problem-solving, 
              ensuring that every project I work on not only meets functional requirements 
              but also delivers an exceptional user experience.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8 pt-4">
              <div className="text-center">
                <AnimatedNumber value={50} />
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">+</span>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Projects Completed</div>
              </div>
              <div className="text-center">
                <AnimatedNumber value={5} />
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">+</span>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <AnimatedNumber value={30} />
                <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">+</span>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Happy Clients</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            className="relative"
          >
            <div className="card bg-white dark:bg-dark-700 p-6 sm:p-8 rounded-2xl shadow-lg">
              <h4 className="text-xl font-bold mb-4 text-center sm:text-left">What I Do</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm sm:text-base">
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full flex-shrink-0"></div>
                  Full-stack web development
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base">
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full flex-shrink-0"></div>
                  UI/UX design and prototyping
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base">
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full flex-shrink-0"></div>
                  Mobile app development
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base">
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full flex-shrink-0"></div>
                  API development and integration
                </li>
                <li className="flex items-center gap-3 text-sm sm:text-base">
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full flex-shrink-0"></div>
                  Performance optimization
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card p-6 text-center group transition-transform duration-300"
            >
              <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} text-white mb-4 transition-all duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About; 