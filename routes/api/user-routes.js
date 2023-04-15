// ! We'll be using a different patter here but it works the same as what you already know

const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} = require("../../controllers/user-controller");

// /api/users
router.route("/").get(getUsers).post(createUser);

router.route("/login").post(loginUser);

// /api/users/:userId
// ! This pattern allows us to write multiple methods without duplicating the route
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
// This could also be written as:
// router.get("/:userId", getSingleUser);
// &
// router.put("/:userId", updateUser);
// &
// router.delete("/:userId", deleteUser);

router.route("/logout").post(logoutUser);

module.exports = router;
