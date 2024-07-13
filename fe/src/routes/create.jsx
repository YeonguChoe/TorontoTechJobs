import React, {useState, useContext} from "react";
import axios from "axios";
import {LoginStatus} from "../main.jsx";

export default function Create() {
    const [jobTitle, setJobTitle] = useState("Input Job title");
    const [companyName, setCompanyName] = useState("");
    const [location, setLocation] = useState("Ontario");
    const [jobType, setJobType] = useState("frontend");
    const [description, setDescription] = useState("Input Text");

    const loginInfo = useContext(LoginStatus);

    function updateTitle(e) {
        setJobTitle(e.target.value)
    }

    function updateLocation(e) {
        setLocation(e.target.value)
    }

    function updateJobField(e) {
        console.log(e.target)
        setJobType(e.target.value)
    }

    function updateDescription(e) {
        setDescription(e.target.value)
    }


    function handleSubmitBtn(e) {
        e.preventDefault();
        let companyName = localStorage.getItem("company");
        let jwtToken = localStorage.getItem("loginToken");

        const newJSON = {
            title: jobTitle,
            company_name: companyName,
            location: location,
            job_type: jobType,
            description: description
        };

        const configuration = {
            headers: {Authorization: `Bearer ${jwtToken}`}
        };
        axios.post("http://localhost:3000/jobs", newJSON, configuration)
            .then(res => {
                window.location.href = '/'
            }).catch(err => {
            console.log(err);
        })
    }

    return (
        <React.Fragment>
            <form>
                <h1>Create Post</h1>
                <label htmlFor='job-field'>Job Field: </label>
                <select id="job-field" onChange={updateJobField} value={jobType}>
                    <option value='frontend'>Frontend</option>
                    <option value='backend'>Backend</option>
                    <option value='fullstack'>Full Stack</option>
                    <option value='mobile'>Mobile</option>
                    <option value='machine learning'>Machine Learning</option>
                </select>
                <br/>
                <br/>

                <label>
                    Job Title:
                    <br/>
                    <input type='text'
                           value={jobTitle}
                           onChange={updateTitle}
                           required
                    />
                </label>
                <br/>
                <label>
                    Location: <br/>
                    <input type='text' value={location} onChange={updateLocation} required/>
                </label>
                <br/>
                <label>Job Explanation: <br/><textarea value={description} onChange={updateDescription}/></label>
                <br/>
                <button type='submit' onClick={handleSubmitBtn}>Create Post</button>
            </form>
        </React.Fragment>
    );
}