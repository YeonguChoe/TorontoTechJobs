import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function Post() {

    let {postID} = useParams();

    const [postDetail, setPostDetail] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3000/jobs/${postID}`)
            .then((res) => {
                setPostDetail(res.data)
            })
    }, [postID]);

    function handleDelete() {
        axios.delete(`http://localhost:3000/jobs/${postID}`).then(res => {
            window.location.href = '/'
        })
    }

    return (
        <React.Fragment>
            {postDetail && (
                <div>
                    <h1>{postDetail.title}</h1>
                    <h2>{postDetail.company}</h2>
                    <h3>{postDetail.postedDate}</h3>
                    <h3>{postDetail.location}</h3>
                    <h4>{postDetail.language}</h4>
                    <p>{postDetail.description}</p>
                    <button onClick={() => {
                        window.location.href = `/edit/${postID}`
                    }}>Edit Post
                    </button>
                    <button onClick={handleDelete}>Delete post</button>
                </div>
            )}
        </React.Fragment>
    );
}