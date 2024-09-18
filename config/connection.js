const Sequelize = require('sequelize');
require('dotenv').config();

// Use DATABASE_URL from environment variables for production
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // Ensure this matches your database type
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Enforce SSL connection
      rejectUnauthorized: false, // Accept self-signed certificates
    },
  },
  logging: console.log, // Enable Sequelize logging for debugging
});

module.exports = sequelize;

