import React, { useState, useContext } from "react";
import axios from "axios";
import { LoginStatus } from "../main.jsx";

export default function Create() {
  const [jobTitle, setJobTitle] = useState("Input Job title");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("Ontario");
  const [jobType, setJobType] = useState("frontend");
  const [description, setDescription] = useState("Input Text");

  const loginInfo = useContext(LoginStatus);

  function updateTitle(e) {
    setJobTitle(e.target.value);
  }

  function updateLocation(e) {
    setLocation(e.target.value);
  }

  function updateJobField(e) {
    console.log(e.target);
    setJobType(e.target.value);
  }

  function updateDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmitBtn(e) {
    e.preventDefault();
    let companyName = localStorage.getItem("company");
    let jwtToken = localStorage.getItem("loginToken");

    const newJSON = {
      title: jobTitle,
      company_name: companyName,
      location: location,
      job_type: jobType,
      description: description,
    };

    const configuration = {
      headers: { Authorization: `Bearer ${jwtToken}` },
    };
    axios
      .post("http://localhost:3000/jobs", newJSON, configuration)
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container">
      <h2>Create Post</h2>
      <form className="row">
        <label className="form-label">
          Job Title:
          <input
            type="text"
            className="form-control"
            value={jobTitle}
            onChange={updateTitle}
            required
          />
        </label>
        <div className="col-6">
          <label className="form-label" htmlFor="job-field">
            Job Field:{" "}
            <select
              id="job-field"
              className="form-select col-sm-10"
              onChange={updateJobField}
              value={jobType}
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Full Stack</option>
              <option value="mobile">Mobile</option>
              <option value="machine learning">Machine Learning</option>
            </select>
          </label>
        </div>
        <div className="col-6">
          <label className="form-label">
            Location:
            <input
              type="text"
              value={location}
              onChange={updateLocation}
              className="form-control"
              required
            />
          </label>
        </div>
        <label className="form-label">
          Job Explanation:
          <textarea
            className="form-control"
            rows="5"
            value={description}
            onChange={updateDescription}
          />
        </label>
      </form>
      <button
        type="submit"
        className="btn btn-outline-primary"
        onClick={handleSubmitBtn}
      >
        Create Post
      </button>
    </div>
  );
}
