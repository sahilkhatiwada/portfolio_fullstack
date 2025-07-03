import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter, 
  FiSend, FiCheck, FiAlertCircle, FiLoader
} from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const contactInfo = [
    {
      icon: <FiMail size={20} />,
      title: 'Email',
      value: 'sahilkhatiwadad@hotmail.com',
      link: 'mailto:sahilkhatiwadad@hotmail.com'
    },
    {
      icon: <FiPhone size={20} />,
      title: 'Phone',
      value: '+977 9768400837',
      link: 'tel:+9779768400837'
    },
    {
      icon: <FiMapPin size={20} />,
      title: 'Location',
      value: 'Itahari, Nepal',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <FiGithub size={20} />,
      name: 'GitHub',
      url: 'https://github.com/sahilkhatiwada',
    },
    {
      icon: <FiLinkedin size={20} />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sahil-khatiwada-3344621a7/',
    },
    {
      icon: <FiTwitter size={20} />,
      name: 'Twitter',
      url: 'https://twitter.com/username',
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    // Construct mailto link
    const mailto = `mailto:sahilkhatiwadad@hotmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailto;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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
        damping: 12
      },
    },
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Get In <span className="text-gradient">Touch</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
          <motion.div 
            className="lg:col-span-2 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-3 bg-primary-500/10 dark:bg-primary-500/20 text-primary-500 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {info.title}
                      </h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:text-white hover:bg-primary-600 transition-all"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:col-span-3"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="card p-6 sm:p-8">
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="input-label">Your Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="input-field" placeholder="sahil khatiwada" />
                    {errors.name && <p className="input-error">{errors.name}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="input-label">Your Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="sahilkhatiwadad@hotmail.com" />
                    {errors.email && <p className="input-error">{errors.email}</p>}
                  </div>
                </div>
                <div className="mt-6">
                  <label htmlFor="subject" className="input-label">Subject</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="input-field" placeholder="Regarding a job opportunity" />
                  {errors.subject && <p className="input-error">{errors.subject}</p>}
                </div>
                <div className="mt-6">
                  <label htmlFor="message" className="input-label">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="input-field" rows="5" placeholder="Your message..."></textarea>
                  {errors.message && <p className="input-error">{errors.message}</p>}
                </div>
                <div className="mt-6 text-right">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <FiSend />
                    <span>Send Message</span>
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 