import React from "react";

export default function JobList() {

    const posts = [
        {
            id: 1,
            title: "Software Developer",
            location: "Toronto",
            field: "BE",
            description: "Need to know programming language"
        },
        {
            id: 2,
            title: "Programmer",
            location: "Markham",
            field: "BE",
            description: "Embedded C development experience"
        },
        {
            id: 3,
            title: "Java Spring developer",
            location: "North York",
            field: "BE",
            description: "5+ years of Java experience"
        }
    ];

    return (
        <React.Fragment>
            <div>
                <h2>Job Listing</h2>
                <ul>
                    {posts.map((item) => (
                        <li key={item.id}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
}
