// const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
// const sequelize = require('../config/config');

// // create our User model
// class User extends Model {
//   // set up method to run on instance data (per user) to check password
//   checkPassword(loginPw) {
//     return bcrypt.compareSync(loginPw, this.password);
//   }
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [4]
//       }
//     }
//   },
//   {
//     hooks: {
//       // set up beforeCreate lifecycle "hook" functionality
//       beforeCreate: async (newUserData) => {
//         newUserData.password = await bcrypt.hash(newUserData.password, 10);
//         return newUserData;
//       },
//       beforeUpdate: async (updatedUserData) => {
//         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
//         return updatedUserData;
//       }
//     },
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'User'
//   }
// );

// module.exports = User;

// !⬆️ Sequelize User Model ⬇️ Mongoose User Model

const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    peeps: [
      {
        type: Schema.Types.ObjectId,
        ref: "Peep",
      },
    ],
    // comments: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Comment",
    // },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    // salt adds random variations to make the hash more secure
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// This isn't really needed but it shows how to add a virtual property to a model.
// In this case we're performing an action to return the post count rather than storing it in the db.
// This was causing an issue don't have time to fix right now
// userSchema.virtual("postCount").get(function () {
//   return this.peeps.length || 0;
// });

const User = model("User", userSchema);

module.exports = User;
