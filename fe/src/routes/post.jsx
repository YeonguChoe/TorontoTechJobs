import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {LoginStatus} from "../main.jsx";
import {marked} from "marked";

export default function Post() {
    let {postID} = useParams();

    const [postDetail, setPostDetail] = useState(null);
    const [companyDetail, setCompanyDetail] = useState(null);
    const {loggedIn, setLoggedIn} = useContext(LoginStatus);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/jobs/${postID}`)
            .then((res) => {
                setPostDetail(res.data);
                // After setting postDetail, make the second axios.get request
                return axios.get(
                    `http://localhost:3000/companies/filter-by-company-name?company_name=${res.data.company_name}`
                );
            })
            .then((res) => {
                setCompanyDetail(res.data[0]);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, [postID]);

    function handleDelete() {
        let jwtToken = localStorage.getItem("loginToken");
        const configuration = {
            headers: {Authorization: `Bearer ${jwtToken}`},
        };

        axios
            .delete(`http://localhost:3000/jobs/${postID}`, configuration)
            .then((res) => {
                window.location.href = "/";
            })
            .catch((err) => {
                console.log(err);
            });
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
            {postDetail && companyDetail && (
                <div className="row">
                    <div className="col-9">
                        <h2>{postDetail.title}</h2>
                        <div className="d-flex align-items-center">
                            <h5 className="d-flex align-items-center mb-0">
                <span className="badge text-bg-secondary d-flex align-items-center me-1">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="14"
                      fill="currentColor"
                      className="bi bi-geo-alt-fill"
                      viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                  </svg>
                  <span className="ms-1">{postDetail.location}</span>
                </span>
                                <span
                                    className={`badge ms-2 ${
                                        postDetail.job_type === "frontend"
                                            ? "text-bg-primary"
                                            : postDetail.job_type === "backend"
                                                ? "text-bg-success"
                                                : postDetail.job_type === "fullstack"
                                                    ? "text-bg-info"
                                                    : postDetail.job_type === "mobile"
                                                        ? "text-bg-warning"
                                                        : "text-bg-dark"
                                    }`}
                                >
                  {postDetail.job_type}
                </span>
                            </h5>
                        </div>
                        <h4>{postDetail.language}</h4>
                        <p>Published on: {formatDate(postDetail.posted_date)}</p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: marked(postDetail.description),
                            }}
                        />
                    </div>
                    <div className="col-3">
                        <div className="card">
                            <div className="card-body">
                                <h3>{postDetail.company_name}</h3>
                                <a
                                    href={companyDetail.companyURL}
                                    className="d-flex align-items-center text-decoration-none text-black"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-link-45deg"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                                        <path
                                            d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                                    </svg>
                                    <p className="mb-0 ms-2">{companyDetail.companyURL}</p>
                                </a>
                                <p>Apply at: <a href={`mailto:${companyDetail.email}`}> {companyDetail.email} </a></p>
                            </div>
                        </div>
                        {loggedIn.isLoggedIn &&
                        postDetail &&
                        postDetail.company_name === localStorage.getItem("company") ? (
                            <div className="d-flex flex-column flex-md-row mt-2">
                                <button
                                    onClick={() => {
                                        window.location.href = `/edit/${postID}`;
                                    }}
                                    className="btn btn-outline-primary me-md-2 mb-2 mb-md-0"
                                >
                                    Edit Post
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="btn btn-outline-primary"
                                >
                                    Delete Post
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}
