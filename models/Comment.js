// models/Comment.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',  // Correct table name: 'users'
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',  // Correct table name: 'posts'
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'comment',  // Model name
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
    underscored: true,     // Use snake_case column names
    timestamps: true,      // Enable timestamps (createdAt, updatedAt)
  }
);

module.exports = Comment;
