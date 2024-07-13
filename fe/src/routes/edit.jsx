import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function Edit() {

    let {postID} = useParams();

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [jobField, setJobField] = useState("");
    const [lastEdit, setLastEdit] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/jobs/${postID}`).then(res => {
            setTitle(res.data.title);
            setJobField(res.data.language);
            setCompany(res.data.company);
            setLastEdit(res.data.postedDate);
            setLocation(res.data.location);
            setDescription(res.data.description);
        })
    }, []);

    function handleEditBtn() {
        let jwtToken = localStorage.getItem("loginToken")
        const configuration = {
            headers: {Authorization: `Bearer ${jwtToken}`}
        };

        let newJSON = {
            title: title,
            company: company,
            location: location,
            language: jobField,
            description: description
        };

        axios.patch(`http://localhost:3000/jobs/${postID}`, newJSON, configuration)
            .then(res => {
                window.location.href = '/';
            })
    }

    return (
        <React.Fragment>
            <form>
                <h1>Edit Post</h1>
                <label htmlFor='job-field'>Job Field: </label>
                <select id="job-field" value={jobField} onChange={e => setJobField(e.target.value)}>
                    <option value='frontend'>Frontend</option>
                    <option value='backend'>Backend</option>
                    <option value='fullstack'>Full Stack</option>
                    <option value='mobile'>Mobile</option>
                    <option value='embedded'>Embedded</option>
                    <option value='machine learning'>Machine Learning</option>
                </select>
                <br/>
                <br/>

                <label>
                    Job Title:
                    <br/>
                    <input type='text' defaultValue={title} onChange={e => setTitle(e.target.value)} required/>
                </label>

                <h5>Company: {company}</h5>
                <h5>Last edited: {lastEdit}</h5>
                <label>
                    Location: <br/>
                    <input type='text' defaultValue={location} onChange={e => setLocation(e.target.value)} required/>
                    <br/>
                </label>

                <label>Job Explanation: <br/><textarea defaultValue={description}
                                                       onChange={e => setDescription(e.target.value)}/></label>

                <br/>
                <button type='button' onClick={handleEditBtn}>Submit</button>
            </form>
        </React.Fragment>
    )
}