const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

// User registration route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, linkedinID } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        message: "User already exists. Please try with different email.",
      });

    user = new User({ username, email, password, linkedinID });
    await user.save();

    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

    res.status(201).json({ token, user: payload });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Invalid credentials - wrong email" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid credentials - wrong password" });

    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

    res.json({ token, user: payload });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user information
router.patch("/update", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    updates.forEach((update) => (user[update] = req.body[update]));

    // If password is being updated, hash it before saving
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
