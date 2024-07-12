import React, {useContext, useEffect, useState} from "react";
import "../styles/nav-bar.css"
import {LoginStatus} from "../main.jsx";

export default function Navbar() {

    const [activePage, setActivePage] = useState("/");

    const {loggedIn, setLoggedIn} = useContext(LoginStatus);

    useEffect(() => {
        setActivePage(window.location.pathname);
    }, []);

    const signOut = () => {
        localStorage.removeItem("loginToken");
        localStorage.removeItem("company");
        window.location.reload();
    }

    return (
        <React.Fragment>
            <nav className="nav">
                <a href="/" className="home-page">
                    Toronto Tech Jobs
                </a>
                <ul>
                    {loggedIn.isLoggedIn ?
                        <>
                            <li className={activePage === "/new-post" ? 'selected' : ''} style={{cursor: 'pointer'}}><a
                                href="/new-post">Post a Job</a></li>
                            <li style={{cursor: 'pointer'}} onClick={signOut}>Signout</li>
                        </>
                        :
                        <>
                            <li className={activePage === "/sign-in" ? 'selected' : ''}
                                style={{cursor: 'pointer'}}><a
                                href="/sign-in">SignIn</a></li>
                        </>
                    }
                </ul>
            </nav>
        </React.Fragment>
    )
}