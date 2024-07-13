import React, { useContext, useEffect, useState } from "react";
import "../styles/styles.css";
import { LoginStatus } from "../main.jsx";
import logo from "../assets/TTlogo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [activePage, setActivePage] = useState("/");

  const { loggedIn, setLoggedIn } = useContext(LoginStatus);

  useEffect(() => {
    setActivePage(window.location.pathname);
  }, []);

  const signOut = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("company");
    window.location.reload();
  };

  const moveToMyPosts = () => {
    window.location.href = "/my-posts";
  };

  return (
    <React.Fragment>
      <nav className="navbar container">
        <div className="container-fluid">
          <a href="/" className="home-page navbar-brand">
            <img
              src={logo}
              width="40"
              className="d-inline-block align-text-middle"
            />
            Toronto Tech Jobs
          </a>
          <ul className="navbar-nav ms-auto d-flex flex-row">
            {loggedIn.isLoggedIn ? (
              <>
                <li
                  className={`nav-item ${
                    activePage === "/new-post" ? "selected" : ""
                  } me-3`}
                  style={{ cursor: "pointer" }}
                >
                  <a href="/new-post" className="nav-link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5" />
                      <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
                    </svg>
                    Post a Job
                  </a>
                </li>
                <li
                  className={`nav-item ${
                    activePage === "/my-posts" ? "selected" : ""
                  } me-3`}
                >
                  <span
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={moveToMyPosts}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-post"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
                      <path d="M4 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H4.5a.5.5 0 0 1-.5-.5" />
                    </svg>
                    My Posts
                  </span>
                </li>
                <li className="nav-item me-3">
                  <span
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={signOut}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                      />
                    </svg>
                    Sign Out
                  </span>
                </li>
              </>
            ) : (
              <>
                <li
                  className={`nav-item ${
                    activePage === "/sign-in" ? "selected" : ""
                  } me-3`}
                >
                  <a
                    href="/sign-in"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-arrow-in-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                      />
                    </svg>
                    Sign In
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}
