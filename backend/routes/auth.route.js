const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchuser = require("../middlewares/fetchuser.middleware");
const {
  createUser,
  loginUser,
  getUserDetails,
} = require("../controllers/auth.controller");

// Route 1: Create user / SignUp
router.post(
  "/createuser",
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be atleast 5 characters").isLength({
    min: 5,
  }),
  createUser
);

// Route 2: Login
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  loginUser
);

router.post("/getuser", fetchuser, getUserDetails);

module.exports = router;
