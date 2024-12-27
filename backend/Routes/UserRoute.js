const express = require("express");
const User = require("../models/User"); // Adjust the path to match your file structure
const router = express.Router();

// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "username"); // Fetch all users, only include the `username` field
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
