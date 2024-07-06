import React, {useEffect, useState} from "react";
import axios from "axios";

export default function JobList() {

    const [jobPosts, setJobPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/jobs")
            .then(res => {
                setJobPosts(res.data);
            })
    }, []);

    return (
        <React.Fragment>
            <div>
                <h2>Job Listing</h2>
                <ul>
                    {jobPosts.map((item) => (
                        <li key={item._id}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
}
