import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiTag } from 'react-icons/fi';
import blogData from '../data/blog.json';

const ADMIN_PASSWORD = 'yourStrongPassword'; // Change this to your desired password

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [deleteBlog, setDeleteBlog] = useState(null);
  const titleRef = useRef();
  const excerptRef = useRef();
  const contentRef = useRef();
  const tagsRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    // Load posts from localStorage if available
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      setPosts(blogData);
    }
    // Check admin login state from localStorage
    const adminFlag = localStorage.getItem('isAdmin');
    if (adminFlag === 'true') setIsAdmin(true);
  }, []);

  const categories = ['All', ...new Set(posts.map(post => post.tags).flat())];
  
  const filteredPosts = posts.filter(post => {
    const matchesCategory = filter === 'All' || post.tags.includes(filter);
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Featured post: most recent by date
  const sortedPosts = [...filteredPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const featuredPost = sortedPosts[0];
  const restPosts = sortedPosts.slice(1);

  // Add/Edit Blog
  const handleSaveBlog = () => {
    const newBlog = {
      id: editBlog ? editBlog.id : Date.now(),
      title: titleRef.current.value,
      excerpt: excerptRef.current.value,
      content: contentRef.current.value,
      author: 'Sahil Khatiwada',
      date: new Date().toISOString().slice(0, 10),
      readTime: '5 min read',
      tags: tagsRef.current.value.split(',').map(t => t.trim()),
      image: imageRef.current.value || 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&h=300&fit=crop',
    };
    let updatedPosts;
    if (editBlog) {
      updatedPosts = posts.map(p => (p.id === editBlog.id ? newBlog : p));
      setPosts(updatedPosts);
    } else {
      updatedPosts = [newBlog, ...posts];
      setPosts(updatedPosts);
    }
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setShowBlogModal(false);
    setEditBlog(null);
  };

  // Delete Blog
  const handleDeleteBlog = (id) => {
    const updatedPosts = posts.filter(p => p.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setDeleteBlog(null);
    setShowBlogModal(false);
    setEditBlog(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <section className="section-padding bg-gradient-to-br from-primary-50 to-purple-50 dark:from-dark-800 dark:to-dark-900">
        <div className="container-custom">
          {/* Admin Controls */}
          <div className="flex justify-end mb-4">
            {isAdmin && (
              <button onClick={() => setShowBlogModal(true)} className="px-4 py-2 bg-green-600 text-white rounded-full font-medium shadow hover:bg-green-700 transition">Add Blog</button>
            )}
          </div>

          {/* Blog Modal */}
          {showBlogModal && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
              <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg w-full max-w-lg relative">
                <button onClick={() => { setShowBlogModal(false); setEditBlog(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl">&times;</button>
                <h2 className="text-2xl font-bold mb-4">{editBlog ? 'Edit Blog' : 'Add Blog'}</h2>
                <input ref={titleRef} defaultValue={editBlog?.title || ''} className="w-full mb-3 px-3 py-2 border rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-dark-700" placeholder="Title" />
                <input ref={excerptRef} defaultValue={editBlog?.excerpt || ''} className="w-full mb-3 px-3 py-2 border rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-dark-700" placeholder="Excerpt" />
                <textarea ref={contentRef} defaultValue={editBlog?.content || ''} className="w-full mb-3 px-3 py-2 border rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-dark-700" placeholder="Content" rows={4} />
                <input ref={tagsRef} defaultValue={editBlog?.tags?.join(', ') || ''} className="w-full mb-3 px-3 py-2 border rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-dark-700" placeholder="Tags (comma separated)" />
                <input ref={imageRef} defaultValue={editBlog?.image || ''} className="w-full mb-3 px-3 py-2 border rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-dark-700" placeholder="Image URL" />
                <button onClick={handleSaveBlog} className="w-full py-2 bg-primary-600 text-white rounded font-semibold hover:bg-primary-700 transition">Save</button>
              </div>
            </div>
          )}

          {/* Delete Confirmation */}
          {deleteBlog && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
              <div className="bg-white dark:bg-dark-800 p-8 rounded-xl shadow-lg w-full max-w-sm relative">
                <h2 className="text-xl font-bold mb-4">Delete Blog?</h2>
                <p className="mb-6">Are you sure you want to delete this blog post?</p>
                <div className="flex gap-4">
                  <button onClick={() => handleDeleteBlog(deleteBlog)} className="flex-1 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition">Delete</button>
                  <button onClick={() => setDeleteBlog(null)} className="flex-1 py-2 bg-gray-300 dark:bg-dark-700 text-gray-800 dark:text-gray-200 rounded font-semibold hover:bg-gray-400 dark:hover:bg-dark-600 transition">Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* Professional Personal Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="flex justify-center mb-4">
              <span className="text-4xl font-bold text-gradient">SK</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Welcome to <span className="text-gradient">My Blog</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hi, I'm <span className="font-semibold">Sahil Khatiwada</span> — a passionate Full Stack Developer. Here I share my journey, tutorials, and insights on web development, design, and technology. Dive in to learn, get inspired, and grow with me!
            </p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <a href="https://github.com/sahilkhatiwada" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 transition-colors text-2xl">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/sahil-khatiwada-3344621a7" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary-600 transition-colors text-2xl">
                <i className="fab fa-linkedin"></i>
              </a>
              <span className="text-sm text-gray-400 ml-2">@sahilkhatiwada</span>
            </div>
          </motion.div>

          {/* Featured Post Section with animated gradient border */}
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative group mb-16"
            >
              <div className="absolute -inset-1 rounded-2xl z-0 animate-gradient-x bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 blur-sm opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="relative card overflow-hidden rounded-2xl shadow-xl border-2 border-transparent dark:border-primary-700 z-10">
                <Link to={`/blog/${featuredPost.id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                      Featured
                    </div>
                  </div>
                </Link>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <FiCalendar size={14} />
                      <span>{formatDate(featuredPost.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock size={14} />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <Link to={`/blog/${featuredPost.id}`}>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-4 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <FiTag size={14} className="text-gray-400" />
                    <div className="flex flex-wrap gap-1">
                      {featuredPost.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-primary-100 to-purple-100 dark:from-dark-700 dark:to-dark-800 text-gray-700 dark:text-gray-300 text-xs rounded-full shadow-sm animate-fade-in"
                        >
                          <FiTag size={12} className="text-primary-400" /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-base transition-colors duration-300"
                  >
                    Read Full Post →
                  </Link>
                </div>
              </div>
            </motion.article>
          )}

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96 -mt-2">
                <motion.input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  whileFocus={{
                    boxShadow: '0 4px 24px 0 rgba(80,0,200,0.10)',
                    borderColor: '#a78bfa',
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-200 dark:border-dark-600 rounded-full focus:ring-2 focus:ring-primary-400 focus:border-primary-500 bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 transition-all duration-300 shadow-sm focus:shadow-lg"
                />
                <motion.div
                  className="absolute left-4 top-1/2 -translate-y-1/2 -mt-1 text-gray-400 pointer-events-none flex items-center"
                  animate={searchTerm ? { x: 4, color: '#a78bfa' } : { x: 0, color: '#9ca3af' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </motion.div>
              </div>

              {/* Category Filter with animation */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.1, backgroundColor: '#a78bfa', color: '#fff' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      filter === category
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-600'
                    }`}
                  >
                    <FiTag className="inline-block mr-1 text-primary-400" />
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Blog Posts Grid (excluding featured) with card hover effects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {restPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -10, scale: 1.03, boxShadow: '0 8px 32px rgba(80,0,200,0.12)' }}
                className="card overflow-hidden group transition-transform duration-300 rounded-2xl relative"
              >
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2 z-20">
                    <button onClick={() => { setEditBlog(post); setShowBlogModal(true); }} className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs">Edit</button>
                    <button onClick={() => setDeleteBlog(post.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">Delete</button>
                  </div>
                )}
                <Link to={`/blog/${post.id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <FiCalendar size={14} />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Link to={`/blog/${post.id}`}>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiTag size={14} className="text-gray-400" />
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-primary-100 to-purple-100 dark:from-dark-700 dark:to-dark-800 text-gray-700 dark:text-gray-300 text-xs rounded-full shadow-sm animate-fade-in"
                          >
                            <FiTag size={12} className="text-primary-400" /> {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      to={`/blog/${post.id}`}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors duration-300"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {restPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                No posts found matching your criteria.
              </div>
              <div className="text-gray-400 text-base">
                Try a different search or visit my <a href="https://github.com/sahilkhatiwada" className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">GitHub</a> for more projects and content!
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Blog; 