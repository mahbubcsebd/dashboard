const { validationResult } = require('express-validator');
const Blog = require('../models/blogModel');
const slugify = require('slugify'); // You can use a library like slugify to generate slugs

// Create a new post
exports.createBlog = async (req, res) => {
    try {
        const { title, body, author, summary, readingTime, tags, categories } = req.body;

        const newBlog = new Blog({
            title,
            slug: slugify(title.toLowerCase()), // Assuming you have a slugify function
            summary: summary.substring(0, 100),
            body,
            author,
            readingTime,
            tags,
            categories,
        });

        await newBlog.save(); // This will trigger the slug and summary creation

        res.status(201).json({
            message: 'Blog created successfully',
            blog: newBlog,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error creating blog' });
    }
};

// update blog
exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params; // Get the blog ID from the URL parameters
        const { title, body, author, summary, readingTime, tags, categories } =
            req.body;

        // Find the blog by ID and update its fields
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            {
                title,
                slug: slugify(title.toLowerCase()), // Assuming you have a slugify function
                summary: summary.substring(0, 100), // Limit summary to 100 characters
                body,
                author,
                readingTime,
                tags,
                categories,
            },
            { new: true } // Return the updated blog document
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({
            message: 'Blog updated successfully',
            blog: updatedBlog,
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ error: 'Error updating blog' });
    }
};


// Get all posts
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().select('_id title slug author summary readingTime').lean();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// get single blog by slug
exports.getBlogBySlug = async (req, res) => {
    const { slug }  = req.params; // Assuming you're passing the slug as a route parameter
    try {
        const blog = await Blog.findOne({ slug }).lean(); // Use the slug to find the blog post
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};