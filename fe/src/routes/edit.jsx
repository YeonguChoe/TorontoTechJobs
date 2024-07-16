import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Edit() {
  let { postID } = useParams();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobField, setJobField] = useState("");
  const [lastEdit, setLastEdit] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/jobs/${postID}`).then((res) => {
      setTitle(res.data.title);
      setJobField(res.data.job_type);
      setCompany(res.data.company);
      setLastEdit(res.data.postedDate);
      setLocation(res.data.location);
      setDescription(res.data.description);
    });
  }, []);

  function handleEditBtn() {
    let jwtToken = localStorage.getItem("loginToken");
    const configuration = {
      headers: { Authorization: `Bearer ${jwtToken}` },
    };

    let newJSON = {
      title: title,
      company: company,
      location: location,
      job_type: jobField,
      description: description,
    };

    axios
      .patch(`http://localhost:3000/jobs/${postID}`, newJSON, configuration)
      .then((res) => {
        window.location.href = "/";
      });
  }

  return (
    <div className="container">
      <h2>Edit Post</h2>
      <form className="row">
        <label className="form-label">
          Job Title:
          <input
            type="text"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </label>
        <div className="col-6">
          <h6>Company: {company}</h6>
        </div>
        <div className="col-6">
          <h6>Last edited: {lastEdit}</h6>
        </div>
        <div className="col-6">
          <label className="form-label" htmlFor="job-field">
            Job Field:{" "}
            <select
              id="job-field"
              className="form-select col-sm-10"
              onChange={(e) => setJobField(e.target.value)}
              value={jobField}
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Full Stack</option>
              <option value="mobile">Mobile</option>
              <option value="embedded">Embedded</option>
              <option value="machine learning">Machine Learning</option>
            </select>
          </label>
        </div>
        <div className="col-6">
          <label className="form-label">
            Location:
            <input
              type="text"
              defaultValue={location}
              onChange={(e) => setLocation(e.target.value)}
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
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </form>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={handleEditBtn}
      >
        Submit
      </button>
    </div>
  );
}
