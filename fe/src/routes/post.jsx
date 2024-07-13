import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoginStatus } from "../main.jsx";

export default function Post() {
  let { postID } = useParams();

  const [postDetail, setPostDetail] = useState(null);
  const { loggedIn, setLoggedIn } = useContext(LoginStatus);

  useEffect(() => {
    axios.get(`http://localhost:3000/jobs/${postID}`).then((res) => {
      setPostDetail(res.data);
    });
  }, [postID]);

  function handleDelete() {
    let jwtToken = localStorage.getItem("loginToken");
    const configuration = {
      headers: { Authorization: `Bearer ${jwtToken}` },
    };

    axios
      .delete(`http://localhost:3000/jobs/${postID}`, configuration)
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      {postDetail && (
        <div className="container">
          <h1>{postDetail.title}</h1>
          <h2>{postDetail.company_name}</h2>
          <h3>{postDetail.posted_date}</h3>
          <h3>{postDetail.location}</h3>
          <h4>{postDetail.language}</h4>
          <p>{postDetail.description}</p>
          {loggedIn.isLoggedIn &&
          postDetail &&
          postDetail.company_name === localStorage.getItem("company") ? (
            <>
              <button
                onClick={() => {
                  window.location.href = `/edit/${postID}`;
                }}
                style={{ cursor: "pointer" }}
              >
                Edit Post
              </button>
              <button onClick={handleDelete} style={{ cursor: "pointer" }}>
                Delete post
              </button>
            </>
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
}
