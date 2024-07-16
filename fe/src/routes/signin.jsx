import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LoginStatus } from "../main.jsx";

export default function SignIn() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let [loginFail, setLogInFail] = useState("");

  const { loggedIn, setLoggedIn } = useContext(LoginStatus);

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

  function handleKeyboard(event) {
    if (event.key === "Enter") {
      handleSignInBtn();
    }
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
            onKeyPress={handleKeyboard}
            style={{ width: "30%" }}
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
            onKeyPress={handleKeyboard}
            style={{ width: "30%" }}
          />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn btn-outline-primary mb-2"
            onClick={handleSignInBtn}
            style={{ width: "20%" }}
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-center align-items-center">
        <form style={{ width: "20%" }}>
          <Link to="/sign-up">
            <button
              onClick={() => {
                window.location.href = "/sign-up";
              }}
              className="btn btn-outline-primary"
              style={{ width: "100%" }}
            >
              Sign Up
            </button>
          </Link>
        </form>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        {loginFail && <h5 style={{ color: "#ff0000" }}>{loginFail}</h5>}
      </div>
    </div>
  );
}
