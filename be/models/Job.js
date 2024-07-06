const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  language: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  postedDate: {
    type: Date,
    default: Date.now,
    expires: "14d",
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
