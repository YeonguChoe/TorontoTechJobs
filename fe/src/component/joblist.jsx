import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function JobList() {
    const [jobPosts, setJobPosts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/jobs/")
            .then(res => {
                setJobPosts(res.data);
            })
    }, []);

    function handleBE() {
        axios.get("http://localhost:3000/jobs/filter-by-job-type?job_type=backend")
            .then(res => {
                setJobPosts(res.data)
            })
    }


    function handleFE() {
        axios.get("http://localhost:3000/jobs/filter-by-job-type?job_type=frontend")
            .then(res => {
                setJobPosts(res.data)
            })
    }

    function handleML() {
        axios.get("http://localhost:3000/jobs/filter-by-job-type?job_type=machine%20learning")
            .then(res => {
                setJobPosts(res.data)
            })
    }

    function handleMobile() {
        axios.get("http://localhost:3000/jobs/filter-by-job-type?job_type=mobile")
            .then(res => {
                setJobPosts(res.data)
            })
    }

    function handleFullStack() {
        axios.get("http://localhost:3000/jobs/filter-by-job-type?job_type=fullstack")
            .then(res => {
                setJobPosts(res.data)
            })
    }

    function handleEmbedded() {
        axios.get("http://localhost:3000/jobs/filter-by-job-type?job_type=embedded")
            .then(res => {
                setJobPosts(res.data)
            })
    }

    function moveToDetailPage(jobID) {
        window.location.href = `/post/${jobID}`
    }

    return (
        <React.Fragment>
            <div>
                <h2>Job Listing</h2>
                <button onClick={handleBE}>Backend</button>
                <button onClick={handleFE}>Frontend</button>
                <button onClick={handleFullStack}>FullStack</button>
                <button onClick={handleEmbedded}>Embedded</button>
                <button onClick={handleML}>Machine Learning</button>
                <button onClick={handleMobile}>Mobile</button>
                <ul>
                    {jobPosts.map((item) => (
                        <li onClick={() => {
                            moveToDetailPage(item._id)
                        }} key={item._id}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
}
