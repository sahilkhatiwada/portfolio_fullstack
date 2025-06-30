import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiCode, FiSmartphone, FiPenTool, FiServer, 
  FiShield, FiZap, FiUsers 
} from 'react-icons/fi';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <FiCode size={32} />,
      skills: [
        { name: 'React', level: 90, color: 'from-blue-500 to-cyan-500' },
        { name: 'JavaScript', level: 85, color: 'from-yellow-500 to-orange-500' },
        { name: 'TypeScript', level: 80, color: 'from-blue-600 to-blue-700' },
        { name: 'HTML/CSS', level: 95, color: 'from-orange-500 to-red-500' },
        { name: 'Tailwind CSS', level: 88, color: 'from-cyan-500 to-blue-500' },
      ]
    },
    {
      title: 'Backend Development',
      icon: <FiServer size={32} />,
      skills: [
        { name: 'Node.js', level: 85, color: 'from-green-500 to-emerald-500' },
        { name: 'Express.js', level: 80, color: 'from-gray-600 to-gray-700' },
        { name: 'Python', level: 75, color: 'from-blue-500 to-purple-500' },
        { name: 'PostgreSQL', level: 70, color: 'from-blue-600 to-indigo-600' },
        { name: 'MongoDB', level: 75, color: 'from-green-600 to-green-700' },
      ]
    },
    {
      title: 'Mobile Development',
      icon: <FiSmartphone size={32} />,
      skills: [
        { name: 'React Native', level: 70, color: 'from-blue-500 to-cyan-500' },
        { name: 'Flutter', level: 65, color: 'from-blue-500 to-indigo-500' },
        { name: 'iOS Development', level: 60, color: 'from-gray-700 to-gray-800' },
        { name: 'Android Development', level: 55, color: 'from-green-500 to-green-600' },
      ]
    },
    {
      title: 'Design & Tools',
      icon: <FiPenTool size={32} />,
      skills: [
        { name: 'Figma', level: 85, color: 'from-purple-500 to-pink-500' },
        { name: 'Adobe XD', level: 80, color: 'from-pink-500 to-purple-500' },
        { name: 'Git', level: 90, color: 'from-orange-500 to-red-500' },
        { name: 'Docker', level: 70, color: 'from-blue-500 to-cyan-500' },
        { name: 'AWS', level: 65, color: 'from-orange-500 to-yellow-500' },
      ]
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
    <section id="skills" className="section-padding bg-white dark:bg-dark-900">
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
            My <span className="text-gradient">Skills</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            I've developed expertise in various technologies and frameworks. 
            Here's a breakdown of my technical skills and proficiency levels.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="card p-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl text-white">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.3 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Other Skills & Technologies
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'Redux', 'Next.js', 'GraphQL', 'Firebase', 'Jest', 'Cypress',
              'Sass', 'Webpack', 'Vite', 'Nginx', 'Redis', 'Socket.io',
              'Prisma', 'TypeORM', 'JWT', 'OAuth', 'REST APIs', 'Microservices'
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="card p-4 text-center group"
              >
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {skill}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Soft Skills
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Problem Solving', icon: <FiZap size={24} />, description: 'Analytical thinking and creative solutions' },
              { title: 'Communication', icon: <FiUsers size={24} />, description: 'Clear and effective team collaboration' },
              { title: 'Security', icon: <FiShield size={24} />, description: 'Best practices and secure development' },
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card p-6 text-center"
              >
                <div className="inline-flex p-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full text-white mb-4">
                  {skill.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {skill.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 