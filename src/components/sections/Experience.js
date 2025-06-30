import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar, FiMapPin, FiAward, FiBookOpen } from 'react-icons/fi';

const ExperienceItem = ({ item, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const side = index % 2 === 0 ? 'left' : 'right';

  const itemVariants = {
    hidden: { opacity: 0, x: side === 'left' ? -50 : 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 60, damping: 15, mass: 0.8 },
    },
  };
  
  const Icon = item.type === 'work' ? FiBriefcase : FiBookOpen;
  
  return (
    <div ref={ref} className="relative flex justify-between items-center w-full">
      {/* Content Side */}
      <div className={`w-full md:w-[calc(50%-2rem)] ${side === 'right' ? 'md:order-3 md:pl-8' : 'md:pr-8 md:text-right'}`}>
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          whileHover={{ y: -5, scale: 1.02 }}
          className="card p-6"
        >
            <div className={`flex items-start justify-between mb-2 ${side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                <h3 className={`text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 ${side === 'right' ? 'md:pl-4' : 'md:pr-4'}`}>
                    {item.title}
                </h3>
                <span className={`flex-shrink-0 px-3 py-1 mt-1 rounded-full text-xs font-semibold text-white ${
                    item.type === 'work' 
                    ? 'bg-green-500' 
                    : 'bg-blue-500'
                }`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
            </div>
            
            <div className={`text-sm text-gray-600 dark:text-gray-400 mb-3 ${side === 'right' ? 'md:text-right' : ''}`}>
                <div className={`flex items-center gap-2 mb-1 ${side === 'right' ? 'md:justify-end' : ''}`}>
                    <FiAward size={14} className="text-primary-500" />
                    <span>{item.company}</span>
                </div>
                <div className={`flex items-center gap-2 ${side === 'right' ? 'md:justify-end' : ''}`}>
                    <FiMapPin size={14} className="text-primary-500" />
                    <span>{item.location}</span>
                </div>
            </div>

            <div className={`flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 mb-4 ${side === 'right' ? 'md:justify-end' : ''}`}>
                <FiCalendar size={14} />
                <span>{item.period}</span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                {item.description}
            </p>

            <div className={`flex flex-wrap gap-2 ${side === 'right' ? 'md:justify-end' : ''}`}>
                {item.technologies.map((tech, techIndex) => (
                <span
                    key={techIndex}
                    className="px-2.5 py-1 bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                >
                    {tech}
                </span>
                ))}
            </div>
        </motion.div>
      </div>
      
      {/* Timeline Dot */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 bg-gray-50 dark:bg-dark-800 rounded-full flex items-center justify-center z-10">
        <motion.div
          className="w-8 h-8 rounded-full bg-white dark:bg-dark-700 flex items-center justify-center shadow-md"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.2 }}
        >
          <Icon className="text-primary-500" size={16} />
        </motion.div>
      </div>

      {/* Spacer on the other side */}
      <div className="hidden md:block w-[calc(50%-2rem)]"></div>
    </div>
  );
};

const Experience = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const experience = [
    {
      type: 'work',
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      description: 'Leading development of enterprise web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.',
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    },
    {
      type: 'education',
      title: 'Master of Computer Science',
      company: 'Stanford University',
      location: 'Stanford, CA',
      period: '2017 - 2019',
      description: 'Specialized in Software Engineering and Artificial Intelligence. Graduated with honors.',
      technologies: ['Machine Learning', 'Data Structures', 'Algorithms', 'Software Design'],
    },
    {
      type: 'work',
      title: 'Full Stack Developer',
      company: 'Digital Innovations Inc.',
      location: 'New York, NY',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects, focusing on e-commerce platforms and SaaS applications.',
      technologies: ['React', 'Express.js', 'MongoDB', 'Stripe', 'Redis'],
    },
    {
      type: 'education',
      title: 'Bachelor of Computer Science',
      company: 'University of California',
      location: 'Berkeley, CA',
      period: '2013 - 2017',
      description: 'Major in Computer Science with a minor in Mathematics. Dean\'s List recipient.',
      technologies: ['Java', 'Python', 'C++', 'Database Systems', 'Computer Networks'],
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-dark-800 overflow-hidden">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-12 md:mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Experience & <span className="text-gradient">Education</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            My professional journey and educational background that have shaped my expertise.
          </motion.p>
        </motion.div>

        <div ref={ref} className="relative">
        <motion.div
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-1 bg-gray-200 dark:bg-dark-700"
            style={{ height: '0%' }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
          <div className="space-y-16 md:space-y-0 md:pl-12">
            {experience.map((item, index) => (
              <ExperienceItem key={index} item={item} index={index} />
            ))}
          </div>
          </div>
      </div>
    </section>
  );
};

export default Experience; 