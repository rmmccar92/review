const { User, Thought } = require("../models");
// In this pattern we've separated the controller methods into their own object these will be
// exported and used in the routes.
const userController = {
  // get all users
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    console.log(req.body);
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete user (BONUS: and delete associated thoughts)
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }

        // BONUS: get ids of user's `thoughts` and delete them all
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and associated thoughts deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  loginUser(req, res) {
    User.findOne({ username: req.body.username })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(400)
            .json({ message: "No user with that email address!" });
        }

        // Verify user
        const validPassword = dbUserData.comparePassword(req.body.password);

        if (!validPassword) {
          return res.status(400).json({ message: "Incorrect password!" });
        }
        req.session.save(() => {
          req.session.user_id = dbUserData._id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
          // console.log("Login user", req.session.username);
          res.json({ user: dbUserData, message: "You are now logged in!" });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  logoutUser(req, res) {
    console.log("Logout user", req.session.username);
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },
};
// Congratulations you found the secret comment :D
module.exports = userController;
