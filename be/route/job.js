const express = require("express");
const router = express.Router();
const Job = require("../model/Job");

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
  valication.check();
  const job = new Job({
    title: req.body.title,
    company_name: req.body.company_name,
    location: req.body.location,
    job_type: req.body.job_type,
    description: req.body.description,
    posted_date: req.body.posted_date,
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

// Route to get a job by company_name
router.get("/filter", async (req, res) => {
  try {
    // passing form: company_name=companyname
    const { company_name } = req.query; // Get the company_name from the query parameters

    if (!company_name) {
      return res
        .status(400)
        .json({ message: "company_name query parameter is required" });
    }

    const jobs = await Job.find({ company_name: company_name });
    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for the specified company_name" });
    }

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a job by job_type
router.get("/filter", async (req, res) => {
  try {
    // passing form: job_type=frontend
    const { job_type } = req.query; // Get the job_type from the query parameters

    if (!job_type) {
      return res
        .status(400)
        .json({ message: "job_type query parameter is required" });
    }

    const jobs = await Job.find({ job_type: job_type });
    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for the specified job_type" });
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
