import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiPenTool, FiUsers, FiTrendingUp } from 'react-icons/fi';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="about" className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About <span className="text-gradient">Me</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            I'm a passionate full-stack developer with 1+ years of experience creating 
            innovative digital solutions. I love turning complex problems into simple, 
            beautiful, and intuitive designs.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center  mb-15">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              My Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              I started my journey in web development with a curiosity to understand how 
              the digital world works. Over the years, I've worked on various projects 
              ranging from small business websites to complex enterprise applications.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              My approach combines technical expertise with creative problem-solving, 
              ensuring that every project I work on not only meets functional requirements 
              but also delivers an exceptional user experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">30+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4">What I Do</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Full-stack web development
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  UI/UX design and prototyping
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Mobile app development
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  API development and integration
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Performance optimization
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="card p-6 text-center group"
            >
              <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
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