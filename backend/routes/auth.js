const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
require("dotenv").config();

const JWT_SECRET = process.env.SECRET;

// Route 1: Create user / SignUp
router.post(
  "/createuser",
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be atleast 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, msg: errors.array() });
    }
    try {
      // Check whether the user with the email exists already
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({
          success: false,
          msg: "Sorry a user with this email already exists!",
        });
      }

      // Create a salt to protect the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      // Create authtoken
      const authtoken = jwt.sign(data, JWT_SECRET);

      const response = {
        success: true,
        authtoken,
        msg: "You have signed up successfully!",
      };

      // Send the authtoken as a response
      res.status(200).json(response);
    } catch (error) {
      // If some error occurs, display the errors
      console.log(error.message);
      res.status(500).send({ success: false, msg: "Internal server error" });
    }
  }
);

// Route 2: Login
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, msg: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, msg: "Enter correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success: false, msg: "Enter correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      const response = {
        success: true,
        authtoken,
        msg: "You have logged in successfully!",
      };

      res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ success: false, msg: "Internal server error" });
    }
  }
);

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (user) {
      res.status(200).json({ success: true, user: user });
    } else {
      res.status(404).json({ success: false, msg: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal error server!");
  }
});

module.exports = router;
