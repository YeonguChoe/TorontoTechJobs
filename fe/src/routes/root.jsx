import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../component/navbar.jsx";
import JobList from "../component/joblist.jsx";

export default function Root() {
    const [atHomePage, setAtHomePage] = useState(false)
    useEffect(() => {
        if (window.location.pathname === "/") {
            setAtHomePage(true)
        }
    }, [atHomePage]);

    return (
        <React.Fragment>
            <Navbar/>
            {atHomePage ? <JobList/> : <Outlet/>}
        </React.Fragment>
    );
}