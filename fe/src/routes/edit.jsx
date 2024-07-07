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
            console.log(res.data);
            setTitle(res.data.title);
            setJobField(res.data.language);
            setCompany(res.data.company);
            setLastEdit(res.data.postedDate);
            setLocation(res.data.location);
            setDescription(res.data.description);
        })
    }, []);

    function handleEditBtn() {

        let newJSON = {
            title: title,
            company: company,
            location: location,
            language: jobField,
            description: description
        };

        axios.patch(`http://localhost:3000/jobs/${postID}`, newJSON).then(res => {
            console.log(res)
        })
    }

    return (
        <React.Fragment>
            <form>
                <h1>Edit Post</h1>
                <label htmlFor='job-field'>Job Field: </label>
                <select id="job-field" value={jobField} onChange={e => setJobField(e.target.value)}>
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
                    <input type='text' defaultValue={title} onChange={setTitle} required/>
                </label>

                <h5>Company: {company}</h5>
                <h5>Last edited: {lastEdit}</h5>
                <label>
                    Location: <br/>
                    <input type='text' defaultValue={location} onChange={setLocation} required/>
                    <br/>
                </label>

                <label>Job Explanation: <br/><textarea defaultValue={description} onChange={setDescription}/></label>

                <br/>
                <button type='submit' onClick={handleEditBtn}>Submit</button>
            </form>
        </React.Fragment>
    )
}