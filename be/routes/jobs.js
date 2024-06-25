const express = require("express");
const router = express.Router();
const Job = require("../models/Jobs");

// Route to get all job postings
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to post a new job
router.post("/", async (req, res) => {
  const job = new Job({
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    language: req.body.language,
    description: req.body.description,
    postedDate: req.body.postedDate,
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a job

// Route to edit a job

module.exports = router;
