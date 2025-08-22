const express = require("express");
const router = express.Router();
const { protect } = require("../middleware");
const {
  updateUserInput,
  changePasswordInput,
} = require("../../types/zodTypes");
const User = require("../models/user");

router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

router.put("/me", protect, async (req, res) => {
  const body = req.body;
  const { success } = updateUserInput.safeParse(body);
  if (!success) {
    return res.status(400).json({ msg: "Incorrect inputs." });
  }

  try {
    const user = req.user;
    if (body.email) {
      const isInvalidEmail = await User.findOne({
        email: body.email,
        _id: { $ne: user._id },
      });
      if (isInvalidEmail) {
        return res.status(400).json({ msg: "Email already in use." });
      }

      user.email = body.email;
    }

    if (body.name) user.name = body.name;

    const updatedUser = await user.save();
    return res.status(200).json({ msg: "User updated", updatedUser });
  } catch (e) {
    return res.status(500).json({ msg: "Server error when updating the user" });
  }
});

router.put("/change-password", protect, async (req, res) => {
  const body = req.body;
  const { success } = changePasswordInput.safeParse(body);
  if (!success) {
    return res.status(400).json({ msg: "Incorrect inputs." });
  }

  try {
    const user = await User.findById(req.user._id);
    const isMatch = await user.comparePassword(body.currentPassword);
    if (!isMatch) {
      return res.status(401).json({ msg: "Current password is incorrect." });
    }

    if (body.newPassword !== body.confirmNewPassword) {
      return res.status(400).json({ msg: "New passwords do not match." });
    }

    user.password = body.newPassword;
    await user.save();
    return res.status(200).json({ msg: "Password changed successfully." });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Server error when changing password" });
  }
});
module.exports = router;
