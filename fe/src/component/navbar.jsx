import React, {useEffect, useState} from "react";
import "../styles/nav-bar.css"

export default function Navbar() {

    const [activePage, setActivePage] = useState("/");

    useEffect(() => {
        setActivePage(window.location.pathname);
    }, []);

    return (
        <React.Fragment>
            <nav className="nav">
                <a href="/" className="home-page">
                    Toronto Job Board
                </a>
                <ul>
                    <li className={activePage === "/new-post" ? 'selected' : ''}><a href="/new-post">Post a Job</a></li>
                    <li className={activePage === "/sign-in" ? 'selected' : ''}><a href="/sign-in">SignIn</a></li>
                </ul>
            </nav>
        </React.Fragment>
    )
}