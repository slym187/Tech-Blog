// models/Post.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',  // Correct table name: 'users'
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'post',
    tableName: 'posts' // This explicitly defines the table name
  }
);

module.exports = Post;
