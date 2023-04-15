// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/config');

// class Comment extends Model {}

// Comment.init(
//   {
//     body: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       min: 1,
//       max: 500
//     }
//   },
//   {
//     sequelize
//   }
// );

// module.exports = Comment;

// !⬆️ Sequelize Comment Model ⬇️ Mongoose Comment Model

const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 500,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
