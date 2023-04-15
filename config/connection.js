// const Sequelize = require('sequelize');

// require('dotenv').config();

// // create connection to our db
// const sequelize = process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
//   });

// module.exports = sequelize;

// !⬆️ Sequelize connection example ⬇️ Mongoose connection
const mongoose = require("mongoose");

// Wrap Mongoose around local connection to MongoDB
// Unlike Sequelize, Mongoose does not require a database to be created first instead it will be created on connection if it does not exist
// The connection string can also be written as "mongodb://localhost:27017/demo_db" for some
mongoose.connect("mongodb://127.0.0.1:27017/demo_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;
