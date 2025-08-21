const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { registerInput, signinInput } = require("../../types/zodTypes");
const User = require("../models/user");

const generateJwt = (userId) => {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

router.post("/register", async (req, res) => {
  const body = req.body;
  const { success } = registerInput.safeParse(body);
  if (!success) {
    return res.status(411).json({ msg: "Incorrect inputs." });
  }
  try {
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with this email already exists." });
    }

    const newUser = new User(body);
    await newUser.save();

    const jwt = generateJwt(newUser._id);
    res.status(200).json({
      msg: "User created successfully",
      token: "Bearer " + jwt,
      user: {
        _id: newUser._id,
        name: newUser.name,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Server error while registration.", error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinInput.safeParse(body);
  if (!success) {
    return res.status(411).json({ msg: "Incorrect inputs." });
  }

  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(403).json({ msg: "Incorrect email. User not found." });
    }

    const isPasswordValid = await user.comparePassword(body.password);
    if (!isPasswordValid) {
      return res.status(403).json({ msg: "Invalid password." });
    }

    const jwt = generateJwt(user._id);
    res.status(200).json({
      msg: "Signed in successfully",
      token: "Bearer " + jwt,
      user: {
        _id: user._id,
        name: user.name,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Server error during sign in.", error: error.message });
  }
});

module.exports = router;
