const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // Ensure this matches your database type
    port: process.env.DB_PORT,
    logging: console.log, // Enable Sequelize logging for debugging
  }
);

module.exports = sequelize;
