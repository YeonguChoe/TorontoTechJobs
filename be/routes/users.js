const express = require("express");
const router = express.Router();

// Temporary data store (in-memory)
let userLists = [];

// Route to get all user information
router.get("/", (req, res) => {
  res.json(userLists);
});

// Route to create a new user
router.post("/", (req, res) => {
  const user = req.body;
  userLists.push(user);
  res.status(201).json(user);
});

// Route to delete a user (?)

// Route to edit a user information

module.exports = router;
