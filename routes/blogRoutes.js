// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Route to render the homepage
router.get('/', blogController.getHomepage);

// Route to view a single post and its comments
router.get('/post/:id', blogController.getPostById);

// Route to add a new comment to a post
router.post('/post/:id/comment', blogController.addComment);

// Route to create a new post from the dashboard
router.post('/dashboard/new', blogController.createPost);

module.exports = router;
