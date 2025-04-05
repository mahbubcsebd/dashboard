// routes/postRoutes.js
const express = require('express');
const { getBlogs, createBlog, getBlogBySlug, deleteBlog, updateBlog } = require('../controllers/BlogController');
const router = express.Router();

// Create a blog
router.post('/', createBlog);

// update blog
router.put('/:id', updateBlog);

// Get all blogs
router.get('/', getBlogs);

// get blog details by slug
router.get('/:slug', getBlogBySlug);

router.delete('/:id', deleteBlog);


module.exports = router;
