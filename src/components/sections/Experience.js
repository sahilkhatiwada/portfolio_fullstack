import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar, FiMapPin, FiExternalLink } from 'react-icons/fi';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
      link: 'https://techcorp.com'
    },
    {
      type: 'work',
      title: 'Full Stack Developer',
      company: 'Digital Innovations Inc.',
      location: 'New York, NY',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects, focusing on e-commerce platforms and SaaS applications.',
      technologies: ['React', 'Express.js', 'MongoDB', 'Stripe', 'Redis'],
      link: 'https://digitalinnovations.com'
    },
    {
      type: 'work',
      title: 'Frontend Developer',
      company: 'WebCraft Studio',
      location: 'Austin, TX',
      period: '2019 - 2020',
      description: 'Created responsive and interactive user interfaces for various web applications and marketing campaigns.',
      technologies: ['React', 'Vue.js', 'Sass', 'Webpack', 'Figma'],
      link: 'https://webcraftstudio.com'
    },
    {
      type: 'education',
      title: 'Master of Computer Science',
      company: 'Stanford University',
      location: 'Stanford, CA',
      period: '2017 - 2019',
      description: 'Specialized in Software Engineering and Artificial Intelligence. Graduated with honors.',
      technologies: ['Machine Learning', 'Data Structures', 'Algorithms', 'Software Design'],
      link: 'https://stanford.edu'
    },
    {
      type: 'education',
      title: 'Bachelor of Computer Science',
      company: 'University of California',
      location: 'Berkeley, CA',
      period: '2013 - 2017',
      description: 'Major in Computer Science with minor in Mathematics. Dean\'s List recipient.',
      technologies: ['Java', 'Python', 'C++', 'Database Systems', 'Computer Networks'],
      link: 'https://berkeley.edu'
    }
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-dark-800">
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
            Experience & <span className="text-gradient">Education</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            My professional journey and educational background that have shaped 
            my expertise in software development and technology.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-600"></div>

          <div className="space-y-12">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-dark-800 bg-gradient-to-r from-primary-500 to-purple-600 z-10 ${
                  item.type === 'education' ? 'ring-2 ring-blue-500' : 'ring-2 ring-green-500'
                }`}></div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="card p-6 relative"
                  >
                    {/* Type Badge */}
                    <div className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-medium text-white ${
                      item.type === 'work' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    }`}>
                      {item.type === 'work' ? 'Work' : 'Education'}
                    </div>

                    <div className="mt-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <FiBriefcase size={16} />
                          <span>{item.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiMapPin size={16} />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-500 mb-4">
                        <FiCalendar size={16} />
                        <span>{item.period}</span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                        >
                          <FiExternalLink size={16} />
                          <span className="text-sm">Visit Website</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Key Achievements
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Throughout my career, I've consistently delivered high-quality solutions 
              and contributed to the success of various projects and organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '50+',
                label: 'Projects Completed',
                description: 'Successfully delivered projects across various industries and technologies'
              },
              {
                number: '5+',
                label: 'Years Experience',
                description: 'Deep expertise in full-stack development and modern technologies'
              },
              {
                number: '30+',
                label: 'Happy Clients',
                description: 'Built long-term relationships with satisfied clients and partners'
              }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card p-6 text-center"
              >
                <div className="text-4xl font-bold text-gradient mb-2">
                  {achievement.number}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {achievement.label}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 