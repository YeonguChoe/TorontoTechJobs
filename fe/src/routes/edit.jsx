import React, {useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function Edit() {

    let {postID} = useParams();
    let [oldJSON, setOldJSON] = useState(null);


    axios.get(`http://localhost:3000/jobs/${postID}`).then(res => {
        console.log(res.data)
    })

    return (
        <React.Fragment>
            <form>
                <h1>Edit Post</h1>
                <label htmlFor='job-field'>Job Field: </label>
                <select id="job-field">
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
                           required
                    />
                </label>
                <br/>
                <label>
                    Location: <br/>
                    <input type='text' required/>
                </label>
                <br/>

                <label>Job Explanation: <br/><textarea/></label>

                <br/>
                <button type='submit'>Create Post</button>
            </form>
        </React.Fragment>
    )
}