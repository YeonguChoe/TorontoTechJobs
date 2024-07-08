const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Route to get all job postings
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
    console.log("Received the list of the job postings");
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
    jobType: req.body.jobType,
    description: req.body.description,
    postedDate: req.body.postedDate,
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
    console.log("Posted a new job");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a job
router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    await Job.deleteOne({ _id: req.params.id });
    res.json({ message: "Job deleted successfully" });
    console.log("Removed job#: " + req.params.id);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a job by jobType
router.get("/filter", async (req, res) => {
  try {
    // passing form: jobType=Frontend
    const { jobType } = req.query; // Get the jobType from the query parameters

    if (!jobType) {
      return res
        .status(400)
        .json({ message: "jobType query parameter is required" });
    }

    const jobs = await Job.find({ jobType: jobType });
    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for the specified jobType" });
    }

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update a job
router.patch("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    Object.keys(req.body).forEach((key) => {
      job[key] = req.body[key];
    });

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
