import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {LoginStatus} from "../main.jsx";

export default function SignIn() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [loginFail, setLogInFail] = useState("");

    const {loggedIn, setLoggedIn} = useContext(LoginStatus);

    function handleSignInBtn() {
        let newJSON = {
            email: email,
            password: password,
        };
        axios
            .post("http://localhost:3000/companies/login", newJSON)
            .then((res) => {
                if (res.status === 200) {
                    setLoggedIn({
                        isLoggedIn: true,
                        company: res.data.company,
                    });

                    localStorage.setItem("loginToken", res.data.token);
                    localStorage.setItem("company", res.data.company.company_name);
                    window.location.href = "/";
                }
            })
            .catch((err) => {
                setLogInFail("Login has failed! Please try again.");
            });
    }

    return (
        <div className="container">
            <h2>Sign In</h2>
            <form className="row text-center">
                <div className="d-flex justify-content-center align-items-center flex-column mb-2">
                    <label className="form-label mb-0" htmlFor="email">
                        Company Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        className="form-control ms-2"
                        onChange={(e) => setEmail(e.target.value)}
                        style={{width: "30%"}}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // 기본 동작 막기
                                // 여기에 추가적으로 할 작업이 없으면 아무 동작도 일어나지 않음
                            }
                        }}
                    />
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column mb-2">
                    <label className="form-label mb-0" htmlFor="pw" value={password}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="pw"
                        className="form-control ms-2"
                        onChange={(e) => setPassword(e.target.value)}
                        style={{width: "30%"}}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // 기본 동작 막기
                            }
                        }}
                    />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        type="button"
                        className="btn btn-outline-primary mb-2"
                        onClick={handleSignInBtn}
                        style={{width: "30%"}}
                    >
                        Sign In
                    </button>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <Link to="/sign-up" style={{width: "100%"}}>
                        <button
                            onClick={() => {
                                window.location.href = "/sign-up";
                            }}
                            className="btn btn-outline-primary"
                            style={{width: "30%"}}
                        >
                            Sign Up
                        </button>
                    </Link>
                </div>

            </form>
        </div>
    );
}
