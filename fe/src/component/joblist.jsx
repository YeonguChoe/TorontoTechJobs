import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function JobList() {
    const [jobPosts, setJobPosts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/jobs")
            .then(res => {
                setJobPosts(res.data);
            })
    }, []);

    function handleBE() {
        axios.get("http://localhost:3000/jobs/667ee5abfc4a4020ac777b2e")
            .then(res => {
                setJobPosts([res.data])
            })
    }

    function handleFE() {
        axios.get("http://localhost:3000/jobs/667ee5e4fc4a4020ac777b34")
            .then(res => {
                setJobPosts([res.data])
            })
    }

    function handleML() {
        axios.get("http://localhost:3000/jobs/66899925085cffdcad11e7cf")
            .then(res => {
                setJobPosts([res.data])
            })
    }

    function handleMobile() {
        axios.get("http://localhost:3000/jobs/667ee5c6fc4a4020ac777b32")
            .then(res => {
                setJobPosts([res.data])
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
