// middleware/auth.js
module.exports = (req, res, next) => {
    // Check if the user is logged in by verifying the session
    if (req.session && req.session.loggedIn) {
      // User is authenticated; proceed to the next middleware or route handler
      return next();
    } else {
      // User is not authenticated; redirect to the login page
      res.redirect('/auth/login');
    }
  };
  