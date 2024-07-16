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
        <span className="noJob" style={{ color: "#ff0000", fontSize: "3em" }}>
          No Job is Posted!
        </span>
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
