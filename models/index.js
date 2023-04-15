// const User = require('./User');
// const Post = require('./Post');
// const Comment = require('./Comment');

// Post.belongsTo(User, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE'
// });

// Post.hasMany(Comment, {
//   foreignKey: 'postId',
//   onDelete: 'CASCADE'
// });

// Comment.belongsTo(User, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE'
// });

// module.exports = {
//   User,
//   Comment,
//   Post
// };
// !⬆️ Sequelize Associations ⬇️ Mongoose doesn't need these :D

const User = require("./User");
const Peep = require("./Post");
const Comment = require("./Comment");
module.exports = { User, Peep, Comment };
