const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { registerInput, signinInput } = require("../../types/zodTypes");
const User = require("../models/user");

const generateRefreshToken = (userId) => {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const generateAccessToken = (userId) => {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const sendRefreshToken = (res, token) => {
  res.cookie("jid", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
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

    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);
    sendRefreshToken(res, refreshToken);

    res.status(200).json({
      msg: "User created successfully",
      accessToken,
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

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    sendRefreshToken(res, refreshToken);

    res.status(200).json({
      msg: "Signed in successfully",
      accessToken,
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

router.post("/refresh", async (req, res) => {
  const token = req.cookies.jid;
  if (!token) {
    return res.status(401).json({ accessToken: "" });
  }

  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(403).json({ accessToken: "" });
    }
    const accessToken = generateAccessToken(user._id);
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(403).json({ accessToken: "" });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("jid", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/refresh",
    expires: new Date(0),
  });
  return res.status(200).json({ msg: "Logged out successfully" });
});

module.exports = router;
