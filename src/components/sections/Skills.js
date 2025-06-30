import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiCode, FiSmartphone, FiPenTool, FiServer, 
  FiShield, FiZap, FiUsers 
} from 'react-icons/fi';

const SkillBar = ({ name, level, color, inView }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300 font-medium">{name}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{level}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2.5">
            <motion.div
                className={`h-2.5 rounded-full bg-gradient-to-r ${color}`}
                initial={{ width: 0 }}
                animate={inView ? { width: `${level}%` } : { width: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            />
        </div>
    </div>
);

const Skills = () => {
  const useInViewOptions = {
    triggerOnce: true,
    threshold: 0.2,
  };
  
  const { ref: headerRef, inView: headerInView } = useInView(useInViewOptions);
  const { ref: categoriesRef, inView: categoriesInView } = useInView(useInViewOptions);
  const { ref: otherSkillsRef, inView: otherSkillsInView } = useInView(useInViewOptions);
  const { ref: softSkillsRef, inView: softSkillsInView } = useInView(useInViewOptions);

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <FiCode size={28} />,
      skills: [
        { name: 'React', level: 90, color: 'from-blue-500 to-cyan-500' },
        { name: 'JavaScript (ES6+)', level: 85, color: 'from-yellow-400 to-orange-500' },
        { name: 'TypeScript', level: 80, color: 'from-blue-600 to-blue-700' },
        { name: 'HTML5 & CSS3', level: 95, color: 'from-orange-500 to-red-600' },
        { name: 'Tailwind CSS', level: 88, color: 'from-cyan-400 to-blue-500' },
      ]
    },
    {
      title: 'Backend Development',
      icon: <FiServer size={28} />,
      skills: [
        { name: 'Node.js', level: 85, color: 'from-green-500 to-emerald-500' },
        { name: 'Express.js', level: 80, color: 'from-gray-500 to-gray-600' },
        { name: 'Python', level: 75, color: 'from-blue-400 to-purple-500' },
        { name: 'PostgreSQL', level: 70, color: 'from-blue-500 to-indigo-600' },
        { name: 'MongoDB', level: 75, color: 'from-green-500 to-green-600' },
      ]
    },
    {
      title: 'Mobile Development',
      icon: <FiSmartphone size={28} />,
      skills: [
        { name: 'React Native', level: 70, color: 'from-blue-400 to-cyan-400' },
        { name: 'Flutter', level: 65, color: 'from-blue-500 to-indigo-500' },
        { name: 'iOS & Android Basics', level: 60, color: 'from-gray-600 to-gray-700' },
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: <FiPenTool size={28} />,
      skills: [
        { name: 'Git & GitHub', level: 90, color: 'from-orange-400 to-red-500' },
        { name: 'Docker', level: 70, color: 'from-blue-400 to-cyan-500' },
        { name: 'AWS (S3, EC2)', level: 65, color: 'from-orange-500 to-yellow-400' },
        { name: 'Figma', level: 85, color: 'from-purple-500 to-pink-500' },
      ]
    }
  ];

  const otherSkills = [
    'Redux', 'Next.js', 'GraphQL', 'Firebase', 'Jest', 'Cypress',
    'Sass', 'Webpack', 'Vite', 'Nginx', 'Redis', 'Socket.io',
    'Prisma', 'TypeORM', 'JWT', 'OAuth', 'REST APIs', 'Microservices'
  ];

  const softSkills = [
    { title: 'Problem Solving', icon: <FiZap size={24} />, description: 'Analytical thinking and creative solutions' },
    { title: 'Communication', icon: <FiUsers size={24} />, description: 'Clear and effective team collaboration' },
    { title: 'Security Best Practices', icon: <FiShield size={24} />, description: 'Secure development and data protection' },
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
    <section id="skills" className="section-padding bg-gray-50 dark:bg-dark-800">
      <div className="container-custom">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            My <span className="text-gradient">Skills</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            I have a diverse skill set that spans across the full stack of web development. Here's what I bring to the table.
          </motion.p>
        </motion.div>

        <motion.div
          ref={categoriesRef}
          variants={containerVariants}
          initial="hidden"
          animate={categoriesInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card p-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary-500/10 dark:bg-primary-500/20 text-primary-500 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar key={skillIndex} {...skill} inView={categoriesInView} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={otherSkillsRef}
          variants={containerVariants}
          initial="hidden"
          animate={otherSkillsInView ? "visible" : "hidden"}
          className="mt-16"
        >
          <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Other Skills & Technologies
          </motion.h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {otherSkills.map((skill, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -4 }}
              >
                <div className="card px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300">
                  {skill}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={softSkillsRef}
          variants={containerVariants}
          initial="hidden"
          animate={softSkillsInView ? "visible" : "hidden"}
          className="mt-16"
        >
          <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Professional Skills
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {softSkills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                className="card p-6 text-center"
              >
                <div className="inline-flex p-4 bg-primary-500/10 dark:bg-primary-500/20 rounded-full text-primary-500 mb-4 transition-transform duration-300 group-hover:scale-110">
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