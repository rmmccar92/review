// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/config');

// class Peep extends Model { }

// Peep.init(
//   {
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     body: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//   }
// );

// module.exports = Peep;

// !⬆️ Sequelize Peep Model ⬇️ Mongoose Peep Model

const { Schema, model } = require("mongoose");

const peepSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
});

const Peep = model("Peep", peepSchema);

module.exports = Peep;
