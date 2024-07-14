const express = require("express");
const router = express.Router();
const {query, body, param, validationResult} = require("express-validator");
const Job = require("../model/Job");
const jwt = require("jsonwebtoken");
const Company = require("../model/Company");

// Route to get all job postings
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
        console.log("Received the list of the job postings");
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Route to post a new job
router.post(
    "/",
    [
        body("title").isString().withMessage("Title must be a string"),
        body("company_name")
            .isString()
            .withMessage("Company_name must be a string"),
        body("location").isString().withMessage("Location must be a string"),
        body("job_type")
            .isIn(["frontend", "backend", "fullstack", "mobile", "machine learning"])
            .isString()
            .withMessage("job_type must be a string"),
        body("description").isString().withMessage("description must be a string"),
    ],
    async (req, res) => {

        const job = new Job({
            title: req.body.title,
            company_name: req.body.company_name,
            location: req.body.location,
            job_type: req.body.job_type,
            description: req.body.description,
            posted_date: req.body.posted_date,
        });

        try {
            req.headers.authorization = req.headers.authorization.replace("Bearer ", "");
            jwt.verify(req.headers.authorization, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    console.error('Company verification failed: ', err);
                } else {
                    const newJob = job.save();
                    res.status(201).json(job);
                }
            })
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
);

// Route to delete a job
router.delete(
    "/:id",
    [param("id").isMongoId().withMessage("Invalid job ID")],
    async (req, res) => {
        req.headers.authorization = req.headers.authorization.replace("Bearer ", "");
        jwt.verify(req.headers.authorization, process.env.SECRET_KEY, async (err, decoded) => {
                try {
                    const job = await Job.findById(req.params.id);
                    if (!job) return res.status(404).json({message: "Job not found"});

                    await Job.deleteOne({_id: req.params.id});
                    res.json({message: "Job deleted successfully"});
                    console.log("Removed job#: " + req.params.id);
                } catch (err) {
                    res.status(500).json({message: err.message});
                }
            }
        )
    }
)
;

// Route to get a job by company_name
router.get(
    "/filter-by-company-name",
    [
        query("company_name")
            .exists()
            .withMessage("company_name query parameter is required")
            .withMessage("Invalid company_name"),
    ],
    async (req, res) => {

        req.headers.authorization = req.headers.authorization.replace("Bearer ", "");
        jwt.verify(req.headers.authorization, process.env.SECRET_KEY, async (err, decoded) => {
            try {
                const {company_name} = req.query; // Get the company_name from the query parameters
                if (!company_name) {
                    return res
                        .status(400)
                        .json({message: "company_name query parameter is required"});
                }
                const jobs = await Job.find({company_name: company_name});
                if (jobs.length === 0) {
                    return res
                        .status(404)
                        .json({message: "No jobs found for the specified company_name"});
                }
                res.json(jobs);
            } catch (err) {
                res.status(500).json({message: err.message});
            }
        })
    }
);

// Route to get a job by job_type
router.get(
    "/filter-by-job-type",
    [
        query("job_type")
            .exists()
            .withMessage("job_type query parameter is required")
            .isIn(["frontend", "backend", "fullstack", "mobile", "machine learning"])
            .withMessage("Invalid job_type"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try {
            // passing form: job_type=frontend
            const {job_type} = req.query; // Get the job_type from the query parameters

            if (!job_type) {
                return res
                    .status(400)
                    .json({message: "job_type query parameter is required"});
            }

            const jobs = await Job.find({job_type: job_type});
            if (jobs.length === 0) {
                return res
                    .status(404)
                    .json({message: "No jobs found for the specified job_type"});
            }

            res.json(jobs);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
);

// Route to get a job by ID
router.get(
    "/:id",
    [param("id").isMongoId().withMessage("Invalid job ID")],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try {
            let job = await Job.findById(req.params.id);
            if (!job) {
                return res.status(404).json({message: "Job not found"});
            }

            let company = await Company.findOne({company_name: job.company_name});
            let jobCopy = JSON.parse(JSON.stringify(job));
            jobCopy.email = company.email;
            res.json(jobCopy);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
);

// Route to update a job
router.patch(
    "/:id",
    [
        param("id").isMongoId().withMessage("Invalid job ID"),
        body("title").optional().isString().withMessage("Title must be a string"),
        body("company")
            .optional()
            .isString()
            .withMessage("Company must be a string"),
        body("location")
            .optional()
            .isString()
            .withMessage("Location must be a string"),
        body("job_type")
            .optional()
            .isIn(["frontend", "backend", "fullstack", "mobile", "machine learning"])
            .withMessage("Invalid job type"),
        body("description")
            .optional()
            .isString()
            .withMessage("Description must be a string"),
    ],
    async (req, res) => {
        req.headers.authorization = req.headers.authorization.replace("Bearer ", "");
        jwt.verify(req.headers.authorization, process.env.SECRET_KEY, async (err, decoded) => {
            try {
                const job = await Job.findById(req.params.id);
                if (!job) return res.status(404).json({message: "Job not found"});

                Object.keys(req.body).forEach((key) => {
                    job[key] = req.body[key];
                });

                const updatedJob = await job.save();
                res.json(updatedJob);
            } catch (err) {
                res.status(400).json({message: err.message});
            }
        });
    })


module.exports = router;
