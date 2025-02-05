const express = require("express");
const {
  register,
  login,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getUsers);
router.post("/", createUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;
