import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Account() {
  const [noJobs, setNoJobs] = useState(true);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    let loggedInCompany = localStorage.getItem("company");

    let jwtToken = localStorage.getItem("loginToken");
    const configuration = {
      headers: { Authorization: `Bearer ${jwtToken}` },
    };

    axios
      .get(
        `http://localhost:3000/jobs/filter-by-company-name?company_name=${loggedInCompany}`,
        configuration
      )
      .then((res) => {
        setPostList(res.data);
        setNoJobs(false);
      })
      .catch((err) => {
        setNoJobs(true);
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
      <h2>My Posts</h2>
      {noJobs && (
        <div>
          <h5>No job is posted from this account.</h5>
          <a href="/new-post" className="btn btn-outline-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-file-earmark-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5" />
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
            </svg>
            Post a New Job
          </a>
        </div>
      )}
      <div
        style={{ cursor: "pointer" }}
        className="list-group list-group-flush"
      >
        {postList.map((item) => (
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
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                  {item.location}
                </div>
                <div className="d-flex justify-content-end">
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
  );
}
