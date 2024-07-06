import React from "react";

export default function SignUp() {

    return (
        <React.Fragment>
            <h1>Sign Up</h1>
            <form>
                <label htmlFor='id'>New ID: </label>
                <input type='text' id='id'/>
                <label htmlFor='pw'>New PW: </label>
                <input type='password'/>
                <button type='submit'>Submit</button>
            </form>
        </React.Fragment>
    )
}