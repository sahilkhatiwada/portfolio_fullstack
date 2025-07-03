import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock, FiTag, FiShare2 } from 'react-icons/fi';
import blogData from '../data/blog.json';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const foundPost = blogData.find(p => p.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);
      // Get related posts (same tags, excluding current post)
      const related = blogData
        .filter(p => p.id !== parseInt(id) && p.tags.some(tag => foundPost.tags.includes(tag)))
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!post) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20 section-padding">
        <div className="container-custom text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Post not found</h1>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </motion.div>
    );
  }

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const fadeStagger = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 }
    })
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <motion.section
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative h-96 md:h-[500px] overflow-hidden"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover scale-105 motion-safe:animate-zoom"
        />
        <motion.div className="absolute inset-0 bg-black/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <motion.div
              variants={fadeStagger}
              custom={1}
              initial="hidden"
              animate="visible"
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <FiCalendar size={16} />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiClock size={16} />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>By {post.author}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-white/90 max-w-3xl">
                {post.excerpt}
              </p>
            </motion.div>
          </div>
        </div>
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => navigate('/blog')}
          className="absolute top-8 left-8 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-300"
        >
          <FiArrowLeft size={24} />
        </motion.button>
      </motion.section>

      {/* Content Section */}
      <section className="section-padding bg-white dark:bg-dark-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            <motion.div
              variants={fadeStagger}
              custom={2}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-2 mb-8"
            >
              <FiTag size={20} className="text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    variants={fadeStagger}
                    custom={2.1 + index * 0.1}
                    initial="hidden"
                    animate="visible"
                    className="px-3 py-1 bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Share Button */}
            <motion.div
              variants={fadeStagger}
              custom={2.5}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <button
                onClick={sharePost}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300"
              >
                <FiShare2 size={16} />
                Share this post
              </button>
            </motion.div>

            {/* Article Content */}
            <motion.article
              variants={fadeStagger}
              custom={3}
              initial="hidden"
              animate="visible"
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
                <p>
                  {post.content}
                </p>
                
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                
                <h2>Key Takeaways</h2>
                <ul>
                  <li>Understanding the fundamentals of React and TypeScript</li>
                  <li>Best practices for building scalable applications</li>
                  <li>Performance optimization techniques</li>
                  <li>Testing strategies for robust code</li>
                </ul>
                
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                
                <blockquote className="border-l-4 border-primary-500 pl-6 italic text-gray-600 dark:text-gray-400">
                  "The best code is the code that is easy to read, understand, and maintain. Always prioritize clarity over cleverness."
                </blockquote>
                
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>
            </motion.article>

            {/* Author Info */}
            <motion.div
              variants={fadeStagger}
              custom={3.5}
              initial="hidden"
              animate="visible"
              className="mt-12 flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {post.author}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Full Stack Developer passionate about creating amazing digital experiences.
                </p>
              </div>
            </motion.div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.div
                variants={fadeStagger}
                custom={4}
                initial="hidden"
                animate="visible"
                className="mt-16"
              >
                <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {relatedPosts.map((rel, idx) => (
                    <motion.div
                      key={rel.id}
                      whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(80,0,200,0.10)' }}
                      className="card overflow-hidden group transition-transform duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * idx, duration: 0.6 }}
                    >
                      <Link to={`/blog/${rel.id}`}>
                        <img src={rel.image} alt={rel.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="p-4">
                          <h4 className="text-lg font-bold mb-2 group-hover:text-primary-600 transition-colors duration-300">{rel.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{rel.excerpt}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <FiCalendar /> {formatDate(rel.date)}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPost; 