import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function JobList() {
    const [jobPosts, setJobPosts] = useState([]);
    const [showNoJobMessage, setShowNoJobMessage] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:3000/jobs/")
            .then(res => {
                setJobPosts(res.data);
                setShowNoJobMessage(res.data.length === 0);
            })
            .catch((err) => {
                setJobPosts([]);
                setShowNoJobMessage(true);
            });
    }, []);

    function handleBE() {
        axios.get("http://localhost:3000/jobs/filter-by-job-type?job_type=backend")
            .then(res => {
                setJobPosts(res.data)
                setShowNoJobMessage(false);
            })
            .catch((err) => {
                setJobPosts([]);
                setShowNoJobMessage(true);
            });
    }


    function handleFE() {
        axios.get("http://localhost:3000/jobs/filter-by-job-type?job_type=frontend")
            .then(res => {
                setJobPosts(res.data)
                setShowNoJobMessage(false);
            })
            .catch((err) => {
                setJobPosts([]);
                setShowNoJobMessage(true);
            });
    }

    function handleML() {
        axios.get("http://localhost:3000/jobs/filter-by-job-type?job_type=machine%20learning")
            .then(res => {
                setJobPosts(res.data)
                setShowNoJobMessage(false);
            })
            .catch((err) => {
                setJobPosts([]);
                setShowNoJobMessage(true);
            });
    }

    function handleMobile() {
        axios.get("http://localhost:3000/jobs/filter-by-job-type?job_type=mobile")
            .then(res => {
                setJobPosts(res.data)
                setShowNoJobMessage(false);
            })
            .catch((err) => {
                setJobPosts([]);
                setShowNoJobMessage(true);
            });
    }

    function handleFullStack() {
        axios.get("http://localhost:3000/jobs/filter-by-job-type?job_type=fullstack")
            .then(res => {
                setJobPosts(res.data)
                setShowNoJobMessage(false);
            })
            .catch((err) => {
                setJobPosts([]);
                setShowNoJobMessage(true);
            });
    }


    function moveToDetailPage(jobID) {
        window.location.href = `/post/${jobID}`
    }

    return (
        <React.Fragment>
            <div>
                <h2>Job Listing</h2>
                <button onClick={handleFE}>Frontend</button>
                <button onClick={handleBE}>Backend</button>
                <button onClick={handleFullStack}>FullStack</button>
                <button onClick={handleMobile}>Mobile</button>
                <button onClick={handleML}>Machine Learning</button>
                <br/>
                {showNoJobMessage &&
                    <span className='noJob'
                          style={{color: '#ff0000', fontSize: '3em'}}>No Job is Posted!</span>}
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
