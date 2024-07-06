import React, {useState} from "react";
import axios from "axios";

export default function Create() {
    const [jobTitle, setJobTitle] = useState("Input Job title");
    const [companyName, setCompanyName] = useState("Samsung Electronics");
    const [location, setLocation] = useState("Ontario");
    const [jobField, setJobField] = useState("Backend");
    const [description, setDescription] = useState("Input Text");

    function updateTitle(e) {
        setJobTitle(e.target.value)
    }

    function updateCompany(e) {
        setCompanyName(e.target.value)
    }

    function updateLocation(e) {
        setLocation(e.target.value)
    }

    function updateJobField(e) {
        console.log(e.target)
        setJobField(e.target.value)
    }

    function updateDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmitBtn(e) {
        e.preventDefault();

        const newJSON = {
            title: jobTitle,
            company: companyName,
            location: location,
            language: jobField,
            description: description
        };

        axios.post("http://localhost:3000/jobs", newJSON).then(res => {
            window.location.href = '/'
        })

    }

    return (
        <React.Fragment>
            <form>
                <h1>Create Post</h1>
                <label htmlFor='job-field'>Job Field: </label>
                <select id="job-field" onChange={updateJobField} value={jobField}>
                    <option value='Backend'>Backend</option>
                    <option value='Frontend'>Frontend</option>
                    <option value='Mobile'>Mobile</option>
                    <option value='Machine Learning'>Machine Learning</option>
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