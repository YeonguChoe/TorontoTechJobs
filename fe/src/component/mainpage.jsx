import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const MainPage = () => {
  const [recentJobs, setRecentJobs] = useState([]);
  const [showNoJobMessage, setShowNoJobMessage] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs/recent")
      .then((res) => {
        setRecentJobs(res.data.slice(0, 5));
        setShowNoJobMessage(res.data.length === 0);
      }) // Get only the first 5 jobs
      .catch((err) => {
        console.error(err);
        setShowNoJobMessage(true);
      });
  }, []);

  function moveToDetailPage(jobID) {
    window.location.href = `/post/${jobID}`;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${monthNames[monthIndex]} ${day}${
      day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th"
    }, ${year}`;
  }

  return (
    <div className="container">
      <div className="row my-4 justify-content-center">
        <div className="col text-center">
          <h1>Welcome to Toronto Tech Jobs!</h1>
          <h5>
            Your go-to platform for finding the latest tech jobs in Toronto.
            Whether you're a developer, designer, or manager, we have the
            perfect job for you.
          </h5>
        </div>
      </div>

      <div className="row my-4">
        <div className="col">
          <h2>Recent Job Postings</h2>
          {showNoJobMessage && (
            <span
              className="noJob"
              style={{ color: "#ff0000", fontSize: "3em" }}
            >
              No Job is Posted!
            </span>
          )}
          <div
            style={{ cursor: "pointer" }}
            className="list-group list-group-flush"
          >
            {recentJobs.map((item) => (
              <a
                onClick={() => {
                  moveToDetailPage(item._id);
                }}
                key={item._id}
                className="list-group-item list-group-item-action"
              >
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>{item.title}</h4>
                    <h5>{item.company_name}</h5>
                  </div>
                  <div>
                    <small className="d-flex justify-content-end">
                      {formatDate(item.posted_date)}
                    </small>
                    <div className="d-flex justify-content-end">
                      <span className="badge text-bg-secondary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="13"
                          fill="currentColor"
                          className="bi bi-geo-alt-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                        </svg>
                        <span className="ms-1">{item.location}</span>
                      </span>
                    </div>
                    <div className="d-flex justify-content-end mt-1">
                      <span
                        className={`badge ${
                          item.job_type === "frontend"
                            ? "text-bg-primary"
                            : item.job_type === "backend"
                            ? "text-bg-success"
                            : item.job_type === "fullstack"
                            ? "text-bg-info"
                            : item.job_type === "mobile"
                            ? "text-bg-warning"
                            : "text-bg-dark"
                        }`}
                      >
                        {item.job_type}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <a className="btn btn-outline-primary" href="/job-list" role="button">
          View More Jobs
        </a>
      </div>
    </div>
  );
};

export default MainPage;
