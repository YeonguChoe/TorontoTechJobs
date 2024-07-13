import React, { useEffect, useState } from "react";
import axios from "axios";

export default function JobList() {
  const [jobPosts, setJobPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showNoJobMessage, setShowNoJobMessage] = useState(false);
  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Update state when a tab is clicked
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/jobs/")
      .then((res) => {
        setJobPosts(res.data);
        setShowNoJobMessage(res.data.length === 0);
      })
      .catch((err) => {
        setJobPosts([]);
        setShowNoJobMessage(true);
      });
  }, []);

  function handleAll() {
    handleTabClick("all");
    axios
      .get("http://localhost:3000/jobs/")
      .then((res) => {
        setJobPosts(res.data);
        setShowNoJobMessage(res.data.length === 0);
      })
      .catch((err) => {
        setJobPosts([]);
        setShowNoJobMessage(true);
      });
  }

  function handleBE() {
    handleTabClick("backend");
    axios
      .get("http://localhost:3000/jobs/filter-by-job-type?job_type=backend")
      .then((res) => {
        setJobPosts(res.data);
        setShowNoJobMessage(false);
      })
      .catch((err) => {
        setJobPosts([]);
        setShowNoJobMessage(true);
      });
  }

  function handleFE() {
    handleTabClick("frontend");
    axios
      .get("http://localhost:3000/jobs/filter-by-job-type?job_type=frontend")
      .then((res) => {
        setJobPosts(res.data);
        setShowNoJobMessage(false);
      })
      .catch((err) => {
        setJobPosts([]);
        setShowNoJobMessage(true);
      });
  }

  function handleML() {
    handleTabClick("machine_learning");
    axios
      .get(
        "http://localhost:3000/jobs/filter-by-job-type?job_type=machine%20learning"
      )
      .then((res) => {
        setJobPosts(res.data);
        setShowNoJobMessage(false);
      })
      .catch((err) => {
        setJobPosts([]);
        setShowNoJobMessage(true);
      });
  }

  function handleMobile() {
    handleTabClick("mobile");
    axios
      .get("http://localhost:3000/jobs/filter-by-job-type?job_type=mobile")
      .then((res) => {
        setJobPosts(res.data);
        setShowNoJobMessage(false);
      })
      .catch((err) => {
        setJobPosts([]);
        setShowNoJobMessage(true);
      });
  }

  function handleFullStack() {
    handleTabClick("fullstack");
    axios
      .get("http://localhost:3000/jobs/filter-by-job-type?job_type=fullstack")
      .then((res) => {
        setJobPosts(res.data);
        setShowNoJobMessage(false);
      })
      .catch((err) => {
        setJobPosts([]);
        setShowNoJobMessage(true);
      });
  }

  function moveToDetailPage(jobID) {
    window.location.href = `/post/${jobID}`;
  }

  function formatDate(posted_date) {
    const date = new Date(posted_date);
    const formattedDate = date.toLocaleDateString("en-CA", { timeZone: "UTC" });
    return formattedDate;
  }

  return (
    <div className="container">
      <h2 className="">Job Listing</h2>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            onClick={handleAll}
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            aria-selected={activeTab === "all"}
          >
            All
          </button>
          <button
            className={`nav-link ${activeTab === "frontend" ? "active" : ""}`}
            onClick={handleFE}
            aria-selected={activeTab === "frontend"}
          >
            Frontend
          </button>
          <button
            className={`nav-link ${activeTab === "backend" ? "active" : ""}`}
            onClick={handleBE}
            aria-selected={activeTab === "backend"}
          >
            Backend
          </button>
          <button
            className={`nav-link ${activeTab === "fullstack" ? "active" : ""}`}
            onClick={handleFullStack}
            aria-selected={activeTab === "fullstack"}
          >
            FullStack
          </button>
          <button
            className={`nav-link ${activeTab === "mobile" ? "active" : ""}`}
            onClick={handleMobile}
            aria-selected={activeTab === "mobile"}
          >
            Mobile
          </button>
          <button
            className={`nav-link ${
              activeTab === "machine_learning" ? "active" : ""
            }`}
            onClick={handleML}
            aria-selected={activeTab === "machine_learning"}
          >
            Machine Learning
          </button>
        </div>
      </nav>

      {showNoJobMessage && (
        <span className="noJob" style={{ color: "#ff0000", fontSize: "3em" }}>
          No Job is Posted!
        </span>
      )}
      <div
        style={{ cursor: "pointer" }}
        className="list-group list-group-flush"
      >
        {jobPosts.map((item) => (
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                  {item.location}
                </div>
                <div className="d-flex justify-content-end">
                  <span
                    class={`badge ${
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
  );
}
