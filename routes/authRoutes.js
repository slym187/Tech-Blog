// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup and login routes
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', authController.signup);
router.get('/login', (req, res) => res.render('login'));
router.post('/login', authController.login);

// POST route for logout
router.post('/logout', authController.logout);

module.exports = router;
