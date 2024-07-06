import React from "react";
import '../styles/authentication.css'
import {Link} from "react-router-dom";

export default function SignIn() {
    return (
        <React.Fragment>
            <h1>Sign In</h1>
            <form>
                <label htmlFor='id'>ID:</label>
                <input type="text" id='id'/>
                <label htmlFor='pw'>Password</label>
                <input type="password" id='pw'/>
                <button>Sign In</button>
            </form>

            <form>
                <Link to="/sign-up">
                    <button>Sign Up</button>
                </Link>
            </form>

        </React.Fragment>
    );

}