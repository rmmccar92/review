// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection.js');

// class Peep extends Model { }
// Peep.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     title: DataTypes.STRING,
//     first: DataTypes.STRING,
//     last: DataTypes.STRING,
//     city: DataTypes.STRING,
//     state: DataTypes.STRING,
//     country: DataTypes.STRING,
//     postcode: DataTypes.STRING,
//     number: DataTypes.INTEGER,
//     name: DataTypes.STRING,
//     gender: DataTypes.STRING,
//     email: DataTypes.STRING,
//     phone: DataTypes.STRING,
//     cell: DataTypes.STRING,
//     nat: DataTypes.STRING,
//     latitude: DataTypes.STRING,
//     longitude: DataTypes.STRING,
//     offset: DataTypes.STRING,
//     description: DataTypes.STRING,
//     uuid: DataTypes.STRING,
//     username: DataTypes.STRING,
//     password: DataTypes.STRING,
//     salt: DataTypes.STRING,
//     md5: DataTypes.STRING,
//     sha1: DataTypes.STRING,
//     sha256: DataTypes.STRING,
//     date: DataTypes.STRING,
//     age: DataTypes.INTEGER,
//     large: DataTypes.STRING,
//     medium: DataTypes.STRING,
//     thumbnail: DataTypes.STRING,

//   },
//   {
//     sequelize,
//     modelName: 'peep'
//   }
// );

// module.exports = Peep;
// !⬆️ Sequelize Peep Model ⬇️ Mongoose Peep Model

const { Schema, model } = require("mongoose");

const peepSchema = new Schema({
  title: String,
  first: String,
  last: String,
  city: String,
  state: String,
  country: String,
  postcode: String,
  number: Number,
  name: String,
  gender: String,
  email: String,
  phone: String,
  cell: String,
  nat: String,
  latitude: String,
  longitude: String,
  offset: String,
  description: String,
  uuid: String,
  username: String,
  password: String,
  salt: String,
  md5: String,
  sha1: String,
  sha256: String,
  date: String,
  age: Number,
  large: String,
  medium: String,
  thumbnail: String,
});

const Peep = model("Peep", peepSchema);

module.exports = Peep;
