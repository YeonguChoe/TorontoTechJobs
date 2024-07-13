import React, {useEffect, useState} from 'react';
import axios from "axios";

export default function Account() {


    const [noJobs, setNoJobs] = useState(true)

    const [postList, setPostList] = useState([])

    useEffect(() => {
        let loggedInCompany = localStorage.getItem("company");
        axios.get(`http://localhost:3000/jobs/filter-by-company-name?company_name=${loggedInCompany}`)
            .then(res => {
                setPostList(res.data)
                setNoJobs(false)
            }).catch(err => {
            setNoJobs(true);
        })
    }, []);

    function moveToDetailPage(jobID) {
        window.location.href = `/post/${jobID}`
    }


    return (
        <React.Fragment>
            <div>
                {noJobs && <span className='noJob'
                                 style={{color: '#ff0000', fontSize: '3em'}}>No Job is Posted!</span>}
                <ul>
                    {postList.map((item) => (
                        <li onClick={() => {
                            moveToDetailPage(item._id)
                        }} key={item._id} style={{cursor: 'pointer'}}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    )
}