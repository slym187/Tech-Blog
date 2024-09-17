const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.user_id = newUser.id;
    req.session.loggedIn = true;  // Set loggedIn flag
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error in signup:', err);
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user || !user.checkPassword(req.body.password)) {
      res.status(400).send('Incorrect username or password');
      return;
    }

    req.session.user_id = user.id;
    req.session.loggedIn = true;  // Set loggedIn flag
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json(err);
  }
};

// Logout function: Redirect to the homepage after logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Failed to log out' });
    }
    // Redirect to the homepage after logout
    res.redirect('/');
  });
};