import React, {useState} from "react";

export default function Create() {
    const [jobTitle, setJobTitle] = useState("Input Job title")
    const [content, setContent] = useState("Input Text");

    function updateTitle(e) {
        setJobTitle(e.target.value)
    }

    function updateContent(e) {
        setContent(e.target.value)
    }

    return (
        <React.Fragment>
            <form>
                <h1>Create Post</h1>
                <label htmlFor='job-field'>Job Field: </label>
                <select id='job-field'>
                    <option value='BE'>Backend</option>
                    <option value='FE'>Frontend</option>
                    <option value='ML'>Machine Learning</option>
                    <option value='Mobile'>Mobile</option>
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
                <br/>

                <label>Job Explanation: <br/><textarea value={content} onChange={updateContent}/></label>

                <br/>
                <button type='submit'>Create Post</button>

            </form>
        </React.Fragment>
    );

}