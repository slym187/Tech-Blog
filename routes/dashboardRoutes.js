// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// GET route for the dashboard page                 
router.get('/', dashboardController.getDashboard);

// GET route to edit an existing post
router.get('/edit/:id', dashboardController.getEditPost);

// POST route to update the post
router.post('/edit/:id', dashboardController.updatePost);

// POST route to create a new post
router.post('/new', dashboardController.createPost);

// GET route to render the add comment page
router.get('/post/:postId/comment', dashboardController.renderAddComment);

// POST route to handle the comment submission
router.post('/post/:postId/comment', dashboardController.addComment);

module.exports = router;
