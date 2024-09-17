const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

// Controller to render the homepage
exports.getHomepage = async (req, res) => {
  try {
    // Fetch all posts with the associated User information
    const postsData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']], // Optional: Order posts by newest first
    });

    const posts = postsData.map((post) => post.get({ plain: true }));

    // Render the homepage view with posts data and session information
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn, // Pass session status to view
    });
  } catch (err) {
    console.error('Error in getHomepage:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to render a specific post by ID
exports.getPostById = async (req, res) => {
  try {
    // Fetch a single post by primary key with associated User and Comments
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
      ],
    });

    if (!postData) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const post = postData.get({ plain: true });

    // Render the post view with the post data
    res.render('post', {
      post,
      loggedIn: req.session.loggedIn, // Pass session status to view
    });
  } catch (err) {
    console.error('Error in getPostById:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to create a new post
exports.createPost = async (req, res) => {
  try {
    // Ensure the user is logged in before creating a post
    if (!req.session.loggedIn) {
      return res.redirect('/auth/login');
    }

    await Post.create({
      ...req.body,
      user_id: req.session.user_id, // Use the logged-in user's ID
    });

    // Redirect back to the dashboard after post creation
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error in createPost:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to add a new comment to a post
exports.addComment = async (req, res) => {
  try {
    // Ensure the user is logged in before adding a comment
    if (!req.session.loggedIn) {
      return res.redirect('/auth/login');
    }

    await Comment.create({
      content: req.body.content, // Explicitly reference the comment content
      user_id: req.session.user_id, // Use the logged-in user's ID
      post_id: req.params.id, // Attach the comment to the correct post
    });

    // Redirect back to the post after adding the comment
    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    console.error('Error in addComment:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
