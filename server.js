const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const authRoutes = require('./routes/authRoutes'); // Import the auth routes
const blogRoutes = require('./routes/blogRoutes'); // Import other routes
const dashboardRoutes = require('./routes/dashboardRoutes'); // Import dashboard routes

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
    }),
    cookie: {
      maxAge: 300000, // Session expiration time in milliseconds
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: 'lax', // Helps with CSRF protection
    },
  }) // Corrected: added closing parenthesis here
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/auth', authRoutes); // Use the auth routes
app.use('/', blogRoutes); // Use the blog routes
app.use('/dashboard', dashboardRoutes); // Use the dashboard routes

// Synchronize all models with the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
