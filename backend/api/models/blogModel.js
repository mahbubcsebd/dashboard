const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        summary: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        readingTime: {
            type: String, // Example: "5 min read"
            required: true,
        },
        tags: {
            type: [String], // Array of tags
            required: true,
        },
        categories: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false }
);

// Pre-save hook to generate slug and summary
// blogSchema.pre('save', function (next) {
//     // Slugify the title
//     if (this.title) {
//         this.slug = slugify(this.title, { lower: true, strict: true });
//     }

//     // Create summary from body (first 100 characters)
//     if (this.body && !this.summary) {
//         this.summary = this.body.substring(0, 100) + '...';
//     }

//     next();
// });

module.exports = mongoose.model('Blog', blogSchema);
