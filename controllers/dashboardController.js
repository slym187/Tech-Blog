// controllers/dashboardController.js
const { Post, User, Comment } = require('../models');

exports.getDashboard = async (req, res) => {
  try {
    // Fetch posts belonging to the logged-in user
    const postsData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }, { model: Comment, include: [User] }],
    });

    const posts = postsData.map((post) => post.get({ plain: true }));

    res.render('dashboard', { posts, loggedIn: true }); // Render the dashboard view
  } catch (err) {
    console.error("Error in getDashboard:", err); // Log the error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    // Create a new post with the data from the form
    await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id, // Use the logged-in user's ID
    });

    res.redirect('/dashboard');
  } catch (err) {
    console.error("Error in createPost:", err); // Log the error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getEditPost = async (req, res) => {
  try {
    // Find the post by ID
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    res.render('editPost', { post: post.get({ plain: true }), loggedIn: true });
  } catch (err) {
    console.error("Error in getEditPost:", err); // Log the error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    // Update the post with the new data
    await Post.update(
      { title: req.body.title, content: req.body.content },
      { where: { id: req.params.id } }
    );

    res.redirect('/dashboard');
  } catch (err) {
    console.error("Error in updatePost:", err); // Log the error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to render the 'Add Comment' page
exports.renderAddComment = (req, res) => {
  const postId = req.params.postId;
  res.render('comment', { postId }); // Render the comment form view
};

exports.addComment = async (req, res) => {
  try {
    const postId = req.params.postId;

    await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id, // Get the logged-in user's ID
      post_id: postId, // Attach the comment to the specific post
    });

    res.redirect('/dashboard'); // Redirect back to the dashboard
  } catch (err) {
    console.error('Error in addComment:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
